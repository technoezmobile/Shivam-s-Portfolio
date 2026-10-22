import React, { forwardRef } from 'react';

export interface BlueGlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  isIconOnly?: boolean;
}

export const BlueGlassButton = forwardRef<HTMLButtonElement, BlueGlassButtonProps>(
  (
    {
      href,
      variant = 'primary',
      size = 'md',
      icon,
      trailingIcon,
      children,
      className = '',
      onClick,
      target,
      rel,
      isIconOnly = false,
      ...rest
    },
    ref
  ) => {
    const content = (
      <>
        {/* 1. Perimeter Blue Gradient Border Rim */}
        <span className="btn-border-glow" aria-hidden="true" />
        {/* 2. Liquid Glass: Curved Upper Specular Reflection */}
        <span className="liquid-glass-reflection" aria-hidden="true" />
        {/* 3. Liquid Glass: Lower Inner Rim & Depth Shading */}
        <span className="liquid-glass-rim" aria-hidden="true" />
        {/* 4. Interior Blue Gradient Wash */}
        <span className="btn-interior-wash" aria-hidden="true" />
        {/* 5. Base Content Container */}
        <span className="btn-content">
          {icon && <span className="btn-icon" aria-hidden="true">{icon}</span>}
          {children && <span className="btn-text">{children}</span>}
          {trailingIcon && <span className="btn-icon-trailing" aria-hidden="true">{trailingIcon}</span>}
        </span>
      </>
    );

    const combinedClass = `blue-glass-btn btn-${variant} btn-${size} ${isIconOnly ? 'btn-icon-only' : ''} ${className}`.trim();

    if (href) {
      const isExternal = target === '_blank' || href.startsWith('http');
      const safeRel = rel || (isExternal ? 'noopener noreferrer' : undefined);

      return (
        <a
          href={href}
          className={combinedClass}
          onClick={onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          target={target}
          rel={safeRel}
          tabIndex={rest.tabIndex}
          style={rest.style}
          aria-hidden={rest['aria-hidden']}
          aria-label={rest['aria-label']}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClass}
        onClick={onClick}
        {...rest}
      >
        {content}
      </button>
    );
  }
);

BlueGlassButton.displayName = 'BlueGlassButton';
