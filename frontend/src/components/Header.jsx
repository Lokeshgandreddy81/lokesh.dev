import React, { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import { useTheme } from '../context/ThemeContext';

const Header = ({ onMenuClick }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const timeZones = {
      'et': 'America/New_York',
      'ist': 'Asia/Kolkata',
      'pst': 'America/Los_Angeles',
      'cst': 'America/Chicago',
      'gmt': 'Europe/London'
    };

    const timeZone = timeZones[siteConfig.timezone.toLowerCase()] || 'America/New_York';

    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: timeZone
    }) + ' ' + siteConfig.timezone.toLowerCase();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-colors duration-300">
      <div className="w-full px-6 md:px-8 py-2.5 md:py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 md:gap-3.5 text-xs md:text-[13px] text-muted">
          <span>{siteConfig.location}</span>
          <span>·</span>
          <span className="font-mono">{formatTime(currentTime)}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-1.5 text-muted hover:text-foreground transition-colors rounded-full hover:bg-accent"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button
            onClick={onMenuClick}
            className="flex items-center gap-2 text-xs md:text-[13px] text-muted hover:text-foreground transition-colors"
          >
            <span>Menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;