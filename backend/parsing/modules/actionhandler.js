const intentActionMap = {
  schedule_appointment: require('./actions/scheduleappointment'),
};

class ActionHandler {
  async handle(parsedInput, context, callback) {
    const { intent, entities } = parsedInput;

    console.log("Intent rilevato:", intent);
    console.log("Entità ricevute:", entities);

    // Trova l'azione corrispondente all'intent
    const action = intentActionMap[intent];
    if (!action) {
      const errorMessage = `Intent non riconosciuto: "${intent}".`;
      console.error(errorMessage);
      return callback({
        status: 'error',
        context,
        message: errorMessage,
      });
    }

    try {
      console.log(`Esecuzione dell'azione per l'intent "${intent}"...`);
      const result = await action.execute({ entities, context });
      console.log("Azione completata con successo:", result);
      return callback(result);
    } catch (error) {
      console.error(`Errore durante l'esecuzione dell'azione per l'intent "${intent}":`, error.message);
      return callback({
        status: 'error',
        context,
        message: `Errore durante l'esecuzione dell'azione "${intent}".`,
        error: error.message,
      });
    }
  }
}

module.exports = ActionHandler;
