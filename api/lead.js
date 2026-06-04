module.exports = async function handler(req, res) {
  console.log('[lead] вызван, метод:', req.method);

  if (req.method !== 'POST') return res.status(405).end();

  // Явный парсинг — Vercel иногда отдаёт body как строку
  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch (e) { body = {}; }
  }
  if (!body || typeof body !== 'object') body = {};

  console.log('[lead] поля:', Object.keys(body).join(', '));

  const { name, phone, service, budget, city, message, website } = body;

  if (website?.trim()) return res.status(200).json({ ok: true });

  if (!name?.trim() || !phone?.trim()) {
    console.log('[lead] валидация не пройдена, name=', name, 'phone=', phone);
    return res.status(400).json({ error: 'name и phone обязательны' });
  }

  const sheetsUrl = process.env.SHEETS_URL;
  console.log('[lead] SHEETS_URL задан:', !!sheetsUrl);

  try {
    const response = await fetch(sheetsUrl, {
      method: 'POST',
      redirect: 'follow',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ name, phone, service, budget, city, message }),
    });

    const text = await response.text();
    console.log('[lead] ответ таблицы:', response.status, text);

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[lead] ошибка:', err.message);
    res.status(500).json({ error: 'sheets write failed' });
  }
};
