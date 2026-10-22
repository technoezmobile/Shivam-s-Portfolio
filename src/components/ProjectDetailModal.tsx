import React, { useEffect, useRef } from 'react';
import { ArrowUpRight, Github, Youtube, Globe, X } from 'lucide-react';
import { Project } from '../types/portfolio';
import { BlueGlassButton } from './BlueGlassButton';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  triggerElement?: HTMLElement | null;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  triggerElement,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (project) {
      previousFocus.current = triggerElement || (document.activeElement as HTMLElement);
      
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const timer = setTimeout(() => {
        closeButtonRef.current?.focus({ preventScroll: true });
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        } else if (e.key === 'Tab') {
          const focusable = modalRef.current?.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable && focusable.length > 0) {
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
              last.focus();
              e.preventDefault();
            } else if (!e.shiftKey && document.activeElement === last) {
              first.focus();
              e.preventDefault();
            }
          }
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = '';
      if (previousFocus.current) {
        previousFocus.current.focus({ preventScroll: true });
      }
    }
  }, [project, triggerElement, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        ref={modalRef}
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-left">
            <span className="modal-project-num">{project.number}</span>
            <h2 id="modal-title" className="modal-project-title">
              {project.title}
            </h2>
          </div>

          <BlueGlassButton
            ref={closeButtonRef}
            variant="secondary"
            size="sm"
            onClick={onClose}
            aria-label="Close project modal"
            isIconOnly
          >
            <X size={18} />
          </BlueGlassButton>
        </div>

        <div className="modal-body">
          {/* Full Screenshot or Authentic Text Banner */}
            {project.image ? (
            <div className="modal-image-wrapper">
              <img
                src={project.image}
                  alt={`${project.title} — ${project.previewLabel || 'full website preview'}`}
                className="modal-screenshot"
              />
                {project.previewLabel && <p className="modal-preview-caption">{project.previewLabel}</p>}
            </div>
          ) : (
            <div className="modal-text-led-notice">
              <h3 className="notice-title">{project.title} — Notice</h3>
              <p className="notice-body">{project.statusNote || project.summary}</p>
            </div>
          )}

          <div>
            <h3 className="modal-section-title">Overview</h3>
            <p className="modal-description">{project.description}</p>
          </div>

          <div>
            <h3 className="modal-section-title">Shivam's Contribution</h3>
            <ul className="contribution-list">
              {project.contribution.map((item, idx) => (
                <li key={idx} className="contribution-item">
                  <span className="bullet-glow" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="modal-section-title">Technologies & Tools</h3>
            <div className="modal-tech-list">
              {project.techStack.map((tech) => (
                <span key={tech} className="tech-tag-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="modal-footer-actions">
            {project.hasWorkingPreview && project.liveUrl && (
              <BlueGlassButton
                href={project.liveUrl}
                target="_blank"
                variant="primary"
                size="md"
                trailingIcon={<ArrowUpRight size={16} />}
              >
                Visit Live Website
              </BlueGlassButton>
            )}

            {project.channelUrl && (
              <BlueGlassButton
                href={project.channelUrl}
                target="_blank"
                variant="primary"
                size="md"
                icon={<Youtube size={18} />}
                trailingIcon={<ArrowUpRight size={16} />}
              >
                Visit YouTube Channel
              </BlueGlassButton>
            )}

            {project.repoUrl && (
              <BlueGlassButton
                href={project.repoUrl}
                target="_blank"
                variant="secondary"
                size="md"
                icon={<Github size={18} />}
                trailingIcon={<ArrowUpRight size={16} />}
              >
                View Repository
              </BlueGlassButton>
            )}

            {project.skillUrl && (
              <BlueGlassButton
                href={project.skillUrl}
                target="_blank"
                variant="secondary"
                size="md"
                icon={<Globe size={18} />}
                trailingIcon={<ArrowUpRight size={16} />}
              >
                View Skill Spec
              </BlueGlassButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
