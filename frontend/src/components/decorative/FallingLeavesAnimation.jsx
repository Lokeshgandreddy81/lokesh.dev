import React from 'react';

// Leaf SVG Shapes
const LeafShape1 = () => (
  // Simple Leaf
  <svg viewBox="0 0 24 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M12 2 C 2 12, 2 24, 12 34 C 22 24, 22 12, 12 2 Z" />
    <line x1="12" y1="2" x2="12" y2="34" strokeWidth="0.8" opacity="0.6" />
    <path d="M12 10 L6 14 M12 16 L18 20 M12 22 L7 25" strokeWidth="0.7" opacity="0.5" />
  </svg>
);

const LeafShape2 = () => (
  // Ginkgo / Fan Leaf
  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M16 30 L16 18 C 6 16, 2 8, 10 3 C 14 5, 16 10, 16 10 C 16 10, 18 5, 22 3 C 30 8, 26 16, 16 18" />
    <line x1="16" y1="18" x2="16" y2="30" strokeWidth="1" />
  </svg>
);

const LeafShape3 = () => (
  // Maple / Jagged Leaf
  <svg viewBox="0 0 36 36" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M18 34 L18 26 L10 30 L12 22 L4 20 L10 14 L8 6 L16 10 L18 2 L20 10 L28 6 L26 14 L32 20 L24 22 L26 30 L18 26 Z" />
    <line x1="18" y1="2" x2="18" y2="34" strokeWidth="0.8" opacity="0.6" />
  </svg>
);

const LeafShape4 = () => (
  // Willow / Slender Leaf
  <svg viewBox="0 0 18 42" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
    <path d="M9 2 C 1 14, 2 30, 9 40 C 16 30, 17 14, 9 2 Z" />
    <line x1="9" y1="2" x2="9" y2="40" strokeWidth="0.7" opacity="0.6" />
  </svg>
);

