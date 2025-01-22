const PreliminaryParser = require('../../parsing/preliminaryparser');
const salesforcesearch = require('../../parsing/salesforcesearch');
const OutputHandler = require('../../parsing/modules/outputhandler');
const InputParser = require('../../parsing/modules/inputparser');
const ActionHandler = require('../../parsing/modules/actionhandler');

test(
    'Integration Test 2 - Risposta all\'ambiguità e selezione cliente',
    async () => {
        const rawMessage = "Fissa un appuntamento per danielo lunedi prossimo alle 17";
        // Calcola la data corrente e "lunedì" in formato ISO
        const today = new Date();
        const currentDay = today.getDay();
        const daysUntilMonday = (8 - currentDay) % 7 || 7; // Calcola i giorni mancanti a lunedì
        const mondayDate = new Date(today);
        mondayDate.setDate(today.getDate() + daysUntilMonday);
        const expectedDate = mondayDate.toISOString().split('T')[0] + "T17:00:00Z";

        // Inizializza PreliminaryParser
        const preliminaryParser = new PreliminaryParser();

        // 1. PreliminaryParser estrae il nome
        const extractedName = await preliminaryParser.extractName(rawMessage);
        const cleanExtractedName = extractedName.replace("nome del cliente:", "").trim();
        console.log("Nome estratto normalizzato:", cleanExtractedName);
        expect(cleanExtractedName.toLowerCase()).toContain("danielo");

        // 2. SalesforceSearch cerca i clienti corrispondenti
        const searchResult = await salesforcesearch.searchClientByName(cleanExtractedName);
        console.log("Search Result Clients:", searchResult.clients);

        expect(searchResult.status).toBe("ambiguous");
        expect(searchResult.clients.length).toBeGreaterThan(1);

        // Simula pendingVerifications con i dati reali
        const chatId = "164653608";
        const pendingVerifications = new Map();
        pendingVerifications.set(chatId, searchResult.clients);

        const handleAmbiguityResponse = async (response, context) => {
            const options = pendingVerifications.get(context.chatId);
            if (!options) {
                return {
                    status: "error",
                    message: "Nessuna verifica in corso per questo chat ID.",
                };
            }

            const userSelection = parseInt(response, 10);
            if (isNaN(userSelection) || userSelection < 1 || userSelection > options.length) {
                return {
                    status: "error",
                    message: "Selezione non valida. Rispondi con 1, 2, 3, ecc.",
                };
            }

            const selectedClient = options[userSelection - 1];
            pendingVerifications.delete(context.chatId);
            return {
                status: "success",
                client: selectedClient,
            };
        };

        // 3. OutputHandler genera il messaggio di verifica
const outputhandler = new OutputHandler();
const verificationResult = {
  status: "verification",
  context: { chatId },
  verificationOptions: searchResult.clients.map(client => ({
    name: client.clientName,
    createdDate: client.createdAt,
  })),
};

// Genera il messaggio di verifica
const verificationMessage = await outputhandler.generate(verificationResult);
console.log("Verification Message Sent:", verificationMessage);

        // 4. Simula la risposta dell'utente
        const userResponse = "2"; // L'utente seleziona la seconda opzione
        const result = await handleAmbiguityResponse(userResponse, { chatId });
        console.log("Handle Ambiguity Response Result:", result);

        // Verifica che il cliente corretto sia stato selezionato
        expect(result.status).toBe("success");
        expect(result.client.clientName).toBe("danielo pasticcio");
        console.log("Dati passati all'InputParser:", {
    rawMessage,
    verifiedClient: result.client,
});
console.log("Dati passati all'InputParser:", {
    rawMessage,
    verifiedClient: result.client,
});


        // 5. Passaggio all'InputParser
        const inputParser = new InputParser();
        const normalizedData = await inputParser.parseMessage(rawMessage, result.client);
        console.log("Normalized Data:", normalizedData);

        // Verifica i dati normalizzati
        expect(normalizedData.intent).toBe("schedule_appointment"); // Nuova verifica per l'intent
        expect(normalizedData.entities.clientId).toBe(result.client.clientId);
        expect(normalizedData.entities.clientName).toBe(result.client.clientName);
        expect(normalizedData.entities.date).toBe(expectedDate);
        expect(normalizedData.entities.time).toBe("17:00:00");
        console.log("Risultati attesi:", {
            clientId: result.client.clientId,
            clientName: result.client.clientName,
            date: expectedDate,
            time: "17:00:00",
            intent: "schedule_appointment",
        });
        console.log("Risultati ottenuti:", normalizedData.entities);

        // 6. Passaggio ad ActionHandler
const actionHandler = ActionHandler;
const context = { chatId };

const actionHandlerPromise = new Promise((resolve, reject) => {
  actionHandler.handle(normalizedData, context, (actionResult) => {
    if (actionResult.status === "success") {
      resolve(actionResult);
    } else {
      reject(actionResult);
    }
  });
});

let actionResult;

try {
  actionResult = await actionHandlerPromise;
  console.log("ActionHandler Result:", actionResult);

  // Verifica il risultato dell'ActionHandler
  expect(actionResult.status).toBe("success");
  expect(actionResult.message).toContain("Appuntamento fissato con successo");
  expect(actionResult.result).toBeDefined();
} catch (error) {
  console.error("ActionHandler Error:", error);
  throw new Error("ActionHandler ha generato un errore durante il test.");
}
console.log("Messaggio passato a OutputHandler:", actionResult.message);

// 7. Passaggio a OutputHandler per il risultato finale
const outputHandler = new OutputHandler();
try {
  console.log("Messaggio passato a OutputHandler:", actionResult.message);

  const outputResult = await outputHandler.generate(actionResult);
  console.log("OutputHandler Result:", outputResult);

  // Verifica il risultato di OutputHandler
  expect(outputResult.status).toBe("success");
  expect(outputResult.message.text).toBe("Azione completata con successo."); // Verifica il messaggio generico
} catch (error) {
  console.error("OutputHandler Error:", error);
  throw new Error("OutputHandler ha generato un errore durante il test.");
}


  },
  15000 // Timeout esteso
);

