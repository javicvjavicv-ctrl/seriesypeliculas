export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    
    // Log what we're sending
    const parsed = JSON.parse(body);
    
    const resp = await fetch('https://apis.justwatch.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://www.justwatch.com',
        'Referer': 'https://www.justwatch.com/',
        'Accept': 'application/json, text/plain, */*',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'App-Version': '3.8.2-webapp#eb5f36d'
      },
      body: body
    });

    const responseText = await resp.text();

    // Return full diagnostic info
    return new Response(JSON.stringify({
      status: resp.status,
      statusText: resp.statusText,
      response: responseText.slice(0, 2000),
      sentBody: body.slice(0, 500)
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message, stack: err.stack }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
