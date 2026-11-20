'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { RefObject, useId } from 'react';

/**
 * Layered dusk horizon behind the GlanceAway guide heroes: the page itself is the "something far away".
 * Ridges are generated deterministically so server and client render the same SVG.
 * `bright` lights up the horizon during a break.
 */

const WIDTH = 1600;
const HEIGHT = 900;

function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

function ridgePath(seed: number, base: number, amplitude: number): string {
  const random = seeded(seed);
  const waves = [0.0021, 0.0047, 0.0113, 0.027].map((frequency, index) => ({
    frequency,
    phase: random() * Math.PI * 2,
    weight: [1, 0.55, 0.22, 0.08][index],
  }));
  const points: [number, number][] = [];
  for (let x = -40; x <= WIDTH + 40; x += 16) {
    const y = waves.reduce((sum, wave) => sum + Math.sin(x * wave.frequency + wave.phase) * wave.weight, 0);
    points.push([x, base - y * amplitude]);
  }
  let d = `M ${points[0][0]} ${HEIGHT + 140} L ${points[0][0]} ${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length; i += 1) {
    const [x0, y0] = points[i - 1];
    const [x1, y1] = points[i];
    d += ` Q ${x0} ${y0.toFixed(1)} ${((x0 + x1) / 2).toFixed(1)} ${((y0 + y1) / 2).toFixed(1)}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${HEIGHT + 140} Z`;
  return d;
}

const LAYERS = [
  { d: ridgePath(11, 548, 34), calm: '#3f8b86', bright: '#7cc4b8', drift: -10 },
  { d: ridgePath(29, 602, 48), calm: '#2c6b6a', bright: '#5aa89c', drift: -24 },
  { d: ridgePath(47, 668, 58), calm: '#1c4f53', bright: '#3f8a80', drift: -44 },
  { d: ridgePath(83, 748, 52), calm: '#123a40', bright: '#296c66', drift: -70 },
  { d: ridgePath(131, 836, 40), calm: '#0a252b', bright: '#174a48', drift: -100 },
];

const STARS = (() => {
  const random = seeded(7);
  return Array.from({ length: 46 }, () => ({
    x: random() * WIDTH,
    y: random() * 360,
    r: 0.6 + random() * 1.3,
    o: 0.25 + random() * 0.55,
  }));
})();

type GlanceAwayHorizonProps = {
  bright?: boolean;
  /** Section the parallax follows; without it the landscape stays still. */
  scrollTarget?: RefObject<HTMLElement | null>;
  className?: string;
};

export default function GlanceAwayHorizon({ bright = false, scrollTarget, className = '' }: GlanceAwayHorizonProps) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ['start start', 'end start'],
  });
  // Same motion values on server and client; reduced motion or no target just means zero drift.
  const strength = !reduceMotion && scrollTarget ? 1 : 0;
  const layerY = [
    useTransform(scrollYProgress, [0, 1], [0, LAYERS[0].drift * strength]),
    useTransform(scrollYProgress, [0, 1], [0, LAYERS[1].drift * strength]),
    useTransform(scrollYProgress, [0, 1], [0, LAYERS[2].drift * strength]),
    useTransform(scrollYProgress, [0, 1], [0, LAYERS[3].drift * strength]),
    useTransform(scrollYProgress, [0, 1], [0, LAYERS[4].drift * strength]),
  ];
  const fillTransition = 'fill 1.6s cubic-bezier(0.22, 1, 0.36, 1)';
  // Unique gradient ids: the horizon appears twice on a page (hero and closing CTA).
  const uid = useId().replace(/:/g, '');
  const ids = { calm: `${uid}-calm`, bright: `${uid}-bright`, glow: `${uid}-glow`, fog: `${uid}-fog` };

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className={`absolute inset-0 origin-[62%_64%] transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:scale-100 ${
          bright ? 'scale-[1.045]' : 'scale-100'
        }`}
      >
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          preserveAspectRatio="xMidYMax slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id={ids.calm} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#06131c" />
              <stop offset="0.45" stopColor="#0c2a37" />
              <stop offset="0.66" stopColor="#1f5c60" />
              <stop offset="0.8" stopColor="#7fb9a9" />
            </linearGradient>
            <linearGradient id={ids.bright} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#0b2633" />
              <stop offset="0.42" stopColor="#17485a" />
              <stop offset="0.64" stopColor="#4b9c97" />
              <stop offset="0.8" stopColor="#f2e3bd" />
            </linearGradient>
            <radialGradient id={ids.glow} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="#fff1cf" stopOpacity="0.9" />
              <stop offset="0.35" stopColor="#ffe3a8" stopOpacity="0.35" />
              <stop offset="1" stopColor="#ffe3a8" stopOpacity="0" />
            </radialGradient>
            <linearGradient id={ids.fog} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#e8fbf5" stopOpacity="0" />
              <stop offset="0.5" stopColor="#e8fbf5" stopOpacity="0.16" />
              <stop offset="1" stopColor="#e8fbf5" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect width={WIDTH} height={HEIGHT} fill={`url(#${ids.calm})`} />
          <rect
            width={WIDTH}
            height={HEIGHT}
            fill={`url(#${ids.bright})`}
            style={{ opacity: bright ? 1 : 0, transition: 'opacity 1.6s cubic-bezier(0.22, 1, 0.36, 1)' }}
          />

          <g style={{ opacity: bright ? 0.15 : 1, transition: 'opacity 1.6s ease' }}>
            {STARS.map((star, index) => (
              <circle key={index} cx={star.x} cy={star.y} r={star.r} fill="#e8fbf5" opacity={star.o} />
            ))}
          </g>

          <ellipse
            cx="1040"
            cy="560"
            rx="520"
            ry="200"
            fill={`url(#${ids.glow})`}
            style={{ opacity: bright ? 1 : 0.45, transition: 'opacity 1.6s ease' }}
          />

          {LAYERS.map((layer, index) => (
            <motion.g key={index} style={{ y: layerY[index] }}>
              <path d={layer.d} style={{ fill: bright ? layer.bright : layer.calm, transition: fillTransition }} />
              {index < 3 ? (
                <rect x="0" y={560 + index * 62} width={WIDTH} height="90" fill={`url(#${ids.fog})`} />
              ) : null}
            </motion.g>
          ))}
        </svg>
      </div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#071a20]/60" />
    </div>
  );
}
