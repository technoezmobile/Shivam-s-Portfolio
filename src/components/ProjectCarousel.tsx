import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowRight, Grid, Pause, Play } from 'lucide-react';
import { Project } from '../types/portfolio';
import { BlueGlassButton } from './BlueGlassButton';

interface ProjectCarouselProps {
  projects: Project[];
  onOpenDetail: (project: Project, triggerEl?: HTMLElement | null) => void;
  isModalOpen?: boolean;
}

export const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  projects,
  onOpenDetail,
  isModalOpen = false,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(true);
  const [isTabVisible, setIsTabVisible] = useState<boolean>(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);
  const [showAllList, setShowAllList] = useState<boolean>(false);
  const [isWheeling, setIsWheeling] = useState(false);

  const total = projects.length;

  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useLayoutEffect(() => {
    const stage = stageRef.current;
    const card = stage?.querySelector<HTMLElement>('.stage-card-active');
    if (!stage || !card) return;
    const measure = () => stage.style.setProperty('--project-stage-height', `${card.offsetHeight + 64}px`);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(card);
    return () => observer.disconnect();
  }, [activeIndex]);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    if (mq.matches) setIsPlaying(false);

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      if (e.matches) setIsPlaying(false);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track tab visibility
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Track viewport intersection of carousel section
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Circular navigation helpers
  const handlePrev = useCallback(() => {
    setActiveIndex((curr) => (curr - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((curr) => (curr + 1) % total);
  }, [total]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let distance = 0;
    let lastStep = 0;
    let lastEvent = 0;
    let releaseTimer: ReturnType<typeof setTimeout>;
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey || isModalOpen || total < 2) return;
      const horizontal = Math.abs(event.deltaX) > Math.abs(event.deltaY) || event.shiftKey;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      const direction = Math.sign(delta);
      const index = activeIndexRef.current;
      if (!horizontal && ((direction < 0 && index === 0) || (direction > 0 && index === total - 1))) return;
      event.preventDefault();
      setIsWheeling(true);
      clearTimeout(releaseTimer);
      releaseTimer = setTimeout(() => setIsWheeling(false), 1200);
      const now = performance.now();
      if (now - lastEvent > 180 || Math.sign(distance) !== direction) distance = 0;
      lastEvent = now;
      if (now - lastStep < 550) return;
      distance += delta * (event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? stage.clientHeight : 1);
      if (Math.abs(distance) < 50) return;
      if (direction > 0) handleNext();
      else handlePrev();
      lastStep = now;
      distance = 0;
    };
    stage.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      stage.removeEventListener('wheel', onWheel);
      clearTimeout(releaseTimer);
    };
  }, [handleNext, handlePrev, isModalOpen, total]);

  // Autoplay loop: advances 1 item every 5.5s when active and uninterrupted
  const shouldAutoplay =
    isPlaying &&
    !isFocused &&
    !isWheeling &&
    !isModalOpen &&
    isIntersecting &&
    isTabVisible &&
    !prefersReducedMotion;

  useEffect(() => {
    if (!shouldAutoplay) return;

    const timer = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [shouldAutoplay, handleNext, activeIndex]);

  // Keyboard navigation on carousel stage
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  // Compute circular diff between card index and activeIndex: returns -1, 0, 1 or other
  const getCardDiff = (index: number) => {
    let diff = index - activeIndex;
    while (diff > total / 2) diff -= total;
    while (diff < -total / 2) diff += total;
    return diff;
  };

  // Notify layout listeners when list view toggles
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('portfolio:layout-change'));
  }, [showAllList]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="project-carousel-section"
      aria-label="Selected Web Projects"
      onFocusCapture={(event) => setIsFocused((event.target as HTMLElement).matches(':focus-visible'))}
      onBlurCapture={() => setIsFocused(false)}
    >
      {/* Section Header with Controls */}
      <div className="carousel-header-row">
        <div className="carousel-header-text">
          <div className="section-tag-row">
            <span className="section-index-badge">01 / SELECTED WORK</span>
            <span className="carousel-count-badge">{total} PROJECTS</span>
          </div>
          <h2 className="carousel-main-title">Ideas turned into working experiences.</h2>
          <p className="carousel-sub-text">
            A compact gallery of websites, platforms and digital projects built through AI-assisted workflows, iteration and practical problem-solving.
          </p>
        </div>


      </div>

      {/* Centered Three-Position Carousel Stage */}
      <div
        className="carousel-stage-container"
        role="region"
        aria-label="Projects centered 3-position carousel"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div ref={stageRef} className="carousel-stage-track">
          {projects.map((project, idx) => {
            const diff = getCardDiff(idx);
            const isActive = diff === 0;
            const isPrev = diff === -1;
            const isNext = diff === 1;
            const isVisible = isActive || isPrev || isNext;

            // Class name based on 3-position slot
            let slotClass = 'stage-card-hidden';
            if (isActive) slotClass = 'stage-card-active';
            else if (isPrev) slotClass = 'stage-card-prev';
            else if (isNext) slotClass = 'stage-card-next';

            return (
              <article
                key={project.id}
                className={`carousel-card card-glass-interactive ${slotClass}`}
                aria-hidden={!isActive}
                tabIndex={-1}
                onClick={(e) => {
                  if (isPrev) {
                    handlePrev();
                  } else if (isNext) {
                    handleNext();
                  } else if (isActive) {
                    const target = e.target as HTMLElement;
                    if (!target.closest('button, a')) {
                      onOpenDetail(project, e.currentTarget);
                    }
                  }
                }}
                style={{
                  pointerEvents: isVisible ? 'auto' : 'none',
                  cursor: isPrev || isNext ? 'pointer' : 'default',
                }}
              >
                {/* 16:10 Landscape Screenshot Window */}
                <div className="carousel-card-media">
                  {project.image ? <img
                    src={project.image}
                    alt={`${project.title} — ${project.previewLabel || 'interface preview'}`}
                    className="carousel-card-img"
                    loading="lazy"
                    decoding="async"
                  /> : <div className="carousel-project-placeholder"><span>{project.category}</span><strong>{project.title}</strong><span>Project overview</span></div>}
                  <div className="carousel-card-media-overlay" />
                  {project.previewLabel && <span className="carousel-preview-label">{project.previewLabel}</span>}
                  <span className="carousel-card-index">{project.number}</span>
                </div>

                {/* Card Content & Hierarchy */}
                <div className="carousel-card-body">
                  <div className="carousel-card-tag-row">
                    <span className="carousel-card-category">{project.category}</span>
                    <span className="carousel-card-tag">{project.tag}</span>
                  </div>

                  <h3 className="carousel-card-title">{project.title}</h3>
                  <p className="carousel-card-summary">{project.summary}</p>

                  {/* Bottom Action Row: Unnested, independent liquid-glass actions */}
                  <div className="carousel-card-footer">
                    <BlueGlassButton
                      variant="primary"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(project, e.currentTarget);
                      }}
                      trailingIcon={<ArrowRight size={14} />}
                      tabIndex={isActive ? 0 : -1}
                      aria-hidden={!isActive}
                    >
                      View Details
                    </BlueGlassButton>

                    {project.liveUrl && (
                      <BlueGlassButton
                        href={project.liveUrl}
                        target="_blank"
                        variant="secondary"
                        size="sm"
                        isIconOnly
                        aria-label={`Visit live site for ${project.title}`}
                        onClick={(e) => e.stopPropagation()}
                        tabIndex={isActive ? 0 : -1}
                        aria-hidden={!isActive}
                      >
                        <ExternalLink size={14} />
                      </BlueGlassButton>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

        {/* Carousel Navigation Buttons & Counter */}
        <div className="carousel-controls-cluster">
          {/* Autoplay Pause/Resume Accessible Control */}
          <BlueGlassButton
            variant="secondary"
            size="md"
            isIconOnly
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-label={isPlaying ? 'Pause projects autoplay' : 'Resume projects autoplay'}
            className="carousel-play-pause-btn"
          >
            {isPlaying ? <Pause size={17} /> : <Play size={17} />}
          </BlueGlassButton>

          <div className="carousel-index-indicator" aria-live="polite">
            <span className="indicator-current">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <span className="indicator-sep">/</span>
            <span className="indicator-total">
              {String(total).padStart(2, '0')}
            </span>
          </div>

          <div className="carousel-nav-arrows">
            <BlueGlassButton
              variant="secondary"
              size="md"
              isIconOnly
              onClick={handlePrev}
              aria-label="Previous project"
            >
              <ChevronLeft size={20} />
            </BlueGlassButton>

            <BlueGlassButton
              variant="secondary"
              size="md"
              isIconOnly
              onClick={handleNext}
              aria-label="Next project"
            >
              <ChevronRight size={20} />
            </BlueGlassButton>
          </div>
        </div>

      {/* Accessible View All Toggle for Full Discovery */}
      <div className="carousel-bottom-bar">
        <BlueGlassButton
          variant="secondary"
          size="md"
          onClick={() => setShowAllList(!showAllList)}
          icon={<Grid size={15} />}
          aria-expanded={showAllList}
        >
          {showAllList ? 'Hide compact list' : 'View all 10 projects list'}
        </BlueGlassButton>
      </div>

      {/* Semantic Accessible Expanded List */}
      {showAllList && (
        <ul className="carousel-expanded-list" role="list">
          {projects.map((p) => (
            <li key={`list-${p.id}`} className="carousel-list-item-wrap">
              <button
                type="button"
                className="carousel-list-item-btn card-glass-interactive"
                onClick={(e) => onOpenDetail(p, e.currentTarget)}
              >
                <span className="list-item-num">{p.number}</span>
                <div className="list-item-main">
                  <span className="list-item-title">{p.title}</span>
                  <span className="list-item-cat">{p.category}</span>
                </div>
                <span className="list-item-cta">Inspect ↗</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default ProjectCarousel;
