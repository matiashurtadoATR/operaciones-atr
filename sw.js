/* ATRIUM GO · service worker mínimo para que la web se pueda instalar como app.
   No guarda datos: todo se pide siempre a internet (los datos vienen de Supabase).
   Sólo si no hay conexión muestra un aviso en vez de la pantalla de error del navegador. */
const AVISO = `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>ATRIUM GO</title><body style="margin:0;font-family:system-ui,sans-serif;background:#4a2b1f;color:#faf6f0;display:flex;align-items:center;justify-content:center;height:100vh;text-align:center">
<div><h2 style="letter-spacing:3px">ATRIUM GO</h2><p>Sin conexión a internet.<br>Revisa tu conexión y vuelve a intentar.</p>
<button onclick="location.reload()" style="padding:10px 18px;border:0;border-radius:8px;background:#be5014;color:#fff;font-size:15px">Reintentar</button></div></body>`;
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", e => e.waitUntil(self.clients.claim()));
self.addEventListener("fetch", e => {
  if (e.request.mode !== "navigate") return;            // archivos y datos: directo a internet, sin caché
  e.respondWith(fetch(e.request).catch(() => new Response(AVISO, { headers: { "Content-Type": "text/html; charset=utf-8" } })));
});
