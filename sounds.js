/* Sounds for the listening questions, made in the browser with Web Audio, so there are no files to load.
   DJ_SOUNDS.play(name) plays one and returns how many seconds it lasts. */

const DJ_SOUNDS = (function () {
  let ctx = null;

  function tone(out, t, f, d, opts) {
    const o = ctx.createOscillator(), g = ctx.createGain(), v = (opts && opts.v) || 0.25;
    o.type = (opts && opts.type) || "sine";
    o.frequency.setValueAtTime(f, t);
    if (opts && opts.to) o.frequency.exponentialRampToValueAtTime(opts.to, t + d);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(v, t + 0.012);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    o.connect(g); g.connect(out); o.start(t); o.stop(t + d + 0.05);
  }
  function noise(out, t, d, f, opts) {
    const len = Math.max(1, Math.ceil(ctx.sampleRate * d)), buf = ctx.createBuffer(1, len, ctx.sampleRate), data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource(), fl = ctx.createBiquadFilter(), g = ctx.createGain();
    src.buffer = buf;
    fl.type = (opts && opts.type) || "bandpass"; fl.frequency.value = f; fl.Q.value = (opts && opts.q) || 1;
    g.gain.setValueAtTime((opts && opts.v) || 0.5, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + d);
    src.connect(fl); fl.connect(g); g.connect(out); src.start(t); src.stop(t + d + 0.02);
  }

  const SOUNDS = {
    // Two bright notes going up: the classic "done" chime.
    success(out, t) {
      tone(out, t, 1046.5, 0.35, { type: "triangle", v: 0.3 });
      tone(out, t + 0.13, 1568, 0.6, { type: "triangle", v: 0.3 });
      return 0.8;
    },
    // Two low, rough notes going down.
    error(out, t) {
      [0, 0.22].forEach((dt, i) => {
        const f = i ? 155 : 200;
        tone(out, t + dt, f, 0.2, { type: "square", v: 0.12 });
        tone(out, t + dt, f * 1.06, 0.2, { type: "sawtooth", v: 0.08 });
      });
      return 0.5;
    },
    // Paper scrunched into a ball, like emptying the trash on a desktop.
    crumple(out, t) {
      for (let i = 0; i < 26; i++) noise(out, t + Math.random() * 0.75, 0.015 + Math.random() * 0.05, 900 + Math.random() * 4200, { q: 0.9, v: 0.35 + Math.random() * 0.35 });
      noise(out, t + 0.8, 0.12, 1600, { q: 0.7, v: 0.3 });
      return 1;
    },
    // A camera shutter: a sharp click, then the mirror settling.
    shutter(out, t) {
      noise(out, t, 0.035, 4200, { type: "highpass", v: 0.9 });
      tone(out, t, 140, 0.05, { type: "square", v: 0.15 });
      noise(out, t + 0.085, 0.06, 1800, { q: 1.4, v: 0.6 });
      tone(out, t + 0.085, 95, 0.06, { type: "square", v: 0.12 });
      return 0.3;
    },
    // A short abstract tune that doesn't sound like anything in the real world.
    chime(out, t) {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(out, t + i * 0.14, f, 0.7, { type: "sine", v: 0.22 }));
      return 1.2;
    },
    // A monitor beeping faster and higher as the pulse climbs.
    pulse(out, t) {
      let at = t, gap = 0.95, f = 880;
      for (let i = 0; i < 16; i++) { tone(out, at, f, 0.09, { type: "sine", v: 0.3 }); at += gap; gap = Math.max(0.28, gap * 0.88); f *= 1.025; }
      return at - t;
    }
  };

  function play(name) {
    const make = SOUNDS[name];
    if (!make) return 0;
    try {
      ctx = ctx || new (window.AudioContext || window.webkitAudioContext)();
      if (ctx.state === "suspended") ctx.resume();
      const out = ctx.createGain();
      out.gain.value = 0.9;
      out.connect(ctx.destination);
      return make(out, ctx.currentTime + 0.05);
    } catch (e) { return 0; }
  }
  return { play, has: name => !!SOUNDS[name] };
})();
