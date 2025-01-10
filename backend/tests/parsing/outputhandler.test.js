const outputhandler = require('../../parsing/modules/outputhandler');
const telegramSender = require('../../telegram/telegramsender');

jest.mock('../../telegram/telegramsender', () => ({
  sendMessage: jest.fn(),
  sanitizeMarkdown: jest.fn((message) => message.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')),
}));

describe('outputhandler.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Genera output correttamente per un risultato valido', async () => {
    const actionResult = {
      status: 'success',
      message: 'Appuntamento creato con successo.',
      context: { chatId: 456, userId: 123 },
    };

    telegramSender.sendMessage.mockResolvedValueOnce({ status: 'success' });

    const result = await outputhandler.generate(actionResult);

    expect(telegramSender.sanitizeMarkdown).toHaveBeenCalledWith(actionResult.message);
    expect(telegramSender.sendMessage).toHaveBeenCalledWith(456, expect.stringContaining('Azione completata con successo:'));
    expect(result).toEqual({ status: 'success', message: { status: 'success' } });
  });

  test('Gestisce errori nella generazione dell\'output', async () => {
    const actionResult = {
      status: 'error',
      message: 'Errore durante la creazione dell\'appuntamento.',
      context: { chatId: undefined, userId: 123 },
    };

    telegramSender.sendMessage.mockRejectedValueOnce(new Error("chatId non definito o mancante."));

    await expect(outputhandler.generate(actionResult)).rejects.toThrow('chatId non definito o mancante.');
  });
});
