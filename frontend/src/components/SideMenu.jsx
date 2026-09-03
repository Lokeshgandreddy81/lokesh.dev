import React from 'react';
import { X } from 'lucide-react';

const SideMenu = ({ isOpen, onClose }) => {
  const mainMenuItems = [
    { label: 'Home', href: '#home' },
    { label: "Let's work together", href: '#contact' },
    { label: 'Resume', href: '/resume.html', external: true }
  ];
  
  const workMenuItems = [
    { label: 'Cortex Platform', href: '#cortex' },
    { label: 'AI Hiring Platform', href: '#hirecircle' },
    { label: 'Home Diagnostic AI', href: '#homediagnostic' }
  ];

  const handleNavClick = (e, item) => {
    if (item.external) return;
    e.preventDefault();
    onClose();
    if (item.href.startsWith('#')) {
      const target = document.querySelector(item.href);
      if (target) {
        const headerOffset = 65;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Side Menu */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[500px] bg-background border-l border-border z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        <div className="p-8">
          <button 
            onClick={onClose}
            className="mb-12 text-muted hover:text-foreground transition-colors flex items-center gap-2 cursor-pointer group"
          >
            <span className="group-hover:-translate-x-0.5 transition-transform">Close menu</span>
            <span className="text-muted/50">·</span>
          </button>
          
          <div className="grid grid-cols-2 gap-12">
            {/* MAIN Column */}
            <nav className="space-y-6">
              <h3 className="text-sm uppercase tracking-wider text-muted/70 mb-6 font-mono text-xs">MAIN</h3>
              {mainMenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : ''}
                  className="block text-2xl font-serif text-foreground hover:text-purple-400 hover:translate-x-1 transition-all duration-200"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
            
            {/* WORK Column */}
            <nav className="space-y-6">
              <h3 className="text-sm uppercase tracking-wider text-muted/70 mb-6 font-mono text-xs">WORK</h3>
              {workMenuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : ''}
                  className="block text-2xl font-serif text-foreground hover:text-purple-400 hover:translate-x-1 transition-all duration-200"
                  style={{ fontFamily: 'Cormorant Garamond, serif' }}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;