const OutputHandler = require('../../parsing/modules/outputhandler');
const { sendMessage, sanitizeMarkdown } = require('../../telegram/telegramsender');

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

    sendMessage.mockResolvedValueOnce({ status: 'success' });

    const handler = new OutputHandler();
    const result = await handler.generate(actionResult);

    expect(sanitizeMarkdown).toHaveBeenCalledWith(actionResult.message);
    expect(sendMessage).toHaveBeenCalledWith(456, expect.stringContaining('Azione completata con successo:'));
    expect(result).toEqual({ status: 'success', message: { status: 'success' } });
  });

  test('Genera un messaggio di verifica correttamente', async () => {
    const actionResult = {
      type: 'verification',
      context: { chatId: 456 },
      options: [
        { name: 'Mario Rossi', creationDate: '2023-01-01' },
        { name: 'Mario Rossi', creationDate: '2023-02-15' },
      ],
    };

    const handler = new OutputHandler();
    await expect(handler.generate(actionResult)).resolves.not.toThrow();

    expect(sendMessage).toHaveBeenCalledWith(
      456,
      expect.stringContaining('Mario Rossi (creato il 2023-01-01)')
    );
    expect(sendMessage).toHaveBeenCalledWith(
      456,
      expect.stringContaining('Mario Rossi (creato il 2023-02-15)')
    );
  });

  test("Gestisce errori nella generazione dell'output", async () => {
    const actionResult = {
      status: 'error',
      message: "Errore durante la creazione dell'appuntamento.",
      context: { chatId: undefined, userId: 123 },
    };

    sendMessage.mockRejectedValueOnce(new Error('chatId non definito o mancante.'));

    const handler = new OutputHandler();
    await expect(handler.generate(actionResult)).rejects.toThrow('chatId non definito o mancante.');
  });
});