const FallingLeavesAnimation = ({ className = "" }) => {
  // Configured parameters for 16 falling leaves
  const leaves = [
    { id: 1, shape: 1, left: '8%', size: 28, delay: '0s', duration: '9s', sway: '35px', rot: '240deg' },
    { id: 2, shape: 2, left: '22%', size: 24, delay: '1.8s', duration: '11s', sway: '-40px', rot: '-180deg' },
    { id: 3, shape: 3, left: '40%', size: 32, delay: '0.6s', duration: '13s', sway: '50px', rot: '320deg' },
    { id: 4, shape: 4, left: '58%', size: 22, delay: '3.2s', duration: '10s', sway: '-30px', rot: '190deg' },
    { id: 5, shape: 1, left: '75%', size: 30, delay: '1.2s', duration: '12s', sway: '45px', rot: '-260deg' },
    { id: 6, shape: 2, left: '88%', size: 26, delay: '4.5s', duration: '9.5s', sway: '-35px', rot: '210deg' },
    { id: 7, shape: 3, left: '15%', size: 34, delay: '5.1s', duration: '14s', sway: '60px', rot: '-300deg' },
    { id: 8, shape: 4, left: '32%', size: 20, delay: '2.4s', duration: '11.5s', sway: '-25px', rot: '150deg' },
    { id: 9, shape: 1, left: '48%', size: 29, delay: '6.0s', duration: '10.5s', sway: '40px', rot: '-220deg' },
    { id: 10, shape: 2, left: '65%', size: 25, delay: '3.8s', duration: '12.5s', sway: '-50px', rot: '280deg' },
    { id: 11, shape: 3, left: '82%', size: 31, delay: '7.2s', duration: '13.5s', sway: '35px', rot: '-190deg' },
    { id: 12, shape: 4, left: '94%', size: 21, delay: '0.9s', duration: '8.5s', sway: '-20px', rot: '250deg' },
    { id: 13, shape: 1, left: '28%', size: 27, delay: '8.1s', duration: '11s', sway: '45px', rot: '-310deg' },
    { id: 14, shape: 3, left: '52%', size: 33, delay: '4.2s', duration: '14.5s', sway: '-55px', rot: '230deg' },
  ];

  const renderLeafShape = (shapeId) => {
    switch (shapeId) {
      case 1: return <LeafShape1 />;
      case 2: return <LeafShape2 />;
      case 3: return <LeafShape3 />;
      case 4: return <LeafShape4 />;
      default: return <LeafShape1 />;
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden z-10 ${className}`}>
      {/* Inline styles for keyframe animation */}
      <style>{`
        @keyframes leafFallAndSway {
          0% {
            transform: translateY(-40px) translateX(0px) rotate(0deg);
            opacity: 0;
          }
          12% {
            opacity: 0.85;
          }
          50% {
            transform: translateY(48vh) translateX(var(--sway-x)) rotate(var(--rot-angle));
            opacity: 0.9;
          }
          88% {
            opacity: 0.85;
          }
          100% {
            transform: translateY(96vh) translateX(calc(var(--sway-x) * -0.6)) rotate(calc(var(--rot-angle) + 120deg));
            opacity: 0.15;
          }
        }
        
        @keyframes groundRestPulse {
          0%, 100% { opacity: 0.6; transform: translateY(0px) rotate(var(--base-rot, 0deg)); }
          50% { opacity: 0.85; transform: translateY(-3px) rotate(var(--base-rot, 0deg)); }
        }

        .falling-leaf {
          position: absolute;
          top: -40px;
          color: rgba(232, 232, 232, 0.75);
          filter: drop-shadow(0 2px 8px rgba(0,0,0,0.5));
          animation: leafFallAndSway var(--fall-dur) ease-in-out infinite;
          animation-delay: var(--fall-del);
          will-change: transform, opacity;
        }

        .resting-leaf {
          position: absolute;
          bottom: 12px;
          color: rgba(232, 232, 232, 0.6);
          animation: groundRestPulse 6s ease-in-out infinite;
        }
      `}</style>

      {/* Falling Leaves Stream */}
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="falling-leaf"
          style={{
            left: leaf.left,
            width: `${leaf.size}px`,
            height: `${leaf.size * 1.2}px`,
            '--fall-del': leaf.delay,
            '--fall-dur': leaf.duration,
            '--sway-x': leaf.sway,
            '--rot-angle': leaf.rot,
          }}
        >
          {renderLeafShape(leaf.shape)}
        </div>
      ))}

      {/* Ground Line & Settled Leaves at the Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 border-t border-white/20 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end justify-between px-6 pb-2">
        {/* Settled Leaf 1 */}
        <div className="resting-leaf" style={{ left: '10%', width: '26px', height: '32px', '--base-rot': '-75deg', animationDelay: '0.2s' }}>
          <LeafShape3 />
        </div>
        {/* Settled Leaf 2 */}
        <div className="resting-leaf" style={{ left: '26%', width: '22px', height: '28px', '--base-rot': '45deg', animationDelay: '1.5s' }}>
          <LeafShape1 />
        </div>
        {/* Settled Leaf 3 */}
        <div className="resting-leaf" style={{ left: '46%', width: '30px', height: '30px', '--base-rot': '-15deg', animationDelay: '2.8s' }}>
          <LeafShape2 />
        </div>
        {/* Settled Leaf 4 */}
        <div className="resting-leaf" style={{ left: '68%', width: '24px', height: '32px', '--base-rot': '80deg', animationDelay: '0.9s' }}>
          <LeafShape4 />
        </div>
        {/* Settled Leaf 5 */}
        <div className="resting-leaf" style={{ left: '85%', width: '28px', height: '34px', '--base-rot': '-50deg', animationDelay: '3.4s' }}>
          <LeafShape3 />
        </div>
      </div>
    </div>
  );
};

export default FallingLeavesAnimation;
