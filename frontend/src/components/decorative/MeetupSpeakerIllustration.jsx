import React from 'react';

const MeetupSpeakerIllustration = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-center p-6 ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full max-w-[220px] max-h-[220px] md:max-w-[260px] md:max-h-[260px]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4">
          {/* Studio Condenser Microphone Capsule */}
          <rect x="85" y="45" width="30" height="54" rx="15" fill="none" strokeWidth="1.4" />
          
          {/* Microphone Inner Mesh Grid Lines */}
          <line x1="85" y1="65" x2="115" y2="65" strokeWidth="1" opacity="0.6" />
          <line x1="85" y1="75" x2="115" y2="75" strokeWidth="1" opacity="0.6" />
          <line x1="100" y1="45" x2="100" y2="99" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

          {/* Microphone U-Shaped Cradle Mount */}
          <path d="M 72 75 C 72 118, 128 118, 128 75" strokeWidth="1.4" />

          {/* Mic Stand Post & Base */}
          <line x1="100" y1="114" x2="100" y2="152" strokeWidth="1.5" />
          <ellipse cx="100" cy="154" rx="28" ry="8" strokeWidth="1.4" />
          <line x1="72" y1="154" x2="128" y2="154" strokeWidth="1" opacity="0.4" />

          {/* Concentric Radiating Broadcast Signal & Neural Nodes */}
          {/* Left Signal Arcs */}
          <path d="M 62 60 A 42 42 0 0 0 62 100" strokeDasharray="4 4" opacity="0.7" />
          <path d="M 48 48 A 62 62 0 0 0 48 112" opacity="0.5" />
          <path d="M 34 36 A 82 82 0 0 0 34 124" strokeDasharray="2 4" opacity="0.35" />

          {/* Right Signal Arcs */}
          <path d="M 138 60 A 42 42 0 0 1 138 100" strokeDasharray="4 4" opacity="0.7" />
          <path d="M 152 48 A 62 62 0 0 1 152 112" opacity="0.5" />
          <path d="M 166 36 A 82 82 0 0 1 166 124" strokeDasharray="2 4" opacity="0.35" />

          {/* Interconnected Knowledge / Neural Nodes */}
          <circle cx="48" cy="48" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="152" cy="48" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="34" cy="80" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="166" cy="80" r="2" fill="currentColor" opacity="0.6" />
          <circle cx="48" cy="112" r="2.5" fill="currentColor" opacity="0.8" />
          <circle cx="152" cy="112" r="2.5" fill="currentColor" opacity="0.8" />

          {/* Subtle Connecting Vector Rays */}
          <line x1="48" y1="48" x2="72" y2="65" strokeDasharray="3 3" opacity="0.4" />
          <line x1="152" y1="48" x2="128" y2="65" strokeDasharray="3 3" opacity="0.4" />
          <line x1="48" y1="112" x2="72" y2="95" strokeDasharray="3 3" opacity="0.4" />
          <line x1="152" y1="112" x2="128" y2="95" strokeDasharray="3 3" opacity="0.4" />
        </g>
      </svg>
    </div>
  );
};

export default MeetupSpeakerIllustration;
