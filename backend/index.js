const express = require('express');
const dotenv = require('dotenv');
const { testSalesforceConnection, getSalesforceSession, listenForNewLeads } = require('./salesforce');
const { startTelegramBot } = require('./telegram');
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

// Avvia il bot Telegram
startTelegramBot();

// Configura e avvia CometD per Salesforce
(async () => {
  try {
    const session = await getSalesforceSession();

    const client = new faye.Client(`${session.instanceUrl}/cometd/50.0/`);

    client.setHeader('Authorization', `Bearer ${session.accessToken}`);

    client.subscribe('/topic/NewLeadPushTopic', (message) => {
      console.log('Nuovo messaggio ricevuto:', message);
      console.log('Invocazione di listenForNewLeads...');
      // Aggiungi qui la logica per gestire i nuovi lead e inviarli su Telegram
      listenForNewLeads(message);
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
