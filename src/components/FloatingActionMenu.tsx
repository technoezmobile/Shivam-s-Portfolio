import React, { useEffect, useRef, useState } from 'react';
import { Plus, Mail, Linkedin, Github, Instagram, Send } from 'lucide-react';
import { BlueGlassButton } from './BlueGlassButton';
import { PERSONAL_INFO } from '../data/portfolioData';

export const FloatingActionMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const container = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!container.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('pointerdown', dismiss);
      document.removeEventListener('keydown', escape);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    toggle.current?.focus();
  };

  return (
    <nav ref={container} className={`portfolio-action-menu ${open ? 'is-open' : ''}`} aria-label="Floating social links">
      <BlueGlassButton ref={toggle} isIconOnly variant="secondary" className="portfolio-action-toggle"
        aria-expanded={open} aria-controls="portfolio-action-links"
        aria-label={open ? 'Close social links' : 'Open social links'} onClick={() => setOpen(value => !value)}>
        <Plus size={26} />
      </BlueGlassButton>
      <div id="portfolio-action-links" className="portfolio-action-links" hidden={!open}>
          {[
            { label: 'Email me', href: `mailto:${PERSONAL_INFO.primaryEmail}`, icon: Mail },
            { label: 'LinkedIn', href: PERSONAL_INFO.socials.linkedin, icon: Linkedin },
            { label: 'GitHub', href: PERSONAL_INFO.socials.github, icon: Github },
            { label: 'Instagram', href: PERSONAL_INFO.socials.instagram, icon: Instagram },
            { label: 'Telegram', href: PERSONAL_INFO.socials.telegram, icon: Send },
          ].map(({ label, href, icon: Icon }, index) => (
            <BlueGlassButton key={label} href={href} target={href.startsWith('mailto:') ? undefined : '_blank'}
              isIconOnly variant="secondary" aria-label={label} onClick={close}
              style={{ '--action-order': index } as React.CSSProperties}>
              <Icon size={20} />
            </BlueGlassButton>
          ))}
      </div>
    </nav>
  );
};
