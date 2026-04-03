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
  { id: "orange-blossom", name: "Orange Blossom", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop", category: "Floral" },
  { id: "jasmine-sambac", name: "Jasmine Sambac", image: "https://images.unsplash.com/photo-1595853035070-59a39fe84de9?w=400&h=400&fit=crop", category: "Floral" },
  { id: "tuberose", name: "Tuberose", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop", category: "Floral" },
  { id: "rose-damascena", name: "Rose Damascena", image: "https://images.unsplash.com/photo-1518709594023-6eab9bab7b23?w=400&h=400&fit=crop", category: "Floral" },
  { id: "bulgarian-rose", name: "Bulgarian Rose", image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?w=400&h=400&fit=crop", category: "Floral" },
  { id: "peony", name: "Peony", image: "https://images.unsplash.com/photo-1591887194942-e05be37e1b6e?w=400&h=400&fit=crop", category: "Floral" },
  { id: "lily", name: "Lily", image: "https://images.unsplash.com/photo-1587814213271-7a8863b015aa?w=400&h=400&fit=crop", category: "Floral" },
  { id: "magnolia", name: "Magnolia", image: "https://images.unsplash.com/photo-1524386416438-98b9b2d4b433?w=400&h=400&fit=crop", category: "Floral" },
  { id: "iris", name: "Iris", image: "https://images.unsplash.com/photo-1615359466568-62f1030aa5d4?w=400&h=400&fit=crop", category: "Floral" },
  { id: "ylang-ylang", name: "Ylang-Ylang", image: "https://images.unsplash.com/photo-1594735130508-eb6ac36e5e15?w=400&h=400&fit=crop", category: "Floral" },
  { id: "lavender", name: "Lavender", image: "https://images.unsplash.com/photo-1611416517780-eff3a13b0359?w=400&h=400&fit=crop", category: "Floral" },
  { id: "geranium", name: "Geranium", image: "https://images.unsplash.com/photo-1597848212624-e71a58bc83ab?w=400&h=400&fit=crop", category: "Floral" },

  // Citrus & Fresh
  { id: "bergamot", name: "Bergamot", image: "https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&h=400&fit=crop", category: "Citrus" },
  { id: "lemon-zest", name: "Lemon Zest", image: "https://images.unsplash.com/photo-1590502160462-3a3f149e6184?w=400&h=400&fit=crop", category: "Citrus" },
  { id: "mandarin", name: "Mandarin", image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&h=400&fit=crop", category: "Citrus" },
  { id: "grapefruit", name: "Grapefruit", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop", category: "Citrus" },
  { id: "neroli", name: "Neroli", image: "https://images.unsplash.com/photo-1582735689260-d9a3a05ff1c8?w=400&h=400&fit=crop", category: "Citrus" },
  { id: "green-apple", name: "Green Apple", image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop", category: "Fresh" },
  { id: "pear", name: "Pear", image: "https://images.unsplash.com/photo-1568646921628-ace27c299084?w=400&h=400&fit=crop", category: "Fresh" },
  { id: "blackcurrant", name: "Blackcurrant", image: "https://images.unsplash.com/photo-1592578267889-22df99462d0e?w=400&h=400&fit=crop", category: "Fresh" },
  { id: "pink-pepper", name: "Pink Pepper", image: "https://images.unsplash.com/photo-1609143739778-e6e82c3d9fa8?w=400&h=400&fit=crop", category: "Fresh" },
  { id: "aldehydes", name: "Aldehydes", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop", category: "Fresh" },

  // Green & Aromatic
  { id: "sage", name: "Sage", image: "https://images.unsplash.com/photo-1594735130508-eb6ac36e5e15?w=400&h=400&fit=crop", category: "Green" },
  { id: "basil", name: "Basil", image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?w=400&h=400&fit=crop", category: "Green" },
  { id: "mint", name: "Mint", image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?w=400&h=400&fit=crop", category: "Green" },
  { id: "thyme", name: "Thyme", image: "https://images.unsplash.com/photo-1596040033229-a0b8d1bfeee1?w=400&h=400&fit=crop", category: "Green" },
  { id: "cypress", name: "Cypress", image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop", category: "Green" },
  { id: "violet-leaf", name: "Violet Leaf", image: "https://images.unsplash.com/photo-1615359466568-62f1030aa5d4?w=400&h=400&fit=crop", category: "Green" },
  { id: "fig-leaf", name: "Fig Leaf", image: "https://images.unsplash.com/photo-1568646921628-ace27c299084?w=400&h=400&fit=crop", category: "Green" },
  { id: "rosemary", name: "Rosemary", image: "https://images.unsplash.com/photo-1586281679682-6b1474b29c18?w=400&h=400&fit=crop", category: "Green" },

  // Woody
  { id: "cedarwood", name: "Cedarwood", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop", category: "Woody" },
  { id: "sandalwood", name: "Sandalwood", image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?w=400&h=400&fit=crop", category: "Woody" },
  { id: "vetiver", name: "Vetiver", image: "https://images.unsplash.com/photo-1517191434949-5e90cd67d2b6?w=400&h=400&fit=crop", category: "Woody" },
  { id: "patchouli", name: "Patchouli", image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=400&fit=crop", category: "Woody" },
  { id: "oakwood", name: "Oakwood", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=400&fit=crop", category: "Woody" },
  { id: "guaiac-wood", name: "Guaiac Wood", image: "https://images.unsplash.com/photo-1511497584788-876760111969?w=400&h=400&fit=crop", category: "Woody" },
  { id: "cashmere-wood", name: "Cashmere Wood", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop", category: "Woody" },
  { id: "driftwood", name: "Driftwood", image: "https://images.unsplash.com/photo-1582735689260-d9a3a05ff1c8?w=400&h=400&fit=crop", category: "Woody" },

  // Gourmand
  { id: "vanilla", name: "Vanilla", image: "https://images.unsplash.com/photo-1560180474-e8f4c60c8d4d?w=400&h=400&fit=crop", category: "Gourmand" },
  { id: "tonka-bean", name: "Tonka Bean", image: "https://images.unsplash.com/photo-1610016302534-482f7e6f7c2f?w=400&h=400&fit=crop", category: "Gourmand" },
  { id: "caramel", name: "Caramel", image: "https://images.unsplash.com/photo-1606312619070-d48b4a0a4df5?w=400&h=400&fit=crop", category: "Gourmand" },
  { id: "honey", name: "Honey", image: "https://images.unsplash.com/photo-1587049352846-4a222e784963?w=400&h=400&fit=crop", category: "Gourmand" },
  { id: "praline", name: "Praline", image: "https://images.unsplash.com/photo-1548907040-4baa42d10919?w=400&h=400&fit=crop", category: "Gourmand" },
  { id: "almond", name: "Almond", image: "https://images.unsplash.com/photo-1508747703725-719777637510?w=400&h=400&fit=crop", category: "Gourmand" },
  { id: "coconut", name: "Coconut", image: "https://images.unsplash.com/photo-1604600206039-69f5e88c7bcb?w=400&h=400&fit=crop", category: "Gourmand" },

  // Spicy
  { id: "cardamom", name: "Cardamom", image: "https://images.unsplash.com/photo-1596040033229-a0b8d1bfeee1?w=400&h=400&fit=crop", category: "Spicy" },
  { id: "cinnamon", name: "Cinnamon", image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?w=400&h=400&fit=crop", category: "Spicy" },
  { id: "nutmeg", name: "Nutmeg", image: "https://images.unsplash.com/photo-1610016302534-482f7e6f7c2f?w=400&h=400&fit=crop", category: "Spicy" },
  { id: "clove", name: "Clove", image: "https://images.unsplash.com/photo-1609143739778-e6e82c3d9fa8?w=400&h=400&fit=crop", category: "Spicy" },
  { id: "saffron", name: "Saffron", image: "https://images.unsplash.com/photo-1596040033229-a0b8d1bfeee1?w=400&h=400&fit=crop", category: "Spicy" },

  // Resinous / Deep
  { id: "amber", name: "Amber", image: "https://images.unsplash.com/photo-1603028823412-48e8e0751df5?w=400&h=400&fit=crop", category: "Resinous" },
  { id: "ambergris", name: "Ambergris", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop", category: "Resinous" },
  { id: "incense", name: "Incense", image: "https://images.unsplash.com/photo-1609143739778-e6e82c3d9fa8?w=400&h=400&fit=crop", category: "Resinous" },
  { id: "myrrh", name: "Myrrh", image: "https://images.unsplash.com/photo-1603028823412-48e8e0751df5?w=400&h=400&fit=crop", category: "Resinous" },
  { id: "musk", name: "Musk", image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop", category: "Resinous" },
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