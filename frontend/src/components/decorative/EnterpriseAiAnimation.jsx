import React, { useState } from 'react';

const EnterpriseAiAnimation = ({ className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative flex items-center justify-center p-6 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ambient background glow */}
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
          <path id="flow1" d="M 60 160 L 160 80 L 260 160" />
          <path id="flow2" d="M 260 160 L 160 240 L 60 160" />
          <path id="flow3" d="M 160 80 L 160 240" />
        </defs>

        <style>
          {`
            @keyframes ent-rotate-matrix {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
            @keyframes ent-pulse-node {
              0%, 100% { transform: scale(1); opacity: 0.8; }
              50% { transform: scale(1.15); opacity: 1; }
            }
            @keyframes ent-dash-flow {
              to { stroke-dashoffset: -40; }
            }
            .ent-matrix-rotate {
              transform-origin: 160px 160px;
              animation: ent-rotate-matrix 40s linear infinite;
            }
            .ent-dash {
              animation: ent-dash-flow 2.5s linear infinite;
            }
          `}
        </style>

        {/* Outer Geometric Framework Ring */}
        <g className="ent-matrix-rotate">
          <polygon
            points="160,35 268,97 268,223 160,285 52,223 52,97"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.25"
          />
          <circle cx="160" cy="35" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="268" cy="97" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="268" cy="223" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="160" cy="285" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="52" cy="223" r="3" fill="currentColor" opacity="0.6" />
          <circle cx="52" cy="97" r="3" fill="currentColor" opacity="0.6" />
        </g>

        {/* Inner Diamond Decision Grid */}
        <polygon
          points="160,80 260,160 160,240 60,160"
          stroke="currentColor"
          strokeWidth="1.5"
          className="ent-dash"
          strokeDasharray="6 6"
          opacity="0.45"
        />

        {/* Diagonal Cross-Decision Vectors */}
        <line x1="160" y1="80" x2="160" y2="240" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.35" />
        <line x1="60" y1="160" x2="260" y2="160" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 6" opacity="0.35" />

        {/* Dynamic Flying Data Pulses */}
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="3s" repeatCount="indefinite">
            <mpath href="#flow1" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="3s" begin="1.5s" repeatCount="indefinite">
            <mpath href="#flow2" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="currentColor" opacity="0.9">
          <animateMotion dur="2.2s" repeatCount="indefinite">
            <mpath href="#flow3" />
          </animateMotion>
        </circle>

        {/* Decision Nodes */}
        {/* Top Node */}
        <g transform="translate(160, 80)">
          <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
          <rect x="-3" y="-3" width="6" height="6" fill="currentColor" opacity="0.8" transform="rotate(45)" />
        </g>

        {/* Right Node */}
        <g transform="translate(260, 160)">
          <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
          <circle cx="0" cy="0" r="4" fill="currentColor" opacity="0.8" />
        </g>

        {/* Bottom Node */}
        <g transform="translate(160, 240)">
          <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
          <rect x="-3" y="-3" width="6" height="6" fill="currentColor" opacity="0.8" transform="rotate(45)" />
        </g>

        {/* Left Node */}
        <g transform="translate(60, 160)">
          <circle cx="0" cy="0" r="10" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" />
          <circle cx="0" cy="0" r="4" fill="currentColor" opacity="0.8" />
        </g>

        {/* Central Orchestration Core */}
        <g transform="translate(160, 160)">
          <circle cx="0" cy="0" r="22" stroke="currentColor" strokeWidth="1.5" fill="var(--background)" opacity="0.9" />
          <circle cx="0" cy="0" r="14" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
          <polygon points="0,-7 6,4 -6,4" fill="currentColor" opacity="0.9" />
        </g>
      </svg>
    </div>
  );
};

export default EnterpriseAiAnimation;
