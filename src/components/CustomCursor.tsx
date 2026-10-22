import React, { useEffect, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const arrowRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Check fine pointer & reduced motion
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isFinePointer || prefersReducedMotion) {
      return;
    }

    const arrow = arrowRef.current;
    const halo = haloRef.current;
    const badge = badgeRef.current;
    if (!arrow || !halo || !badge) return;

    let mouseX = -100;
    let mouseY = -100;
    let haloX = -100;
    let haloY = -100;
    let isVisible = false;
    let isHoveringInteractive = false;
    let isOverCard = false;
    let isText = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        arrow.style.opacity = '1';
        halo.style.opacity = '1';
      }

      // Check target underneath pointer
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('button, a, [role="button"], .carousel-arrow-btn, .blue-glass-btn, input, select')
        );
        const overCard = Boolean(target.closest('.carousel-card'));
        const overText = Boolean(
          target.matches('p, h1, h2, h3, h4, span:not([role="button"]), li, input, textarea') &&
          !isInteractive
        );

        isHoveringInteractive = isInteractive;
        isOverCard = overCard;
        isText = overText;
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      arrow.style.opacity = '0';
      halo.style.opacity = '0';
    };

    const onMouseEnter = () => {
      isVisible = true;
      arrow.style.opacity = '1';
      halo.style.opacity = '1';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    const animate = () => {
      if (isVisible) {
        // Immediate positioning for crisp silver arrow
        arrow.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

        // Smooth spring lerp for halo
        haloX += (mouseX - haloX) * 0.18;
        haloY += (mouseY - haloY) * 0.18;
        halo.style.transform = `translate3d(${haloX}px, ${haloY}px, 0) scale(${isHoveringInteractive ? 1.4 : isOverCard ? 1.6 : 1.0})`;

        // Badge display
        if (isOverCard && !isHoveringInteractive) {
          badge.textContent = 'View';
          badge.style.opacity = '1';
          badge.style.transform = `translate3d(${mouseX + 16}px, ${mouseY + 12}px, 0)`;
        } else {
          badge.style.opacity = '0';
        }

        // Hide arrow over native text to preserve I-beam clarity
        if (isText) {
          arrow.style.opacity = '0.2';
          halo.style.opacity = '0.2';
        } else {
          arrow.style.opacity = '1';
          halo.style.opacity = '1';
        }
      }

      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  return (
    <div className="custom-cursor-host" aria-hidden="true">
      {/* Soft Spring-Following Translucent Halo */}
      <div ref={haloRef} className="custom-cursor-halo" />

      {/* Crisp Silver Arrowhead with Subtle Ice-Blue Edge */}
      <div ref={arrowRef} className="custom-cursor-arrow">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="cursor-svg"
        >
          <path
            d="M4.5 3.5L19.5 12L12 14.5L8.5 21L4.5 3.5Z"
            fill="#ffffff"
            stroke="#93c5fd"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Contextual Badge (e.g. "View") */}
      <span ref={badgeRef} className="custom-cursor-badge" />
    </div>
  );
};
