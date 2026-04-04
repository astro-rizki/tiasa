import React, { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus } from "lucide-react";

// Category mapping to mixer values (Oriental, Floral, Animaly, Woody, Fresh)
const categoryToMixer = {
  Floral: { oriental: 20, floral: 95, animaly: 10, woody: 15, fresh: 60 },
  Citrus: { oriental: 15, floral: 30, animaly: 5, woody: 10, fresh: 95 },
  Fresh: { oriental: 25, floral: 40, animaly: 15, woody: 20, fresh: 90 },
  Green: { oriental: 30, floral: 35, animaly: 20, woody: 40, fresh: 85 },
  Woody: { oriental: 75, floral: 20, animaly: 45, woody: 95, fresh: 30 },
  Gourmand: { oriental: 80, floral: 30, animaly: 50, woody: 35, fresh: 25 },
  Spicy: { oriental: 65, floral: 25, animaly: 95, woody: 50, fresh: 35 },
  Resinous: { oriental: 90, floral: 15, animaly: 60, woody: 70, fresh: 20 },
};

// Note type mapping
const noteTypes = {
  // Top Notes (0-15 min)
  "bergamot": "Top", "lemon-zest": "Top", "mandarin": "Top", "grapefruit": "Top", "neroli": "Top",
  "green-apple": "Top", "pear": "Top", "blackcurrant": "Top", "pink-pepper": "Top", "aldehydes": "Top",
  "mint": "Top", "basil": "Top",
  
  // Heart Notes (15-60 min)
  "orange-blossom": "Heart", "jasmine-sambac": "Heart", "tuberose": "Heart", "rose-damascena": "Heart",
  "bulgarian-rose": "Heart", "peony": "Heart", "lily": "Heart", "magnolia": "Heart", "iris": "Heart",
  "ylang-ylang": "Heart", "lavender": "Heart", "geranium": "Heart", "sage": "Heart", "thyme": "Heart",
  "cypress": "Heart", "violet-leaf": "Heart", "fig-leaf": "Heart", "rosemary": "Heart",
  "cardamom": "Heart", "cinnamon": "Heart", "nutmeg": "Heart", "clove": "Heart", "saffron": "Heart",
  
  // Base Notes (60+ min)
  "cedarwood": "Base", "sandalwood": "Base", "vetiver": "Base", "patchouli": "Base", "oakwood": "Base",
  "guaiac-wood": "Base", "cashmere-wood": "Base", "driftwood": "Base",
  "vanilla": "Base", "tonka-bean": "Base", "caramel": "Base", "honey": "Base", "praline": "Base",
  "almond": "Base", "coconut": "Base",
  "amber": "Base", "ambergris": "Base", "incense": "Base", "myrrh": "Base", "musk": "Base",
};

const noteColors = {
  "Top": "#7EC8B0",
  "Heart": "#E8A0BF",
  "Base": "#D4AF37"
};

