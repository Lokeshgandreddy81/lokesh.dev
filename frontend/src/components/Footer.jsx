import React from 'react';
import siteConfig from '../config/siteConfig';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-8 border-t border-border">
      <div className="max-w-[1200px] mx-auto text-center text-sm text-muted">
        <p className="mb-2">
          {siteConfig.footer.text}{' '}
          <a 
            href={siteConfig.github}
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted hover:text-foreground transition-colors underline"
          >
            {siteConfig.footer.linkText}
          </a>
        </p>
        <p>
          Copyright © {currentYear} Gandreddy Lokesh. Built with intention, deployed with purpose.
        </p>
      </div>
    </footer>
  );
};

export default Footer;