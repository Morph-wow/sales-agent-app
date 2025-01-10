const SalesForceSearch = require('./modules/salesforcesearch');
const PreliminaryParser = require('./modules/preliminaryparser');
const InputParser = require('./modules/inputparser');
const OutputHandler = require('./modules/outputhandler');

class Parser {
  constructor({ salesForceSearch, preliminaryParser, inputParser, actionHandler, outputHandler }) {
    this.salesForceSearch = salesForceSearch;
    this.preliminaryParser = preliminaryParser;
    this.inputParser = inputParser;
    this.actionHandler = actionHandler;
    this.outputHandler = outputHandler;

    this.pendingVerifications = new Map(); // Stato temporaneo per ambiguità
  }

  async parseMessage(rawMessage, context) {
    const chatId = context.chatId;

    // 1. Verifica se il messaggio è una risposta a un'ambiguità
    if (this.pendingVerifications.has(chatId)) {
      const selection = parseInt(rawMessage.trim(), 10);
      const options = this.pendingVerifications.get(chatId);

      if (selection > 0 && selection <= options.length) {
        const selectedClient = options[selection - 1];
        console.log("Cliente selezionato:", selectedClient);

        // Rimuovi lo stato temporaneo
        this.pendingVerifications.delete(chatId);

        // Continua il flusso con il cliente selezionato
        return await this.continueWithSelectedClient(selectedClient, context);
      } else {
        await this.outputHandler.sendMessage(chatId, "Selezione non valida. Rispondi con 1, 2, 3, ecc.");
        return;
      }
    }

    // 2. Flusso normale per i messaggi di input
    const rawData = { message: rawMessage, context };

    // Esegui PreliminaryParser per estrarre il nome
    const extractedName = await this.preliminaryParser.extractName(rawMessage);

    // Cerca il cliente con SalesforceSearch
    const searchResults = await this.salesForceSearch.search(extractedName);

    if (searchResults.length > 1) {
      console.log("Ambiguità trovata, opzioni:", searchResults);

      // Salva l'ambiguità temporaneamente
      this.pendingVerifications.set(chatId, searchResults);

      // Invia un messaggio con le opzioni
      const optionsMessage = searchResults.map((client, index) =>
        `${index + 1}. ${client.name} (Creato il ${client.creationDate})`
      ).join("\n");

      await this.outputHandler.sendMessage(chatId, `Ambiguità trovata:\n${optionsMessage}\nRispondi con il numero corrispondente.`);
      return;
    }

    if (searchResults.length === 1) {
      const verifiedName = searchResults[0];
      rawData.verifiedName = verifiedName;

      await this.processNormalizedData(rawData, context);
    } else {
      await this.outputHandler.sendMessage(chatId, "Nessun cliente trovato.");
    }
  }

  async processNormalizedData(rawData, context) {
    // Continua con InputParser
    const normalizedData = await this.inputParser.parse(rawData);

    // Chiede ad ActionHandler di gestire l'azione e aspetta il callback
    this.actionHandler.handleAction(normalizedData, async (actionResult) => {
      // Gestisce il risultato dell'azione
      if (actionResult.success) {
        await this.outputHandler.sendMessage(context.chatId, "Azione completata con successo.");
      } else {
        await this.outputHandler.sendMessage(context.chatId, `Errore: ${actionResult.error}`);
      }
    });
  }

  async continueWithSelectedClient(selectedClient, context) {
    const rawData = { message: context.rawMessage, context, verifiedName: selectedClient };
    await this.processNormalizedData(rawData, context);
  }
}

module.exports = Parser;
