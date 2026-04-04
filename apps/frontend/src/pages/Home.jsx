import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Loader2 } from "lucide-react";
import DeviceHeader from "../components/home/DeviceHeader";
import CircularGaugeNew from "../components/home/CircularGaugeNew";
import Device3DViewer from "../components/home/Device3DViewer";
import NextScentPulse from "../components/home/NextScentPulse";
import SensorMetrics from "../components/home/SensorMetrics";
import AIInsightPanel from "../components/home/AIInsightPanel";

export default function Home() {
  const [activeTab, setActiveTab] = useState("device");
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock device data
  const [deviceData] = useState({
    device_id: "TIASA-01",
    connected: true,
    connection_method: "bluetooth_le",
    accuracy_pct: 100,
    battery_pct: 78,
    charging: true
  });

  const [sensingData] = useState({
    sweat_rate_lph: 0.8,
    next_pulse_time: "08:42",
    skin_conductance_uS: 12,
    skin_humidity_pct: 65,
    skin_ph: 5.2,
    lactic_acid_mmol_per_l: 4.5,
    body_temp_c: 36.5
  });

  const [deviceMetrics] = useState({
    vapor_output_ml_cycle: 0.12,
    cartridge_level_pct: 95,
    heater_status_active: 5,
    mems_stability_pct: 100,
    avg_device_temp_c: 78
  });

  const [showRefreshModal, setShowRefreshModal] = useState(false);
  const [refreshProgress, setRefreshProgress] = useState(0);

  const handleRefresh = async () => {
    setShowRefreshModal(true);
    setRefreshProgress(0);
    
    // Simulate calibration stages
    const stages = [
      { delay: 300, progress: 20, text: "Initializing sensors..." },
      { delay: 600, progress: 45, text: "Calibrating readings..." },
      { delay: 900, progress: 70, text: "Syncing data..." },
      { delay: 1200, progress: 100, text: "Complete!" }
    ];

    for (const stage of stages) {
      await new Promise(resolve => setTimeout(resolve, stage.delay - (stages.indexOf(stage) > 0 ? stages[stages.indexOf(stage) - 1].delay : 0)));
      setRefreshProgress(stage.progress);
    }
    
    await new Promise(resolve => setTimeout(resolve, 500));
    setShowRefreshModal(false);
  };

  const handlePulseUpdate = (settings) => {
    console.log("Pulse settings updated:", settings);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24">
      {/* Device Header */}
      <DeviceHeader deviceData={deviceData} />

      {/* Tab Selector */}
      <div className="mx-6 mb-4 flex gap-2">
        {[
          { id: "device", label: "Device" },
          { id: "sensing", label: "Sensing" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2.5 rounded-xl text-xs uppercase tracking-wider font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-[#E0B23A] text-black"
                : "glass-card text-neutral-400 border border-[#E0B23A]/30 hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Gauge Area */}
      <motion.div
        className="mx-6 mb-4 glass-card rounded-2xl p-6 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-[#E0B23A]/5 via-transparent to-transparent pointer-events-none" />
        
        {activeTab === "sensing" ? (
          <CircularGaugeNew
            value={sensingData.sweat_rate_lph}
            maxValue={2}
            label="Sweat Rate"
            unit="L/hour"
            type="sweat"
          />
        ) : (
          <Device3DViewer batteryPct={deviceData.battery_pct} />
        )}

        {/* Refresh Button */}
        <div className="absolute bottom-4 right-4 flex flex-col items-center gap-1">
          <motion.button
            className="w-10 h-10 rounded-full glass-card border border-[#E0B23A] flex items-center justify-center hover:bg-[#E0B23A]/10 transition-colors"
            onClick={handleRefresh}
            whileTap={{ scale: 0.95 }}
            aria-label="Refresh device status"
          >
            <RefreshCw className="w-4 h-4 text-[#E0B23A]" strokeWidth={2} />
          </motion.button>
          <span className="text-[9px] uppercase tracking-wider text-white">Refresh</span>
        </div>
      </motion.div>

      {/* Next Scent Pulse */}
      <NextScentPulse 
        time={sensingData.next_pulse_time} 
        onUpdate={handlePulseUpdate}
      />

      {/* Sensor Metrics */}
      <SensorMetrics 
        type={activeTab}
        sensingData={sensingData}
        deviceMetrics={deviceMetrics}
      />

      {/* AI Insight */}
      <AIInsightPanel 
        insight="Detected rising cortisol. Sublimating 'Serene Cedar' via Channel 3 & 5."
      />

      {/* Refresh Loading Modal */}
      <AnimatePresence>
        {showRefreshModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-card-strong rounded-2xl p-8 mx-6 max-w-sm w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-[#E0B23A] animate-spin mb-4" />
                <h3 className="font-serif-luxury text-lg text-white mb-2">Calibrating</h3>
                <p className="text-xs text-neutral-500 text-center mb-6">
                  {refreshProgress < 30 && "Initializing sensors..."}
                  {refreshProgress >= 30 && refreshProgress < 60 && "Calibrating readings..."}
                  {refreshProgress >= 60 && refreshProgress < 90 && "Syncing data..."}
                  {refreshProgress >= 90 && "Complete!"}
                </p>

                <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#E0B23A] to-[#C0C0C0]"
                    initial={{ width: "0%" }}
                    animate={{ width: `${refreshProgress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <p className="text-xs text-neutral-600 mt-3 font-mono-data">{refreshProgress}%</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}