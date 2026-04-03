import React from "react";
import { Battery, Bluetooth, Cpu } from "lucide-react";
import { motion } from "framer-motion";

export default function DeviceStatus() {
  const battery = 78;

  return (
    <motion.div
      className="mx-6 glass-card-strong rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h3 className="font-serif-luxury text-base text-white mb-4">Device Status</h3>
      <div className="grid grid-cols-3 gap-4">
        {/* Battery */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center">
            <Battery className="w-6 h-6 text-[#D4AF37]" strokeWidth={1.5} />
            <motion.div
              className="absolute inset-0 rounded-2xl"
              animate={{
                boxShadow: [
                  "0 0 0px rgba(212,175,55,0)",
                  "0 0 15px rgba(212,175,55,0.2)",
                  "0 0 0px rgba(212,175,55,0)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <span className="font-mono-data text-sm text-white">{battery}%</span>
          <span className="text-[8px] uppercase tracking-wider text-neutral-500">Battery</span>
        </div>

        {/* Bluetooth */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center">
            <Bluetooth className="w-6 h-6 text-cyan-400" strokeWidth={1.5} />
          </div>
          <span className="font-mono-data text-sm text-emerald-400">Connected</span>
          <span className="text-[8px] uppercase tracking-wider text-neutral-500">BLE 5.0</span>
        </div>

        {/* MEMS */}
        <div className="flex flex-col items-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-400/10 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-purple-400" strokeWidth={1.5} />
          </div>
          <span className="font-mono-data text-sm text-white">38.2°C</span>
          <span className="text-[8px] uppercase tracking-wider text-neutral-500">MEMS Temp</span>
        </div>
      </div>
    </motion.div>
  );
}