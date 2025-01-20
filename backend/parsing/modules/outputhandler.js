const { sendMessage, sanitizeMarkdown } = require('../../telegram/telegramsender');
const { formatVerificationMessage, formatSuccessMessage } = require('../../formatters');

class OutputHandler {
  /**
   * Genera e invia un messaggio di output basato sul risultato dell'azione.
   * @param {Object} actionResult - Risultato dell'azione eseguita.
   * @returns {Object} Stato del messaggio inviato o errore.
   */
  async generate(actionResult) {
    const { status, message, context, verificationOptions } = actionResult;
    const { chatId } = context;

    if (!chatId) {
      console.error('Errore: chatId non definito o mancante.');
      throw new Error('chatId non definito o mancante.');
    }

    try {
      let formattedMessage;

      if (status === 'verification') {
        // Messaggio di verifica con opzioni multiple
        formattedMessage = formatVerificationMessage(verificationOptions);
      } else if (status === 'success') {
        formattedMessage = formatSuccessMessage(); // Usa il messaggio generico
      } else {
        formattedMessage = "Errore durante l'esecuzione dell'azione.";
      }

      const result = await sendMessage(chatId, formattedMessage);
      console.log("Messaggio escapato per Telegram:", formattedMessage);

      console.log('Messaggio inviato con successo:', result);

      return { status, message: result };
    } catch (error) {
      console.error('Errore durante la generazione del messaggio di output:', error.message);
      throw error;
    }
  }
 

}

module.exports = OutputHandler;
