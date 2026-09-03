import React from 'react';

const HeroWindowTreeAnimation = ({ className = "" }) => {
  return (
    <div className={`relative select-none pointer-events-none flex items-center justify-center ${className}`}>
      <style>{`
        /* Gentle wind gusts flowing through window */
        @keyframes windDrift {
          0% {
            stroke-dashoffset: 200;
            opacity: 0;
            transform: translateX(-15px);
          }
          30% {
            opacity: 0.65;
          }
          70% {
            opacity: 0.65;
          }
          100% {
            stroke-dashoffset: 0;
            opacity: 0;
            transform: translateX(25px);
          }
        }

        /* Subtle curtain billowing in breeze */
        @keyframes curtainBillow {
          0%, 100% {
            transform: skewX(0deg) scaleX(1);
          }
          50% {
            transform: skewX(-4deg) scaleX(1.04) translateX(-4px);
          }
        }

        /* Tree branch breathing in the wind */
        @keyframes branchBreathe {
          0%, 100% {
            transform: rotate(0deg);
          }
          50% {
            transform: rotate(1.6deg) translateY(-2px);
          }
        }

        /* Leaves falling from tree branches to ground */
        @keyframes heroLeafFall1 {
          0% {
            transform: translate(110px, 80px) rotate(0deg) scale(0.9);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
          }
          45% {
            transform: translate(75px, 140px) rotate(110deg) scale(0.95);
          }
          75% {
            transform: translate(95px, 210px) rotate(220deg) scale(0.9);
            opacity: 0.85;
          }
          100% {
            transform: translate(65px, 275px) rotate(310deg) scale(0.85);
            opacity: 0;
          }
        }

        @keyframes heroLeafFall2 {
          0% {
            transform: translate(140px, 95px) rotate(20deg) scale(0.85);
            opacity: 0;
          }
          12% {
            opacity: 0.8;
          }
          50% {
            transform: translate(175px, 160px) rotate(-120deg) scale(0.9);
          }
          80% {
            transform: translate(145px, 225px) rotate(-240deg) scale(0.85);
            opacity: 0.8;
          }
          100% {
            transform: translate(180px, 280px) rotate(-340deg) scale(0.8);
            opacity: 0;
          }
        }

        @keyframes heroLeafFall3 {
          0% {
            transform: translate(90px, 110px) rotate(-10deg) scale(0.8);
            opacity: 0;
          }
          18% {
            opacity: 0.75;
          }
          40% {
            transform: translate(50px, 165px) rotate(90deg) scale(0.85);
          }
          70% {
            transform: translate(80px, 220px) rotate(190deg) scale(0.8);
            opacity: 0.75;
          }
          100% {
            transform: translate(40px, 278px) rotate(280deg) scale(0.75);
            opacity: 0;
          }
        }

        @keyframes heroLeafFall4 {
          0% {
            transform: translate(165px, 120px) rotate(45deg) scale(0.75);
            opacity: 0;
          }
          20% {
            opacity: 0.7;
          }
          55% {
            transform: translate(195px, 185px) rotate(160deg) scale(0.8);
          }
          85% {
            transform: translate(170px, 240px) rotate(290deg) scale(0.75);
            opacity: 0.7;
          }
          100% {
            transform: translate(205px, 280px) rotate(390deg) scale(0.7);
            opacity: 0;
          }
        }

        .anim-breeze-1 {
          stroke-dasharray: 40 80;
          animation: windDrift 4.5s ease-in-out infinite;
        }

        .anim-breeze-2 {
          stroke-dasharray: 50 70;
          animation: windDrift 5.2s ease-in-out infinite;
          animation-delay: 1.8s;
        }

        .anim-breeze-3 {
          stroke-dasharray: 30 90;
          animation: windDrift 4.0s ease-in-out infinite;
          animation-delay: 2.7s;
        }

        .anim-curtain {
          transform-origin: top center;
          animation: curtainBillow 6s ease-in-out infinite;
        }

        .anim-tree {
          transform-origin: 130px 280px;
          animation: branchBreathe 7s ease-in-out infinite;
        }

        .leaf-drop-1 {
          animation: heroLeafFall1 7.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .leaf-drop-2 {
          animation: heroLeafFall2 8.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 2.2s;
        }

        .leaf-drop-3 {
          animation: heroLeafFall3 9.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 4.5s;
        }

        .leaf-drop-4 {
          animation: heroLeafFall4 8.0s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          animation-delay: 5.8s;
        }
      `}</style>

      <svg
        viewBox="0 0 260 300"
        className="w-full h-full max-w-[320px] max-h-[360px] md:max-w-[360px] md:max-h-[400px] text-foreground"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ================= MINIMALIST GROUND LINE ================= */}
        <g stroke="currentColor" strokeLinecap="round" opacity="0.35">
          <line x1="20" y1="280" x2="240" y2="280" strokeWidth="1.2" />
        </g>

        {/* ================= WIND BREEZE STREAMLINES ================= */}
        <g stroke="currentColor" strokeWidth="1" strokeLinecap="round" fill="none" opacity="0.5">
          <path d="M 20 110 Q 80 95 150 115 T 240 105" className="anim-breeze-1" />
          <path d="M 15 155 Q 75 140 145 160 T 245 145" className="anim-breeze-2" />
          <path d="M 30 205 Q 90 195 160 215 T 235 200" className="anim-breeze-3" />
        </g>

        {/* ================= MINIMALIST TREE / BONSAI BRANCH ================= */}
        <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" className="anim-tree">
          {/* Main Trunk reaching upwards from pot/sill */}
          <path
            d="M 130 280 Q 132 245 125 210 Q 118 175 128 140 Q 134 115 128 85"
            strokeWidth="1.8"
            opacity="0.65"
          />

          {/* Primary Left Branches */}
          <path
            d="M 125 210 Q 105 190 85 185 Q 70 180 55 188"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <path
            d="M 127 160 Q 105 145 88 135 Q 75 128 65 132"
            strokeWidth="1.1"
            opacity="0.6"
          />

          {/* Primary Right Branches */}
          <path
            d="M 126 185 Q 150 170 175 172 Q 192 174 205 168"
            strokeWidth="1.2"
            opacity="0.6"
          />
          <path
            d="M 128 135 Q 155 118 180 115 Q 195 112 208 118"
            strokeWidth="1.1"
            opacity="0.6"
          />

          {/* Upper Canopy Twigs */}
          <path d="M 128 85 Q 115 65 102 58" strokeWidth="1" opacity="0.55" />
          <path d="M 128 85 Q 142 62 158 54" strokeWidth="1" opacity="0.55" />
          <path d="M 130 70 L 132 45" strokeWidth="0.9" opacity="0.55" />

          {/* Delicate Botanical Leaves attached to Branches */}
          {/* Left Leaf Clusters */}
          <g strokeWidth="1" opacity="0.55">
            <path d="M 55 188 C 50 182, 45 185, 48 192 C 52 195, 56 192, 55 188 Z" />
            <path d="M 70 180 C 65 172, 60 175, 63 182 C 67 186, 72 183, 70 180 Z" />
            <path d="M 65 132 C 58 126, 54 130, 58 137 C 62 140, 68 136, 65 132 Z" />
            <path d="M 88 135 C 82 125, 78 130, 82 138 C 86 142, 90 138, 88 135 Z" />
            <path d="M 102 58 C 95 50, 90 55, 94 62 C 98 66, 104 62, 102 58 Z" />
          </g>

          {/* Right Leaf Clusters */}
          <g strokeWidth="1" opacity="0.55">
            <path d="M 205 168 C 212 162, 216 166, 212 173 C 208 177, 202 173, 205 168 Z" />
            <path d="M 175 172 C 182 164, 186 168, 183 176 C 178 180, 173 176, 175 172 Z" />
            <path d="M 208 118 C 215 112, 218 116, 215 123 C 210 127, 205 123, 208 118 Z" />
            <path d="M 180 115 C 188 106, 192 110, 188 118 C 184 122, 178 118, 180 115 Z" />
            <path d="M 158 54 C 166 46, 170 50, 167 58 C 162 62, 156 58, 158 54 Z" />
            <path d="M 132 45 C 138 36, 142 40, 139 48 C 135 52, 130 48, 132 45 Z" />
          </g>

          {/* Center Canopy Foliage */}
          <g strokeWidth="0.9" opacity="0.5">
            <path d="M 112 105 C 106 98, 103 103, 107 109 C 111 112, 115 109, 112 105 Z" />
            <path d="M 145 100 C 152 92, 155 97, 152 104 C 147 108, 142 104, 145 100 Z" />
            <path d="M 122 135 C 115 128, 112 132, 116 139 C 120 142, 125 138, 122 135 Z" />
          </g>
        </g>

        {/* ================= CONTINUOUSLY DETACHING & FALLING LEAVES ================= */}
        {/* Leaf 1 Falling */}
        <g className="leaf-drop-1" stroke="currentColor" strokeWidth="1" fill="none">
          <path d="M 0 -8 C -6 -2, -6 6, 0 10 C 6 6, 6 -2, 0 -8 Z" />
          <line x1="0" y1="-8" x2="0" y2="10" strokeWidth="0.6" opacity="0.6" />
        </g>

        {/* Leaf 2 Falling */}
        <g className="leaf-drop-2" stroke="currentColor" strokeWidth="1" fill="none">
          <path d="M 0 -7 C -5 -1, -5 5, 0 8 C 5 5, 5 -1, 0 -7 Z" />
          <line x1="0" y1="-7" x2="0" y2="8" strokeWidth="0.5" opacity="0.6" />
        </g>

        {/* Leaf 3 Falling */}
        <g className="leaf-drop-3" stroke="currentColor" strokeWidth="0.9" fill="none">
          <path d="M 0 -6 C -4 -1, -4 4, 0 7 C 4 4, 4 -1, 0 -6 Z" />
          <line x1="0" y1="-6" x2="0" y2="7" strokeWidth="0.5" opacity="0.6" />
        </g>

        {/* Leaf 4 Falling */}
        <g className="leaf-drop-4" stroke="currentColor" strokeWidth="0.9" fill="none">
          <path d="M 0 -7 C -5 -2, -5 4, 0 8 C 5 4, 5 -2, 0 -7 Z" />
          <line x1="0" y1="-7" x2="0" y2="8" strokeWidth="0.5" opacity="0.6" />
        </g>

        {/* ================= GROUND SETTLED LEAVES ALONG SILL ================= */}
        <g stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5">
          {/* Settled Leaf Left */}
          <path d="M 68 277 C 62 274, 60 279, 65 281 C 70 282, 72 278, 68 277 Z" />
          {/* Settled Leaf Center-Left */}
          <path d="M 105 278 C 98 275, 96 280, 102 282 C 108 283, 110 279, 105 278 Z" />
          {/* Settled Leaf Center-Right */}
          <path d="M 160 278 C 166 274, 169 279, 164 282 C 158 283, 156 279, 160 278 Z" />
          {/* Settled Leaf Right */}
          <path d="M 195 277 C 202 275, 204 280, 198 282 C 192 283, 190 278, 195 277 Z" />
        </g>
      </svg>
    </div>
  );
};

export default HeroWindowTreeAnimation;
