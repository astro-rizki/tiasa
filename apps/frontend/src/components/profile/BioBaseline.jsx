import React, { useState } from "react";
import { Shield, AlertCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function BioBaseline() {
  const [restrictions] = useState(["Synthetic Musk", "Bergamot Oil"]);
  const [preferences] = useState(["Woody", "Fresh"]);

  return (
    <motion.div
      className="mx-6 glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <h3 className="font-serif-luxury text-base text-white mb-4">Bio-Baseline</h3>

      {/* Restrictions */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-3.5 h-3.5 text-red-400" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            Restricted Compounds
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {restrictions.map((r) => (
            <span
              key={r}
              className="px-3 py-1 rounded-full bg-red-400/10 text-red-300 text-[10px] border border-red-400/20"
            >
              {r}
            </span>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Heart className="w-3.5 h-3.5 text-[#D4AF37]" strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            Preferred Families
          </span>
        </div>
        <div className="flex flex-wrap gap-2">
          {preferences.map((p) => (
            <span
              key={p}
              className="px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] border border-[#D4AF37]/20"
            >
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="flex items-center gap-2 pt-3 border-t border-neutral-800">
        <Shield className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} />
        <span className="text-[10px] text-neutral-500">
          Data processed locally. No biometric storage.
        </span>
      </div>
    </motion.div>
  );
}