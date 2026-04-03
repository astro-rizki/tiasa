import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

const playlistsData = [
  {
    id: "pl_001",
    name: "Morning Fresh",
    cover: "https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=200&h=200&fit=crop",
    perfume_count: 4
  },
  {
    id: "pl_002",
    name: "Evening Elegance",
    cover: "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=200&h=200&fit=crop",
    perfume_count: 8
  },
  {
    id: "pl_003",
    name: "Workout Energy",
    cover: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200&h=200&fit=crop",
    perfume_count: 6
  }
];

export default function PlaylistTabs() {
  const [playlists, setPlaylists] = useState(playlistsData);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const handleCreate = () => {
    if (!newPlaylistName.trim()) {
      toast.error("Please enter a playlist name");
      return;
    }

    const newPlaylist = {
      id: `pl_${Date.now()}`,
      name: newPlaylistName,
      cover: "https://images.unsplash.com/photo-1618397746666-63405ce5d015?w=200&h=200&fit=crop",
      perfume_count: 0
    };

    setPlaylists([...playlists, newPlaylist]);
    setNewPlaylistName("");
    setShowCreateModal(false);
    toast.success("Playlist created");
  };

  return (
    <div className="px-6 pb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
          My Playlists
        </h3>
        <button
          onClick={() => setShowCreateModal(true)}
          className="w-9 h-9 rounded-full bg-[#E0B23A]/15 flex items-center justify-center hover:bg-[#E0B23A]/25 transition-colors"
          aria-label="Create playlist"
        >
          <Plus className="w-4 h-4 text-[#E0B23A]" strokeWidth={2} />
        </button>
      </div>

      {/* Playlist List */}
      <div className="space-y-3">
        {playlists.map((playlist, idx) => (
          <motion.div
            key={playlist.id}
            className="glass-card rounded-2xl p-3 flex items-center gap-3 hover:bg-white/5 transition-colors cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.3 }}
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
              <img
                src={playlist.cover}
                alt={playlist.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-white truncate">{playlist.name}</h4>
              <p className="text-[10px] text-neutral-500 uppercase tracking-wider mt-0.5">
                {playlist.perfume_count} PERFUMES
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Create Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCreateModal(false)}
            />

            {/* Modal */}
            <motion.div
              className="relative z-10 w-full max-w-md mx-4 glass-card-strong rounded-2xl p-6"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {/* Close button */}
              <button
                onClick={() => setShowCreateModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-neutral-400" strokeWidth={2} />
              </button>

              <h3 className="text-lg font-serif-luxury text-white mb-4">Create Playlist</h3>

              {/* Input */}
              <input
                type="text"
                placeholder="Playlist name..."
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-700 text-white placeholder:text-neutral-600 focus:outline-none focus:border-[#E0B23A] transition-colors"
                autoFocus
              />

              {/* Actions */}
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-3 rounded-xl border border-neutral-700 text-neutral-400 font-semibold text-sm hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreate}
                  className="flex-1 py-3 rounded-xl bg-[#E0B23A] text-black font-semibold text-sm hover:bg-[#C9A234] transition-colors"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}