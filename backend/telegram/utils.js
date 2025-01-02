const { sendToTelegram } = require('./bot'); // Importa la funzione per inviare messaggi a Telegram


// Funzione per formattare messaggi generici per Telegram
const formatTelegramMessage = (message) => {
  // Applicazione di eventuale formattazione al messaggio prima di inviarlo
  return `*${message}*`;
};

// Debug: verifica del caricamento del file
console.log("Caricamento di utils.js nella cartella Telegram avvenuto con successo.");
console.log("Funzioni esportate:", {
  formatTelegramMessage: typeof formatTelegramMessage,
  sendToTelegram: typeof sendToTelegram,
});

module.exports = { formatTelegramMessage, sendToTelegram };
