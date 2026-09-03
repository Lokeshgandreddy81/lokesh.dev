import React, { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Github } from 'lucide-react';

/* ─── All 21 Real Production Screens Captured from hire-app.zip ─── */
const ALL_REAL_SCREENS = [
  // ── 01 Auth & Onboarding ──
  {
    id: 'role-selection',
    tag: 'Auth',
    title: 'Role Selection',
    subtitle: 'Job Seeker vs. Employer',
    image: '/images/hirecircle/real_screen_1_role.png',
  },
  {
    id: 'login',
    tag: 'Auth',
    title: 'Authentication',
    subtitle: 'Phone & Email Sign In',
    image: '/images/hirecircle/real_screen_2_login.png',
  },

  // ── 02 Connect & Community ──
  {
    id: 'connect-feed',
    tag: 'Connect',
    title: 'Social Feed',
    subtitle: 'Voice Clips & Karma',
    image: '/images/hirecircle/connect_feed.png',
  },
  {
    id: 'connect-pulse',
    tag: 'Connect',
    title: 'Live Pulse',
    subtitle: 'Nearby Gigs & Workers Radar',
    image: '/images/hirecircle/connect_pulse.png',
  },
  {
    id: 'connect-circles',
    tag: 'Connect',
    title: 'Trade Circles',
    subtitle: 'Verified Driver Communities',
    image: '/images/hirecircle/connect_circles.png',
  },
  {
    id: 'circle-chat-room',
    tag: 'Connect',
    title: 'Circle Chat Room',
    subtitle: 'Real-time Route & Highway Advice',
    image: '/images/hirecircle/screen_extra_user_profile.png',
  },
  {
    id: 'connect-academy',
    tag: 'Connect',
    title: 'AI Academy',
    subtitle: 'Mentor Match & Upskilling',
    image: '/images/hirecircle/connect_academy.png',
  },
  {
    id: 'connect-bounties',
    tag: 'Connect',
    title: 'Referral Bounties',
    subtitle: '₹5,000 Cash Referral Rewards',
    image: '/images/hirecircle/connect_bounties.png',
  },

  // ── 03 Smart Matching & Jobs ──
  {
    id: 'jobs-feed',
    tag: 'Jobs',
    title: 'Job Recommendations',
    subtitle: 'AI Feed with 92% Match Score',
    image: '/images/hirecircle/real_screen_4_jobs.png',
  },
  {
    id: 'job-detail',
    tag: 'Jobs',
    title: 'Job Specifications',
    subtitle: 'Match Analysis & Salary Breakdown',
    image: '/images/hirecircle/screen_extra_job_detail.png',
  },

  // ── 04 Chat, Inquiries & Calling ──
  {
    id: 'applications-candidate',
    tag: 'Chat & Apps',
    title: 'Candidate Applications',
    subtitle: 'Active Employer Tracker',
    image: '/images/hirecircle/real_screen_3_applications.png',
  },
  {
    id: 'applications-employer',
    tag: 'Chat & Apps',
    title: 'Employer Inquiries',
    subtitle: 'Applicant Pipeline & Screening',
    image: '/images/hirecircle/employer_viewing_candidate_details.png',
  },
  {
    id: 'chat-live',
    tag: 'Chat & Apps',
    title: 'Real-Time Chat',
    subtitle: 'Instant Candidate Messaging',
    image: '/images/hirecircle/real_screen_chat.png',
  },
  {
    id: 'call-overlay',
    tag: 'Chat & Apps',
    title: 'Voice & Video Calling',
    subtitle: 'In-App Telephony Overlay',
    image: '/images/hirecircle/real_screen_calling_overlay.png',
  },

  // ── 05 Company Details & Time Frame Timeline ──
  {
    id: 'company-overview',
    tag: 'Company Details',
    title: 'Enterprise Hub',
    subtitle: 'LogiTech Mission, Vision & HQ',
    image: '/images/hirecircle/company_details_overview.png',
  },
  {
    id: 'company-timeline',
    tag: 'Company Details',
    title: 'Milestone Time Frame',
    subtitle: 'Services & 2015–2023 Timeline',
    image: '/images/hirecircle/company_details_timeline.png',
  },

  // ── 06 Profiles (Both Sides) & Settings ──
  {
    id: 'profiles-list',
    tag: 'User Side',
    title: 'My Profiles',
    subtitle: 'Heavy Driver & Private Chauffeur',
    image: '/images/hirecircle/screen_extra_profiles_tab.png',
  },
  {
    id: 'user-profile-gold',
    tag: 'User Side',
    title: 'Complete User Profile',
    subtitle: 'Gold Tier, 4.8 Rating & 1.2k Karma',
    image: '/images/hirecircle/candidate_my_profile_full.png',
  },
  {
    id: 'employer-candidate-view',
    tag: 'Employer Side',
    title: 'Candidate Resume View',
    subtitle: 'Employer Applicant Profile & Bio',
    image: '/images/hirecircle/employer_candidate_profile_full.png',
  },
  {
    id: 'employer-talent-pools',
    tag: 'Employer Side',
    title: 'Talent Pools',
    subtitle: 'Candidate Pipeline Grouping',
    image: '/images/hirecircle/screen_extra_employer_talent_pools.png',
  },
  {
    id: 'settings',
    tag: 'Account',
    title: 'App Settings',
    subtitle: 'Preferences, Toggles & Security',
    image: '/images/hirecircle/real_screen_6_settings.png',
  },
];

