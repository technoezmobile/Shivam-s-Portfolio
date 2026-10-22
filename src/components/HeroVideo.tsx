import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Volume2, VolumeX, Play, Pause, ArrowUpRight } from 'lucide-react';
import { BlueGlassButton } from './BlueGlassButton';
import { PERSONAL_INFO } from '../data/portfolioData';

export const HeroVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    const saved = sessionStorage.getItem('shivam_portfolio_muted');
    return saved !== null ? saved === 'true' : true;
  });
  const [typedGreeting, setTypedGreeting] = useState<string>('');

  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const greetingRef = useRef<HTMLSpanElement>(null);
  const nameFirstRef = useRef<HTMLHeadingElement>(null);
  const nameSinghRef = useRef<HTMLHeadingElement>(null);
  const mobileSinghRef = useRef<HTMLHeadingElement>(null);
  const roleLine1Ref = useRef<HTMLSpanElement>(null);
  const roleLine2Ref = useRef<HTMLSpanElement>(null);
  const supportingLineRef = useRef<HTMLParagraphElement>(null);
  const btnExploreRef = useRef<HTMLDivElement>(null);
  const btnConnectRef = useRef<HTMLDivElement>(null);
  const userExplicitlyPausedRef = useRef<boolean>(false);

  // Video Autoplay & Continuous Looping setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      userExplicitlyPausedRef.current = true;
      return;
    }

    video.muted = isMuted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // If browser policy blocks audible autoplay, ensure muted
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => setIsPlaying(true)).catch(() => {
            setIsPlaying(false);
          });
        });
    }

    const onNativePlay = () => setIsPlaying(true);
    const onNativePause = () => setIsPlaying(false);
    video.addEventListener('play', onNativePlay);
    video.addEventListener('pause', onNativePause);

    // Viewport IntersectionObserver: Pause when hero is offscreen; resume when returning
    const section = sectionRef.current;
    if (!section) return () => {
      video.removeEventListener('play', onNativePlay);
      video.removeEventListener('pause', onNativePause);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Respect explicit user pause
            if (!userExplicitlyPausedRef.current && video.paused) {
              video.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          } else {
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      video.removeEventListener('play', onNativePlay);
      video.removeEventListener('pause', onNativePause);
    };
  }, []);

  // Dedicated effect: Sync muted state without re-triggering playback or overriding explicit pause
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    setTypedGreeting("Hello, I'm");
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = gsap.context(() => {
      const timeline = gsap.timeline({ paused: true });
      const groups = [
        { targets: greetingRef.current, count: 10, duration: .32 },
        { targets: nameFirstRef.current, count: 6, duration: .36 },
        { targets: [nameSinghRef.current, mobileSinghRef.current].filter(Boolean), count: 5, duration: .34 },
        { targets: roleLine1Ref.current, count: 11, duration: .28 },
        { targets: roleLine2Ref.current, count: 13, duration: .32 },
        { targets: supportingLineRef.current, count: 38, duration: .5 },
        { targets: btnExploreRef.current, count: 1, duration: .18 },
        { targets: btnConnectRef.current, count: 1, duration: .18 },
      ];
      groups.forEach(group => {
        timeline.fromTo(group.targets,
          { clipPath: 'inset(0 100% 0 0)', opacity: 1 },
          { clipPath: 'inset(0 0% 0 0)', duration: group.duration, ease: `steps(${group.count})` });
        timeline.set(group.targets, { clearProps: 'clipPath' });
      });
      const observer = new IntersectionObserver(changes => {
        if (changes[0].isIntersecting) timeline.restart();
        else timeline.pause(0);
      }, { threshold: 0 });
      if (sectionRef.current) observer.observe(sectionRef.current);
      return () => observer.disconnect();
    }, sectionRef);
    return () => context.revert();
  }, []);

  const handleTogglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userExplicitlyPausedRef.current = false;
      video.play().then(() => {
        setIsPlaying(true);
      });
    } else {
      userExplicitlyPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    const newMuted = !video.muted;
    video.muted = newMuted;
    setIsMuted(newMuted);
    sessionStorage.setItem('shivam_portfolio_muted', String(newMuted));
  };

  return (
    <section ref={sectionRef} id="hero" className="hero-section" aria-label="Introduction & Hero">
      {/* Semantic Accessible Heading for Screen Readers */}
      <h1 className="sr-only">
        Shivam Singh — {PERSONAL_INFO.role}. {PERSONAL_INFO.tagline}
      </h1>

      {/* Edge-to-Edge Fullscreen Video Stage */}
      <div className="hero-fullscreen-video-wrap">
        <video
          ref={videoRef}
          src="/assets/video/shivam-hero.mp4"
          poster="/assets/video/shivam-hero-poster.jpg"
          className="hero-fullscreen-video-el"
          playsInline
          loop
          muted={isMuted}
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label="Shivam Singh personal video introduction"
        />
        <div className="hero-mobile-scrim" aria-hidden="true" />
      </div>

      {/* Hero Typography in Safe Zones (Above Opaque Video Layer) */}
      <div className="hero-typography-stage">
        {/* Left Column: Greeting, SHIVAM, Role, Supporting Line, CTAs */}
        <div className="hero-column-left">
          <div className="hero-top-group">
            <span ref={greetingRef} className="hero-greeting-text" aria-hidden="true">
              {typedGreeting}
            </span>

            {/* Mobile name companion row (on small screens) */}
            <div className="hero-mobile-name-row">
              <span ref={nameFirstRef} className="hero-name-blue" aria-hidden="true">
                {PERSONAL_INFO.firstName}
              </span>
              <span
                ref={mobileSinghRef}
                className="hero-name-singh hero-mobile-only"
                aria-hidden="true"
              >
                {PERSONAL_INFO.lastName}
              </span>
            </div>
          </div>

          {/* Lower-Left Role & Accessible CTAs */}
          <div className="hero-bottom-group">
            <div className="hero-role-title">
              <span ref={roleLine1Ref}>AI-assisted</span>
              <br />
              <span ref={roleLine2Ref}>Web Developer</span>
            </div>

            <p ref={supportingLineRef} className="hero-supporting-line">
              {PERSONAL_INFO.tagline}
            </p>

            <div className="hero-actions-container">
              <div ref={btnExploreRef}>
                <BlueGlassButton
                  href="#work"
                  variant="primary"
                  size="lg"
                  trailingIcon={<ArrowUpRight size={18} />}
                >
                  Explore my work
                </BlueGlassButton>
              </div>

              <div ref={btnConnectRef}>
                <BlueGlassButton
                  href="#contact"
                  variant="secondary"
                  size="lg"
                  trailingIcon={<ArrowUpRight size={18} />}
                >
                  Let's connect
                </BlueGlassButton>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Balanced SINGH lifted into mid-lower right composition */}
        <div className="hero-column-right">
          <span ref={nameSinghRef} className="hero-name-singh" aria-hidden="true">
            {PERSONAL_INFO.lastName}
          </span>
        </div>
      </div>

      {/* Dedicated Video Controls Safe Slot (Independent from text layout, positioned bottom-center) */}
      <div className="hero-video-controls-safe-slot">
        <div className="hero-video-controls-bar" role="toolbar" aria-label="Video Controls">
          <button
            type="button"
            className="video-ctrl-btn"
            onClick={handleTogglePlay}
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <div className="video-ctrl-divider" aria-hidden="true" />

          <button
            type="button"
            className="video-ctrl-btn"
            onClick={handleToggleMute}
            aria-label={isMuted ? 'Turn sound on' : 'Mute sound'}
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            <span>{isMuted ? 'Sound on' : 'Sound off'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
