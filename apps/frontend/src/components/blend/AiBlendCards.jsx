import React from "react";
import { Sparkles, Moon, Flame } from "lucide-react";
import { motion } from "framer-motion";

const blends = [
  {
    icon: Sparkles,
    name: "Serene Cedar",
    notes: "Cedar, Vetiver, Bergamot",
    mood: "Calm Focus",
    bg: "from-amber-900/40 to-neutral-900",
  },
  {
    icon: Moon,
    name: "Midnight Orchid",
    notes: "Orchid, Oud, Amber",
    mood: "Deep Rest",
    bg: "from-purple-900/40 to-neutral-900",
  },
  {
    icon: Flame,
    name: "Citrus Ignite",
    notes: "Lemon, Ginger, Black Pepper",
    mood: "Energy Boost",
    bg: "from-orange-900/40 to-neutral-900",
  },
];

export default function AiBlendCards() {
  return (
    <motion.div
      className="px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">
        AI Recommended Blends
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6">
        {blends.map((blend, i) => {
          const Icon = blend.icon;
          return (
            <motion.div
              key={blend.name}
              className={`min-w-[160px] rounded-2xl p-4 bg-gradient-to-b ${blend.bg} border border-[#D4AF37]/10 flex flex-col gap-3`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                <Icon className="w-4 h-4 text-[#D4AF37]" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{blend.name}</p>
                <p className="text-[10px] text-neutral-500 mt-0.5">{blend.notes}</p>
              </div>
              <span className="text-[9px] uppercase tracking-wider bg-[#D4AF37]/10 text-[#D4AF37] px-2.5 py-1 rounded-full w-fit">
                {blend.mood}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}