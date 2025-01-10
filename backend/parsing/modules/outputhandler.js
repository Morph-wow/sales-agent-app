const telegramSender = require('./telegram/telegramsender');

class OutputHandler {
  async generate(output) {
    const { status, message, context } = output;
    const chatId = context.chatId;

    if (!chatId) {
      const errorMessage = "Chat ID mancante o non valido.";
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const sanitizedMessage = this.sanitizeMessage(message);

    try {
      console.log(`Invio messaggio al chat ID ${chatId}:`, sanitizedMessage);
      await telegramSender.sendMessage(chatId, sanitizedMessage);
      console.log("Messaggio inviato con successo.");
    } catch (error) {
      console.error("Errore durante l'invio del messaggio:", error.message);
      throw error;
    }
  }

  sanitizeMessage(message) {
    // Esegue l'escaping di MarkdownV2 per evitare errori in Telegram
    return message.replace(/([_*[\]()~`>#+\-=|{}.!\\])/g, '\\$1');
  }
}

module.exports = new OutputHandler();
