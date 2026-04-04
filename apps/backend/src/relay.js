const WebSocket = require('ws');
const clients = require('./clients');

const TIMEOUT_MS = 500; // auto OFF kalau koneksi putus
let safetyTimeout = null;

function handleEsp(ws) {
  console.log('[ESP] Connected');
  clients.setEsp(ws);

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

  // Kasih tau browser status ESP saat ini
  ws.send(JSON.stringify({
    type: 'esp_status',
    connected: clients.isEspConnected(),
  }));

  ws.on('message', (msg) => {
    const message = msg.toString();
    console.log('[Browser] Message:', message);

    const esp = clients.getEsp();
    if (clients.isEspConnected()) {
      esp.send(message);
      resetSafetyTimeout(message);
    } else {
      ws.send(JSON.stringify({
        type: 'error',
        message: 'ESP not connected',
      }));
    }
  });

  ws.on('close', () => {
    clients.removeBrowser(ws);
    console.log('[Browser] Disconnected, remaining:', clients.getBrowserCount());
  });

  ws.on('error', (err) => {
    console.error('[Browser] Error:', err.message);
  });
}

// Auto OFF kalau browser disconnect saat tombol ditekan
function resetSafetyTimeout(message) {
  try {
    const parsed = JSON.parse(message);
    if (parsed.state === 'ON') {
      clearTimeout(safetyTimeout);
      safetyTimeout = setTimeout(() => {
        triggerSafetyOff();
      }, TIMEOUT_MS);
    } else if (parsed.state === 'OFF') {
      clearTimeout(safetyTimeout);
    }
  } catch (e) {
    // ignore parse error
  }
}

function triggerSafetyOff() {
  clearTimeout(safetyTimeout);
  if (clients.isEspConnected()) {
    const offCommand = JSON.stringify({ type: 'button', state: 'OFF' });
    clients.getEsp().send(offCommand);
    console.log('[Safety] Auto OFF triggered');
  }
}

module.exports = { handleEsp, handleBrowser };