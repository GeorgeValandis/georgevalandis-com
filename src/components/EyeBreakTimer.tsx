'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const FOCUS_SECONDS = 20 * 60;
const BREAK_SECONDS = 20;
const RING_RADIUS = 92;
const RING_LENGTH = 2 * Math.PI * RING_RADIUS;

type Phase = 'idle' | 'focus' | 'break';

type EyeBreakTimerProps = {
  accent: string;
  appStoreLink?: string;
};

function formatTime(totalSeconds: number): string {
  const safe = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function playChime(context: AudioContext | null, notes: number[]) {
  if (!context) return;
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

export default function EyeBreakTimer({ accent, appStoreLink }: EyeBreakTimerProps) {
  const [phase, setPhase] = useState<Phase>('idle');
  const [paused, setPaused] = useState(false);
  const [remaining, setRemaining] = useState(FOCUS_SECONDS);
  const [breaksDone, setBreaksDone] = useState(0);

  const deadlineRef = useRef<number | null>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const originalTitleRef = useRef<string | null>(null);
  const lastTitleRef = useRef<string | null>(null);

  const total = phase === 'break' ? BREAK_SECONDS : FOCUS_SECONDS;
  const progress = phase === 'idle' ? 0 : 1 - remaining / total;
  const running = phase !== 'idle' && !paused;

  const startPhase = useCallback((next: Exclude<Phase, 'idle'>) => {
    const seconds = next === 'break' ? BREAK_SECONDS : FOCUS_SECONDS;
    deadlineRef.current = Date.now() + seconds * 1000;
    setRemaining(seconds);
    setPhase(next);
    setPaused(false);
  }, []);

  // Tick against the wall clock so throttled background tabs stay accurate.
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
        playChime(audioRef.current, [660, 880]);
        if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
          try {
            new Notification('Time to look away', {
              body: 'Look at something about 20 feet away for 20 seconds.',
              icon: '/apps/glanceaway-icon.png',
            });
          } catch {
            // Some mobile browsers only allow notifications from a service worker.
          }
        }
      } else {
        startPhase('focus');
        playChime(audioRef.current, [880, 660]);
        setBreaksDone((count) => count + 1);
      }
    };

    tick();
    const interval = window.setInterval(tick, 250);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [running, phase, startPhase]);

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
    void audioRef.current?.resume();
  };

  const handlePrimary = () => {
    ensureAudio();

    if (phase === 'idle') {
      if ('Notification' in window && Notification.permission === 'default') {
        void Notification.requestPermission();
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
    setRemaining(FOCUS_SECONDS);
  };

  const handleTryBreak = () => {
    ensureAudio();
    playChime(audioRef.current, [660, 880]);
    startPhase('break');
  };

  const primaryLabel = phase === 'idle' ? 'Start' : paused ? 'Resume' : 'Pause';
  const statusLabel =
    phase === 'break' ? 'Look 20 feet away' : phase === 'focus' ? (paused ? 'Paused' : 'Until your next break') : '20 min focus, 20 s break';
  const isBreak = phase === 'break';
  const showNudge = breaksDone > 0;

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.10)] transition-colors duration-700 sm:p-10"
      style={{ backgroundColor: isBreak ? `${accent}26` : 'rgba(255,255,255,0.85)' }}
    >
      <div className="flex flex-col items-center">
        <div className="relative h-56 w-56 sm:h-64 sm:w-64">
          <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90" aria-hidden="true">
            <circle cx="100" cy="100" r={RING_RADIUS} fill="none" stroke="rgba(15,23,42,0.07)" strokeWidth="10" />
            <circle
              cx="100"
              cy="100"
              r={RING_RADIUS}
              fill="none"
              stroke={accent}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={RING_LENGTH}
              strokeDashoffset={RING_LENGTH * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 300ms linear' }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p
              className="text-5xl font-bold tabular-nums tracking-tight text-slate-950 sm:text-6xl"
              role="timer"
              aria-live="off"
            >
              {formatTime(phase === 'idle' ? FOCUS_SECONDS : remaining)}
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-500" aria-live="polite">
              {statusLabel}
            </p>
          </div>
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrimary}
            className="inline-flex h-12 w-32 cursor-pointer items-center justify-center rounded-full bg-slate-950 text-sm font-bold text-white shadow-lg shadow-slate-950/15 transition hover:bg-slate-800 active:scale-[0.96]"
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={phase === 'idle'}
            className="inline-flex h-12 w-28 cursor-pointer items-center justify-center rounded-full bg-slate-950/[0.06] text-sm font-bold text-slate-800 transition hover:bg-slate-950/10 active:scale-[0.96] disabled:cursor-default disabled:opacity-0"
          >
            Reset
          </button>
        </div>

        <button
          type="button"
          onClick={handleTryBreak}
          disabled={isBreak}
          className="mt-4 cursor-pointer text-sm font-semibold text-slate-500 underline-offset-4 transition hover:text-slate-900 hover:underline active:scale-[0.97] disabled:cursor-default disabled:opacity-0"
        >
          Try a 20 second break now
        </button>

        {appStoreLink ? (
          <div
            className={`mt-6 flex min-h-[3rem] items-center justify-center text-center transition-all duration-500 ${
              showNudge ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-1 opacity-0'
            }`}
            aria-hidden={!showNudge}
          >
            <p className="max-w-sm text-sm leading-6 text-slate-600">
              {breaksDone === 1 ? 'First break done.' : `${breaksDone} breaks done.`}{' '}
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={showNudge ? 0 : -1}
                className="font-bold text-slate-950 underline underline-offset-4 transition hover:text-slate-600 active:opacity-60"
              >
                Let GlanceAway do this on iPhone and Mac
              </a>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
