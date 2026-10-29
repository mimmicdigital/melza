// Brevo disables API keys after 90 days without use, and this site may go months without a form.
// Every build (one runs daily) makes one harmless read call so the key stays active. Never fails the build.
const key = process.env.BREVO_API_KEY;
if (key) {
  try {
    const res = await fetch('https://api.brevo.com/v3/smtp/statistics/aggregatedReport?days=1', { headers: { 'api-key': key, accept: 'application/json' } });
    console.log(res.ok ? 'Brevo API key OK' : `Brevo API key check failed: ${res.status}`);
  } catch (e) {
    console.log(`Brevo API key check skipped: ${e.message}`);
  }
}
