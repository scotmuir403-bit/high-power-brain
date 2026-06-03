exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params = new URLSearchParams(event.body);
  const email  = params.get('email');
  const name   = params.get('name') || '';
  const tier   = params.get('tier') || '';

  if (!email) return { statusCode: 400, body: 'Email required' };

  const tagIdMap = {
    'Stage 1': 2018859,
    'Stage 2': 2036624,
    'Stage 3': 2036625
  };
  const stageKey    = tier.split('—')[0].trim();
  const stageTagId  = tagIdMap[stageKey];
  const tagIds      = stageTagId
    ? [2038166, stageTagId]
    : [2038166];

  const apiKey  = process.env.SYSTEME_API_KEY;
  console.log('API key present:', !!apiKey, '| first 6 chars:', apiKey ? apiKey.substring(0, 6) : 'MISSING');
  const baseUrl = 'https://api.systeme.io/api';
  const headers = {
    'X-API-Key':    apiKey,
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  };

  try {
    // Step 1: Create contact (or find existing) — include quiz-lead tag on creation
    const createRes = await fetch(`${baseUrl}/contacts`, {
      method:  'POST',
      headers,
      body:    JSON.stringify({ email, firstName: name, tagIds: [2038166] })
    });

    let contactId;

    if (createRes.ok) {
      const body = await createRes.json();
      contactId  = body.id;
      console.log('Contact created:', contactId);
    } else if (createRes.status === 409) {
      const findRes  = await fetch(`${baseUrl}/contacts?email=${encodeURIComponent(email)}`, {
        headers: { 'X-API-Key': apiKey, 'Accept': 'application/json' }
      });
      const findBody = await findRes.json();
      contactId      = findBody.items?.[0]?.id;
      console.log('Contact already exists, id:', contactId);
    } else {
      const err = await createRes.text();
      console.error('Create contact failed:', createRes.status, err);
    }

    if (!contactId) {
      console.error('No contact id — cannot apply tags');
      return { statusCode: 200, body: 'OK' };
    }

    // Step 2: Apply hardcoded tag IDs
    console.log('Applying tag IDs:', tagIds);
    for (const tagId of tagIds) {
      const applyRes = await fetch(`${baseUrl}/contacts/${contactId}/tags`, {
        method:  'POST',
        headers,
        body:    JSON.stringify({ tagId })
      });
      console.log(`Applied tag ID ${tagId} — status:`, applyRes.status);
    }

  } catch (err) {
    console.error('Function error:', err.message);
  }

  return { statusCode: 200, body: 'OK' };
};
