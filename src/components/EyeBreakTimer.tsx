'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const FOCUS_OPTIONS = [20, 30] as const;
const BREAK_SECONDS = 20;
/** A break that ended this long ago was missed (laptop asleep, tab frozen), so it does not count. */
const MISSED_BREAK_GRACE_SECONDS = 10;
const TICK_MS = 250;
const RING_RADIUS = 92;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

/** Worker timers are not throttled like timers in a background tab. */
const TICK_WORKER_SOURCE =
  'let t;onmessage=function(e){clearInterval(t);if(e.data>0){t=setInterval(function(){postMessage(0)},e.data)}}';

type Phase = 'idle' | 'focus' | 'break';
type FocusMinutes = (typeof FOCUS_OPTIONS)[number];

export type EyeBreakPhase = Phase;

type EyeBreakTimerProps = {
  accent: string;
  /** Download link for the app line under the timer. */
  storeHref?: string;
  /** Lets the page react to breaks (the hero horizon lights up). */
  onPhaseChange?: (phase: Phase) => void;
};

function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

async function playChime(context: AudioContext | null, notes: number[]) {
  if (!context) return;
  try {
    if (context.state !== 'running') await context.resume();
  } catch {
    return;
  }
  const start = context.currentTime + 0.02;
  notes.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const noteStart = start + index * 0.22;
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0, noteStart);
    gain.gain.linearRampToValueAtTime(0.18, noteStart + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, noteStart + 1.1);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(noteStart);
    oscillator.stop(noteStart + 1.2);
  });
}

function notifyBreak() {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  if (!document.hidden && document.hasFocus()) return;
  try {
    new Notification('Time to look away', {
      body: 'Look at something about 20 feet away for 20 seconds.',
      icon: '/apps/glanceaway-icon.png',
      tag: 'eye-break',
    });
  } catch {
    // Some mobile browsers only allow notifications from a service worker.
  }
}

/** Calls onTick every TICK_MS, from a worker when possible so background tabs keep time. */
function startTicker(onTick: () => void): () => void {
  let worker: Worker | null = null;
  let url: string | null = null;
  try {
    url = URL.createObjectURL(new Blob([TICK_WORKER_SOURCE], { type: 'text/javascript' }));
    worker = new Worker(url);
    worker.onmessage = onTick;
    worker.postMessage(TICK_MS);
  } catch {
    worker = null;
  }
  const interval = worker ? null : window.setInterval(onTick, TICK_MS);
  return () => {
    if (worker) {
      worker.postMessage(0);
      worker.terminate();
    }
    if (url) URL.revokeObjectURL(url);
    if (interval !== null) window.clearInterval(interval);
  };
}

