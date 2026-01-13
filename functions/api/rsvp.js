export async function onRequestPost({ request, env }) {
  const data = await request.json();

  if (!data.name || !data.attending) {
    return new Response("Invalid data", { status: 400 });
  }

  // Example: store in KV
  const id = crypto.randomUUID();
  await env.RSVP_KV.put(id, JSON.stringify({
    name: data.name,
    attending: data.attending,
    message: data.message || "",
    timestamp: Date.now()
  }));

  return new Response("RSVP received!", { status: 200 });
}
