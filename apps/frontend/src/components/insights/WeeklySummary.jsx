import React, { useState, useEffect } from "react";
import { Shield, Zap, Clock } from "lucide-react";
import { motion } from "framer-motion";

const metrics = [
  { label: "Stress Resilience", value: 22, suffix: "%", icon: Shield, color: "text-emerald-400", prefix: "+" },
  { label: "Scent Effectiveness", value: 87, suffix: "%", icon: Zap, color: "text-[#E0B23A]", prefix: "" },
  { label: "Longevity Avg", value: 4.2, suffix: "h", icon: Clock, color: "text-cyan-400", prefix: "", useComma: true },
];

function AnimatedCounter({ end, duration = 900, suffix = "", prefix = "", useComma = false }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);

  const displayValue = useComma 
    ? count.toFixed(1).replace('.', ',')
    : Math.round(count);

  return (
    <span>
      {prefix}{displayValue}{suffix}
    </span>
  );
}

export default function WeeklySummary() {
  return (
    <motion.div
      className="mx-6 glass-card-strong rounded-2xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <h3 className="font-serif-luxury text-base text-white mb-2">Weekly Intelligence</h3>
      <p className="text-[11px] text-neutral-400 leading-relaxed mb-4">
        Ketahanan stres Anda meningkat sebesar <span className="text-[#E0B23A] font-semibold">22%</span> saat 
        menggunakan kombinasi 'Citrus-Mint' selama jam kerja. Woody base menunjukkan daya tahan 
        paling kuat pada hari-hari aktivitas tinggi.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {metrics.map((m, i) => {
          const Icon = m.icon;
          return (
            <motion.div 
              key={m.label} 
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl bg-neutral-900/40 border-t border-[#E0B23A]/10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
            >
              <Icon className={`w-4 h-4 ${m.color}`} strokeWidth={1.5} />
              <span className="font-mono-data text-lg font-bold text-white">
                <AnimatedCounter 
                  end={m.value} 
                  duration={400 + i * 200}
                  suffix={m.suffix}
                  prefix={m.prefix}
                  useComma={m.useComma}
                />
              </span>
              <span className="text-[8px] uppercase tracking-wider text-neutral-500 text-center leading-tight px-1">
                {m.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}