import React, { useEffect, useState, useRef, useCallback } from 'react';

/**
 * Catmull-Rom Spline interpolation for C1-continuous, silky-smooth bird flight.
 */
function catmullRom(p0, p1, p2, p3, t) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (
    (2 * p1) +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}

function catmullRomDeriv(p0, p1, p2, p3, t) {
  const t2 = t * t;
  return 0.5 * (
    (-p0 + p2) +
    2 * (2 * p0 - 5 * p1 + 4 * p2 - p3) * t +
    3 * (-p0 + 3 * p1 - 3 * p2 + p3) * t2
  );
}

/**
 * ScrollGuideBird
 * Next-level avian flight physics engine:
 * 1. Continuous C1 Catmull-Rom Spline navigation mapped to user reading flow.
 * 2. Flap-and-glide intermittent burst dynamics (flaps to gain speed, locks into dihedral dive glides).
 * 3. Thermal draft organic hover drift when scrolling pauses.
 * 4. 3D banking, pitch tilt & perspective roll.
 * 5. Evanescent glowing wind trail trailing wingtips during active flight.
 * 6. Visitor awareness: curious head & eye tracking when cursor nears companion.
 * 7. Upright perched shoulder parrot touchdown with clasped talons on Lokesh's portrait.
 */
const ScrollGuideBird = () => {
  const [state, setState] = useState({
    x: -100,
    y: -100,
    rotation: 0,
    pitchX: 0,
    bankY: 0,
    wingAngle: 0,
    flipScale: 1,
    opacity: 0,
    isLanded: false,
    scale: 1,
    headTilt: 0,
    trail: [],
  });

  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  const animRef = useRef({
    currentProgress: 0,
    targetProgress: 0,
    currentX: 0,
    currentY: 0,
    currentRotation: 0,
    currentPitchX: 0,
    currentBankY: 0,
    currentFlipScale: 1,
    wingPhase: 0,
    flapBurstTimer: 0,
    isFlappingCycle: true,
    rafId: null,
    lastTimestamp: 0,
    breathPhase: 0,
    curiosityPhase: 0,
    hoverPhase: 0,
    trailPoints: [],
  });

  // Calculate viewport dimensions and scroll metrics
  const getMetrics = useCallback(() => {
    const vw = window.innerWidth || 1200;
    const vh = window.innerHeight || 800;
    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(
      1,
      (document.documentElement.scrollHeight || 8000) - vh
    );
    const progress = Math.max(0, Math.min(1, scrollY / maxScroll));

    // Dynamic shoulder perch location from DOM when available
    let shoulderPos = null;
    const perchEl = document.getElementById('contact-shoulder-perch');
    if (perchEl) {
      const rect = perchEl.getBoundingClientRect();
      if (rect.top > -300 && rect.top < vh + 300) {
        shoulderPos = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    }

    // Dynamic cortex target
    let cortexPos = null;
    const cortexEl = document.getElementById('cortex-logo-target');
    if (cortexEl) {
      const rect = cortexEl.getBoundingClientRect();
      if (rect.top > -300 && rect.top < vh + 300) {
        cortexPos = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    }

    // Dynamic hero tree perch
    let heroTreePos = null;
    const heroPerchEl = document.getElementById('hero-tree-perch');
    if (heroPerchEl) {
      const rect = heroPerchEl.getBoundingClientRect();
      if (rect.top > -300 && rect.top < vh + 300) {
        heroTreePos = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        };
      }
    }

    return { vw, vh, scrollY, maxScroll, progress, shoulderPos, cortexPos, heroTreePos };
  }, []);

  /**
   * Generates waypoints mapped to the user reading flow across all sections
   */
  const getWaypoints = useCallback((metrics) => {
    const { vw, vh, shoulderPos, cortexPos, heroTreePos } = metrics;

    const heroX = heroTreePos ? heroTreePos.x : vw * 0.86;
    const heroY = heroTreePos ? heroTreePos.y : vh * 0.32;

    const cX = cortexPos ? cortexPos.x : vw * 0.12;
    const cY = cortexPos ? cortexPos.y : vh * 0.36;

    const sX = shoulderPos ? shoulderPos.x : vw * 0.60 + (vw * 0.40) * 0.402;
    const sY = shoulderPos ? shoulderPos.y : vh * 0.484;

    return [
      { p: 0.00, x: heroX, y: heroY },                                // Hero Tree
      { p: 0.05, x: vw * 0.58, y: vh * 0.42 },                        // Takeoff swooping down-center
      { p: 0.14, x: cX, y: cY },                                      // Cortex Title & Logo (Left)
      { p: 0.20, x: vw * 0.72, y: vh * 0.50 },                        // Cortex Neural Network (Right)
      { p: 0.27, x: vw * 0.24, y: vh * 0.42 },                        // HireCircle Flow Diagram (Left)
      { p: 0.34, x: vw * 0.74, y: vh * 0.46 },                        // HireCircle Story & CTA (Right)
      { p: 0.41, x: vw * 0.26, y: vh * 0.40 },                        // About 1: Engine room text (Left)
      { p: 0.47, x: vw * 0.74, y: vh * 0.38 },                        // About 1: Illustration (Right)
      { p: 0.53, x: vw * 0.24, y: vh * 0.42 },                        // About 2: Houseplant visual (Left)
      { p: 0.59, x: vw * 0.72, y: vh * 0.38 },                        // About 2: Architecting text (Right)
      { p: 0.66, x: vw * 0.28, y: vh * 0.40 },                        // About 3: Systems thinking text (Left)
      { p: 0.73, x: vw * 0.70, y: vh * 0.42 },                        // About 4: Meetup craft (Right)
      { p: 0.80, x: vw * 0.22, y: vh * 0.38 },                        // Interests: Building (Left)
      { p: 0.84, x: vw * 0.50, y: vh * 0.34 },                        // Interests: Learning (Center)
      { p: 0.88, x: vw * 0.76, y: vh * 0.38 },                        // Interests: Reading (Right)
      { p: 0.93, x: vw * 0.34, y: vh * 0.44 },                        // Contact: Message (Left)
      { p: 0.97, x: sX - 18, y: sY - 14 },                            // Pre-landing approach to shoulder
      { p: 1.00, x: sX, y: sY },                                      // Exact shoulder crest touchdown
    ];
  }, []);

  /**
   * Evaluate Catmull-Rom spline at progress p
   */
  const evaluateSpline = useCallback((p, waypoints) => {
    const n = waypoints.length;
    if (p <= waypoints[0].p) {
      return {
        x: waypoints[0].x,
        y: waypoints[0].y,
        vx: waypoints[1].x - waypoints[0].x,
        vy: waypoints[1].y - waypoints[0].y,
      };
    }
    if (p >= waypoints[n - 1].p) {
      return {
        x: waypoints[n - 1].x,
        y: waypoints[n - 1].y,
        vx: 0,
        vy: 0,
      };
    }

    let idx = 0;
    for (let i = 0; i < n - 1; i++) {
      if (p >= waypoints[i].p) idx = i;
    }

    const pStart = waypoints[idx].p;
    const pEnd = waypoints[idx + 1].p;
    const segDuration = pEnd - pStart;
    const t = segDuration > 0 ? Math.max(0, Math.min(1, (p - pStart) / segDuration)) : 0;

    const p0 = waypoints[Math.max(0, idx - 1)];
    const p1 = waypoints[idx];
    const p2 = waypoints[Math.min(n - 1, idx + 1)];
    const p3 = waypoints[Math.min(n - 1, idx + 2)];

    const x = catmullRom(p0.x, p1.x, p2.x, p3.x, t);
    const y = catmullRom(p0.y, p1.y, p2.y, p3.y, t);
    const vx = catmullRomDeriv(p0.x, p1.x, p2.x, p3.x, t);
    const vy = catmullRomDeriv(p0.y, p1.y, p2.y, p3.y, t);

    return { x, y, vx, vy };
  }, []);

  useEffect(() => {
    const anim = animRef.current;

    const handleScroll = () => {
      const { progress } = getMetrics();
      anim.targetProgress = progress;
    };

    const handleResize = () => {
      handleScroll();
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true });
    handleScroll();

    // Initial setup
    const initMetrics = getMetrics();
    const initWaypoints = getWaypoints(initMetrics);
    const initSample = evaluateSpline(initMetrics.progress, initWaypoints);
    anim.currentProgress = initMetrics.progress;
    anim.currentX = initSample.x;
    anim.currentY = initSample.y;

    const tick = (timestamp) => {
      if (!anim.lastTimestamp) anim.lastTimestamp = timestamp;
      const dt = Math.min(32, timestamp - anim.lastTimestamp);
      anim.lastTimestamp = timestamp;

      // Silky-smooth critical-damped lerp
      const diffProgress = anim.targetProgress - anim.currentProgress;
      const progressLerp = 0.085;
      anim.currentProgress += diffProgress * progressLerp;

      const metrics = getMetrics();
      const waypoints = getWaypoints(metrics);
      const sample = evaluateSpline(anim.currentProgress, waypoints);

      const isLanded = anim.currentProgress >= 0.985;
      const speed = Math.abs(diffProgress);

      // --- 1. THERMAL DRAFTS & ORGANIC HOVER DRIFT ---
      // When coasting or stopped in midair, bird catches micro thermal updrafts
      anim.hoverPhase += 0.035;
      let hoverX = 0;
      let hoverY = 0;
      if (!isLanded && anim.currentProgress > 0.03) {
        const hoverWeight = Math.max(0, 1 - speed * 150);
        hoverY = Math.sin(anim.hoverPhase) * 4.5 * hoverWeight;
        hoverX = Math.cos(anim.hoverPhase * 0.7) * 2.5 * hoverWeight;
      }

      // Smooth position interpolation with thermal currents
      const targetRenderX = sample.x + hoverX;
      const targetRenderY = sample.y + hoverY;
      anim.currentX += (targetRenderX - anim.currentX) * 0.16;
      anim.currentY += (targetRenderY - anim.currentY) * 0.16;

      // --- 2. EVANESCENT GLOWING WIND TRAIL ---
      // Adds motion streamline behind wings during active flight
      if (!isLanded && speed > 0.0004 && metrics.scrollY > 20) {
        anim.trailPoints.push({
          x: anim.currentX,
          y: anim.currentY,
          opacity: Math.min(0.45, speed * 25),
          time: timestamp,
        });
      }
      // Prune old trail particles (> 450ms)
      anim.trailPoints = anim.trailPoints.filter((pt) => timestamp - pt.time < 450);

      // --- 3. FLAP-AND-GLIDE INTERMITTENT CYCLE PHYSICS ---
      let targetRotation = 0;
      let targetPitchX = 0;
      let targetBankY = 0;
      let targetFlipScale = 1;
      let wingAngle = 0;
      let headTilt = 0;

      if (isLanded) {
        // Natural perched parrot behavior on shoulder
        anim.breathPhase += 0.035;
        const breath = Math.sin(anim.breathPhase) * 1.5;
        targetRotation = breath;

        // Visitor awareness: tilts head if cursor is near portrait
        let cursorInfluence = 0;
        if (mouseRef.current.active) {
          const dxM = mouseRef.current.x - anim.currentX;
          const dyM = mouseRef.current.y - anim.currentY;
          const distM = Math.hypot(dxM, dyM);
          if (distM < 320) {
            cursorInfluence = Math.atan2(dyM, dxM) * (180 / Math.PI) * 0.15;
          }
        }

        anim.curiosityPhase += 0.02;
        headTilt = Math.sin(anim.curiosityPhase) * 3 + cursorInfluence;
        targetFlipScale = 1; // Faces inward toward Lokesh's face
        targetPitchX = 0;
        targetBankY = 0;
        wingAngle = 0;
      } else {
        // Active flight dynamics
        const isClimbing = sample.vy < -0.5;
        const isDiving = sample.vy > 0.8;

        if (Math.abs(sample.vx) > 0.01 || Math.abs(sample.vy) > 0.01) {
          targetFlipScale = sample.vx >= 0 ? 1 : -1;
          const rawAngle = Math.atan2(sample.vy, Math.abs(sample.vx)) * (180 / Math.PI);
          targetRotation = Math.max(-28, Math.min(28, rawAngle));
          // 3D pitch and roll
          targetPitchX = Math.max(-22, Math.min(22, sample.vy * 0.4));
          targetBankY = targetFlipScale * (Math.abs(sample.vx) > 0.5 ? 14 : 0);
        }

        // Flap vs. Glide Cycles
        anim.flapBurstTimer += dt;
        if (isClimbing) {
          // Energetically flap when ascending
          anim.isFlappingCycle = true;
          anim.flapBurstTimer = 0;
        } else if (isDiving) {
          // Lock wings in dihedral glide when swooping down
          anim.isFlappingCycle = false;
        } else {
          // Alternates between 450ms flap burst & 750ms glide
          if (anim.isFlappingCycle && anim.flapBurstTimer > 450) {
            anim.isFlappingCycle = false;
            anim.flapBurstTimer = 0;
          } else if (!anim.isFlappingCycle && anim.flapBurstTimer > 750) {
            anim.isFlappingCycle = true;
            anim.flapBurstTimer = 0;
          }
        }

        if (anim.isFlappingCycle && speed > 0.0002) {
          anim.wingPhase += 0.28 + speed * 14;
          wingAngle = Math.sin(anim.wingPhase) * 44;
        } else {
          // Locked dihedral glide posture with subtle aerodynamic flutter
          wingAngle = 6 + Math.sin(timestamp * 0.008) * 3;
        }

        // Visitor proximity awareness in flight
        if (mouseRef.current.active) {
          const dxM = mouseRef.current.x - anim.currentX;
          const dyM = mouseRef.current.y - anim.currentY;
          const distM = Math.hypot(dxM, dyM);
          if (distM < 220) {
            headTilt = Math.max(-15, Math.min(15, (dyM / distM) * 12));
          }
        }
      }

      // Smooth interpolation for 3D orientation
      anim.currentFlipScale += (targetFlipScale - anim.currentFlipScale) * 0.16;
      anim.currentRotation += (targetRotation - anim.currentRotation) * 0.14;
      anim.currentPitchX += (targetPitchX - anim.currentPitchX) * 0.12;
      anim.currentBankY += (targetBankY - anim.currentBankY) * 0.12;

      const opacity = metrics.scrollY > 15 ? 1 : Math.max(0, metrics.scrollY / 15);
      const scale = isLanded ? 0.92 : 1;

      setState({
        x: anim.currentX,
        y: anim.currentY,
        rotation: anim.currentRotation,
        pitchX: anim.currentPitchX,
        bankY: anim.currentBankY,
        wingAngle,
        flipScale: anim.currentFlipScale,
        opacity,
        isLanded,
        scale,
        headTilt,
        trail: [...anim.trailPoints],
      });

      anim.rafId = requestAnimationFrame(tick);
    };

    anim.rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (anim.rafId) {
        cancelAnimationFrame(anim.rafId);
      }
    };
  }, [getMetrics, getWaypoints, evaluateSpline]);

  if (state.opacity <= 0.01) return null;

  const { x, y, rotation, pitchX, bankY, wingAngle, flipScale, opacity, isLanded, scale, headTilt, trail } = state;

  return (
    <>
      {/* ============================================================
          EVANESCENT WIND STREAM TRAIL
          Soft glowing stream ribbon connecting the visitor's scroll
          ============================================================ */}
      {!isLanded && trail.length > 2 && (
        <svg
          className="fixed inset-0 pointer-events-none z-40 w-full h-full"
          aria-hidden="true"
        >
          {trail.map((pt, i) => {
            const ageRatio = i / trail.length; // 0 (oldest) to 1 (newest)
            const r = 1.8 + ageRatio * 2.2;
            const ptOpacity = ageRatio * pt.opacity;
            return (
              <circle
                key={i}
                cx={pt.x}
                cy={pt.y}
                r={r}
                fill="currentColor"
                className="text-foreground"
                style={{
                  opacity: ptOpacity,
                  filter: 'blur(1px)',
                }}
              />
            );
          })}
        </svg>
      )}

      {/* ============================================================
          COMPANION BIRD CONTAINER WITH 3D PERSPECTIVE BANKING
          ============================================================ */}
      <div
        className="fixed pointer-events-none z-50 transition-opacity duration-200"
        style={{
          left: 0,
          top: 0,
          perspective: '600px',
          // 3D perspective banking & pitch tilt
          transform: isLanded
            ? `translate3d(${x}px, ${y}px, 0) translate(-50%, -92%) scaleX(${flipScale}) rotateZ(${rotation}deg) scale(${scale})`
            : `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scaleX(${flipScale}) rotateY(${bankY}deg) rotateX(${pitchX}deg) rotateZ(${rotation}deg) scale(${scale})`,
          transformStyle: 'preserve-3d',
          opacity,
          willChange: 'transform, opacity',
        }}
        aria-hidden="true"
      >
        {/* Subtle landing aura glow when settled on the shoulder */}
        {isLanded && (
          <div
            className="absolute rounded-full -inset-1 pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.22) 0%, transparent 70%)',
              animation: 'pulse 2.4s ease-in-out infinite',
            }}
          />
        )}

        {isLanded ? (
          /* ============================================================
             UPRIGHT PERCHED PARROT / SHOULDER COMPANION BIRD
             ============================================================ */
          <svg
            viewBox="0 0 38 48"
            className="w-8 h-10 md:w-9 md:h-12 text-foreground drop-shadow-md"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              {/* Claws & Talons firmly gripping the shoulder crest */}
              <g strokeWidth="1.6">
                <path d="M 15 39 L 13 43 M 13 43 L 10 44 M 13 43 L 14 45.5 M 13 43 L 16 44" />
                <path d="M 21 39 L 20 43 M 20 43 L 17 44 M 20 43 L 21 45.5 M 20 43 L 23 44" />
              </g>

              {/* Long Tail Feathers draping down the back of the shoulder */}
              <path
                d="M 12 35 L 6 47 M 10 34 L 3 48 M 14 36 L 8 46"
                strokeWidth="1.5"
                opacity="0.88"
              />

              {/* Upright Torso & Chest - Curving toward Lokesh */}
              <path
                d="M 13 39 C 9 35, 8 24, 11 16 C 14 10, 20 10, 24 14 C 27 18, 27 28, 22 36 C 19 39, 15 40, 13 39 Z"
                strokeWidth="1.7"
                fill="currentColor"
                fillOpacity="0.22"
              />

              {/* Sleek Folded Wing along flank */}
              <path
                d="M 12 18 C 11 25, 11 31, 15 37 C 17 34, 17 24, 15 19 Z"
                strokeWidth="1.5"
                fill="currentColor"
                fillOpacity="0.28"
              />
              <path d="M 13 24 C 14 28, 14 32, 15 34" strokeWidth="1.2" opacity="0.65" />
              <path d="M 12 28 C 13 32, 14 34, 14 36" strokeWidth="1.1" opacity="0.5" />

              {/* Head & Neck with micro curious tilt and visitor awareness */}
              <g
                style={{
                  transformOrigin: '21px 13px',
                  transform: `rotate(${headTilt}deg)`,
                  transition: 'transform 0.4s ease-out',
                }}
              >
                <path
                  d="M 18 12 C 18 7, 25 6, 27 10 C 28 12.5, 27 15, 23 15.5"
                  strokeWidth="1.6"
                  fill="currentColor"
                  fillOpacity="0.2"
                />

                {/* Hooked Parrot Beak pointing towards Lokesh's face */}
                <path
                  d="M 26 9.5 C 29 9.5, 32 11.5, 31 14 C 29 14.2, 27 13.5, 26 12.5 Z"
                  strokeWidth="1.5"
                  fill="currentColor"
                  fillOpacity="0.4"
                />
                <path
                  d="M 26 12.5 C 27.5 13.5, 28.5 14, 27.5 15 C 26.5 14.2, 26 13.7, 26 12.5"
                  strokeWidth="1.2"
                />

                {/* Alert, intelligent eye */}
                <circle
                  cx="23.5"
                  cy="9.5"
                  r="1.5"
                  strokeWidth="1.2"
                  fill="currentColor"
                  fillOpacity="0.12"
                />
                <circle cx="23.8" cy="9.5" r="0.75" fill="currentColor" />

                {/* Cute Parrot Crown / Crest Feathers */}
                <path
                  d="M 19 6.5 C 19 2.5, 21 1.5, 23 0.5 M 20 6.5 C 21 3.5, 23 2.5, 24 2.5"
                  strokeWidth="1.4"
                  opacity="0.9"
                />
              </g>
            </g>
          </svg>
        ) : (
          /* ============================================================
             IN-FLIGHT COMPANION SILHOUETTE WITH FLAP-AND-GLIDE WINGS
             ============================================================ */
          <svg
            viewBox="0 0 46 34"
            className="w-9 h-7 md:w-10 md:h-8 text-foreground drop-shadow-sm"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              {/* Main Aerodynamic Body */}
              <path
                d="M 8 18 C 14 12, 26 13, 34 17 C 26 21, 14 21, 8 18 Z"
                strokeWidth="1.6"
                fill="currentColor"
                fillOpacity="0.14"
              />

              {/* Head & Beak with subtle cursor awareness */}
              <g
                style={{
                  transformOrigin: '32px 16px',
                  transform: `rotate(${headTilt * 0.7}deg)`,
                  transition: 'transform 0.3s ease-out',
                }}
              >
                <circle
                  cx="32"
                  cy="16"
                  r="3.5"
                  strokeWidth="1.4"
                  fill="currentColor"
                  fillOpacity="0.18"
                />
                <path d="M 35.5 16 L 40.5 16.5" strokeWidth="1.6" />
                <circle cx="32.5" cy="15" r="0.8" fill="currentColor" />
              </g>

              {/* Tail Feathers */}
              <path
                d="M 8 18 L 0 14 M 8 18 L -2 18 M 8 18 L 0 22"
                strokeWidth="1.4"
                opacity="0.9"
              />

              {/* Flapping / Dihedral Gliding Top Wing */}
              <g
                style={{
                  transformOrigin: '18px 15px',
                  transform: `rotate(${wingAngle}deg)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                <path
                  d="M 18 15 C 22 -1, 30 -7, 36 -8 C 28 -1, 23 9, 21 15 Z"
                  strokeWidth="1.5"
                  fill="currentColor"
                  fillOpacity="0.14"
                />
              </g>

              {/* Flapping / Dihedral Gliding Bottom Wing */}
              <g
                style={{
                  transformOrigin: '18px 18px',
                  transform: `rotate(${-wingAngle * 0.72}deg)`,
                  transition: 'transform 0.05s linear',
                }}
              >
                <path
                  d="M 18 18 C 21 27, 28 32, 33 34 C 26 29, 22 21, 20 18 Z"
                  strokeWidth="1.3"
                  opacity="0.85"
                  fill="currentColor"
                  fillOpacity="0.10"
                />
              </g>
            </g>
          </svg>
        )}
      </div>
    </>
  );
};

export default ScrollGuideBird;
