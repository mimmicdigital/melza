// Runs on every Netlify Forms submission (the free plan has no form email notifications).
// Emails the lead to hello@melza.eu through Brevo, with the CV attached, and adds newsletter
// sign-ups to a Brevo list. Needs BREVO_API_KEY; BREVO_LIST_ID and NOTIFY_TO are optional.
const BREVO = 'https://api.brevo.com/v3';
const TO = process.env.NOTIFY_TO || 'hello@melza.eu';

const labels = {
  nombre: 'Nombre',
  email: 'Email',
  mensaje: 'Mensaje',
  'acepta-privacidad': 'Acepta la política de privacidad',
  'acepta-comercial': 'Acepta información comercial',
};
const subjects = {
  contact: 'Nuevo contacto desde melza.eu',
  cv: 'Nuevo CV desde melza.eu',
  newsletter: 'Nueva alta en la newsletter de melza.eu',
};
const skip = new Set(['form-name', 'bot-field', 'cv', 'ip', 'user_agent', 'referrer']);

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

async function brevo(path, body) {
  const res = await fetch(BREVO + path, {
    method: 'POST',
    headers: { 'api-key': process.env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Brevo ${path} ${res.status}: ${await res.text()}`);
}

// Netlify passes uploaded files as { url, filename, ... }; fetch it so the CV arrives as an attachment.
async function attachment(file) {
  const url = typeof file === 'string' ? file : file?.url;
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  const name = (typeof file === 'object' && file.filename) || decodeURIComponent(new URL(url).pathname.split('/').pop() || 'cv.pdf');
  return { name, content: Buffer.from(await res.arrayBuffer()).toString('base64') };
}

export const handler = async (event) => {
  const { payload } = JSON.parse(event.body);
  const data = payload.data ?? {};
  if (data['bot-field']) return { statusCode: 200 };
  const formName = payload.form_name ?? data['form-name'] ?? '';
  const kind = formName.split('-')[0];
  const lang = formName.endsWith('-en') ? 'inglés' : 'español';

  if (kind === 'newsletter' && process.env.BREVO_LIST_ID) {
    await brevo('/contacts', { email: data.email, listIds: [Number(process.env.BREVO_LIST_ID)], updateEnabled: true })
      .catch((e) => console.error(e.message));
  }

  const rows = Object.entries(data)
    .filter(([k, v]) => !skip.has(k) && v !== '' && v != null)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#59625f;vertical-align:top">${esc(labels[k] ?? k)}</td><td style="padding:6px 0">${esc(v === 'on' ? 'Sí' : v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('');
  const file = kind === 'cv' ? await attachment(data.cv) : null;
  const note = kind === 'cv' && !file ? '<p>No se ha podido adjuntar el CV. Lo tienes en Netlify, en el apartado Forms.</p>' : '';

  await brevo('/smtp/email', {
    sender: { name: 'Web Melza', email: TO },
    to: [{ email: TO }],
    ...(data.email ? { replyTo: { email: data.email, name: data.nombre || data.email } } : {}),
    subject: `${subjects[kind] ?? 'Nuevo formulario desde melza.eu'}${data.nombre ? `: ${data.nombre}` : ''}`,
    htmlContent: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#384244"><p>Formulario <strong>${esc(formName)}</strong> (web en ${lang}).</p><table>${rows}</table>${note}<p style="color:#59625f;font-size:13px">Responde a este email para contestar directamente a la persona.</p></div>`,
    ...(file ? { attachment: [file] } : {}),
  });
  return { statusCode: 200 };
};
