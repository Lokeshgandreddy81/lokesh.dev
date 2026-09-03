import React from 'react';

const CortexLogo = ({ className = "w-12 h-12", color = "currentColor" }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background dashed pill ring */}
      <circle
        cx="50"
        cy="50"
        r="33"
        stroke={color}
        strokeWidth="2.5"
        strokeDasharray="14 10"
        strokeLinecap="round"
        opacity="0.45"
      />

      {/* Vertical Leaf / Almond Petal */}
      <path
        d="M 50 8 C 66 30, 66 70, 50 92 C 34 70, 34 30, 50 8 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Horizontal Leaf / Almond Petal */}
      <path
        d="M 8 50 C 30 34, 70 34, 92 50 C 70 66, 30 66, 8 50 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Central Solid Intelligence Core Circle */}
      <circle cx="50" cy="50" r="4.5" fill={color} />
    </svg>
  );
};

export default CortexLogo;
