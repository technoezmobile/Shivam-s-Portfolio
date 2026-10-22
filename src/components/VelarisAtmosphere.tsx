import React, { useEffect, useRef } from 'react';

const VERTEX_SHADER = `#version 300 es
void main() {
  vec2 p = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;

out vec4 fragColor;

// Simplex-style hash and noise
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float total = 0.0;
  float amplitude = 0.55;
  float frequency = 0.85;
  for (int i = 0; i < 3; i++) {
    total += amplitude * snoise(p * frequency);
    p += vec2(0.2, 0.12);
    frequency *= 1.85;
    amplitude *= 0.45;
  }
  return total;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  float aspect = uResolution.x / uResolution.y;

  // Gentle pointer influence
  vec2 mouseNorm = (uMouse - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  float mouseDist = length(uv - mouseNorm);
  float mouseGlow = exp(-mouseDist * 3.2) * 0.14;

  // Domain warping for slow, silky organic fluid motion
  float t = uTime * 0.045;
  vec2 q = vec2(fbm(uv * 0.95 + vec2(t * 0.35, t * 0.25)),
                fbm(uv * 0.95 + vec2(t * 0.2, -t * 0.3)));

  vec2 r = vec2(fbm(uv * 1.1 + 1.8 * q + vec2(1.7, 9.2) + vec2(-t * 0.15, t * 0.2)),
                fbm(uv * 1.1 + 1.8 * q + vec2(8.3, 2.8) + vec2(t * 0.1, -t * 0.15)));

  float noiseVal = fbm(uv * 0.9 + 2.2 * r);

  // Dual-side broad light fields: balanced illumination across BOTH left and right
  float leftField = exp(-pow(length(uv - vec2(-0.42 * aspect, 0.05 + 0.08 * sin(t * 1.1))), 1.8) * 1.4);
  float rightField = exp(-pow(length(uv - vec2(0.44 * aspect, -0.05 + 0.08 * cos(t * 1.0))), 1.8) * 1.3);
  float centerSubtle = exp(-pow(length(uv * vec2(0.8, 1.2)), 2.0) * 1.1) * 0.3;

  // Curated Blue Luxury Palette
  vec3 cBase       = vec3(0.012, 0.027, 0.071); // #030712 deep midnight navy
  vec3 cDeepNavy   = vec3(0.031, 0.071, 0.165); // #08122a rich navy
  vec3 cCobalt     = vec3(0.114, 0.306, 0.922); // #1d4ed8 cobalt blue
  vec3 cRoyal      = vec3(0.145, 0.424, 0.980); // #256ceb royal blue
  vec3 cIce        = vec3(0.576, 0.773, 0.992); // #93c5fd ice blue
  vec3 cIndigo     = vec3(0.118, 0.106, 0.294); // #1e1b4b restrained indigo

  // Blend light fields with noise structure
  vec3 col = cBase;
  
  // Layer 1: Broad cobalt and navy waves
  float w1 = smoothstep(-0.4, 0.6, noiseVal);
  col = mix(col, cDeepNavy, w1 * 0.82);

  // Layer 2: Left cobalt glow & right royal blue glow
  col += cCobalt * leftField * (0.65 + 0.25 * noiseVal);
  col += cRoyal * rightField * (0.68 + 0.25 * noiseVal);
  col += cIndigo * centerSubtle * 0.45;

  // Layer 3: Soft, restrained ambient highlights (no sharp distracting veins)
  float ridge = smoothstep(0.42, 0.88, noiseVal) * (leftField + rightField + 0.15);
  col += cIce * ridge * 0.22;

  // Pointer addition
  col += cIce * mouseGlow;

  // Vignette to keep viewport perimeter clean and deep
  vec2 sc = gl_FragCoord.xy / uResolution.xy;
  float vig = smoothstep(1.2, 0.35, length((sc - 0.5) * 1.6));
  col *= vig;

  // Overall intensity scaling (30-45% ambient contribution)
  col *= uIntensity;

  fragColor = vec4(col, 1.0);
}`;

interface VelarisAtmosphereProps {
  intensity?: number;
}

export const VelarisAtmosphere: React.FC<VelarisAtmosphereProps> = ({
  intensity = 0.92,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      // Graceful fallback to CSS gradient handled by host wrapper
      return;
    }

    // Compile Shaders
    const createShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn('Velaris shader compile failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn('Velaris program link failed:', gl.getProgramInfoLog(program));
      return;
    }

    const vao = gl.createVertexArray();

    // Uniform locations
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uMouse = gl.getUniformLocation(program, 'uMouse');
    const uIntensity = gl.getUniformLocation(program, 'uIntensity');

    let animationFrameId: number;
    let isVisible = true;
    let width = 0;
    let height = 0;
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const startTime = performance.now();

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth > 768 ? 1.25 : 1.0);
      const w = Math.floor(window.innerWidth * dpr);
      const h = Math.floor(window.innerHeight * dpr);
      if (w !== width || h !== height) {
        width = w;
        height = h;
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const handlePointerMove = (e: MouseEvent) => {
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth > 768 ? 1.25 : 1.0);
      mouse.targetX = e.clientX * dpr;
      mouse.targetY = (window.innerHeight - e.clientY) * dpr;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible && !prefersReducedMotion) {
        cancelAnimationFrame(animationFrameId);
        render();
      } else {
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) return;

      // Soft pointer lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const elapsed = (performance.now() - startTime) / 1000.0;

      gl.useProgram(program);
      gl.bindVertexArray(vao);

      gl.uniform2f(uResolution, width, height);
      gl.uniform1f(uTime, prefersReducedMotion ? 1.2 : elapsed);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.uniform1f(uIntensity, intensity);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    // First render
    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibility);

      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteVertexArray(vao);
      }
    };
  }, [intensity]);

  return (
    <div className="velaris-atmosphere-host" aria-hidden="true">
      <canvas ref={canvasRef} className="velaris-atmosphere-canvas" />
      <div className="velaris-fallback-overlay" />
    </div>
  );
};
