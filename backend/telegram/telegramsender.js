const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');

dotenv.config({ path: __dirname + '/../.env' });

console.log("Token Telegram:", process.env.TELEGRAM_BOT_TOKEN);
console.log("Chat ID:", process.env.TELEGRAM_CHAT_ID);


const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

const sendToTelegram = async (message) => {
  try {
    await bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' });
    console.log("Messaggio inviato a Telegram:", message);
  } catch (error) {
    console.error("Errore durante l'invio del messaggio a Telegram:", error);
  }
};

module.exports = { sendToTelegram };
