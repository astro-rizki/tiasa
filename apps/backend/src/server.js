require('dotenv').config();
const WebSocket = require('ws');
const { handleEsp, handleBrowser } = require('./relay');

const PORT = process.env.PORT || 8080;
const wss = new WebSocket.Server({ port: PORT });

wss.on('connection', (ws, req) => {
  const path = req.url;

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