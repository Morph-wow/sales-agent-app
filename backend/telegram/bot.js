const { Telegraf } = require('telegraf');
const dotenv = require('dotenv');
const commands = require('./commands');
const { listenForNewLeads } = require('../salesforce/utils');
const { formatTelegramMessage } = require('../formatters');
const { sendToTelegram } = require('./telegramsender');
const parser = require('../parsing/parser');

dotenv.config();

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

console.log("Caricamento di bot.js avvenuto con successo.");

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
            try {
                const userMessage = ctx.message.text;
                const context = {
                    userId: ctx.message.from.id, // Identificativo dell'utente Telegram
                    chatId: ctx.message.chat.id, // Identificativo della chat
                };

                console.log(`Messaggio ricevuto dall'utente: ${userMessage}`);

                    // Log del parser e delle sue funzioni
                 console.log('Parser importato:', parser);
                console.log('Funzioni disponibili in parser:', Object.keys(parser));

                // Analizza il messaggio con il parser
                const response = await parser.parseMessage(userMessage, context);
                console.log("Risposta generata dal parser:", response);

                // Verifica se la risposta è valida
                if (typeof response !== 'string') {
                    console.error("La risposta del parser non è valida:", response);
                    throw new Error("Risposta del parser non valida.");
                }

                // Invia il risultato al venditore
                await ctx.reply(response, { parse_mode: 'MarkdownV2' });
            } catch (error) {
                console.error("Errore durante la gestione del messaggio:", error);
                ctx.reply('Si è verificato un errore durante l’elaborazione del tuo messaggio. Riprova più tardi.');
            }
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
