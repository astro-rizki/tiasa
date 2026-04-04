import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import AiChatbot from "../components/blend/AiChatbot";
import SelectedPerfume from "../components/blend/SelectedPerfume";
import ScentSliders from "../components/blend/ScentSliders";
import ApplyButton from "../components/blend/ApplyButton";
import PerfumeRecommendations from "../components/blend/PerfumeRecommendations";
import CollectionTabs from "../components/blend/CollectionTabs";
import { useDeviceSocket } from '../hooks/useDeviceSocket';

export default function Blend() {
  const [sliderValues, setSliderValues] = useState({
    oriental: 68,
    floral: 48,
    animaly: 25,
    woody: 76,
    fresh: 58,
  });
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPerfume, setSelectedPerfume] = useState(null);
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [isHeating, setIsHeating] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [blendName, setBlendName] = useState("");
  const [selectedPlaylist, setSelectedPlaylist] = useState("default");

  const handleAiSuggest = (action) => {
    if (action === "Suggest Blend") {
      setSliderValues({
        oriental: 75,
        floral: 55,
        animaly: 30,
        woody: 80,
        fresh: 45,
      });
    }
  };

  const handlePerfumeSelect = (perfume) => {
    setSelectedPerfume(perfume);
    if (perfume.sliderValues) {
      setSliderValues(perfume.sliderValues);
    }
  };

  const handleMixerUpdate = (newMixerValues) => {
    setSliderValues(newMixerValues);
  };

  const handleHeatingStart = () => {
    setIsHeating(true);
  };

  const handleApplyComplete = () => {
    setIsHeating(false);
  };

  const handleSaveClick = () => {
    setShowSaveModal(true);
  };

  const handleSaveBlend = () => {
    const blendData = {
      name: blendName || `Custom Blend ${new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`,
      mixer_values: sliderValues,
      timestamp: new Date().toISOString(),
      playlist: selectedPlaylist
    };
    localStorage.setItem('saved_blend_' + Date.now(), JSON.stringify(blendData));
    toast.success(`Blend "${blendData.name}" disimpan ke playlist`);
    setShowSaveModal(false);
    setBlendName("");
  };

  const hasInput = Object.values(sliderValues).some(v => v > 0) || selectedItems.length > 0;
  const { sendSpray } = useDeviceSocket();

  return (
    <div className="max-w-md mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        className="px-6 pt-6 pb-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif-luxury text-2xl gold-text">Blend Laboratory</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mt-1">
          Create Your Signature Scent
        </p>
      </motion.div>

      {/* AI Chatbot */}
      <AiChatbot onSuggest={handleAiSuggest} />

      {/* Selected Perfume Display */}
      <div className="mt-5">
        <SelectedPerfume perfume={selectedPerfume} />
      </div>

      {/* MEMS Mixer Sliders */}
      <ScentSliders
        values={sliderValues}
        onChange={setSliderValues}
        onSaveClick={handleSaveClick}
      />

      {/* Auto-optimize toggle */}
      <motion.div
        className="mx-6 mt-4 mb-5 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase tracking-wider text-neutral-500">
            Auto-Optimize via Sweat Level
          </span>
          <div
            className="group relative"
            onMouseEnter={(e) => {
              const tooltip = e.currentTarget.querySelector(".tooltip");
              if (tooltip) tooltip.classList.remove("hidden");
            }}
            onMouseLeave={(e) => {
              const tooltip = e.currentTarget.querySelector(".tooltip");
              if (tooltip) tooltip.classList.add("hidden");
            }}
          >
            <div className="w-3 h-3 rounded-full border border-neutral-600 flex items-center justify-center text-[8px] text-neutral-600 cursor-help">
              i
            </div>
            <div className="tooltip hidden absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-neutral-800 rounded-lg text-[9px] text-neutral-300 w-48 z-10">
              If enabled, the blend will prioritize sweat chemistry resilience
            </div>
          </div>
        </div>
        <button
          onClick={() => setAutoOptimize(!autoOptimize)}
          className={`w-11 h-6 rounded-full transition-all duration-300 relative ${autoOptimize ? "bg-[#D4AF37]" : "bg-neutral-700"
            }`}
        >
          <motion.div
            className="w-5 h-5 rounded-full bg-white absolute top-0.5"
            animate={{ left: autoOptimize ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </motion.div>

      {/* Apply / Spray Button */}
      <div className="mb-4">
        <ApplyButton
          onSprayStart={() => sendSpray(5000)}
          disabled={!hasInput}
          sliderValues={sliderValues}
          selectedItems={selectedItems}
          onHeatingStart={handleHeatingStart}
          onComplete={handleApplyComplete}
        />
      </div>

      {/* Perfume Recommendations */}
      <PerfumeRecommendations />

      {/* Collection Tabs (Scent Library, History, Playlists) */}
      <div className="mb-8">
        <CollectionTabs
          onMixerUpdate={handleMixerUpdate}
          selectedItems={selectedItems}
          onSelectionChange={setSelectedItems}
          isHeating={isHeating}
        />
      </div>

      {/* Save Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6">
          <motion.div
            className="glass-card-strong rounded-2xl p-6 w-full max-w-sm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="font-serif-luxury text-xl text-white mb-4">Save Blend</h3>

            <input
              type="text"
              placeholder="Enter blend name..."
              value={blendName}
              onChange={(e) => setBlendName(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm mb-4 focus:outline-none focus:border-[#C0C0C0]"
            />

            <div className="mb-6">
              <label className="text-xs uppercase tracking-wider text-neutral-500 mb-2 block">Add to Playlist</label>
              <select
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C0C0C0]"
              >
                <option value="default">My Favorites</option>
                <option value="evening">Evening Collection</option>
                <option value="daily">Daily Wear</option>
                <option value="special">Special Occasions</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowSaveModal(false)}
                className="flex-1 py-3 rounded-xl border border-neutral-700 text-neutral-400 text-sm font-semibold uppercase tracking-wider hover:bg-neutral-800 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBlend}
                className="flex-1 py-3 rounded-xl bg-[#C0C0C0] text-black text-sm font-semibold uppercase tracking-wider hover:bg-[#E8E8E8] transition-all silver-glow"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}