import React from "react";
import { Droplets, Power, Thermometer } from "lucide-react";
import { motion } from "framer-motion";

export default function StatusCards({ sweatRate = 42, bodyTemp = 36.4, isDeviceOn, onToggleDevice }) {
  const cards = [
    {
      label: "Sweat Rate",
      value: `${sweatRate}%`,
      icon: Droplets,
      color: "text-cyan-400",
      bgColor: "bg-cyan-400/10",
    },
    {
      label: "Power",
      value: isDeviceOn ? "Active" : "Off",
      icon: Power,
      color: isDeviceOn ? "text-[#D4AF37]" : "text-neutral-500",
      bgColor: isDeviceOn ? "bg-[#D4AF37]/10" : "bg-neutral-800/50",
      onClick: onToggleDevice,
      isToggle: true,
    },
    {
      label: "Body Temp",
      value: `${bodyTemp}°`,
      icon: Thermometer,
      color: "text-rose-400",
      bgColor: "bg-rose-400/10",
    },
  ];

  return (
    <div className="flex gap-3 px-6">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.button
            key={card.label}
            onClick={card.onClick}
            className={`flex-1 glass-card rounded-2xl p-4 flex flex-col items-center gap-2 transition-all duration-300 ${
              card.isToggle ? "cursor-pointer active:scale-95" : "cursor-default"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
            whileTap={card.isToggle ? { scale: 0.95 } : {}}
          >
            <div className={`w-10 h-10 rounded-xl ${card.bgColor} flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${card.color}`} strokeWidth={1.5} />
            </div>
            <span className="font-mono-data text-lg font-medium text-white">
              {card.value}
            </span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-500">
              {card.label}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}