// api/apify.js — Vercel serverless proxy for Apify
// Sits between the browser and Apify so CORS is never an issue

module.exports = async function handler(req, res) {
  // Allow all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { path } = req.query;
  if (!path) return res.status(400).json({ error: 'Missing path' });

  // Rebuild the full Apify URL
  const apifyBase = 'https://api.apify.com/v2';
  const fullPath = Array.isArray(path) ? path.join('/') : path;

  // Forward query params (except 'path' itself)
  const params = new URLSearchParams();
  for (const [key, val] of Object.entries(req.query)) {
    if (key !== 'path') params.append(key, val);
  }

  const apifyUrl = `${apifyBase}/${fullPath}${params.toString() ? '?' + params.toString() : ''}`;

  try {
    const fetchOptions = {
      method: req.method,
      headers: { 'Content-Type': 'application/json' },
    };

    if (req.method === 'POST' && req.body) {
      fetchOptions.body = JSON.stringify(req.body);
    }

    const apifyResp = await fetch(apifyUrl, fetchOptions);
    const contentType = apifyResp.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const data = await apifyResp.json();
      return res.status(apifyResp.status).json(data);
    } else {
      const text = await apifyResp.text();
      res.setHeader('Content-Type', contentType || 'text/plain');
      return res.status(apifyResp.status).send(text);
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
