import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// YSL product catalog with composition vectors
const yslProductCatalog = [
  // --- citrus / fresh / mint cluster ---
  {
    product_id: "ysl_007",
    name: "MYSLF",
    image: "https://www.sephora.com/productimages/sku/s2706273-main-zoom.jpg",
    composition_vector: { bergamot: 30, mandarin: 25, orange_blossom: 20, ambergris: 15, cedarwood: 10 },
    longevity_est: 8,
    popularity: 91
  },
  {
    product_id: "ysl_008",
    name: "L'Homme Sport",
    image: "https://img.fragrancex.com/images/products/parent/medium/71631m.jpg",
    composition_vector: { bergamot: 35, mint: 25, green_tea: 15, vetiver: 15, cedar: 10 },
    longevity_est: 6,
    popularity: 80
  },
  {
    product_id: "ysl_009",
    name: "Y Live",
    image: "https://img.fragrancex.com/images/products/parent/medium/78523m.jpg",
    composition_vector: { mint: 25, eucalyptus: 25, bergamot: 20, vetiver: 20, cedarwood: 10 },
    longevity_est: 7,
    popularity: 82
  },
  {
    product_id: "ysl_003",
    name: "Y Eau de Parfum",
    image: "https://www.sephora.com/productimages/sku/s2099885-main-zoom.jpg",
    composition_vector: { bergamot: 25, ginger: 20, sage: 15, geranium: 20, cedarwood: 20 },
    longevity_est: 9,
    popularity: 88
  },
  {
    product_id: "ysl_006",
    name: "L'Homme Ultime",
    image: "https://img.fragrancex.com/images/products/parent/medium/73813m.jpg",
    composition_vector: { mint: 30, bergamot: 25, lavender: 20, woody_notes: 15, vetiver: 10 },
    longevity_est: 8,
    popularity: 85
  },
  // --- woody / cedar / serene cluster ---
  {
    product_id: "ysl_010",
    name: "L'Homme Le Parfum",
    image: "https://www.sephora.com/productimages/sku/s2353464-main-zoom.jpg",
    composition_vector: { sandalwood: 35, cedarwood: 30, lavender: 15, bergamot: 10, vanilla: 10 },
    longevity_est: 9,
    popularity: 87
  },
  {
    product_id: "ysl_011",
    name: "Y Le Parfum",
    image: "https://www.sephora.com/productimages/sku/s2862662-main-zoom.jpg",
    composition_vector: { cedarwood: 35, sandalwood: 25, vetiver: 20, lavender: 10, bergamot: 10 },
    longevity_est: 10,
    popularity: 89
  },
  {
    product_id: "ysl_012",
    name: "L'Homme",
    image: "https://www.sephora.com/productimages/sku/s987917-main-zoom.jpg",
    composition_vector: { bergamot: 20, ginger: 15, pepper: 10, cedarwood: 35, vetiver: 20 },
    longevity_est: 7,
    popularity: 86
  },
  {
    product_id: "ysl_005",
    name: "La Nuit de L'Homme",
    image: "https://www.sephora.com/productimages/sku/s1200716-main-zoom.jpg",
    composition_vector: { cardamom: 25, bergamot: 20, cedarwood: 25, lavender: 15, vetiver: 15 },
    longevity_est: 7,
    popularity: 90
  },
  // --- floral / oriental / midnight cluster ---
  {
    product_id: "ysl_013",
    name: "Opium",
    image: "https://www.sephora.com/productimages/sku/s7757-main-zoom.jpg",
    composition_vector: { jasmine: 30, patchouli: 30, amber: 20, vanilla: 10, musk: 10 },
    longevity_est: 10,
    popularity: 88
  },
  {
    product_id: "ysl_014",
    name: "Libre Intense",
    image: "https://www.sephora.com/productimages/sku/s2371896-main-zoom.jpg",
    composition_vector: { jasmine: 35, lavender: 15, vanilla: 20, amber: 20, musk: 10 },
    longevity_est: 9,
    popularity: 90
  },
  {
    product_id: "ysl_015",
    name: "Mon Paris Intensément",
    image: "https://www.sephora.com/productimages/sku/s2316032-main-zoom.jpg",
    composition_vector: { strawberry: 20, jasmine: 30, patchouli: 25, amber: 15, musk: 10 },
    longevity_est: 8,
    popularity: 87
  },
  {
    product_id: "ysl_004",
    name: "Black Opium",
    image: "https://www.sephora.com/productimages/sku/s1688852-main-zoom.jpg",
    composition_vector: { coffee: 30, vanilla: 25, orange_blossom: 20, jasmine: 15, patchouli: 10 },
    longevity_est: 10,
    popularity: 98
  },
  {
    product_id: "ysl_002",
    name: "Mon Paris Eau de Parfum",
    image: "https://www.sephora.com/productimages/sku/s1838861-main-zoom.jpg",
    composition_vector: { strawberry: 30, pear: 20, jasmine: 25, patchouli: 15, white_musk: 10 },
    longevity_est: 7,
    popularity: 92
  },
  // --- fresh woods cluster ---
  {
    product_id: "ysl_016",
    name: "La Nuit Frozen",
    image: "https://img.fragrancex.com/images/products/parent/medium/69292m.jpg",
    composition_vector: { mint: 25, eucalyptus: 30, pine: 20, vetiver: 15, cedarwood: 10 },
    longevity_est: 6,
    popularity: 78
  },
  {
    product_id: "ysl_017",
    name: "Kouros",
    image: "https://static-id.zacdn.com/p/yves-saint-laurent-3260-8421032-1.jpg",
    composition_vector: { pine: 25, lavender: 20, vetiver: 25, civet: 15, oakmoss: 15 },
    longevity_est: 9,
    popularity: 83
  },
  {
    product_id: "ysl_001",
    name: "Libre Eau de Parfum",
    image: "https://www.sephora.com/productimages/sku/s2249746-main-zoom.jpg",
    composition_vector: { bergamot: 30, lavender: 25, orange_blossom: 20, vanilla: 15, musk: 10 },
    longevity_est: 8,
    popularity: 95
  },
  // --- warm spice / oriental cluster ---
  {
    product_id: "ysl_018",
    name: "Black Opium Intense",
    image: "https://www.sephora.com/productimages/sku/s2639631-main-zoom.jpg",
    composition_vector: { coffee: 15, vanilla: 30, cinnamon: 25, amber: 20, cardamom: 10 },
    longevity_est: 10,
    popularity: 93
  },
  {
    product_id: "ysl_019",
    name: "M7 Oud Absolu",
    image: "https://img.fragrancex.com/images/products/parent/medium/70026m.jpg",
    composition_vector: { oud: 25, amber: 25, cardamom: 25, sandalwood: 15, vanilla: 10 },
    longevity_est: 10,
    popularity: 84
  },
  {
    product_id: "ysl_020",
    name: "Black Opium Over Red",
    image: "https://www.sephora.com/productimages/sku/s2732675-main-zoom.jpg",
    composition_vector: { coffee: 20, rose: 15, vanilla: 30, amber: 25, cinnamon: 10 },
    longevity_est: 9,
    popularity: 88
  },
];

// Curated 5 unique products per blend_id
const BLEND_PICKS = {
  citrus_mint:    ["ysl_007", "ysl_008", "ysl_009", "ysl_003", "ysl_006"],
  serene_cedar:   ["ysl_010", "ysl_011", "ysl_012", "ysl_005", "ysl_001"],
  midnight_orchid:["ysl_013", "ysl_014", "ysl_015", "ysl_004", "ysl_002"],
  fresh_woods:    ["ysl_016", "ysl_017", "ysl_009", "ysl_012", "ysl_003"],
  warm_spice:     ["ysl_018", "ysl_019", "ysl_020", "ysl_004", "ysl_013"],
};

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

export default function YslRecommendations({ blendVector, blendId }) {
  const pool = BLEND_PICKS[blendId]
    ? yslProductCatalog.filter(p => BLEND_PICKS[blendId].includes(p.product_id))
    : yslProductCatalog;

  const recommendations = pool.map(product => {
    const similarity = cosineSimilarity(blendVector, product.composition_vector);
    const match_score = 0.7 * similarity + 0.2 * product.longevity_est / 10 + 0.1 * product.popularity / 100;
    return { ...product, match_score: Math.round(match_score * 100) };
  }).sort((a, b) => b.match_score - a.match_score);
  
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