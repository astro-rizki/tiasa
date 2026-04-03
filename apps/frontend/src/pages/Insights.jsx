import React from "react";
import { motion } from "framer-motion";
import StressChart from "../components/insights/StressChart";
import WeeklySummary from "../components/insights/WeeklySummary";
import TopBlends from "../components/insights/TopBlends";

export default function Insights() {
  return (
    <div className="max-w-md mx-auto min-h-screen">
      {/* Header */}
      <motion.div
        className="px-6 pt-6 pb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="font-serif-luxury text-2xl gold-text">Neuro-Analytics</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mt-1">
          Intelligence & Performance
        </p>
      </motion.div>

      {/* Stress Resonance Chart */}
      <StressChart />

      {/* Weekly Summary */}
      <div className="mt-4">
        <WeeklySummary />
      </div>

      {/* Top Performing Blends */}
      <div className="mt-4">
        <TopBlends />
      </div>
    </div>
  );
}