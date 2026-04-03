import React, { useState } from "react";
import { Heart, Check, Plus } from "lucide-react";
import { motion } from "framer-motion";

const inspirations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    selected: true,
    liked: false,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=400&h=400&fit=crop",
    selected: true,
    liked: false,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?w=400&h=400&fit=crop",
    selected: false,
    liked: false,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1594035910387-fbed47ff321e?w=400&h=400&fit=crop",
    selected: false,
    liked: false,
  },
];

export default function InspirationGrid() {
  const [items, setItems] = useState(inspirations);

  const toggleLike = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, liked: !item.liked } : item
      )
    );
  };

  const toggleSelect = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <motion.div
      className="px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">
        Inspiration
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square rounded-2xl overflow-hidden group"
          >
            <img
              src={item.image}
              alt="Fragrance inspiration"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Heart button */}
            <button
              onClick={() => toggleLike(item.id)}
              className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all"
            >
              <Heart
                className={`w-3.5 h-3.5 transition-colors ${
                  item.liked ? "text-red-400 fill-red-400" : "text-white/70"
                }`}
                strokeWidth={1.5}
              />
            </button>

            {/* Select button */}
            <button
              onClick={() => toggleSelect(item.id)}
              className={`absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                item.selected
                  ? "bg-[#D4AF37] text-black"
                  : "bg-black/40 backdrop-blur-sm text-white/70"
              }`}
            >
              {item.selected ? (
                <Check className="w-3.5 h-3.5" strokeWidth={2} />
              ) : (
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              )}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}