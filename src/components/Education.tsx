import React from 'react';
import { GraduationCap, Award, Compass, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, FORAGE_SIMULATIONS } from '../data/portfolioData';

export const Education: React.FC = () => {
  return (
    <section id="education" className="education-section" aria-label="Education & Professional Learning">
      <div className="section-tag-row">
        <span className="section-index-badge">05 / EDUCATION & LEARNING</span>
      </div>

      <h2 className="education-main-title">Always learning. Always building.</h2>

      <div className="education-grid-layout">
        {/* Substantial Degree Card with Continuous Traveling Rim */}
        <div className="education-degree-card card-glass-interactive">
          <div className="degree-card-content">
            <div className="degree-badge-top">
              <span className="degree-program-tag">Degree Program</span>
              <span className="degree-year-badge">{PERSONAL_INFO.education.status}</span>
            </div>

            <div className="degree-main-info">
              <div className="degree-icon-pill" aria-hidden="true">
                <GraduationCap size={28} />
              </div>
              <h3 className="degree-title">{PERSONAL_INFO.education.degree}</h3>
              <p className="institution-meta">{PERSONAL_INFO.education.institution} (Rajiv Gandhi Proudyogiki Vishwavidyalaya)</p>
            </div>

            <p className="degree-focus-summary">
              Academic coursework focused on Artificial Intelligence & Machine Learning fundamentals, computational logic, data structures, and software engineering principles.
            </p>

            <div className="degree-status-row">
              <span className="graduation-badge">
                <ShieldCheck size={14} />
                <span>Expected Graduation 2027</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 Compact Professional-Learning Cards */}
        <div className="simulations-column">
          <div className="simulations-header-row">
            <Compass size={15} className="simulations-label-icon" />
            <span className="simulations-header-label">Professional Learning & Virtual Simulations</span>
          </div>

          <div className="simulations-cards-list">
            {FORAGE_SIMULATIONS.map((sim) => (
              <div key={sim.id} className="simulation-card card-glass-interactive">
                <div className="simulation-info">
                  <div className="simulation-top-meta">
                    <span className="simulation-tag">{sim.type}</span>
                    <span className="simulation-issuer">{sim.issuer}</span>
                  </div>
                  <div className="simulation-title-row">
                    <Award size={16} className="simulation-award-icon" />
                    <h4 className="simulation-title">{sim.title}</h4>
                  </div>
                  <p className="simulation-desc">{sim.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
