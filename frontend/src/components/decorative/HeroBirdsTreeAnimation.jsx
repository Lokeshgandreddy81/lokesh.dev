import React from 'react';

const HeroBirdsTreeAnimation = ({ className = "", cowSurprised = false }) => {
  return (
    <div className={`relative select-none pointer-events-none flex items-end justify-center ${className}`}>
      <style>{`
        /* ================= BIRD 1: MAIN SCOUT (LANDS ON RIGHT BRANCH) ================= */
        @keyframes bird1Flight {
          0% {
            transform: translate(-40px, 30px) rotate(18deg);
            opacity: 0;
          }
          10% {
            opacity: 0.95;
            transform: translate(40px, 60px) rotate(14deg);
          }
          25% {
            transform: translate(140px, 100px) rotate(6deg);
          }
          40% {
            transform: translate(220px, 160px) rotate(-4deg);
          }
          50% {
            transform: translate(270px, 218px) rotate(-18deg);
          }
          56% {
            /* Touchdown on right branch */
            transform: translate(282px, 238px) rotate(0deg);
          }
          /* Perched State (56% to 84%) */
          60%, 68%, 76%, 84% {
            transform: translate(282px, 238px) rotate(0deg);
          }
          64%, 80% {
            transform: translate(282px, 236px) rotate(-2deg);
          }
          72% {
            transform: translate(282px, 239px) rotate(1deg);
          }
          /* Take off */
          87% {
            transform: translate(290px, 225px) rotate(-22deg);
          }
          95% {
            opacity: 0.95;
            transform: translate(370px, 150px) rotate(-15deg);
          }
          100% {
            transform: translate(460px, 80px) rotate(-12deg);
            opacity: 0;
          }
        }

        @keyframes bird1Wings {
          0%, 4%, 8%, 12%, 16%, 20%, 24%, 28%, 32%, 36%, 40%, 44%, 48% {
            transform: scaleY(-0.7) rotate(22deg);
          }
          2%, 6%, 10%, 14%, 18%, 22%, 26%, 30%, 34%, 38%, 42%, 46%, 50% {
            transform: scaleY(0.9) rotate(-18deg);
          }
          52%, 54% {
            transform: scaleY(1.1) rotate(-35deg);
          }
          56%, 85% {
            transform: scaleY(0.15) rotate(5deg) translateX(1px);
          }
          86%, 90%, 94%, 98% {
            transform: scaleY(-0.7) rotate(22deg);
          }
          88%, 92%, 96%, 100% {
            transform: scaleY(0.9) rotate(-18deg);
          }
        }

        /* Reactive spring on right branch */
        @keyframes rightBranchSpring {
          0%, 54% { transform: rotate(0deg); }
          57% { transform: rotate(2.2deg) translateY(3px); }
          62% { transform: rotate(-1.1deg) translateY(-1px); }
          66% { transform: rotate(0.5deg) translateY(1px); }
          70%, 85% { transform: rotate(0deg); }
          88% { transform: rotate(-1.5deg) translateY(-2px); }
          94%, 100% { transform: rotate(0deg); }
        }

        /* ================= BIRD 2: SMALL SPARROW (LANDS ON LEFT BRANCH) ================= */
        @keyframes bird2SparrowFlight {
          0% {
            transform: translate(440px, 110px) rotate(-20deg) scale(0.65);
            opacity: 0;
          }
          12% {
            opacity: 0.9;
            transform: translate(320px, 150px) rotate(-14deg) scale(0.65);
          }
          28% {
            transform: translate(210px, 210px) rotate(-6deg) scale(0.65);
          }
          40% {
            /* Landing on left perch at (104, 288) */
            transform: translate(104px, 288px) rotate(0deg) scale(0.65);
          }
          /* Perched on left branch */
          44%, 52%, 60%, 68% {
            transform: translate(104px, 288px) rotate(0deg) scale(0.65);
          }
          48%, 64% {
            transform: translate(104px, 286px) rotate(-3deg) scale(0.65);
          }
          56% {
            transform: translate(104px, 289px) rotate(2deg) scale(0.65);
          }
          /* Quick hop and takeoff */
          72% {
            transform: translate(95px, 275px) rotate(-25deg) scale(0.65);
          }
          84% {
            transform: translate(20px, 210px) rotate(-18deg) scale(0.65);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50px, 140px) rotate(-15deg) scale(0.65);
            opacity: 0;
          }
        }

        @keyframes bird2SparrowWings {
          0%, 3%, 6%, 9%, 12%, 15%, 18%, 21%, 24%, 27%, 30%, 33%, 36% {
            transform: scaleY(-0.8) rotate(26deg);
          }
          1.5%, 4.5%, 7.5%, 10.5%, 13.5%, 16.5%, 19.5%, 22.5%, 25.5%, 28.5%, 31.5%, 34.5% {
            transform: scaleY(0.9) rotate(-22deg);
          }
          /* Perched folded */
          40%, 70% {
            transform: scaleY(0.12) rotate(4deg);
          }
          /* Fluttering off */
          72%, 75%, 78%, 81%, 84%, 87%, 90%, 93%, 96%, 99% {
            transform: scaleY(-0.8) rotate(26deg);
          }
          73.5%, 76.5%, 79.5%, 82.5%, 85.5%, 88.5%, 91.5%, 94.5%, 97.5% {
            transform: scaleY(0.9) rotate(-22deg);
          }
        }

        /* Reactive spring on left branch */
        @keyframes leftBranchSpring {
          0%, 38% { transform: rotate(0deg); }
          41% { transform: rotate(-2deg) translateY(2px); }
          46% { transform: rotate(1deg) translateY(-1px); }
          50%, 70% { transform: rotate(0deg); }
          73% { transform: rotate(-1.5deg) translateY(-1.5px); }
          78%, 100% { transform: rotate(0deg); }
        }

        /* ================= BIRD 3: FORK-TAILED SWALLOW (HIGH ACROBATIC) ================= */
        @keyframes swallowAcrobatic {
          0% {
            transform: translate(-50px, 50px) rotate(22deg) scale(0.75);
            opacity: 0;
          }
          15% {
            opacity: 0.85;
            transform: translate(80px, 95px) rotate(8deg) scale(0.75);
          }
          35% {
            transform: translate(220px, 120px) rotate(-16deg) scale(0.75);
          }
          55% {
            transform: translate(320px, 70px) rotate(-28deg) scale(0.75);
          }
          75% {
            transform: translate(380px, 40px) rotate(-10deg) scale(0.72);
            opacity: 0.85;
          }
          100% {
            transform: translate(470px, 20px) rotate(-5deg) scale(0.7);
            opacity: 0;
          }
        }

        @keyframes swallowWings {
          0%, 5%, 10%, 15%, 45%, 50%, 55%, 60% {
            transform: scaleY(-0.7) rotate(28deg);
          }
          2.5%, 7.5%, 12.5%, 17.5%, 47.5%, 52.5%, 57.5%, 62.5% {
            transform: scaleY(0.95) rotate(-20deg);
          }
          20%, 42%, 65%, 100% {
            transform: scaleY(0.3) rotate(-8deg); /* Long gliding swoop */
          }
        }

        /* ================= BIRD 4: TINY HOVERING HUMMINGBIRD ================= */
        @keyframes hummingbirdHover {
          0% {
            transform: translate(380px, 160px) rotate(-15deg) scale(0.48);
            opacity: 0;
          }
          15% {
            opacity: 0.8;
            transform: translate(250px, 175px) rotate(-5deg) scale(0.48);
          }
          /* Hovering near canopy leaves at (175, 170) */
          30%, 40%, 50%, 60% {
            transform: translate(175px, 170px) rotate(5deg) scale(0.48);
          }
          35%, 55% {
            transform: translate(173px, 167px) rotate(8deg) scale(0.48);
          }
          45% {
            transform: translate(177px, 173px) rotate(2deg) scale(0.48);
          }
          /* Rapid dart away */
          75% {
            transform: translate(90px, 110px) rotate(-25deg) scale(0.48);
            opacity: 0.8;
          }
          100% {
            transform: translate(-30px, 60px) rotate(-30deg) scale(0.45);
            opacity: 0;
          }
        }

        @keyframes rapidFlutter {
          0%, 100% { transform: scaleY(-0.9) rotate(35deg); }
          50% { transform: scaleY(0.9) rotate(-35deg); }
        }

        /* ================= BIRDS 5 & 6: DISTANT SKY SOARING PAIR ================= */
        @keyframes distantPairFlight {
          0% {
            transform: translate(450px, 25px) rotate(-8deg) scale(0.4);
            opacity: 0;
          }
          10% { opacity: 0.65; }
          45% { transform: translate(210px, 45px) rotate(-3deg) scale(0.4); }
          80% { opacity: 0.65; }
          100% {
            transform: translate(-50px, 20px) rotate(5deg) scale(0.38);
            opacity: 0;
          }
        }

        @keyframes distantGliderWings {
          0%, 8%, 16%, 60%, 68% { transform: scaleY(-0.6) rotate(18deg); }
          4%, 12%, 20%, 64%, 72% { transform: scaleY(0.7) rotate(-15deg); }
          22%, 58%, 74%, 100% { transform: scaleY(0.2) rotate(-2deg); }
        }

        /* Tree and leaves */
        @keyframes treeBreezeSway {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(1.1deg) translateY(-1px); }
        }

        @keyframes windStream {
          0% { stroke-dashoffset: 260; opacity: 0; transform: translateX(-20px); }
          30%, 70% { opacity: 0.55; }
          100% { stroke-dashoffset: 0; opacity: 0; transform: translateX(30px); }
        }

        @keyframes fallingLeafDrop1 {
          0% { transform: translate(160px, 280px) rotate(0deg) scale(0.85); opacity: 0; }
          15% { opacity: 0.8; }
          50% { transform: translate(120px, 360px) rotate(140deg) scale(0.9); }
          85% { opacity: 0.8; }
          100% { transform: translate(150px, 478px) rotate(320deg) scale(0.8); opacity: 0.2; }
        }

        @keyframes fallingLeafDrop2 {
          0% { transform: translate(250px, 290px) rotate(20deg) scale(0.8); opacity: 0; }
          15% { opacity: 0.75; }
          55% { transform: translate(295px, 380px) rotate(-150deg) scale(0.85); }
          85% { opacity: 0.75; }
          100% { transform: translate(270px, 478px) rotate(-310deg) scale(0.75); opacity: 0.2; }
        }

        .anim-bird-1 {
          animation: bird1Flight 15s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
          will-change: transform, opacity;
        }
        .anim-wings-1 {
          transform-origin: 10px 5px;
          animation: bird1Wings 15s ease-in-out infinite;
          will-change: transform;
        }

        .anim-bird-2 {
          animation: bird2SparrowFlight 16s cubic-bezier(0.25, 0.1, 0.25, 1) infinite;
          animation-delay: 4.5s;
          will-change: transform, opacity;
        }
        .anim-wings-2 {
          transform-origin: 8px 4px;
          animation: bird2SparrowWings 16s ease-in-out infinite;
          animation-delay: 4.5s;
          will-change: transform;
        }

        .anim-bird-3 {
          animation: swallowAcrobatic 14s ease-in-out infinite;
          animation-delay: 1.5s;
          will-change: transform, opacity;
        }
        .anim-wings-3 {
          transform-origin: 9px 4px;
          animation: swallowWings 14s ease-in-out infinite;
          animation-delay: 1.5s;
          will-change: transform;
        }

        .anim-bird-4 {
          animation: hummingbirdHover 13s ease-in-out infinite;
          animation-delay: 7s;
          will-change: transform, opacity;
        }
        .anim-wings-4 {
          transform-origin: 6px 3px;
          animation: rapidFlutter 0.18s ease-in-out infinite;
          will-change: transform;
        }

        .anim-bird-5 {
          animation: distantPairFlight 20s ease-in-out infinite;
          animation-delay: 2s;
          will-change: transform, opacity;
        }
        .anim-wings-5 {
          transform-origin: 6px 3px;
          animation: distantGliderWings 20s ease-in-out infinite;
          animation-delay: 2s;
          will-change: transform;
        }

        .anim-bird-6 {
          animation: distantPairFlight 20s ease-in-out infinite;
          animation-delay: 3.2s; /* Following closely in formation */
          will-change: transform, opacity;
        }

        .anim-right-branch {
          transform-origin: 200px 295px;
          animation: rightBranchSpring 15s ease-out infinite;
          will-change: transform;
        }

        .anim-left-branch {
          transform-origin: 196px 325px;
          animation: leftBranchSpring 16s ease-out infinite;
          animation-delay: 4.5s;
          will-change: transform;
        }

        .anim-tree-sway {
          transform-origin: 200px 480px;
          animation: treeBreezeSway 8s ease-in-out infinite;
        }

        .anim-wind-1 {
          stroke-dasharray: 60 100;
          animation: windStream 5s ease-in-out infinite;
        }
        .anim-wind-2 {
          stroke-dasharray: 80 80;
          animation: windStream 6s ease-in-out infinite;
          animation-delay: 2.2s;
        }

        .anim-leaf-1 {
          animation: fallingLeafDrop1 8.5s ease-in-out infinite;
        }
        .anim-leaf-2 {
          animation: fallingLeafDrop2 9.5s ease-in-out infinite;
          animation-delay: 3.5s;
        }

        /* ================= COW GRAZING & LEAF EATING ANIMATIONS ================= */
        @keyframes cowGrazeCycle {
          0%, 100% {
            /* Head down at ground leaf */
            transform: rotate(0deg);
          }
          12%, 18% {
            /* Dipping down to bite falling leaf */
            transform: rotate(5deg) translateY(3px);
          }
          26% {
            /* Lifting head slightly to chew */
            transform: rotate(-8deg) translateY(-4px);
          }
          32%, 42%, 52%, 62% {
            /* Chewing rhythm */
            transform: rotate(-6deg) translateY(-5px);
          }
          37%, 47%, 57%, 67% {
            transform: rotate(-9deg) translateY(-3px);
          }
          75% {
            /* Looking up peacefully at the tree & birds */
            transform: rotate(-13deg) translateY(-7px);
          }
          85% {
            /* Returning down to graze */
            transform: rotate(-4deg) translateY(-2px);
          }
        }

        @keyframes cowTailSwish {
          0%, 100% { transform: rotate(0deg); }
          20% { transform: rotate(-14deg); }
          40% { transform: rotate(8deg); }
          60% { transform: rotate(-18deg); }
          80% { transform: rotate(4deg); }
        }

        @keyframes cowChewLeaf {
          0%, 100% { transform: rotate(0deg) scale(1); opacity: 0.9; }
          30%, 50%, 70% { transform: rotate(8deg) scale(0.95); opacity: 0.95; }
          40%, 60%, 80% { transform: rotate(-6deg) scale(1.05); opacity: 0.95; }
        }

        .anim-cow-head {
          transform-origin: 145px 440px;
          animation: cowGrazeCycle 8.5s ease-in-out infinite;
        }

        .anim-cow-tail {
          transform-origin: 84px 438px;
          animation: cowTailSwish 4s ease-in-out infinite;
        }

        .anim-nibble-leaf {
          transform-origin: 167px 471px;
          animation: cowChewLeaf 1.8s ease-in-out infinite;
        }

        /* Cow surprise reaction when playfully hit */
        @keyframes cowSurpriseHop {
          0% { transform: translateY(0) scale(1); }
          20% { transform: translateY(-12px) rotate(-3deg) scale(1.08); }
          40% { transform: translateY(-4px) rotate(2deg) scale(1.03); }
          60% { transform: translateY(-1px) scale(1); }
          80% { transform: translateY(-3px) scale(1.01); }
          100% { transform: translateY(0) scale(1); }
        }

        .anim-cow-surprised {
          animation: cowSurpriseHop 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          transform-origin: 110px 470px;
        }

        @keyframes surprisePopBubble {
          0% { opacity: 0; transform: translateY(6px) scale(0.6); }
          20% { opacity: 1; transform: translateY(-6px) scale(1.15); }
          75% { opacity: 1; transform: translateY(-10px) scale(1); }
          100% { opacity: 0; transform: translateY(-18px) scale(0.8); }
        }

        .anim-surprise-bubble {
          animation: surprisePopBubble 1.5s ease-out forwards;
          transform-origin: 155px 420px;
        }
      `}</style>

      <svg
        id="hero-tree-svg"
        viewBox="0 0 420 500"
        className="w-full h-full max-w-[420px] max-h-[500px] md:max-w-[460px] md:max-h-[540px] text-foreground overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="heroGroundGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
            <stop offset="15%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="35%" stopColor="currentColor" stopOpacity="0.4" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* ================= BACKGROUND BREEZE STREAMLINES ================= */}
        <g stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.35">
          <path d="M 20 55 Q 140 30 270 70 T 400 50" className="anim-wind-1" />
          <path d="M 50 115 Q 170 95 290 130 T 410 105" className="anim-wind-2" />
          <path d="M 30 295 Q 130 280 230 310 T 390 290" className="anim-wind-1" />
        </g>

        {/* ================= DISTANT SKY SOARING PAIR (BIRDS 5 & 6) ================= */}
        <g className="anim-bird-5" stroke="currentColor" strokeLinecap="round" opacity="0.6">
          <path d="M 0 0 C 4 -2, 10 -1, 14 0 C 10 2, 4 2, 0 0 Z" strokeWidth="1.1" />
          <g className="anim-wings-5" strokeWidth="1">
            <path d="M 5 0 C 7 -9, 11 -13, 14 -14 C 10 -10, 8 -3, 7 0 Z" />
          </g>
        </g>
        <g className="anim-bird-6" stroke="currentColor" strokeLinecap="round" opacity="0.5">
          <path d="M 0 0 C 3 -2, 9 -1, 12 0 C 9 2, 3 2, 0 0 Z" strokeWidth="1" />
          <g className="anim-wings-5" strokeWidth="0.9">
            <path d="M 4 0 C 6 -8, 10 -11, 12 -12 C 9 -9, 7 -2, 6 0 Z" />
          </g>
        </g>

        {/* ================= BIRD 3: FORK-TAILED SWALLOW (HIGH ACROBATIC) ================= */}
        <g className="anim-bird-3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Streamlined body */}
          <path d="M 0 0 C 4 -2.5, 14 -2, 18 0 C 13 2.5, 4 2.5, 0 0 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.08" />
          <path d="M 18 0 L 22 -0.2" strokeWidth="1.1" />
          {/* Distinctive Forked Swallow Tail */}
          <path d="M 0 0 L -8 -5 M 0 0 L -4 0 M 0 0 L -8 5" strokeWidth="1.1" />
          {/* Swept Back Wings */}
          <g className="anim-wings-3" strokeWidth="1.2">
            <path d="M 6 -1 C 9 -14, 17 -22, 23 -24 C 17 -17, 12 -6, 10 0 Z" fill="currentColor" fillOpacity="0.1" />
            <path d="M 6 0 C 8 10, 15 17, 20 19 C 14 13, 11 4, 9 0 Z" opacity="0.7" />
          </g>
        </g>

        {/* ================= BIRD 4: TINY HOVERING HUMMINGBIRD ================= */}
        <g className="anim-bird-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Tiny Body & Long Needle Beak */}
          <path d="M 0 0 C 3 -2, 9 -1, 13 0 C 9 2, 3 2, 0 0 Z" strokeWidth="1.2" fill="currentColor" fillOpacity="0.12" />
          <path d="M 13 0 L 20 -0.5" strokeWidth="1.1" />
          <path d="M 0 0 L -5 -1 M 0 0 L -5 1" strokeWidth="1" />
          {/* Rapid Flutter Wings */}
          <g className="anim-wings-4" strokeWidth="1.2">
            <path d="M 5 -1 C 8 -12, 13 -16, 17 -17 C 12 -12, 9 -4, 8 0 Z" fill="currentColor" fillOpacity="0.15" />
          </g>
        </g>

        {/* ================= TREE STRUCTURE & BRANCHES ================= */}
        <g className="anim-tree-sway" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Target points for coordinate measurement */}
          <circle id="hero-tree-base" cx="198" cy="480" r="1.5" opacity="0" pointerEvents="none" />
          <circle id="hero-branch-seat" cx="230" cy="340" r="1.5" opacity="0" pointerEvents="none" />

          {/* Main Trunk rising from ground */}
          <path
            d="M 200 480 Q 202 430 195 385 Q 188 340 198 295 Q 205 260 200 220"
            strokeWidth="2.2"
            opacity="0.7"
          />

          {/* Lower Left Main Branch */}
          <path
            d="M 195 385 Q 165 365 140 360 Q 115 355 90 368"
            strokeWidth="1.5"
            opacity="0.65"
          />
          <path d="M 140 360 Q 120 335 95 330" strokeWidth="1.1" opacity="0.6" />

          {/* Lower Right Branch */}
          <path
            d="M 196 360 Q 230 340 268 342 Q 295 344 320 336"
            strokeWidth="1.4"
            opacity="0.65"
          />
          <path d="M 268 342 Q 290 315 318 310" strokeWidth="1.1" opacity="0.6" />

          {/* Upper Canopy Twigs */}
          <path d="M 200 220 Q 180 185 158 172" strokeWidth="1.2" opacity="0.6" />
          <path d="M 200 220 Q 225 180 252 165" strokeWidth="1.2" opacity="0.6" />
          <path d="M 200 195 L 202 155" strokeWidth="1" opacity="0.6" />

          {/* ================= LEFT PERCH BRANCH (FOR SPARROW / BIRD 2) ================= */}
          <g className="anim-left-branch">
            <path
              d="M 196 325 Q 165 305 138 295 Q 118 288 102 290"
              strokeWidth="1.4"
              opacity="0.75"
            />
            {/* Little Perch Twig */}
            <path d="M 118 288 Q 108 284 96 288" strokeWidth="1.1" opacity="0.8" />
            <path d="M 102 290 C 94 282, 88 287, 92 295 C 98 299, 104 295, 102 290 Z" strokeWidth="0.9" opacity="0.6" />
          </g>

          {/* ================= RIGHT PERCH BRANCH (FOR MAIN BIRD 1) ================= */}
          <g id="hero-tree-perch" className="anim-right-branch">
            <path
              d="M 198 295 Q 235 270 270 258 Q 285 252 305 255"
              strokeWidth="1.5"
              opacity="0.75"
            />
            <path d="M 270 258 Q 282 248 298 245" strokeWidth="1.2" opacity="0.8" />
            <path d="M 305 255 C 314 246, 320 252, 315 261 C 309 266, 301 261, 305 255 Z" strokeWidth="1" opacity="0.6" />
            <path d="M 298 245 C 307 236, 312 242, 308 250 C 302 254, 295 250, 298 245 Z" strokeWidth="0.9" opacity="0.6" />
          </g>

          {/* Leaf Clusters along branches */}
          <g strokeWidth="1" opacity="0.6">
            <path d="M 90 368 C 82 360, 76 365, 80 374 C 86 378, 92 374, 90 368 Z" />
            <path d="M 95 330 C 88 322, 82 326, 86 334 C 92 338, 98 334, 95 330 Z" />
            <path d="M 138 295 C 130 285, 124 290, 128 299 C 134 303, 140 299, 138 295 Z" />
            <path d="M 158 172 C 148 162, 142 168, 146 177 C 152 181, 158 177, 158 172 Z" />
            <path d="M 320 336 C 330 328, 335 334, 330 343 C 324 348, 316 343, 320 336 Z" />
            <path d="M 318 310 C 328 300, 334 306, 329 316 C 323 321, 315 316, 318 310 Z" />
            <path d="M 252 165 C 262 154, 268 160, 263 170 C 257 175, 249 170, 252 165 Z" />
            <path d="M 202 155 C 210 144, 216 150, 211 160 C 205 165, 198 160, 202 155 Z" />
          </g>
        </g>

        {/* ================= BIRD 2: SMALL SPARROW (LANDS ON LEFT BRANCH) ================= */}
        <g className="anim-bird-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Plump Sparrow Body */}
          <path d="M 0 0 C 3 -3, 11 -2, 15 0 C 11 3, 4 3, 0 0 Z" strokeWidth="1.3" fill="currentColor" fillOpacity="0.1" />
          <circle cx="13.5" cy="-0.5" r="2" strokeWidth="1.1" />
          <path d="M 15.5 -0.5 L 18 -0.3" strokeWidth="1" />
          <circle cx="14" cy="-1" r="0.5" fill="currentColor" />
          <path d="M 0 0 L -6 -2.5 M 0 0 L -5 2" strokeWidth="1" />
          <path d="M 7 2 L 6 5 M 10 2 L 10 5" strokeWidth="1" />
          {/* Wings */}
          <g className="anim-wings-2" strokeWidth="1.2">
            <path d="M 5 -1 C 7 -11, 13 -15, 17 -16 C 13 -11, 9 -4, 8 0 Z" fill="currentColor" fillOpacity="0.12" />
          </g>
        </g>

        {/* ================= BIRD 1: MAIN BIRD (LANDS ON RIGHT BRANCH) ================= */}
        <g className="anim-bird-1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
          {/* Graceful Aerodynamic Silhouette */}
          <path
            d="M 0 0 C 4 -3, 14 -2, 20 0 C 15 3, 5 3, 0 0 Z"
            strokeWidth="1.4"
            opacity="0.95"
            fill="currentColor"
            fillOpacity="0.1"
          />
          <circle cx="18" cy="-0.5" r="2.5" strokeWidth="1.2" opacity="0.9" />
          <path d="M 20.5 -0.5 L 24 -0.2" strokeWidth="1.2" opacity="0.95" />
          <circle cx="18.5" cy="-1" r="0.6" fill="currentColor" opacity="0.9" />
          <path d="M 0 0 L -7 -3 M 0 0 L -9 0 M 0 0 L -7 3" strokeWidth="1.1" opacity="0.85" />
          <path d="M 9 2.5 L 8 6 M 12 2.5 L 12 6" strokeWidth="1.1" opacity="0.85" />

          {/* Articulated Flapping & Folding Wings */}
          <g className="anim-wings-1" strokeWidth="1.3" opacity="0.95">
            <path d="M 7 -1 C 10 -15, 18 -21, 24 -23 C 17 -16, 12 -5, 11 0 Z" fill="currentColor" fillOpacity="0.12" />
            <path d="M 7 -1 C 9 12, 16 17, 21 19 C 15 13, 12 4, 10 0 Z" opacity="0.75" fill="currentColor" fillOpacity="0.08" />
          </g>
        </g>

        {/* ================= FALLING LEAVES DRIFTING TO GROUND ================= */}
        <g className="anim-leaf-1" stroke="currentColor" strokeWidth="1" fill="none">
          <path d="M 0 -8 C -6 -2, -6 6, 0 10 C 6 6, 6 -2, 0 -8 Z" />
          <line x1="0" y1="-8" x2="0" y2="10" strokeWidth="0.6" opacity="0.6" />
        </g>

        <g className="anim-leaf-2" stroke="currentColor" strokeWidth="1" fill="none">
          <path d="M 0 -7 C -5 -1, -5 5, 0 8 C 5 5, 5 -1, 0 -7 Z" />
          <line x1="0" y1="-7" x2="0" y2="8" strokeWidth="0.5" opacity="0.6" />
        </g>

        {/* ================= MINIMALIST GROUND LINE & SETTLED LEAVES ================= */}
        <g stroke="currentColor" strokeLinecap="round">
          <line id="hero-ground-line" x1="-800" y1="480" x2="380" y2="480" stroke="url(#heroGroundGrad)" strokeWidth="1.4" />
        </g>

        {/* Settled fallen leaves on the ground */}
        <g stroke="currentColor" strokeWidth="0.9" fill="none" opacity="0.5">
          <path d="M 120 477 C 114 474, 112 479, 117 481 C 122 482, 124 478, 120 477 Z" />
          <path d="M 165 478 C 158 475, 156 480, 162 482 C 168 483, 170 479, 165 478 Z" />
          <path d="M 235 478 C 241 474, 244 479, 239 482 C 233 483, 231 479, 235 478 Z" />
          <path d="M 290 477 C 297 475, 299 480, 293 482 C 287 483, 285 478, 290 477 Z" />
        </g>

        {/* ================= CHARMING GRAZING COW EATING FALLING LEAVES ================= */}
        <g
          id="hero-cow-target"
          className={`${cowSurprised ? 'anim-cow-surprised' : ''}`}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Virtual Target Points for HeroManAdventure */}
          <circle id="hero-cow-rear" cx="78" cy="450" r="1.5" opacity="0" pointerEvents="none" />
          <circle id="hero-cow-head-top" cx="158" cy="445" r="1.5" opacity="0" pointerEvents="none" />

          {cowSurprised && (
            <g className="anim-surprise-bubble" stroke="currentColor">
              {/* Cute comic bubble with !? */}
              <path
                d="M 144 416 Q 144 402 158 402 Q 172 402 172 416 Q 172 428 162 428 L 155 435 L 157 428 Q 144 428 144 416 Z"
                fill="currentColor"
                fillOpacity="0.12"
                strokeWidth="1"
              />
              <text
                x="158"
                y="419"
                textAnchor="middle"
                fontSize="10"
                fontWeight="900"
                fill="currentColor"
                fontFamily="system-ui, -apple-system, sans-serif"
                stroke="none"
              >
                !?
              </text>
            </g>
          )}

          {/* Body: Torso, shoulder, spine, flank and belly */}
          <path
            d="M 82 452 Q 80 436 94 433 Q 112 431 128 434 Q 138 432 143 438 Q 146 447 140 458 Q 118 464 96 461 Q 84 459 82 452 Z"
            strokeWidth="1.3"
            opacity="0.9"
            fill="currentColor"
            fillOpacity="0.06"
          />

          {/* Hind Legs */}
          <path d="M 86 452 L 85 466 L 86 480" strokeWidth="1.2" opacity="0.85" />
          <path d="M 93 456 L 92 468 L 94 480" strokeWidth="1.1" opacity="0.8" />

          {/* Fore Legs */}
          <path d="M 132 455 L 133 468 L 132 480" strokeWidth="1.2" opacity="0.85" />
          <path d="M 140 454 L 141 468 L 140 480" strokeWidth="1.1" opacity="0.8" />

          {/* Swishing Tail */}
          <g className="anim-cow-tail">
            <path d="M 82 440 Q 75 450 78 462" strokeWidth="1" opacity="0.75" />
            <path d="M 78 462 Q 74 466 78 469 Q 81 465 78 462 Z" strokeWidth="0.8" fill="currentColor" fillOpacity="0.4" />
          </g>

          {/* Animated Head (Grazing, dipping down, nibbling falling leaves) */}
          <g className="anim-cow-head">
            {/* Neck */}
            <path d="M 140 435 Q 148 438 154 448 Q 160 458 162 466" strokeWidth="1.3" opacity="0.9" />
            {/* Head Silhouette */}
            <path
              d="M 152 446 Q 160 443 164 451 Q 168 461 164 469 Q 159 472 155 468 Q 150 458 152 446 Z"
              strokeWidth="1.2"
              fill="currentColor"
              fillOpacity="0.08"
            />
            {/* Cute Ears */}
            <path d="M 156 445 Q 163 442 164 446" strokeWidth="0.9" />
            <path d="M 151 445 Q 147 442 146 446" strokeWidth="0.8" opacity="0.7" />
            {/* Gentle Horns */}
            <path d="M 159 444 Q 161 438 163 440" strokeWidth="0.9" />
            <path d="M 154 444 Q 155 439 157 441" strokeWidth="0.8" />
            {/* Eye */}
            <circle cx="159" cy="452" r="0.7" fill="currentColor" opacity="0.9" />
            {/* Snout Muzzle */}
            <ellipse cx="160.5" cy="467.5" rx="3.5" ry="2.2" strokeWidth="0.9" fill="currentColor" fillOpacity="0.1" />
            <circle cx="159.5" cy="467.5" r="0.4" fill="currentColor" />
            <circle cx="161.8" cy="467.5" r="0.4" fill="currentColor" />

            {/* Fallen leaf in cow's mouth being chewed/eaten */}
            <g className="anim-nibble-leaf" stroke="currentColor" strokeWidth="0.8" fill="none">
              <path d="M 163 468 Q 169 467 172 471 Q 168 473 163 469" />
              <line x1="163" y1="468" x2="171" y2="470" strokeWidth="0.5" opacity="0.6" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default HeroBirdsTreeAnimation;
