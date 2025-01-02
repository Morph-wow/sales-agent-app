const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const { getNewLeads, getLatestLeads } = require('./salesforce');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

// Funzione per normalizzare i numeri di telefono
function normalizePhoneNumber(phone, mobilePhone) {
    const numberToNormalize = mobilePhone || phone; // Usa MobilePhone se presente, altrimenti Phone
    if (!numberToNormalize) return "N/A"; // Se entrambi i campi sono vuoti

    let normalizedNumber = numberToNormalize.trim();

    // Se il numero inizia con un prefisso internazionale, mantienilo e aggiungi uno spazio dopo i primi 3 numeri del resto
    if (normalizedNumber.startsWith('+')) {
        return normalizedNumber.replace(/^(\\+\d{1,3})(\d{3})(.*)$/, '$1 $2 $3').trim();
    }

    // Se non c'è prefisso, aggiungi uno spazio dopo i primi 3 numeri
    return normalizedNumber.replace(/^(\d{3})(.*)$/, '$1 $2').trim();
}

// Funzione per formattare i lead
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
    message += `- *Tipo di Richiesta*: ${lead.Tipo_di_Richiesta__c || "N/A"}\n`;
    message += `- *ID Cliente*: ${lead.Id}\n\n`;
    return message;
}

// Funzione per inviare una notifica per un nuovo lead
function sendNewLeadNotification(lead) {
    const message = `*Nuovo Lead ricevuto!*\n${formatLeadMessage(lead)}`;
    bot.telegram.sendMessage(process.env.TELEGRAM_CHAT_ID, message, { parse_mode: 'Markdown' })
        .then(() => console.log(`Notifica inviata per il lead: ${lead.Id}`))
        .catch((error) => console.error(`Errore nell'invio della notifica per il lead: ${lead.Id}`, error));
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
module.exports = { startTelegramBot, sendNewLeadNotification };
