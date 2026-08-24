import { Resend } from 'resend';

const MAX_NAME_LENGTH = 120;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 254;

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (char) =>
    ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }[char] || char)
  );
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, message } = req.body || {};
  const cleanName = typeof name === 'string' ? name.trim() : '';
  const cleanEmail = typeof email === 'string' ? email.trim() : '';
  const cleanMessage = typeof message === 'string' ? message.trim() : '';

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return res.status(400).json({ error: 'Name, email and message are required.' });
  }

  if (cleanName.length > MAX_NAME_LENGTH) {
    return res.status(400).json({ error: 'Name is too long.' });
  }

  if (
    cleanEmail.length > MAX_EMAIL_LENGTH ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)
  ) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }

  if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.CONTACT_EMAIL || 'sukhvantsingh581998@gmail.com';
  const sender = process.env.EMAIL_FROM || 'Sukhvant Portfolio <onboarding@resend.dev>';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured.');
    return res.status(503).json({ error: 'Email service is not configured yet.' });
  }

  try {
    const resend = new Resend(apiKey);
    const result = await resend.emails.send({
      from: sender,
      to: [recipient],
      replyTo: cleanEmail,
      subject: `Portfolio contact from ${cleanName}`,
      text: [
        'New Portfolio Contact',
        '',
        `Name / Organization: ${cleanName}`,
        `Email: ${cleanEmail}`,
        '',
        'Message:',
        cleanMessage,
        '',
        'Sent from Sukhvant Singh portfolio.',
      ].join('\n'),
      html: `
        <div style="font-family:Arial,sans-serif;line-height:1.6;color:#111">
          <h2>New Portfolio Contact</h2>
          <p><strong>Name / Organization:</strong> ${escapeHtml(cleanName)}</p>
          <p><strong>Email:</strong> ${escapeHtml(cleanEmail)}</p>
          <p><strong>Message:</strong></p>
          <div style="white-space:pre-wrap;border:1px solid #ddd;padding:16px;border-radius:8px">${escapeHtml(cleanMessage)}</div>
          <p style="font-size:12px;color:#666">Sent from Sukhvant Singh's portfolio contact form.</p>
        </div>
      `,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return res.status(502).json({
        error: 'Unable to dispatch the message right now. Please use the direct email option.',
      });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact email failed:', error);
    return res.status(500).json({
      error: 'Unable to dispatch the message right now. Please use the direct email option.',
    });
  }
}
