const { query } = require('../salesforce/api'); // Importa la funzione query da api.js

async function searchClientByName(name) {
    try {
        // Query Salesforce per il nome del cliente
        const queryString = `
           SELECT Id, FirstName, LastName, CreatedDate 
            FROM Lead
            WHERE FirstName LIKE '%${name}%' OR LastName LIKE '%${name}%'
        `;
        console.log("Esecuzione query su Salesforce:", queryString);
        const results = await query(queryString);
        console.log("Risultati grezzi della query:", JSON.stringify(results, null, 2));

        if (!results || results.length === 0) {
            return { status: 'not_found' };
        }

        if (results.length === 1) {
            const client = results[0];
            return {
                status: 'success',
                clientId: client.Id,
                clientName: `${client.FirstName} ${client.LastName}`.trim(),
            };
        }

        // Più clienti trovati
        const clients = results.map(client => ({
            clientId: client.Id,
            clientName: `${client.FirstName} ${client.LastName}`.trim(),
            createdAt: client.CreatedDate,
        }));

        return {
            status: 'ambiguous',
            clients,
        };
    } catch (error) {
        console.error('Errore durante la ricerca del cliente su Salesforce:', error);
        throw new Error('Errore durante la ricerca su Salesforce.');
    }
}

module.exports = {
    searchClientByName,
};
