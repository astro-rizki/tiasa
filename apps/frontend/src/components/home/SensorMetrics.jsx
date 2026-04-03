import React from "react";
import { motion } from "framer-motion";
import { Droplet, Thermometer, Activity, Zap, Battery, Flame } from "lucide-react";

export default function SensorMetrics({ type = "sensing", sensingData, deviceMetrics }) {
  const sensingMetrics = [
    { 
      label: "Skin Conductance", 
      value: sensingData?.skin_conductance_uS || 12, 
      unit: "µS",
      icon: Activity,
      color: "#7EC8B0"
    },
    { 
      label: "Skin Humidity", 
      value: sensingData?.skin_humidity_pct || 65, 
      unit: "% RH",
      icon: Droplet,
      color: "#6BA8E5"
    },
    { 
      label: "Skin pH", 
      value: sensingData?.skin_ph || 5.2, 
      unit: "",
      icon: Zap,
      color: "#E8A0BF"
    },
    { 
      label: "Lactic Acid", 
      value: sensingData?.lactic_acid_mmol_per_l ? `${sensingData.lactic_acid_mmol_per_l.toString().replace('.', ',')}` : "4,5", 
      unit: "mmol/L",
      icon: Activity,
      color: "#FFB347"
    },
    { 
      label: "Body Temp", 
      value: sensingData?.body_temp_c ? `${sensingData.body_temp_c.toString().replace('.', ',')}` : "36,5", 
      unit: "°C",
      icon: Thermometer,
      color: "#FF6B6B"
    },
  ];

  const deviceMetricsData = [
    {
      label: "Vapor Output",
      value: deviceMetrics?.vapor_output_ml_cycle ? `${deviceMetrics.vapor_output_ml_cycle.toString().replace('.', ',')}` : "0,12",
      unit: "ml/cycle",
      icon: Droplet,
      color: "#7EC8B0"
    },
    {
      label: "Cartridge Level",
      value: deviceMetrics?.cartridge_level_pct || 95,
      unit: "%",
      icon: Battery,
      color: "#E0B23A"
    },
    {
      label: "Active Heater",
      value: deviceMetrics?.heater_status_active || 5,
      unit: "/5",
      icon: Flame,
      color: "#FF6B6B"
    },
    {
      label: "MEMS Stability",
      value: deviceMetrics?.mems_stability_pct || 100,
      unit: "%",
      icon: Activity,
      color: "#6BA8E5"
    },
    {
      label: "Avg Device Temp",
      value: deviceMetrics?.avg_device_temp_c || 78,
      unit: "°C",
      icon: Thermometer,
      color: "#FFB347"
    },
  ];

  const metrics = type === "sensing" ? sensingMetrics : deviceMetricsData;

  return (
    <div className="mx-6 mb-4 overflow-x-auto">
      <div className="flex gap-3 pb-2">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={idx}
              className="glass-card rounded-2xl p-6 flex-shrink-0 w-40 hover:border-[#C0C0C0]/30 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 + 0.4 }}
            >
              <div className="flex flex-col items-center text-center">
                <Icon 
                  className="w-8 h-8 mb-3" 
                  style={{ color: metric.color }}
                  strokeWidth={1.5}
                />
                <p className="font-mono text-3xl font-bold text-white mb-1">
                  {metric.value}
                  {metric.unit && <span className="text-sm text-neutral-500">{metric.unit}</span>}
                </p>
                <p className="text-[10px] uppercase tracking-wider text-neutral-500 line-clamp-2">
                  {metric.label}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}