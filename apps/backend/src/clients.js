const WebSocket = require('ws');

let espClient = null;
let browserClients = [];

function setEsp(ws) {
  espClient = ws;
}

function getEsp() {
  return espClient;
}

function clearEsp() {
  espClient = null;
}

function isEspConnected() {
  return espClient !== null && espClient.readyState === WebSocket.OPEN;
}

function addBrowser(ws) {
  browserClients.push(ws);
}

function removeBrowser(ws) {
  browserClients = browserClients.filter(client => client !== ws);
}

function broadcastToBrowsers(message) {
  browserClients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
}

function getBrowserCount() {
  return browserClients.length;
}

module.exports = {
  setEsp,
  getEsp,
  clearEsp,
  isEspConnected,
  addBrowser,
  removeBrowser,
  broadcastToBrowsers,
  getBrowserCount,
};