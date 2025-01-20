require('dotenv').config(); // Carica le variabili di ambiente dal file .env
const OutputHandler = require('../../parsing/modules/outputhandler');

describe('OutputHandler - Real Telegram Integration', () => {
  it('dovrebbe inviare un messaggio di successo generico', async () => {
    const actionResult = {
      status: 'success',
      context: { chatId: process.env.TELEGRAM_CHAT_ID },
    };

    const outputHandler = new OutputHandler();
    const result = await outputHandler.generate(actionResult);

    expect(result.status).toBe('success');
    expect(result.message.text).toBe("Azione completata con successo.");
    console.log('Messaggio inviato a Telegram:', result.message);
  });
});
