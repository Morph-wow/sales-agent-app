require('dotenv').config();
const { OpenAI } = require('openai');

// Configura l'istanza OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Usa la chiave API dal file .env
});

class PreliminaryParser {
    async extractName(rawMessage) {
        try {
            const prompt = `Analizza il seguente messaggio e restituisci solo il nome del cliente. Se non trovi un nome, restituisci "Nessun nome trovato".\n\n"${rawMessage}"`;

            // Chiamata al completamento di chat
            const response = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
            });

            // Estrazione del nome dalla risposta
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
