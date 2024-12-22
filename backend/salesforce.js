const jsforce = require('jsforce');
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
    const query = "SELECT Id, FirstName, LastName, Email, Phone, Company, LeadSource FROM Lead WHERE IsConverted = false ORDER BY CreatedDate DESC LIMIT 10";
    const result = await conn.query(`
  SELECT Id, FirstName, LastName, Email, Phone, Company, LeadSource
  FROM Lead
  WHERE IsConverted = false
  ORDER BY CreatedDate DESC
  LIMIT 5
`);
    console.log("Nuovi lead trovati:", result.records);
    return result.records; // Ritorna i lead trovati
  } catch (err) {
    console.error("Errore durante il recupero dei lead da Salesforce:", err);
    return [];
  }
};

//Funzione per recuperare gli ultimi 10 leads
const getLatestLeads = async () => {
  try {
    console.log('Recupero gli ultimi 10 lead da Salesforce...');
    const query = `
      SELECT Id, FirstName, LastName, Email, Phone, Company, LeadSource 
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

module.exports = { testSalesforceConnection, getNewLeads, getLatestLeads };
