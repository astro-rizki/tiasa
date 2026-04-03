import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Sparkles } from "lucide-react";

export default function ApplyButton({ disabled, sliderValues, selectedItems, onComplete, onHeatingStart }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [stage, setStage] = useState("");

  const handleApply = async () => {
    setIsProcessing(true);
    setProgress(0);
    setStage("heating");
    onHeatingStart?.();

    // Simulate blend processing with progress
    const duration = 3200; // 3.2 seconds
    const interval = 50;
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        
        // Update stage based on progress
        if (next >= 85) {
          setStage("stabilizing");
        } else if (next >= 40) {
          setStage("mixing");
        }
        
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsProcessing(false);
            setIsComplete(true);
            onComplete?.();
          }, 300);
          return 100;
        }
        return next;
      });
    }, interval);
  };

  const handleSpray = () => {
    // Vapor burst animation
    const sprayOverlay = document.createElement("div");
    sprayOverlay.className = "fixed inset-0 pointer-events-none z-50";
    sprayOverlay.innerHTML = `
      <div class="absolute inset-0 flex items-center justify-center">
        <div class="w-32 h-32 rounded-full bg-[#D4AF37]/30 animate-ping"></div>
        <div class="w-24 h-24 rounded-full bg-[#D4AF37]/20 animate-ping absolute" style="animation-delay: 0.2s"></div>
      </div>
    `;
    document.body.appendChild(sprayOverlay);
    setTimeout(() => document.body.removeChild(sprayOverlay), 1000);
    
    // Show success message
    const message = document.createElement("div");
    message.className = "fixed top-20 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl glass-card-strong";
    message.innerHTML = `
      <p class="text-sm text-white font-medium flex items-center gap-2">
        <span class="text-green-400">✓</span>
        Blend released successfully
      </p>
    `;
    document.body.appendChild(message);
    setTimeout(() => document.body.removeChild(message), 2000);
  };

  return (
    <>
      <motion.div
        className="px-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {!isComplete ? (
          <button
            onClick={handleApply}
            disabled={disabled || isProcessing}
            className={`w-full py-4 rounded-2xl font-medium text-sm tracking-wider uppercase transition-all duration-300 ${
              disabled
                ? "bg-neutral-800 text-neutral-600 cursor-not-allowed"
                : "bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#FCF6BA] text-black hover:shadow-lg hover:shadow-[#D4AF37]/20"
            }`}
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing...
              </span>
            ) : (
              "Apply"
            )}
          </button>
        ) : (
          <motion.button
            onClick={handleSpray}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#AA771C] via-[#D4AF37] to-[#FCF6BA] text-black font-medium text-sm tracking-wider uppercase hover:shadow-lg hover:shadow-[#D4AF37]/20 transition-all"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              Spray
            </span>
          </motion.button>
        )}
        
        {disabled && !isProcessing && (
          <p className="text-center text-[10px] text-neutral-600 mt-2">
            Choose fragrances or increase sliders to enable
          </p>
        )}
      </motion.div>

      {/* Progress Modal */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Progress Circle with Hardware Stages */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="glass-card-strong rounded-3xl p-8 flex flex-col items-center gap-4">
                {/* Stage Label */}
                <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">
                  {stage === "heating" && "Heating Subchambers"}
                  {stage === "mixing" && "Mixing in Chamber"}
                  {stage === "stabilizing" && "Stabilizing Blend"}
                </p>

                {/* Circular Progress */}
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background circle */}
                    <circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="6"
                    />
                    {/* Progress circle */}
                    <motion.circle
                      cx="64"
                      cy="64"
                      r="56"
                      fill="none"
                      stroke="url(#goldGrad)"
                      strokeWidth="6"
                      strokeLinecap="round"
                      initial={{ strokeDasharray: "0 352" }}
                      animate={{
                        strokeDasharray: `${(progress / 100) * 352} 352`,
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                    <defs>
                      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#AA771C" />
                        <stop offset="50%" stopColor="#D4AF37" />
                        <stop offset="100%" stopColor="#FCF6BA" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Center Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {stage === "heating" && (
                      <motion.div
                        className="flex gap-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {[...Array(5)].map((_, i) => (
                          <div key={i} className="w-1 h-6 bg-[#D4AF37] rounded-full" />
                        ))}
                      </motion.div>
                    )}
                    {stage === "mixing" && (
                      <motion.div
                        className="w-12 h-12 rounded-full border-2 border-[#D4AF37]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      >
                        <motion.div
                          className="w-2 h-2 bg-[#D4AF37] rounded-full absolute top-1 left-1/2 -translate-x-1/2"
                        />
                      </motion.div>
                    )}
                    {stage === "stabilizing" && (
                      <span className="font-mono-data text-3xl font-light text-[#D4AF37]">
                        {Math.round(progress)}%
                      </span>
                    )}
                  </div>
                </div>

                {/* Stage Description */}
                <p className="text-[10px] text-neutral-600 text-center max-w-xs">
                  {stage === "heating" && "Activating heaters in scent subchambers"}
                  {stage === "mixing" && "Vapor flowing into mix chamber"}
                  {stage === "stabilizing" && "Blend homogenization complete"}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}