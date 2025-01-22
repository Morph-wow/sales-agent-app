const { normalizeDateTime } = require('../../parsing/normalizers');

describe('normalizeDateTime', () => {
  test('Normalizza una data relativa (domani)', () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(17, 0, 0, 0);

    const result = normalizeDateTime('domani', '17:00');
    expect(result).toBe(tomorrow.toISOString());
  });

  test('Normalizza una data relativa (dopodomani)', () => {
    const today = new Date();
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);
    dayAfterTomorrow.setHours(17, 0, 0, 0);

    const result = normalizeDateTime('dopodomani', '17:00');
    expect(result).toBe(dayAfterTomorrow.toISOString());
  });

  test('Normalizza una data assoluta (lunedì)', () => {
    const today = new Date();
    const diffDays = (1 - today.getDay() + 7) % 7; // Calcola quanti giorni mancano a lunedì
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffDays);
    monday.setHours(17, 0, 0, 0);

    const result = normalizeDateTime('lunedì', '17:00');
    expect(result).toBe(monday.toISOString());
  });

  test('Normalizza una data relativa (lunedì prossimo)', () => {
    const today = new Date();
    const diffDays = (1 - today.getDay() + 7) % 7 + 7; // Salta alla settimana successiva
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + diffDays);
    nextMonday.setHours(17, 0, 0, 0);

    const result = normalizeDateTime('lunedì prossimo', '17:00');
    expect(result).toBe(nextMonday.toISOString());
  });
});
