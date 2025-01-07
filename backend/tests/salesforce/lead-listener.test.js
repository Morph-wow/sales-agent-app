const { listenForNewLeads } = require('../../salesforce/utils');
jest.mock('faye', () => ({
  Client: jest.fn(() => ({
    setHeader: jest.fn(),
    subscribe: jest.fn().mockImplementation((_, callback) => {
      // Simula l'arrivo di un lead
      setTimeout(() => {
        callback({
          event: { createdDate: '2025-01-07T10:46:52.586Z', replayId: 12345, type: 'created' },
          sobject: {
            Id: '00QQy00000GPsfUMAT',
            FirstName: 'Test',
            LastName: 'Lead',
            Email: 'test.lead@example.com',
            MobilePhone: '1234567890',
            Tipo_di_Richiesta__c: 'Richiesta Offerta',
          },
        });
      }, 10);
      return {
        callback: jest.fn(),
        errback: jest.fn(),
      };
    }),
  })),
}));

describe.skip('Test di listenForNewLeads', () => {
  let mockProcessLead;

  beforeEach(() => {
    mockProcessLead = jest.fn(); // Mock della funzione per simulare l'elaborazione del lead
  });

  test.skip('Deve elaborare un lead correttamente', async () => {
    await listenForNewLeads(mockProcessLead);

    // Aspetta che il callback venga completato
    await new Promise(resolve => setTimeout(resolve, 50));

    // Verifica che la funzione mock sia stata chiamata con i dettagli del lead
    expect(mockProcessLead).toHaveBeenCalledTimes(1);
    expect(mockProcessLead).toHaveBeenCalledWith(expect.objectContaining({
      Id: '00QQy00000GPsfUMAT',
      FirstName: 'Test',
      LastName: 'Lead',
      Email: 'test.lead@example.com',
    }));
  });

  afterAll(() => {
    jest.clearAllMocks();
  });
});
