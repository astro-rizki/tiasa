import React from "react";
import { motion } from "framer-motion";
import { Play, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";

const historyData = [
  {
    blend_id: "blend_001",
    title: "Fresh Citrus Morning",
    timestamp: "JUST NOW",
    cover: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=400&h=300&fit=crop",
    scent_count: 12,
    heating_s: 2.1,
    mixing_s: 1.8,
    radar: { oriental: 0.8, floral: 0.2, animaly: 0.9, woody: 0.95, fresh: 0.1 }
  },
  {
    blend_id: "blend_002",
    title: "Warm Woody Evening",
    timestamp: "12H AGO",
    cover: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop",
    scent_count: 8,
    heating_s: 2.1,
    mixing_s: 1.8,
    radar: { oriental: 0.1, floral: 0.5, animaly: 0.0, woody: 0.2, fresh: 0.9 }
  }
];

function RadarChart({ data }) {
  const points = ["oriental", "floral", "animaly", "woody", "fresh"];
  const size = 80;
  const center = size / 2;
  const radius = 30;

  const angleStep = (Math.PI * 2) / 5;
  const coords = points.map((key, i) => {
    const angle = angleStep * i - Math.PI / 2;
    const value = data[key] || 0;
    return {
      x: center + Math.cos(angle) * radius * value,
      y: center + Math.sin(angle) * radius * value
    };
  });

  const pathD = coords.map((c, i) => `${i === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ') + ' Z';

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Background grid */}
      {[0.25, 0.5, 0.75, 1].map((scale, i) => {
        const gridCoords = points.map((_, j) => {
          const angle = angleStep * j - Math.PI / 2;
          return {
            x: center + Math.cos(angle) * radius * scale,
            y: center + Math.sin(angle) * radius * scale
          };
        });
        const gridPath = gridCoords.map((c, j) => `${j === 0 ? 'M' : 'L'} ${c.x} ${c.y}`).join(' ') + ' Z';
        return (
          <path
            key={i}
            d={gridPath}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        );
      })}

      {/* Data polygon */}
      <motion.path
        d={pathD}
        fill="rgba(224,178,58,0.2)"
        stroke="#E0B23A"
        strokeWidth="1.5"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        style={{ transformOrigin: "center" }}
      />
    </svg>
  );
}

export default function HistoryTab() {
  const navigate = useNavigate();

  const handleReapply = (blend) => {
    toast.success("Blend re-queued — preparing device");
    setTimeout(() => navigate(createPageUrl("Blend")), 500);
  };

  const handleAddToPlaylist = (blend) => {
    toast.success("Added to Playlist");
  };

  const handleDelete = (blend) => {
    toast.error(`${blend.title} deleted`);
  };

  return (
    <div className="px-6 pb-6 space-y-3">
      <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3">
        Perfume History
      </h3>

      {historyData.map((blend, idx) => (
        <motion.div
          key={blend.blend_id}
          className="glass-card rounded-2xl p-3 flex gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1, duration: 0.3 }}
        >
          {/* Cover Image */}
          <div className="w-32 h-24 rounded-xl overflow-hidden flex-shrink-0">
            <img
              src={blend.cover}
              alt={blend.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col justify-between min-w-0">
            {/* Title & Meta */}
            <div>
              <h4 className="text-sm font-semibold text-white truncate">{blend.title}</h4>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">
                {blend.timestamp} · {blend.scent_count} SCENTS
              </p>
            </div>

            {/* Stats & Radar */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex gap-2">
                <div className="px-2 py-1 rounded-md bg-[#E0B23A]/10 border border-[#E0B23A]/20">
                  <p className="text-[8px] text-neutral-500 uppercase">Heating</p>
                  <p className="text-[10px] font-mono font-bold text-[#E0B23A]">{blend.heating_s}s</p>
                </div>
                <div className="px-2 py-1 rounded-md bg-[#E0B23A]/10 border border-[#E0B23A]/20">
                  <p className="text-[8px] text-neutral-500 uppercase">Mixing</p>
                  <p className="text-[10px] font-mono font-bold text-[#E0B23A]">{blend.mixing_s}s</p>
                </div>
              </div>

              <RadarChart data={blend.radar} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => handleReapply(blend)}
                className="flex-1 py-1.5 px-3 rounded-lg bg-[#E0B23A] text-black text-[10px] font-bold uppercase tracking-wider hover:bg-[#C9A234] transition-colors flex items-center justify-center gap-1.5"
              >
                <Play className="w-3 h-3" fill="currentColor" />
                Re-Apply
              </button>
              <button
                onClick={() => handleAddToPlaylist(blend)}
                className="w-8 h-8 rounded-lg border border-neutral-700 flex items-center justify-center hover:bg-white/5 transition-colors"
                aria-label="Add to playlist"
              >
                <Plus className="w-3.5 h-3.5 text-neutral-400" strokeWidth={2} />
              </button>
              <button
                onClick={() => handleDelete(blend)}
                className="w-8 h-8 rounded-lg border border-red-900/30 flex items-center justify-center hover:bg-red-900/20 transition-colors"
                aria-label="Delete"
              >
                <Trash2 className="w-3.5 h-3.5 text-red-400" strokeWidth={2} />
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}