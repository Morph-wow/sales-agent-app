const { conn } = require('./api');
const faye = require('faye');
const { sendToTelegram } = require('../telegram/telegramsender'); // Usa telegramsender.js per inviare messaggi
const { formatLeadMessage } = require('../formatters'); // Importa la funzione di formattazione

// Funzione per normalizzare i numeri di telefono
const normalizePhoneNumber = (phone, mobilePhone) => {
  const numberToNormalize = mobilePhone || phone;
  if (!numberToNormalize) return "N/A";

  let normalizedNumber = numberToNormalize.trim();

  if (normalizedNumber.startsWith('+')) {
    return normalizedNumber.replace(/^\+(\d{1,3})(\d{3})(.*)$/, '$1 $2 $3').trim();
  }

  return normalizedNumber.replace(/^(\d{3})(.*)$/, '$1 $2').trim();
};

// Funzione per ascoltare nuovi lead tramite PushTopic
const listenForNewLeads = async () => {
  try {
    console.log("Avvio dell'ascolto per nuovi lead tramite PushTopic...");

    // Login su Salesforce
    console.log("Tentativo di login su Salesforce...");
    await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);
    console.log("Login su Salesforce riuscito!");

    // Configurazione dell'endpoint streaming
    const instanceUrl = conn.instanceUrl;
    const apiVersion = '50.0';
    const streamingEndpoint = `${instanceUrl}/cometd/${apiVersion}/`;
    console.log("Endpoint streaming calcolato manualmente:", streamingEndpoint);

    const client = new faye.Client(streamingEndpoint);
    client.setHeader('Authorization', `OAuth ${conn.accessToken}`);
    console.log("Client Faye configurato correttamente.");

    // Sottoscrizione al PushTopic
    const subscription = client.subscribe('/topic/NewLeadPushTopic', (message) => {
      console.log("Nuovo lead ricevuto:", message);

      const formattedMessage = formatLeadMessage(message.sobject); // Usa formatLeadMessage

      if (!formattedMessage) {
        console.warn("Messaggio formattato non valido per il lead ricevuto:", message.sobject);
        return;
      }

      // Invio del messaggio a Telegram
      console.log("Invio dei dettagli del lead al bot Telegram...");
      console.log("Messaggio pronto per Telegram:", formattedMessage);
      sendToTelegram(formattedMessage);
    });

    subscription.callback(() => {
      console.log("Sottoscrizione al PushTopic avvenuta con successo.");
    });

    subscription.errback((error) => {
      console.error("Errore nella sottoscrizione al PushTopic:", error);
    });
  } catch (err) {
    console.error("Errore durante l'ascolto per nuovi lead:", err);
  }
};

// Debug: verifica del caricamento del file
console.log("Caricamento di utils.js nella cartella Salesforce avvenuto con successo.");
console.log("Funzioni esportate:", {
  normalizePhoneNumber: typeof normalizePhoneNumber,
  formatLeadMessage: typeof formatLeadMessage,
  listenForNewLeads: typeof listenForNewLeads,
});

module.exports = { normalizePhoneNumber, formatLeadMessage, listenForNewLeads };
