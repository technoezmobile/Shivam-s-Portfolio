import { useEffect } from 'react';

export function useScrollAnimations() {
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    if (!('highlights' in CSS) || typeof Highlight === 'undefined') return;
    const pending = new Highlight();
    CSS.highlights.set('portfolio-pending', pending);
    type Entry = { nodes: Text[]; length: number; start: number; cursor: number; visible: boolean; range?: Range };
    const entries = new Map<HTMLElement, Entry>();
    let frame = 0;
    let scanFrame = 0;
    const clear = (entry: Entry) => {
      if (entry.range) pending.delete(entry.range);
      entry.range = undefined;
    };
    const mask = (entry: Entry, cursor: number) => {
      clear(entry);
      let remaining = cursor;
      const first = entry.nodes.find(node => {
        if (remaining < node.length) return true;
        remaining -= node.length;
        return false;
      });
      const last = entry.nodes[entry.nodes.length - 1];
      if (!first?.isConnected || !last) return;
      const range = document.createRange();
      range.setStart(first, remaining);
      range.setEnd(last, last.length);
      pending.add(range);
      entry.range = range;
    };
    const tick = (now: number) => {
      frame = 0;
      if (motion.matches || document.hidden) {
        entries.forEach(clear);
        return;
      }
      let running = false;
      entries.forEach(entry => {
        if (!entry.visible || entry.cursor >= entry.length) return;
        const duration = Math.min(1450, Math.max(320, entry.length * 17));
        const cursor = Math.min(entry.length, Math.floor(Math.max(0, now - entry.start) / duration * entry.length));
        if (cursor !== entry.cursor) {
          entry.cursor = cursor;
          mask(entry, cursor);
        }
        if (cursor < entry.length) running = true;
        else clear(entry);
      });
      if (running) frame = requestAnimationFrame(tick);
    };
    const observer = new IntersectionObserver(changes => {
      let order = 0;
      changes.forEach(change => {
        const entry = entries.get(change.target as HTMLElement);
        if (!entry) return;
        if (change.isIntersecting && !entry.visible) {
          entry.visible = true;
          entry.start = performance.now() + Math.min(order++ * 55, 220);
          entry.cursor = 0;
          if (!motion.matches) mask(entry, 0);
        } else if (!change.isIntersecting) {
          entry.visible = false;
          entry.cursor = entry.length;
          clear(entry);
        }
      });
      if (!frame) frame = requestAnimationFrame(tick);
    }, { threshold: 0, rootMargin: '0px 0px -12px 0px' });
    const selector = [
      'main h2', 'main h3', 'main h4', 'main p',
      '.section-index-badge', '.carousel-count-badge', '.capability-description',
      '.experience-timeline-item li', '.timeline-date-badge', '.timeline-date',
      '.channel-handle', '.channel-tagline', '.journey-date-badge',
      '.fcb-eyebrow', '.fcb-heading', '.fcb-body', '.beam-footer-bio',
      '.beam-footer-col-title', '.beam-footer-link', '.beam-footer-bottom-bar p',
      '.btn-text', '.toolkit-tile', '.toolkit-header-badge',
      '.carousel-card-category', '.carousel-card-tag', '.experience-role-type',
      '.degree-status', '.education-issuer'
    ].join(',');
    const scan = () => {
      scanFrame = 0;
      entries.forEach((entry, element) => {
        if (!element.isConnected) {
          clear(entry);
          observer.unobserve(element);
          entries.delete(element);
        }
      });
      const elements = Array.from(document.querySelectorAll<HTMLElement>(selector))
        .filter(element => !element.closest('#hero, .sr-only, [aria-hidden="true"], .modal-backdrop'));
      const selected = new Set(elements);
      elements.forEach(element => {
        if (entries.has(element)) return;
        let parent = element.parentElement;
        while (parent) {
          if (selected.has(parent)) return;
          parent = parent.parentElement;
        }
        const nodes: Text[] = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node) {
          if (node.textContent?.trim() && !node.parentElement?.closest('svg, .sr-only')) nodes.push(node as Text);
          node = walker.nextNode();
        }
        const length = nodes.reduce((sum, node) => sum + node.length, 0);
        if (!length) return;
        entries.set(element, { nodes, length, start: 0, cursor: length, visible: false });
        observer.observe(element);
      });
    };
    const mutations = new MutationObserver(() => {
      if (!scanFrame) scanFrame = requestAnimationFrame(scan);
    });
    const reset = () => {
      entries.forEach(clear);
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const visuals = new IntersectionObserver(changes => {
      changes.forEach(change => {
        if (!change.isIntersecting || motion.matches) return;
        const element = change.target as HTMLElement;
        if (element.classList.contains('beam-footer-giant-wordmark-wrap')) {
          element.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }],
            { duration: 900, easing: 'steps(12)' });
        } else {
          element.animate(
            [{ opacity: .65, translate: '0 14px' }, { opacity: 1, translate: '0 0' }],
            { duration: 480, easing: 'cubic-bezier(.22,1,.36,1)' });
        }
      });
    }, { threshold: 0 });
    document.querySelectorAll('.about-portrait-card, .capability-item, .experience-timeline-card, .simulation-card, .education-degree-card, .channel-card-item, .beam-footer-giant-wordmark-wrap')
      .forEach(element => visuals.observe(element));
    scan();
    mutations.observe(document.querySelector('.portfolio-app') || document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-hidden'] });
    motion.addEventListener('change', reset);
    document.addEventListener('visibilitychange', reset);
    return () => {
      observer.disconnect();
      visuals.disconnect();
      mutations.disconnect();
      cancelAnimationFrame(frame);
      cancelAnimationFrame(scanFrame);
      motion.removeEventListener('change', reset);
      document.removeEventListener('visibilitychange', reset);
      CSS.highlights.delete('portfolio-pending');
    };
  }, []);
}
