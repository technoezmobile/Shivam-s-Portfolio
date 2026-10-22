import React, { useEffect, useRef } from 'react';
import { Mail, ArrowUpRight, ArrowUp, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { BlueGlassButton } from './BlueGlassButton';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ParticleFooter: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  // 3D Perspective Particle Wave simulation (enhanced depth & cyan/blue contrast)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let step = 0;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight || 500;
    };

    resize();
    window.addEventListener('resize', resize);

    // Pause canvas animation when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const render = () => {
      if (!ctx || !canvas) return;

      if (!isVisible || prefersReducedMotion) {
        if (!prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(render);
        }
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const rows = 36;
      const cols = 58;
      const separation = canvas.width / cols;
      const depth = canvas.height / rows;

      step += 0.038;

      for (let ix = 0; ix < cols; ix++) {
        for (let iy = 0; iy < rows; iy++) {
          const x = (ix - cols / 2) * separation + canvas.width / 2;
          const z = iy * depth;

          // Multi-frequency sine-cosine wave
          const wave =
            Math.sin(ix * 0.22 + step) * 24 +
            Math.cos(iy * 0.18 + step * 0.85) * 30 +
            Math.sin((ix + iy) * 0.14 + step) * 16;

          const perspective = 320 / (320 + z * 0.75);
          const px = (x - canvas.width / 2) * perspective + canvas.width / 2;
          const py = (canvas.height * 0.62 + wave) * perspective + z * 0.44;
          const radius = Math.max(0.7, 2.8 * perspective);

          // Alpha fade with depth
          const alpha = Math.max(0.12, Math.min(0.85, (1 - z / canvas.height) * 0.95));

          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);

          // Alternating Vibrant Cyan & Electric Blue dots
          if ((ix + iy) % 2 === 0) {
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
          } else {
            ctx.fillStyle = `rgba(0, 242, 212, ${alpha * 0.9})`;
          }

          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef} id="contact" className="footer-section" role="contentinfo">
      {/* Atmospheric Soft Navy/Blue Glow */}
      <div className="footer-ambient-glow" aria-hidden="true" />

      {/* Decorative Canvas Wave */}
      <canvas ref={canvasRef} className="footer-particle-canvas" aria-hidden="true" />

      <div className="footer-inner-content">
        {/* Floating Frosted Contact Box */}
        <div className="contact-floating-panel">
          <div className="panel-curved-reflection" aria-hidden="true" />

          <div className="contact-panel-left">
            <span className="contact-badge-pill">
              <Send size={13} />
              <span>LET'S CONNECT</span>
            </span>
            <h2 className="contact-panel-title">Let's build what comes next.</h2>
            <p className="contact-panel-desc">
              I'm always open to interesting projects, website collaborations, and new opportunities.
            </p>
          </div>

          <div className="contact-panel-actions">
            <BlueGlassButton
              href={`mailto:${PERSONAL_INFO.primaryEmail}`}
              variant="primary"
              size="md"
              trailingIcon={<ArrowUpRight size={15} />}
            >
              Start a conversation
            </BlueGlassButton>

            <BlueGlassButton
              href={`mailto:${PERSONAL_INFO.primaryEmail}`}
              variant="secondary"
              size="sm"
              icon={<Mail size={15} />}
            >
              {PERSONAL_INFO.primaryEmail}
            </BlueGlassButton>

            <BlueGlassButton
              href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
              variant="secondary"
              size="sm"
              icon={<Mail size={15} />}
            >
              {PERSONAL_INFO.secondaryEmail}
            </BlueGlassButton>
          </div>
        </div>

        {/* Grouped Links Columns */}
        <div className="footer-columns-grid">
          <div className="footer-col-brand">
            <div className="footer-brand-title-row">
              <img
                src="/assets/branding/logo.png"
                alt="Shivam Singh Logo"
                className="footer-brand-logo-img"
                width={42}
                height={42}
              />
              <span className="footer-brand-text">SHIVAM SINGH</span>
            </div>
            <p className="footer-bio-snippet">
              Computer Science student building web experiences, managing digital platforms, and creating content with AI tools.
            </p>
            <div className="footer-social-icons-row" aria-label="Social media profiles">
              <BlueGlassButton
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                variant="secondary"
                size="sm"
                isIconOnly
                aria-label="Shivam Singh LinkedIn profile"
              >
                <Linkedin size={16} />
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                variant="secondary"
                size="sm"
                isIconOnly
                aria-label="Shivam Singh GitHub profile"
              >
                <Github size={16} />
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                variant="secondary"
                size="sm"
                isIconOnly
                aria-label="Shivam Singh Instagram profile"
              >
                <Instagram size={16} />
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.telegram}
                target="_blank"
                variant="secondary"
                size="sm"
                isIconOnly
                aria-label="Shivam Singh Telegram profile"
              >
                <Send size={16} />
              </BlueGlassButton>
            </div>
          </div>

          <div className="footer-column-block">
            <h3 className="footer-column-heading">Explore</h3>
            <ul className="footer-links-list">
              <li><a href="#work" className="footer-nav-link">Work</a></li>
              <li><a href="#about" className="footer-nav-link">About</a></li>
              <li><a href="#experience" className="footer-nav-link">Experience</a></li>
              <li><a href="#creator" className="footer-nav-link">Creator</a></li>
              <li><a href="#education" className="footer-nav-link">Education</a></li>
            </ul>
          </div>

          <div className="footer-column-block">
            <h3 className="footer-column-heading">Creator Channels</h3>
            <ul className="footer-links-list">
              <li>
                <a href="https://www.youtube.com/@Technoez_Mobile" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>Technoez Mobile</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@shade_explains" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>Shade Explains</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@Dark_Shade_Gaming" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>Dark Shade Gaming</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@TZAILABS" target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>TZAILabs</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column-block">
            <h3 className="footer-column-heading">Connect</h3>
            <ul className="footer-links-list">
              <li>
                <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>LinkedIn</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>GitHub</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.socials.instagram} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>Instagram</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
              <li>
                <a href={PERSONAL_INFO.socials.telegram} target="_blank" rel="noopener noreferrer" className="footer-nav-link">
                  <span>Telegram</span>
                  <ArrowUpRight size={13} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Solid Low-Contrast Wordmark (Wide Sans, Visible Slate Muted) */}
        <div className="footer-giant-wordmark-container" aria-hidden="true">
          <p className="giant-wordmark-text">SHIVAM SINGH</p>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="footer-bottom-bar">
          <p>© 2026 Shivam Singh. All rights reserved.</p>

          <button
            type="button"
            className="back-to-top-btn"
            onClick={handleScrollToTop}
            aria-label="Scroll back to top of page"
          >
            <span>Back to top</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
