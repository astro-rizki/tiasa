import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bluetooth, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

const mockDevices = [
  { id: "device_1", name: "TIASA-01", rssi: -45, type: "Scent Device" },
  { id: "device_2", name: "TIASA-02", rssi: -68, type: "Scent Device" },
  { id: "device_3", name: "Headphones", rssi: -72, type: "Audio" },
  { id: "device_4", name: "Smart Watch", rssi: -80, type: "Wearable" },
];

export default function BluetoothConnect({ onConnect }) {
  const [showModal, setShowModal] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [devices, setDevices] = useState([]);
  const [connecting, setConnecting] = useState(null);

  const handleScan = () => {
    setScanning(true);
    setDevices([]);
    
    // Simulate device discovery
    setTimeout(() => {
      setDevices([mockDevices[0]]);
    }, 500);
    setTimeout(() => {
      setDevices([mockDevices[0], mockDevices[1]]);
    }, 1200);
    setTimeout(() => {
      setDevices(mockDevices);
      setScanning(false);
    }, 2000);
  };

  const handleConnect = (device) => {
    setConnecting(device.id);
    
    setTimeout(() => {
      toast.success(`Connected to ${device.name}`);
      setConnecting(null);
      setShowModal(false);
      onConnect?.(device);
    }, 1500);
  };

  const getSignalStrength = (rssi) => {
    if (rssi > -50) return { bars: 3, label: "Excellent" };
    if (rssi > -70) return { bars: 2, label: "Good" };
    return { bars: 1, label: "Fair" };
  };

  return (
    <>
      <button
        onClick={() => {
          setShowModal(true);
          handleScan();
        }}
        className="w-8 h-8 rounded-lg bg-[#E0B23A]/15 flex items-center justify-center hover:bg-[#E0B23A]/25 transition-all"
      >
        <Bluetooth className="w-4 h-4 text-[#E0B23A]" strokeWidth={2} />
      </button>

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card-strong rounded-2xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif-luxury text-xl text-white">Bluetooth Devices</h3>
                  <p className="text-xs text-neutral-500 mt-1">Available devices nearby</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg glass-card flex items-center justify-center hover:bg-white/5"
                >
                  <X className="w-4 h-4 text-neutral-400" />
                </button>
              </div>

              {scanning && (
                <div className="flex items-center gap-3 mb-4 p-3 glass-card rounded-xl">
                  <Loader2 className="w-4 h-4 text-[#C0C0C0] animate-spin" />
                  <span className="text-sm text-neutral-400">Scanning for devices...</span>
                </div>
              )}

              <div className="space-y-2">
                {devices.map((device) => {
                  const signal = getSignalStrength(device.rssi);
                  const isConnecting = connecting === device.id;

                  return (
                    <motion.button
                      key={device.id}
                      onClick={() => !isConnecting && handleConnect(device)}
                      className="w-full glass-card rounded-xl p-4 hover:bg-white/5 transition-all text-left"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      disabled={isConnecting}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[#E0B23A]/15 flex items-center justify-center">
                            {isConnecting ? (
                              <Loader2 className="w-5 h-5 text-[#E0B23A] animate-spin" />
                            ) : (
                              <Bluetooth className="w-5 h-5 text-[#E0B23A]" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-white">{device.name}</p>
                            <p className="text-xs text-neutral-500">{device.type}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex gap-0.5">
                            {[1, 2, 3].map((bar) => (
                              <div
                                key={bar}
                                className={`w-1 rounded-full ${
                                  bar <= signal.bars ? "bg-[#C0C0C0]" : "bg-neutral-700"
                                }`}
                                style={{ height: `${bar * 4 + 4}px` }}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-neutral-500">{signal.label}</span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {!scanning && devices.length === 0 && (
                <div className="text-center py-8">
                  <Bluetooth className="w-12 h-12 text-neutral-700 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500">No devices found</p>
                  <button
                    onClick={handleScan}
                    className="mt-4 px-6 py-2 rounded-xl bg-[#C0C0C0] text-black text-xs font-semibold uppercase tracking-wider hover:bg-[#E8E8E8] transition-all"
                  >
                    Scan Again
                  </button>
                </div>
              )}

              {!scanning && devices.length > 0 && (
                <button
                  onClick={handleScan}
                  className="w-full mt-4 py-3 rounded-xl border border-neutral-700 text-neutral-400 text-xs font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all"
                >
                  Rescan
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}