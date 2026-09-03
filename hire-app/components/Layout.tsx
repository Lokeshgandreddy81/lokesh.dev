
import React from 'react';
import { IconBriefcase, IconMessageSquare, IconUsers, IconSettings, IconGlobe, IconVideo } from './Icons';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  role: 'EMPLOYEE' | 'EMPLOYER';
  onTriggerInterview: () => void;
  showFab?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange, role, onTriggerInterview, showFab = true }) => {
  const tabs = [
    { id: 'connect', icon: IconGlobe, label: 'Connect' },
    { id: 'profiles', icon: IconUsers, label: role === 'EMPLOYEE' ? 'Profiles' : 'Talent' },
    { id: 'applications', icon: IconMessageSquare, label: 'Apps' },
    { id: 'jobs', icon: IconBriefcase, label: 'Jobs' },
    { id: 'settings', icon: IconSettings, label: 'Settings' },
  ];

  const handleRecordClick = () => {
    onTriggerInterview();
  };

  return (
    <div className="flex flex-col h-full w-full bg-slate-50 relative overflow-hidden">
      <main className="flex-1 overflow-y-auto overflow-x-hidden relative">
        {children}
      </main>

      {/* Floating Action Button for Voice/Video Recording */}
      {showFab && (
        <div className="absolute bottom-[5rem] right-4 z-20">
           <button 
             onClick={handleRecordClick}
             className="p-4 rounded-full shadow-lg bg-purple-600 text-white hover:bg-purple-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden group"
           >
             <IconVideo className="w-6 h-6" />
             <div className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-150 transition-transform duration-500 rounded-full" />
           </button>
        </div>
      )}
      
      {/* Navigation Bar - Spotify Style: 60px Height, Compact Content */}
      <nav className="bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 flex justify-between items-end z-10 shrink-0 h-[60px] pb-2 pt-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center w-full gap-[3px] active:scale-95 transition-transform ${
                isActive ? 'text-purple-600' : 'text-slate-400'
              }`}
            >
              <Icon className={`w-6 h-6 ${isActive ? 'fill-purple-50' : ''}`} />
              <span className="text-[10px] font-medium leading-none tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
