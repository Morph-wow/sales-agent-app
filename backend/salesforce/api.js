const jsforce = require('jsforce');
const faye = require('faye');
require('dotenv').config();

const conn = new jsforce.Connection({
  loginUrl: process.env.SALESFORCE_LOGIN_URL,
});

// Test connessione a Salesforce
const testSalesforceConnection = async () => {
  try {
    console.log("Tentativo di connessione a Salesforce...");
    await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);
    console.log("Connesso a Salesforce con successo!");

    // Log dell'access token e dell'endpoint
    console.log("Access Token:", conn.accessToken);
    console.log("Instance URL:", conn.instanceUrl);
    console.log("Streaming Endpoint URL:", conn.streaming.endpointUrl);

    const identity = await conn.identity();
    console.log("Dettagli identità utente:", identity);
  } catch (err) {
    console.error("Errore nella connessione a Salesforce:", err);
  }
};

// Recupera nuovi lead
const getNewLeads = async () => {
  try {
    console.log("Recupero nuovi lead da Salesforce...");
    const query = "SELECT Id, FirstName, LastName, Email, Phone, MobilePhone, Company, LeadSource, Tipo_di_Richiesta__c FROM Lead WHERE IsConverted = false ORDER BY CreatedDate DESC LIMIT 10";
    const result = await conn.query(query);

    // Log del risultato dei lead
    console.log("Lead recuperati:", result.records);
    return result.records;
  } catch (err) {
    console.error("Errore durante il recupero dei lead da Salesforce:", err);
    return [];
  }
};

// Recupera ultimi 10 lead
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

    // Log dei lead recuperati
    console.log("Ultimi 10 lead:", result.records);
    return result.records;
  } catch (err) {
    console.error('Errore durante il recupero degli ultimi 10 lead da Salesforce:', err);
    throw err;
  }
};

// Esegue una query generica su Salesforce
const query = async (queryString) => {
  try {
    console.log("Esecuzione query su Salesforce:", queryString);
    const result = await conn.query(queryString);

    // Log del risultato
    console.log("Risultato della query:", result.records);
    return result.records;
  } catch (err) {
    console.error("Errore durante l'esecuzione della query:", err);
    throw err;
  }
};


// Recupera sessione Salesforce
const getSalesforceSession = async () => {
  try {
    if (!conn.accessToken || !conn.instanceUrl) {
      console.log("Access Token o Instance URL non presente. Eseguo il login...");
      await conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);
    }

    // Log della sessione recuperata
    console.log("Access Token:", conn.accessToken);
    console.log("Instance URL:", conn.instanceUrl);
    console.log("Streaming Endpoint URL:", conn.streaming.endpointUrl);

    return {
      accessToken: conn.accessToken,
      instanceUrl: conn.instanceUrl,
    };
  } catch (err) {
    console.error("Errore nel recupero della sessione Salesforce:", err);
    throw err;
  }
};

module.exports = {
  testSalesforceConnection,
  getNewLeads,
  getLatestLeads,
  getSalesforceSession,
  query,
  conn,
};
