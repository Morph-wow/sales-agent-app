const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const commands = require('./commands');
const { listenForNewLeads } = require('../salesforce/utils');
const { formatTelegramMessage } = require('../formatters');
const { sendToTelegram } = require('./telegramsender');
const { leadCommand, latestLeadsCommand } = require('./commands');



dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

console.log("Caricamento di bot.js avvenuto con successo.");
console.log("Comandi importati in bot.js:", commands);
console.log('Tipo di leadCommand:', typeof leadCommand);
console.log('Tipo di latestLeadsCommand:', typeof latestLeadsCommand);

// Funzione per verificare i comandi
const validateCommands = () => {
  if (typeof commands.leadCommand !== 'function') {
    throw new Error("Errore: 'leadCommand' non è una funzione.");
  }
  if (typeof commands.latestLeadsCommand !== 'function') {
    throw new Error("Errore: 'latestLeadsCommand' non è una funzione.");
  }
};

// Inizia l'ascolto per nuovi lead
const startListeningForLeads = () => {
  console.log("Avvio dell'ascolto per nuovi lead tramite PushTopic...");
  try {
    listenForNewLeads(async (leadDetails) => {
      try {
        console.log("Dettagli lead ricevuti da Salesforce:", leadDetails);
        const formattedMessage = formatTelegramMessage(leadDetails);
        console.log("Messaggio formattato per Telegram:", formattedMessage);
        await sendToTelegram(formattedMessage);
      } catch (error) {
        console.error("Errore durante l'elaborazione del lead:", error);
      }
    });
  } catch (error) {
    console.error("Errore nell'ascolto per nuovi lead:", error);
  }
};

// Avvia il bot Telegram
const startTelegramBot = () => {
  console.log("Avvio bot Telegram...");
  try {
    validateCommands();

    // Messaggio di benvenuto
    bot.start((ctx) => {
      ctx.reply('Ciao! Sono il bot di Sales Agent. Dimmi cosa vuoi fare.');
    });

    // Registra i comandi
    bot.command('lead', commands.leadCommand);
    bot.command('latestleads', commands.latestLeadsCommand);

    // Gestione dei messaggi generici
    bot.on('text', async (ctx) => {
      const userMessage = ctx.message.text;
      ctx.reply(`Hai detto: "${userMessage}". Azione in sviluppo!`);
    });

    // Avvio del bot
    bot.launch();
    console.log("Bot Telegram avviato con successo.");
  } catch (error) {
    console.error("Errore durante l'avvio del bot Telegram:", error);
  }
};

console.log("Percorso assoluto di bot.js:", __filename);

module.exports = { startTelegramBot, startListeningForLeads };
