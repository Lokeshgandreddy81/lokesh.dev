import React, { useState } from 'react';
import { ArrowRight, Smartphone } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import CortexAnimation from './decorative/CortexAnimation';
import CortexLogo from './decorative/CortexLogo';
import EnterpriseAiAnimation from './decorative/EnterpriseAiAnimation';
import HireCircleLogo from './decorative/HireCircleLogo';
import HireCircleGalleryModal from './decorative/HireCircleGalleryModal';
import HireCircleAppPreviewModal from './decorative/HireCircleAppPreviewModal';

const WorkSection = () => {
  const cortex = siteConfig.workExperiences[0];
  const hirecircle = siteConfig.workExperiences[1];
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isAppPreviewOpen, setIsAppPreviewOpen] = useState(false);

  return (
    <section className="py-0">
      <div className="w-full">
        {/* Cortex Section - Text Left, Decoration Right */}
        <div id="cortex" className="flex flex-col-reverse md:grid md:grid-cols-2 border-b section-border min-h-screen">
          <div className="px-6 pt-8 pb-8 md:px-16 md:pt-10 md:pb-10 lg:pt-12 lg:pb-12 flex flex-col justify-between section-border md:border-r border-t md:border-t-0">
            {/* Top Logo */}
            <div id="cortex-logo-target" className="self-start relative">
              <CortexLogo className="w-16 h-16 md:w-20 md:h-20 text-foreground" />
            </div>

            {/* Middle Main Content */}
            <div className="my-auto py-8">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.18] mb-6 md:mb-8 text-foreground max-w-[640px]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {cortex.title}
              </h2>
              <p className="text-muted text-lg md:text-xl leading-relaxed max-w-[580px]">
                {cortex.description}
              </p>
            </div>

            {/* Bottom Corner CTA Button */}
            <div className="pt-6 flex justify-end">
              <a
                href={cortex.link}
                target={cortex.link.startsWith('http') ? '_blank' : '_self'}
                rel={cortex.link.startsWith('http') ? 'noopener noreferrer' : ''}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 theme-button-border transition-all duration-300 group shrink-0"
              >
                <ArrowRight className="w-6 h-6 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </a>
            </div>
          </div>

          {/* Right Column Decoration */}
          <div className="px-6 py-12 md:px-16 md:py-24 flex items-center justify-center">
            <CortexAnimation className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80" />
          </div>
        </div>

        {/* HireCircle AI Hiring Section - Decoration Left, Text Right */}
        <div id="hirecircle" className="flex flex-col md:grid md:grid-cols-2 border-b section-border min-h-screen">
          <div className="px-6 py-12 md:px-16 md:py-24 flex items-center justify-center section-border md:border-r border-b md:border-b-0">
            <EnterpriseAiAnimation className="w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80" />
          </div>

          <div className="px-6 pt-8 pb-8 md:px-16 md:pt-10 md:pb-10 lg:pt-12 lg:pb-12 flex flex-col justify-between">
            {/* Top Company Logo */}
            <div id="hirecircle-logo-target" className="self-start relative">
              <HireCircleLogo className="w-16 h-16 md:w-20 md:h-20 text-foreground" />
            </div>

            {/* Middle Main Content */}
            <div className="my-auto py-8">
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.18] mb-6 md:mb-8 text-foreground max-w-[640px]"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                {hirecircle.title}
              </h2>
              <p className="text-muted text-lg md:text-xl leading-relaxed max-w-[580px]">
                {hirecircle.description}
              </p>
            </div>

            {/* Bottom Corner Action Buttons: Gallery + Interactive App Preview */}
            <div className="pt-6 flex items-center justify-end gap-4">
              {/* Gallery Button */}
              <button
                type="button"
                onClick={() => setIsGalleryOpen(true)}
                className="inline-flex items-center gap-3 px-6 h-16 rounded-full border-2 theme-button-border transition-all duration-300 group hover:border-foreground cursor-pointer"
                title="Explore HireCircle Screens Showcase"
              >
                <Smartphone className="w-5 h-5 text-muted group-hover:text-foreground group-hover:scale-110 transition-all duration-300" />
                <span className="text-sm font-semibold tracking-wider uppercase text-muted group-hover:text-foreground transition-colors">
                  Gallery
                </span>
              </button>

              {/* Arrow Button: Opens Live Single-Phone App Preview */}
              <button
                type="button"
                onClick={() => setIsAppPreviewOpen(true)}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 theme-button-border transition-all duration-300 group shrink-0 hover:border-foreground cursor-pointer"
                title="Launch Live Interactive App Preview"
              >
                <ArrowRight className="w-6 h-6 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Interactive 3-Screen App Gallery Modal ── */}
      <HireCircleGalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />

      {/* ── Live Single-Phone Interactive App Preview Modal ── */}
      <HireCircleAppPreviewModal
        isOpen={isAppPreviewOpen}
        onClose={() => setIsAppPreviewOpen(false)}
      />
    </section>
  );
};

export default WorkSection;