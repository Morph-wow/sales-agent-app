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
module.exports = { testSalesforceConnection };
