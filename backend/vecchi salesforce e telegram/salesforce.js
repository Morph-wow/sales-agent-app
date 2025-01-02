const jsforce = require('jsforce');
const faye = require('faye');
require('dotenv').config();

const conn = new jsforce.Connection({
  loginUrl: process.env.SALESFORCE_LOGIN_URL
});

const testSalesforceConnection = async () => {
  try {
    console.log("Tentativo di connessione a Salesforce...");
    console.log("Username:", process.env.SALESFORCE_USERNAME);
    console.log("Password + Token:", process.env.SALESFORCE_PASSWORD);

    await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);
    console.log("Connesso a Salesforce con successo!");
    // Stampa alcune informazioni per conferma
    const identity = await conn.identity();
    console.log("Dettagli identità utente:", identity);
  } catch (err) {
    console.error("Errore nella connessione a Salesforce:", err);
  }
};

// Funzione per recuperare nuovi lead da Salesforce
const getNewLeads = async () => {
  try {
    console.log("Recupero nuovi lead da Salesforce...");
    const query = "SELECT Id, FirstName, LastName, Email, Phone, MobilePhone, Company, LeadSource, Tipo_di_Richiesta__c FROM Lead WHERE IsConverted = false ORDER BY CreatedDate DESC LIMIT 10";
    const result = await conn.query(query);
    console.log("Nuovi lead trovati:", result.records);
    return result.records; // Ritorna i lead trovati
  } catch (err) {
    console.error("Errore durante il recupero dei lead da Salesforce:", err);
    return [];
  }
};

// Funzione per recuperare gli ultimi 10 lead
const getLatestLeads = async () => {
  try {
    console.log('Recupero gli ultimi 10 lead da Salesforce...');
    const query = `
      SELECT Id, FirstName, LastName, Email, Phone, MobilePhone, Company, LeadSource, Tipo_di_Richiesta__c 
      FROM Lead
      ORDER BY CreatedDate DESC
      LIMIT 10
    `;
    const result = await conn.query(query);
    console.log('Lead trovati:', result.records);
    return result.records; // Ritorna i lead trovati
  } catch (err) {
    console.error('Errore durante il recupero degli ultimi 10 lead da Salesforce:', err);
    throw err; // Lancia l'errore per gestirlo altrove
  }
};

// Funzione per ascoltare nuovi lead tramite PushTopic
const listenForNewLeads = async () => {
  try {
    console.log("Avvio dell'ascolto per nuovi lead tramite PushTopic...");
    await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);

    const client = new faye.Client(conn.streaming.endpointUrl);
    client.setHeader('Authorization', `OAuth ${conn.accessToken}`);

    const subscription = client.subscribe('/topic/NewLeadPushTopic', (message) => {
      console.log("Nuovo lead ricevuto:", message);

      const { FirstName, LastName, Email, MobilePhone, Tipo_di_Richiesta__c } = message.sobject;

      // Verifica che i campi obbligatori siano presenti
      if (!FirstName || !LastName || !Email || !MobilePhone) {
        console.warn("Lead ricevuto con campi obbligatori mancanti:", message.sobject);
        return;
      }

      // Logica per inviare i dettagli al bot Telegram
      const leadDetails = `
        Nuovo Lead Ricevuto!
        Nome: ${FirstName} ${LastName}
        Email: ${Email}
        Cellulare: ${MobilePhone}
        Tipo di Richiesta: ${Tipo_di_Richiesta__c || "Non specificato"}
      `;
      console.log("Invio al bot Telegram:", leadDetails);
      sendToTelegram(leadDetails); // Assicurati che `sendToTelegram` sia definito
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


const getSalesforceSession = async () => {
  try {
    if (!conn.accessToken || !conn.instanceUrl) {
      console.log("Connessione non attiva. Tentativo di login...");
      await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);
      console.log("Login eseguito con successo!");
    } else {
      console.log("Connessione Salesforce già attiva.");
    }

    console.log("AccessToken:", conn.accessToken ? "Presente" : "Assente");
    console.log("InstanceUrl:", conn.instanceUrl ? conn.instanceUrl : "Assente");

    return {
      accessToken: conn.accessToken,
      instanceUrl: conn.instanceUrl,
    };
  } catch (err) {
    console.error("Errore nel recupero della sessione Salesforce:", err);
    throw err; // Lancia l'errore per la gestione a monte
  }
};



module.exports = { 
  testSalesforceConnection, 
  getNewLeads, 
  getLatestLeads, 
  listenForNewLeads, 
  getSalesforceSession 
};

