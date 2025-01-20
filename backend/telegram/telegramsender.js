const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/../../.env' });

console.log("Token Telegram:", process.env.TELEGRAM_BOT_TOKEN);
console.log("Chat ID:", process.env.TELEGRAM_CHAT_ID);

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Funzione per sanificare i messaggi Markdown
function sanitizeMarkdown(text) {
  // Escapa solo i caratteri speciali richiesti da MarkdownV2
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!])/g, '\\$1');
}



// Per i messaggi che necessitano di MarkdownV2
async function sendMessage(chatId, message) {
  try {
    const sanitizedMessage = sanitizeMarkdown(message); // Escapare correttamente il messaggio
    const result = await bot.telegram.sendMessage(chatId, sanitizedMessage, {
      parse_mode: 'MarkdownV2',
    });
    console.log("Messaggio inviato a Telegram (MarkdownV2):", sanitizedMessage);
    return result; // Assicurati di restituire il risultato
  } catch (error) {
    console.error("Errore durante l'invio del messaggio a Telegram (MarkdownV2):", error);
    throw error; // Solleva l'errore per il test
  }
}



// Per i messaggi statici senza parsing
const sendRawMessage = async (chatId, message) => {
  try {
    await bot.telegram.sendMessage(chatId, message); // Invio senza parse_mode
    console.log("Messaggio inviato a Telegram (Raw):", message);
  } catch (error) {
    console.error("Errore durante l'invio del messaggio a Telegram (Raw):", error);
  }
};

// Per inviare il messaggio del nuovo lead
const sendToTelegram = async (message) => {
  try {
    const chatId = process.env.TELEGRAM_CHAT_ID;
    await sendRawMessage(chatId, message);
  } catch (error) {
    console.error("Errore durante l'invio del messaggio al bot Telegram:", error);
  }
};

module.exports = { sendToTelegram, sendMessage, sanitizeMarkdown };
