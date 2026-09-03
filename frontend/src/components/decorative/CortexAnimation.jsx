import React, { useState } from 'react';

const CortexAnimation = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center p-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background aura */}
      <div
        className={`absolute inset-0 rounded-full bg-foreground/[0.03] blur-2xl transition-all duration-700 pointer-events-none ${
          isHovered ? 'scale-125 opacity-100 bg-foreground/[0.06]' : 'scale-90 opacity-60'
        }`}
      />

      <svg
        viewBox="0 0 320 320"
        className="w-full h-full max-w-[280px] max-h-[280px] md:max-w-[320px] md:max-h-[320px] transition-transform duration-500 hover:scale-105"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="cortexEmblemGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Synaptic Motion Paths radiating from emblem */}
          <path id="synapticPath1" d="M 160 160 C 120 90, 70 90, 50 135" />
          <path id="synapticPath2" d="M 160 160 C 200 90, 250 90, 270 135" />
          <path id="synapticPath3" d="M 160 160 C 210 210, 240 230, 255 195" />
          <path id="synapticPath4" d="M 160 160 C 110 210, 80 230, 65 195" />
          <path id="synapticPath5" d="M 160 160 C 150 90, 160 65, 160 45" />
          <path id="synapticPath6" d="M 160 160 C 170 230, 160 255, 160 275" />
        </defs>

        <style>
          {`
            @keyframes cortex-spin-cw {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes cortex-spin-ccw {
              from { transform: rotate(360deg); }
              to { transform: rotate(0deg); }
            }
            @keyframes cortex-pulse-emblem {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.04); }
            }
            @keyframes cortex-ring-rotate {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes cortex-dash-flow {
              to { stroke-dashoffset: -32; }
            }
            @keyframes cortex-float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-3px); }
            }
            .cortex-orbit-outer {
              transform-origin: 160px 160px;
              animation: cortex-spin-cw 28s linear infinite;
            }
            .cortex-orbit-inner {
              transform-origin: 160px 160px;
              animation: cortex-spin-ccw 22s linear infinite;
            }
            .cortex-emblem-group {
              transform-origin: 160px 160px;
              animation: cortex-pulse-emblem 4s ease-in-out infinite;
            }
            .cortex-dashed-logo-ring {
              transform-origin: 160px 160px;
              animation: cortex-ring-rotate 36s linear infinite;
            }
            .cortex-dash {
              animation: cortex-dash-flow 2.2s linear infinite;
            }
            .cortex-node-group {
              animation: cortex-float 4s ease-in-out infinite;
            }
          `}
        </style>

        {/* Outer Boundary Ring */}
        <circle
          cx="160"
          cy="160"
          r="142"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity="0.2"
        />

        {/* Outer Orbit with Satellite Nodes */}
        <g className="cortex-orbit-outer">
          <circle
            cx="160"
            cy="160"
            r="124"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="8 14 2 14"
            opacity="0.35"
          />
          <circle cx="284" cy="160" r="3.5" fill="currentColor" opacity="0.8" />
          <circle cx="36" cy="160" r="2.5" fill="currentColor" opacity="0.6" />
          <circle cx="160" cy="36" r="3" fill="currentColor" opacity="0.7" />
          <circle cx="160" cy="284" r="2.5" fill="currentColor" opacity="0.5" />
        </g>

        {/* Inner Elliptical Matrix */}
        <g className="cortex-orbit-inner">
          <ellipse
            cx="160"
            cy="160"
            rx="96"
            ry="76"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.3"
          />
          <ellipse
            cx="160"
            cy="160"
            rx="76"
            ry="96"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            opacity="0.25"
          />
        </g>

        {/* Synaptic Pathway Curves */}
        <g stroke="currentColor" opacity="0.45">
          <path d="M 160 160 C 120 90, 70 90, 50 135" strokeWidth="1.5" className="cortex-dash" strokeDasharray="5 5" />
          <path d="M 160 160 C 200 90, 250 90, 270 135" strokeWidth="1.5" className="cortex-dash" strokeDasharray="5 5" />
          <path d="M 160 160 C 210 210, 240 230, 255 195" strokeWidth="1.5" className="cortex-dash" strokeDasharray="5 5" />
          <path d="M 160 160 C 110 210, 80 230, 65 195" strokeWidth="1.5" className="cortex-dash" strokeDasharray="5 5" />
          <path d="M 160 160 C 150 90, 160 65, 160 45" strokeWidth="1.5" className="cortex-dash" strokeDasharray="5 5" />
          <path d="M 160 160 C 170 230, 160 255, 160 275" strokeWidth="1.5" className="cortex-dash" strokeDasharray="5 5" />
        </g>

        {/* Streaming Data Signal Packets */}
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="2.2s" repeatCount="indefinite">
            <mpath href="#synapticPath1" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="2.6s" repeatCount="indefinite">
            <mpath href="#synapticPath2" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="3.0s" repeatCount="indefinite">
            <mpath href="#synapticPath3" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="2.8s" repeatCount="indefinite">
            <mpath href="#synapticPath4" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="2.4s" repeatCount="indefinite">
            <mpath href="#synapticPath5" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="2.9s" repeatCount="indefinite">
            <mpath href="#synapticPath6" />
          </animateMotion>
        </circle>

        {/* Peripheral Cortical Nodes */}
        <g className="cortex-node-group">
          <g transform="translate(160, 45)">
            <circle cx="0" cy="0" r="9" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
            <circle cx="0" cy="0" r="3.5" fill="currentColor" opacity="0.85" />
          </g>
          <g transform="translate(50, 135)">
            <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
            <circle cx="0" cy="0" r="4" fill="currentColor" opacity="0.8" />
          </g>
          <g transform="translate(270, 135)">
            <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
            <circle cx="0" cy="0" r="4" fill="currentColor" opacity="0.8" />
          </g>
          <g transform="translate(65, 195)">
            <circle cx="0" cy="0" r="9" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
            <circle cx="0" cy="0" r="3.5" fill="currentColor" opacity="0.8" />
          </g>
          <g transform="translate(255, 195)">
            <circle cx="0" cy="0" r="9" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
            <circle cx="0" cy="0" r="3.5" fill="currentColor" opacity="0.8" />
          </g>
          <g transform="translate(160, 275)">
            <circle cx="0" cy="0" r="9" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
            <circle cx="0" cy="0" r="3.5" fill="currentColor" opacity="0.85" />
          </g>
        </g>

        {/* Central Cortex Logo Emblem (Refined normal line weights) */}
        <g id="cortex-official-logo" className="cortex-emblem-group">
          {/* Animated Dashed Pill Background Ring */}
          <g className="cortex-dashed-logo-ring">
            <circle
              cx="160"
              cy="160"
              r="40"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeDasharray="14 11"
              strokeLinecap="round"
              opacity="0.45"
            />
          </g>

          {/* Vertical Leaf / Almond Petal */}
          <path
            d="M 160 108 C 180 134, 180 186, 160 212 C 140 186, 140 134, 160 108 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Horizontal Leaf / Almond Petal */}
          <path
            d="M 108 160 C 134 140, 186 140, 212 160 C 186 180, 134 180, 108 160 Z"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinejoin="round"
            fill="none"
          />

          {/* Central Solid Intelligence Core Circle */}
          <circle cx="160" cy="160" r="4.5" fill="currentColor" />
        </g>
      </svg>
    </div>
  );
};

export default CortexAnimation;
