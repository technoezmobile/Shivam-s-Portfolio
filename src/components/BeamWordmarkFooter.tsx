import React from 'react';
import { Mail, ArrowUpRight, ArrowUp, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { BlueGlassButton } from './BlueGlassButton';
import { PERSONAL_INFO } from '../data/portfolioData';

export const BeamWordmarkFooter: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer id="site-footer" className="beam-footer-section" aria-label="Site Footer and Directory">
      {/* Slow Atmospheric Light Beam & Glow */}
      <div className="beam-footer-light-shaft" aria-hidden="true" />
      <div className="beam-footer-radial-glow" aria-hidden="true" />

      <div className="beam-footer-inner">
        {/* Link Columns Grid */}
        <div className="beam-footer-grid">
          {/* Brand & Socials Column (SS Logo, description, liquid-glass social buttons) */}
          <div className="beam-footer-brand-col">
            <div className="beam-footer-brand-lockup">
              <img
                src="/assets/branding/logo.png"
                alt="Shivam Singh Logo"
                className="beam-footer-logo-img"
                width={56}
                height={56}
              />
            </div>

            <p className="beam-footer-bio">
              AI-assisted web development, digital operations and creative storytelling.
            </p>

            <div className="beam-footer-social-row" aria-label="Social media profiles">
              <BlueGlassButton
                href={`mailto:${PERSONAL_INFO.primaryEmail}`}
                variant="secondary"
                size="md"
                isIconOnly
                aria-label="Email Shivam Singh"
                className="beam-footer-social-btn"
              >
                <Mail size={18} />
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                variant="secondary"
                size="md"
                isIconOnly
                aria-label="Shivam Singh LinkedIn profile"
                className="beam-footer-social-btn"
              >
                <Linkedin size={18} />
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                variant="secondary"
                size="md"
                isIconOnly
                aria-label="Shivam Singh GitHub profile"
                className="beam-footer-social-btn"
              >
                <Github size={18} />
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                variant="secondary"
                size="md"
                isIconOnly
                aria-label="Shivam Singh Instagram profile"
                className="beam-footer-social-btn"
              >
                <Instagram size={18} />
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.telegram}
                target="_blank"
                variant="secondary"
                size="md"
                isIconOnly
                aria-label="Shivam Singh Telegram channel"
                className="beam-footer-social-btn"
              >
                <Send size={18} />
              </BlueGlassButton>
            </div>
          </div>

          {/* Explore Column */}
          <div className="beam-footer-column">
            <h3 className="beam-footer-col-title">EXPLORE</h3>
            <ul className="beam-footer-links-list">
              <li>
                <a href="#work" className="beam-footer-link">
                  Work
                </a>
              </li>
              <li>
                <a href="#about" className="beam-footer-link">
                  About
                </a>
              </li>
              <li>
                <a href="#experience" className="beam-footer-link">
                  Experience
                </a>
              </li>
              <li>
                <a href="#creator" className="beam-footer-link">
                  Creator
                </a>
              </li>
              <li>
                <a href="#education" className="beam-footer-link">
                  Education
                </a>
              </li>
              <li>
                <a href="#contact" className="beam-footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Creator Channels Column */}
          <div className="beam-footer-column">
            <h3 className="beam-footer-col-title">CREATOR CHANNELS</h3>
            <ul className="beam-footer-links-list">
              <li>
                <a
                  href="https://www.youtube.com/@Technoez_Mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beam-footer-link"
                >
                  <span>Technoez Mobile</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@shade_explains"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beam-footer-link"
                >
                  <span>Shade Explains</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@Dark_Shade_Gaming"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beam-footer-link"
                >
                  <span>Dark Shade Gaming</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@TZAILABS"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="beam-footer-link"
                >
                  <span>TZ AI Labs</span>
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Illuminated Wordmark: SHIVAM SINGH */}
        <div className="beam-footer-giant-wordmark-wrap" aria-hidden="true">
          <svg className="footer-name-svg footer-name-desktop" viewBox="0 0 1200 210" role="presentation">
            <defs>
              <linearGradient id="name-beam" x1="0" x2="1">
                <stop offset="0" stopColor="#93c5fd" stopOpacity="0" />
                <stop offset=".45" stopColor="#93c5fd" stopOpacity=".15" />
                <stop offset=".5" stopColor="#e0f2fe" />
                <stop offset=".55" stopColor="#93c5fd" stopOpacity=".15" />
                <stop offset="1" stopColor="#93c5fd" stopOpacity="0" />
                <animateTransform attributeName="gradientTransform" type="translate" values="-1;1;-1" dur="9s" repeatCount="indefinite" />
              </linearGradient>
            </defs>
            <text x="8" y="166" fontSize="181" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif"
              textLength="1184" lengthAdjust="spacingAndGlyphs" fill="#5285d0">SHIVAM SINGH</text>
            <text className="footer-name-beam" x="8" y="166" fontSize="181" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif"
              textLength="1184" lengthAdjust="spacingAndGlyphs" fill="url(#name-beam)">SHIVAM SINGH</text>
          </svg>
          <svg className="footer-name-svg footer-name-mobile" viewBox="0 0 600 350" role="presentation">
            <g fontSize="165" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif" fill="#71a2ec">
              <text x="5" y="148" textLength="590" lengthAdjust="spacingAndGlyphs">SHIVAM</text>
              <text x="5" y="310" textLength="590" lengthAdjust="spacingAndGlyphs">SINGH</text>
            </g>
            <g className="footer-name-beam" fontSize="165" fontWeight="900" fontFamily="Plus Jakarta Sans, sans-serif" fill="url(#name-beam)">
              <text x="5" y="148" textLength="590" lengthAdjust="spacingAndGlyphs">SHIVAM</text>
              <text x="5" y="310" textLength="590" lengthAdjust="spacingAndGlyphs">SINGH</text>
            </g>
          </svg>
        </div>

        {/* Bottom Bar: Copyright & Working Back to Top */}
        <div className="beam-footer-bottom-bar">
          <p>© 2026 Shivam Singh. All rights reserved.</p>

          <BlueGlassButton
            onClick={scrollToTop}
            variant="secondary"
            size="md"
            trailingIcon={<ArrowUp size={16} aria-hidden="true" />}
            aria-label="Scroll back to top of page"
          >
            Back to top
          </BlueGlassButton>
        </div>
      </div>
    </footer>
  );
};

export default BeamWordmarkFooter;
