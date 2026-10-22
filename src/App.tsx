import React, { useState } from 'react';
import { Header } from './components/Header';
import { SterlingGateMenu } from './components/SterlingGateMenu';
import { HeroVideo } from './components/HeroVideo';
import { ProjectCarousel } from './components/ProjectCarousel';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { CreatorChannels } from './components/CreatorChannels';
import { JourneyVideo } from './components/JourneyVideo';
import { Education } from './components/Education';
import { FinalCtaBanner } from './components/FinalCtaBanner';
import { BeamWordmarkFooter } from './components/BeamWordmarkFooter';
import { VelarisAtmosphere } from './components/VelarisAtmosphere';
import { TubesCursor } from './components/TubesCursor';
import { PROJECTS } from './data/portfolioData';
import { Project } from './types/portfolio';
import { useScrollAnimations } from './hooks/useScrollAnimations';

export const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [triggerElement, setTriggerElement] = useState<HTMLElement | null>(null);

  useScrollAnimations();

  const handleOpenDetail = (project: Project, el?: HTMLElement | null) => {
    setTriggerElement(el || (document.activeElement as HTMLElement));
    setSelectedProject(project);
  };

  const handleCloseDetail = () => {
    setSelectedProject(null);
  };

  const isOverlayActive = isMenuOpen || selectedProject !== null;

  return (
    <div className="portfolio-app">
      {/* 0. Continuous Shared Velaris WebGL Atmosphere */}
      <VelarisAtmosphere />

      {/* Catalogue #02 Tubes Cursor */}
      <TubesCursor />

      {/* Main Header with Top-Left Glowing SS Logo and Rotating Plus Menu */}
      <Header
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen(!isMenuOpen)}
      />

      {/* Sterling Gate Fullscreen Navigation Menu */}
      <SterlingGateMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />

      <main
        inert={isOverlayActive}
        aria-hidden={isOverlayActive}
      >
        {/* 1. Hero Section with Video */}
        <HeroVideo />

        {/* 2. Selected Work / Apple-Style Compact Project Carousel */}
        <ProjectCarousel
          projects={PROJECTS}
          onOpenDetail={handleOpenDetail}
          isModalOpen={!!selectedProject}
        />

        {/* 3. About & Capabilities & Toolkit */}
        <About />

        {/* 4. Experience */}
        <Experience />

        {/* 5. Creator Universe & Personal Film */}
        <section id="creator" className="creator-section" aria-label="Creator Universe & Personal Film">
          <div className="section-header-row">
            <div>
              <div className="section-tag-row">
                <span className="section-index-badge">04 / CREATOR UNIVERSE</span>
              </div>
              <h2 className="section-main-title">Beyond the build.</h2>
            </div>

            <p className="section-header-intro">
              Different ideas. Different audiences. Same passion for creating.
            </p>
          </div>

          {/* 4 Genuine Channel Cards */}
          <CreatorChannels />

          {/* Personal Film Banner */}
          <JourneyVideo />
        </section>

        {/* 6. Education & Learning Simulations */}
        <Education />

        {/* 7. Closing Final CTA Banner (Gradient Blinds) */}
        <FinalCtaBanner />
      </main>

      {/* 8. Beam Wordmark Footer with Giant Wordmark */}
      <div inert={isOverlayActive} aria-hidden={isOverlayActive}>
        <BeamWordmarkFooter />
      </div>

      {/* Accessible Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        triggerElement={triggerElement}
        onClose={handleCloseDetail}
      />
    </div>
  );
};

export default App;
