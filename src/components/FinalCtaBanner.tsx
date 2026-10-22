import React, { useEffect, useRef, type CSSProperties } from 'react';
import { Mail, ArrowUpRight, Linkedin, Github, Instagram, Send } from 'lucide-react';
import { BlueGlassButton } from './BlueGlassButton';
import { PERSONAL_INFO } from '../data/portfolioData';

const MAX_COLORS = 8;
const MAX_WAVES = 4;
const INTRO_SECONDS = 1.8;

const VERTEX = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT = `#version 300 es
precision highp float;
precision highp int;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uAngle;
uniform float uNoise;
uniform float uBlindCount;
uniform float uSpotlightRadius;
uniform float uSpotlightSoftness;
uniform float uSpotlightOpacity;
uniform float uMirror;
uniform float uDistort;
uniform float uShineFlip;
uniform vec3 uColors[8];
uniform int uColorCount;
uniform float uLightMode;
uniform float uShine;
uniform float uRelief;
uniform float uGlow;
uniform float uSway;
uniform float uSwayTime;
uniform float uHover;
uniform vec4 uWaves[4];
uniform float uIntro;
uniform float uGrainTime;
uniform vec3 uLightColor;
uniform float uPerspective;
uniform float uGradientShift;

out vec4 outColor;

float hash(vec2 p) {
  vec3 q = fract(vec3(p.xyx) * 0.1031);
  q += dot(q, q.yzx + 33.33);
  return fract((q.x + q.y) * q.z);
}

vec2 rotate2D(vec2 p, float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c) * p;
}

vec2 blindSpace(vec2 uv0) {
  float aspect = uResolution.x / uResolution.y;
  vec2 p = uv0 * 2.0 - 1.0;
  p.x *= aspect;
  vec2 pr = rotate2D(p, uAngle);
  pr.x /= aspect;
  vec2 uv = pr * 0.5 + 0.5;
  if (abs(uPerspective) > 0.001) {
    float k = uPerspective * 2.2;
    uv.x = (exp(k * uv.x) - 1.0) / (exp(k) - 1.0);
  }
  if (uDistort > 0.0) {
    float a = uv.y * 6.0;
    float b = uv.x * 6.0;
    float w = 0.01 * uDistort;
    uv.x += sin(a) * w;
    uv.y += cos(b) * w;
  }
  return uv;
}

vec3 gradientColor(float t) {
  float tt = clamp(t, 0.0, 1.0);
  int count = max(uColorCount, 2);
  float scaled = tt * float(count - 1);
  int seg = min(int(floor(scaled)), count - 2);
  float f = scaled - float(seg);
  if (tt >= 1.0) return uColors[count - 1];
  return mix(uColors[seg], uColors[seg + 1], f);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv0 = frag / uResolution;
  vec2 uvMod = blindSpace(uv0);

  float count = max(uBlindCount, 1.0);
  float stripePhase = uvMod.x * count;
  float pixel = max(fwidth(stripePhase), 1e-5);

  float t = uvMod.x;
  if (uGradientShift != 0.0) {
    t = 1.0 - abs(1.0 - fract((t + uGradientShift) * 0.5) * 2.0);
  }
  if (uMirror > 0.5) {
    t = 1.0 - abs(1.0 - 2.0 * fract(t));
  }
  vec3 base = gradientColor(t);

  vec2 offset = uMouse / uResolution;
  float d = length(uv0 - offset);
  float r = max(uSpotlightRadius, 0.05);
  float spot = clamp(1.0 - pow(clamp(d / r, 0.0, 1.0), uSpotlightSoftness), 0.0, 1.0) * uSpotlightOpacity;

  float slat = floor(stripePhase);
  float s = stripePhase - slat;
  float stripeAA = clamp(count * 1.25 / min(uResolution.x, uResolution.y), 0.001, 0.12);
  float edgeBlend = 1.0 - smoothstep(0.0, stripeAA, min(s, 1.0 - s));
  float across = mix(s, 0.5, edgeBlend);
  float ramp = uShineFlip > 0.5 ? 1.0 - across : across;

  float unit = min(uResolution.x, uResolution.y);
  float reach = max(uSpotlightRadius, 0.05) * unit;
  vec2 toLight = uMouse - frag;
  float nearLight = exp(-dot(toLight, toLight) / (reach * reach));

  float tilt = 0.0;
  float pulse = 0.0;
  if (uSway > 0.0) {
    tilt += uSway * 0.5 * sin(uSwayTime * 0.9 + slat * 0.55) * (0.6 + 0.4 * sin(uSwayTime * 0.37 + slat * 0.21));
  }
  tilt += uHover * nearLight * 0.7;
  for (int i = 0; i < 4; i++) {
    vec4 wave = uWaves[i];
    if (wave.w <= 0.0) continue;
    float age = uTime - wave.z;
    if (age < 0.0 || age > 1.60) continue;
    float life = age / 1.60;
    vec2 origin = blindSpace(wave.xy / uResolution);
    float slats = abs(slat + 0.5 - origin.x * count);
    float front = age * max(count, 4.0) * 0.95;
    float k = (slats - front) / (0.8 + life * 1.2);
    float along = (uvMod.y - origin.y) / max(0.42 + life * 0.5, 0.01);
    float fade = (1.0 - life) * (1.0 - life);
    float ring = exp(-k * k) * exp(-along * along) * fade * smoothstep(0.0, 0.2, age);
    tilt += ring * 0.9;
    pulse += ring;
  }
  if (uIntro < 1.0) {
    float settle = smoothstep(0.0, 1.0, clamp(uIntro * 1.5 - uv0.x * 0.5, 0.0, 1.0));
    tilt -= (1.0 - settle) * 1.2;
  }

  float edge = ramp;
  float calm = 1.0 - 0.4 * spot;
  ramp = pow(clamp(ramp, 0.0, 1.0), exp(tilt * 0.9));
  ramp *= 1.0 - 0.25 * min(pulse, 1.0) * calm;
  float crease = uRelief * 0.38 * smoothstep(0.62, 1.0, ramp);
  float sheen = uShine * exp(-pow((edge - 0.035) / 0.07, 2.0)) * (0.3 + 0.7 * nearLight) * (1.0 - edgeBlend);

  vec3 lit = uLightColor * (spot * 0.75 + 0.12);
  lit += uLightColor * min(pulse, 1.0) * 0.45 * calm;

  vec3 col;
  if (uLightMode > 0.5) {
    vec3 luma = vec3(0.2126, 0.7152, 0.0722);
    float peak = max(base.r, max(base.g, base.b));
    float low = min(base.r, min(base.g, base.b));
    float chroma = (peak - low) / max(peak, 0.0001);
    vec3 hue = base / max(peak, 0.0001);
    hue = clamp(mix(vec3(dot(hue, luma)), hue, 1.3), 0.0, 1.0);
    hue *= mix(1.0, 0.82, smoothstep(0.55, 0.9, dot(hue, luma)));
    vec3 tint = mix(base, hue, smoothstep(0.06, 0.28, chroma));
    vec3 revealSignal = lit + base - vec3(ramp + crease);
    vec3 revealed = clamp(revealSignal, 0.0, 1.0);
    float coverage = max(revealed.r, max(revealed.g, revealed.b));
    float stroke = 1.0 - smoothstep(pixel, pixel * 2.2, edge);
    col = mix(vec3(1.0), tint, 0.72 * smoothstep(0.0, 1.0, coverage));
    col = mix(col, tint * 0.85, stroke * clamp(coverage * 1.5, 0.0, 1.0) * 0.7);
    col = mix(col, vec3(1.0), clamp(sheen, 0.0, 1.0) * 0.5);
    float grain = max(0.5 * (hash(frag + uGrainTime) + hash(frag.yx + uGrainTime * 1.7)) - 0.5, 0.0);
    col = clamp(col - vec3(grain * uNoise * 0.12 * coverage), 0.0, 1.0);
  } else {
    vec3 revealSignal = base + lit - vec3(ramp + crease);
    col = max(revealSignal, vec3(0.0));
    col += uLightColor * sheen * nearLight * 0.45;
    col += base * uGlow * spot * 0.12;
    col *= 0.04 + 0.96 * sqrt(nearLight);

    float grain = max(0.5 * (hash(frag + uGrainTime) + hash(frag.yx + uGrainTime * 1.7)) - 0.5, 0.0);
    col = clamp(col - vec3(grain * uNoise * 0.05), 0.0, 1.0);
  }

  outColor = vec4(col, 1.0);
}`;

