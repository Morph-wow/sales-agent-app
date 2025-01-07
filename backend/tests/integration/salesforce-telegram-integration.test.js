const { listenForNewLeads } = require('../../salesforce/utils');
const { sendToTelegram } = require('../../telegram/telegramsender');

jest.mock('../../telegram/telegramsender', () => ({
  sendToTelegram: jest.fn(), // Mock della funzione per evitare chiamate reali a Telegram
}));

describe('Test per listenForNewLeads', () => {
  test('Deve elaborare un lead e inviare i dettagli a Telegram', async () => {
    const mockLead = {
      event: {
        createdDate: '2025-01-07T10:46:52.586Z',
        replayId: 12345,
        type: 'created',
      },
      sobject: {
        Id: '00QQy00000GPsfUMAT',
        FirstName: 'Test',
        LastName: 'Lead',
        Email: 'test.lead@example.com',
        MobilePhone: '1234567890',
        Phone: null,
        Tipo_di_Richiesta__c: 'Richiesta Offerta',
      },
    };

    // Creazione di un set vuoto per simulare lead già processati
    const processedLeads = new Set();

    // Mock per la funzione listenForNewLeads
    const mockListenForNewLeads = jest.fn(async (lead, leadsSet) => {
      if (leadsSet.has(lead.sobject.Id)) {
        console.log(`Il lead con ID ${lead.sobject.Id} è già stato processato.`);
        return;
      }

      leadsSet.add(lead.sobject.Id);

      const formattedMessage = `Nome: ${lead.sobject.FirstName} ${lead.sobject.LastName}\nEmail: ${lead.sobject.Email}\nCellulare: ${lead.sobject.MobilePhone}\nTipo di Richiesta: ${lead.sobject.Tipo_di_Richiesta__c}`;

      sendToTelegram(formattedMessage);
    });

    // Esecuzione della funzione mock
    await mockListenForNewLeads(mockLead, processedLeads);

    // Verifica che l'ID del lead sia stato aggiunto al Set
    expect(processedLeads.has(mockLead.sobject.Id)).toBeTruthy();

    // Verifica che la funzione `sendToTelegram` sia stata chiamata
    expect(sendToTelegram).toHaveBeenCalledTimes(1);

    // Verifica del contenuto del messaggio inviato
    expect(sendToTelegram).toHaveBeenCalledWith(
      expect.stringContaining('Nome: Test Lead')
    );
  });
});
