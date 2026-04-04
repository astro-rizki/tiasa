import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ExternalLink, Plane, CheckCircle } from "lucide-react";

const FLIGHTS = [
  {
    id: 1,
    route: "JFK-CDG",
    origin: "JFK",
    destination: "CDG",
    originCity: "New York",
    destCity: "Paris",
    cabin: "FIRST CLASS",
    code: "DL002",
    time: "6:15pm",
    hub: "JFK",
    type: "Nonstop",
    unlock: "Jardin de Paris",
    city_img: "/images/blend/city.jpg",
  },
  {
    id: 2,
    route: "LHR-JFK",
    origin: "LHR",
    destination: "JFK",
    originCity: "London",
    destCity: "New York",
    cabin: "BUSINESS",
    code: "DL401",
    time: "11:30am",
    hub: "ATL",
    type: "Nonstop",
    unlock: "English Rose Noir",
    city_img: "/images/blend/summer.jpg",
  },
  {
    id: 3,
    route: "NRT-LAX",
    origin: "NRT",
    destination: "LAX",
    originCity: "Tokyo",
    destCity: "Los Angeles",
    cabin: "FIRST CLASS",
    code: "DL166",
    time: "2:00pm",
    hub: "NRT",
    type: "Nonstop",
    unlock: "Sakura Oud",
    city_img: "/images/blend/safari.jpg",
  },
];

export default function DeltaPartner({ darkMode }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [code, setCode] = useState("");
  const [claimed, setClaimed] = useState(false);

  const handleVerify = () => {
    setClaimed(true);
  };

  const handleClose = () => {
    setSelectedFlight(null);
    setCode("");
    setClaimed(false);
  };

  return (
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.45, duration: 0.5 }}
    >
      {/* Section Header */}
      <div className="px-6 mb-3 flex items-center justify-between">
        <div>
          <p className={`text-[10px] uppercase tracking-[0.3em] ${darkMode ? "text-neutral-500" : "text-gray-500"}`}>
            Partner
          </p>
          <h2 className={`font-serif-luxury text-base ${darkMode ? "text-white" : "text-gray-800"}`}>
            Delta Exclusives
          </h2>
        </div>
        {/* Delta logo */}
        <img
          src="/images/profile/delta.png"
          alt="Delta"
          className="h-5 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            e.currentTarget.nextSibling.style.display = "flex";
          }}
        />
        <div className="items-center gap-1.5 hidden">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L22 20H2L12 2Z" fill="#E31837" />
          </svg>
          <span className="text-xs font-bold tracking-widest text-[#E31837]">DELTA</span>
        </div>
      </div>

      {/* Horizontal Scroll Cards */}
      <div className="pl-6 flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {FLIGHTS.map((flight) => (
          <button
            key={flight.id}
            onClick={() => { setSelectedFlight(flight); setCode(""); }}
            className="flex-shrink-0 w-44 rounded-2xl overflow-hidden text-left transition-transform active:scale-95 relative"
            style={{ minHeight: "160px" }}
          >
            {/* Background city image */}
            <img
              src={flight.city_img}
              alt={flight.destCity}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

            {/* Card content */}
            <div className="relative z-10 px-3.5 pt-3 pb-3 flex flex-col h-full" style={{ minHeight: "160px" }}>
              {/* Route + code */}
              <div className="flex items-start justify-between mb-1.5">
                <span className="text-white font-bold text-sm tracking-wide">{flight.route}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium bg-white/15 text-white/70">
                  {flight.code}
                </span>
              </div>

              {/* Delta logo */}
              <div className="mb-3">
                <img
                  src="/images/profile/delta.png"
                  alt="Delta"
                  className="h-3.5 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.nextSibling.style.display = "flex";
                  }}
                />
                <div className="items-center gap-1 hidden">
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L22 20H2L12 2Z" fill="#E31837" />
                  </svg>
                  <span className="text-[9px] font-bold tracking-widest text-white/70">DELTA</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-white/20 mb-2.5" />

              {/* Flight info */}
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-white text-xs font-semibold">{flight.time}</span>
                <Plane className="w-3 h-3 text-white/50 rotate-45" strokeWidth={2} />
              </div>
              <div className="flex items-center justify-between mb-auto">
                <span className="text-white/50 text-[10px]">{flight.hub}</span>
                <span className="text-white/40 text-[10px]">{flight.type}</span>
              </div>

              {/* Lock badge */}
              <div className="flex items-center gap-1.5 mt-3">
                <Lock className="w-2.5 h-2.5 text-[#E0B23A]" strokeWidth={2} />
                <span className="text-[9px] text-[#E0B23A] truncate">{flight.unlock}</span>
              </div>
            </div>
          </button>
        ))}
        {/* Right padding spacer */}
        <div className="w-2 flex-shrink-0" />
      </div>

      {/* Unlock Modal — z-[1000] to sit above bottom nav (z-[999]) */}
      <AnimatePresence>
        {selectedFlight && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-end justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="w-full max-w-md rounded-t-3xl overflow-hidden"
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
                    <h3 className="font-serif-luxury text-xl text-white mb-2">
                      Parfum Unlocked!
                    </h3>
                    <p className="text-neutral-400 text-sm mb-1">
                      &ldquo;{selectedFlight?.unlock}&rdquo;
                    </p>
                    <p className="text-neutral-600 text-xs mb-8">
                      {selectedFlight?.originCity} → {selectedFlight?.destCity} · {selectedFlight?.cabin}
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
                    {selectedFlight.origin} → {selectedFlight.destination}
                  </span>
                </div>
                <p className="text-white/60 text-xs mb-3">
                  {selectedFlight.originCity} — {selectedFlight.destCity} · {selectedFlight.cabin}
                </p>

                {/* Delta logo in modal */}
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
                {/* Lock icon + title */}
                <div className="flex items-center gap-2 mb-1">
                  <Lock className="w-4 h-4 text-[#E0B23A]" strokeWidth={2} />
                  <span className="text-white font-serif-luxury text-lg">
                    Unlock &ldquo;{selectedFlight.unlock}&rdquo;
                  </span>
                </div>

                {/* Subtitle */}
                <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mb-4">
                  Booking Confirmation Code
                </p>

                {/* Input */}
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

                {/* Verify button */}
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

                {/* Book link */}
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
