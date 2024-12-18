const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Funzione principale per avviare il bot
const startTelegramBot = () => {
  console.log("Avvio bot Telegram...");

  // Messaggio di benvenuto
  bot.start((ctx) => {
    ctx.reply('Ciao! Sono il bot di Sales Agent. Dimmi cosa vuoi fare.');
  });

  // Comando semplice: /lead per confermare il funzionamento
  bot.command('lead', (ctx) => {
    ctx.reply('Sto recuperando i lead da Salesforce...');
    // Qui chiameremo la funzione per interagire con Salesforce in futuro
  });

  // Gestione dei messaggi
  bot.on('text', (ctx) => {
    ctx.reply(`Hai detto: "${ctx.message.text}". Azione in sviluppo!`);
  });

  // Avvio del bot
  bot.launch();
  console.log("Bot Telegram avviato con successo.");
};

// Esporta la funzione per usarla in index.js
module.exports = { startTelegramBot };
