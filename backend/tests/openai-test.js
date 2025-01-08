require('dotenv').config({ path: '/home/ec2-user/sales-agent-app/backend/.env' });

const config = require('../config');

const OpenAI = require('openai');


// Configurazione
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Assicurati che la variabile di ambiente sia impostata correttamente
  });

// Test API
(async () => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4', // Sostituisci con il modello desiderato
      messages: [{ role: 'user', content: 'Hello, how can I assist you today?' }],
    });
    console.log('Risposta:', response.choices[0].message.content);
  } catch (error) {
    console.error('Errore nella connessione a OpenAI:', error.message);
    console.error('Errore dettagliato:', error);
  }
})();
