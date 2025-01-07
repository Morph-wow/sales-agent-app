const { conn } = require('../../salesforce/api');

test('Deve connettersi correttamente a Salesforce', async () => {
  const loginResponse = await conn.login(
    process.env.SALESFORCE_USERNAME,
    process.env.SALESFORCE_PASSWORD
  );
  expect(loginResponse).toBeDefined();
  expect(conn.accessToken).toBeDefined();
});
afterAll(() => {
    // Chiudi eventuali connessioni o listener aperti
    jest.clearAllMocks();
  });
  