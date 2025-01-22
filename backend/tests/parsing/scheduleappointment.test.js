const scheduleAppointment = require('../../parsing/modules/actions/scheduleappointment');
const { normalizeDateTime, findClientByName } = require('../../parsing/normalizers');

// Mock di Salesforce API
jest.mock('../../salesforce/api', () => ({
  createAppointment: jest.fn(),
  query: jest.fn(),
}));

const salesforceApi = require('../../salesforce/api');

describe('scheduleappointment.js', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Crea un appuntamento con dati validi', async () => {
    // Mock della risposta di Salesforce
    salesforceApi.query.mockResolvedValue({
      records: [{ Id: '0035g00000F4Xyz' }],
    });
    salesforceApi.createAppointment.mockResolvedValue({ success: true });

    const entities = {
      time: '17:00',
      date: 'lunedì',
      clientName: 'Mario Rossi',
    };

    const context = { chatId: 12345, userId: 67890 };

    const result = await scheduleAppointment.execute({ entities, context });

    expect(result.status).toBe('success');
    expect(result.message).toContain('Appuntamento fissato con successo');
    expect(salesforceApi.query).toHaveBeenCalledWith(
      "SELECT Id FROM Contact WHERE Name = 'Mario Rossi' LIMIT 1"
    );
    expect(salesforceApi.createAppointment).toHaveBeenCalledWith(
      expect.objectContaining({
        dateTime: expect.any(String), // Verifica che sia una stringa ISO
        clientId: '0035g00000F4Xyz',
      }),
      context
    );
  });

  test('Gestisce errore: cliente non trovato', async () => {
    salesforceApi.query.mockResolvedValue({ records: [] }); // Nessun cliente trovato

    const entities = {
      time: '17:00',
      date: 'lunedì',
      clientName: 'Cliente Inesistente',
    };

    const context = { chatId: 12345, userId: 67890 };

    const result = await scheduleAppointment.execute({ entities, context });

    expect(result.status).toBe('error');
    expect(result.message).toContain('Cliente non trovato');
    expect(salesforceApi.query).toHaveBeenCalled();
    expect(salesforceApi.createAppointment).not.toHaveBeenCalled();
  });

  test('Gestisce errore: dati mancanti', async () => {
    const entities = {
      time: '17:00',
      date: null, // Dato mancante
      clientName: 'Mario Rossi',
    };

    const context = { chatId: 12345, userId: 67890 };

    const result = await scheduleAppointment.execute({ entities, context });

    expect(result.status).toBe('error');
    expect(result.message).toContain('Dati mancanti');
    expect(salesforceApi.query).not.toHaveBeenCalled();
    expect(salesforceApi.createAppointment).not.toHaveBeenCalled();
  });

  test('Gestisce errore di Salesforce', async () => {
    salesforceApi.query.mockResolvedValue({
      records: [{ Id: '0035g00000F4Xyz' }],
    });
    salesforceApi.createAppointment.mockRejectedValue(new Error('Errore Salesforce'));

    const entities = {
      time: '17:00',
      date: 'lunedì',
      clientName: 'Mario Rossi',
    };

    const context = { chatId: 12345, userId: 67890 };

    const result = await scheduleAppointment.execute({ entities, context });

    expect(result.status).toBe('error');
    expect(result.message).toContain('Errore durante la creazione dell’appuntamento');
    expect(salesforceApi.query).toHaveBeenCalled();
    expect(salesforceApi.createAppointment).toHaveBeenCalled();
  });
});
