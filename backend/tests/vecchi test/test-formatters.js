const { formatTelegramMessage } = require('../formatters');

const lead = {
  FirstName: "Mario",
  LastName: "Rossi",
  Email: "mario.rossi@example.com",
  MobilePhone: "123456789",
  Tipo_di_Richiesta__c: "Informazioni"
};

console.log(formatTelegramMessage(lead));
