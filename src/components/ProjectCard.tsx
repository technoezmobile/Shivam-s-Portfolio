import React from 'react';
import { ArrowUpRight, Youtube, Globe, Info } from 'lucide-react';
import { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  onOpenDetail: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetail }) => {
  // 1. Featured Large Card (Top 4)
  if (project.isLarge) {
    return (
      <article
        className="project-card-large"
        onClick={() => onOpenDetail(project)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onOpenDetail(project);
          }
        }}
        aria-label={`View details for ${project.title}`}
      >
        <div className="card-large-header">
          <div className="card-num-title">
            <span className="project-number">{project.number}</span>
            <div>
              <h3 className="project-title">{project.title}</h3>
              <span className="project-subtitle">{project.subtitle}</span>
            </div>
          </div>
          <div className="card-expand-icon" aria-hidden="true">
            <ArrowUpRight size={18} />
          </div>
        </div>

        <div className="card-large-media">
          {project.image && (
            <img
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              className="project-featured-img"
              loading="lazy"
              width="640"
              height="360"
            />
          )}
        </div>

        <div className="card-large-footer">
          <div className="project-tech-tags">
            {project.techStack.slice(0, 3).map((tech) => (
              <span key={tech} className="tech-tag-badge">
                {tech}
              </span>
            ))}
          </div>

          <span className="project-action-link">
            <span>Details</span>
            <Info size={14} />
          </span>
        </div>
      </article>
    );
  }

  // 2. Secondary Compact Editorial Card (Bottom 6 in 3x2 grid)
  return (
    <article
      className="project-card-compact"
      onClick={() => onOpenDetail(project)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenDetail(project);
        }
      }}
      aria-label={`View details for ${project.title}`}
    >
      {/* Small Left Thumbnail or Authentic Media Tile */}
      <div className="compact-thumb-box">
        {project.hasWorkingPreview && project.image ? (
          <img
            src={project.image}
            alt={`Thumbnail of ${project.title}`}
            className="compact-thumb-img"
            loading="lazy"
            width="140"
            height="85"
          />
        ) : (
          <div className="compact-text-icon-tile" aria-hidden="true">
            {project.channelUrl ? <Youtube size={22} /> : <Globe size={22} />}
          </div>
        )}
      </div>

      {/* Middle Info */}
      <div className="compact-info-block">
        <div className="compact-top-meta">
          <span className="compact-number">{project.number}</span>
          <span className="compact-category">{project.category}</span>
        </div>
        <h3 className="compact-title">{project.title}</h3>
        <p className="compact-subtitle">{project.subtitle}</p>
      </div>

      {/* Right Arrow */}
      <div className="compact-arrow-box" aria-hidden="true">
        <ArrowUpRight size={18} />
      </div>
    </article>
  );
};
