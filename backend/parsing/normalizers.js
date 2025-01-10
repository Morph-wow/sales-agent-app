const { parse, format, addDays } = require('date-fns');
const { it } = require('date-fns/locale'); // Per supporto lingua italiana
const { zonedTimeToUtc } = require('date-fns-tz'); // Import corretto
const salesforceApi = require('../salesforce/api');

// Funzione per normalizzare data e ora
function normalizeDateTime(day, time) {
  const today = new Date();
  let targetDate;

  if (day.toLowerCase() === 'domani') {
    targetDate = addDays(today, 1); // Aggiungi un giorno
  } else if (day.toLowerCase() === 'dopodomani') {
    targetDate = addDays(today, 2); // Aggiungi due giorni
  } else {
    // Gestione dei giorni della settimana
    const daysOfWeek = {
      lunedì: 1,
      martedì: 2,
      mercoledì: 3,
      giovedì: 4,
      venerdì: 5,
      sabato: 6,
      domenica: 0,
    };

    const targetDay = daysOfWeek[day.toLowerCase().replace(' prossimo', '')];
    if (targetDay === undefined) throw new Error('Giorno non riconosciuto');

    const todayDay = today.getDay();
    const diffDays = day.includes('prossimo')
      ? (targetDay - todayDay + 7) % 7 + 7 // Salta alla settimana successiva
      : (targetDay - todayDay + 7) % 7;

    targetDate = addDays(today, diffDays);
  }

  // Imposta l'ora
  const [hours, minutes = 0] = time.split(':').map(Number);
  targetDate.setHours(hours, minutes, 0, 0);

  return targetDate.toISOString(); // Restituisce il formato ISO con millisecondi
}

// Funzione per trovare un cliente su Salesforce
async function findClientByName(clientName) {
  const query = `SELECT Id FROM Contact WHERE Name = '${clientName}' LIMIT 1`;
  const result = await salesforceApi.query(query);
  if (result.records.length > 0) {
    return result.records[0].Id;
  }
  throw new Error('Cliente non trovato');
}

module.exports = { normalizeDateTime, findClientByName };
