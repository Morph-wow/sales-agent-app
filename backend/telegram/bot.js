const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const commands = require('./commands');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

console.log("Caricamento di bot.js avvenuto con successo.");
console.log("Comandi importati in bot.js:", commands);

// Verifica che i comandi siano definiti e funzioni valide
if (typeof commands.leadCommand !== 'function') {
  console.error("Errore: 'leadCommand' non è una funzione.");
  process.exit(1);
}
if (typeof commands.latestLeadsCommand !== 'function') {
  console.error("Errore: 'latestLeadsCommand' non è una funzione.");
  process.exit(1);
}

const startTelegramBot = () => {
  console.log("Avvio bot Telegram...");

  // Messaggio di benvenuto
  bot.start((ctx) => {
    ctx.reply('Ciao! Sono il bot di Sales Agent. Dimmi cosa vuoi fare.');
  });

  // Registra i comandi dal file commands.js
  bot.command('lead', commands.leadCommand);
  bot.command('latestleads', commands.latestLeadsCommand);

  // Gestione dei messaggi generici
  bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;
    ctx.reply(`Hai detto: "${userMessage}". Azione in sviluppo!`);
    // Placeholder per interpretare e gestire messaggi
  });

  // Avvio del bot
  bot.launch();
  console.log("Bot Telegram avviato con successo.");
};

console.log("Percorso assoluto di bot.js:", __filename);

module.exports = { startTelegramBot };