export default function EyeBreakTimer({ accent, storeHref, onPhaseChange }: EyeBreakTimerProps) {
  const [focusMinutes, setFocusMinutes] = useState<FocusMinutes>(20);
  const [phase, setPhase] = useState<Phase>('idle');
  const [paused, setPaused] = useState(false);
  const [remaining, setRemaining] = useState(20 * 60);
  const [breaksDone, setBreaksDone] = useState(0);

  const deadlineRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const originalTitleRef = useRef<string | null>(null);
  const lastTitleRef = useRef<string | null>(null);

  const focusSeconds = focusMinutes * 60;
  const total = phase === 'break' ? BREAK_SECONDS : focusSeconds;
  const progress = phase === 'idle' ? 0 : 1 - remaining / total;
  const running = phase !== 'idle' && !paused;

  const startPhase = useCallback(
    (next: Exclude<Phase, 'idle'>) => {
      const seconds = next === 'break' ? BREAK_SECONDS : focusSeconds;
      deadlineRef.current = Date.now() + seconds * 1000;
      setRemaining(seconds);
      setPhase(next);
      setPaused(false);
    },
    [focusSeconds]
  );

  // Tick against the wall clock; the worker keeps ticking in background tabs.
  useEffect(() => {
    if (!running) return;

    const tick = () => {
      if (deadlineRef.current === null) return;
      const left = (deadlineRef.current - Date.now()) / 1000;

      if (left > 0) {
        setRemaining(left);
        return;
      }

      if (phase === 'focus') {
        startPhase('break');
        void playChime(audioRef.current, [660, 880]);
        notifyBreak();
      } else {
        startPhase('focus');
        void playChime(audioRef.current, [880, 660]);
        if (left > -MISSED_BREAK_GRACE_SECONDS) {
          setBreaksDone((count) => count + 1);
        }
      }
    };

    tick();
    const stopTicker = startTicker(tick);
    document.addEventListener('visibilitychange', tick);
    return () => {
      stopTicker();
      document.removeEventListener('visibilitychange', tick);
    };
  }, [running, phase, startPhase]);

  useEffect(() => {
    onPhaseChange?.(phase);
  }, [phase, onPhaseChange]);

  // Countdown in the tab title, restored when the timer stops.
  useEffect(() => {
    if (originalTitleRef.current === null) {
      originalTitleRef.current = document.title;
    }
    if (phase === 'idle') {
      document.title = originalTitleRef.current;
      lastTitleRef.current = null;
      return;
    }
    const label = phase === 'break' ? 'Look away' : 'Focus';
    const title = `${paused ? 'Paused' : formatTime(remaining)} · ${label}`;
    document.title = title;
    lastTitleRef.current = title;
  }, [phase, paused, remaining]);

  // On unmount, restore the title only if it is still ours (not the next page's).
  useEffect(
    () => () => {
      if (originalTitleRef.current !== null && document.title === lastTitleRef.current) {
        document.title = originalTitleRef.current;
      }
      void audioRef.current?.close();
    },
    []
  );

  const ensureAudio = () => {
    if (!audioRef.current) {
      const AudioCtor =
        window.AudioContext ??
        (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      audioRef.current = AudioCtor ? new AudioCtor() : null;
    }
    void audioRef.current?.resume().catch(() => undefined);
  };

  const handlePrimary = () => {
    ensureAudio();

    if (phase === 'idle') {
      if ('Notification' in window && Notification.permission === 'default') {
        void Notification.requestPermission().catch(() => undefined);
      }
      startPhase('focus');
      return;
    }

    if (paused) {
      deadlineRef.current = Date.now() + remaining * 1000;
      setPaused(false);
    } else {
      setPaused(true);
    }
  };

  const handleReset = () => {
    deadlineRef.current = null;
    setPhase('idle');
    setPaused(false);
    setRemaining(focusSeconds);
  };

  const handleTryBreak = () => {
    ensureAudio();
    void playChime(audioRef.current, [660, 880]);
    startPhase('break');
  };

  const handleChooseFocus = (minutes: FocusMinutes) => {
    if (phase !== 'idle') return;
    setFocusMinutes(minutes);
    setRemaining(minutes * 60);
  };

  const primaryLabel = phase === 'idle' ? 'Start' : paused ? 'Resume' : 'Pause';
  const statusLabel =
    phase === 'break'
      ? 'Look at the horizon'
      : phase === 'focus'
        ? paused
          ? 'Paused'
          : 'Until your next break'
        : `${focusMinutes} min focus, 20 s break`;
  const isBreak = phase === 'break';
  const appLead =
    breaksDone === 0 ? 'Want this on your phone too?' : breaksDone === 1 ? 'First break done.' : `${breaksDone} breaks done.`;

  return (
    <div
      className="relative overflow-hidden rounded-[2.25rem] px-7 py-8 text-white shadow-[0_40px_100px_rgba(2,12,18,0.45)] backdrop-blur-2xl transition-colors duration-[1600ms] sm:px-10 sm:py-10"
      style={{ backgroundColor: isBreak ? 'rgba(8,36,42,0.62)' : 'rgba(8,28,36,0.55)' }}
    >
      <div className="flex flex-col items-center">
        <div
          role="group"
          aria-label="Time between breaks"
          className={`mb-7 inline-flex rounded-full bg-white/[0.08] p-1 transition-opacity duration-300 ${
            phase === 'idle' ? 'opacity-100' : 'opacity-35'
          }`}
        >
          {FOCUS_OPTIONS.map((minutes) => {
            const selected = minutes === focusMinutes;
            return (
              <button
                key={minutes}
                type="button"
                aria-pressed={selected}
                disabled={phase !== 'idle'}
                onClick={() => handleChooseFocus(minutes)}
                className={`h-9 w-24 cursor-pointer rounded-full text-sm font-semibold transition-colors duration-200 active:scale-[0.96] disabled:cursor-default disabled:active:scale-100 ${
                  selected ? 'bg-white text-slate-950' : 'text-white/75 hover:text-white'
                }`}
              >
                {minutes} min
              </button>
            );
          })}
        </div>

        <div className="relative h-60 w-60 sm:h-72 sm:w-72">
          <div
            className={`absolute inset-6 rounded-full blur-2xl transition-opacity duration-1000 ${
              isBreak ? 'ga-breathe opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundColor: `${accent}55` }}
          />
          <svg viewBox="0 0 200 200" className="relative h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="100" cy="100" r={RING_RADIUS} fill="none" stroke="rgba(255,255,255,0.10)" strokeWidth="6" />
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke={accent}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 300ms linear', filter: `drop-shadow(0 0 6px ${accent}aa)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-6xl font-semibold tabular-nums tracking-[-0.04em] text-white sm:text-7xl"
              role="timer"
              aria-live="off"
            >
              {formatTime(phase === 'idle' ? focusSeconds : remaining)}
            </p>
            <p className="mt-2 text-sm font-medium text-white/80" aria-live="polite">
              {statusLabel}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrimary}
            className="inline-flex h-12 w-32 cursor-pointer items-center justify-center rounded-full bg-white text-sm font-bold text-slate-950 shadow-lg shadow-black/20 transition hover:bg-white/90 active:scale-[0.96]"
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={phase === 'idle'}
            className="inline-flex h-12 w-28 cursor-pointer items-center justify-center rounded-full bg-white/[0.08] text-sm font-semibold text-white transition hover:bg-white/[0.14] active:scale-[0.96] disabled:cursor-default disabled:opacity-40 disabled:hover:bg-white/[0.08] disabled:active:scale-100"
          >
            Reset
          </button>
        </div>

        <button
          type="button"
          onClick={handleTryBreak}
          disabled={isBreak}
          className="mt-4 cursor-pointer text-sm font-medium text-white/75 underline-offset-4 transition hover:text-white hover:underline active:scale-[0.97] disabled:cursor-default disabled:opacity-0"
        >
          Try a 20 second break now
        </button>

        {storeHref ? (
          <p className="mt-6 flex min-h-[3rem] max-w-sm items-center justify-center text-center text-sm leading-6 text-white/80">
            <span>
              {appLead}{' '}
              <a
                href={storeHref}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="font-semibold text-white underline decoration-white/40 underline-offset-4 transition hover:decoration-white active:opacity-60"
              >
                GlanceAway runs it on iPhone and Mac
              </a>
            </span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
