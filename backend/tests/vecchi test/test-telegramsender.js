const { sendToTelegram } = require('../telegram/telegramsender');

const testMessage = `
  *Nuovo Lead Ricevuto!*
  Nome: Mario Rossi
  Email: mario.rossi@example.com
  Cellulare: 123456789
  Tipo di Richiesta: Informazioni
`;

sendToTelegram(testMessage);
