const { latestLeadsCommand } = require('../../telegram/commands');

test.skip('Deve rispondere con l\'ultimo lead', async () => {
  const ctx = {
    reply: jest.fn(), // Mock della funzione reply
  };

  await latestLeadsCommand(ctx);

  expect(ctx.reply).toHaveBeenCalled();
  expect(ctx.reply).toHaveBeenCalledWith(expect.stringContaining('Ultimi 10 lead'));
});
