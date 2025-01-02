const { getNewLeads, getLatestLeads } = require('../salesforce/api');
const { formatLeadMessage } = require('../salesforce/utils');

console.log("getNewLeads importato:", typeof getNewLeads);
console.log("getLatestLeads importato:", typeof getLatestLeads);
console.log("formatLeadMessage importato:", typeof formatLeadMessage);

// Verifica che le funzioni importate siano definite
if (typeof getNewLeads !== 'function' || typeof getLatestLeads !== 'function' || typeof formatLeadMessage !== 'function') {
  console.error("Errore: una o più funzioni importate non sono valide.");
  process.exit(1); // Termina il processo se le funzioni non sono valide
}

// Comando per inviare i nuovi lead
const leadCommand = async (ctx) => {
  try {
    console.log('Esecuzione del comando /lead...');
    ctx.reply('Sto recuperando i nuovi lead da Salesforce...');
    const leads = await getNewLeads();

    if (leads && leads.length > 0) {
      let message = '*Nuovo Lead ricevuto!*\n';
      leads.forEach((lead) => {
        message += formatLeadMessage(lead);
      });
      ctx.replyWithMarkdown(message);
    } else {
      ctx.reply('Non ci sono nuovi lead al momento.');
    }
  } catch (error) {
    console.error('Errore nel recupero dei lead:', error);
    ctx.reply('Si è verificato un errore nel recupero dei lead.');
  }
};

// Comando per recuperare gli ultimi 10 lead
const latestLeadsCommand = async (ctx) => {
  try {
    console.log('Esecuzione del comando /latestleads...');
    ctx.reply('Sto recuperando gli ultimi 10 lead da Salesforce...');
    const leads = await getLatestLeads();

    if (leads && leads.length > 0) {
      let message = '*Ultimi 10 lead:*\n';
      leads.forEach((lead, index) => {
        message += formatLeadMessage(lead, index);
      });
      ctx.replyWithMarkdown(message);
    } else {
      ctx.reply('Non ci sono nuovi lead al momento.');
    }
  } catch (error) {
    console.error('Errore nel recupero degli ultimi 10 lead:', error);
    ctx.reply('Si è verificato un errore nel recupero degli ultimi 10 lead.');
  }
};

module.exports = { leadCommand, latestLeadsCommand };
