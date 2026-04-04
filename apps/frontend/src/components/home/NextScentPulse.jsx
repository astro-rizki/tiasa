import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Jadwal pulse per 3 jam
const PULSE_HOURS = [0, 4, 8, 12, 16, 20];

function getNextPulse() {
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Cari jam terdekat berikutnya
  for (const hour of PULSE_HOURS) {
    const pulseMinutes = hour * 60;
    if (pulseMinutes > currentMinutes) {
      const next = new Date();
      next.setHours(hour, 0, 0, 0);
      return next;
    }
  }

  // Kalau sudah lewat semua, ambil yang pertama besok
  const next = new Date();
  next.setDate(next.getDate() + 1);
  next.setHours(PULSE_HOURS[0], 0, 0, 0);
  return next;
}

function formatCountdown(ms) {
  if (ms <= 0) return "00:00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return [hours, minutes, seconds]
    .map((v) => String(v).padStart(2, "0"))
    .join(":");
}

export default function NextScentPulse({ onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState(4);
  const [releaseAmount, setReleaseAmount] = useState(0.12);
  const [countdown, setCountdown] = useState("");
  const [nextTime, setNextTime] = useState("");

  useEffect(() => {
    function tick() {
      const next = getNextPulse();
      const now = new Date();
      const diff = next - now;

      // Format jam berikutnya
      const h = String(next.getHours()).padStart(2, "0");
      const m = String(next.getMinutes()).padStart(2, "0");
      setNextTime(`${h}:${m}`);
      setCountdown(formatCountdown(diff));
    }

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    onUpdate?.({ duration_hours: duration, release_ml_per_use: releaseAmount });
    setShowModal(false);

    const toast = document.createElement("div");
    toast.className = "fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl glass-card-strong";
    toast.innerHTML = `<p class="text-sm text-white font-medium">Settings updated.</p>`;
    document.body.appendChild(toast);
    setTimeout(() => document.body.removeChild(toast), 2200);
  };

  return (
    <>
      <motion.div
        className="mx-6 mb-4 glass-card rounded-xl p-3 flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <Clock className="w-4 h-4 text-neutral-500" strokeWidth={1.5} />
          <div>
            <p className="text-[9px] uppercase tracking-wider text-neutral-500 mb-0.5">
              Next Scent Pulse · {nextTime}
            </p>
            <p className="font-mono text-lg font-semibold text-[#E0B23A]">{countdown}</p>
          </div>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-1.5 rounded-lg border border-[#E0B23A] text-[#E0B23A] text-xs font-semibold uppercase tracking-wider hover:bg-[#E0B23A]/10 transition-colors"
        >
          Edit
        </button>
      </motion.div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[998]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
            />
            <motion.div
              className="fixed bottom-0 left-0 right-0 z-[999] max-w-md mx-auto"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <div className="glass-card-strong rounded-t-3xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Edit Scent Pulse</h3>
                  <button onClick={() => setShowModal(false)}>
                    <X className="w-5 h-5 text-neutral-500" />
                  </button>
                </div>

                {/* Duration */}
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-wider text-neutral-500 mb-2 block">
                    Duration per Use (hours)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="8"
                      step="1"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-12 text-center font-mono text-sm text-[#E0B23A] font-semibold">
                      {duration}h
                    </span>
                  </div>
                </div>

                {/* Release Amount */}
                <div className="mb-6">
                  <label className="text-xs uppercase tracking-wider text-neutral-500 mb-2 block">
                    Total Release Amount per Use (ml)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0.08"
                      max="0.2"
                      step="0.01"
                      value={releaseAmount}
                      onChange={(e) => setReleaseAmount(Number(e.target.value))}
                      className="flex-1"
                    />
                    <span className="w-16 text-center font-mono text-sm text-[#E0B23A] font-semibold">
                      {releaseAmount.toFixed(2)} ml
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 bg-[#ffffff] hover:bg-[#d4d4d4] text-black"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[#E0B23A] hover:bg-[#C9A234] text-black"
                    onClick={handleSave}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}