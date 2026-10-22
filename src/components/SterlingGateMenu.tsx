import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { Mail, Linkedin, Github, Instagram, Send, X } from 'lucide-react';
import { BlueGlassButton } from './BlueGlassButton';
import { PERSONAL_INFO } from '../data/portfolioData';

interface SterlingGateMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  number: string;
  label: string;
  tagline: string;
  href: string;
}

const navItems: NavItem[] = [
  {
    number: '01',
    label: 'WORK',
    tagline: 'Websites & digital projects',
    href: '#work',
  },
  {
    number: '02',
    label: 'ABOUT',
    tagline: 'Story & capabilities',
    href: '#about',
  },
  {
    number: '03',
    label: 'EXPERIENCE',
    tagline: 'Career timeline & operations',
    href: '#experience',
  },
  {
    number: '04',
    label: 'CREATOR',
    tagline: 'Creator universe & personal film',
    href: '#creator',
  },
  {
    number: '05',
    label: 'EDUCATION',
    tagline: 'Degree & virtual simulations',
    href: '#education',
  },
  {
    number: '06',
    label: 'CONTACT',
    tagline: "Let's build what comes next",
    href: '#contact',
  },
];

export const SterlingGateMenu: React.FC<SterlingGateMenuProps> = ({ isOpen, onClose }) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusedElement = useRef<HTMLElement | null>(null);
  const navigatedAwayRef = useRef<boolean>(false);

  const handleClose = useCallback(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: onClose,
      });
    } else {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      previousFocusedElement.current = document.activeElement as HTMLElement;
      navigatedAwayRef.current = false;
      
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!prefersReducedMotion && overlayRef.current) {
        const tl = gsap.timeline();
        tl.fromTo(
          overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.28, ease: 'power2.out' }
        );
        tl.fromTo(
          rowsRef.current.filter(Boolean),
          { y: 25, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, stagger: 0.04, ease: 'power3.out' },
          '-=0.12'
        );
      }

      const timer = setTimeout(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          handleClose();
        } else if (e.key === 'Tab') {
          const focusable = overlayRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
      if (!navigatedAwayRef.current && previousFocusedElement.current) {
        previousFocusedElement.current.focus({ preventScroll: true });
      }
      navigatedAwayRef.current = false;
    }
  }, [isOpen, handleClose]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();

    // 1. Synchronize URL hash in browser history for predictable Back/Forward
    if (window.location.hash !== href) {
      window.history.pushState(null, '', href);
    }

    // 2. Mark that navigation took place so focus restoration does not yank scroll back to top
    navigatedAwayRef.current = true;

    // 3. Close the menu overlay
    handleClose();

    // 4. Scroll smoothly to destination element
    const target = document.querySelector<HTMLElement>(href);
    if (target) {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      target.focus({ preventScroll: true });
    }
  };

  if (!isOpen) return null;

  return (
    <div
      id="sterling-gate-menu"
      ref={overlayRef}
      className="sterling-gate-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Navigation Menu"
    >
      <div className="sterling-gate-container">
        {/* Header Bar inside overlay */}
        <div className="sterling-gate-header">
          <div className="sterling-brand-identity">
            <img
              src="/assets/branding/logo.png"
              alt="Shivam Singh Logo"
              className="sterling-logo-img"
              width={42}
              height={42}
            />
            <div className="sterling-brand-text-col">
              <span className="sterling-brand-name">SHIVAM SINGH</span>
              <span className="sterling-brand-role">PORTFOLIO</span>
            </div>
          </div>

          <div className="sterling-close-wrap">
            <BlueGlassButton
              ref={closeButtonRef}
              variant="secondary"
              onClick={handleClose}
              className="floating-menu-btn sterling-close-btn"
              aria-label="Close navigation"
              trailingIcon={<X size={20} />}
            >
              <span>Close</span>
            </BlueGlassButton>
          </div>
        </div>

        {/* Large liquid-glass navigation rows with dedicated columns */}
        <nav className="sterling-nav-rows" aria-label="Main Sections">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              ref={(el) => {
                rowsRef.current[index] = el;
              }}
              className="sterling-nav-row"
              onClick={(e) => handleNavClick(e, item.href)}
            >
              <span className="sterling-row-num">{item.number}</span>
              <div className="sterling-row-label-wrap">
                <span className="sterling-row-title">{item.label}</span>
                <span className="sterling-row-tagline">{item.tagline}</span>
              </div>
              <span className="sterling-row-arrow" aria-hidden="true">⟶</span>
            </a>
          ))}
        </nav>

        {/* Bottom meta & direct liquid-glass contact links */}
        <div className="sterling-gate-footer">
          <div className="sterling-footer-col">
            <span className="sterling-footer-label">DIRECT INQUIRIES</span>
            <div className="sterling-footer-btn-wrap">
              <BlueGlassButton
                href={`mailto:${PERSONAL_INFO.primaryEmail}`}
                variant="secondary"
                size="sm"
                icon={<Mail size={15} />}
              >
                {PERSONAL_INFO.primaryEmail}
              </BlueGlassButton>
            </div>
          </div>

          <div className="sterling-footer-col">
            <span className="sterling-footer-label">CONNECT</span>
            <div className="sterling-social-pills-row">
              <BlueGlassButton
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                variant="secondary"
                size="sm"
                icon={<Linkedin size={15} />}
              >
                LinkedIn
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                variant="secondary"
                size="sm"
                icon={<Github size={15} />}
              >
                GitHub
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                variant="secondary"
                size="sm"
                icon={<Instagram size={15} />}
              >
                Instagram
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.telegram}
                target="_blank"
                variant="secondary"
                size="sm"
                icon={<Send size={15} />}
              >
                Telegram
              </BlueGlassButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SterlingGateMenu;
