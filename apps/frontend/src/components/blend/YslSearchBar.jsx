import React from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

export default function YslSearchBar({ searchQuery, onSearchChange }) {
  return (
    <motion.div
      className="px-6 mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <div className="glass-card rounded-2xl px-4 py-3 flex items-center gap-3">
        <Search className="w-4 h-4 text-neutral-500 flex-shrink-0" strokeWidth={1.5} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search YSL collection..."
          className="flex-1 bg-transparent text-sm text-white placeholder-neutral-600 outline-none font-body"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="text-[10px] text-neutral-500 hover:text-neutral-400 uppercase tracking-wider"
          >
            Clear
          </button>
        )}
      </div>
    </motion.div>
  );
}