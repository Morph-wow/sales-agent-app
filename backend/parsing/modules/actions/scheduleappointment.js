const salesforceApi = require('../../../salesforce/api');
const { normalizeDateTime, findClientByName } = require('../../normalizers'); // Import normalizers

module.exports = {
  async execute({ entities, context, openai }) {
    const { chatId, userId } = context;
    const { time, date, clientName } = entities;

    // Log per debugging
    console.log("Esecuzione di scheduleappointment...");
    console.log("Entità ricevute:", entities);
    console.log("Contesto ricevuto:", context);

    if (!time || !date || !clientName) {
      console.warn("Dati mancanti per fissare l'appuntamento:", { time, date, clientName });
      return {
        status: 'error',
        context: { chatId, userId },
        message: 'Dati mancanti. Controlla il nome, data e ora.',
      };
    }

    // Normalizzazione dei dati
    let normalizedDateTime;
    try {
      normalizedDateTime = normalizeDateTime(date, time); // Normalizza data e ora
      console.log("Data e ora normalizzate:", normalizedDateTime);
    } catch (error) {
      console.error("Errore durante la normalizzazione della data e ora:", error.message);
      return {
        status: 'error',
        context: { chatId, userId },
        message: 'Errore nella normalizzazione della data e ora. Controlla il formato inserito.',
      };
    }

    // Ricerca del cliente
    let clientId;
    try {
      clientId = await findClientByName(clientName); // Cerca il cliente per nome
      console.log("Cliente trovato:", clientId);
    } catch (error) {
      console.error("Errore nella ricerca del cliente:", error.message);
      return {
        status: 'error',
        context: { chatId, userId },
        message: `Cliente non trovato: ${clientName}. Controlla il nome inserito.`,
      };
    }

    // Creazione dell'appuntamento su Salesforce
    try {
      console.log("Tentativo di creare un appuntamento su Salesforce...");
      const appointmentData = { dateTime: normalizedDateTime, clientId };
      const scheduleResult = await salesforceApi.createAppointment(appointmentData, context);

      console.log("Appuntamento creato con successo:", scheduleResult);

      return {
        status: 'success',
        context: { chatId, userId },
        message: `Appuntamento fissato con successo per ${normalizedDateTime}.`,
        result: scheduleResult,
      };
    } catch (error) {
      console.error("Errore durante la creazione dell'appuntamento:", error.message);
      return {
        status: 'error',
        context: { chatId, userId },
        message: 'Errore durante la creazione dell’appuntamento. Contatta il supporto tecnico.',
        error: error.message,
      };
    }
  },
};
