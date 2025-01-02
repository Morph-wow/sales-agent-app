const { conn } = require('./api');
const faye = require('faye');
const { sendToTelegram } = require('../telegram/bot'); // Importa la funzione per inviare messaggi a Telegram

// Funzione per normalizzare i numeri di telefono
const normalizePhoneNumber = (phone, mobilePhone) => {
  const numberToNormalize = mobilePhone || phone;
  if (!numberToNormalize) return "N/A";

  let normalizedNumber = numberToNormalize.trim();

  if (normalizedNumber.startsWith('+')) {
    return normalizedNumber.replace(/^(\\+\\d{1,3})(\\d{3})(.*)$/, '$1 $2 $3').trim();
  }

  return normalizedNumber.replace(/^(\\d{3})(.*)$/, '$1 $2').trim();
};

// Funzione per formattare i lead
const formatLeadMessage = (lead, index = null) => {
  let message = '';
  if (index !== null) {
    message += `#${index + 1}\n`;
  }
  message += `- *Nome*: ${lead.FirstName || "[non fornito]"} ${lead.LastName || "[non fornito]"}\n`;
  message += `- *Email*: ${lead.Email || "[non fornito]"}\n`;
  message += `- *Telefono*: ${normalizePhoneNumber(lead.Phone, lead.MobilePhone)}\n`;
  message += `- *Azienda*: ${lead.Company || "[non fornito]"}\n`;
  message += `- *Fonte*: ${lead.LeadSource || "N/A"}\n`;
  message += `- *Tipo di Richiesta*: ${lead.Tipo_di_Richiesta__c || "N/A"}\n`;
  message += `- *ID Cliente*: ${lead.Id}\n\n`;
  return message;
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

      const { FirstName, LastName, Email, MobilePhone, Tipo_di_Richiesta__c } = message.sobject;

      if (!FirstName || !LastName || !Email || !MobilePhone) {
        console.warn("Lead ricevuto con campi obbligatori mancanti:", message.sobject);
        return;
      }

      const leadDetails = `
        Nuovo Lead Ricevuto!
        Nome: ${FirstName} ${LastName}
        Email: ${Email}
        Cellulare: ${MobilePhone}
        Tipo di Richiesta: ${Tipo_di_Richiesta__c || "Non specificato"}
      `;

      // Invio del messaggio a Telegram
      console.log("Invio dei dettagli del lead al bot Telegram...");
      sendToTelegram(leadDetails);
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
