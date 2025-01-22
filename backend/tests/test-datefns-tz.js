const { toZonedTime } = require('date-fns-tz');

const date = '2025-01-20T17:00:00'; // Data in formato ISO
const timeZone = 'Europe/Rome';

try {
  // Conversione in data zonata
  const zonedDate = toZonedTime(new Date(date), timeZone);
  console.log("Zoned Date:", zonedDate.toISOString());
} catch (error) {
  console.error("Errore:", error.message);
}
