import React, { Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader";
import { motion } from "framer-motion";

function DeviceModel() {
  const geometry = useLoader(STLLoader, "/models/device.stl");

  return (
    <mesh
      geometry={geometry}
      scale={0.04}          // sesuaikan scale
      position={[0, -2, 0]} // sesuaikan posisi
      rotation={[-Math.PI / 2, 0, Math.PI]} 
    >
      <meshStandardMaterial
        color="#2a2a2a"
        metalness={0.6}
        roughness={0.3}
      />
    </mesh>
  );
}

export default function Device3DViewer({ batteryPct = 78 }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="240" height="240" className="absolute">
          <circle cx="120" cy="120" r="110" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
          <motion.circle
            cx="120" cy="120" r="110"
            fill="none"
            stroke="url(#batteryGradient)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 110}
            strokeDashoffset={2 * Math.PI * 110 * (1 - batteryPct / 100)}
            transform="rotate(-90 120 120)"
            initial={{ strokeDashoffset: 2 * Math.PI * 110 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 110 * (1 - batteryPct / 100) }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="batteryGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#AA771C" />
              <stop offset="50%" stopColor="#E0B23A" />
              <stop offset="100%" stopColor="#FCF6BA" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Battery Health</p>
      </div>

      <div className="w-48 h-48">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
          <ambientLight intensity={2} />
          {/* <pointLight position={[0, -4, 4]} intensity={40} />
          <pointLight position={[3, -2, 7]} intensity={60} color="#ffffff" />
          <pointLight position={[-3, -2, 7]} intensity={60} color="#ffffff" />
          <pointLight position={[0, 5, 8]} intensity={40} color="#ffffff" /> */}
          <pointLight position={[2, 0, 0]} intensity={40} color="#ffffff" />
          <pointLight position={[2, -2, 0]} intensity={40} color="#ffffff" />
          <pointLight position={[-2, -2, 0]} intensity={40} color="#ffffff" />
          <pointLight position={[-2, 0, 0]} intensity={40} color="#ffffff" />
          <spotLight position={[0, 0, 8]} intensity={100} angle={0.5} penumbra={0.5} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <DeviceModel />
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={3}
            maxDistance={6}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>
    </div>
  );
}