

// Funzione per formattare un lead come messaggio generico
const formatLeadMessage = (lead) => {
    const message = `
      Nuovo Lead Ricevuto!
      Nome: ${lead.FirstName || 'N/A'} ${lead.LastName || 'N/A'}
      Email: ${lead.Email || 'N/A'}
      Cellulare: ${lead.MobilePhone || 'Non specificato'}
      Tipo di Richiesta: ${lead.Tipo_di_Richiesta__c || 'Non specificato'}
    `;
    return message.trim(); // Rimuove eventuali spazi vuoti extra
  };
  
  // Funzione per formattare un lead specificamente per Telegram
  const formatTelegramMessage = (lead) => {
    return `
      *Nuovo Lead Ricevuto!*
      Nome: ${lead.FirstName} ${lead.LastName}
      Email: ${lead.Email}
      Cellulare: ${lead.MobilePhone || 'Non specificato'}
      Tipo di Richiesta: ${lead.Tipo_di_Richiesta__c || 'Non specificato'}
    `;
  };
  
  module.exports = { formatTelegramMessage };
  
  
  // Debug: verifica del caricamento del file
  console.log("Caricamento di formatters.js avvenuto con successo.");
  console.log("Funzioni esportate:", {
    formatLeadMessage: typeof formatLeadMessage,
    formatTelegramMessage: typeof formatTelegramMessage,
  });
  
  module.exports = { formatLeadMessage, formatTelegramMessage };
  