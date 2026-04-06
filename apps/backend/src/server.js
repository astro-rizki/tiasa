require('dotenv').config();
const WebSocket = require('ws');
const { handleEsp, handleBrowser } = require('./relay');

const PORT = process.env.PORT || 8080;
const WS_TOKEN = process.env.WS_TOKEN;

if (!WS_TOKEN) {
  console.error('[Server] WS_TOKEN tidak di-set di .env — semua koneksi akan ditolak!');
}

const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws, req) => {
  const url = new URL(req.url, `ws://localhost:${PORT}`);
  const token = url.searchParams.get('token');

  if (!WS_TOKEN || token !== WS_TOKEN) {
    console.warn('[Server] Koneksi ditolak — token tidak valid:', req.url);
    ws.close(4001, 'Unauthorized');
    return;
  }

  const path = url.pathname;

  if (path === '/ws/esp') {
    handleEsp(ws);
  } else if (path === '/ws/browser') {
    handleBrowser(ws);
  } else {
    console.warn('[Server] Unknown path:', path);
    ws.close();
  }
});

wss.on('error', (err) => {
  console.error('[Server] Error:', err.message);
});

console.log(`[Server] Relay running on port ${PORT}`);