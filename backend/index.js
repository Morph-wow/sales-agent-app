// Cancella la cache dei moduli
Object.keys(require.cache).forEach((key) => {
  delete require.cache[key];
});

const express = require('express');
const dotenv = require('dotenv');
const { testSalesforceConnection } = require('./salesforce/api');
const { startTelegramBot, startListeningForLeads } = require('./telegram/bot');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per il parsing del body
app.use(express.json());

// Route principale
app.get('/', (req, res) => {
  res.send('Sales Agent Backend è attivo!');
});

// Avvia connessione a Salesforce
testSalesforceConnection();

// Verifica che startTelegramBot sia importato correttamente
console.log("Tipo di startTelegramBot importato:", typeof startTelegramBot);

if (typeof startTelegramBot === 'function') {
  console.log("Avvio del bot Telegram...");
  startTelegramBot();
  console.log("Bot Telegram avviato con successo.");
} else {
  console.error("Errore: startTelegramBot non è una funzione.");
}


// Avvia il listening per nuovi lead
if (typeof startListeningForLeads === 'function') {
  console.log("Avvio dell'ascolto per nuovi lead...");
  startListeningForLeads();
} else {
  console.error("Errore: startListeningForLeads non è una funzione.");
}

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});

console.log("Moduli caricati:", Object.keys(require.cache));
