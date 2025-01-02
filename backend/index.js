// Cancella la cache dei moduli
Object.keys(require.cache).forEach((key) => {
  delete require.cache[key];
});


const express = require('express');
const dotenv = require('dotenv');
const { testSalesforceConnection, getSalesforceSession } = require('./salesforce/api');
const { listenForNewLeads } = require('./salesforce/utils');
const { startTelegramBot } = require('./telegram/bot');
const faye = require('faye');

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

// Configura e avvia CometD per Salesforce
(async () => {
  try {
    console.log("Inizio configurazione del client CometD...");
    const session = await getSalesforceSession();

    // Log dettagliati per il debugging
    console.log("Instance URL:", session.instanceUrl);
    console.log("Access Token:", session.accessToken);

    // Configura il client Faye
    const endpointUrl = `${session.instanceUrl}/cometd/50.0/`;
    console.log("Streaming Endpoint URL:", endpointUrl);

    const client = new faye.Client(endpointUrl);

    client.setHeader('Authorization', `Bearer ${session.accessToken}`);
    console.log("Client Faye configurato correttamente.");

    client.subscribe('/topic/NewLeadPushTopic', (message) => {
      console.log('Nuovo messaggio ricevuto:', message);
      console.log('Invocazione di listenForNewLeads...');
      listenForNewLeads((details) => {
        console.log('Dettagli lead pronti per Telegram:', details);
      });
    });

    client.on('transport:down', () => {
      console.error('Connessione CometD persa.');
    });

    client.on('transport:up', () => {
      console.log('Connessione CometD ristabilita.');
    });

    console.log('Client CometD configurato e in ascolto.');
  } catch (error) {
    console.error('Errore durante la configurazione del client CometD:', error);
  }
})();

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
