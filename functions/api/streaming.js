export async function onRequestGet(context) {
  const { searchParams } = new URL(context.request.url);
  const type = searchParams.get('type');
  const id   = searchParams.get('id');

  if (!type || !id) {
    return new Response(JSON.stringify({ error: 'Missing type or id' }), {
      status: 400, headers: { 'Content-Type': 'application/json' }
    });
  }

  const RAPID_KEY = 'a25def76dbmsh2cde20a6badb891p14ea11jsn693d13c99e22';

  try {
    const url = `https://streaming-availability.p.rapidapi.com/shows/${type}/${id}`;
    const resp = await fetch(url, {
      headers: {
        'X-RapidAPI-Key':  RAPID_KEY,
        'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
      }
    });

    const data = await resp.json();
    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500, headers: { 'Content-Type': 'application/json' }
    });
  }
}
