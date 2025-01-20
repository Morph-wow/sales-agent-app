const InputParser = require('../../parsing/modules/inputparser');

test('InputParser - Parsing con cliente verificato', async () => {
    const inputParser = new InputParser();

    const rawMessage = "Fissa un appuntamento domani alle 15";
    const verifiedName = {
        clientId: "00QQy00000GCcJdMAL",
        name: "Mario Rossi",
    };

    // Calcola la data attesa per "domani"
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const expectedDate = tomorrow.toISOString().split('T')[0] + "T00:00:00Z";

    const expected = {
        intent: "schedule_appointment",
        entities: {
            clientName: "Mario Rossi",
            clientId: "00QQy00000GCcJdMAL",
            date: expectedDate, // Data attesa aggiornata dinamicamente
            time: "15:00:00",
        },
    };

    const result = await inputParser.parseMessage(rawMessage, verifiedName);

    console.log("Result:", result);

    expect(result.intent).toBe(expected.intent);
    expect(result.entities.clientName).toBe(expected.entities.clientName);
    expect(result.entities.clientId).toBe(expected.entities.clientId);
    expect(result.entities.date).toBe(expected.entities.date);
    expect(result.entities.time).toBe(expected.entities.time);
});