function parseColor(hex: string): [number, number, number] {
  const c = hex.trim().replace('#', '');
  if (c.length === 3) {
    const r = parseInt(c[0] + c[0], 16) / 255;
    const g = parseInt(c[1] + c[1], 16) / 255;
    const b = parseInt(c[2] + c[2], 16) / 255;
    return [r, g, b];
  }
  const num = parseInt(c, 16);
  return [(num >> 16) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
}

interface GradientBlindsProps {
  className?: string;
  style?: CSSProperties;
  gradientColors?: string[];
  angle?: number;
  blindCount?: number;
  blindMinWidth?: number;
  spotlightRadius?: number;
  spotlightSoftness?: number;
  spotlightOpacity?: number;
  mirror?: boolean;
  distort?: number;
  shineFlip?: boolean;
  lightMode?: boolean;
  shine?: number;
  relief?: number;
  glow?: number;
  sway?: number;
  hoverTilt?: number;
  clickEffect?: 'ripple' | 'none';
  noise?: number;
  shineDirection?: 'left' | 'right';
  lightColor?: string;
  idle?: 'drift' | 'none';
  intro?: boolean;
}

export const GradientBlinds: React.FC<GradientBlindsProps> = ({
  className = '',
  style,
  gradientColors = ['#bfdbfe', '#60a5fa', '#2563eb', '#1d4ed8', '#1e3a8a'],
  angle = 20,
  blindCount = 16,
  blindMinWidth = 60,
  spotlightRadius = 0.5,
  spotlightSoftness = 1.0,
  spotlightOpacity = 0.6,
  mirror = false,
  distort = 0,
  shineFlip = false,
  lightMode = false,
  shine = 0.4,
  relief = 0.5,
  glow = 0.4,
  sway = 0.35,
  hoverTilt = 0.6,
  clickEffect = 'ripple',
  noise = 0.25,
  shineDirection = 'left',
  lightColor = '#ffffff',
  idle = 'drift',
  intro = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFallback, setIsFallback] = React.useState<boolean>(false);

  const settingsRef = useRef({
    gradientColors,
    angle,
    blindCount,
    blindMinWidth,
    spotlightRadius,
    spotlightSoftness,
    spotlightOpacity,
    mirror,
    distort,
    shineFlip,
    lightMode,
    shine,
    relief,
    glow,
    sway,
    hoverTilt,
    clickEffect,
    noise,
    shineDirection,
    lightColor,
    idle,
    intro,
  });

  useEffect(() => {
    settingsRef.current = {
      gradientColors,
      angle,
      blindCount,
      blindMinWidth,
      spotlightRadius,
      spotlightSoftness,
      spotlightOpacity,
      mirror,
      distort,
      shineFlip,
      lightMode,
      shine,
      relief,
      glow,
      sway,
      hoverTilt,
      clickEffect,
      noise,
      shineDirection,
      lightColor,
      idle,
      intro,
    };
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: 'high-performance',
    });
    if (!gl) {
      console.warn('[GradientBlinds] WebGL2 not supported, activating static illuminated blinds fallback.');
      setIsFallback(true);
      return;
    }

    const createShader = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.warn('[GradientBlinds] Shader compile failed:', gl.getShaderInfoLog(sh));
        gl.deleteShader(sh);
        return null;
      }
      return sh;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) {
      setIsFallback(true);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      setIsFallback(true);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('[GradientBlinds] Program link failed:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      setIsFallback(true);
      return;
    }

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    // Uniform locations
    const loc = {
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uTime: gl.getUniformLocation(program, 'uTime'),
      uMouse: gl.getUniformLocation(program, 'uMouse'),
      uAngle: gl.getUniformLocation(program, 'uAngle'),
      uNoise: gl.getUniformLocation(program, 'uNoise'),
      uBlindCount: gl.getUniformLocation(program, 'uBlindCount'),
      uSpotlightRadius: gl.getUniformLocation(program, 'uSpotlightRadius'),
      uSpotlightSoftness: gl.getUniformLocation(program, 'uSpotlightSoftness'),
      uSpotlightOpacity: gl.getUniformLocation(program, 'uSpotlightOpacity'),
      uMirror: gl.getUniformLocation(program, 'uMirror'),
      uDistort: gl.getUniformLocation(program, 'uDistort'),
      uShineFlip: gl.getUniformLocation(program, 'uShineFlip'),
      uColors: gl.getUniformLocation(program, 'uColors'),
      uColorCount: gl.getUniformLocation(program, 'uColorCount'),
      uLightMode: gl.getUniformLocation(program, 'uLightMode'),
      uShine: gl.getUniformLocation(program, 'uShine'),
      uRelief: gl.getUniformLocation(program, 'uRelief'),
      uGlow: gl.getUniformLocation(program, 'uGlow'),
      uSway: gl.getUniformLocation(program, 'uSway'),
      uSwayTime: gl.getUniformLocation(program, 'uSwayTime'),
      uHover: gl.getUniformLocation(program, 'uHover'),
      uWaves: gl.getUniformLocation(program, 'uWaves'),
      uIntro: gl.getUniformLocation(program, 'uIntro'),
      uGrainTime: gl.getUniformLocation(program, 'uGrainTime'),
      uLightColor: gl.getUniformLocation(program, 'uLightColor'),
      uPerspective: gl.getUniformLocation(program, 'uPerspective'),
      uGradientShift: gl.getUniformLocation(program, 'uGradientShift'),
    };

    let raf: number | null = null;
    let time = 0;
    let last = 0;
    let visible = false;
    let isContextLost = false;
    const waves = new Float32Array(MAX_WAVES * 4);
    let waveIndex = 0;

    // Pre-allocated typed array for colors (avoid per-frame garbage collection)
    const colorArr = new Float32Array(MAX_COLORS * 3);

    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      inside: false,
    };

    const view = {
      width: 0,
      height: 0,
      ratio: 1,
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      if (!canvas || !container || isContextLost) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const firstResize = view.width === 0;
      view.width = Math.max(1, rect.width);
      view.height = Math.max(1, rect.height);
      view.ratio = dpr;
      if (firstResize) {
        pointer.x = pointer.targetX = view.width * 0.65;
        pointer.y = pointer.targetY = view.height * 0.5;
      }

      canvas.width = Math.floor(view.width * dpr);
      canvas.height = Math.floor(view.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const stopLoop = () => {
      if (raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
      }
    };

    const render = (now: number) => {
      if (!visible || isContextLost || document.hidden) {
        raf = null;
        return;
      }

      if (!last) last = now;
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      time += dt;
      const s = settingsRef.current;
      if (!pointer.inside) {
        const drift = s.idle === 'drift' && !prefersReduced;
        pointer.targetX = view.width * (0.65 + (drift ? Math.sin(time * 0.35) * 0.12 : 0));
        pointer.targetY = view.height * (0.5 + (drift ? Math.cos(time * 0.45) * 0.12 : 0));
      }

      // Smooth pointer lerp
      pointer.x += (pointer.targetX - pointer.x) * 0.1;
      pointer.y += (pointer.targetY - pointer.y) * 0.1;

      gl.useProgram(program);
      gl.bindVertexArray(vao);

      const angleRad = (s.angle * Math.PI) / 180;

      // Update pre-allocated color array without reallocations
      const colors = s.gradientColors.slice(0, MAX_COLORS);
      for (let i = 0; i < colors.length; i++) {
        const [r, g, b] = parseColor(colors[i]);
        colorArr[i * 3] = r;
        colorArr[i * 3 + 1] = g;
        colorArr[i * 3 + 2] = b;
      }

      gl.uniform2f(loc.uResolution, canvas.width, canvas.height);
      gl.uniform1f(loc.uTime, time);
      gl.uniform2f(loc.uMouse, pointer.x * view.ratio, (view.height - pointer.y) * view.ratio);
      gl.uniform1f(loc.uAngle, angleRad);
      gl.uniform1f(loc.uNoise, s.noise);
      gl.uniform1f(loc.uBlindCount, s.blindCount);
      gl.uniform1f(loc.uSpotlightRadius, s.spotlightRadius);
      gl.uniform1f(loc.uSpotlightSoftness, s.spotlightSoftness);
      gl.uniform1f(loc.uSpotlightOpacity, s.spotlightOpacity);
      gl.uniform1f(loc.uMirror, s.mirror ? 1.0 : 0.0);
      gl.uniform1f(loc.uDistort, s.distort);
      gl.uniform1f(loc.uShineFlip, s.shineFlip ? 1.0 : 0.0);
      gl.uniform3fv(loc.uColors, colorArr);
      gl.uniform1i(loc.uColorCount, colors.length);
      gl.uniform1f(loc.uLightMode, s.lightMode ? 1.0 : 0.0);
      gl.uniform1f(loc.uShine, s.shine);
      gl.uniform1f(loc.uRelief, s.relief);
      gl.uniform1f(loc.uGlow, s.glow);
      gl.uniform1f(loc.uSway, prefersReduced ? 0.0 : s.sway);
      gl.uniform1f(loc.uSwayTime, time);
      gl.uniform1f(loc.uHover, pointer.inside ? s.hoverTilt : 0.0);
      gl.uniform4fv(loc.uWaves, waves);
      gl.uniform1f(loc.uIntro, Math.min(time / INTRO_SECONDS, 1.0));
      gl.uniform1f(loc.uGrainTime, time);
      const [lr, lg, lb] = parseColor(s.lightColor);
      gl.uniform3f(loc.uLightColor, lr, lg, lb);
      gl.uniform1f(loc.uPerspective, 0.0);
      gl.uniform1f(loc.uGradientShift, 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      raf = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (raf === null && visible && !isContextLost && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(render);
      }
    };

    const locate = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && x <= rect.width && y >= 0 && y <= rect.height;
      return { x, y, inside };
    };

    const onPointerMove = (e: PointerEvent) => {
      const { x, y, inside } = locate(e);
      pointer.inside = inside;
      if (inside) {
        pointer.targetX = x;
        pointer.targetY = y;
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      const { x, y, inside } = locate(e);
      if (!inside || prefersReduced || settingsRef.current.clickEffect !== 'ripple') return;
      const offset = waveIndex * 4;
      waves[offset] = x * view.ratio;
      waves[offset + 1] = (view.height - y) * view.ratio;
      waves[offset + 2] = time;
      waves[offset + 3] = 1;
      waveIndex = (waveIndex + 1) % MAX_WAVES;
    };

    const onPointerLeave = () => {
      pointer.inside = false;
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isContextLost = true;
      stopLoop();
      setIsFallback(true);
      console.warn('[GradientBlinds] WebGL context lost.');
    };

    const handleContextRestored = () => {
      isContextLost = false;
      setIsFallback(false);
      resize();
      startLoop();
      console.info('[GradientBlinds] WebGL context restored.');
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const intersection = new IntersectionObserver((entries) => {
      const isIntersecting = entries.some((entry) => entry.isIntersecting);
      visible = isIntersecting;
      if (visible) {
        startLoop();
      } else {
        stopLoop();
      }
    }, { threshold: 0.05 });
    intersection.observe(container);

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else if (visible) {
        startLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    resize();
    // Initial draw to ensure canvas is painted even before scroll
    visible = true;
    startLoop();

    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersection.disconnect();
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`gradient-blinds-container ${isFallback ? 'is-fallback' : ''} ${className}`}
      style={style}
    >
      <canvas ref={canvasRef} className="gradient-blinds-canvas" aria-hidden="true" />
    </div>
  );
};

export const FinalCtaBanner: React.FC = () => {
  return (
    <section id="contact" className="fcb-section" aria-labelledby="final-cta-heading">
      <div className="fcb-banner">
        {/* WebGL Gradient Blinds in Luminous Blue/Navy/Cobalt */}
        <div className="fcb-blinds" aria-hidden="true">
          <GradientBlinds
            className="fcb-blindsCanvas"
            gradientColors={['#02040a', '#07132b', '#123f9b', '#1745b3', '#02040a']}
            angle={20}
            blindCount={12}
            blindMinWidth={60}
            spotlightRadius={0.62}
            spotlightSoftness={1.7}
            spotlightOpacity={1}
            shine={0.25}
            relief={0.5}
            glow={0.2}
            sway={0.35}
            hoverTilt={0.6}
            clickEffect="ripple"
            noise={0.25}
            shineDirection="left"
            lightColor="#4b85ff"
            idle="drift"
            intro
          />
        </div>

        {/* Ambient Darkened Scrim to guarantee high contrast */}
        <div className="fcb-scrim" aria-hidden="true" />

        <div className="fcb-copy">
          <p className="fcb-eyebrow">
            <span className="fcb-eyebrowRule" aria-hidden="true" />
            LET'S CONNECT
          </p>

          <h2 id="final-cta-heading" className="fcb-heading">
            Let's build what comes next.
          </h2>

          <p className="fcb-body">
            Have a project, collaboration or opportunity in mind? Let's start a conversation.
          </p>

          <div className="fcb-actions">
            <BlueGlassButton
              href={`mailto:${PERSONAL_INFO.primaryEmail}`}
              variant="primary"
              size="md"
              className="fcb-email-btn"
              icon={<Mail size={16} />}
              trailingIcon={<ArrowUpRight size={15} />}
            >
              <span className="btn-label">{PERSONAL_INFO.primaryEmail}</span>
            </BlueGlassButton>

            <BlueGlassButton
              href={`mailto:${PERSONAL_INFO.secondaryEmail}`}
              variant="secondary"
              size="md"
              className="fcb-email-btn"
              icon={<Mail size={16} />}
              trailingIcon={<ArrowUpRight size={15} />}
            >
              <span className="btn-label">{PERSONAL_INFO.secondaryEmail}</span>
            </BlueGlassButton>

            <div className="fcb-socials-row">
              <BlueGlassButton
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                variant="secondary"
                size="md"
                icon={<Linkedin size={16} />}
                trailingIcon={<ArrowUpRight size={15} />}
              >
                LinkedIn
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                variant="secondary"
                size="md"
                icon={<Github size={16} />}
                trailingIcon={<ArrowUpRight size={15} />}
              >
                GitHub
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.instagram}
                target="_blank"
                variant="secondary"
                size="md"
                icon={<Instagram size={16} />}
                trailingIcon={<ArrowUpRight size={15} />}
              >
                Instagram
              </BlueGlassButton>

              <BlueGlassButton
                href={PERSONAL_INFO.socials.telegram}
                target="_blank"
                variant="secondary"
                size="md"
                icon={<Send size={16} />}
                trailingIcon={<ArrowUpRight size={15} />}
              >
                Telegram
              </BlueGlassButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaBanner;
