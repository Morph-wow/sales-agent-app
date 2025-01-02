const { getNewLeads, getLatestLeads } = require('../salesforce/api');
const { formatTelegramMessage } = require('../formatters');
const { sendToTelegram } = require('../telegram/telegramsender'); // Usa Telegram Sender

console.log("getNewLeads importato:", typeof getNewLeads);
console.log("getLatestLeads importato:", typeof getLatestLeads);
console.log("formatTelegramMessage importato:", typeof formatTelegramMessage);
console.log("sendToTelegram importato:", typeof sendToTelegram);

// Verifica che le funzioni importate siano definite
if (
  typeof getNewLeads !== 'function' ||
  typeof getLatestLeads !== 'function' ||
  typeof formatTelegramMessage !== 'function' ||
  typeof sendToTelegram !== 'function'
) {
  console.error("Errore: una o più funzioni importate non sono valide.");
  process.exit(1);
}

// Comando per recuperare i nuovi lead
const leadCommand = async (ctx) => {
  try {
    console.log("Esecuzione del comando /lead...");
    ctx.reply('Sto recuperando i nuovi lead da Salesforce...');
    const leads = await getNewLeads();

    if (leads && leads.length > 0) {
      leads.forEach((lead) => {
        const formattedMessage = formatTelegramMessage(lead);
        console.log("Messaggio formattato:", formattedMessage);
        sendToTelegram(formattedMessage); // Invia a Telegram
      });
      ctx.reply('Nuovi lead inviati a Telegram!');
    } else {
      ctx.reply('Nessun nuovo lead trovato.');
    }
  } catch (error) {
    console.error("Errore nel recupero dei nuovi lead:", error);
    ctx.reply('Si è verificato un errore nel recupero dei nuovi lead.');
  }
};

// Comando per recuperare gli ultimi 10 lead
const latestLeadsCommand = async (ctx) => {
  try {
    console.log("Esecuzione del comando /latestleads...");
    ctx.reply('Sto recuperando gli ultimi 10 lead da Salesforce...');
    const leads = await getLatestLeads();

    if (leads && leads.length > 0) {
      leads.forEach((lead) => {
        const formattedMessage = formatTelegramMessage(lead);
        console.log("Messaggio formattato:", formattedMessage);
        sendToTelegram(formattedMessage); // Invia a Telegram
      });
      ctx.reply('Ultimi 10 lead inviati a Telegram!');
    } else {
      ctx.reply('Non ci sono nuovi lead al momento.');
    }
  } catch (error) {
    console.error("Errore nel recupero degli ultimi 10 lead:", error);
    ctx.reply('Si è verificato un errore nel recupero degli ultimi 10 lead.');
  }
};

console.log('leadCommand:', typeof leadCommand);
console.log('latestLeadsCommand:', typeof latestLeadsCommand);

module.exports = { leadCommand, latestLeadsCommand };
