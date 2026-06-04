exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params  = new URLSearchParams(event.body);
  const email   = params.get('email');
  const name    = params.get('name') || '';
  const score   = params.get('score') || '—';
  const tier    = params.get('tier') || '';

  let answersText = '';
  try {
    const answers = JSON.parse(params.get('answers') || '[]');
    answersText = answers.map((a, i) => `Q${i+1}: ${a.q}\n    → ${a.a}`).join('\n\n');
  } catch(e) {}

  if (!email) return { statusCode: 400, body: 'Email required' };

  // tier format: "Stage 1 — Start Here" / "Stage 2 — One Step Away" / "Stage 3 — Content System Ready"
  const tagIdMap = {
    'Stage 1': 2018859,
    'Stage 2': 2036624,
    'Stage 3': 2036625
  };
  const stageKey   = tier.split('—')[0].trim();
  const stageTagId = tagIdMap[stageKey];
  const tagIds     = stageTagId ? [2038166, stageTagId] : [2038166];

  const apiKey  = process.env.SYSTEME_API_KEY;
  const baseUrl = 'https://api.systeme.io/api';
  const headers = {
    'X-API-Key':    apiKey,
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  };

  try {
    // Create contact or find existing
    const createRes = await fetch(`${baseUrl}/contacts`, {
      method:  'POST',
      headers,
      body:    JSON.stringify({ email, firstName: name, tagIds: [2038166] })
    });

    let contactId;

    if (createRes.ok) {
      contactId = (await createRes.json()).id;
      console.log('Contact created:', contactId);
    } else if (createRes.status === 409) {
      const findRes = await fetch(`${baseUrl}/contacts?email=${encodeURIComponent(email)}`, {
        headers: { 'X-API-Key': apiKey, 'Accept': 'application/json' }
      });
      contactId = (await findRes.json()).items?.[0]?.id;
      console.log('Contact exists, id:', contactId);
    } else {
      console.error('Create contact failed:', createRes.status, await createRes.text());
    }

    if (contactId) {
      for (const tagId of tagIds) {
        const r = await fetch(`${baseUrl}/contacts/${contactId}/tags`, {
          method:  'POST',
          headers,
          body:    JSON.stringify({ tagId })
        });
        console.log(`Tag ${tagId} applied — status:`, r.status);
      }
    }
  } catch (err) {
    console.error('Systeme.io error:', err.message);
  }

  // Notify Scott
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method:  'POST',
        headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          from:    'quiz@ainightshift.co.uk',
          to:      'scott@digital-madesimple.co.uk',
          subject: `New quiz lead: ${name || email} — ${stageKey}`,
          text:    `New quiz lead\n\nName:  ${name}\nEmail: ${email}\nScore: ${score}/100\nTier:  ${tier}\nTime:  ${new Date().toUTCString()}\n\n--- Their answers ---\n\n${answersText}`
        })
      });
      console.log('Notification sent to Scott');
    } catch (err) {
      console.error('Resend error:', err.message);
    }
  }

  return { statusCode: 200, body: 'OK' };
};
