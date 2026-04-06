import { useState, useEffect, useRef, useCallback } from 'react';

const isDeviceMode = new URLSearchParams(window.location.search).has('device');

export function useDeviceSocket() {
  const ws = useRef(null);
  const reconnect = useRef(true);
  const [espConnected, setEspConnected] = useState(false);
  const [gpioState, setGpioState] = useState('OFF');

  useEffect(() => {
    if (!isDeviceMode) return;

    function connect() {
      if (!reconnect.current) return;
      const socket = new WebSocket(import.meta.env.VITE_WS_URL);
      ws.current = socket;

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'esp_status') setEspConnected(data.connected);
        if (data.type === 'gpio_status') setGpioState(data.state);
      };

      socket.onclose = () => { if (reconnect.current) setTimeout(connect, 3000); };
      socket.onerror = (err) => console.error('[WS] Error:', err);
    }

    connect();
    return () => {
      reconnect.current = false;
      ws.current?.close();
    };
  }, []);

  const sendSpray = useCallback((duration_ms = 5000) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'spray', duration_ms }));
    }
  }, []);

  return { espConnected, gpioState, sendSpray, isDeviceMode };
}