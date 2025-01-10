const { Configuration, OpenAIApi } = require('openai');

class PreliminaryParser {
    constructor({ openaiClient }) {
        this.openaiClient = openaiClient;
    }

    async extractName(rawMessage) {
        try {
            const prompt = `Analizza il seguente messaggio e restituisci solo il nome  del cliente. Se non trovi un nome, restituisci "Nessun nome trovato".\n\n"${rawMessage}"`;
            
            const response = await this.openaiClient.chat.completions.create({
                model: "gpt-3.5-turbo", // Modello economico per operazioni semplici
                messages: [{ role: "user", content: prompt }],
            });

            const extractedName = response.choices[0].message.content.trim();

            if (extractedName === "Nessun nome trovato") {
                return null;
            }

            return extractedName;
        } catch (error) {
            console.error("Errore durante l'estrazione del nome:", error.message);
            throw new Error("Errore nell'estrazione del nome.");
        }
    }
}

module.exports = PreliminaryParser;
