import React from 'react';
import { Calendar } from 'lucide-react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';

export const Experience: React.FC = () => {

  return (
    <section id="experience" className="experience-section" aria-label="Professional Experience">
      <div className="section-tag-row">
        <span className="section-index-badge">03 / EXPERIENCE</span>
      </div>

      <h2 className="experience-main-title">Practical work. Real responsibility.</h2>

      {/* Vertical Timeline / Editorial Layout with Offset Panels */}
      <div className="experience-timeline-container">
        <div className="experience-timeline-spine" aria-hidden="true" />

        {EXPERIENCE_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            className={`experience-timeline-item ${idx % 2 === 0 ? 'offset-left' : 'offset-right'}`}
          >
            {/* Illuminated Date & Node Marker */}
            <div className="timeline-marker-row">
              <div className="timeline-node" aria-hidden="true">
                <div className="timeline-node-core" />
              </div>
              <div className="timeline-date-badge">
                <Calendar size={13} className="timeline-calendar-icon" />
                <span>{item.period}</span>
              </div>
            </div>

            {/* Editorial Glass Content Panel with Continuous Traveling Rim and Pop-out */}
            <div className="experience-timeline-card card-glass-interactive">
              <div className="experience-card-top">
                <div>
                  <h3 className="experience-company-title">{item.company}</h3>
                  <div className="experience-role-header">
                    <h4 className="experience-role-name">{item.role}</h4>
                    <span className="experience-type-tag">{item.type}</span>
                  </div>
                </div>
              </div>

              <p className="experience-desc-text">{item.description}</p>

              <ul className="experience-bullet-list">
                {item.details.map((detail, bIdx) => (
                  <li key={bIdx} className="experience-bullet-item">
                    <span className="bullet-dot" aria-hidden="true" />
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>

              <div className="experience-tools-strip">
                {item.tools.map((tool) => (
                  <span key={tool} className="tech-tag-badge">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
