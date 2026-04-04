import { useState, useEffect, useRef, useCallback } from 'react';

export function useDeviceSocket() {
  const ws = useRef(null);
  const [espConnected, setEspConnected] = useState(false);
  const [gpioState, setGpioState] = useState('OFF');

  useEffect(() => {
    function connect() {
      const socket = new WebSocket(import.meta.env.VITE_WS_URL);
      ws.current = socket;

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'esp_status') setEspConnected(data.connected);
        if (data.type === 'gpio_status') setGpioState(data.state);
      };

      socket.onclose = () => setTimeout(connect, 3000);
      socket.onerror = (err) => console.error('[WS] Error:', err);
    }

    connect();
    return () => ws.current?.close();
  }, []);

  const sendSpray = useCallback((duration_ms = 5000) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type: 'spray', duration_ms }));
    }
  }, []);

  return { espConnected, gpioState, sendSpray };
}