/* ─── Authentic iPhone Frame Component ─── */
const IPhoneDevice = ({ screen }) => {
  return (
    <div className="flex flex-col items-center select-none w-full">
      {/* iPhone Outer Chassis with Titanium Metal Finish */}
      <div
        className="relative group transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5"
        style={{
          width: 'clamp(300px, 24vw, 360px)',
          height: 'clamp(670px, 83vh, 790px)',
          borderRadius: 54,
          padding: '10px 10px 12px',
          background: 'linear-gradient(145deg, #3a3a46 0%, #1e1e26 40%, #121217 100%)',
          boxShadow: `
            0 0 0 1px rgba(255, 255, 255, 0.2),
            0 0 0 3px #282834,
            0 0 0 5px #111116,
            0 30px 90px -15px rgba(0, 0, 0, 0.95),
            0 0 60px -15px rgba(139, 92, 246, 0.25)
          `,
        }}
      >
        {/* ── Left Hardware Buttons (Action Button + Volume Up & Down) ── */}
        {/* Action Button */}
        <div
          className="absolute -left-[6px] top-24 w-[3.5px] h-7 rounded-l-sm"
          style={{ background: 'linear-gradient(to bottom, #4f4f60, #22222c)' }}
        />
        {/* Volume Up */}
        <div
          className="absolute -left-[6px] top-36 w-[3.5px] h-12 rounded-l-sm"
          style={{ background: 'linear-gradient(to bottom, #4f4f60, #22222c)' }}
        />
        {/* Volume Down */}
        <div
          className="absolute -left-[6px] top-52 w-[3.5px] h-12 rounded-l-sm"
          style={{ background: 'linear-gradient(to bottom, #4f4f60, #22222c)' }}
        />

        {/* ── Right Hardware Button (Side / Power Button) ── */}
        <div
          className="absolute -right-[6px] top-36 w-[3.5px] h-16 rounded-r-sm"
          style={{ background: 'linear-gradient(to bottom, #4f4f60, #22222c)' }}
        />

        {/* ── Top Speaker Ear-piece Slit ── */}
        <div
          className="absolute top-2 left-1/2 -translate-x-1/2 z-40"
          style={{
            width: 48,
            height: 3,
            borderRadius: 2,
            background: '#09090c',
          }}
        />

        {/* ── iPhone Screen Inner Display with Thin Uniform Bezel ── */}
        <div
          className="relative w-full h-full overflow-hidden bg-black"
          style={{
            borderRadius: 44,
          }}
        >
          {/* Actual High-Resolution App Screenshot */}
          <img
            src={screen.image}
            alt={screen.title}
            className="w-full h-full object-cover object-top select-none pointer-events-none"
            loading="eager"
          />

          {/* Realistic iPhone Glass Surface Specular Reflection */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.09) 0%, transparent 40%, transparent 100%)',
            }}
          />

          {/* iOS Bottom Home Indicator Bar */}
          <div
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
            style={{
              width: 120,
              height: 4.5,
              borderRadius: 3,
              background: 'rgba(255, 255, 255, 0.45)',
              backdropFilter: 'blur(6px)',
            }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * HireCircleGalleryModal
 * - Big, authentic iPhone frames spanning Left Corner, Center, and Right Corner
 * - Heavy top & bottom bars removed as requested
 * - Centered left/right navigation arrows positioned at screen edges
 * - Minimalist floating close button and keyboard controls
 */
const HireCircleGalleryModal = ({ isOpen, onClose }) => {
  const maxIndex = Math.max(0, ALL_REAL_SCREENS.length - 3);
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = useCallback(() => {
    setStartIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setStartIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  if (!isOpen) return null;

  const visibleScreens = ALL_REAL_SCREENS.slice(startIndex, startIndex + 3);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-200 overflow-hidden"
      style={{
        backgroundColor: 'rgba(8, 9, 13, 0.97)',
        backdropFilter: 'blur(24px)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* ── Top Navigation Bar: Neat & Clean 'Gallery' in Center ── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
        <div className="w-11" /> {/* Spacer to perfectly center Gallery */}
        <h2
          className="text-base md:text-lg font-light tracking-[0.25em] text-white/90 uppercase select-none pointer-events-auto"
          style={{ fontFamily: 'Cormorant Garamond, serif' }}
        >
          Gallery
        </h2>
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <a
            href="https://github.com/Lokeshgandreddy81/HireCircle"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-purple-400 hover:bg-purple-600/30 hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl cursor-pointer"
            title="View HireCircle on GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            onClick={onClose}
            className="w-11 h-11 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-purple-400 hover:bg-purple-600/30 hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl cursor-pointer"
            title="Close (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Far-Left Centered Navigation Arrow Button in Corner ── */}
      <button
        onClick={handlePrev}
        disabled={startIndex === 0}
        className={`fixed left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-13 h-13 md:w-15 md:h-15 rounded-full border border-white/15 bg-black/70 backdrop-blur-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-300 z-50 shrink-0 ${
          startIndex === 0
            ? 'opacity-15 cursor-not-allowed'
            : 'hover:bg-purple-600 hover:border-purple-400 hover:scale-110 active:scale-95 shadow-purple-900/40 cursor-pointer'
        }`}
        title="Previous Screen (Left Arrow)"
      >
        <ChevronLeft className="w-7 h-7 md:w-8 md:h-8" />
      </button>

      {/* ── Far-Right Centered Navigation Arrow Button in Corner ── */}
      <button
        onClick={handleNext}
        disabled={startIndex >= maxIndex}
        className={`fixed right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-13 h-13 md:w-15 md:h-15 rounded-full border border-white/15 bg-black/70 backdrop-blur-2xl flex items-center justify-center text-white shadow-2xl transition-all duration-300 z-50 shrink-0 ${
          startIndex >= maxIndex
            ? 'opacity-15 cursor-not-allowed'
            : 'hover:bg-purple-600 hover:border-purple-400 hover:scale-110 active:scale-95 shadow-purple-900/40 cursor-pointer'
        }`}
        title="Next Screen (Right Arrow)"
      >
        <ChevronRight className="w-7 h-7 md:w-8 md:h-8" />
      </button>

      {/* ── Main Showcase: 3 Big iPhones Brought Down for Perfect Visual Balance ── */}
      <div className="w-full max-w-[1480px] px-14 sm:px-18 md:px-24 flex items-center justify-between pt-14 md:pt-16 pb-4">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-12 xl:gap-16 items-center justify-items-center">
          {visibleScreens.map((screen, idx) => (
            <div
              key={screen.id}
              className={`w-full flex justify-center transition-all duration-500 transform animate-in fade-in zoom-in-95 ${
                idx === 0
                  ? 'md:justify-start'
                  : idx === 1
                  ? 'md:justify-center'
                  : 'md:justify-end'
              }`}
            >
              <IPhoneDevice screen={screen} />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default HireCircleGalleryModal;
