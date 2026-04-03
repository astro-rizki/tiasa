import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SelectedPerfume({ perfume }) {
  return (
    <AnimatePresence mode="wait">
      {perfume ? (
        <motion.div
          key={perfume.id}
          className="mx-6 mb-4 glass-card rounded-2xl p-4 flex items-center gap-3"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{perfume.name}</p>
            <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">
              {perfume.family} · YSL
            </p>
          </div>
          <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" strokeWidth={1.5} />
        </motion.div>
      ) : (
        <motion.div
          key="empty"
          className="mx-6 mb-4 glass-card rounded-2xl p-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-[10px] text-neutral-600 uppercase tracking-wider">
            Select a perfume to begin
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}