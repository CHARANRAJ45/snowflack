/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type EffectType = 'snowflakes' | 'balloons' | null;

export interface Particle {
  id: string;
  type: 'snowflake' | 'balloon';
  x: number;             // X position as percentage of viewport (0 - 100)
  y: number;             // Y position in pixels or percentage
  size: number;          // Size in pixels
  speedY: number;        // Falling or floating speed pixels/frame
  swayAmplitude: number; // Horizontal sway amplitude
  swayFrequency: number; // Horizontal sway frequency
  swayPhase: number;     // Random starting offset for sine sway
  opacity: number;       // Transparency
  rotation: number;      // Rotation in degrees
  rotationSpeed: number; // Rotation speed
  color?: string;        // Balloon skin color (hex or radial gradient selection)
  stringLength?: number;// Balloon string length
  designVariant: number; // Choice of visual design (0, 1, 2, 3)
  createdAt: number;     // Timestamp of particle birth
}

export interface SimulationStats {
  activeCount: number;
  totalSpawned: number;
  timeLeft: number;      // Seconds remaining on active effect, e.g. 5.0 down to 0
}