// 55 Aroma notes with images
const aromaLibrary = [
  // Floral
  { id: "orange-blossom", name: "Orange Blossom", image: "/images/blend/orange-blossom.jpg", category: "Floral" },
  { id: "jasmine-sambac", name: "Jasmine Sambac", image: "/images/blend/jasmine-sambac.jpg", category: "Floral" },
  { id: "tuberose", name: "Tuberose", image: "/images/blend/tuberose.jpg", category: "Floral" },
  { id: "rose-damascena", name: "Rose Damascena", image: "/images/blend/rose-damascena.jpg", category: "Floral" },
  { id: "bulgarian-rose", name: "Bulgarian Rose", image: "/images/blend/bulgarian-rose.jpg", category: "Floral" },
  { id: "peony", name: "Peony", image: "/images/blend/peony.jpg", category: "Floral" },
  { id: "lily", name: "Lily", image: "/images/blend/lily.jpg", category: "Floral" },
  { id: "magnolia", name: "Magnolia", image: "/images/blend/magnolia.jpg", category: "Floral" },
  { id: "iris", name: "Iris", image: "/images/blend/iris.jpg", category: "Floral" },
  { id: "ylang-ylang", name: "Ylang-Ylang", image: "/images/blend/ylang-ylang.jpg", category: "Floral" },
  { id: "lavender", name: "Lavender", image: "/images/blend/lavender.jpg", category: "Floral" },
  { id: "geranium", name: "Geranium", image: "/images/blend/geranium.jpg", category: "Floral" },

  // Citrus & Fresh
  { id: "bergamot", name: "Bergamot", image: "/images/blend/bergamot.jpg", category: "Fruity" },
  { id: "lemon-zest", name: "Lemon Zest", image: "/images/blend/lemon-zest.jpg", category: "Fruity" },
  { id: "mandarin", name: "Mandarin", image: "/images/blend/mandarin.jpg", category: "Fruity" },
  { id: "grapefruit", name: "Grapefruit", image: "/images/blend/grapefruit.jpg", category: "Fruity" },
  { id: "neroli", name: "Neroli", image: "/images/blend/neroli.jpg", category: "Fruity" },
  { id: "green-apple", name: "Green Apple", image: "/images/blend/green-apple.jpg", category: "Fruity" },
  { id: "pear", name: "Pear", image: "/images/blend/pear.jpg", category: "Fruity" },
  { id: "blackcurrant", name: "Blackcurrant", image: "/images/blend/blackcurrant.jpg", category: "Fruity" },
  { id: "pink-pepper", name: "Pink Pepper", image: "/images/blend/pink-pepper.jpg", category: "Fruity" },

  // Green & Aromatic
  { id: "sage", name: "Sage", image: "/images/blend/sage.jpg", category: "Green" },
  { id: "basil", name: "Basil", image: "/images/blend/basil.jpg", category: "Green" },
  { id: "mint", name: "Mint", image: "/images/blend/mint.jpg", category: "Green" },
  { id: "thyme", name: "Thyme", image: "/images/blend/thyme.jpg", category: "Green" },
  { id: "cypress", name: "Cypress", image: "/images/blend/cypress.jpg", category: "Green" },
  { id: "violet-leaf", name: "Violet Leaf", image: "/images/blend/violet-leaf.jpg", category: "Green" },
  { id: "fig-leaf", name: "Fig Leaf", image: "/images/blend/fig-leaf.jpg", category: "Green" },
  { id: "rosemary", name: "Rosemary", image: "/images/blend/rosemary.jpg", category: "Green" },

  // Woody
  { id: "cedarwood", name: "Cedarwood", image: "/images/blend/cedarwood.jpg", category: "Woody" },
  { id: "sandalwood", name: "Sandalwood", image: "/images/blend/sandalwood.jpg", category: "Woody" },
  { id: "vetiver", name: "Vetiver", image: "/images/blend/vetiver.jpg", category: "Woody" },
  { id: "patchouli", name: "Patchouli", image: "/images/blend/patchouli.jpg", category: "Woody" },
  { id: "oakwood", name: "Oakwood", image: "/images/blend/oakwood.jpg", category: "Woody" },
  { id: "guaiac-wood", name: "Guaiac Wood", image: "/images/blend/guaiac-wood.jpg", category: "Woody" },
  { id: "cashmere-wood", name: "Cashmere Wood", image: "/images/blend/cashmere-wood.jpg", category: "Woody" },
  { id: "driftwood", name: "Driftwood", image: "/images/blend/driftwood.jpg", category: "Woody" },

  // Gourmand
  { id: "vanilla", name: "Vanilla", image: "/images/blend/vanilla.jpg", category: "Gourmand" },
  { id: "tonka-bean", name: "Tonka Bean", image: "/images/blend/tonka-bean.jpg", category: "Gourmand" },
  { id: "caramel", name: "Caramel", image: "/images/blend/caramel.jpg", category: "Gourmand" },
  { id: "honey", name: "Honey", image: "/images/blend/honey.jpg", category: "Gourmand" },
  { id: "praline", name: "Praline", image: "/images/blend/praline.jpg", category: "Gourmand" },
  { id: "almond", name: "Almond", image: "/images/blend/almond.jpg", category: "Gourmand" },
  { id: "coconut", name: "Coconut", image: "/images/blend/coconut.jpg", category: "Gourmand" },

  // Spicy
  { id: "cardamom", name: "Cardamom", image: "/images/blend/cardamom.jpg", category: "Spicy" },
  { id: "cinnamon", name: "Cinnamon", image: "/images/blend/cinnamon.jpg", category: "Spicy" },
  { id: "nutmeg", name: "Nutmeg", image: "/images/blend/nutmeg.jpg", category: "Spicy" },
  { id: "clove", name: "Clove", image: "/images/blend/clove.jpg", category: "Spicy" },
  { id: "saffron", name: "Saffron", image: "/images/blend/saffron.jpg", category: "Spicy" },

  // Resinous / Deep
  { id: "amber", name: "Amber", image: "/images/blend/amber.jpg", category: "Resinous" },
  { id: "ambergris", name: "Ambergris", image: "/images/blend/ambergris.jpg", category: "Resinous" },
  { id: "incense", name: "Incense", image: "/images/blend/incense.jpg", category: "Resinous" },
  { id: "myrrh", name: "Myrrh", image: "/images/blend/myrrh.jpg", category: "Resinous" },
  { id: "musk", name: "Musk", image: "/images/blend/musk.jpg", category: "Resinous" },
];

