import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { motion } from "framer-motion";

const data = [
  { time: "00:00", stress: 25, release: false },
  { time: "03:00", stress: 18, release: false },
  { time: "06:00", stress: 30, release: false },
  { time: "08:00", stress: 55, release: true },
  { time: "09:00", stress: 42, release: false },
  { time: "10:00", stress: 60, release: true },
  { time: "12:00", stress: 48, release: false },
  { time: "14:00", stress: 70, release: true },
  { time: "15:00", stress: 52, release: false },
  { time: "17:00", stress: 65, release: true },
  { time: "18:00", stress: 38, release: false },
  { time: "20:00", stress: 28, release: false },
  { time: "22:00", stress: 22, release: false },
  { time: "24:00", stress: 15, release: false },
];

const releasePoints = data.filter((d) => d.release);

export default function StressChart() {
  return (
    <motion.div
      className="mx-6 glass-card-strong rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-serif-luxury text-base text-white">Stress Resonance</h3>
          <p className="text-[10px] text-neutral-500 mt-0.5 uppercase tracking-wider">24-hour sweat index history</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#E0B23A]" />
            <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Stress</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#4FD1C5]" />
            <span className="text-[9px] text-neutral-500 uppercase tracking-wider">Release</span>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height: 180 }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="goldAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0B23A" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#E0B23A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="time"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "rgba(255,255,255,0.25)", fontFamily: "JetBrains Mono" }}
              interval={2}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 9, fill: "rgba(255,255,255,0.15)", fontFamily: "JetBrains Mono" }}
              domain={[0, 100]}
            />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="#E0B23A"
              strokeWidth={2}
              fill="url(#goldAreaGrad)"
            />
            {releasePoints.map((point, i) => (
              <ReferenceDot
                key={i}
                x={point.time}
                y={point.stress}
                r={4}
                fill="#4FD1C5"
                stroke="none"
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}