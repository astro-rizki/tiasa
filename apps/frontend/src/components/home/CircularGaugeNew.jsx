import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CircularGaugeNew({ value, maxValue = 100, label, unit, type = "sweat" }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const size = 240;
  const strokeWidth = 6;
  const center = size / 2;
  const radius = (size - strokeWidth) / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  
  const percentage = (animatedValue / maxValue) * 100;
  const dashOffset = circumference - (percentage / 100) * circumference;

  // Tick marks at 0%, 25%, 50%, 75%, 100%
  const ticks = [0, 25, 50, 75, 100];
  const tickMarks = ticks.map(tick => {
    const angle = (tick / 100) * 270 - 135; // Start from -135deg (left), sweep 270deg
    const rad = (angle * Math.PI) / 180;
    const x1 = center + (radius - 8) * Math.cos(rad);
    const y1 = center + (radius - 8) * Math.sin(rad);
    const x2 = center + (radius + 2) * Math.cos(rad);
    const y2 = center + (radius + 2) * Math.sin(rad);
    return { x1, y1, x2, y2, tick };
  });

  return (
    <div className="relative w-full flex items-center justify-center">
      {/* Outer glow halo */}
      <motion.div
        className="absolute w-64 h-64 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(224,178,58,0.1) 0%, transparent 70%)',
        }}
        animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg width={size} height={size} className="relative z-10">
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={strokeWidth}
        />

        {/* Progress arc (gold) */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-135 ${center} ${center})`}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />

        {/* Tick marks */}
        {tickMarks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.tick <= percentage ? "#E0B23A" : "#404040"}
            strokeWidth={2}
            strokeLinecap="round"
          />
        ))}

        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA771C" />
            <stop offset="50%" stopColor="#E0B23A" />
            <stop offset="100%" stopColor="#FCF6BA" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">{label}</p>
        <motion.div
          key={animatedValue}
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          <p className="font-serif-luxury text-5xl text-white font-light">
            {animatedValue.toString().replace('.', ',')}
          </p>
        </motion.div>
        <p className="text-xs text-neutral-500 mt-1">{unit}</p>
      </div>
    </div>
  );
}