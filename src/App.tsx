/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Timer, Activity, Cpu, Sparkles, Clock, Compass } from 'lucide-react';
import { EffectType } from './types';
import { ParticleStage } from './components/ParticleStage';

export default function App() {
  const [activeEffect, setActiveEffect] = useState<EffectType>(null);
  const [triggerId, setTriggerId] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [activeParticleCount, setActiveParticleCount] = useState<number>(0);
  const [totalSimulatedCount, setTotalSimulatedCount] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<string>('');

  // Update server/browser clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Update total counts historically
  useEffect(() => {
    if (activeParticleCount > 0) {
      setTotalSimulatedCount((prev) => prev + 1);
    }
  }, [activeParticleCount]);

  const handleTrigger = (type: EffectType) => {
    setActiveEffect(type);
    setTriggerId((prev) => prev + 1);
  };

  // Human-readable status label
  const getStatusLabel = () => {
    if (countdown > 0) {
      return activeEffect === 'snowflakes'
        ? 'STATUS: DESCENT WAVE IMMERSION'
        : 'STATUS: THERMAL BUOYANCY ASCENT';
    }
    return 'STATUS: VAPOR BALANCE STABLE';
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] select-none flex flex-col justify-between overflow-hidden p-6 md:p-12 text-slate-100 font-sans" id="app-root">
      {/* Decorative Indigo-Slate Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: 'radial-gradient(circle at 20% 30%, #1e293b 0%, transparent 45%), radial-gradient(circle at 80% 70%, #1e1b4b 0%, transparent 45%)'
          }}
        />
        {/* Subtle grid accent overlay */}
        <div className="absolute inset-0 opacity-[0.015] bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      {/* Dynamic Interactive Stage */}
      <ParticleStage
        activeEffect={activeEffect}
        triggerId={triggerId}
        onCountdownUpdate={setCountdown}
        onActiveParticleCountUpdate={setActiveParticleCount}
      />

      {/* HEADER: Formal Institutional Gallery Layout */}
      <header className="relative z-20 flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-6 w-full max-w-7xl mx-auto md:flex-row" id="header-section">
        <div className="text-center md:text-left">
          <p className="font-mono text-[10px] tracking-[0.3em] text-slate-400 uppercase font-medium">
            Simulation Study No. 04 — Fluid Atmospheric Dynamics
          </p>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight text-white font-normal mt-1 leading-tight">
            Atmospheric Controller
          </h1>
        </div>

        {/* Live Monospace Metrics */}
        <div className="flex items-center gap-6 font-mono text-[11px] text-slate-400">
          <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-5">
            <span className="text-slate-500 text-[9px] uppercase tracking-wider">Coordinates</span>
            <span className="font-medium text-slate-300">45° N, 122° W</span>
          </div>
          <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-5">
            <span className="text-slate-500 text-[9px] uppercase tracking-wider">System Clock</span>
            <span className="font-medium text-slate-300">{currentTime || '00:00:00'}</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-500 text-[9px] uppercase tracking-wider">Core Engine</span>
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              ACTIVE_SECURE_v19
            </span>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER: Centered Formal Console */}
      <main className="relative z-20 my-auto flex flex-col items-center justify-center py-10 w-full max-w-lg mx-auto" id="main-console">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-white/[0.03] backdrop-blur-[20px] border border-white/10 rounded-[24px] p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]"
        >
          {/* Decorative Scientific Label */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-slate-400 stroke-[1.5]" />
              <span className="font-mono text-xs uppercase tracking-widest text-slate-300 font-medium">
                Console Matrix
              </span>
            </div>
            <span className="font-mono text-[10px] text-slate-500">
              ID // {triggerId.toString().padStart(4, '0')}
            </span>
          </div>

          <div className="text-center mb-6">
            <h2 className="text-xl font-extralight tracking-widest uppercase text-white mb-2">Aether & Buoyancy</h2>
            <div className="h-px w-24 bg-blue-500 mx-auto mb-4"></div>
            <p className="text-slate-400 text-sm font-light">
              Select a particle simulation to initiate a five-second environmental protocol within the viewport.
            </p>
          </div>

          {/* TWO PRINCIPLE BUTTONS */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* BUTTON 1: SNOWFLAKES */}
            <button
              onClick={() => handleTrigger('snowflakes')}
              className={`relative overflow-hidden group flex flex-col items-center justify-center p-5 rounded-xl border transition-all duration-300 active:scale-95 ${
                activeEffect === 'snowflakes' && countdown > 0
                  ? 'bg-white/20 border-white/30 text-white shadow-lg'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
              }`}
              id="btn-trigger-snowflakes"
            >
              <div className="relative z-10 flex flex-col items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg transition-transform duration-500 ${
                    activeEffect === 'snowflakes' && countdown > 0
                      ? 'bg-white/25 text-white rotate-180'
                      : 'bg-white/5 text-slate-300 border border-white/5 group-hover:rotate-45'
                  }`}
                >
                  <Snowflake className="w-4 h-4 stroke-[1.5]" />
                </div>
                <div className="text-center">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400 group-hover:text-slate-300 mb-0.5">
                    Protocol A
                  </span>
                  <span className="block text-xs font-semibold tracking-wide">
                    Snowflakes
                  </span>
                </div>
              </div>
            </button>

            {/* BUTTON 2: BALLOONS */}
            <button
              onClick={() => handleTrigger('balloons')}
              className={`relative overflow-hidden group flex flex-col items-center justify-center p-5 rounded-xl border transition-all duration-300 active:scale-95 ${
                activeEffect === 'balloons' && countdown > 0
                  ? 'bg-blue-600/30 border-blue-500/40 text-blue-300 shadow-lg'
                  : 'bg-blue-600/10 hover:bg-blue-600/15 border-blue-500/20 text-slate-300 hover:text-blue-300'
              }`}
              id="btn-trigger-balloons"
            >
              <div className="relative z-10 flex flex-col items-center gap-2.5">
                <div
                  className={`p-2 rounded-lg transition-all duration-500 ${
                    activeEffect === 'balloons' && countdown > 0
                      ? 'bg-blue-500/25 text-blue-300 -translate-y-0.5'
                      : 'bg-blue-500/5 text-slate-300 border border-blue-500/5 group-hover:-translate-y-1'
                  }`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 3.2 2.05 6 5 6.75V19a1 1 0 0 0 .6.9l1 1.7a0.5 0 0 0 .8 0l1-1.7a1 1 0 0 0 .6-.9v-3.25c2.95-.75 5-3.55 5-6.75 0-3.87-3.13-7-7-7z" />
                    <path d="M12 15v3" />
                  </svg>
                </div>
                <div className="text-center">
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400 group-hover:text-slate-300 mb-0.5">
                    Protocol B
                  </span>
                  <span className="block text-xs font-semibold tracking-wide">
                    Balloons
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* CHRONO READOUT / STATUS DISPLAY */}
          <div className="border border-white/5 bg-white/[0.02] p-5 rounded-xl font-mono" id="telemetry-panel">
            {/* Tiny Indicator Lights */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] uppercase text-slate-400 tracking-wider">
                System Diagnostics
              </span>
              <div className="flex gap-1.5">
                <span className={`w-2 h-2 rounded-full ${countdown > 0 && activeEffect === 'snowflakes' ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] animate-pulse' : 'bg-white/10'}`}></span>
                <span className={`w-2 h-2 rounded-full ${countdown > 0 && activeEffect === 'balloons' ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] animate-pulse' : 'bg-white/10'}`}></span>
              </div>
            </div>

            {/* Micro-Readouts */}
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs mb-4">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  Execution State
                </span>
                <span className="font-semibold text-slate-200 transition-colors duration-150">
                  {getStatusLabel()}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  Active Volumetrics
                </span>
                <span className="font-semibold text-slate-200">
                  {activeParticleCount.toString().padStart(2, '0')} medium units
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  Telemetry Clock
                </span>
                <span className="font-semibold text-slate-200 flex items-center gap-1">
                  <Timer className="w-3.5 h-3.5 text-slate-400" />
                  {countdown > 0 ? `${countdown.toFixed(2)}s REMAINING` : 'SYSTEM STANDBY'}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[9px] uppercase tracking-wider text-slate-500">
                  Historical Emitted
                </span>
                <span className="font-semibold text-slate-200">
                  {totalSimulatedCount.toLocaleString()} particles
                </span>
              </div>
            </div>

            {/* Scientific Progress Bar */}
            <div className="relative h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className={`absolute left-0 top-0 h-full rounded-full ${
                  activeEffect === 'snowflakes' 
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' 
                    : 'bg-gradient-to-r from-amber-400 to-rose-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                }`}
                initial={{ width: '0%' }}
                animate={{ width: countdown > 0 ? `${(countdown / 5.0) * 100}%` : '0%' }}
                transition={{ duration: 0.05, ease: 'linear' }}
              />
            </div>
            {countdown > 0 && (
              <div className="flex justify-between font-mono text-[8px] text-slate-500 mt-1.5">
                <span>WARPING_SYSTEM_EMISSION_ON</span>
                <span>{(countdown / 5 * 100).toFixed(0)}% TIMER</span>
              </div>
            )}
          </div>
        </motion.div>
      </main>

      {/* FOOTER: Static Academic Disclaimers */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[9px] uppercase tracking-widest" id="footer-section">
        <span>© 2026 ATMOSPHERIC & KINETIC LABORATORY</span>
        <div className="flex gap-6">
          <span className="hover:text-slate-300 transition-colors cursor-help">FLUID PHYSICS SPEC-B6</span>
          <span className="hover:text-slate-300 transition-colors cursor-help">GRAVITY CONST: 9.807 M/S²</span>
        </div>
      </footer>
    </div>
  );
}
