import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ExternalLink, CheckCircle } from "lucide-react";

const DELTA_COLLECTION = [
  {
    id: 1,
    name: "Jardin de Paris",
    city_img: "/images/blend/city.jpg",
    origin: "JFK",
    destination: "CDG",
    originCity: "New York",
    destCity: "Paris",
    cabin: "FIRST CLASS",
    code: "DL002",
  },
  {
    id: 2,
    name: "Atlantic Dusk",
    city_img: "/images/blend/summer.jpg",
    origin: "LHR",
    destination: "IAD",
    originCity: "London",
    destCity: "Washington",
    cabin: "BUSINESS",
    code: "DL401",
  },
  {
    id: 3,
    name: "Pacific Alp",
    city_img: "/images/blend/safari.jpg",
    origin: "LAX",
    destination: "NRT",
    originCity: "Los Angeles",
    destCity: "Tokyo",
    cabin: "FIRST CLASS",
    code: "DL166",
  },
  {
    id: 4,
    name: "Tokyo Noi",
    city_img: "/images/blend/city.jpg",
    origin: "NRT",
    destination: "LAX",
    originCity: "Tokyo",
    destCity: "Los Angeles",
    cabin: "BUSINESS",
    code: "DL177",
  },
];

export default function DeltaBlendSection() {
  const [selected, setSelected] = useState(null);
  const [code, setCode] = useState("");
  const [claimed, setClaimed] = useState(false);

  const handleVerify = () => setClaimed(true);

  const handleClose = () => {
    setSelected(null);
    setCode("");
    setClaimed(false);
  };

  return (
    <motion.div
      className="px-6 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-2">
          <span className="text-[#E0B23A] text-base">✦</span>
          <h3 className="font-serif-luxury text-base gold-text">Delta Exclusive Collection</h3>
        </div>
        {/* Delta logo */}
        <img
          src="/images/profile/delta.png"
          alt="Delta"
          className="h-5 object-contain mt-0.5"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        <div className="items-center gap-1 hidden mt-0.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L22 20H2L12 2Z" fill="#E31837" />
          </svg>
          <span className="text-xs font-bold tracking-widest text-[#E31837]">DELTA</span>
        </div>
      </div>

      <p className="text-xs text-neutral-500 mb-5">
        Unlock with your Delta booking confirmation code.
      </p>

      {/* 4 Circle Items */}
      <div className="flex items-start justify-between">
        {DELTA_COLLECTION.map((item, idx) => (
          <motion.button
            key={item.id}
            onClick={() => { setSelected(item); setCode(""); setClaimed(false); }}
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.55 + idx * 0.08, duration: 0.3 }}
            whileTap={{ scale: 0.93 }}
          >
            {/* Circle with city image + gold border */}
            <div className="w-[72px] h-[72px] rounded-full p-[2px] bg-gradient-to-br from-[#E0B23A] via-[#C9A234] to-[#8B6914]">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img
                  src={item.city_img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            {/* Name */}
            <p className="text-[10px] text-neutral-300 text-center leading-tight w-16">
              {item.name}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Bottom Sheet Modal — same as DeltaPartner */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="w-full max-w-md rounded-t-3xl overflow-hidden relative"
              style={{ background: "#1a1a1a" }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Success State */}
              <AnimatePresence>
                {claimed && (
                  <motion.div
                    className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center rounded-t-3xl"
                    style={{ background: "#1a1a1a" }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.1, stiffness: 200 }}
                    >
                      <CheckCircle className="w-16 h-16 text-[#E0B23A] mb-4" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="font-serif-luxury text-xl text-white mb-2">Parfum Unlocked!</h3>
                    <p className="text-neutral-400 text-sm mb-1">&ldquo;{selected?.name}&rdquo;</p>
                    <p className="text-neutral-600 text-xs mb-8">
                      {selected?.originCity} → {selected?.destCity} · {selected?.cabin}
                    </p>
                    <button
                      onClick={handleClose}
                      className="w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider bg-[#E0B23A] text-black"
                    >
                      Done
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Modal Header */}
              <div className="relative bg-gradient-to-r from-[#7B1C28] to-[#4A0E16] px-5 py-4">
                <button
                  onClick={handleClose}
                  className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-white/70" />
                </button>

                <div className="mb-1">
                  <span className="text-white font-bold text-lg tracking-wide">
                    {selected.origin} → {selected.destination}
                  </span>
                </div>
                <p className="text-white/60 text-xs mb-3">
                  {selected.originCity} — {selected.destCity} · {selected.cabin}
                </p>

                <div className="flex items-center gap-2">
                  <img
                    src="/images/profile/delta.png"
                    alt="Delta"
                    className="h-4 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="items-center gap-1.5 hidden">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L22 20H2L12 2Z" fill="#E31837" />
                    </svg>
                    <span className="text-sm font-bold tracking-[0.2em] text-white">DELTA</span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="px-5 py-5">
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-[#E0B23A]" strokeWidth={2} />
                  <span className="text-white font-serif-luxury text-lg">
                    Unlock &ldquo;{selected.name}&rdquo;
                  </span>
                </div>

                <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mb-4">
                  Booking Confirmation Code
                </p>

                <div className="mb-4">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value.toUpperCase().slice(0, 6))}
                    placeholder="e.g. DL1234"
                    maxLength={6}
                    className="w-full rounded-xl px-4 py-3 text-sm bg-neutral-800 border border-neutral-700 text-white placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 font-mono-data tracking-wider"
                  />
                </div>

                <button
                  onClick={handleVerify}
                  disabled={code.length < 6}
                  className={`w-full py-3.5 rounded-xl text-sm font-semibold uppercase tracking-wider transition-all mb-3 ${
                    code.length >= 6
                      ? "bg-[#E0B23A] text-black cursor-pointer"
                      : "bg-neutral-700 text-white/60 cursor-not-allowed"
                  }`}
                >
                  Verify &amp; Unlock
                </button>

                <a
                  href="#"
                  className="flex items-center justify-center gap-1.5 text-[#E0B23A] text-xs"
                  onClick={(e) => e.preventDefault()}
                >
                  Book this flight on Delta
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
