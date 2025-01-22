require('dotenv').config();
const salesForceSearch = require('../../parsing/salesforcesearch');

describe('SalesforceSearch Real Case Test', () => {
    test('Ricerca cliente - nome estratto (pino)', async () => {
        const name = 'pino';

        // Esegui la ricerca del cliente
        const result = await salesForceSearch.searchClientByName(name);

        // Log dei risultati per verificarne il contenuto
        console.log('Risultato ricerca cliente:', result);

        // Verifica che la risposta contenga le informazioni attese
        expect(result).toHaveProperty('status');
if (result.status === 'success') {
    expect(result).toHaveProperty('clientName');
    expect(result.clientName).toContain(name); // Verifica che il nome o cognome contenga "pino"
    expect(result).toHaveProperty('clientId');
} else if (result.status === 'ambiguous') {
    expect(result.clients.length).toBeGreaterThan(1);
} else if (result.status === 'not_found') {
    expect(result.status).toBe('not_found');
}
    });
});
