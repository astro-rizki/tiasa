import React from "react";
import { Search, Sliders } from "lucide-react";
import { motion } from "framer-motion";

export default function ControlButtons({ onSearch, onCustomize }) {
  return (
    <motion.div
      className="flex gap-3 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      <button
        onClick={onSearch}
        className="flex-1 py-3 px-4 rounded-xl glass-card hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Search className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
        <span className="text-xs tracking-wider uppercase text-neutral-400">
          Search perfume
        </span>
      </button>
      <button
        onClick={onCustomize}
        className="flex-1 py-3 px-4 rounded-xl glass-card hover:bg-white/5 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <Sliders className="w-4 h-4 text-neutral-400" strokeWidth={1.5} />
        <span className="text-xs tracking-wider uppercase text-neutral-400">
          Customize
        </span>
      </button>
    </motion.div>
  );
}