import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronRight } from "lucide-react";

export default function AIInsightPanel({ insight }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      className="mx-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full glass-card rounded-xl p-4 text-left hover:bg-white/5 transition-colors"
      >
        <div className="flex items-start gap-3">
          {/* Gold accent bar */}
          <div className="w-1 h-full bg-[#E0B23A] rounded-full absolute left-0 top-0 bottom-0" />
          
          <div className="w-10 h-10 rounded-xl bg-[#E0B23A]/15 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 text-[#E0B23A]" strokeWidth={1.5} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#E0B23A] font-semibold">
                AI Insight
              </p>
            </div>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {insight || "Detected rising cortisol. Sublimating 'Serene Cedar' via Channel 3 & 5."}
            </p>
          </div>

          <ChevronRight 
            className={`w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform ${expanded ? 'rotate-90' : ''}`}
            strokeWidth={1.5}
          />
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="mt-2 glass-card rounded-xl p-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.24 }}
          >
            <div className="space-y-2">
              <button className="w-full py-2 px-3 rounded-lg bg-[#E0B23A] text-black text-xs font-semibold hover:bg-[#C9A234] transition-colors">
                Apply Recommended Blend
              </button>
              <button className="w-full py-2 px-3 rounded-lg border border-neutral-700 text-neutral-300 text-xs font-semibold hover:bg-white/5 transition-colors">
                Save to Playlist
              </button>
              <button className="w-full py-2 px-3 rounded-lg border border-neutral-700 text-neutral-300 text-xs font-semibold hover:bg-white/5 transition-colors">
                Open Blend
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}