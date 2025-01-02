const { startTelegramBot } = require('../telegram/bot');
// Percorso relativo alla cartella `test`

console.log("Tipo di sendToTelegram:", typeof sendToTelegram);

if (typeof sendToTelegram === 'function') {
  sendToTelegram("Test messaggio dal bot!")
    .then(() => console.log("Messaggio inviato con successo a Telegram."))
    .catch((error) => console.error("Errore nell'invio del messaggio a Telegram:", error));
} else {
  console.error("Errore: 'sendToTelegram' non è stata importata correttamente.");
}
