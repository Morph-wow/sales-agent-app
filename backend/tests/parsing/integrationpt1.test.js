const PreliminaryParser = require('../../parsing/preliminaryparser');
const salesforcesearch = require('../../parsing/salesforcesearch');

const PreliminaryParser = require('../parsing/preliminaryparser'); // Importa la classe
const preliminaryParser = new PreliminaryParser(); // Crea un'istanza

const OutputHandler = require('../../parsing/modules/outputhandler'); // Importa la classe
const outputhandler = new OutputHandler(); // Crea un'istanza
test('Gestione ambiguità - Flusso reale con dati esistenti', async () => {
    // Input grezzo simulato
    const rawMessage = "Fissa un appuntamento per danielo alle 9";

    // 1. PreliminaryParser estrae il nome
    const extractedName = await preliminaryParser.extractName(rawMessage);
    expect(extractedName.toLowerCase()).toEqual("danielo");

    // 2. SalesforceSearch cerca i clienti corrispondenti
    const searchResult = await salesforcesearch.searchClientByName(extractedName);

    // Verifica che ci sia un'ambiguità
    expect(searchResult.status).toBe("ambiguous");
    expect(searchResult.clients.length).toBeGreaterThan(1); // Assicuriamoci che ci sia ambiguità

    // 3. OutputHandler gestisce l'ambiguità
    const actionResult = {
        status: "verification",
        message: null,
        context: { chatId: "164653608" }, // Chat ID di test
        verificationOptions: searchResult.clients.map(client => ({
            name: client.clientName,
            createdDate: client.createdAt,
        })),
    };

    const outputMessage = await outputhandler.generate(actionResult);

    // Verifica che il messaggio generato sia corretto
    const expectedRegex = new RegExp(
        `\\*Verifica Cliente\\*\\nAbbiamo trovato più clienti con il nome indicato\\. Rispondi con il numero corrispondente per selezionare il cliente corretto:\\n` +
        searchResult.clients.map(
            (client, index) => `\\n${index + 1}\\. Nome: ${client.clientName} \\(Creato il: .*\\)`
        ).join("")
    );
    expect(outputMessage.message.text).toMatch(expectedRegex);
});



