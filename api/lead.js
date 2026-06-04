module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, service, budget, city, message, website } = req.body ?? {};

  // honeypot
  if (website?.trim()) return res.status(200).json({ ok: true });

  if (!name?.trim() || !phone?.trim())
    return res.status(400).json({ error: 'name и phone обязательны' });

  try {
    const response = await fetch(process.env.SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ name, phone, service, budget, city, message }),
    });

    const result = await response.json();
    console.log('Sheets result:', JSON.stringify(result));
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Sheets error:', err.message);
    res.status(500).json({ error: 'sheets write failed' });
  }
};
