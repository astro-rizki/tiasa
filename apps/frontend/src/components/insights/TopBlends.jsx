import React from "react";
import { motion } from "framer-motion";
import { BookmarkPlus, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import YslRecommendations from "./YslRecommendations";
import { toast } from "sonner";

const blends = [
  {
    blend_id: "citrus_mint",
    name: "Citrus-Mint",
    mood: "Focus & Energy",
    longevity: 92,
    projection: 78,
    match: 95,
    blend_vector: { bergamot: 30, mandarin: 10, mint: 25, green_apple: 5, vetiver: 5 }
  },
  {
    blend_id: "serene_cedar",
    name: "Serene Cedar",
    mood: "Calm & Rest",
    longevity: 88,
    projection: 65,
    match: 89,
    blend_vector: { cedarwood: 35, sandalwood: 20, lavender: 15, bergamot: 10, vanilla: 10 }
  },
  {
    blend_id: "midnight_orchid",
    name: "Midnight Orchid",
    mood: "Deep Relaxation",
    longevity: 85,
    projection: 72,
    match: 82,
    blend_vector: { orchid: 30, jasmine: 25, patchouli: 20, amber: 15, musk: 10 }
  },
  {
    blend_id: "fresh_woods",
    name: "Fresh Woods",
    mood: "Vitality",
    longevity: 90,
    projection: 80,
    match: 88,
    blend_vector: { pine: 25, eucalyptus: 20, mint: 15, cedarwood: 25, vetiver: 15 }
  },
  {
    blend_id: "warm_spice",
    name: "Warm Spice",
    mood: "Comfort & Warmth",
    longevity: 94,
    projection: 75,
    match: 91,
    blend_vector: { cinnamon: 30, cardamom: 20, vanilla: 25, amber: 15, sandalwood: 10 }
  },
];

export default function TopBlends() {
  const navigate = useNavigate();

  const handleUseBlend = (blend) => {
    toast.success("Blend dimuat ke tab Blend");
    setTimeout(() => {
      navigate(createPageUrl("Blend"));
    }, 500);
  };

  const handleSave = (blend) => {
    toast.success("Disimpan ke Playlist");
  };

  const handleShare = (blend) => {
    toast.success("Link dibagikan");
  };

  return (
    <motion.div
      className="px-6 pb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7, duration: 0.5 }}
    >
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">
        Top Performing Blends
      </h3>
      <div className="space-y-3">
        {blends.map((blend, i) => (
          <div key={blend.blend_id} className="glass-card rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-white">{blend.name}</p>
                <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{blend.mood}</p>
              </div>
              <span className="font-mono-data text-xs text-[#E0B23A] font-bold">
                #{i + 1}
              </span>
            </div>

            {/* Metrics */}
            <div className="space-y-2 mb-3">
              {[
                { label: "Longevity", value: blend.longevity, color: "#E0B23A" },
                { label: "Projection", value: blend.projection, color: "#C9A234" },
                { label: "Mood Match", value: blend.match, color: "#4FD1C5" },
              ].map((metric, idx) => (
                <div key={metric.label} className="flex items-center gap-3">
                  <span className="text-[9px] text-neutral-500 w-20 uppercase tracking-wider">
                    {metric.label}
                  </span>
                  <div className="flex-1 h-2 bg-neutral-900/60 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        backgroundColor: metric.color,
                      }}
                      initial={{ width: "0%" }}
                      animate={{ width: `${metric.value}%` }}
                      transition={{ duration: 0.54, delay: 0.8 + i * 0.1 + idx * 0.05, ease: "easeOut" }}
                    />
                  </div>
                  <span className="font-mono-data text-[10px] text-white w-10 text-right font-semibold">
                    {metric.value}%
                  </span>
                </div>
              ))}
            </div>

            {/* YSL Recommendations */}
            <YslRecommendations blendVector={blend.blend_vector} blendId={blend.blend_id} />

            {/* Actions */}
            <div className="flex items-center gap-2 mt-4">
              <button
                onClick={() => handleUseBlend(blend)}
                className="flex-1 py-2 rounded-lg bg-[#E0B23A] text-black text-[10px] font-bold uppercase tracking-wider hover:bg-[#C9A234] transition-colors"
              >
                Use Blend
              </button>
              <button
                onClick={() => handleSave(blend)}
                className="w-9 h-9 rounded-lg border border-neutral-700 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Save to playlist"
              >
                <BookmarkPlus className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => handleShare(blend)}
                className="w-9 h-9 rounded-lg border border-neutral-700 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Share blend"
              >
                <Share2 className="w-3.5 h-3.5 text-neutral-400" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}