import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Clock, Album } from "lucide-react";
import AromaLibrary from "./AromaLibrary";
import HistoryTab from "./HistoryTab";
import PlaylistTabs from "./PlaylistTabs";
import YslSearchBar from "./YslSearchBar";

export default function CollectionTabs({ onMixerUpdate, selectedItems, onSelectionChange, isHeating }) {
  const [activeTab, setActiveTab] = useState("collection");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = [
    { id: "collection", label: "Scent Library", icon: Sparkles },
    { id: "history", label: "History", icon: Clock },
    { id: "playlists", label: "Playlists", icon: Album },
  ];

  return (
    <div>
      {/* Tab Navigation */}
      <div className="flex gap-2 px-6 mb-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                isActive
                  ? "bg-[#D4AF37]/15 border border-[#D4AF37]/40"
                  : "glass-card hover:bg-white/5"
              }`}
            >
              <Icon
                className={`w-3.5 h-3.5 ${isActive ? "text-[#D4AF37]" : "text-neutral-500"}`}
                strokeWidth={1.5}
              />
              <span
                className={`text-[10px] tracking-wider uppercase ${
                  isActive ? "text-[#D4AF37] font-medium" : "text-neutral-500"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === "collection" && (
          <>
            <YslSearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <AromaLibrary
              onAromaChange={onSelectionChange}
              onMixerUpdate={onMixerUpdate}
              searchQuery={searchQuery}
              isHeating={isHeating}
            />
          </>
        )}
        {activeTab === "history" && (
          <HistoryTab 
            onReApply={(blend) => {
              onMixerUpdate?.(blend.mixer_slider_values);
            }}
          />
        )}
        {activeTab === "playlists" && <PlaylistTabs />}
      </div>
    </div>
  );
}