

// Funzione per formattare un lead come messaggio generico
const formatLeadMessage = (lead) => {
    const message = `
      Nuovo Lead Ricevuto
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
      *Nuovo Lead Ricevuto*
      Nome: ${lead.FirstName} ${lead.LastName}
      Email: ${lead.Email}
      Cellulare: ${lead.MobilePhone || 'Non specificato'}
      Tipo di Richiesta: ${lead.Tipo_di_Richiesta__c || 'Non specificato'}
    `;
  };
  
  
  // Funzione per formattare un messaggio di verifica
const formatVerificationMessage = (clientOptions) => {
  if (!Array.isArray(clientOptions) || clientOptions.length === 0) {
    throw new Error("L'elenco delle opzioni clienti deve essere un array non vuoto.");
  }

  let message = "*Verifica Cliente*\n";
  message += "Abbiamo trovato più clienti con il nome indicato. Rispondi con il numero corrispondente per selezionare il cliente corretto:\n";

  clientOptions.forEach((option, index) => {
    message += `\n${index + 1}. Nome: ${option.name} (Creato il: ${option.createdDate})`;
  });

  return message.trim();
};

// Funzione per formattare un messaggio di successo
function formatSuccessMessage() {
  return "Azione completata con successo.";
}



// Debug: verifica del caricamento del file
console.log("Caricamento di formatters.js avvenuto con successo.");
console.log("Funzioni esportate:", {
  formatLeadMessage: typeof formatLeadMessage,
  formatTelegramMessage: typeof formatTelegramMessage,
  formatVerificationMessage: typeof formatVerificationMessage,
});

  
  // Debug: verifica del caricamento del file
  console.log("Caricamento di formatters.js avvenuto con successo.");
  console.log("Funzioni esportate:", {
    formatLeadMessage: typeof formatLeadMessage,
    formatTelegramMessage: typeof formatTelegramMessage,
  });
  
  module.exports = { formatLeadMessage, formatTelegramMessage, formatVerificationMessage, formatSuccessMessage,};
  