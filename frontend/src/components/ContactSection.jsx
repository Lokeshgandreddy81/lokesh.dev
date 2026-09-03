import React from 'react';
import { Mail, Linkedin, Github, ExternalLink } from 'lucide-react';
import siteConfig from '../config/siteConfig';
import FallingLeavesAnimation from './decorative/FallingLeavesAnimation';

const ContactSection = () => {
  return (
    <section id="contact" className="py-0">
      <div className="w-full">
        {/* Split-screen layout: Text Left (60%), Image Right (40%) */}
        <div className="grid lg:grid-cols-[60%_40%] border-b section-border min-h-screen">
          {/* Left Side - Contact Content */}
          <div className="px-6 py-12 md:px-16 lg:px-20 md:py-24 flex flex-col justify-center border-r section-border">
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-8 md:mb-16 text-foreground"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              I'm always curious about ambitious problems, thoughtful collaboration, and the next layer of abstraction.
            </h2>

            <p
              className="text-2xl md:text-3xl font-light text-foreground mb-16"
              style={{ fontFamily: 'Cormorant Garamond, serif' }}
            >
              Let's build something that matters.
            </p>

            {/* Contact Links */}
            <div className="space-y-6 text-lg md:text-xl">
              <div>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-3 group"
                >
                  <Mail className="w-6 h-6" />
                  <span className="underline decoration-1 underline-offset-4">{siteConfig.email}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div>
                <a
                  href={siteConfig.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-3 group"
                >
                  <Linkedin className="w-6 h-6" />
                  <span className="underline decoration-1 underline-offset-4">LinkedIn</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>

              <div>
                <a
                  href={siteConfig.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-foreground transition-colors inline-flex items-center gap-3 group"
                >
                  <Github className="w-6 h-6" />
                  <span className="underline decoration-1 underline-offset-4">GitHub</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </div>

            {/* Signature */}
            <div className="mt-20 md:mt-24">
              <p
                className="text-4xl md:text-5xl font-light text-muted"
                style={{ fontFamily: 'Cormorant Garamond, serif' }}
              >
                All the best,<br />{siteConfig.name}
              </p>

              <div className="flex items-center gap-3 mt-8">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-foreground font-medium">Available for collaboration</span>
              </div>
            </div>
          </div>

          {/* Right Side - Full-Height Portrait Image with Falling Leaves Animation */}
          <div
            id="contact-shoulder-target"
            className="hidden lg:block relative min-h-screen overflow-hidden"
            style={{
              backgroundImage: `url(https://customer-assets.emergentagent.com/job_daniel-autry/artifacts/2c2yfqzx_PHOTO-2026-01-14-14-18-00.jpg)`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              filter: 'grayscale(100%)'
            }}
          >
            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Exact Shoulder Landing Anchor for Guide Bird */}
            <div
              id="contact-shoulder-perch"
              className="absolute pointer-events-none w-2 h-2"
              style={{
                left: '40.2%',
                top: '48.4%',
              }}
            />

            {/* Falling Leaves Vector Animation */}
            <FallingLeavesAnimation />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
