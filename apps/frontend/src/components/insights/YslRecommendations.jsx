import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// YSL product catalog with composition vectors
const yslProductCatalog = [
  {
    product_id: "ysl_001",
    name: "Libre Eau de Parfum",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=200&h=200&fit=crop",
    composition_vector: { bergamot: 30, lavender: 25, orange_blossom: 20, vanilla: 15, musk: 10 },
    longevity_est: 8,
    popularity: 95
  },
  {
    product_id: "ysl_002",
    name: "Mon Paris Eau de Parfum",
    image: "https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=200&h=200&fit=crop",
    composition_vector: { strawberry: 30, pear: 20, jasmine: 25, patchouli: 15, white_musk: 10 },
    longevity_est: 7,
    popularity: 92
  },
  {
    product_id: "ysl_003",
    name: "Y Eau de Parfum",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=200&h=200&fit=crop",
    composition_vector: { bergamot: 25, ginger: 20, sage: 15, geranium: 20, cedarwood: 20 },
    longevity_est: 9,
    popularity: 88
  },
  {
    product_id: "ysl_004",
    name: "Black Opium",
    image: "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=200&h=200&fit=crop",
    composition_vector: { coffee: 30, vanilla: 25, orange_blossom: 20, jasmine: 15, patchouli: 10 },
    longevity_est: 10,
    popularity: 98
  },
  {
    product_id: "ysl_005",
    name: "La Nuit de L'Homme",
    image: "https://images.unsplash.com/photo-1619994230295-39ab8a72c165?w=200&h=200&fit=crop",
    composition_vector: { cardamom: 25, bergamot: 20, cedarwood: 25, lavender: 15, vetiver: 15 },
    longevity_est: 7,
    popularity: 90
  },
  {
    product_id: "ysl_006",
    name: "L'Homme Ultime",
    image: "https://images.unsplash.com/photo-1616516484728-6e25a3b62aa0?w=200&h=200&fit=crop",
    composition_vector: { mint: 30, bergamot: 25, lavender: 20, woody_notes: 15, vetiver: 10 },
    longevity_est: 8,
    popularity: 85
  },
];

// Calculate recommendations based on blend vector
function calculateRecommendations(blendVector, limit = 5) {
  const recommendations = yslProductCatalog.map(product => {
    const similarity = cosineSimilarity(blendVector, product.composition_vector);
    const normalized_longevity = product.longevity_est / 10;
    const normalized_popularity = product.popularity / 100;
    
    const match_score = 0.7 * similarity + 0.2 * normalized_longevity + 0.1 * normalized_popularity;
    
    return {
      ...product,
      match_score: Math.round(match_score * 100)
    };
  });
  
  return recommendations
    .sort((a, b) => b.match_score - a.match_score)
    .slice(0, limit);
}

// Cosine similarity calculation
function cosineSimilarity(vec1, vec2) {
  const allKeys = new Set([...Object.keys(vec1), ...Object.keys(vec2)]);
  let dotProduct = 0;
  let mag1 = 0;
  let mag2 = 0;
  
  allKeys.forEach(key => {
    const v1 = vec1[key] || 0;
    const v2 = vec2[key] || 0;
    dotProduct += v1 * v2;
    mag1 += v1 * v1;
    mag2 += v2 * v2;
  });
  
  if (mag1 === 0 || mag2 === 0) return 0;
  return dotProduct / (Math.sqrt(mag1) * Math.sqrt(mag2));
}

export default function YslRecommendations({ blendVector }) {
  const recommendations = calculateRecommendations(blendVector, 5);
  
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-2">
        <p className="text-[9px] uppercase tracking-wider text-neutral-500">Recommendation</p>
        <ChevronRight className="w-3 h-3 text-neutral-600" strokeWidth={1.5} />
      </div>
      
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {recommendations.map((product, idx) => (
          <motion.div
            key={product.product_id}
            className="flex-shrink-0 w-20"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
          >
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-20 h-20 rounded-xl object-cover bg-neutral-800"
              />
              <div className="absolute top-1 right-1 bg-[#E0B23A] text-black text-[8px] font-bold px-1.5 py-0.5 rounded">
                {product.match_score}%
              </div>
            </div>
            <p className="text-[8px] text-neutral-400 mt-1 line-clamp-2 leading-tight">
              {product.name}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}