test('Utilizza OpenAI per completare dati mancanti', async () => {
    const parsedInput = {
      intent: 'schedule_appointment',
      entities: {
        time: null, // Simula dati mancanti
        date: 'lunedì',
        clientName: 'Mario Rossi',
      },
    };
  
    const context = { chatId: 12345, userId: 67890 };
  
    const result = await actionHandler.handle(parsedInput, context);
  
    // Verifica che il messaggio includa suggerimenti da OpenAI
    expect(result.status).toBe('error');
    expect(result.message).toContain('Suggerimenti');
    console.log("Suggerimenti OpenAI:", result.message);
  });
  
  
  const actionHandler = require('../../parsing/modules/actionhandler');
  const scheduleAppointment = require('../../parsing/modules/actions/scheduleappointment');
  
  // Mock delle azioni
  jest.mock('../../parsing/modules/actions/scheduleappointment', () => ({
    execute: jest.fn(),
  }));
  
  jest.mock('../../parsing/modules/actions/defaultaction', () => ({
    execute: jest.fn(() => Promise.resolve({ status: 'error', message: 'Comando non riconosciuto' })),
  }));
  
  jest.mock('../../parsing/modules/actions/cancelappointment', () => ({
    execute: jest.fn(() => Promise.resolve({ status: 'error', message: 'Cancel action not implemented' })),
  }));
  
  jest.mock('../../salesforce/api', () => ({
    query: jest.fn(() => Promise.resolve({ records: [{ Id: '0035g00000F4Xyz' }] })),
  }));
  
  afterEach(() => {
    jest.clearAllMocks();
  });
  
  describe('actionhandler.js', () => {
    test('Gestisce un intento valido (schedule_appointment)', async () => {
      scheduleAppointment.execute.mockResolvedValue({
        status: 'success',
        message: 'Appuntamento fissato con successo',
      });
  
      const parsedInput = {
        intent: 'schedule_appointment',
        entities: {
          time: '17:00',
          date: 'lunedì',
          clientName: 'Mario Rossi',
        },
      };
  
      const context = { chatId: 12345, userId: 67890 };
  
      const result = await actionHandler.handle(parsedInput, context);
  
      expect(scheduleAppointment.execute).toHaveBeenCalledWith({
        entities: parsedInput.entities,
        context,
        openai: expect.any(Object),
      });
      expect(result.status).toBe('success');
      expect(result.message).toBe('Appuntamento fissato con successo');
    });
  
    test('Gestisce un intento non valido', async () => {
      const parsedInput = {
        intent: 'non_existing_intent',
        entities: {},
      };
  
      const context = { chatId: 12345, userId: 67890 };
  
      const result = await actionHandler.handle(parsedInput, context);
  
      expect(result.status).toBe('error');
      expect(result.message).toContain('Comando non riconosciuto');
    });
  
    test('Gestisce un intento valido con errore (schedule_appointment)', async () => {
      scheduleAppointment.execute.mockRejectedValue(new Error('Errore interno'));
  
      const parsedInput = {
        intent: 'schedule_appointment',
        entities: {
          time: '17:00',
          date: 'lunedì',
          clientName: 'Mario Rossi',
        },
      };
  
      const context = { chatId: 12345, userId: 67890 };
  
      const result = await actionHandler.handle(parsedInput, context);
  
      expect(scheduleAppointment.execute).toHaveBeenCalled();
      expect(result.status).toBe('error');
      expect(result.message).toContain('Errore durante l\'esecuzione');
    });
  });
  