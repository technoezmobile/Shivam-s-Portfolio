import React, { useEffect, useRef } from 'react';

interface Strand {
  color: string;
  glow: string;
  width: number;
  points: { x: number; y: number }[];
}

export const TubesCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only enable on fine pointer (mouse/trackpad) and when reduced-motion is not requested
    const fineQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let isEnabled = fineQuery.matches && !motionQuery.matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // Target pointer coordinates
    let mouseX = -200;
    let mouseY = -200;
    let isInside = false;
    let isMoving = false;
    let idleAlpha = 0;
    let moveTimer: number | undefined;
    let rafId: number | null = null;
    let isLoopRunning = false;

    // Shortened trail for snappy, non-sluggish response
    const TRAIL_LENGTH = 16;

    // 5 Luminous curved strands (Cyan, Electric Blue, Royal Blue, Ice Blue, Indigo)
    const strands: Strand[] = [
      {
        color: '#06b6d4',
        glow: 'rgba(6, 182, 212, 0.55)',
        width: 3.5,
        points: Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouseX, y: mouseY })),
      },
      {
        color: '#3b82f6',
        glow: 'rgba(59, 130, 246, 0.55)',
        width: 3.2,
        points: Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouseX, y: mouseY })),
      },
      {
        color: '#93c5fd',
        glow: 'rgba(147, 197, 253, 0.5)',
        width: 2.4,
        points: Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouseX, y: mouseY })),
      },
      {
        color: '#2563eb',
        glow: 'rgba(37, 99, 235, 0.5)',
        width: 2.8,
        points: Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouseX, y: mouseY })),
      },
      {
        color: '#6366f1',
        glow: 'rgba(99, 102, 241, 0.45)',
        width: 2.0,
        points: Array.from({ length: TRAIL_LENGTH }, () => ({ x: mouseX, y: mouseY })),
      },
    ];

    const startLoop = () => {
      if (isLoopRunning || !isEnabled || document.hidden) return;
      isLoopRunning = true;
      rafId = requestAnimationFrame(render);
    };

    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      isLoopRunning = false;
      ctx.clearRect(0, 0, width, height);
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isEnabled) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isInside = true;
      isMoving = true;
      idleAlpha = Math.min(idleAlpha + 0.35, 1);

      window.clearTimeout(moveTimer);
      moveTimer = window.setTimeout(() => {
        isMoving = false;
      }, 450);

      startLoop();
    };

    const onMouseLeave = () => {
      isInside = false;
      isMoving = false;
    };

    const onMouseEnter = (e: MouseEvent) => {
      if (!isEnabled) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
      isInside = true;
      idleAlpha = 1;

      // Snap all points immediately on entry to prevent long teleport lines
      strands.forEach((strand) => {
        strand.points.forEach((p) => {
          p.x = mouseX;
          p.y = mouseY;
        });
      });

      startLoop();
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else if (isInside && isEnabled) {
        startLoop();
      }
    };

    const updateCapabilities = () => {
      isEnabled = fineQuery.matches && !motionQuery.matches;
      if (!isEnabled) {
        stopLoop();
      }
    };

    fineQuery.addEventListener('change', updateCapabilities);
    motionQuery.addEventListener('change', updateCapabilities);
    document.addEventListener('visibilitychange', onVisibilityChange);
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Render loop with immediate head tracking and short snappy trail
    const render = () => {
      if (!isLoopRunning) return;

      if (document.hidden || !isEnabled) {
        stopLoop();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Fade alpha when pointer stops moving so it doesn't linger over text or faces
      if (!isMoving || !isInside) {
        idleAlpha = Math.max(0, idleAlpha - 0.06);
      } else {
        idleAlpha = Math.min(1, idleAlpha + 0.15);
      }

      // Check distance of trailing points
      let maxDist = 0;
      strands.forEach((strand) => {
        strand.points.forEach((p) => {
          const d = Math.hypot(p.x - mouseX, p.y - mouseY);
          if (d > maxDist) maxDist = d;
        });
      });

      // If trail has fully settled and faded, stop RAF completely until next pointer motion
      if (idleAlpha <= 0.01 && maxDist < 1.5) {
        ctx.clearRect(0, 0, width, height);
        stopLoop();
        return;
      }

      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.globalCompositeOperation = 'screen';

      strands.forEach((strand, strandIndex) => {
        // Leading point: Zero lag! Follows mouse immediately
        const head = strand.points[0];
        head.x = mouseX;
        head.y = mouseY;

        // Snappy, responsive trail propagation
        for (let i = 1; i < strand.points.length; i++) {
          const p = strand.points[i];
          const prev = strand.points[i - 1];
          const follow = 0.48 + strandIndex * 0.035;
          p.x += (prev.x - p.x) * follow;
          p.y += (prev.y - p.y) * follow;
        }

        ctx.shadowColor = strand.glow;
        ctx.shadowBlur = 14;

        for (let i = 0; i < strand.points.length - 1; i++) {
          const p0 = strand.points[i];
          const p1 = strand.points[i + 1];

          const segDist = Math.hypot(p1.x - p0.x, p1.y - p0.y);
          if (segDist < 0.6) continue;

          const factor = 1 - i / strand.points.length;
          const alpha = Math.max(0, Math.pow(factor, 1.15) * idleAlpha * 0.9);
          const currentWidth = Math.max(0.7, strand.width * 1.4 * factor);

          ctx.beginPath();
          ctx.strokeStyle = strand.color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = currentWidth;

          const mx = (p0.x + p1.x) / 2;
          const my = (p0.y + p1.y) / 2;
          ctx.moveTo(p0.x, p0.y);
          ctx.quadraticCurveTo(p0.x, p0.y, mx, my);
          ctx.stroke();
        }
      });

      ctx.restore();

      rafId = requestAnimationFrame(render);
    };

    return () => {
      stopLoop();
      window.clearTimeout(moveTimer);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      fineQuery.removeEventListener('change', updateCapabilities);
      motionQuery.removeEventListener('change', updateCapabilities);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="tubes-cursor-canvas"
      aria-hidden="true"
    />
  );
};

export default TubesCursor;
