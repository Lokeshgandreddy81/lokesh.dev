import React from 'react';
import { ArrowRight } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import TreeIllustration from './decorative/TreeIllustration';
import FlowerSprig from './decorative/FlowerSprig';
import Houseplant from './decorative/Houseplant';
import DJEqualizer from './decorative/DJEqualizer';
import MeetupSpeakerIllustration from './decorative/MeetupSpeakerIllustration';

const AboutSection = () => {
  const decorations = [
    <TreeIllustration className="opacity-30" />,
    <Houseplant className="opacity-30" />,
    <DJEqualizer className="opacity-30" />,
    <MeetupSpeakerIllustration className="opacity-80" />
  ];

  return (
    <section className="py-0">
      <div className="w-full">
        {siteConfig.aboutSections.map((section, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index} className={`flex ${!isEven ? 'flex-col-reverse' : 'flex-col-reverse'} md:grid md:grid-cols-2 border-b border-border min-h-screen`}>
              {/* Left Column */}
              <div className={`px-6 py-12 md:px-16 md:py-24 flex ${isEven ? 'flex-col justify-center' : 'items-center justify-center'} section-border md:border-r border-t md:border-t-0`}>
                {isEven ? (
                  <>
                    <h2
                      className="text-4xl md:text-5xl font-light leading-tight mb-6 md:mb-8 text-foreground"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-muted text-lg leading-relaxed mb-8 md:mb-12">
                      {section.description}
                    </p>
                    {section.hasLink && (
                      <a
                        href={section.link}
                        target={section.link.startsWith('http') ? '_blank' : '_self'}
                        rel={section.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 theme-button-border transition-all duration-300 group self-start"
                      >
                        <ArrowRight className="w-6 h-6 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    )}
                  </>
                ) : (
                  <div className="w-3/4 h-3/4 md:w-full md:h-full flex items-center justify-center">{decorations[index]}</div>
                )}
              </div>

              {/* Right Column */}
              <div className={`px-6 py-12 md:px-16 md:py-24 flex ${!isEven ? 'flex-col justify-center' : 'items-center justify-center'} border-b md:border-b-0 border-border`}>
                {!isEven ? (
                  <>
                    <h2
                      className="text-4xl md:text-5xl font-light leading-tight mb-6 md:mb-8 text-foreground"
                      style={{ fontFamily: 'Cormorant Garamond, serif' }}
                    >
                      {section.title}
                    </h2>
                    <p className="text-muted text-lg leading-relaxed mb-8 md:mb-12">
                      {section.description}
                    </p>
                    {section.hasLink && (
                      <a
                        href={section.link}
                        target={section.link.startsWith('http') ? '_blank' : '_self'}
                        rel={section.link.startsWith('http') ? 'noopener noreferrer' : ''}
                        className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 theme-button-border transition-all duration-300 group self-start"
                      >
                        <ArrowRight className="w-6 h-6 text-muted group-hover:text-foreground group-hover:translate-x-1 transition-all duration-300" />
                      </a>
                    )}
                  </>
                ) : (
                  <div className="w-3/4 h-3/4 md:w-full md:h-full flex items-center justify-center">{decorations[index]}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AboutSection;