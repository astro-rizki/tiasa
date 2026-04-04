const WebSocket = require('ws');
const clients = require('./clients');

let safetyTimeout = null;

function handleEsp(ws) {
  console.log('[ESP] Connected');
  clients.setEsp(ws);

  // Heartbeat ping ke ESP
  const pingInterval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.ping();
    } else {
      clearInterval(pingInterval);
    }
  }, 30000);

  clients.broadcastToBrowsers(JSON.stringify({
    type: 'esp_status',
    connected: true,
  }));

  ws.on('message', (msg) => {
    const message = msg.toString();
    console.log('[ESP] Message:', message);
    clients.broadcastToBrowsers(message);
  });

  ws.on('close', () => {
    clearInterval(pingInterval);
    console.log('[ESP] Disconnected');
    clients.clearEsp();
    triggerSafetyOff();
    clients.broadcastToBrowsers(JSON.stringify({
      type: 'esp_status',
      connected: false,
    }));
  });

  ws.on('error', (err) => {
    console.error('[ESP] Error:', err.message);
  });
}

function handleBrowser(ws) {
  console.log('[Browser] Connected, total:', clients.getBrowserCount() + 1);
  clients.addBrowser(ws);

  ws.send(JSON.stringify({
    type: 'esp_status',
    connected: clients.isEspConnected(),
  }));

  ws.on('message', (msg) => {
    const message = msg.toString();
    console.log('[Browser] Message:', message);

    if (!clients.isEspConnected()) {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'ESP not connected',
      }));
      return;
    }

    handleBrowserMessage(message);
  });

  ws.on('close', () => {
    clients.removeBrowser(ws);
    console.log('[Browser] Disconnected, remaining:', clients.getBrowserCount());
  });

  ws.on('error', (err) => {
    console.error('[Browser] Error:', err.message);
  });
}

function handleBrowserMessage(message) {
  try {
    const parsed = JSON.parse(message);

    if (parsed.type === 'spray') {
      const duration = Number(parsed.duration_ms) || 5000;
      console.log(`[Relay] Spraying for ${duration}ms`);

      const esp = clients.getEsp();
      if (!esp) return;

      // Clear timeout lama dulu sebelum apapun
      clearTimeout(safetyTimeout);
      safetyTimeout = null;

      // Kirim ON
      esp.send(JSON.stringify({ type: 'button', state: 'ON' }));
      console.log('[Relay] Sent ON');

      // Auto OFF setelah durasi
      safetyTimeout = setTimeout(() => {
        console.log(`[Relay] ${duration}ms passed, sending OFF`);
        if (clients.isEspConnected()) {
          clients.getEsp().send(JSON.stringify({ type: 'button', state: 'OFF' }));
          console.log('[Relay] Sent OFF');
        }
        safetyTimeout = null;
      }, duration);
    }

  } catch (e) {
    console.error('[Relay] Parse error:', e.message);
  }
}

function triggerSafetyOff() {
  clearTimeout(safetyTimeout);
  if (clients.isEspConnected()) {
    clients.getEsp().send(JSON.stringify({ type: 'button', state: 'OFF' }));
    console.log('[Safety] Auto OFF triggered');
  }
}

module.exports = { handleEsp, handleBrowser };