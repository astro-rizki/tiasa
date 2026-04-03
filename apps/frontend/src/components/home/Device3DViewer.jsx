import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";

function DeviceModel() {
  return (
    <group>
      {/* Main cylinder body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 2, 32]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Top cap */}
      <mesh position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.42, 0.42, 0.3, 32]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* White LED ambient light ring on top */}
      <mesh position={[0, 1.3, 0]}>
        <torusGeometry args={[0.38, 0.04, 16, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1.5} />
      </mesh>

      {/* Antenna 1 */}
      <mesh position={[-0.15, 1.5, 0]} rotation={[0, 0, -0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Antenna 2 */}
      <mesh position={[0.15, 1.5, 0]} rotation={[0, 0, 0.3]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 16]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* YSL Logo on front - Silver metallic */}
      <mesh position={[0, 0, 0.41]}>
        <boxGeometry args={[0.25, 0.5, 0.02]} />
        <meshStandardMaterial color="#C0C0C0" metalness={1.0} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function Device3DViewer({ batteryPct = 78 }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Battery ring background */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg width="240" height="240" className="absolute">
          <circle
            cx="120"
            cy="120"
            r="110"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="6"
          />
          <motion.circle
            cx="120"
            cy="120"
            r="110"
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

      {/* Label */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">Battery Health</p>
      </div>

      {/* 3D Canvas */}
      <div className="w-48 h-48">
        <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 3, 2]} intensity={1.2} />
          <pointLight position={[0, -2, -2]} intensity={0.4} color="#E0B23A" />
          <DeviceModel />
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