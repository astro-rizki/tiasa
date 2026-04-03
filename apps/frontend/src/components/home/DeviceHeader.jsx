import React from "react";
import { Battery } from "lucide-react";
import { motion } from "framer-motion";
import BluetoothConnect from "./BluetoothConnect";

export default function DeviceHeader({ deviceData }) {
  const { device_id, connected, connection_method, accuracy_pct, battery_pct, charging } = deviceData;

  return (
    <motion.div
      className="mx-6 mt-6 mb-4 glass-card-strong rounded-2xl p-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-start justify-between mb-3">
        {/* Left: Device Info */}
        <div className="flex items-center gap-2">
          <BluetoothConnect onConnect={(device) => console.log("Connected:", device)} />
          <div>
            <p className="text-sm font-semibold text-white uppercase">{device_id}</p>
            <p className="text-[9px] text-neutral-500 uppercase tracking-wider">
              {connection_method.replace('_', ' ')} · {connected ? 'Connected' : 'Disconnected'}
            </p>
          </div>
        </div>

        {/* Right: Accuracy */}
        <div className="text-right">
          <p className="text-[9px] text-neutral-500 uppercase tracking-wider mb-0.5">Device Accuracy</p>
          <p className="text-sm font-bold" style={{ color: '#FF69B4' }}>{accuracy_pct}%</p>
        </div>
      </div>

      {/* Battery Bar */}
      <div className="flex items-center gap-3">
        <Battery className="w-4 h-4 text-[#E0B23A]" strokeWidth={2} />
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-white">{battery_pct}%</span>
            {charging && (
              <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Charging</span>
            )}
          </div>
          <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #E0B23A 0%, #AA771C 100%)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${battery_pct}%` }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}