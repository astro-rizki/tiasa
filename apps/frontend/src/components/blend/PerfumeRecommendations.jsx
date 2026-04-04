import React, { useState } from "react";
import { motion } from "framer-motion";
import { Crown, Sparkles } from "lucide-react";
import { toast } from "sonner";

const perfumes = [
  {
    id: "magnoy",
    name: "Magnoy",
    image: "/images/blend/bottle1.png",
    isFree: false
  },
  {
    id: "vulcain",
    name: "Vulcain",
    image: "/images/blend/bottle2.png",
    isFree: true
  },
  {
    id: "opoiky",
    name: "Opoiky",
    image: "/images/blend/bottle3.png",
    isFree: false
  }
];

export default function PerfumeRecommendations() {
  const [selectedPerfume, setSelectedPerfume] = useState(null);

  const handleSelect = (perfume) => {
    if (perfume.id === selectedPerfume) {
      setSelectedPerfume(null);
    } else if (!perfume.isFree && selectedPerfume !== null) {
      toast("Upgrade to Premium", {
        description: "Unlock this perfume with a Premium subscription"
      });
    } else {
      setSelectedPerfume(perfume.id);
      toast.success(`${perfume.name} selected`);
    }
  };

  return (
    <motion.div
      className="px-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#E0B23A]" strokeWidth={2} />
          <h3 className="text-xs text-[#E0B23A] font-semibold uppercase tracking-wider">
            Perfume based on your sensing results
          </h3>
        </div>
        <p className="text-[10px] text-neutral-500 italic">
          Select one for free and purchase the other.
        </p>
      </div>

      {/* Perfume Cards */}
      <div className="flex items-center justify-center gap-6">
        {perfumes.map((perfume, idx) => (
          <motion.button
            key={perfume.id}
            onClick={() => handleSelect(perfume)}
            className="relative flex flex-col items-center gap-2 group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 + idx * 0.1, duration: 0.3 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Circle Frame */}
            <div className={`relative w-20 h-20 rounded-full p-1 transition-all ${
              selectedPerfume === perfume.id
                ? "bg-gradient-to-br from-[#E0B23A] via-[#C9A234] to-[#E0B23A]"
                : "bg-gradient-to-br from-neutral-700 to-neutral-800"
            }`}>
              <div className="w-full h-full rounded-full overflow-hidden bg-neutral-900">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Crown or FREE badge */}
              {perfume.isFree ? (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#E0B23A] text-black text-[8px] font-bold px-2 py-0.5 rounded-full">
                  FREE
                </div>
              ) : selectedPerfume !== null && (
                <div className="absolute top-0 right-0 w-5 h-5 rounded-full bg-[#E0B23A] flex items-center justify-center">
                  <Crown className="w-3 h-3 text-black" strokeWidth={2} fill="currentColor" />
                </div>
              )}
            </div>

            {/* Crown logo below */}
            <div className="text-[#E0B23A]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15 8L21 9L16.5 14L18 20L12 17L6 20L7.5 14L3 9L9 8L12 2Z" />
              </svg>
            </div>

            {/* Name */}
            <p className="text-xs text-neutral-300 font-medium">{perfume.name}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}