import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, X, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FLIGHTS = [
  {
    id: 1,
    route: "JFK → CDG",
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
    route: "LHR → IAD",
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
    route: "GVA → LAX",
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const navigate = useNavigate();

  // Auto-advance carousel
  useEffect(() => {
    if (selectedFlight) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FLIGHTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [selectedFlight]);

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

      {/* Carousel */}
      <div className="px-6 overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 35 }}
        >
          {FLIGHTS.map((flight) => (
            <div key={flight.id} className="w-full flex-shrink-0 pr-0">
              <button
                onClick={() => setSelectedFlight(flight)}
                className="w-full rounded-2xl overflow-hidden text-left transition-transform active:scale-[0.98] relative"
                style={{ height: "170px" }}
              >
                {/* Background */}
                <img
                  src={flight.city_img}
                  alt={flight.destCity}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/75" />

                {/* Content */}
                <div className="relative z-10 px-4 pt-3.5 pb-3.5 flex flex-col h-full">
                  {/* Top row: Delta logo + cabin badge */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
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
                    <span className="text-[9px] px-2 py-0.5 rounded-full border border-white/30 text-white/70 font-medium tracking-wide">
                      {flight.cabin === "FIRST CLASS" ? "FC" : "BIZ"}
                    </span>
                  </div>

                  {/* Route — large */}
                  <h3 className="text-white font-bold text-2xl leading-tight mb-0.5">
                    {flight.route}
                  </h3>

                  {/* City */}
                  <p className="text-white/50 text-xs mb-auto">
                    {flight.originCity} — {flight.destCity}
                  </p>

                  {/* Bottom row: cabin badge + price + freq + duration */}
                  <div className="flex items-center gap-2 mt-2 mb-2">
                    <span className="text-[9px] font-semibold tracking-wider text-[#E0B23A] border border-[#E0B23A]/50 rounded-full px-2 py-0.5">
                      {flight.cabin}
                    </span>
                    <span className="text-white/80 text-xs">from {flight.price}</span>
                    <span className="text-white/40 text-[10px]">·</span>
                    <span className="text-white/40 text-[10px]">{flight.frequency}</span>
                    <span className="text-white/40 text-[10px]">·</span>
                    <span className="text-white/40 text-[10px]">{flight.duration}</span>
                  </div>

                  {/* Unlock badge */}
                  <div className="flex items-center gap-1.5">
                    <Lock className="w-2.5 h-2.5 text-[#E0B23A]" strokeWidth={2} />
                    <span className="text-[10px] text-[#E0B23A]">
                      Unlock &ldquo;{flight.unlock}&rdquo;
                    </span>
                  </div>
                </div>
              </button>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-3">
        {FLIGHTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "w-4 h-1.5 bg-[#E0B23A]"
                : "w-1.5 h-1.5 bg-neutral-600"
            }`}
          />
        ))}
      </div>

      {/* Bottom Sheet Modal */}
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
              {/* Sheet Header — dark, no red */}
              <div className="relative px-5 pt-5 pb-4">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 w-7 h-7 rounded-full bg-neutral-800 flex items-center justify-center"
                >
                  <X className="w-3.5 h-3.5 text-neutral-400" />
                </button>

                {/* Route */}
                <h2 className="font-serif-luxury text-2xl gold-text mb-1">
                  {selectedFlight.origin} → {selectedFlight.destination}
                </h2>
                <p className="text-neutral-400 text-sm mb-3">
                  {selectedFlight.originCity} — {selectedFlight.destCity}
                </p>

                {/* Cabin + Price */}
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="text-[10px] font-semibold tracking-wider text-[#E0B23A] border border-[#E0B23A]/50 rounded-full px-2.5 py-0.5">
                    {selectedFlight.cabin}
                  </span>
                  <span className="text-white font-semibold text-sm">
                    from {selectedFlight.price}
                  </span>
                </div>

                {/* Frequency · Duration */}
                <p className="text-neutral-600 text-xs">
                  {selectedFlight.frequency} · {selectedFlight.duration}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-neutral-800 mx-5" />

              {/* Unlock card */}
              <div className="mx-5 my-4 rounded-xl border border-neutral-800 bg-neutral-900/60 px-4 py-3.5">
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

              {/* Actions */}
              <div className="px-5 pb-8 pt-2 space-y-3">
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

                <button
                  onClick={handleUnlock}
                  className="w-full text-center text-[#E0B23A] text-sm py-1"
                >
                  Already booked? Unlock your scent →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
