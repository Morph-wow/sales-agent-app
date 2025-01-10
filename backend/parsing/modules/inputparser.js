const normalizers = require('./normalizers');
const salesForceSearch = require('./salesforcesearch');

class InputParser {
  constructor({ openaiClient }) {
    this.openaiClient = openaiClient; // OpenAI Client
  }

  /**
   * Normalizza i dati ricevuti.
   * @param {Object} rawData - Dati grezzi forniti da Parser.
   * @returns {Object} Dati normalizzati.
   */
  async parse(rawData) {
    const { message, verifiedName } = rawData;
    const { name, clientId } = verifiedName;

    if (!clientId) {
      throw new Error("ID cliente non valido. Verifica il processo di ricerca del cliente.");
    }

    let parsedMessage;
    try {
      // Chiamata a OpenAI per analizzare il messaggio
      parsedMessage = await this.callOpenAI(message);
    } catch (error) {
      console.error("Errore durante il parsing con OpenAI:", error.message);
      // Fallback con normalizzatori predefiniti
      parsedMessage = {
        intent: null,
        entities: {
          date: normalizers.normalizeDate(message),
          time: normalizers.normalizeTime(message),
        },
      };
    }

    const { intent, entities } = parsedMessage;
    const date = entities.date || normalizers.normalizeDate(message);
    const time = entities.time || normalizers.normalizeTime(message);

    if (!intent || !date || !time) {
      throw new Error("Dati incompleti dopo l'elaborazione.");
    }

    const normalizedName = `${name} (ID: ${clientId})`;

    // Costruzione dei dati normalizzati
    return {
      intent,
      entities: {
        clientName: normalizedName,
        clientId,
        date,
        time,
      },
    };
  }

  /**
   * Chiamata a OpenAI per analizzare il messaggio.
   * @param {String} message - Messaggio grezzo dell'utente.
   * @returns {Object} Risultato del parsing di OpenAI.
   */
  async callOpenAI(message) {
    try {
      const response = await this.openaiClient.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
Sei un assistente che analizza messaggi per estrarre intenti e dettagli strutturati.
Rispondi esclusivamente in formato JSON. Non aggiungere testo extra.
Se non riesci a identificare entità o intenzioni, restituisci:
{
  "intent": null,
  "entities": {}
}
Esempio:
Input: "Fissa un appuntamento con Mario Rossi domani alle 15"
Output:
{
  "intent": "schedule_appointment",
  "entities": {
    "clientName": "Mario Rossi",
    "date": "YYYY-MM-DD",
    "time": "15:00"
  }
}
Analizza il seguente messaggio: "${message}"
            `,
          },
          { role: 'user', content: `Analizza il seguente messaggio: "${message}"` },
        ],
        temperature: 0.2,
      });

      const result = JSON.parse(response.choices[0].message.content);

      if (!result.intent || !result.entities) {
        throw new Error("Risultato OpenAI incompleto.");
      }

      return result;
    } catch (error) {
      console.error("Errore durante il parsing con OpenAI:", error.message);
      throw error;
    }
  }
}

module.exports = InputParser;
