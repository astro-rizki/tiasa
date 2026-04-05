import React, { useState } from "react";
import { Heart, Check } from "lucide-react";
import { motion } from "framer-motion";

const yslProducts = [
  // ─── LIBRE COLLECTION ──────────────────────────────────────────────────────
  { id: "ysl-libre",            name: "Libre",                      family: "Floral",   image: "https://www.sephora.com/productimages/sku/s2249746-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-libre-edp",        name: "Libre EDP",                  family: "Floral",   image: "https://www.sephora.com/productimages/sku/s2249746-main-zoom.jpg" }, // ✅ Sephora (sama)
  { id: "ysl-libre-intense",    name: "Libre Intense",              family: "Floral",   image: "https://www.sephora.com/productimages/sku/s2371896-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-libre-flowers",    name: "Libre Flowers & Flames",     family: "Floral",   image: "https://www.sephora.com/productimages/sku/s2799898-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-libre-le-parfum",  name: "Libre Le Parfum",            family: "Floral",   image: "https://www.sephora.com/productimages/sku/s2590966-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-libre-eau-tendre", name: "Libre Eau de Toilette",      family: "Floral",   image: "https://static-ph.zacdn.com/p/yves-saint-laurent-3376-7112492-1.jpg" }, // ✅ Zalora PH
  // ─── BLACK OPIUM COLLECTION ─────────────────────────────────────────────────
  { id: "ysl-black-opium",         name: "Black Opium",                family: "Oriental", image: "https://www.sephora.com/productimages/sku/s1688852-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-black-opium-intense", name: "Black Opium Intense",        family: "Oriental", image: "https://www.sephora.com/productimages/sku/s2639631-main-zoom.jpg" }, // ✅ Sephora (Le Parfum bottle)
  { id: "ysl-black-opium-illicit", name: "Black Opium Illicit",        family: "Oriental", image: "https://www.sephora.com/productimages/sku/s1688852-main-zoom.jpg" }, // ✅ Sephora (BO EDP proxy)
  { id: "ysl-black-opium-floral",  name: "Black Opium Floral Shock",   family: "Oriental", image: "https://img.fragrancex.com/images/products/parent/medium/74515w.jpg" }, // ✅ FragranceX
  { id: "ysl-black-opium-nuit",    name: "Black Opium Nuit Blanche",   family: "Oriental", image: "https://img.fragrancex.com/images/products/parent/medium/73667w.jpg" }, // ✅ FragranceX
  { id: "ysl-black-opium-glow",    name: "Black Opium Glow",           family: "Oriental", image: "https://www.sephora.com/productimages/sku/s1688852-main-zoom.jpg" }, // ✅ Sephora (BO EDP proxy)
  { id: "ysl-black-opium-extreme", name: "Black Opium Extreme",        family: "Oriental", image: "https://img.fragrancex.com/images/products/parent/medium/81609w.jpg" }, // ✅ FragranceX
  { id: "ysl-black-opium-glitter", name: "Black Opium Glitter",        family: "Oriental", image: "https://www.sephora.com/productimages/sku/s2801553-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-black-opium-over-red",name: "Black Opium Over Red",       family: "Oriental", image: "https://www.sephora.com/productimages/sku/s2732675-main-zoom.jpg" }, // ✅ Sephora
  // ─── MON PARIS COLLECTION ───────────────────────────────────────────────────
  { id: "ysl-mon-paris",         name: "Mon Paris",                   family: "Floral",   image: "https://www.sephora.com/productimages/sku/s1838861-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-mon-paris-intense", name: "Mon Paris Intensément",       family: "Floral",   image: "https://www.sephora.com/productimages/sku/s2316032-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-mon-paris-couture", name: "Mon Paris Couture",           family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/76306w.jpg" }, // ✅ FragranceX
  { id: "ysl-mon-paris-floral",  name: "Mon Paris Floral",            family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/78058w.jpg" }, // ✅ FragranceX
  // ─── Y COLLECTION ──────────────────────────────────────────────────────────
  { id: "ysl-y",             name: "Y",                               family: "Woody",    image: "https://www.sephora.com/productimages/sku/s2546216-main-zoom.jpg" }, // ✅ Sephora — Y EDT
  { id: "ysl-y-edp",         name: "Y Eau de Parfum",                 family: "Woody",    image: "https://www.sephora.com/productimages/sku/s2099885-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-y-edp-intense",  name: "Y Eau de Parfum Intense",        family: "Woody",    image: "https://www.sephora.com/productimages/sku/s2645778-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-y-le-parfum",   name: "Y Le Parfum",                     family: "Woody",    image: "https://www.sephora.com/productimages/sku/s2862662-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-y-live",        name: "Y Live",                          family: "Woody",    image: "https://img.fragrancex.com/images/products/parent/medium/78523m.jpg" }, // ✅ FragranceX (Y Live Intense proxy)
  // ─── LA NUIT DE L'HOMME COLLECTION ──────────────────────────────────────────
  { id: "ysl-la-nuit",        name: "La Nuit de L'Homme",            family: "Spicy",    image: "https://www.sephora.com/productimages/sku/s1200716-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-la-nuit-bleu",   name: "La Nuit Bleu Électrique",       family: "Spicy",    image: "https://img.fragrancex.com/images/products/parent/medium/76243m.jpg" }, // ✅ FragranceX
  { id: "ysl-la-nuit-frozen", name: "La Nuit Frozen Cologne",        family: "Fresh",    image: "https://img.fragrancex.com/images/products/parent/medium/69292m.jpg" }, // ✅ FragranceX
  // ─── L'HOMME COLLECTION ─────────────────────────────────────────────────────
  { id: "ysl-l-homme",         name: "L'Homme",                      family: "Woody",    image: "https://www.sephora.com/productimages/sku/s987917-main-zoom.jpg"  }, // ✅ Sephora
  { id: "ysl-l-homme-le-parfum",name: "L'Homme Le Parfum",           family: "Woody",    image: "https://www.sephora.com/productimages/sku/s2353464-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-l-homme-intense", name: "L'Homme Intense",              family: "Woody",    image: "https://img.fragrancex.com/images/products/parent/medium/71420m.jpg" }, // ✅ FragranceX
  { id: "ysl-l-homme-sport",   name: "L'Homme Sport",                family: "Fresh",    image: "https://img.fragrancex.com/images/products/parent/medium/71631m.jpg" }, // ✅ FragranceX
  { id: "ysl-l-homme-ultime",  name: "L'Homme Ultime",               family: "Woody",    image: "https://img.fragrancex.com/images/products/parent/medium/73813m.jpg" }, // ✅ FragranceX
  // ─── MYSLF COLLECTION ───────────────────────────────────────────────────────
  { id: "ysl-myslf",      name: "MYSLF",                             family: "Woody",    image: "https://www.sephora.com/productimages/sku/s2706273-main-zoom.jpg" }, // ✅ Sephora
  { id: "ysl-myslf-le-parfum", name: "MYSLF Le Parfum",             family: "Woody",    image: "https://www.sephora.com/productimages/sku/s2799930-main-zoom.jpg" }, // ✅ Sephora
  // ─── KOUROS COLLECTION ──────────────────────────────────────────────────────
  { id: "ysl-kouros",           name: "Kouros",                      family: "Woody",    image: "https://static-id.zacdn.com/p/yves-saint-laurent-3260-8421032-1.jpg" }, // ✅ Zalora ID
  { id: "ysl-kouros-silver",    name: "Kouros Silver",               family: "Fresh",    image: "https://img.perfume.com/images/products/parent/medium/72176m.jpg" }, // ✅ Perfume.com CDN
  { id: "ysl-kouros-fraicheur", name: "Kouros Fraîcheur",            family: "Fresh",    image: null }, // ❌ Discontinued, tidak ditemukan
  { id: "ysl-kouros-summer",    name: "Kouros Summer",               family: "Fresh",    image: "https://img.fragrancex.com/images/products/parent/medium/60884m.jpg" }, // ✅ FragranceX
  { id: "ysl-body-kouros",      name: "Body Kouros",                 family: "Fresh",    image: "https://img.fragrancex.com/images/products/parent/medium/777m.jpg" }, // ✅ FragranceX
  // ─── OPIUM COLLECTION ───────────────────────────────────────────────────────
  { id: "ysl-opium",           name: "Opium",                        family: "Oriental", image: "https://www.sephora.com/productimages/sku/s7757-main-zoom.jpg" }, // ✅ Sephora CA
  { id: "ysl-opium-pour-homme",name: "Opium Pour Homme",             family: "Spicy",    image: "https://img.fragrancex.com/images/products/parent/medium/1011m.jpg" }, // ✅ FragranceX
  // ─── CLASSIC / VINTAGE ──────────────────────────────────────────────────────
  { id: "ysl-paris",       name: "Paris",                            family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/1036w.jpg" }, // ✅ FragranceX
  { id: "ysl-yvresse",     name: "Yvresse",                          family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/1381w.jpg" }, // ✅ FragranceX
  { id: "ysl-champagne",   name: "Champagne",                        family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/1381w.jpg" }, // ✅ FragranceX (= Yvresse)
  { id: "ysl-cinema",      name: "Cinema",                           family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/60466w.jpg" }, // ✅ FragranceX
  { id: "ysl-cinema-edp",  name: "Cinema EDP",                       family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/60466w.jpg" }, // ✅ FragranceX (sama)
  { id: "ysl-jazz",        name: "Jazz",                             family: "Fresh",    image: "https://img.fragrancex.com/images/products/parent/medium/561m.jpg"  }, // ✅ FragranceX
  { id: "ysl-manifesto",   name: "Manifesto",                        family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/69752w.jpg" }, // ✅ FragranceX
  { id: "ysl-parisienne",  name: "Parisienne",                       family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/65593w.jpg" }, // ✅ FragranceX
  { id: "ysl-saharienne",  name: "Saharienne",                       family: "Fresh",    image: "https://img.fragrancex.com/images/products/parent/medium/69273w.jpg" }, // ✅ FragranceX
  { id: "ysl-elle",        name: "Elle",                             family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/65733w.jpg" }, // ✅ FragranceX
  { id: "ysl-baby-doll",   name: "Baby Doll",                        family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/716w.jpg"  }, // ✅ FragranceX
  { id: "ysl-in-love-again",name: "In Love Again",                   family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/48722w.jpg" }, // ✅ FragranceX
  { id: "ysl-nu",          name: "Nu",                               family: "Fresh",    image: "https://img.fragrancex.com/images/products/parent/medium/993w.jpg"  }, // ✅ FragranceX
  { id: "ysl-rive-gauche",  name: "Rive Gauche",                     family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/1110w.jpg" }, // ✅ FragranceX
  // ─── M7 COLLECTION ──────────────────────────────────────────────────────────
  { id: "ysl-m7",     name: "M7",                                    family: "Woody",    image: "https://img.fragrancex.com/images/products/parent/medium/905m.jpg"  }, // ✅ FragranceX
  { id: "ysl-m7-oud", name: "M7 Oud Absolu",                         family: "Oriental", image: "https://img.fragrancex.com/images/products/parent/medium/70026m.jpg" }, // ✅ FragranceX
  // ─── LE VESTIAIRE DES PARFUMS ───────────────────────────────────────────────
  { id: "ysl-tuxedo",          name: "Tuxedo",                       family: "Woody",    image: "https://img.fragrancex.com/images/products/parent/medium/78733w.jpg" }, // ✅ FragranceX (Tuxedo Épices Patchouli)
  { id: "ysl-supreme-bouquet", name: "Supreme Bouquet",              family: "Floral",   image: "https://img.fragrancex.com/images/products/parent/medium/79036w.jpg" }, // ✅ FragranceX
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