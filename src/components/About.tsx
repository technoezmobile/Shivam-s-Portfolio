import React from 'react';
import { Code, ShoppingCart, BarChart3 } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { Toolkit } from './Toolkit';

export const About: React.FC = () => {
  return (
    <section id="about" className="about-section" aria-label="About Shivam Singh & Capabilities">
      <div className="section-tag-row">
        <span className="section-index-badge">02 / ABOUT & CAPABILITIES</span>
      </div>

      <div className="about-grid-layout">
        {/* Exact Approved Navy Polo Portrait (Preserved as provided) */}
        <div className="about-portrait-card">
          <img
            src="/assets/portrait/shivam-navy-polo.png"
            alt="Shivam Singh portrait in navy polo against natural studio blue background"
            className="about-portrait-img"
            loading="lazy"
            width="400"
            height="500"
          />
        </div>

        {/* Center: Curiosity drives what I build — in readable deep-navy card */}
        <div className="about-bio-card card-glass-interactive">
          <h2 className="about-main-heading">{PERSONAL_INFO.aboutHeading}</h2>
          <p className="about-bio-text">{PERSONAL_INFO.aboutBio}</p>
        </div>

        {/* Right: 3 Distinct Capability Cards */}
        <div className="capabilities-column">
          <div className="capability-card card-glass-interactive">
            <div className="capability-icon-pill" aria-hidden="true">
              <Code size={22} />
            </div>
            <div className="capability-content">
              <h3 className="capability-title">Web Development</h3>
              <p className="capability-desc">
                Building responsive websites, web applications and digital experiences with modern tools.
              </p>
            </div>
          </div>

          <div className="capability-card card-glass-interactive">
            <div className="capability-icon-pill" aria-hidden="true">
              <ShoppingCart size={22} />
            </div>
            <div className="capability-content">
              <h3 className="capability-title">Digital & E-commerce</h3>
              <p className="capability-desc">
                Creating and managing e-commerce websites, product content and digital operations.
              </p>
            </div>
          </div>

          <div className="capability-card card-glass-interactive">
            <div className="capability-icon-pill" aria-hidden="true">
              <BarChart3 size={22} />
            </div>
            <div className="capability-content">
              <h3 className="capability-title">Analytics & Reporting</h3>
              <p className="capability-desc">
                Working with data, creating reports and turning insights into better decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Branded Toolkit Strip */}
      <Toolkit />
    </section>
  );
};
