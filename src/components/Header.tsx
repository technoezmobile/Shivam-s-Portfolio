import React, { useEffect, useState } from 'react';
import { FloatingActionMenu } from './FloatingActionMenu';
import { BlueGlassButton } from './BlueGlassButton';

interface HeaderProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, onToggleMenu }) => {
  const [pastHero, setPastHero] = useState(false);
  useEffect(() => {
    const hero = document.getElementById('hero');
    if (!hero) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPastHero(!entry.isIntersecting && entry.boundingClientRect.bottom <= 0);
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);
  return (
    <>
    <header className="top-chrome-layer" aria-label="Site header">
      {/* Standalone Top-Left Glowing SS Logo */}
      <a
        href="#hero"
        className="top-left-logo-link"
        aria-label="Shivam Singh - Return to top"
      >
        <img
          src="/assets/branding/logo.png"
          alt="Shivam Singh SS Logo"
          className="top-left-logo-img"
          width={60}
          height={60}
        />
      </a>

      {/* Standalone Top-Right Floating Menu Trigger */}
      <aside className="floating-menu-trigger-container" aria-label="Navigation trigger">
        <BlueGlassButton
          variant="secondary"
          size="md"
          onClick={onToggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="sterling-gate-menu"
          aria-label={isMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          className="floating-menu-btn"
          trailingIcon={<span className={`menu-plus-icon ${isMenuOpen ? 'is-rotated' : ''}`} aria-hidden="true">+</span>}
        >
          <span>{isMenuOpen ? 'Close' : 'Menu'}</span>
        </BlueGlassButton>
      </aside>
    </header>
    {pastHero && !isMenuOpen && <FloatingActionMenu />}
    </>
  );
};

