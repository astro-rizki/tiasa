import React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export default function CuratorCard() {
  return (
    <motion.div
      className="mx-6 glass-card rounded-2xl p-4 flex items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35, duration: 0.5 }}
    >
      <div className="w-12 h-12 rounded-full overflow-hidden border border-[#D4AF37]/30 flex-shrink-0">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face"
          alt="Curator"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-white">Emily Taylor</span>
          <div className="w-4 h-4 rounded-full bg-[#D4AF37] flex items-center justify-center">
            <Check className="w-2.5 h-2.5 text-black" strokeWidth={3} />
          </div>
        </div>
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">
          Fragrance Curator
        </p>
      </div>
      <button className="px-4 py-1.5 rounded-full bg-neutral-800 border border-neutral-700 text-[10px] uppercase tracking-wider text-neutral-300 hover:bg-neutral-700 transition-colors">
        Follow
      </button>
    </motion.div>
  );
}