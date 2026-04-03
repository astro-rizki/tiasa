import React, { useState } from "react";
import { Heart, Check } from "lucide-react";
import { motion } from "framer-motion";

// 50+ YSL fragrances with official names
const yslProducts = [
  { id: "ysl-libre", name: "Libre", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-black-opium", name: "Black Opium", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-mon-paris", name: "Mon Paris", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-y", name: "Y", image: "https://images.unsplash.com/photo-1594035910387-fbed47ff321e?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-la-nuit", name: "La Nuit de L'Homme", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop", family: "Spicy" },
  { id: "ysl-kouros", name: "Kouros", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-cinema", name: "Cinema", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-opium", name: "Opium", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-libre-intense", name: "Libre Intense", image: "https://images.unsplash.com/photo-1580870069867-74c02224e1d5?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-black-opium-intense", name: "Black Opium Intense", image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-yvresse", name: "Yvresse", image: "https://images.unsplash.com/photo-1592428122519-e00c56afdfa3?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-y-edp", name: "Y Eau de Parfum", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-jazz", name: "Jazz", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-libre-edp", name: "Libre EDP", image: "https://images.unsplash.com/photo-1582274528667-1e8a10ded835?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-manifesto", name: "Manifesto", image: "https://images.unsplash.com/photo-1592102726589-89400bc7db85?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-parisienne", name: "Parisienne", image: "https://images.unsplash.com/photo-1591361397361-f0c441a5785c?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-saharienne", name: "Saharienne", image: "https://images.unsplash.com/photo-1615397349754-5db1d5c0b8c5?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-elle", name: "Elle", image: "https://images.unsplash.com/photo-1596704017254-9b121068937e?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-baby-doll", name: "Baby Doll", image: "https://images.unsplash.com/photo-1610016302534-482f7e6f7c2f?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-champagne", name: "Champagne", image: "https://images.unsplash.com/photo-1609265658141-a86f16c83513?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-in-love-again", name: "In Love Again", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-nu", name: "Nu", image: "https://images.unsplash.com/photo-1619194616468-f6a9f50b4d2d?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-paris", name: "Paris", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-rive-gauche", name: "Rive Gauche", image: "https://images.unsplash.com/photo-1610016302534-482f7e6f7c2f?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-cinema-edp", name: "Cinema EDP", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-y-live", name: "Y Live", image: "https://images.unsplash.com/photo-1580870069867-74c02224e1d5?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-l-homme", name: "L'Homme", image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-l-homme-intense", name: "L'Homme Intense", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-l-homme-sport", name: "L'Homme Sport", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-l-homme-ultime", name: "L'Homme Ultime", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-libre-flowers", name: "Libre Flowers & Flames", image: "https://images.unsplash.com/photo-1594035910387-fbed47ff321e?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-mon-paris-intense", name: "Mon Paris Intensément", image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-mon-paris-floral", name: "Mon Paris Floral", image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-black-opium-illicit", name: "Black Opium Illicit", image: "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-black-opium-floral", name: "Black Opium Floral Shock", image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-black-opium-nuit", name: "Black Opium Nuit Blanche", image: "https://images.unsplash.com/photo-1580870069867-74c02224e1d5?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-black-opium-glow", name: "Black Opium Glow", image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-black-opium-extreme", name: "Black Opium Extreme", image: "https://images.unsplash.com/photo-1592428122519-e00c56afdfa3?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-la-nuit-bleu", name: "La Nuit Bleu Électrique", image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=400&h=400&fit=crop", family: "Spicy" },
  { id: "ysl-la-nuit-frozen", name: "La Nuit Frozen Cologne", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-y-edp-intense", name: "Y Eau de Parfum Intense", image: "https://images.unsplash.com/photo-1582274528667-1e8a10ded835?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-y-le-parfum", name: "Y Le Parfum", image: "https://images.unsplash.com/photo-1592102726589-89400bc7db85?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-myslf", name: "MYSLF", image: "https://images.unsplash.com/photo-1591361397361-f0c441a5785c?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-myself-edp", name: "MYSLF EDP", image: "https://images.unsplash.com/photo-1615397349754-5db1d5c0b8c5?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-libre-eau-tendre", name: "Libre Eau de Toilette", image: "https://images.unsplash.com/photo-1596704017254-9b121068937e?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-mon-paris-couture", name: "Mon Paris Couture", image: "https://images.unsplash.com/photo-1610016302534-482f7e6f7c2f?w=400&h=400&fit=crop", family: "Floral" },
  { id: "ysl-opium-pour-homme", name: "Opium Pour Homme", image: "https://images.unsplash.com/photo-1609265658141-a86f16c83513?w=400&h=400&fit=crop", family: "Spicy" },
  { id: "ysl-m7", name: "M7", image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-m7-oud", name: "M7 Oud Absolu", image: "https://images.unsplash.com/photo-1619194616468-f6a9f50b4d2d?w=400&h=400&fit=crop", family: "Oriental" },
  { id: "ysl-body-kouros", name: "Body Kouros", image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-kouros-silver", name: "Kouros Silver", image: "https://images.unsplash.com/photo-1610016302534-482f7e6f7c2f?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-kouros-fraicheur", name: "Kouros Fraîcheur", image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-kouros-summer", name: "Kouros Summer", image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop", family: "Fresh" },
  { id: "ysl-tuxedo", name: "Tuxedo", image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=400&fit=crop", family: "Woody" },
  { id: "ysl-supreme-bouquet", name: "Supreme Bouquet", image: "https://images.unsplash.com/photo-1594035910387-fbed47ff321e?w=400&h=400&fit=crop", family: "Floral" },
];

// Scent family to slider mapping
const familyToSliders = {
  Floral: { base: 45, floral: 85, spice: 20, wood: 30, fresh: 60 },
  Oriental: { base: 80, floral: 40, spice: 75, wood: 65, fresh: 25 },
  Woody: { base: 70, floral: 25, spice: 50, wood: 90, fresh: 35 },
  Spicy: { base: 60, floral: 35, spice: 85, wood: 55, fresh: 40 },
  Fresh: { base: 30, floral: 50, spice: 15, wood: 25, fresh: 90 },
  Gourmand: { base: 75, floral: 45, spice: 60, wood: 40, fresh: 30 },
  Citrus: { base: 25, floral: 40, spice: 10, wood: 20, fresh: 95 },
};

export default function YslGrid({ onSelectionChange, onPerfumeSelect, searchQuery = "" }) {
  const [items, setItems] = useState(
    yslProducts.map(p => ({ ...p, selected: false, liked: false }))
  );

  const toggleLike = (id) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const handlePerfumeClick = (item) => {
    // Update selection state
    const newItems = items.map(i =>
      i.id === item.id ? { ...i, selected: !i.selected } : i
    );
    setItems(newItems);
    onSelectionChange?.(newItems.filter(i => i.selected));
    
    // Trigger slider changes and perfume selection
    const sliderValues = familyToSliders[item.family] || familyToSliders.Floral;
    onPerfumeSelect?.({ ...item, sliderValues });
  };

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.family.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="px-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          YSL Collection
        </h3>
        <span className="text-[9px] text-neutral-600">
          {filteredItems.length} {searchQuery ? "results" : "fragrances"}
        </span>
      </div>
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-sm text-neutral-500">No fragrances found</p>
          <p className="text-[10px] text-neutral-600 mt-1">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
        {filteredItems.map((item, idx) => (
          <motion.div
            key={item.id}
            className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.02, duration: 0.3 }}
            onClick={() => handlePerfumeClick(item)}
          >
            <img
              src={item.image}
              alt={`YSL ${item.name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            
            {/* Product name */}
            <div className="absolute bottom-2 left-2 right-2">
              <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1">
                <p className="text-[10px] text-white font-medium truncate">{item.name}</p>
              </div>
            </div>

            {/* Heart */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleLike(item.id);
              }}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all hover:scale-110"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  item.liked ? "text-red-400 fill-red-400" : "text-white/70"
                }`}
                strokeWidth={1.5}
              />
            </button>

            {/* Check */}
            {item.selected && (
              <motion.div
                className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 20 }}
              >
                <Check className="w-3.5 h-3.5 text-black" strokeWidth={2.5} />
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      )}
    </div>
  );
}