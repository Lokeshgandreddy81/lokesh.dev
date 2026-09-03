import React, { useState, useCallback } from 'react';
import siteConfig from '../config/siteConfig';
import HeroBirdsTreeAnimation from './decorative/HeroBirdsTreeAnimation';
import HeroManAdventure from './decorative/HeroManAdventure';

const Hero = () => {
  const [cowSurprised, setCowSurprised] = useState(false);

  const handleCowHit = useCallback(() => {
    setCowSurprised(true);
    setTimeout(() => {
      setCowSurprised(false);
    }, 1500);
  }, []);

  return (
    <section id="home" className="min-h-screen relative flex items-center justify-start pt-24 pb-20 px-6 md:pt-32 md:pb-32 md:px-8 overflow-hidden">
      <div className="max-w-[1400px] w-full">
        <div className="flex flex-col items-start gap-12 md:gap-16 relative z-10">
          {/* Profile Image */}
          <img
            src={siteConfig.profileImage}
            alt={siteConfig.name}
            className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full grayscale object-cover border border-border shadow-sm"
          />

          {/* Main Heading */}
          <h1
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-light leading-[1.2] text-foreground max-w-[1000px]"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            <span>Hi, I'm {siteConfig.firstName} </span>
            <span
              id="hero-dash"
              className="inline-block relative cursor-pointer select-none transition-transform hover:scale-125 hover:text-purple-600"
              title="Click me to replay the jump!"
            >
              —
            </span>
            <br />
            <span>I architect intelligent </span>
            <span id="hero-target-systems" className="inline-block">systems</span>{' '}
            <span>that think, automate, and </span>
            <span id="hero-target-scale" className="inline-block">scale.</span>{' '}
            <br className="hidden sm:inline" />
            <span>This is where ideas become infrastructure.</span>
          </h1>
        </div>
      </div>

      {/* Right Side - Tree, Falling Leaves & Varied Soaring/Landing Birds Animation */}
      <div className="hidden md:flex absolute right-0 md:right-1 lg:right-2 xl:right-3 bottom-[16%] items-end justify-center pointer-events-none z-0">
        <HeroBirdsTreeAnimation
          cowSurprised={cowSurprised}
          className="w-[220px] h-[280px] md:w-[260px] md:h-[330px] lg:w-[300px] lg:h-[380px] xl:w-[330px] xl:h-[410px]"
        />
      </div>

      {/* The Animated Line-Art Man Adventure: Dash -> Sentence Parkour -> Cow Hit -> Tree Chill */}
      <HeroManAdventure onCowHit={handleCowHit} />
    </section>
  );
};

export default Hero;