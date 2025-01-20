const OutputHandler = require('../../parsing/modules/outputhandler');

test('Gestione risposta utente all\'ambiguità - funzione isolata', async () => {
    // Mock dei dati di verifica in sospeso
    const mockPendingVerifications = new Map();
    const chatId = "164653608";
    const mockClients = [
        { clientId: "001", clientName: "danielo carletta", createdAt: "2025-01-02T17:07:43.000+0000" },
        { clientId: "002", clientName: "danielo pasticcio", createdAt: "2025-01-02T14:28:52.000+0000" },
        { clientId: "003", clientName: "danielo prada", createdAt: "2025-01-08T12:38:06.000+0000" },
    ];
    mockPendingVerifications.set(chatId, mockClients);

    const handleAmbiguityResponse = async (response, context) => {
        const options = mockPendingVerifications.get(context.chatId);
        if (!options) {
            return { status: "error", message: "Nessuna verifica in corso per questo chat ID." };
        }

        const userSelection = parseInt(response, 10);
        if (isNaN(userSelection) || userSelection < 1 || userSelection > options.length) {
            return { status: "error", message: "Selezione non valida. Rispondi con 1, 2, 3, ecc." };
        }

        const selectedClient = options[userSelection - 1];
        mockPendingVerifications.delete(context.chatId);
        return { status: "success", client: selectedClient };
    };

    // Simula una risposta valida
    const userResponse = "2";
    const context = { chatId };
    const result = await handleAmbiguityResponse(userResponse, context);

    // Verifica il cliente selezionato
    expect(result.status).toBe("success");
    expect(result.client.clientId).toBe("002");
    expect(result.client.clientName).toBe("danielo pasticcio");

    // Verifica che l'ambiguità sia stata rimossa
    expect(mockPendingVerifications.has(chatId)).toBe(false);
});

