const PreliminaryParser = require('./preliminaryparser');
const OutputHandler = require('./modules/outputhandler');
const InputParser = require('./modules/inputparser');
const ActionHandler = require('./modules/actionhandler');
const { searchClientByName } = require('./salesforcesearch');

class Parser {
  constructor() {
    this.pendingVerifications = new Map(); // Stato temporaneo per ambiguità
  }

  async parseMessage(rawMessage, context) {
    const { chatId } = context;
    const outputHandler = new OutputHandler();

    // Controlla se ci sono verifiche pendenti per questa chat
    if (this.pendingVerifications.has(chatId)) {
      console.log("Pending verification detected for chatId:", chatId);
      return await this.handleAmbiguityResponse(rawMessage, context);
    }

    try {
      // Step 1: Estrazione del nome dal messaggio
      const preliminaryParser = new PreliminaryParser();
      const extractedName = await preliminaryParser.extractName(rawMessage);
      if (!extractedName) {
        throw new Error("Il nome estratto è nullo o indefinito.");
      }
      const cleanExtractedName = extractedName.trim();
      console.log("Nome estratto dal PreliminaryParser:", cleanExtractedName);

      // Step 2: Ricerca su Salesforce
      const searchResult = await searchClientByName(cleanExtractedName);
      if (!searchResult.clients || searchResult.clients.length === 0) {
        await outputHandler.generate({
          status: 'error',
          context,
          message: "Nessun cliente trovato con il nome indicato.",
        });
        return;
      }

      if (searchResult.clients.length > 1) {
        // Più clienti trovati, richiede verifica da parte dell'utente
        this.pendingVerifications.set(chatId, searchResult.clients);
        await outputHandler.generate({
          status: 'verification',
          context,
          verificationOptions: searchResult.clients.map(client => ({
            name: client.clientName,
            createdDate: client.createdAt
              ? new Date(client.createdAt).toLocaleString('it-IT')
              : 'Data non disponibile',
          })),
        });
        return;
      }

      // Step 3: Un solo cliente trovato, continua con il flusso
      const verifiedClient = searchResult.clients[0];
      await this.processWithVerifiedClient(rawMessage, verifiedClient, context);
    } catch (error) {
      console.error("Errore durante l'elaborazione del messaggio:", error.message);
      await outputHandler.generate({
        status: 'error',
        context,
        message: "Errore durante l'esecuzione dell'azione.",
      });
    }
  }

  async handleAmbiguityResponse(response, context) {
    const { chatId } = context;
    const outputHandler = new OutputHandler();

    try {
      const options = this.pendingVerifications.get(chatId);
      if (!options) {
        await outputHandler.generate({
          status: 'error',
          context,
          message: "Nessuna verifica in corso per questo chat ID.",
        });
        return;
      }

      const userSelection = parseInt(response.trim(), 10);
      if (isNaN(userSelection) || userSelection < 1 || userSelection > options.length) {
        await outputHandler.generate({
          status: 'error',
          context,
          message: "Selezione non valida. Rispondi con 1, 2, 3, ecc.",
        });
        return;
      }

      const selectedClient = options[userSelection - 1];
      this.pendingVerifications.delete(chatId);
      console.log("Cliente selezionato:", selectedClient);

      // Continua con il flusso per il cliente selezionato
      await this.processWithVerifiedClient(response, selectedClient, context);
    } catch (error) {
      console.error("Errore durante la gestione della risposta all'ambiguità:", error.message);
      await outputHandler.generate({
        status: 'error',
        context,
        message: "Errore durante la gestione dell'ambiguità. Contatta il supporto.",
      });
    }
  }

  async processWithVerifiedClient(rawMessage, verifiedClient, context) {
    const { chatId } = context;

    try {
      // Step 1: Parsing del messaggio
      const inputParser = new InputParser();
      const normalizedData = await inputParser.parseMessage(rawMessage, verifiedClient);
      console.log("Dati normalizzati:", normalizedData);

      // Step 2: Gestione Azione
      const actionHandler = new ActionHandler();
      const actionResult = await new Promise((resolve) => {
        actionHandler.handle(normalizedData, context, resolve);
      });
      console.log("Risultato dell'azione:", actionResult);

      // Step 3: Output del risultato
      const outputHandler = new OutputHandler();
      await outputHandler.generate(actionResult);
    } catch (error) {
      console.error("Errore durante l'elaborazione del cliente verificato:", error.message);
      const outputHandler = new OutputHandler();
      await outputHandler.generate({
        status: 'error',
        context,
        message: "Errore durante l'elaborazione. Contatta il supporto.",
      });
    }
  }
}

module.exports = new Parser();
