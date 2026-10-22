import React, { useEffect, useRef, useState } from 'react';
import { Play, ArrowUpRight, Youtube } from 'lucide-react';
import { PERSONAL_FILM } from '../data/portfolioData';
import { BlueGlassButton } from './BlueGlassButton';

export const JourneyVideo: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [launched, setLaunched] = useState(false);
  const [error, setError] = useState(false);
  const [poster, setPoster] = useState('https://i.ytimg.com/vi/iuzusfjD0ww/maxresdefault.jpg');
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(changes => {
      if (!changes[0].isIntersecting) video.pause();
    });
    const onHidden = () => { if (document.hidden) video.pause(); };
    observer.observe(video);
    document.addEventListener('visibilitychange', onHidden);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onHidden);
    };
  }, []);
  const play = () => {
    setError(false);
    setLaunched(true);
    videoRef.current?.play().catch(() => setError(true));
  };
  return (
    <div className="journey-film-container card-glass-interactive">
      <div className="journey-player-stage">
        <video ref={videoRef} className="journey-local-video"
          src="/assets/video/2026-starting.mp4" poster={poster}
          controls={launched} playsInline preload="none"
          onError={() => setError(true)}
          aria-label="2026 Starting — Shivam Singh's January 2026 personal film" />
        {!launched && (
          <div className="journey-preview-overlay">
            <img className="journey-thumbnail-img" src={poster}
              alt="2026 Starting video thumbnail"
              onError={() => setPoster('https://i.ytimg.com/vi/iuzusfjD0ww/hqdefault.jpg')} />
            <BlueGlassButton isIconOnly size="lg" onClick={play}
              aria-label="Play 2026 Starting personal film" className="journey-native-play">
              <Play size={24} fill="currentColor" />
            </BlueGlassButton>
          </div>
        )}
        {error && <p className="journey-playback-notice" role="status">Playback could not start. Try Play again or watch on YouTube.</p>}
      </div>
      <div className="journey-film-details">
        <span className="journey-date-badge">{PERSONAL_FILM.date}</span>
        <h3 className="journey-film-title">{PERSONAL_FILM.title}</h3>
        <p className="journey-caption">{PERSONAL_FILM.caption}</p>
        <div className="journey-actions-row">
          <BlueGlassButton href={PERSONAL_FILM.videoUrl} target="_blank" size="md"
            icon={<Youtube size={18} />} trailingIcon={<ArrowUpRight size={15} />}>
            Watch on YouTube
          </BlueGlassButton>
          <BlueGlassButton variant="secondary" size="md" onClick={play} icon={<Play size={15} />}>
            {launched ? 'Play video' : 'Play Here'}
          </BlueGlassButton>
        </div>
      </div>
    </div>
  );
};
