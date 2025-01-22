const { fromZonedTime, formatInTimeZone } = require('date-fns-tz');
const salesforceApi = require('../../../salesforce/api');

module.exports = {
  async execute({ entities, context }) {
    const { chatId, userId } = context;
    const { time, date, clientId } = entities;

    console.log("Esecuzione di scheduleappointment...");
    console.log("Entità ricevute:", entities);

    if (!time || !date || !clientId) {
      console.warn("Dati mancanti per fissare l'appuntamento:", { time, date, clientId });
      return {
        status: 'error',
        context: { chatId, userId },
        message: 'Dati mancanti. Controlla il clientId, data e ora.',
      };
    }

    try {
      if (!salesforceApi.conn.accessToken || !salesforceApi.conn.instanceUrl) {
        console.log("Access Token o Instance URL non presente. Eseguo il login...");
        await salesforceApi.conn.login(process.env.SALESFORCE_USERNAME, process.env.SALESFORCE_PASSWORD);
      }

      // Configura il fuso orario locale
      const timeZone = 'Europe/Rome';

      // Combina data e ora in formato ISO
      const localDateTime = `${date.split('T')[0]}T${time}`;
      const zonedDate = fromZonedTime(new Date(localDateTime), timeZone);

      if (isNaN(zonedDate.getTime())) {
        throw new Error("Formato data o ora non valido.");
      }

      // Calcola l'EndDateTime (durata di 1 ora)
      const endDateTime = new Date(zonedDate);
      endDateTime.setHours(endDateTime.getHours() + 1);

      console.log("StartDateTime in UTC:", zonedDate.toISOString());
      console.log("EndDateTime in UTC:", endDateTime.toISOString());

      // Creazione appuntamento su Salesforce
      const appointmentData = {
        Subject: 'Appuntamento Fissato',
        StartDateTime: zonedDate.toISOString(),
        EndDateTime: endDateTime.toISOString(),
        WhoId: clientId,
        Description: 'Creato tramite sistema automatizzato.',
      };

      const result = await salesforceApi.conn.sobject('Event').create(appointmentData);

      if (!result.success) {
        throw new Error(`Creazione fallita: ${result.errors}`);
      }

      console.log("Appuntamento creato con successo:", result);

      return {
        status: 'success',
        context: { chatId, userId },
        message: `Appuntamento fissato con successo dalle ${zonedDate.toISOString()} alle ${endDateTime.toISOString()}.`,
        result,
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


