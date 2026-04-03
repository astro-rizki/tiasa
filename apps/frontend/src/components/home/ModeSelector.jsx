import React from "react";
import { Zap, Droplets, Wind } from "lucide-react";
import { motion } from "framer-motion";

const modes = [
  { id: "adaptive", label: "Adaptive", icon: Zap },
  { id: "balanced", label: "Balanced", icon: Droplets },
  { id: "intensive", label: "Intensive", icon: Wind },
];

export default function ModeSelector({ activeMode, onModeChange }) {
  return (
    <motion.div
      className="flex gap-3 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      {modes.map((mode) => {
        const isActive = activeMode === mode.id;
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            onClick={() => onModeChange(mode.id)}
            className={`flex-1 py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
              isActive
                ? "bg-[#D4AF37]/15 border border-[#D4AF37]/40"
                : "glass-card hover:bg-white/5"
            }`}
          >
            <Icon
              className={`w-4 h-4 transition-colors duration-300 ${
                isActive ? "text-[#D4AF37]" : "text-neutral-500"
              }`}
              strokeWidth={1.5}
            />
            <span
              className={`text-xs tracking-wider uppercase transition-colors duration-300 ${
                isActive ? "text-[#D4AF37] font-medium" : "text-neutral-500"
              }`}
            >
              {mode.label}
            </span>
          </button>
        );
      })}
    </motion.div>
  );
}