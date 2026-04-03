import React from "react";
import { motion } from "framer-motion";

const channels = [
  { id: "oriental", label: "ORIENTAL", color: "#D4AF37", defaultVal: 68 },
  { id: "floral", label: "FLORAL", color: "#E8A0BF", defaultVal: 48 },
  { id: "animaly", label: "ANIMALY", color: "#8B6914", defaultVal: 25 },
  { id: "woody", label: "WOODY", color: "#A0826D", defaultVal: 76 },
  { id: "fresh", label: "FRESH", color: "#7EC8B0", defaultVal: 58 },
];

export default function ScentSliders({ values, onChange, onSaveClick }) {
  const handleChange = (id, newVal) => {
    onChange({ ...values, [id]: newVal });
  };

  const hasAnyValue = Object.values(values || {}).some(v => v > 0);

  return (
    <motion.div
      className="mx-6 glass-card-strong rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="flex justify-between items-end gap-3" style={{ height: 180 }}>
        {channels.map((ch) => {
          const val = values?.[ch.id] ?? ch.defaultVal;
          const height = `${val}%`;
          return (
            <div key={ch.id} className="flex-1 flex flex-col items-center gap-2">
              {/* Value */}
              <span
                className="font-mono-data text-xs font-medium"
                style={{ color: ch.color }}
              >
                {val}
              </span>

              {/* Track */}
              <div className="relative w-full flex justify-center" style={{ height: 120 }}>
                <div className="w-3 h-full rounded-full bg-neutral-800/80 relative overflow-hidden">
                  <motion.div
                    className="absolute bottom-0 w-full rounded-full"
                    style={{
                      background: `linear-gradient(to top, ${ch.color}CC, ${ch.color}40)`,
                      boxShadow: `0 0 12px ${ch.color}40`,
                    }}
                    initial={{ height: "0%" }}
                    animate={{ height }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />
                  {/* Vapor particles */}
                  {val > 40 && (
                    <motion.div
                      className="absolute w-1 h-1 rounded-full left-1/2 -translate-x-1/2"
                      style={{
                        background: ch.color,
                        bottom: `${val}%`,
                      }}
                      animate={{
                        y: [-5, -20],
                        opacity: [0.6, 0],
                        scale: [1, 0.3],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
                </div>
                {/* Invisible range input overlaid */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={val}
                  onChange={(e) => handleChange(ch.id, parseInt(e.target.value))}
                  className="absolute w-full opacity-0 cursor-pointer"
                  style={{
                    height: 120,
                    writingMode: "vertical-lr",
                    direction: "rtl",
                  }}
                />
              </div>

              {/* Label */}
              <span className="text-[8px] uppercase tracking-[0.2em] text-neutral-500 font-medium">
                {ch.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}