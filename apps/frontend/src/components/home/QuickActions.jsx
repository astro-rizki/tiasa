import React from "react";
import { motion } from "framer-motion";

const actions = [
  { id: "biosync", label: "Bio Sync" },
  { id: "adaptive", label: "Adaptive" },
  { id: "manual", label: "Manual" },
];

export default function QuickActions({ activeAction, onActionChange }) {
  return (
    <motion.div
      className="flex gap-2 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      {actions.map((action) => {
        const isActive = activeAction === action.id;
        return (
          <button
            key={action.id}
            onClick={() => onActionChange(action.id)}
            className={`flex-1 py-2.5 rounded-xl text-xs tracking-wider uppercase transition-all duration-300 ${
              isActive
                ? "bg-[#D4AF37] text-black font-semibold"
                : "bg-neutral-900/60 text-neutral-500 border border-neutral-800/50 hover:border-neutral-700"
            }`}
          >
            {action.label}
          </button>
        );
      })}
    </motion.div>
  );
}