// Synthesized sound engine using the Web Audio API.
// No external audio files required - every cue is generated on the fly.

export type SoundName =
  | "boot"
  | "shutter"
  | "hover"
  | "click"
  | "enter"
  | "scrolltick"
  | "count"
  | "chime";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;

function ensureCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext || (window as any).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.5; // low master volume by design
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

type ToneOpts = {
  freq: number;
  type?: OscillatorType;
  dur?: number;
  vol?: number;
  attack?: number;
  glideTo?: number;
  delay?: number;
};

function tone({
  freq,
  type = "sine",
  dur = 0.12,
  vol = 0.2,
  attack = 0.005,
  glideTo,
  delay = 0,
}: ToneOpts) {
  const c = ensureCtx();
  if (!c || !master) return;
  const t0 = c.currentTime + delay;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t0);
  if (glideTo) osc.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
  g.gain.setValueAtTime(0.0001, t0);
  g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(g);
  g.connect(master);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

function noise(dur = 0.2, vol = 0.15, hp = 800) {
  const c = ensureCtx();
  if (!c || !master) return;
  const t0 = c.currentTime;
  const buffer = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  const src = c.createBufferSource();
  src.buffer = buffer;
  const filter = c.createBiquadFilter();
  filter.type = "highpass";
  filter.frequency.value = hp;
  const g = c.createGain();
  g.gain.setValueAtTime(vol, t0);
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  src.connect(filter);
  filter.connect(g);
  g.connect(master);
  src.start(t0);
  src.stop(t0 + dur);
}

const players: Record<SoundName, () => void> = {
  hover: () => tone({ freq: 1200, type: "sine", dur: 0.05, vol: 0.06 }),
  click: () => {
    tone({ freq: 320, type: "square", dur: 0.05, vol: 0.12 });
    tone({ freq: 660, type: "sine", dur: 0.08, vol: 0.08, delay: 0.02 });
  },
  enter: () =>
    tone({ freq: 220, glideTo: 540, type: "sine", dur: 0.35, vol: 0.07 }),
  shutter: () => {
    noise(0.25, 0.12, 600);
    tone({ freq: 140, glideTo: 60, type: "sawtooth", dur: 0.3, vol: 0.08 });
  },
  boot: () => {
    tone({ freq: 80, glideTo: 160, type: "sine", dur: 1.6, vol: 0.05 });
    tone({ freq: 240, type: "sine", dur: 1.6, vol: 0.02 });
  },
  scrolltick: () => tone({ freq: 900, type: "sine", dur: 0.02, vol: 0.03 }),
  count: () => tone({ freq: 880, type: "triangle", dur: 0.12, vol: 0.1 }),
  chime: () => {
    [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
      tone({ freq: f, type: "sine", dur: 0.5, vol: 0.1, delay: i * 0.08 })
    );
  },
};

// ---- File-based samples (downloaded SFX) with synth fallback ----

const FILES: Partial<Record<SoundName, string>> = {
  hover: "/sounds/hover.wav",
  click: "/sounds/click.wav",
  enter: "/sounds/enter.wav",
  shutter: "/sounds/shutter.wav",
  chime: "/sounds/chime.wav",
};

// Per-sound volume (samples can be loud; hover fires often so keep it low).
const VOL: Partial<Record<SoundName, number>> = {
  hover: 0.25,
  click: 0.5,
  enter: 0.4,
  shutter: 0.5,
  chime: 0.6,
};

const buffers: Partial<Record<SoundName, AudioBuffer>> = {};
let loadStarted = false;

function loadSamples() {
  if (loadStarted) return;
  loadStarted = true;
  const c = ensureCtx();
  if (!c) return;
  (Object.keys(FILES) as SoundName[]).forEach(async (name) => {
    try {
      const res = await fetch(FILES[name]!);
      const arr = await res.arrayBuffer();
      buffers[name] = await c.decodeAudioData(arr);
    } catch {
      /* fall back to synth */
    }
  });
}

function playSample(name: SoundName) {
  const c = ensureCtx();
  const buf = buffers[name];
  if (!c || !master || !buf) return false;
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  g.gain.value = VOL[name] ?? 0.4;
  src.connect(g);
  g.connect(master);
  src.start();
  return true;
}

let enabled = false;
const lastPlayed: Partial<Record<SoundName, number>> = {};

export function setSoundEnabled(v: boolean) {
  enabled = v;
  if (v) {
    ensureCtx();
    loadSamples();
  }
}

export function isSoundEnabled() {
  return enabled;
}

// Resume the AudioContext (must be called from within a user gesture the
// first time, per the browser autoplay policy). Safe to call repeatedly.
export function resumeAudio() {
  const c = ensureCtx();
  if (c && c.state === "suspended") {
    c.resume().catch(() => {});
  }
  loadSamples();
}

export function getCtxState(): string {
  return ctx ? ctx.state : "none";
}

export function playSound(name: SoundName, throttleMs = 0) {
  if (!enabled) return;
  if (typeof window === "undefined") return;
  const now = performance.now();
  if (throttleMs && lastPlayed[name] && now - lastPlayed[name]! < throttleMs)
    return;
  lastPlayed[name] = now;
  try {
    // Prefer the downloaded sample; fall back to the synthesized cue.
    if (!playSample(name)) players[name]?.();
  } catch {
    /* no-op */
  }
}
