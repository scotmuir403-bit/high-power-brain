exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const params = new URLSearchParams(event.body);
  const email  = params.get('email');
  const name   = params.get('name') || '';
  const tier   = params.get('tier') || '';

  if (!email) return { statusCode: 400, body: 'Email required' };

  const tagMap = {
    'Stage 1': 'quiz-stage-1-ai-beginner',
    'Stage 2': 'quiz-stage-2-ai-explorer',
    'Stage 3': 'quiz-stage-3-ai-operator'
  };
  const stageKey  = tier.split('—')[0].trim(); // split on em dash
  const stageTag  = tagMap[stageKey] || 'quiz-lead';
  const tagsToAdd = Array.from(new Set(['quiz-lead', stageTag]));

  const apiKey  = process.env.SYSTEME_API_KEY;
  console.log('API key present:', !!apiKey, '| first 6 chars:', apiKey ? apiKey.substring(0, 6) : 'MISSING');
  const baseUrl = 'https://api.systeme.io/api';
  const headers = {
    'X-API-Key':    apiKey,
    'Content-Type': 'application/json',
    'Accept':       'application/json'
  };

  try {
    // Step 1: Create contact (or find existing)
    const createRes = await fetch(`${baseUrl}/contacts`, {
      method:  'POST',
      headers,
      body:    JSON.stringify({ email, firstName: name })
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

    // Step 2: Fetch ALL tags from Systeme.io (handle pagination)
    let allTags = [];
    let page = 1;
    while (true) {
      const tagsRes  = await fetch(`${baseUrl}/tags?page=${page}&limit=100`, {
        headers: { 'X-API-Key': apiKey, 'Accept': 'application/json' }
      });
      const tagsBody = await tagsRes.json();
      const items    = tagsBody.items || [];
      allTags = allTags.concat(items);
      if (items.length < 100) break;
      page++;
    }
    console.log('Tags available:', allTags.map(t => `${t.name}(${t.id})`).join(', '));

    // Step 3: Apply each tag
    for (const tagName of tagsToAdd) {
      const tag = allTags.find(t => t.name === tagName);
      if (!tag) {
        console.error('Tag not found:', tagName, '— does it exist in Systeme.io?');
        continue;
      }

      const applyRes = await fetch(`${baseUrl}/contacts/${contactId}/tags`, {
        method:  'POST',
        headers,
        body:    JSON.stringify({ tagId: tag.id })
      });
      console.log(`Applied tag "${tagName}" (${tag.id}) — status:`, applyRes.status);
    }

  } catch (err) {
    console.error('Function error:', err.message);
  }

  return { statusCode: 200, body: 'OK' };
};
