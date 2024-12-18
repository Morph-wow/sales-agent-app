const express = require('express');
const dotenv = require('dotenv');
const { testSalesforceConnection } = require('./salesforce');
const { startTelegramBot } = require('./telegram');

// Carica le variabili di ambiente
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

// Avvia il server
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
