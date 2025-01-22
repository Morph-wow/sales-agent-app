const PreliminaryParser = require('../../parsing/preliminaryparser');

describe('PreliminaryParser Integration Test', () => {
    test('Estrae correttamente il nome dal messaggio usando OpenAI', async () => {
        // Inizializza PreliminaryParser
        const preliminaryParser = new PreliminaryParser();

        // Messaggio di input
        const rawMessage = 'ok fissato appuntamento a mario domani alle 9';

        // Esegui il parsing del nome
        const extractedName = await preliminaryParser.extractName(rawMessage);

        // Log del risultato
        console.log('Nome estratto:', extractedName);

        // Verifica che il nome estratto sia corretto
        expect(extractedName).toBe('Mario');
    });
});
