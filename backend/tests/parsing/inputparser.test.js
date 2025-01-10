require('dotenv').config();
const OpenAI = require('openai');
const InputParser = require('../../parsing/modules/inputparser');

describe('InputParser', () => {
    let inputParser;

    beforeAll(() => {
        const openaiClient = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        inputParser = new InputParser({ openaiClient });
    });

    test('Analizza correttamente un input completo', async () => {
        const message = 'Fissa appuntamento con Mario Rossi lunedì alle 17';
        const context = { userId: 123, chatId: 456 };

        const result = await inputParser.parseMessage(message, context);

        expect(result.intent).toBe('schedule_appointment');
        expect(result.entities).toEqual({
            person: 'Mario Rossi',
            day: 'lunedì',
            hour: '17',
        });
    });

    test('Gestisce input incompleti', async () => {
        const message = 'Fissa appuntamento con Mario Rossi alle 17';
        const context = { userId: 123, chatId: 456 };

        const result = await inputParser.parseMessage(message, context);

        expect(result.intent).toBe('schedule_appointment');
        expect(result.entities).toEqual({
            person: 'Mario Rossi',
            hour: '17',
        });
    });

    test('Restituisce errore per input non riconosciuti', async () => {
        const message = 'Ciao, come stai?';
        const context = { userId: 123, chatId: 456 };

        const result = await inputParser.parseMessage(message, context);

        expect(result.intent).toBe(null);
        expect(result.entities).toEqual({});
    });
});

