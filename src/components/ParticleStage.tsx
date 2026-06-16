/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { Particle, EffectType } from '../types';
import { ParticleRenderer } from './ParticleRenderer';

interface ParticleStageProps {
  activeEffect: EffectType;
  triggerId: number; // Incrementing counter to detect re-clicks of the same effect
  onCountdownUpdate: (secondsLeft: number) => void;
  onActiveParticleCountUpdate: (count: number) => void;
}

export const ParticleStage: React.FC<ParticleStageProps> = ({
  activeEffect,
  triggerId,
  onCountdownUpdate,
  onActiveParticleCountUpdate,
}) => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  const [stageWidth, setStageWidth] = useState(window.innerWidth);

  // Use refs for values accessed inside the high-frequency animation loop
  const particlesRef = useRef<Particle[]>([]);
  const activeEffectRef = useRef<EffectType>(null);
  const effectStartedAtRef = useRef<number>(0);
  const lastSpawnTimeRef = useRef<number>(0);
  const requestRef = useRef<number | null>(null);

  // Track stage boundaries
  useEffect(() => {
    const handleResize = () => {
      setStageHeight(window.innerHeight);
      setStageWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Update refs when props change
  useEffect(() => {
    activeEffectRef.current = activeEffect;
    if (activeEffect) {
      effectStartedAtRef.current = performance.now();
      lastSpawnTimeRef.current = 0;
      // When a new effect is triggered, we can keep the old particles but tag them for a graceful exit,
      // or clear them for an immediate mood shift. Clearing makes the choice feel responsive and elegant.
      particlesRef.current = [];
      setParticles([]);
    }
  }, [activeEffect, triggerId]);

  // Premium color palette for formal/sophisticated balloons
  const ELEGANT_BALLOON_COLORS = [
    '#E2D4C5', // Warm Champagne
    '#C08A80', // Dusty Rose
    '#C5A059', // Muted Amber Gold
    '#829190', // Sage Pewter
    '#9AA88F', // Soft Moss
    '#3C4A5A', // Steel Navy
    '#D1A1A8', // Blush Satin
  ];

  // Particle spawning helper
  const spawnParticle = (now: number, type: 'snowflake' | 'balloon') => {
    const id = `${type}-${Math.random().toString(36).substring(2, 11)}`;
    const designVariant = Math.floor(Math.random() * 4); // 4 distinct SVG options

    let initialY = 0;
    let size = 0;
    let speedY = 0;
    let color: string | undefined;

    if (type === 'snowflake') {
      initialY = -40; // Spawn offscreen top
      // Medium-sized snowflakes (22px to 32px)
      size = 22 + Math.random() * 10;
      // Gentle descent speed (1.4 to 2.8 px/frame)
      speedY = 1.4 + Math.random() * 1.4;
    } else {
      initialY = stageHeight + 80; // Spawn offscreen bottom
      // Medium-sized balloons (44px to 54px width)
      size = 44 + Math.random() * 10;
      // Buoyancy speed rising up (-1.8 to -3.2 px/frame)
      speedY = -(1.8 + Math.random() * 1.4);
      // Random designer solid palette
      color = ELEGANT_BALLOON_COLORS[Math.floor(Math.random() * ELEGANT_BALLOON_COLORS.length)];
    }

    const newParticle: Particle = {
      id,
      type,
      x: 5 + Math.random() * 90, // Avoid border spawning dead zones
      y: initialY,
      size,
      speedY,
      swayAmplitude: 0.5 + Math.random() * 1.5, // Subtle horizontal sway
      swayFrequency: 0.01 + Math.random() * 0.02,
      swayPhase: Math.random() * Math.PI * 2,
      opacity: 0.85 + Math.random() * 0.15, // High visual crispness
      rotation: Math.random() * 360,
      rotationSpeed: type === 'snowflake' ? -0.8 + Math.random() * 1.6 : -0.2 + Math.random() * 0.4,
      color,
      stringLength: type === 'balloon' ? 70 + Math.random() * 20 : undefined,
      designVariant,
      createdAt: now,
    };

    particlesRef.current.push(newParticle);
  };

  // Main high-performance render/animation frame tick
  useEffect(() => {
    const updatePhysics = (timestamp: number) => {
      const activeType = activeEffectRef.current;
      let secondsRemaining = 0;

      if (activeType) {
        const elapsed = (timestamp - effectStartedAtRef.current) / 1000;
        secondsRemaining = Math.max(0, 5.0 - elapsed);
        onCountdownUpdate(secondsRemaining);

        // Check if we are still in the 5-second trigger period to spawn new particles
        if (secondsRemaining > 0) {
          // Determine spawn rates (snowflakes spawn slightly more densely than balloons for rich ambient texture)
          const spawnInterval = activeType === 'snowflakes' ? 65 : 180; // millisec
          const timeSinceLastSpawn = timestamp - lastSpawnTimeRef.current;

          if (timeSinceLastSpawn >= spawnInterval) {
            spawnParticle(timestamp, activeType === 'snowflakes' ? 'snowflake' : 'balloon');
            lastSpawnTimeRef.current = timestamp;
          }
        } else {
          // 5 seconds are up! Let parent know we have finished the countdown
          onCountdownUpdate(0);
        }
      } else {
        onCountdownUpdate(0);
      }

      // Physics logic & boundaries loop
      const updatedParticles = particlesRef.current
        .map((p) => {
          const age = timestamp - p.createdAt;
          // Apply sinusoidal sway mimicking atmospheric drift / thermal wind
          const swayOffset = Math.sin(age * p.swayFrequency + p.swayPhase) * p.swayAmplitude;
          
          // Speed scale to simulate subtle speed damping or slight terminal shifts
          let currentY = p.y + p.speedY;
          let currentX = p.x + (swayOffset / stageWidth) * 100 * 0.08; // Translate sway to dynamic % offset

          // Horizontal bounds wrapping or constraint
          if (currentX < 0) currentX = 100;
          if (currentX > 100) currentX = 0;

          // Rotation updates over time
          const currentRotation = p.rotation + p.rotationSpeed;

          // Graceful fadeout when particle is nearing edge of screen or after active effect ends
          let currentOpacity = p.opacity;
          if (p.type === 'snowflake') {
            if (currentY > stageHeight - 120) {
              // Smooth heat dissipation on bottom boundary
              const remainingSpace = stageHeight - currentY;
              currentOpacity = Math.max(0, p.opacity * (remainingSpace / 120));
            }
          } else {
            if (currentY < 120) {
              // High altitude pressure pop fade
              currentOpacity = Math.max(0, p.opacity * (currentY / 120));
            }
          }

          // If effect has finished (countdown is 0), we fade ALL current active particles slightly over time
          if (secondsRemaining === 0 && activeType === null) {
            currentOpacity = Math.max(0, currentOpacity - 0.008);
          }

          return {
            ...p,
            y: currentY,
            x: currentX,
            rotation: currentRotation,
            opacity: currentOpacity,
          };
        })
        .filter((p) => {
          // Strict boundaries checks to garbage collect particles off-screen
          if (p.opacity <= 0.01) return false;
          if (p.type === 'snowflake') {
            return p.y < stageHeight + 40; // Exits bottom
          } else {
            return p.y > -150; // Exits top with string room
          }
        });

      particlesRef.current = updatedParticles;
      setParticles(updatedParticles);
      onActiveParticleCountUpdate(updatedParticles.length);

      requestRef.current = requestAnimationFrame(updatePhysics);
    };

    requestRef.current = requestAnimationFrame(updatePhysics);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [stageHeight, stageWidth, onCountdownUpdate, onActiveParticleCountUpdate]);

  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none select-none">
      {particles.map((p) => (
        <ParticleRenderer key={p.id} particle={p} />
      ))}
    </div>
  );
};
