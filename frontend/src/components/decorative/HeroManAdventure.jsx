import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * HeroManAdventure
 * Choreography:
 * 1. Dash: Cool start & relaxed swagger walk along the dash "—"
 * 2. Systems: Jump down onto "systems", walk across till after "systems"
 * 3. Road: DIRECT jump from after "systems" down onto the ground line with a nice flex!
 * 4. Cow: Walk on the ground level to cow, playfully hit cow (startled hop + !?)
 * 5. Tree: Walk on the ground level to tree base, jump up into the tree!
 * 6. Look at user: Sit on the branch, turn face directly to user once, smile/wink & wave ("Hey! 👋")
 * 7. Watch phone: Comfortably seated on branch with legs dangling, watching mobile phone with glowing cyan screen & tech particles.
 */

// Smooth easing helpers
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const easeOutQuad = (t) => 1 - (1 - t) * (1 - t);

// Smooth parabolic trajectory
const arcLerp = (from, to, t, arcHeight = 45) => {
  const et = easeInOutCubic(t);
  const x = from.x + (to.x - from.x) * et;
  const linearY = from.y + (to.y - from.y) * et;
  const arc = -4 * arcHeight * t * (1 - t);
  return { x, y: linearY + arc };
};

// Linear smooth lerp
const smoothLerp = (from, to, t) => {
  const et = easeInOutCubic(t);
  return {
    x: from.x + (to.x - from.x) * et,
    y: from.y + (to.y - from.y) * et,
  };
};

