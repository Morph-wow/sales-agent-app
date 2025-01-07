const { sendToTelegram } = require('../../telegram/telegramsender.js');

test.only('Deve inviare un messaggio al bot Telegram (reale)', async () => {
  try {
    const response = await sendToTelegram('Messaggio di prova');

    // Accettiamo che la funzione restituisca undefined
    expect(response).toBeUndefined();

    // Log per confermare il successo del test
    console.log('Il messaggio è stato inviato correttamente!');
  } catch (error) {
    console.error('Errore durante il test:', error);
    throw new Error('Il test per l’invio del messaggio non è passato.');
  }
}, 10000);
