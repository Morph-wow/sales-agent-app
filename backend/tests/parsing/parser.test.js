
const outputhandler = require('../../parsing/modules/outputhandler'); // Modulo reale di outputhandler
const normalizers = require('../../parsing/normalizers'); // Modulo reale di normalizzazione

process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'key-placeholder';


const OpenAI = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);

// Passa l'istanza di OpenAI come parametro ai moduli o ai test
const Parser = require('../../parsing/parser');
const parser = new Parser({ openai });

describe('parser.js', () => {
  test('Analizza correttamente un input completo', async () => {
    const message = 'Fissa appuntamento con Mario Rossi lunedì alle 17';
    const context = { userId: 123, chatId: 456 };

    const result = await parser.parseMessage(message, context);

    expect(result).toEqual({
      intent: 'schedule_appointment',
      entities: {
        person: 'Mario Rossi',
        day: 'lunedì',
        hour: '17',
        dateTime: '2025-01-13T17:00:00.000Z',
      },
    });
  });

  test('Gestisce input incompleti', async () => {
    const message = 'Fissa appuntamento con Mario Rossi alle 17';
    const context = { userId: 123, chatId: 456 };

    const result = await parser.parseMessage(message, context);

    expect(result).toEqual({
      intent: 'schedule_appointment',
      entities: {
        person: 'Mario Rossi',
        hour: '17',
      },
    });
  });

  test('Restituisce errore per input non riconosciuti', async () => {
    const message = 'Ciao, come stai?';
    const context = { userId: 123, chatId: 456 };

    const result = await parser.parseMessage(message, context);

    expect(result).toEqual({
      intent: null,
      entities: {},
    });
  });
});
