// Prima di eliminare la cache
console.log("Cache corrente:", Object.keys(require.cache));
Object.keys(require.cache).forEach(function(key) { delete require.cache[key]; });
console.log("Cache dopo eliminazione:", Object.keys(require.cache));

// Importazioni normali dopo aver eliminato la cache
const { formatTelegramMessage, sendToTelegram } = require('../telegram/utils');

console.log("Debug: Verifica delle esportazioni da utils.js (Telegram):");
console.log("Tipo di formatTelegramMessage:", typeof formatTelegramMessage);
console.log("Tipo di sendToTelegram:", typeof sendToTelegram);

// Controllo di `formatTelegramMessage`
if (typeof formatTelegramMessage === 'function') {
  console.log("formatTelegramMessage è stato importato correttamente!");
  const testMessage = formatTelegramMessage("Questo è un messaggio di test.");
  console.log("Messaggio formattato correttamente:", testMessage);
} else {
  console.error("Errore: 'formatTelegramMessage' non è stata importata correttamente.");
}

// Controllo di `sendToTelegram`
if (typeof sendToTelegram === 'function') {
  console.log("sendToTelegram è stato importato correttamente!");
  sendToTelegram("Test messaggio da utils!")
    .then(() => console.log("Messaggio inviato con successo a Telegram."))
    .catch((error) => console.error("Errore nell'invio del messaggio a Telegram:", error));
} else {
  console.error("Errore: 'sendToTelegram' non è stata importata correttamente.");
}
