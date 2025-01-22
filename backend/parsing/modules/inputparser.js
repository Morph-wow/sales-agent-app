require('dotenv').config();
const { OpenAI } = require('openai');
const { normalizeDateTime } = require('../normalizers');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

class InputParser {
    constructor() {
        this.today = this.calculateToday();
    }

    calculateToday() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    async preparseDate(originalMessage) {
        let normalizedDate = null;

        try {
            // Usa normalizzatori per estrarre e normalizzare la data
            const extractedDateInfo = this.extractDateInfo(originalMessage);
            if (extractedDateInfo) {
                normalizedDate = normalizeDateTime(
                    extractedDateInfo.day,
                    extractedDateInfo.time
                );
                console.log("Data normalizzata con normalizers:", normalizedDate);
            }
        } catch (error) {
            console.warn("Normalizers non è riuscito a normalizzare la data. Passo all'IA.", error.message);
        }

        // Fallback su OpenAI se normalizzatori falliscono
        if (!normalizedDate) {
            try {
                const datePrompt = `
                    Sei un assistente che interpreta date relative in base alla data corrente.
                    Oggi è ${this.today}. Determina una data esatta dal seguente input:
                    "${originalMessage}".

                    Rispondi esclusivamente con una data in formato JSON con due campi: "date" (ISO YYYY-MM-DD) e "time" (HH:mm).
                    Esempio: {"date": "2025-01-17", "time": "15:00"}.
                `;

                const aiResponse = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "user", content: datePrompt }],
                });

                const aiResult = JSON.parse(aiResponse.choices[0].message.content.trim());
                normalizedDate = `${aiResult.date}T${aiResult.time}:00Z`;
                console.log("Data normalizzata con l'IA:", normalizedDate);
            } catch (error) {
                console.error("Errore durante il parsing della data con l'IA:", error.message);
                throw new Error("Impossibile normalizzare la data.");
            }
        }

        return normalizedDate;
    }

    extractDateInfo(originalMessage) {
        // Implementa una logica per estrarre day e time dal messaggio
        const dateRegex = /(domani|dopodomani|tra una settimana|lunedì|martedì|mercoledì|giovedì|venerdì|sabato|domenica)\s*(alle)?\s*(\d{1,2}:\d{2})?/i;
        const match = originalMessage.match(dateRegex);

        if (match) {
            return {
                day: match[1],
                time: match[3] || "00:00", // Se l'orario non è specificato, default a mezzanotte
            };
        }
        throw new Error("Nessuna informazione valida sulla data trovata nel messaggio.");
    }

    async parseMessage(originalMessage, verifiedClient) {
        try {
            console.log("InputParser - Parametri ricevuti:", { originalMessage, verifiedClient });

            const today = this.today;

            const prompt = `Sei un assistente che analizza messaggi per estrarre intenti e dettagli strutturati.
            Rispondi esclusivamente in formato JSON. Non aggiungere testo extra.

            Oggi è ${today}. Usa questa data come riferimento per interpretare indicazioni temporali relative come "domani" o "dopodomani".

            Cliente verificato:
            - Nome: ${verifiedClient?.clientName}
            - ID Cliente: ${verifiedClient?.clientId}

            Utilizza il nome e l'ID cliente indicati sopra per popolare rispettivamente i campi "clientName" e "clientId" nel JSON.

            Esempio:
            Input: "Fissa un appuntamento per mario domani alle 15"
            Output:
            {
              "intent": "schedule_appointment",
              "entities": {
                "clientName": "Mario Rossi",
                "clientId": "12345",
                "date": "2025-01-17T15:00:00Z",
                "time": "15:00:00"
              }
            }

            Analizza il seguente messaggio: "${originalMessage}"`;

            console.log("Prompt generato per OpenAI:", prompt);

            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });

            const result = JSON.parse(response.choices[0].message.content);
            console.log("Risposta completa da OpenAI:", response);

            // Fallback per garantire che clientName e clientId siano presenti
            result.entities.clientName = result.entities.clientName || verifiedClient.clientName;
            result.entities.clientId = result.entities.clientId || verifiedClient.clientId;

            if (!result.intent || !result.entities) {
                throw new Error("Risultato incompleto o malformato.");
            }

            return result;
        } catch (error) {
            console.error("Errore durante il parsing:", error.message);
            throw new Error("Errore durante il parsing del messaggio.");
        }
    }
}

module.exports = InputParser;
