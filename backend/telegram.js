const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const { getNewLeads, getLatestLeads } = require('./salesforce');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

//Funzione per  normalizzare i numeri di telefono
function normalizePhoneNumber(phone, mobilePhone) {
    const numberToNormalize = mobilePhone || phone; // Usa MobilePhone se presente, altrimenti Phone
    if (!numberToNormalize) return "N/A"; // Se entrambi i campi sono vuoti

    let normalizedNumber = numberToNormalize.trim();

    if (normalizedNumber.startsWith('+')) {
        // Se il numero ha il prefisso internazionale, formattalo con gli spazi dopo il prefisso
        return normalizedNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    } else {
        // Se il numero non ha prefisso, aggiungi spazi senza prefisso
        return normalizedNumber.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    }
}





//Funzione per  formattare i lead
function formatLeadMessage(lead, index = null) {
    let message = '';
    if (index !== null) {
        message += `#${index + 1}\n`;
    }
    message += `- *Nome*: ${lead.FirstName || "[non fornito]"} ${lead.LastName || "[non fornito]"}\n`;
    message += `- *Email*: ${lead.Email || "[non fornito]"}\n`;
    message += `- *Telefono*: ${normalizePhoneNumber(lead.Phone, lead.MobilePhone)}\n`;
    message += `- *Azienda*: ${lead.Company || "[non fornito]"}\n`;
    message += `- *Fonte*: ${lead.LeadSource || "N/A"}\n`;
    message += `- *ID Cliente*: ${lead.Id}\n\n`;
    return message;
}



// Funzione principale per avviare il bot
const startTelegramBot = () => {
  console.log("Avvio bot Telegram...");

  // Messaggio di benvenuto
  bot.start((ctx) => {
    ctx.reply('Ciao! Sono il bot di Sales Agent. Dimmi cosa vuoi fare.');
  });

  // Comando per inviare i nuovi lead
bot.command('lead', async (ctx) => {
    try {
        ctx.reply('Sto recuperando i nuovi lead da Salesforce...');
        const leads = await getNewLeads();

        if (leads.length > 0) {
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
});

// Funzione per recuperare gli ultimi 10 leads
bot.command('latestleads', async (ctx) => {
    try {
        ctx.reply('Sto recuperando gli ultimi 10 lead da Salesforce...');
        const leads = await getLatestLeads();

        if (leads.length > 0) {
            let message = '*Ultimi 10 lead:*\n';
            leads.forEach((lead, index) => {
                  // Log per verificare i dati originali del numero di telefono
                  console.log(`Lead #${index + 1} - Telefono originale: ${lead.Phone}`);

                   // Log per verificare il numero normalizzato
                const normalizedPhone = normalizePhoneNumber(lead.Phone);
                console.log(`Lead #${index + 1} - Telefono normalizzato: ${normalizedPhone}`);

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
});       

 // Gestione dei messaggi (placeholder per appuntamenti)
  bot.on('text', async (ctx) => {
    const userMessage = ctx.message.text;
    ctx.reply(`Hai detto: "${userMessage}". Azione in sviluppo!`);
    
    // Qui aggiungeremo la logica per interpretare il messaggio e fissare appuntamenti
  });

  // Avvio del bot
  bot.launch();
  console.log("Bot Telegram avviato con successo.");
};

// Esporta la funzione per usarla in index.js
module.exports = { startTelegramBot };
