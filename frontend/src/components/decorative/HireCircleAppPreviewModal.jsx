import React, { useState, useEffect, useRef } from 'react';
import { X, RotateCcw, Key, Github } from 'lucide-react';

/**
 * HireCircleAppPreviewModal
 * - Single iPhone in the center
 * - Embeds the real, fully functional and interactive HireCircle app
 * - Allows users to freely interact, click, type, test flows, and experience the app
 * - Neat & clean top nav with 'App Preview' centered
 */
const HireCircleAppPreviewModal = ({ isOpen, onClose }) => {
  const [key, setKey] = useState(0);
  const iframeRef = useRef(null);

  const handleReset = () => {
    setKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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
      {/* ── Top Navigation Bar: Reset Button & App Preview Grouped Together ── */}
      <div className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 pointer-events-none">
        {/* Reset Button and App Preview Badge Beside Each Other */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            onClick={handleReset}
            className="w-10 h-10 rounded-full border border-white/15 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white/60 hover:text-white hover:border-purple-400 hover:bg-purple-600/30 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl cursor-pointer"
            title="Restart App (Reset)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span
            className="text-sm md:text-base font-light tracking-[0.25em] text-white/90 uppercase select-none ml-1"
            style={{ fontFamily: 'Cormorant Garamond, serif' }}
          >
            App Preview
          </span>
        </div>

        {/* Right Side Controls: GitHub Repo + Close Button */}
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <a
            href="https://github.com/Lokeshgandreddy81/HireCircle"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-purple-400 hover:bg-purple-600/30 hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl cursor-pointer"
            title="View HireCircle on GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-white/20 bg-black/60 backdrop-blur-xl flex items-center justify-center text-white/70 hover:text-white hover:border-purple-400 hover:bg-purple-600/30 hover:scale-110 active:scale-95 transition-all duration-300 shadow-2xl cursor-pointer"
            title="Close Preview (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* ── Right Side Corner: Demo Credentials Card ── */}
      <div className="fixed right-6 md:right-10 top-20 z-40 flex flex-col gap-2 p-3.5 sm:p-4 rounded-2xl bg-black/70 border border-white/15 backdrop-blur-2xl shadow-2xl max-w-[210px] pointer-events-auto select-none animate-in fade-in slide-in-from-right-4 duration-300">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-purple-500/20 border border-purple-400/30 flex items-center justify-center">
            <Key className="w-3 h-3 text-purple-300" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-300">
            Demo Credentials
          </span>
        </div>

        <div className="space-y-1.5 pt-1 text-[11px] font-mono">
          <div className="flex items-center justify-between text-white/70">
            <span className="text-white/40">Number:</span>
            <span className="text-white font-semibold">98765 43210</span>
          </div>
          <div className="flex items-center justify-between text-white/70">
            <span className="text-white/40">Password:</span>
            <span className="text-purple-300 font-bold bg-white/10 px-1.5 py-0.5 rounded">12345</span>
          </div>
        </div>

        <p className="text-[10px] text-white/45 font-sans leading-tight pt-1 border-t border-white/10">
          Use any random number & pass <span className="text-white/80 font-mono font-semibold">12345</span> to explore freely.
        </p>
      </div>

      {/* ── Center Stage: Minimalist & Clean Mobile Device ── */}
      <div className="flex flex-col items-center justify-center w-full h-full pt-4 pb-4">
        {/* Sleek Minimalist Device Frame */}
        <div
          className="relative select-none transition-all duration-300"
          style={{
            width: 'clamp(320px, 28vw, 385px)',
            height: 'clamp(680px, 86vh, 820px)',
            borderRadius: 44,
            padding: '7px',
            background: '#121318',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 25px 80px -15px rgba(0, 0, 0, 0.95), 0 0 50px -15px rgba(139, 92, 246, 0.2)',
          }}
        >
          {/* Subtle Top Speaker Slit */}
          <div
            className="absolute top-1.5 left-1/2 -translate-x-1/2 z-40"
            style={{
              width: 44,
              height: 3,
              borderRadius: 2,
              background: '#0a0a0e',
            }}
          />

          {/* ── Clean Inner Mobile Display ── */}
          <div
            className="relative w-full h-full overflow-hidden bg-white"
            style={{
              borderRadius: 38,
            }}
          >
            {/* Live Interactive HireCircle Web Application */}
            <iframe
              key={key}
              ref={iframeRef}
              src="/apps/hirecircle/index.html"
              title="HireCircle Interactive Mobile App"
              className="w-full h-full border-0 select-auto"
              allow="microphone; camera; clipboard-read; clipboard-write"
            />

            {/* Subtle Bottom iOS Home Indicator */}
            <div
              className="absolute bottom-1.5 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
              style={{
                width: 110,
                height: 3.5,
                borderRadius: 2,
                background: 'rgba(0, 0, 0, 0.2)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HireCircleAppPreviewModal;
