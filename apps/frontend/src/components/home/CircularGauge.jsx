import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function CircularGauge({ value = 68, maxValue = 100 }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const size = 260;
  const strokeWidth = 6;
  const center = size / 2;
  const radius = center - 30;
  const circumference = 2 * Math.PI * radius;

  // Gauge arc from 225deg to -45deg (270deg sweep)
  const sweepAngle = 270;
  const startAngle = 135; // degrees from top (clockwise)
  const progress = animatedValue / maxValue;
  const dashOffset = circumference * (1 - (sweepAngle / 360) * progress);
  const dashArray = circumference * (sweepAngle / 360);

  // Needle angle
  const needleAngle = startAngle + sweepAngle * progress;

  // Tick marks
  const ticks = Array.from({ length: 12 }, (_, i) => {
    const angle = startAngle + (sweepAngle / 11) * i;
    const rad = (angle * Math.PI) / 180;
    const innerR = radius - 12;
    const outerR = radius - 4;
    return {
      x1: center + innerR * Math.cos(rad),
      y1: center + innerR * Math.sin(rad),
      x2: center + outerR * Math.cos(rad),
      y2: center + outerR * Math.sin(rad),
      major: i % 3 === 0,
    };
  });

  // Percentage labels
  const labels = [
    { value: "0%", index: 0 },
    { value: "25%", index: 2.75 },
    { value: "75%", index: 8.25 },
    { value: "100%", index: 11 },
  ];

  const needleRad = (needleAngle * Math.PI) / 180;
  const needleLength = radius - 35;

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: size + 30,
          height: size + 30,
          background: `radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)`,
        }}
        animate={{
          boxShadow: [
            "0 0 40px rgba(212,175,55,0.08)",
            "0 0 60px rgba(212,175,55,0.15)",
            "0 0 40px rgba(212,175,55,0.08)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background ring */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.04)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashArray} ${circumference}`}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(${startAngle} ${center} ${center})`}
        />

        {/* Progress arc */}
        <motion.circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${dashArray} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(${startAngle} ${center} ${center})`}
          initial={{ strokeDashoffset: dashArray }}
          animate={{ strokeDashoffset: dashArray - dashArray * progress }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />

        {/* Gold gradient */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AA771C" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#FCF6BA" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Tick marks */}
        {ticks.map((tick, i) => (
          <line
            key={i}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.major ? "rgba(212,175,55,0.5)" : "rgba(255,255,255,0.12)"}
            strokeWidth={tick.major ? 1.5 : 0.8}
          />
        ))}

        {/* Labels */}
        {labels.map((label) => {
          const angle = startAngle + (sweepAngle / 11) * label.index;
          const rad = (angle * Math.PI) / 180;
          const labelR = radius + 18;
          return (
            <text
              key={label.value}
              x={center + labelR * Math.cos(rad)}
              y={center + labelR * Math.sin(rad)}
              fill="rgba(255,255,255,0.25)"
              fontSize="9"
              fontFamily="JetBrains Mono, monospace"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {label.value}
            </text>
          );
        })}

        {/* Needle */}
        <motion.line
          x1={center}
          y1={center}
          x2={center + needleLength * Math.cos(needleRad)}
          y2={center + needleLength * Math.sin(needleRad)}
          stroke="#D4AF37"
          strokeWidth={2}
          strokeLinecap="round"
          filter="url(#glow)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />

        {/* Center dot */}
        <circle cx={center} cy={center} r={4} fill="#D4AF37" filter="url(#glow)" />
        <circle cx={center} cy={center} r={2} fill="#FCF6BA" />
      </svg>

      {/* Center value */}
      <div className="absolute flex flex-col items-center">
        <motion.span
          className="font-mono-data text-5xl font-light tracking-tight"
          style={{ color: "#D4AF37" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {animatedValue}
        </motion.span>
        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mt-1">
          Projection
        </span>
      </div>
    </div>
  );
}