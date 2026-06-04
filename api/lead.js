const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, phone, service, budget, city, message, website } = req.body ?? {};

  // honeypot — бот заполнил скрытое поле, тихо игнорируем
  if (website?.trim()) return res.status(200).json({ ok: true });

  if (!name?.trim() || !phone?.trim())
    return res.status(400).json({ error: 'name и phone обязательны' });

  try {
    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'sajtoakoder@gmail.com',
      subject: `Новая заявка от ${name}`,
      html: `
        <h2 style="color:#e8a020;font-family:sans-serif">Новая заявка с сайта СтройТех</h2>
        <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
          <tr><td style="padding:6px 16px 6px 0;color:#888">Имя</td><td><b>${name}</b></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Телефон</td><td><b>${phone}</b></td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Услуга</td><td>${service || '—'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Бюджет</td><td>${budget || '—'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Город</td><td>${city || '—'}</td></tr>
          <tr><td style="padding:6px 16px 6px 0;color:#888">Сообщение</td><td>${message || '—'}</td></tr>
        </table>
      `,
    });

    console.log('Resend result:', JSON.stringify(result));
    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err?.message, err?.response?.data);
    res.status(500).json({ error: 'email send failed' });
  }
};
