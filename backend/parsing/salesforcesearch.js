const salesforceApi = require('../salesforce/api'); // Modulo API Salesforce

/**
 * Cerca un cliente su Salesforce per nome.
 * @param {string} name - Nome del cliente da cercare.
 * @returns {Promise<object>} - Risultato della ricerca (success, ambiguous, not_found).
 */
async function searchClientByName(name) {
    try {
        // Query Salesforce per il nome del cliente
        const query = `SELECT Id, Name, CreatedDate FROM Contact WHERE Name LIKE '%${name}%'`;
        const results = await salesforceApi.query(query);

        if (!results || results.length === 0) {
            return { status: 'not_found' };
        }

        if (results.length === 1) {
            const client = results[0];
            return {
                status: 'success',
                clientId: client.Id,
                clientName: client.Name
            };
        }

        // Più clienti trovati
        const clients = results.map(client => ({
            clientId: client.Id,
            clientName: client.Name,
            createdAt: client.CreatedDate
        }));

        return {
            status: 'ambiguous',
            clients
        };
    } catch (error) {
        console.error('Errore durante la ricerca del cliente su Salesforce:', error);
        throw new Error('Errore durante la ricerca su Salesforce.');
    }
}

module.exports = {
    searchClientByName
};
