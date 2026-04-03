import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";

const cartridges = [
  { id: "base", label: "Base", level: 72, color: "#D4AF37" },
  { id: "floral", label: "Floral", level: 45, color: "#E8A0BF" },
  { id: "spice", label: "Spice", level: 18, color: "#FF8C42", low: true },
  { id: "wood", label: "Wood", level: 88, color: "#8B6914" },
  { id: "fresh", label: "Fresh", level: 55, color: "#7EC8B0" },
];

export default function CartridgeLevels() {
  return (
    <motion.div
      className="mx-6 glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-serif-luxury text-base text-white">Cartridge Matrix</h3>
        <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Solid Levels</span>
      </div>

      <div className="flex justify-between items-end gap-3" style={{ height: 140 }}>
        {cartridges.map((c, i) => (
          <div key={c.id} className="flex-1 flex flex-col items-center gap-2">
            {c.low && (
              <AlertTriangle className="w-3 h-3 text-orange-400 animate-pulse" />
            )}
            <span
              className="font-mono-data text-[10px] font-medium"
              style={{ color: c.color }}
            >
              {c.level}%
            </span>
            <div className="w-full flex justify-center" style={{ height: 80 }}>
              <div className="w-5 h-full rounded-lg bg-neutral-800/80 relative overflow-hidden">
                <motion.div
                  className="absolute bottom-0 w-full rounded-lg"
                  style={{
                    background: `linear-gradient(to top, ${c.color}, ${c.color}60)`,
                  }}
                  initial={{ height: "0%" }}
                  animate={{ height: `${c.level}%` }}
                  transition={{ duration: 1.2, delay: 0.5 + i * 0.1, ease: "easeOut" }}
                >
                  {/* Shimmer */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: `linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)`,
                    }}
                    animate={{ y: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>
            <span className="text-[7px] uppercase tracking-[0.15em] text-neutral-500">
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {cartridges.some((c) => c.low) && (
        <div className="mt-4 flex items-center gap-2 bg-orange-400/10 rounded-xl px-3 py-2">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
          <span className="text-[10px] text-orange-300">
            Spice cartridge running low. Consider refill soon.
          </span>
        </div>
      )}
    </motion.div>
  );
}