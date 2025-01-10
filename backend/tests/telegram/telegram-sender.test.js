const telegramSender = require('../../telegram/telegramsender');

describe('telegramsender.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test.skip('Deve inviare un messaggio al bot Telegram (reale)', async () => {
    const chatId = 164653608;
    const message = 'Messaggio di prova';

    const result = await telegramSender.sendMessage(chatId, message);

    expect(result).toBeDefined();
    console.log('Il messaggio è stato inviato correttamente!');
  });

  test('Invia un messaggio reale a Telegram', async () => {
    const chatId = 164653608; // Chat ID valido
    const message = "Messaggio *con* caratteri _speciali_.";
  
    const result = await telegramSender.sendMessage(chatId, message);
  
    expect(result).toBeDefined(); // Verifica che result non sia undefined
    console.log("Messaggio inviato a Telegram:", result);
  });
  

  test('Sanitizza correttamente i caratteri MarkdownV2', () => {
    const input = "Messaggio *con* caratteri _speciali_.";
    const expectedOutput = "Messaggio \\*con\\* caratteri \\_speciali\\_\\.";

    const sanitizedMessage = telegramSender.sanitizeMarkdown(input);

    expect(sanitizedMessage).toBe(expectedOutput);
  });
});

