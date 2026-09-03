import React from 'react';

/**
 * HireCircleLogo
 * The blueprint coordinate grid with concentric radar rings
 * matching the HireCircle splash & app icon.
 */
const HireCircleLogo = ({ className = "w-16 h-16", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 1024 1024"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="HireCircle Logo"
    >
      {/* Background Blueprint Grid Lines */}
      <g stroke={color} strokeWidth="12" opacity="0.32">
        {/* Vertical Grid Lines */}
        <line x1="171" y1="0" x2="171" y2="1024" />
        <line x1="341" y1="0" x2="341" y2="1024" />
        <line x1="512" y1="0" x2="512" y2="1024" />
        <line x1="683" y1="0" x2="683" y2="1024" />
        <line x1="853" y1="0" x2="853" y2="1024" />

        {/* Horizontal Grid Lines */}
        <line x1="0" y1="171" x2="1024" y2="171" />
        <line x1="0" y1="341" x2="1024" y2="341" />
        <line x1="0" y1="512" x2="1024" y2="512" />
        <line x1="0" y1="683" x2="1024" y2="683" />
        <line x1="0" y1="853" x2="1024" y2="853" />
      </g>

      {/* HireCircle Concentric Radar Rings */}
      <g stroke={color} strokeWidth="20">
        {/* Outer Ring */}
        <circle cx="512" cy="512" r="308" fill="none" opacity="0.88" />
        {/* Middle Ring */}
        <circle cx="512" cy="512" r="225" fill="none" opacity="0.95" />
        {/* Inner Ring */}
        <circle cx="512" cy="512" r="118" strokeWidth="22" fill="none" />
      </g>
    </svg>
  );
};

export default HireCircleLogo;
