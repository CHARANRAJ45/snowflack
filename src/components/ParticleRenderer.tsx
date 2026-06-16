/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Particle } from '../types';

interface ParticleRendererProps {
  particle: Particle;
}

export const ParticleRenderer: React.FC<ParticleRendererProps> = ({ particle }) => {
  const { type, size, opacity, rotation, color, designVariant } = particle;

  if (type === 'snowflake') {
    return (
      <div
        className="absolute pointer-events-none select-none transition-transform will-change-transform"
        style={{
          width: size,
          height: size,
          left: `${particle.x}%`,
          top: `${particle.y}px`,
          opacity: opacity,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
        id={`snowflake-${particle.id}`}
      >
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white/90 drop-shadow-[0_0_8px_rgba(248,250,252,0.7)]"
        >
          {designVariant === 0 && (
            /* Variant 0: Stellar Dendrite (Classic Complex) */
            <>
              {/* Core */}
              <circle cx="50" cy="50" r="5" fill="currentColor" />
              {/* 6 Main Spoke Branches */}
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 50 50)`}>
                  <line x1="50" y1="50" x2="50" y2="10" />
                  {/* Outer branches */}
                  <line x1="50" y1="28" x2="38" y2="18" />
                  <line x1="50" y1="28" x2="62" y2="18" />
                  {/* Inner branches */}
                  <line x1="50" y1="42" x2="42" y2="34" />
                  <line x1="50" y1="42" x2="58" y2="34" />
                </g>
              ))}
            </>
          )}

          {designVariant === 1 && (
            /* Variant 1: Geometric Hexagonal Plate */
            <>
              <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" strokeWidth="4" />
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 50 50)`}>
                  <line x1="50" y1="50" x2="50" y2="15" strokeWidth="5" />
                  <circle cx="50" cy="32" r="3" fill="currentColor" />
                </g>
              ))}
              <circle cx="50" cy="50" r="10" strokeWidth="4" />
            </>
          )}

          {designVariant === 2 && (
            /* Variant 2: Minimalist Ice Flower */
            <>
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 50 50)`}>
                  <line x1="50" y1="50" x2="50" y2="12" strokeWidth="7" />
                  <line x1="50" y1="22" x2="38" y2="12" strokeWidth="5" />
                  <line x1="50" y1="22" x2="62" y2="12" strokeWidth="5" />
                  <circle cx="50" cy="12" r="4.5" fill="currentColor" />
                </g>
              ))}
            </>
          )}

          {designVariant === 3 && (
            /* Variant 3: Fern-like Dendrite (Delicate feathering) */
            <>
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <g key={angle} transform={`rotate(${angle} 50 50)`}>
                  <line x1="50" y1="51" x2="50" y2="8" strokeWidth="5" />
                  {/* Dense diagonal feathers */}
                  <line x1="50" y1="20" x2="40" y2="12" strokeWidth="3.5" />
                  <line x1="50" y1="20" x2="60" y2="12" strokeWidth="3.5" />
                  <line x1="50" y1="30" x2="38" y2="20" strokeWidth="3.5" />
                  <line x1="50" y1="30" x2="62" y2="20" strokeWidth="3.5" />
                  <line x1="50" y1="40" x2="38" y2="30" strokeWidth="3.5" />
                  <line x1="50" y1="40" x2="62" y2="30" strokeWidth="3.5" />
                </g>
              ))}
            </>
          )}
        </svg>
      </div>
    );
  }

  // Fallback to Balloon
  const balloonColor = color || '#D4AF37'; // gold
  const stringLen = particle.stringLength || 75;

  return (
    <div
      className="absolute pointer-events-none select-none transition-transform will-change-transform"
      style={{
        width: size,
        height: size * 1.5, // taller to accommodate string
        left: `${particle.x}%`,
        top: `${particle.y}px`,
        opacity: opacity,
        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
      }}
      id={`balloon-${particle.id}`}
    >
      <svg
        viewBox="0 0 100 180"
        width="100%"
        height="100%"
        className="drop-shadow-[0_8px_16px_rgba(0,0,0,0.12)]"
      >
        <defs>
          {/* Volumetric Radial Gradient for a premium 3D sphere feel */}
          <radialGradient
            id={`grad-${particle.id}`}
            cx="35%"
            cy="35%"
            r="65%"
            fx="30%"
            fy="30%"
          >
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="30%" stopColor={balloonColor} />
            <stop offset="100%" stopColor={getShadowColor(balloonColor)} />
          </radialGradient>

          {/* Slight gloss filter for reflections */}
          <linearGradient id="gloss-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Dynamic Curved String */}
        {designVariant === 0 && (
          <path
            d={`M 50,85 Q 45,${85 + stringLen * 0.4} 53,${85 + stringLen * 0.7} T 50,${85 + stringLen}`}
            fill="none"
            stroke="#A3A3A3"
            strokeWidth="1.5"
            strokeDasharray="2,1"
          />
        )}
        {designVariant === 1 && (
          <path
            d={`M 50,85 Q 56,${85 + stringLen * 0.3} 44,${85 + stringLen * 0.6} T 50,${85 + stringLen}`}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="1.2"
          />
        )}
        {designVariant >= 2 && (
          <path
            d={`M 50,84 C 40,${84 + stringLen * 0.3} 60,${84 + stringLen * 0.6} 50,${84 + stringLen}`}
            fill="none"
            stroke="#78716C"
            strokeWidth="1.3"
          />
        )}

        {/* Balloon Knot */}
        <polygon
          points="50,83 45,90 55,90"
          fill={getShadowColor(balloonColor)}
          stroke="none"
        />

        {/* Main Balloon Outer Body */}
        {designVariant === 1 ? (
          /* Elongated Teardrop Balloon */
          <path
            d="M 50,20 C 18,20 18,78 50,84 C 82,78 82,20 50,20 Z"
            fill={`url(#grad-${particle.id})`}
          />
        ) : designVariant === 2 ? (
          /* Rounder Sphere Balloon */
          <path
            d="M 50,15 C 22,15 20,72 50,83 C 80,72 78,15 50,15 Z"
            fill={`url(#grad-${particle.id})`}
          />
        ) : (
          /* Standard Oval Balloon */
          <path
            d="M 50,18 C 20,18 20,75 50,84 C 80,75 80,18 50,18 Z"
            fill={`url(#grad-${particle.id})`}
          />
        )}

        {/* Volumetric Specular Glare (Soft Highlights overlay) */}
        <ellipse
          cx="38"
          cy="34"
          rx="10"
          ry="7"
          fill="#ffffff"
          opacity="0.32"
          transform="rotate(-28 38 34)"
        />
        <circle cx="33" cy="27" r="3.5" fill="#ffffff" opacity="0.45" />

        {/* Classy Gold/Silver ribbon accent near the knot */}
        <path
          d="M 50,88 Q 53,93 48,96"
          fill="none"
          stroke="#F59E0B"
          strokeWidth="1"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};

/**
 * Generates a rich shading color for the radial gradient.
 * Since we have fixed premium hex values, we can map them precisely or calculate a darker tone.
 */
function getShadowColor(colorHex: string): string {
  // Simple check for predefined elegant colors
  const shadowMap: Record<string, string> = {
    '#E2D4C5': '#B5A493', // Warm Champagne -> Dark Champagne
    '#C08A80': '#8C5A52', // Dusty Rose -> Rose Shadow
    '#C5A059': '#8F6E29', // Muted Amber Gold -> Ochre
    '#829190': '#546362', // Sage Pewter -> Deep Slate Green
    '#9AA88F': '#6E7C63', // Soft Moss -> Forest Shadow
    '#3C4A5A': '#1F2A38', // Steel Navy -> Dark Midnight Navy
    '#D1A1A8': '#996C73', // Blush Satin -> Coral Mauve
  };

  if (shadowMap[colorHex]) {
    return shadowMap[colorHex];
  }

  // Simple hardcoded fallback: darker tone
  return '#1A1A1A';
}
