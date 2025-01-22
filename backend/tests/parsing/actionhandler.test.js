const ActionHandler = require('../../parsing/modules/actionhandler');
const { normalizeDateTime } = require('../../parsing/normalizers');

jest.mock('../../parsing/normalizers', () => ({
    normalizeDateTime: jest.fn(),
    findClientByName: jest.fn(),
}));

describe('ActionHandler - schedule_appointment (Real Execution)', () => {
    test('Esecuzione reale su Salesforce', async () => {
        const context = { chatId: '164653608', userId: '5678' };
        const parsedInput = {
            intent: 'schedule_appointment',
            entities: {
                clientName: 'danielo pasticcio',
                clientId: '00QQy00000GCcJdMAL',
                date: '2025-01-20T17:00:00Z',
                time: '17:00:00',
            },
        };

        const callback = jest.fn();

        await ActionHandler.handle(parsedInput, context, callback);

        console.log("Callback chiamato con:", callback.mock.calls[0][0]);

        // Nessun mock, quindi verifichiamo solo il callback
        expect(callback).toHaveBeenCalled();
    });
});
  