export default function AromaLibrary({ onAromaChange, onMixerUpdate, searchQuery = "", isHeating = false }) {
  const [aromas, setAromas] = useState(
    aromaLibrary.map(a => ({ ...a, percentage: 0 }))
  );

  const updatePercentage = (id, delta) => {
    setAromas(prev => {
      const newAromas = prev.map(aroma => {
        if (aroma.id === id) {
          const newPercentage = Math.max(0, Math.min(100, aroma.percentage + delta));
          return { ...aroma, percentage: newPercentage };
        }
        return aroma;
      });
      
      // Calculate weighted mixer values
      const activeAromas = newAromas.filter(a => a.percentage > 0);
      if (activeAromas.length > 0) {
        const totalPercentage = activeAromas.reduce((sum, a) => sum + a.percentage, 0);
        const mixerValues = { oriental: 0, floral: 0, animaly: 0, woody: 0, fresh: 0 };
        
        activeAromas.forEach(aroma => {
          const weight = aroma.percentage / totalPercentage;
          const categoryMixer = categoryToMixer[aroma.category] || categoryToMixer.Floral;
          mixerValues.oriental += categoryMixer.oriental * weight;
          mixerValues.floral += categoryMixer.floral * weight;
          mixerValues.animaly += categoryMixer.animaly * weight;
          mixerValues.woody += categoryMixer.woody * weight;
          mixerValues.fresh += categoryMixer.fresh * weight;
        });
        
        // Round values
        Object.keys(mixerValues).forEach(key => {
          mixerValues[key] = Math.round(mixerValues[key]);
        });
        
        onMixerUpdate?.(mixerValues);
      }
      
      onAromaChange?.(activeAromas);
      return newAromas;
    });
  };

  const filteredAromas = aromas.filter(aroma =>
    aroma.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    aroma.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          Scent Library
        </h3>
        <span className="text-[9px] text-neutral-600">
          {filteredAromas.filter(a => a.percentage > 0).length} / {filteredAromas.length}
        </span>
      </div>
      
      {filteredAromas.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-neutral-500">No aromas found</p>
          <p className="text-[10px] text-neutral-600 mt-1">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {filteredAromas.map((aroma, idx) => {
            const noteType = noteTypes[aroma.id] || "Heart";
            const noteColor = noteColors[noteType];
            const isActive = aroma.percentage > 0;
            
            return (
              <motion.div
                key={aroma.id}
                className="relative aspect-square rounded-2xl overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02, duration: 0.3 }}
              >
                {/* Image */}
                <img
                  src={aroma.image}
                  alt={aroma.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                
                {/* Heating Animation Pulse */}
                {isHeating && isActive && (
                  <motion.div
                    className="absolute inset-0 border-2 rounded-2xl pointer-events-none"
                    style={{ borderColor: "#D4AF37" }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}

                {/* Note Type Tag */}
                <div className="absolute top-2 left-2">
                  <div 
                    className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider"
                    style={{ 
                      backgroundColor: `${noteColor}30`,
                      color: noteColor,
                      border: `1px solid ${noteColor}60`
                    }}
                  >
                    {noteType}
                  </div>
                </div>

                {/* Heater Icon */}
                {isActive && (
                  <motion.div
                    className="absolute top-2 right-2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  >
                    <div 
                      className="w-6 h-6 rounded-lg backdrop-blur-sm flex items-center justify-center"
                      style={{ 
                        backgroundColor: isHeating ? "#D4AF3740" : "#00000040",
                        border: `1px solid ${isHeating ? "#D4AF37" : "#ffffff40"}`
                      }}
                    >
                      <motion.div
                        animate={isHeating ? {
                          opacity: [0.5, 1, 0.5],
                        } : {}}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <span className="text-xs">{isHeating ? "🔥" : "⚡"}</span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
                
                {/* Name */}
                <div className="absolute bottom-10 left-2 right-2">
                  <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                    <p className="text-[10px] text-white font-medium truncate">{aroma.name}</p>
                  </div>
                </div>

                {/* Percentage Controls */}
                <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between gap-2">
                  <button
                    onClick={() => updatePercentage(aroma.id, -10)}
                    disabled={aroma.percentage === 0}
                    className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors disabled:opacity-30"
                  >
                    <Minus className="w-3 h-3 text-white" strokeWidth={2} />
                  </button>

                  <div className="flex-1 text-center bg-black/60 backdrop-blur-sm rounded-lg py-1">
                    <span className="font-mono text-xs font-bold text-[#D4AF37]">
                      {aroma.percentage}%
                    </span>
                  </div>

                  <button
                    onClick={() => updatePercentage(aroma.id, 10)}
                    disabled={aroma.percentage === 30}
                    className="w-7 h-7 rounded-lg bg-black/60 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors disabled:opacity-30"
                  >
                    <Plus className="w-3 h-3 text-white" strokeWidth={2} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}