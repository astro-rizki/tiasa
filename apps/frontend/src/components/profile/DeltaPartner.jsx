import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ExternalLink, Plane } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FLIGHTS = [
  {
    id: 1,
    route: "JFK-CDG",
    origin: "JFK",
    destination: "CDG",
    originCity: "New York",
    destCity: "Paris",
    cabin: "FIRST CLASS",
    price: "$2,890",
    frequency: "Daily",
    duration: "7h20m",
    unlock: "Jardin de Paris",
    dotColor: "#7B1C28",
    city_img: "/images/blend/city.jpg",
  },
  {
    id: 2,
    route: "LHR-IAD",
    origin: "LHR",
    destination: "IAD",
    originCity: "London",
    destCity: "Washington",
    cabin: "BUSINESS",
    price: "$1,640",
    frequency: "3×wkly",
    duration: "8h40m",
    unlock: "Atlantic Dusk",
    dotColor: "#1E3A5F",
    city_img: "/images/blend/summer.jpg",
  },
  {
    id: 3,
    route: "GVA-LAX",
    origin: "GVA",
    destination: "LAX",
    originCity: "Geneva",
    destCity: "Los Angeles",
    cabin: "BUSINESS",
    price: "$2,100",
    frequency: "4×wkly",
    duration: "11h05m",
    unlock: "Pacific Alp",
    dotColor: "#1A3A1A",
    city_img: "/images/blend/safari.jpg",
  },
];

export default function DeltaPartner({ darkMode }) {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  const handleClose = () => setSelectedFlight(null);

  const handleUnlock = () => {
    handleClose();
    navigate("/blend");
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
            onClick={() => setSelectedFlight(flight)}
            className="flex-shrink-0 w-44 rounded-2xl overflow-hidden text-left transition-transform active:scale-95 relative"
            style={{ minHeight: "160px" }}
          >
            <img
              src={flight.city_img}
              alt={flight.destCity}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/80" />

            <div className="relative z-10 px-3.5 pt-3 pb-3 flex flex-col h-full" style={{ minHeight: "160px" }}>
              <div className="flex items-start justify-between mb-1.5">
                <span className="text-white font-bold text-sm tracking-wide">{flight.route}</span>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full font-medium bg-white/15 text-white/70">
                  {flight.cabin === "FIRST CLASS" ? "FC" : "BIZ"}
                </span>
              </div>

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

              <div className="border-t border-white/20 mb-2.5" />

              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-white text-xs font-semibold">from {flight.price}</span>
              </div>
              <div className="flex items-center justify-between mb-auto">
                <span className="text-white/50 text-[10px]">{flight.frequency}</span>
                <span className="text-white/40 text-[10px]">{flight.duration}</span>
              </div>

              <div className="flex items-center gap-1.5 mt-3">
                <Lock className="w-2.5 h-2.5 text-[#E0B23A]" strokeWidth={2} />
                <span className="text-[9px] text-[#E0B23A] truncate">{flight.unlock}</span>
              </div>
            </div>
          </button>
        ))}
        <div className="w-2 flex-shrink-0" />
      </div>

      {/* Full-screen Modal */}
      <AnimatePresence>
        {selectedFlight && (
          <motion.div
            className="fixed inset-0 z-[1000] flex flex-col bg-[#0A0A0A] px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close button */}
            <div className="flex justify-end pt-12 pb-6">
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center"
              >
                <X className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Flight Info */}
            <div className="flex-1">
              {/* Route */}
              <h2 className="font-serif-luxury text-3xl gold-text mb-1">
                {selectedFlight.origin} → {selectedFlight.destination}
              </h2>

              {/* City */}
              <p className="text-neutral-400 text-sm mb-4">
                {selectedFlight.originCity} — {selectedFlight.destCity}
              </p>

              {/* Cabin + Price */}
              <div className="flex items-center gap-3 mb-2">
                <span className="text-[10px] font-semibold tracking-wider text-[#E0B23A] border border-[#E0B23A]/50 rounded-full px-2.5 py-0.5">
                  {selectedFlight.cabin}
                </span>
                <span className="text-white font-semibold text-sm">
                  from {selectedFlight.price}
                </span>
              </div>

              {/* Frequency · Duration */}
              <p className="text-neutral-600 text-xs mb-8">
                {selectedFlight.frequency} · {selectedFlight.duration}
              </p>

              {/* Unlock card */}
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3.5">
                <p className="text-[#E0B23A] text-sm mb-2.5">
                  Book to unlock{" "}
                  <span className="font-semibold italic">&ldquo;{selectedFlight.unlock}&rdquo;</span>
                  {" "}in your Blend Lab
                </p>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedFlight.dotColor }}
                  />
                  <span className="text-neutral-400 text-xs font-mono-data">
                    {selectedFlight.unlock}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pb-10 pt-6 space-y-4">
              {/* Book on Delta button */}
              <button
                onClick={handleClose}
                className="w-full py-4 rounded-2xl text-sm font-semibold tracking-wide text-black"
                style={{
                  background: "linear-gradient(135deg, #E0B23A 0%, #C9A234 50%, #E0B23A 100%)",
                }}
              >
                <span className="flex items-center justify-center gap-2">
                  Book on Delta
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </button>

              {/* Already booked link */}
              <button
                onClick={handleUnlock}
                className="w-full text-center text-[#E0B23A] text-sm"
              >
                Already booked? Unlock your scent →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