const HeroManAdventure = ({ onCowHit }) => {
  const [animState, setAnimState] = useState({
    x: 0,
    y: 0,
    pose: 'IDLE_DASH',
    poseTime: 0,
    flightAngle: 0,
    visible: false,
  });

  const [particles, setParticles] = useState([]);
  const [impact, setImpact] = useState(null);

  const animRef = useRef({
    startTime: 0,
    hitCow: false,
    rafId: null,
  });

  // Ref to onCowHit so prop changes don't restart animation
  const onCowHitRef = useRef(onCowHit);
  useEffect(() => {
    onCowHitRef.current = onCowHit;
  }, [onCowHit]);

  // Calculate precise waypoints based on actual DOM and SVG transformations
  const getWaypoints = useCallback(() => {
    const section = document.getElementById('home');
    const dash = document.getElementById('hero-dash');
    const targetSystems = document.getElementById('hero-target-systems');
    const treeSvg = document.getElementById('hero-tree-svg');

    if (!section || !dash) return null;

    const sr = section.getBoundingClientRect();
    const toRel = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return {
        left: r.left - sr.left,
        top: r.top - sr.top,
        width: r.width,
        height: r.height,
      };
    };

    const d = toRel(dash);
    const sys = toRel(targetSystems);

    // 1. Dash: Horizontal bar of "—" is at ~58% of height
    const dashY = d.top + d.height * 0.58;
    const dashStart = { x: d.left + 4, y: dashY };
    const dashEnd = { x: d.left + d.width - 4, y: dashY };

    // 2. Systems: Feet land on top edge of letters
    const sysY = sys ? sys.top + sys.height * 0.22 : dashEnd.y + 54;
    const sysStart = { x: sys ? sys.left + 8 : dashEnd.x - 20, y: sysY };
    const sysEnd = { x: sys ? sys.left + sys.width + 12 : sysStart.x + 95, y: sysY };

    // 3. Coordinate mapping from treeSvg
    const getSvgPoint = (svgX, svgY) => {
      if (!treeSvg) return null;

      // Prefer native SVG matrix transform for 100% exact subpixel coordinates
      if (treeSvg.createSVGPoint && treeSvg.getScreenCTM) {
        try {
          const pt = treeSvg.createSVGPoint();
          pt.x = svgX;
          pt.y = svgY;
          const screenPt = pt.matrixTransform(treeSvg.getScreenCTM());
          if (screenPt && Number.isFinite(screenPt.x) && Number.isFinite(screenPt.y)) {
            return {
              x: screenPt.x - sr.left,
              y: screenPt.y - sr.top,
            };
          }
        } catch (e) {
          // Fall back to geometric calculation
        }
      }

      // Geometric fallback with preserveAspectRatio="xMidYMid meet"
      const svgR = treeSvg.getBoundingClientRect();
      const scale = Math.min(svgR.width / 420, svgR.height / 500);
      const renderedW = 420 * scale;
      const renderedH = 500 * scale;
      const offsetX = svgR.left - sr.left + (svgR.width - renderedW) / 2;
      const offsetY = svgR.top - sr.top + (svgR.height - renderedH) / 2;

      return {
        x: offsetX + svgX * scale,
        y: offsetY + svgY * scale,
      };
    };

    // Ground line in tree SVG is at Y=480 with strokeWidth=1.4.
    // The top surface of the ground line where soles touch is at Y=479.3:
    const groundPt = getSvgPoint(200, 479.3);
    const groundY = groundPt ? groundPt.y : sysEnd.y + 160;

    // Land point on the extended ground line below/after systems
    const groundLand = { x: sysEnd.x + 55, y: groundY };

    // Cow rear position on ground line
    const cowPt = getSvgPoint(78, 479.3);
    const cowPos = { x: cowPt ? cowPt.x - 14 : groundLand.x + 240, y: groundY };

    // Tree base position on ground line
    const treeBasePt = getSvgPoint(198, 479.3);
    const treeBasePos = { x: treeBasePt ? treeBasePt.x - 4 : cowPos.x + 95, y: groundY };

    // Branch crook / perch seat (X=230, Y=340 on lower right branch)
    const branchPt = getSvgPoint(230, 340);
    const branchSeatPos = branchPt ? { x: branchPt.x, y: branchPt.y } : { x: treeBasePos.x + 28, y: groundY - 105 };

    return {
      dashStart,
      dashEnd,
      sysStart,
      sysEnd,
      groundLand,
      cowPos,
      treeBasePos,
      branchSeatPos,
      groundY,
    };
  }, []);

  useEffect(() => {
    let active = true;
    const anim = animRef.current;

    const startLoop = (timestamp) => {
      anim.startTime = timestamp;
      anim.hitCow = false;

      const step = (now) => {
        if (!active) return;

        const wp = getWaypoints();
        if (!wp) {
          anim.rafId = requestAnimationFrame(step);
          return;
        }

        const elapsed = (now - anim.startTime) / 1000;
        const t = elapsed; // Linear progression to complete action

        let currentPos = { x: 0, y: 0 };
        let currentPose = 'IDLE_DASH';
        let poseTime = 0;
        let flightAngle = 0;

        // ================= CHOREOGRAPHY TIMELINE =================
        // 0.0 - 1.2s: Idle on dash, cool & relaxed
        // 1.2 - 2.8s: Cool swagger walk along dash "—"
        // 2.8 - 3.8s: Jump down onto "systems"
        // 3.8 - 4.2s: Land on "systems"
        // 4.2 - 6.2s: Walk across "systems" till after the word
        // 6.2 - 7.5s: DIRECT JUMP TO GROUND LINE! (Leap from systems down to road)
        // 7.5 - 8.2s: Land on road (heroic crouch on ground level)
        // 8.2 - 10.2s: NICE FLEX on the road! (Stands tall on ground level, double-bicep flex)
        // 10.2 - 13.5s: Cool swagger walk across the ground line towards the cow
        // 13.5 - 15.0s: Hit cow as usual! (Tap, impact star burst, cow hops + !?)
        // 15.0 - 16.6s: Walk along ground line over to the base of the tree
        // 16.6 - 17.8s: JUMP UP INTO THE TREE! (Smooth parkour leap from tree base to branch)
        // 17.8 - 18.6s: Hoist up / settle hips firmly onto the tree branch
        // 18.6 - 21.4s: LOOK AT USER ONCE! (Turns head directly to user, friendly wink, wave & "Hey! 👋")
        // 21.4s+ : WATCH HIS PHONE! (Pulls out phone, screen glows cyan, floating code particles, stays chilling)

        if (t < 1.2) {
          // 1. Idle on dash
          currentPos = wp.dashStart;
          currentPose = 'IDLE_DASH';
          poseTime = t;
        } else if (t < 2.8) {
          // 2. Cool leisurely walk along the dash
          const p = (t - 1.2) / 1.6;
          currentPos = smoothLerp(wp.dashStart, wp.dashEnd, p);
          currentPose = 'COOL_WALK';
          poseTime = p * 3.0;
        } else if (t < 3.8) {
          // 3. Jump from dash down onto "systems"
          const p = (t - 2.8) / 1.0;
          currentPos = arcLerp(wp.dashEnd, wp.sysStart, p, 40);
          currentPose = 'PARKOUR_JUMP';
          flightAngle = 18 * (1 - p * 0.8);
          poseTime = p;
        } else if (t < 4.2) {
          // 4. Landing crouch on "systems"
          const p = (t - 3.8) / 0.4;
          currentPos = wp.sysStart;
          currentPose = 'LAND_ABSORB';
          poseTime = p;
        } else if (t < 6.2) {
          // 5. Walk till after "systems"
          const p = (t - 4.2) / 2.0;
          currentPos = smoothLerp(wp.sysStart, wp.sysEnd, p);
          currentPose = 'COOL_WALK';
          poseTime = p * 3.5;
        } else if (t < 7.5) {
          // 6. DIRECT JUMP ONTO THE GROUND LINE!
          const p = (t - 6.2) / 1.3;
          currentPos = arcLerp(wp.sysEnd, wp.groundLand, p, 65);
          currentPose = 'PARKOUR_JUMP';
          flightAngle = 16 * (1 - p * 0.7);
          poseTime = p;
        } else if (t < 8.2) {
          // 7. Touchdown firmly on the ground level
          const p = (t - 7.5) / 0.7;
          currentPos = wp.groundLand;
          currentPose = 'LAND_ABSORB';
          poseTime = p;
        } else if (t < 10.2) {
          // 8. THE NICE FLEX ON THE ROAD!
          const p = (t - 8.2) / 2.0;
          currentPos = wp.groundLand;
          currentPose = 'COOL_FLEX';
          poseTime = p;
        } else if (t < 13.5) {
          // 9. Cool stroll across ground line towards the cow
          const p = (t - 10.2) / 3.3;
          currentPos = smoothLerp(wp.groundLand, wp.cowPos, p);
          currentPose = 'COOL_WALK';
          poseTime = p * 6.0;
        } else if (t < 15.0) {
          // 10. Hit the cow as usual!
          const p = (t - 13.5) / 1.5;
          currentPos = wp.cowPos;
          poseTime = p;
          currentPose = p < 0.55 ? 'TAP_COW' : 'CELEBRATE';

          if (p >= 0.35 && !anim.hitCow) {
            anim.hitCow = true;
            if (onCowHitRef.current) onCowHitRef.current();
            setImpact({
              x: wp.cowPos.x + 18,
              y: wp.groundY - 18,
              time: now,
            });
          }
        } else if (t < 16.6) {
          // 11. Walk along ground line to tree trunk base
          const p = (t - 15.0) / 1.6;
          currentPos = smoothLerp(wp.cowPos, wp.treeBasePos, p);
          currentPose = 'COOL_WALK';
          poseTime = p * 3.5;
        } else if (t < 17.8) {
          // 12. JUMP UP INTO THE TREE! (Smooth agile parkour leap up to the branch)
          const p = (t - 16.6) / 1.2;
          currentPos = arcLerp(wp.treeBasePos, wp.branchSeatPos, p, 35);
          currentPose = 'JUMP_TREE';
          flightAngle = -22 * (1 - p * 0.7);
          poseTime = p;
        } else if (t < 18.6) {
          // 13. Settle hips firmly onto the tree branch
          const p = (t - 17.8) / 0.8;
          currentPos = wp.branchSeatPos;
          currentPose = 'CLIMB_SIT_BRANCH';
          poseTime = p;
        } else if (t < 21.4) {
          // 14. LOOK AT USER ONCE! (Front-facing, eye contact, friendly smile/wink & wave)
          const p = t - 18.6;
          currentPos = wp.branchSeatPos;
          currentPose = 'SIT_TREE_LOOK_USER';
          poseTime = p;
        } else {
          // 15. WATCH HIS PHONE ON THE TREE! (Hips resting on branch, glowing cyan screen, floating particles)
          const sitTime = t - 21.4;
          currentPos = wp.branchSeatPos;
          currentPose = 'SIT_TREE_PHONE';
          poseTime = sitTime;

          // Ambient floating particles from phone screen
          if (Math.floor(sitTime * 1.5) !== Math.floor((sitTime - 0.016) * 1.5)) {
            const icons = ['{ }', '♥', '★', '♪', '⚡', '< />', '01'];
            setParticles((prev) => [
              ...prev.slice(-6),
              {
                id: now + Math.random(),
                icon: icons[Math.floor(Math.random() * icons.length)],
                x: wp.branchSeatPos.x + 8,
                y: wp.branchSeatPos.y - 14,
                createdAt: now,
              },
            ]);
          }
        }

        setAnimState({
          x: currentPos.x,
          y: currentPos.y,
          pose: currentPose,
          poseTime,
          flightAngle,
          visible: true,
        });

        // Clean up particles
        setParticles((prev) => prev.filter((p) => now - p.createdAt < 2400));
        // Clean up impact burst
        setImpact((prev) => (prev && now - prev.time > 850 ? null : prev));

        anim.rafId = requestAnimationFrame(step);
      };

      anim.rafId = requestAnimationFrame(step);
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(startLoop);
    }, 150);

    const handleReplay = () => {
      anim.startTime = performance.now();
      anim.hitCow = false;
      setImpact(null);
      setParticles([]);
    };

    const dashEl = document.getElementById('hero-dash');
    if (dashEl) {
      dashEl.addEventListener('click', handleReplay);
    }

    const handleResize = () => {
      getWaypoints();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      clearTimeout(timer);
      if (anim.rafId) cancelAnimationFrame(anim.rafId);
      if (dashEl) dashEl.removeEventListener('click', handleReplay);
      window.removeEventListener('resize', handleResize);
    };
  }, [getWaypoints]);

  const { x, y, pose, poseTime, flightAngle, visible } = animState;

  if (!visible) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 select-none overflow-visible">
      {/* Floating particles rising from phone screen */}
      {particles.map((p) => {
        const age = (performance.now() - p.createdAt) / 1000;
        const opacity = Math.max(0, 1 - age / 2.2);
        const floatY = p.y - age * 28;
        const driftX = p.x + Math.sin(age * 2.8) * 12;

        return (
          <span
            key={p.id}
            className="absolute font-mono text-[9px] text-purple-600 dark:text-purple-300 font-bold pointer-events-none select-none"
            style={{
              left: `${driftX}px`,
              top: `${floatY}px`,
              opacity,
              transform: `scale(${0.75 + age * 0.25})`,
            }}
          >
            {p.icon}
          </span>
        );
      })}

      {/* Impact star burst when playfully tapping cow */}
      {impact && (
        <div
          className="absolute pointer-events-none"
          style={{
            left: `${impact.x}px`,
            top: `${impact.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
            <circle cx="17" cy="17" r="11" stroke="#ec4899" strokeWidth="1.3" opacity="0.75" className="animate-ping" />
            <path
              d="M 17 4 L 20 12 L 29 17 L 20 22 L 17 30 L 14 22 L 5 17 L 14 12 Z"
              fill="#ec4899"
              opacity="0.9"
            />
            <circle cx="17" cy="17" r="2.2" fill="#fbbf24" />
          </svg>
        </div>
      )}

      {/* The Animated Line-Art Character */}
      <svg
        className="absolute overflow-visible text-foreground cursor-pointer pointer-events-auto"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          width: '46px',
          height: '46px',
          transform: 'translate(-23px, -42px)',
        }}
        onClick={() => {
          const dashEl = document.getElementById('hero-dash');
          if (dashEl) dashEl.click();
        }}
        title="Click me to replay the adventure!"
        viewBox="0 0 46 46"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <StylizedParkourMan pose={pose} t={poseTime} flightAngle={flightAngle} />
      </svg>
    </div>
  );
};

/**
 * StylizedParkourMan
 * Line-art character with stylish hoodie, wind-swept hair, sneakers, and smooth human posture.
 */
const StylizedParkourMan = ({ pose, t, flightAngle }) => {
  const rootX = 23;
  const rootY = 42; // baseline / soles of sneakers or hips on branch

  // 1. COOL IDLE ON DASH
  if (pose === 'IDLE_DASH') {
    const breath = Math.sin(t * 2.5) * 0.8;
    return (
      <g transform={`translate(0, ${-breath})`}>
        <circle cx={rootX} cy={rootY - 29} r="3.8" strokeWidth="1.4" />
        <path d={`M ${rootX - 3} ${rootY - 33} Q ${rootX + 2} ${rootY - 36} ${rootX + 6} ${rootY - 32}`} strokeWidth="1.2" />
        <circle cx={rootX + 2} cy={rootY - 29} r="0.6" fill="currentColor" />

        <path d={`M ${rootX} ${rootY - 25} Q ${rootX + 1} ${rootY - 19} ${rootX} ${rootY - 13}`} strokeWidth="1.7" />
        <line x1={rootX - 2} y1={rootY - 24} x2={rootX + 2} y2={rootY - 15} strokeWidth="1.0" opacity="0.6" />

        <path d={`M ${rootX} ${rootY - 23} Q ${rootX - 4} ${rootY - 18} ${rootX - 2} ${rootY - 14}`} strokeWidth="1.3" />
        <path d={`M ${rootX} ${rootY - 23} Q ${rootX + 4} ${rootY - 18} ${rootX + 2} ${rootY - 14}`} strokeWidth="1.3" />

        <path d={`M ${rootX} ${rootY - 13} L ${rootX - 3} ${rootY - 6} L ${rootX - 3} ${rootY - 2}`} strokeWidth="1.5" />
        <path d={`M ${rootX} ${rootY - 13} L ${rootX + 3} ${rootY - 6} L ${rootX + 3} ${rootY - 2}`} strokeWidth="1.5" />

        <path d={`M ${rootX - 5} ${rootY} L ${rootX - 1} ${rootY} L ${rootX - 2} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.25" strokeWidth="1.0" />
        <path d={`M ${rootX + 1} ${rootY} L ${rootX + 5} ${rootY} L ${rootX + 4} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.25" strokeWidth="1.0" />
      </g>
    );
  }

  // 2. COOL LEISURELY SWAGGER WALK
  if (pose === 'COOL_WALK') {
    const stride = Math.sin(t * 2.8);
    const armSwing = Math.cos(t * 2.8);
    const bounce = Math.abs(stride) * 1.6;

    return (
      <g transform={`translate(0, ${-bounce})`}>
        <circle cx={rootX + 1} cy={rootY - 29} r="3.8" strokeWidth="1.4" />
        <path d={`M ${rootX - 2} ${rootY - 33} Q ${rootX + 3} ${rootY - 36} ${rootX + 7} ${rootY - 32}`} strokeWidth="1.2" />
        <circle cx={rootX + 3} cy={rootY - 29} r="0.6" fill="currentColor" />

        <path d={`M ${rootX + 1} ${rootY - 25} Q ${rootX + 1} ${rootY - 19} ${rootX} ${rootY - 13}`} strokeWidth="1.7" />
        <line x1={rootX - 1} y1={rootY - 24} x2={rootX + 3} y2={rootY - 15} strokeWidth="1.0" opacity="0.6" />

        <path
          d={`M ${rootX + 1} ${rootY - 23} L ${rootX + 5 * armSwing} ${rootY - 18} L ${rootX + 7 * armSwing} ${rootY - 13}`}
          strokeWidth="1.3"
        />
        <path
          d={`M ${rootX + 1} ${rootY - 23} L ${rootX - 4 * armSwing} ${rootY - 18} L ${rootX - 6 * armSwing} ${rootY - 13}`}
          strokeWidth="1.3"
        />

        <path
          d={`M ${rootX} ${rootY - 13} L ${rootX + 4 * stride} ${rootY - 6} L ${rootX + 5 * stride} ${rootY - 2}`}
          strokeWidth="1.5"
        />
        <path
          d={`M ${rootX} ${rootY - 13} L ${rootX - 4 * stride} ${rootY - 6} L ${rootX - 5 * stride} ${rootY - 2}`}
          strokeWidth="1.5"
        />

        <path
          d={`M ${rootX + 5 * stride - 2} ${rootY} L ${rootX + 5 * stride + 4} ${rootY} L ${rootX + 5 * stride + 3} ${rootY - 2} Z`}
          fill="currentColor"
          fillOpacity="0.3"
          strokeWidth="1.0"
        />
        <path
          d={`M ${rootX - 5 * stride - 3} ${rootY} L ${rootX - 5 * stride + 3} ${rootY} L ${rootX - 5 * stride + 2} ${rootY - 2} Z`}
          fill="currentColor"
          fillOpacity="0.3"
          strokeWidth="1.0"
        />
      </g>
    );
  }

  // 3. PARKOUR JUMP (Airborne leap)
  if (pose === 'PARKOUR_JUMP') {
    const tuck = Math.sin(t * Math.PI);
    return (
      <g transform={`rotate(${flightAngle}, ${rootX}, ${rootY - 20})`}>
        <circle cx={rootX + 6} cy={rootY - 27} r="3.8" strokeWidth="1.4" />
        <circle cx={rootX + 8} cy={rootY - 27} r="0.6" fill="currentColor" />
        <path d={`M ${rootX + 3} ${rootY - 31} Q ${rootX + 8} ${rootY - 34} ${rootX + 12} ${rootY - 30}`} strokeWidth="1.2" />

        <line x1={rootX + 4} y1={rootY - 23} x2={rootX - 2} y2={rootY - 13} strokeWidth="1.7" />

        <path d={`M ${rootX + 3} ${rootY - 22} L ${rootX + 11} ${rootY - 18} L ${rootX + 16} ${rootY - 14}`} strokeWidth="1.3" />
        <path d={`M ${rootX + 3} ${rootY - 22} L ${rootX + 7} ${rootY - 15} L ${rootX + 12} ${rootY - 10}`} strokeWidth="1.3" />

        <path d={`M ${rootX - 2} ${rootY - 13} L ${rootX + 3 + tuck * 2} ${rootY - 6} L ${rootX + 8 + tuck * 2} ${rootY - 7}`} strokeWidth="1.5" />
        <path d={`M ${rootX - 2} ${rootY - 13} L ${rootX - 1 - tuck * 2} ${rootY - 4} L ${rootX + 4 - tuck * 2} ${rootY - 4}`} strokeWidth="1.5" />

        <path d={`M ${rootX + 8 + tuck * 2} ${rootY - 7} L ${rootX + 12 + tuck * 2} ${rootY - 8} L ${rootX + 10 + tuck * 2} ${rootY - 5} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
      </g>
    );
  }

  // 4. LAND ABSORB (Agile parkour crouch on ground level)
  if (pose === 'LAND_ABSORB') {
    const drop = Math.sin(t * Math.PI) * 5;
    return (
      <g>
        <circle cx={rootX + 3} cy={rootY - 22 + drop} r="3.8" strokeWidth="1.4" />
        <circle cx={rootX + 5} cy={rootY - 21 + drop} r="0.6" fill="currentColor" />

        <path d={`M ${rootX + 2} ${rootY - 18 + drop} Q ${rootX - 1} ${rootY - 12 + drop} ${rootX - 4} ${rootY - 8 + drop}`} strokeWidth="1.7" />

        <path d={`M ${rootX + 1} ${rootY - 17 + drop} L ${rootX - 6} ${rootY - 13 + drop} L ${rootX - 9} ${rootY - 5 + drop * 0.5}`} strokeWidth="1.3" />
        <path d={`M ${rootX + 2} ${rootY - 17 + drop} L ${rootX + 7} ${rootY - 10 + drop} L ${rootX + 9} ${rootY}`} strokeWidth="1.4" />

        <path d={`M ${rootX - 4} ${rootY - 8 + drop} L ${rootX + 3} ${rootY - 3} L ${rootX + 2} ${rootY}`} strokeWidth="1.5" />
        <path d={`M ${rootX - 4} ${rootY - 8 + drop} L ${rootX - 7} ${rootY - 4} L ${rootX - 6} ${rootY}`} strokeWidth="1.5" />

        <path d={`M ${rootX} ${rootY} L ${rootX + 5} ${rootY} L ${rootX + 4} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
        <path d={`M ${rootX - 8} ${rootY} L ${rootX - 3} ${rootY} L ${rootX - 4} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
      </g>
    );
  }

  // 5. THE NICE FLEX ON GROUND LEVEL! (Double-bicep flex, chest out, proud grin)
  if (pose === 'COOL_FLEX') {
    const rise = easeOutQuad(Math.min(t / 0.35, 1));
    const flexPump = t > 0.35 ? Math.sin((t - 0.35) * 5) * 1.5 : 0;

    return (
      <g>
        <circle cx={rootX} cy={rootY - 30 - rise * 2} r="3.8" strokeWidth="1.4" />
        <path d={`M ${rootX - 3} ${rootY - 34 - rise * 2} Q ${rootX + 2} ${rootY - 37 - rise * 2} ${rootX + 6} ${rootY - 33 - rise * 2}`} strokeWidth="1.2" />
        <circle cx={rootX + 2} cy={rootY - 29.5 - rise * 2} r="0.6" fill="currentColor" />

        <line x1={rootX} y1={rootY - 26 - rise * 2} x2={rootX} y2={rootY - 14} strokeWidth="1.8" />

        <path
          d={`M ${rootX} ${rootY - 23 - rise * 2} L ${rootX - 8} ${rootY - 24 - rise * 2 + flexPump} L ${rootX - 6} ${rootY - 32 - rise * 2 + flexPump}`}
          strokeWidth="1.8"
        />
        <circle cx={rootX - 6} cy={rootY - 32 - rise * 2 + flexPump} r="1.2" fill="currentColor" />

        <path
          d={`M ${rootX} ${rootY - 23 - rise * 2} L ${rootX + 8} ${rootY - 24 - rise * 2 - flexPump} L ${rootX + 6} ${rootY - 32 - rise * 2 - flexPump}`}
          strokeWidth="1.8"
        />
        <circle cx={rootX + 6} cy={rootY - 32 - rise * 2 - flexPump} r="1.2" fill="currentColor" />

        <path d={`M ${rootX} ${rootY - 14} L ${rootX - 5} ${rootY - 6} L ${rootX - 6} ${rootY - 2}`} strokeWidth="1.6" />
        <path d={`M ${rootX} ${rootY - 14} L ${rootX + 5} ${rootY - 6} L ${rootX + 6} ${rootY - 2}`} strokeWidth="1.6" />

        <path d={`M ${rootX - 9} ${rootY} L ${rootX - 3} ${rootY} L ${rootX - 4} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
        <path d={`M ${rootX + 3} ${rootY} L ${rootX + 9} ${rootY} L ${rootX + 8} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
      </g>
    );
  }

  // 6. TAP COW (Playful smack on cow's rear on ground level)
  if (pose === 'TAP_COW') {
    const windup = t < 0.35 ? t / 0.35 : 1;
    const smackArmX = t < 0.35 ? rootX - 5 * windup : rootX + 15;
    const smackArmY = t < 0.35 ? rootY - 24 - 3 * windup : rootY - 17;

    return (
      <g>
        <circle cx={rootX + 3} cy={rootY - 28} r="3.8" strokeWidth="1.4" />
        <circle cx={rootX + 5} cy={rootY - 28} r="0.6" fill="currentColor" />
        <line x1={rootX + 2} y1={rootY - 24} x2={rootX} y2={rootY - 13} strokeWidth="1.7" />

        <path d={`M ${rootX + 1} ${rootY - 22} L ${rootX - 4} ${rootY - 18} L ${rootX - 2} ${rootY - 14}`} strokeWidth="1.3" />
        <path d={`M ${rootX + 2} ${rootY - 22} L ${smackArmX - 4} ${smackArmY - 2} L ${smackArmX} ${smackArmY}`} strokeWidth="1.6" />

        <path d={`M ${rootX} ${rootY - 13} L ${rootX + 3} ${rootY - 6} L ${rootX + 3} ${rootY - 2}`} strokeWidth="1.5" />
        <path d={`M ${rootX} ${rootY - 13} L ${rootX - 4} ${rootY - 6} L ${rootX - 4} ${rootY - 2}`} strokeWidth="1.5" />

        <path d={`M ${rootX + 1} ${rootY} L ${rootX + 6} ${rootY} L ${rootX + 5} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
        <path d={`M ${rootX - 6} ${rootY} L ${rootX - 1} ${rootY} L ${rootX - 2} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
      </g>
    );
  }

  // 7. CELEBRATE (Hands in the air on ground level)
  if (pose === 'CELEBRATE') {
    return (
      <g>
        <circle cx={rootX} cy={rootY - 30} r="3.8" strokeWidth="1.4" />
        <circle cx={rootX + 2} cy={rootY - 30} r="0.6" fill="currentColor" />
        <line x1={rootX} y1={rootY - 26} x2={rootX} y2={rootY - 14} strokeWidth="1.7" />

        <path d={`M ${rootX} ${rootY - 24} L ${rootX - 7} ${rootY - 31} L ${rootX - 9} ${rootY - 37}`} strokeWidth="1.4" />
        <path d={`M ${rootX} ${rootY - 24} L ${rootX + 7} ${rootY - 31} L ${rootX + 9} ${rootY - 37}`} strokeWidth="1.4" />

        <path d={`M ${rootX} ${rootY - 14} L ${rootX - 3} ${rootY - 6} L ${rootX - 3} ${rootY - 2}`} strokeWidth="1.5" />
        <path d={`M ${rootX} ${rootY - 14} L ${rootX + 3} ${rootY - 6} L ${rootX + 3} ${rootY - 2}`} strokeWidth="1.5" />

        <path d={`M ${rootX - 5} ${rootY} L ${rootX - 1} ${rootY} L ${rootX - 2} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
        <path d={`M ${rootX + 1} ${rootY} L ${rootX + 5} ${rootY} L ${rootX + 4} ${rootY - 2} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
      </g>
    );
  }

  // 8. JUMP UP INTO THE TREE (Dynamic upward leap towards tree branch)
  if (pose === 'JUMP_TREE') {
    return (
      <g transform={`rotate(${flightAngle}, ${rootX}, ${rootY - 18})`}>
        {/* Head tilted up towards the tree branch */}
        <circle cx={rootX + 5} cy={rootY - 28} r="3.8" strokeWidth="1.4" />
        <circle cx={rootX + 7} cy={rootY - 29} r="0.6" fill="currentColor" />
        <path d={`M ${rootX + 2} ${rootY - 32} Q ${rootX + 7} ${rootY - 35} ${rootX + 11} ${rootY - 31}`} strokeWidth="1.2" />

        {/* Torso angled up-forward */}
        <line x1={rootX + 3} y1={rootY - 24} x2={rootX - 2} y2={rootY - 12} strokeWidth="1.7" />

        {/* Arms reaching up to grab the branch */}
        <path d={`M ${rootX + 3} ${rootY - 23} L ${rootX + 10} ${rootY - 31} L ${rootX + 15} ${rootY - 36}`} strokeWidth="1.4" />
        <path d={`M ${rootX + 2} ${rootY - 22} L ${rootX + 8} ${rootY - 28} L ${rootX + 13} ${rootY - 33}`} strokeWidth="1.4" />

        {/* Athletic jump legs trailing behind */}
        <path d={`M ${rootX - 2} ${rootY - 12} L ${rootX - 6} ${rootY - 4} L ${rootX - 12} ${rootY - 2}`} strokeWidth="1.5" />
        <path d={`M ${rootX - 2} ${rootY - 12} L ${rootX - 3} ${rootY - 5} L ${rootX - 8} ${rootY + 1}`} strokeWidth="1.5" />

        <path d={`M ${rootX - 12} ${rootY - 2} L ${rootX - 16} ${rootY - 3} L ${rootX - 14} ${rootY - 5} Z`} fill="currentColor" fillOpacity="0.3" strokeWidth="1.0" />
      </g>
    );
  }

  // 9. CLIMB / HOIST UP ONTO BRANCH
  if (pose === 'CLIMB_SIT_BRANCH') {
    return (
      <g>
        <circle cx={rootX + 1} cy={rootY - 24} r="3.8" strokeWidth="1.4" />
        <circle cx={rootX + 3} cy={rootY - 24} r="0.6" fill="currentColor" />

        {/* Torso pulling up onto the branch */}
        <line x1={rootX + 1} y1={rootY - 20} x2={rootX} y2={rootY - 2} strokeWidth="1.7" />

        {/* Hands gripping the branch at rootY */}
        <path d={`M ${rootX} ${rootY - 18} L ${rootX - 5} ${rootY - 10} L ${rootX - 7} ${rootY}`} strokeWidth="1.4" />
        <path d={`M ${rootX + 2} ${rootY - 18} L ${rootX + 6} ${rootY - 10} L ${rootX + 7} ${rootY}`} strokeWidth="1.4" />

        {/* Legs swinging up to sit on branch */}
        <path d={`M ${rootX} ${rootY - 2} L ${rootX + 3} ${rootY + 2} L ${rootX + 4} ${rootY + 8}`} strokeWidth="1.5" />
        <path d={`M ${rootX} ${rootY - 2} L ${rootX - 2} ${rootY + 2} L ${rootX - 2} ${rootY + 9}`} strokeWidth="1.5" />
      </g>
    );
  }

  // 10. SIT ON TREE BRANCH & LOOK AT USER ONCE!
  if (pose === 'SIT_TREE_LOOK_USER') {
    const wave = Math.sin(t * 6.5) * 1.5;

    return (
      <g>
        {/* Floating Comic Speech Bubble greeting the user directly */}
        <g className="animate-pulse">
          <rect
            x={rootX + 8}
            y={rootY - 40}
            width="28"
            height="13"
            rx="3.5"
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="0.9"
          />
          <polygon
            points={`${rootX + 12},${rootY - 27} ${rootX + 9},${rootY - 23} ${rootX + 15},${rootY - 27}`}
            fill="currentColor"
            fillOpacity="0.12"
            stroke="currentColor"
            strokeWidth="0.8"
          />
          <text
            x={rootX + 22}
            y={rootY - 31}
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="bold"
            fill="currentColor"
            stroke="none"
            fontFamily="system-ui, -apple-system, sans-serif"
          >
            Hey! 👋
          </text>
        </g>

        {/* FRONT-FACING HEAD looking directly at user */}
        <circle cx={rootX} cy={rootY - 21} r="4.0" strokeWidth="1.4" />
        {/* Stylish wind-swept hair */}
        <path d={`M ${rootX - 4} ${rootY - 24} Q ${rootX} ${rootY - 27} ${rootX + 5} ${rootY - 23}`} strokeWidth="1.2" />

        {/* Front-facing eyes looking right at the user with friendly wink */}
        <circle cx={rootX - 1.6} cy={rootY - 21} r="0.7" fill="currentColor" />
        {/* Playful wink on right eye */}
        <path d={`M ${rootX + 0.8} ${rootY - 21} Q ${rootX + 2.0} ${rootY - 22.2} ${rootX + 3.2} ${rootY - 21}`} strokeWidth="1.2" />

        {/* Confident, warm smile */}
        <path d={`M ${rootX - 1.6} ${rootY - 18} Q ${rootX} ${rootY - 16.5} ${rootX + 1.8} ${rootY - 18}`} strokeWidth="1.1" />

        {/* Front-facing torso */}
        <line x1={rootX} y1={rootY - 17} x2={rootX} y2={rootY} strokeWidth="1.8" />
        <line x1={rootX - 5} y1={rootY - 16} x2={rootX + 5} y2={rootY - 16} strokeWidth="1.4" />

        {/* Left hand resting comfortably on the branch surface */}
        <path d={`M ${rootX - 5} ${rootY - 16} L ${rootX - 8} ${rootY - 8} L ${rootX - 9} ${rootY}`} strokeWidth="1.4" />

        {/* Right arm raised waving / giving a friendly peace sign to the user */}
        <path d={`M ${rootX + 5} ${rootY - 16} L ${rootX + 9} ${rootY - 21} L ${rootX + 10 + wave} ${rootY - 27}`} strokeWidth="1.4" />
        {/* Peace sign fingers */}
        <line x1={rootX + 10 + wave} y1={rootY - 27} x2={rootX + 8 + wave} y2={rootY - 32} strokeWidth="1.3" />
        <line x1={rootX + 10 + wave} y1={rootY - 27} x2={rootX + 13 + wave} y2={rootY - 31} strokeWidth="1.3" />

        {/* HIPS RESTING DIRECTLY ON TOP OF TREE BRANCH AT rootY */}
        <line x1={rootX - 5} y1={rootY} x2={rootX + 4} y2={rootY} strokeWidth="1.8" />

        {/* LEGS DANGLING FREELY BELOW THE TREE BRANCH */}
        {/* Left leg hanging straight down */}
        <path d={`M ${rootX - 2} ${rootY} L ${rootX - 2} ${rootY + 6} L ${rootX - 2} ${rootY + 11}`} strokeWidth="1.5" />
        <path
          d={`M ${rootX - 4} ${rootY + 11} L ${rootX + 1} ${rootY + 11} L ${rootX} ${rootY + 13} L ${rootX - 4} ${rootY + 13} Z`}
          fill="currentColor"
          fillOpacity="0.3"
          strokeWidth="1.0"
        />

        {/* Right leg dangling with gentle relaxed sway in the breeze */}
        <path d={`M ${rootX + 2} ${rootY} L ${rootX + 3 + wave * 0.4} ${rootY + 6} L ${rootX + 3 + wave * 0.4} ${rootY + 11}`} strokeWidth="1.5" />
        <path
          d={`M ${rootX + 1 + wave * 0.4} ${rootY + 11} L ${rootX + 6 + wave * 0.4} ${rootY + 11} L ${rootX + 5 + wave * 0.4} ${rootY + 13} L ${rootX + 1 + wave * 0.4} ${rootY + 13} Z`}
          fill="currentColor"
          fillOpacity="0.3"
          strokeWidth="1.0"
        />
      </g>
    );
  }

  // 11. SIT ON TREE BRANCH WATCHING MOBILE PHONE (Firmly seated on branch, watching phone)
  if (pose === 'SIT_TREE_PHONE') {
    const phoneGlow = 0.75 + Math.sin(t * 3.0) * 0.25;
    const legSway = Math.sin(t * 2.0) * 1.6;
    const thumbTap = Math.sin(t * 4.5) * 0.7;

    return (
      <g>
        {/* Head tilted down peacefully gazing at mobile phone */}
        <circle cx={rootX + 1} cy={rootY - 21} r="3.8" strokeWidth="1.4" />
        <path d={`M ${rootX - 2} ${rootY - 25} Q ${rootX + 2} ${rootY - 28} ${rootX + 5} ${rootY - 24}`} strokeWidth="1.2" />
        <circle cx={rootX + 2.5} cy={rootY - 20.5} r="0.6" fill="currentColor" />

        {/* Torso leaning comfortably forward towards phone */}
        <line x1={rootX} y1={rootY - 17} x2={rootX - 1} y2={rootY} strokeWidth="1.7" />

        {/* HIPS RESTING FIRMLY AND SOLIDLY ON THE BRANCH SURFACE AT rootY */}
        <line x1={rootX - 5} y1={rootY} x2={rootX + 4} y2={rootY} strokeWidth="1.8" />

        {/* Relaxed legs dangling off the branch into open air */}
        {/* Left leg dangling down */}
        <path
          d={`M ${rootX - 2} ${rootY} L ${rootX - 1} ${rootY + 6} L ${rootX - 1} ${rootY + 11}`}
          strokeWidth="1.5"
        />
        <path
          d={`M ${rootX - 3} ${rootY + 11} L ${rootX + 2} ${rootY + 11} L ${rootX + 1} ${rootY + 13} L ${rootX - 3} ${rootY + 13} Z`}
          fill="currentColor"
          fillOpacity="0.3"
          strokeWidth="1.0"
        />

        {/* Right leg dangling with gentle breeze swing */}
        <path
          d={`M ${rootX + 2} ${rootY} L ${rootX + 3 + legSway} ${rootY + 6} L ${rootX + 3 + legSway} ${rootY + 11}`}
          strokeWidth="1.5"
        />
        <path
          d={`M ${rootX + 1 + legSway} ${rootY + 11} L ${rootX + 6 + legSway} ${rootY + 11} L ${rootX + 5 + legSway} ${rootY + 13} L ${rootX + 1 + legSway} ${rootY + 13} Z`}
          fill="currentColor"
          fillOpacity="0.3"
          strokeWidth="1.0"
        />

        {/* Arms holding the mobile phone in lap */}
        <path d={`M ${rootX} ${rootY - 15} L ${rootX + 4} ${rootY - 10} L ${rootX + 6} ${rootY - 12}`} strokeWidth="1.3" />
        <path d={`M ${rootX} ${rootY - 15} L ${rootX + 2} ${rootY - 9} L ${rootX + 5} ${rootY - 11}`} strokeWidth="1.3" />

        {/* Mobile Phone Device Body */}
        <rect
          x={rootX + 5}
          y={rootY - 17}
          width="5.8"
          height="10"
          rx="1.2"
          fill="currentColor"
          fillOpacity="0.15"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        {/* Glowing Screen */}
        <rect
          x={rootX + 5.6}
          y={rootY - 16.3}
          width="4.6"
          height="8.6"
          rx="0.8"
          fill="#38bdf8"
          fillOpacity={0.85 * phoneGlow}
          stroke="none"
        />
        {/* Soft Ambient Cyan Glow */}
        <circle
          cx={rootX + 7.9}
          cy={rootY - 12}
          r="7.5"
          fill="#38bdf8"
          fillOpacity={0.24 * phoneGlow}
        />
        {/* Tapping thumb */}
        <circle cx={rootX + 5.2} cy={rootY - 12 + thumbTap} r="0.7" fill="currentColor" />
      </g>
    );
  }

  return null;
};

export default HeroManAdventure;
