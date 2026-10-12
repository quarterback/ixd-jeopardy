/* Design Jeopardy host screen.
   Two ways to play:
   "devices"  each team answers on its own phone or laptop at /play. This screen only shows who has locked in.
   "dm"       captains DM the host, who clicks answers in. No server needed.
   Each round, every team also gets one Special: a Press Your Luck style roll, then a question only that team answers. */
(function () {
  "use strict";

  const STORE = "design-jeopardy-v3";
  const LETTERS = ["A", "B", "C", "D"];
  // The 16 squares around the Special board, in round one points. Later rounds multiply them.
  const ROLL_BASE = [100, 250, 500, 150, 300, 750, 200, 400, 1000, 100, 350, 500, 200, 600, 250, 800];
  // Where each of those squares sits on a 5 by 5 grid, going clockwise from the top left.
  const RING = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [4, 1], [3, 1], [2, 1]];
  // The wheel: 24 wedges, one top wedge (index 15). Every wedge pays something.
  const WHEEL_BASE = [300, 500, 250, 700, 400, 850, 350, 600, 200, 800, 450, 500, 300, 650, 250, 1000, 400, 550, 150, 750, 350, 600, 250, 900];
  const WHEEL_TOP = 15;
  const WHEEL_COLORS = ["#e0544a", "#2f7de1", "#f2b632", "#2fbf71", "#a77bf0", "#f08a4b", "#1fb5c4", "#e05aa0"];
  // Plinko: 9 slots mirrored from the middle. The middle pays most; the slots beside it pay least.
  const PLINKO_BASE = [200, 300, 500, 100, 1000, 100, 500, 300, 200];
  const PLINKO_AIMS = [0, 2, 4, 6, 8]; // which slot each of the five drop spots sits above
  const PLINKO_ROWS = 8;
  const app = document.getElementById("app");

  // ---------- storage ----------
  function load() { try { const r = localStorage.getItem(STORE); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function persist() { try { if (S) localStorage.setItem(STORE, JSON.stringify(S)); else localStorage.removeItem(STORE); } catch (e) { /* storage off */ } }

  // ---------- helpers ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function fmt(n) { return (n < 0 ? "−" : "") + Math.abs(n).toLocaleString("en-US"); }
  function signed(n) { return (n > 0 ? "+" : "") + fmt(n); }

  function prep(src, fallbackCat) {
    let options, answer;
    if (src.fixed) { options = src.fixed.slice(); answer = options.indexOf(src.a); }
    else { options = shuffle([src.a].concat(src.w)); answer = options.indexOf(src.a); }
    return { cat: src.cat || fallbackCat, q: src.q, options, answer, why: src.why || "", src: src.src || "", media: src.media || null };
  }

  // ---------- network ----------
  let offset = 0; // server clock minus this clock
  function serverNow() { return Date.now() + offset; }
  function noteTime(now) { if (now) offset = now - Date.now(); }
  async function api(method, path, body) {
    const headers = { "content-type": "application/json" };
    if (S && S.room) headers["x-host-key"] = S.room.hostKey;
    const res = await fetch("/api/rooms" + path, { method, headers, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) { const e = new Error(data.message || "The game server didn't answer."); e.code = data.error; throw e; }
    noteTime(data.now);
    return data;
  }
  function live() { return !!(S && S.cfg.mode === "devices" && S.room); }
  function joinURL(withCode) { return location.origin + "/play" + (withCode && S && S.room ? "?room=" + S.room.code : ""); }

  let chain = Promise.resolve();
  let lastPub = "";
  let netError = "";
  function queue(fn) { chain = chain.then(fn, fn); return chain; }
  function publish(extra) {
    if (!live()) return Promise.resolve(null);
    const str = JSON.stringify(pubState());
    if (!extra && str === lastPub) return chain;
    lastPub = str;
    return queue(async () => {
      if (!S || !S.room) return null;
      try { const d = await api("PUT", `/${S.room.code}/state`, Object.assign({ state: pubState() }, extra || {})); setNetError(""); return d; }
      catch (e) { lastPub = ""; setNetError("Can't reach the team devices. Retrying."); return null; }
    });
  }
  function setNetError(m) { if (m !== netError) { netError = m; const el = document.getElementById("neterr"); if (el) { el.textContent = m; el.hidden = !m; } } }

  // ---------- drawing the boards ----------
  function drawGame(cfg) {
    const used = new Set(), usedDD = new Set();
    let catsLeft = shuffle(BANK);
    const rounds = [];
    for (let r = 0; r < cfg.rounds; r++) {
      if (catsLeft.length < cfg.cats) catsLeft = catsLeft.concat(shuffle(BANK.filter(c => !catsLeft.includes(c))));
      const cats = catsLeft.splice(0, cfg.cats);
      const cols = cats.map(cat => {
        const cells = [];
        for (let k = 0; k < cfg.rows; k++) {
          const target = cfg.rows === 1 ? 1 : 1 + Math.round(k * 3 / (cfg.rows - 1));
          let pool = cat.qs.filter(q => !used.has(q.q));
          if (!pool.length) pool = cat.qs.slice();
          const best = Math.min(...pool.map(q => Math.abs(q.l - target)));
          const pick = shuffle(pool.filter(q => Math.abs(q.l - target) === best))[0];
          used.add(pick.q);
          cells.push({ value: (k + 1) * 100 * (r + 1), dd: false, q: prep(pick, cat.cat) });
        }
        return { cat: cat.cat, cells };
      });
      const ddCount = Math.min(r === 0 ? 1 : 2, DAILY_DOUBLES.length - usedDD.size);
      const spots = shuffle(cols.flatMap((col, c) => col.cells.map((cell, k) => ({ c, k }))).filter(s => s.k > 0 || cfg.rows === 1));
      for (let i = 0; i < ddCount && i < spots.length; i++) {
        const d = shuffle(DAILY_DOUBLES.filter(x => !usedDD.has(x.q)))[0];
        usedDD.add(d.q);
        const cell = cols[spots[i].c].cells[spots[i].k];
        used.delete(cell.q.q);
        cell.dd = true;
        cell.q = prep(d, d.cat);
      }
      rounds.push({ cols });
    }
    const final = cfg.final && FINALS.length ? { value: 0, dd: false, final: true, q: prep(shuffle(FINALS)[0]) } : null;
    return { rounds, final, used: Array.from(used) };
  }
  // A Special question: any category, never a question already on a board or used for another Special.
  function drawSpecialQ() {
    const used = new Set(S.usedQ || []);
    let pool = [];
    BANK.forEach(cat => cat.qs.forEach(q => { if (!used.has(q.q)) pool.push({ q, cat: cat.cat }); }));
    if (!pool.length) BANK.forEach(cat => cat.qs.forEach(q => pool.push({ q, cat: cat.cat })));
    const pick = pool[Math.floor(Math.random() * pool.length)];
    S.usedQ = (S.usedQ || []).concat(pick.q.q);
    return prep(pick.q, pick.cat);
  }

  // ---------- state ----------
  let S = load();
  if (S && !S.cfg) S = null;
  let draft = { names: ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6"], rounds: 2, cats: 5, rows: 5, secs: 25, mode: "devices", final: true, specials: true };
  if (S) draft = Object.assign({}, draft, S.cfg, { names: S.teams.map(t => t.name) });
  let overlay = null, confirmNew = false, setupError = "", starting = false;
  let celebrate = null, celebrateTimer = null;
  const buzzed = {};

  function isBonusKey(key) { return /^\d+-s-\d+$/.test(key || ""); }
  function cellAt(key) {
    if (key === "final") return S.final;
    if (isBonusKey(key)) return S.specials[key];
    const [r, c, k] = key.split("-").map(Number);
    return S.rounds[r].cols[c].cells[k];
  }
  function isWager(cell) { return !!(cell.dd || cell.final); }
  function res(key) {
    if (!S.res[key]) {
      const cell = cellAt(key);
      S.res[key] = { picks: {}, at: {}, wagers: {}, doubled: [], shown: !isWager(cell) && !cell.bonus, rolled: !cell.bonus, revealed: false, done: false, startedAt: null, deadline: null };
    }
    return S.res[key];
  }
  function qid(key) { return key + "." + ((S.attempts && S.attempts[key]) || 0); }
  function points(t, key) {
    const r = S.res[key];
    if (!r || !r.revealed) return 0;
    const cell = cellAt(key);
    if (!cell) return 0;
    const pick = r.picks[t];
    if (cell.bonus) return t === cell.team && pick === cell.q.answer ? cell.value : 0;
    if (isWager(cell)) {
      const w = Number(r.wagers[t]) || 0;
      if (pick == null) return 0;
      return pick === cell.q.answer ? w : -w;
    }
    if (pick == null) return 0;
    const x = r.doubled.includes(t) ? 2 : 1;
    return pick === cell.q.answer ? cell.value * x : 0;
  }
  function score(t, exceptKey) {
    let s = S.teams[t].adj;
    for (const key in S.res) if (key !== exceptKey) s += points(t, key);
    return s;
  }
  function roundPoints(t, ri) {
    let s = 0;
    for (const key in S.res) if (key.startsWith(ri + "-")) s += points(t, key);
    return s;
  }
  function boardTop(ri) { return S.cfg.rows * 100 * (ri + 1); }
  function maxWager(t, key) {
    const s = score(t, key);
    return key === "final" ? Math.max(s, 0) : Math.max(s, boardTop(S.ri));
  }
  function squaresDone(ri) {
    let n = 0;
    S.rounds[ri].cols.forEach((col, c) => col.cells.forEach((cell, k) => { const r = S.res[`${ri}-${c}-${k}`]; if (r && r.done) n++; }));
    return n;
  }
  function roundDone(ri) { return squaresDone(ri) === S.cfg.cats * S.cfg.rows; }
  function remaining() { const r = S.cur && S.res[S.cur]; return r && r.deadline ? r.deadline - serverNow() : null; }
  function clockRunning() { const r = S.cur && S.res[S.cur]; return !!(r && r.startedAt && !r.revealed && remaining() > 0); }
  function lockedCount() { const r = S.cur && S.res[S.cur]; return r ? S.teams.filter((_, t) => r.picks[t] != null).length : 0; }

  // ---------- Specials ----------
  // Reverse team order: the last team gets the first Special of every round.
  function specialsOn() { return S.cfg.specials !== false; }
  function specDone(ri) { S.specDone = S.specDone || {}; return (S.specDone[ri] = S.specDone[ri] || []); }
  function specialsLeft(ri) { return specialsOn() ? S.teams.length - specDone(ri).length : 0; }
  function nextSpecialTeam(ri) {
    const done = specDone(ri);
    for (let t = S.teams.length - 1; t >= 0; t--) if (!done.includes(t)) return t;
    return null;
  }
  // Spread the Specials evenly through the round's squares.
  function specialDue(ri) {
    if (!specialsLeft(ri)) return false;
    const n = S.cfg.cats * S.cfg.rows, k = specDone(ri).length;
    return squaresDone(ri) >= Math.max(1, Math.round((k + 1) * n / (S.teams.length + 1)));
  }
  // Round one rolls the light board. Round two rolls a wheel or Plinko. Round three can be any of them.
  function rollTypeFor(ri) {
    const opts = ri === 0 ? ["board"] : ri === 1 ? ["wheel", "plinko"] : ["board", "wheel", "plinko"];
    return opts[Math.floor(Math.random() * opts.length)];
  }
  function startSpecial(team) {
    S.specCount = S.specCount || {};
    const n = S.specCount[S.ri] = (S.specCount[S.ri] || 0) + 1;
    const key = `${S.ri}-s-${n}`;
    S.specials = S.specials || {};
    S.specials[key] = { bonus: true, team, value: 0, roll: rollTypeFor(S.ri), q: drawSpecialQ() };
    S.cur = key; S.view = "question"; res(key);
  }

  // What team devices are allowed to see. The question text never goes to devices.
  function pubState() {
    const base = { phase: "board", round: S.ri + 1, rounds: S.rounds.length, teams: S.teams.map(t => t.name), scores: S.teams.map((_, t) => score(t)), picker: S.picker };
    if (S.view === "lobby") return Object.assign(base, { phase: "lobby" });
    if (S.view === "board") return base;
    if (S.view === "results") return Object.assign(base, { phase: "results", roundPts: S.teams.map((_, t) => roundPoints(t, S.ri)) });
    if (S.view === "end") return Object.assign(base, { phase: "end" });
    const cell = cellAt(S.cur), r = res(S.cur), q = cell.q;
    const kind = cell.bonus ? "special" : cell.final ? "final" : cell.dd ? "dd" : "q";
    const common = { qid: qid(S.cur), kind, cat: q.cat, value: cell.value || 0, visual: !!q.media, onlyTeam: cell.bonus ? cell.team : null };
    if (cell.bonus && !r.rolled) return Object.assign(base, common, { phase: "roll", rollType: cell.roll || "board" });
    if (isWager(cell) && !r.shown) return Object.assign(base, common, { phase: "splash", maxWager: S.teams.map((_, t) => maxWager(t, S.cur)) });
    if (!r.revealed) return Object.assign(base, common, { phase: "question", secs: S.cfg.secs, startedAt: r.startedAt, deadline: r.deadline, options: r.startedAt ? q.options : null });
    return Object.assign(base, common, {
      phase: "reveal", options: q.options, answer: q.answer,
      results: S.teams.map((_, t) => ({ pick: r.picks[t] == null ? null : r.picks[t], delta: points(t, S.cur), doubled: r.doubled.includes(t) }))
    });
  }

  // ---------- polling team devices ----------
  let polling = false;
  async function poll() {
    if (!live() || polling) return;
    const inQ = S.view === "question" && S.cur && !res(S.cur).revealed;
    if (S.view !== "lobby" && !inQ && overlay !== "devices") return;
    polling = true;
    try {
      const d = await api("GET", `/${S.room.code}/subs?qid=${inQ ? encodeURIComponent(qid(S.cur)) : ""}`);
      setNetError("");
      applySubs(d.teams);
    } catch (e) { setNetError("Can't reach the team devices. Retrying."); }
    finally { polling = false; }
  }
  function applySubs(teams) {
    if (!S) return;
    let changed = false;
    const claims = teams.map(x => x.claimed);
    if (JSON.stringify(claims) !== JSON.stringify(S.claims)) { S.claims = claims; changed = true; }
    if (S.view === "question" && S.cur) {
      const r = res(S.cur), id = qid(S.cur), cell = cellAt(S.cur);
      if (cell.bonus && !r.rolled) {
        const s = (teams[cell.team] && teams[cell.team].sub) || {};
        if (s.stop != null) stopRoll(s.aim);
      } else if (!r.revealed) {
        teams.forEach((x, t) => {
          if (cell.bonus && t !== cell.team) return;
          const s = x.sub || {};
          if (s.pick != null && r.picks[t] !== s.pick) { r.picks[t] = s.pick; r.at[t] = s.at; changed = true; }
          if (s.wager != null && r.wagers[t] !== s.wager) { r.wagers[t] = s.wager; changed = true; }
          const on = x.dbl === id;
          if (on !== r.doubled.includes(t)) { r.doubled = on ? r.doubled.concat(t) : r.doubled.filter(y => y !== t); changed = true; }
        });
      }
    }
    if (changed) { persist(); publish(); render(); }
  }
  setInterval(poll, 1000);

  // ---------- the Special roll ----------
  let roll = null; // { key, type, lit, timer, stopping, rot }
  function mult() { return S.ri + 1; }
  function rollType(cell) { return cell.roll || "board"; }
  function ensureRolling() {
    if (!S || S.view !== "question" || !S.cur) return;
    const cell = cellAt(S.cur), r = res(S.cur);
    if (!cell.bonus || r.rolled) { if (roll && roll.timer) clearTimeout(roll.timer); roll = null; return; }
    if (roll && roll.key === S.cur) { paintRoll(); return; }
    roll = { key: S.cur, type: rollType(cell), lit: Math.floor(Math.random() * 16), timer: null, stopping: false, rot: 0 };
    if (roll.type !== "board") return;
    const step = () => {
      if (!roll || roll.stopping) return;
      roll.lit = nextLit(roll.lit); paintRoll();
      roll.timer = setTimeout(step, 110);
    };
    step();
  }
  function nextLit(cur) { let n; do { n = Math.floor(Math.random() * 16); } while (n === cur); return n; }
  function paintRoll() {
    if (!roll || roll.type !== "board") return;
    document.querySelectorAll(".rcell").forEach(el => el.classList.toggle("lit", Number(el.dataset.i) === roll.lit));
  }
  function stopRoll(aim) {
    if (!roll || roll.stopping || roll.key !== S.cur) return;
    roll.stopping = true;
    if (roll.type === "wheel") return spinWheel();
    if (roll.type === "plinko") return dropChip(Number.isInteger(aim) ? aim : 2);
    clearTimeout(roll.timer);
    const delays = [140, 190, 250, 330, 430, 560];
    let i = 0;
    const slow = () => {
      if (!roll) return;
      if (i < delays.length) { roll.lit = nextLit(roll.lit); paintRoll(); setTimeout(slow, delays[i++]); return; }
      document.querySelectorAll(".rcell.lit").forEach(el => el.classList.add("landed"));
      land(ROLL_BASE[roll.lit] * mult());
    };
    slow();
  }
  // Shows the amount for a moment, then moves on to the question.
  function land(value) {
    const key = roll.key, cell = cellAt(key), r = res(key);
    cell.value = value;
    const center = document.getElementById("rollcenter");
    if (center) center.innerHTML = `<p class="roll-title">Playing for</p><p class="roll-amount">${fmt(value)}</p>`;
    setTimeout(() => { r.rolled = true; r.shown = true; roll = null; persist(); publish(); render(); }, 1600);
  }
  function spinWheel() {
    const w = Math.floor(Math.random() * WHEEL_BASE.length);
    const jitter = Math.random() * 9 - 4.5;
    const turns = 5 + Math.floor(Math.random() * 2);
    const target = turns * 360 - w * 15 + jitter;
    const el = document.getElementById("wheelspin");
    if (el) {
      el.style.transition = "transform 5.6s cubic-bezier(0.12, 0.62, 0.08, 1)";
      requestAnimationFrame(() => { el.style.transform = `rotate(${target}deg)`; });
    }
    setTimeout(() => {
      const wedge = document.querySelector(`.wedge[data-i="${w}"]`);
      if (wedge) wedge.classList.add("landed");
      land(WHEEL_BASE[w] * mult());
    }, el ? 5800 : 0);
  }
  function plinkoX(p) { return 30 + 30 * p; }
  function dropChip(aim) {
    let p = PLINKO_AIMS[Math.max(0, Math.min(4, aim))] * 2;
    const pts = [[plinkoX(p), 18]];
    for (let j = 0; j < PLINKO_ROWS; j++) {
      p += Math.random() < 0.5 ? -1 : 1;
      if (p < 0) p = 1;
      if (p > 16) p = 15;
      pts.push([plinkoX(p), 90 + j * 55]);
    }
    const slot = p / 2;
    pts.push([plinkoX(p), 548]);
    const chip = document.getElementById("chip");
    const seg = 330;
    const t0 = performance.now();
    const frame = now => {
      const t = Math.max(0, (now - t0) / seg);
      const i = Math.min(pts.length - 2, Math.floor(t));
      const f = Math.min(1, t - i);
      const [x0, y0] = pts[i], [x1, y1] = pts[i + 1];
      const x = x0 + (x1 - x0) * f;
      const y = y0 + (y1 - y0) * f - Math.sin(Math.PI * f) * 16; // a small hop off each peg
      if (chip) { chip.setAttribute("cx", x); chip.setAttribute("cy", y); }
      if (t < pts.length - 1) requestAnimationFrame(frame);
      else {
        const el = document.querySelector(`.pslot[data-i="${slot}"]`);
        if (el) el.classList.add("landed");
        land(PLINKO_BASE[slot] * mult());
      }
    };
    if (chip) requestAnimationFrame(frame);
    else land(PLINKO_BASE[slot] * mult());
  }

  // ---------- clock ----------
  setInterval(() => {
    if (!S || S.view !== "question" || !S.cur) return;
    const r = S.res[S.cur];
    if (!r || !r.startedAt || r.revealed) return;
    paintClock();
    if (remaining() <= 0 && !buzzed[qid(S.cur)]) { buzzed[qid(S.cur)] = true; buzz(); render(); }
  }, 100);
  function paintClock() {
    const el = document.getElementById("timer");
    if (!el || !S || !S.cur) return;
    const r = S.res[S.cur];
    const left = r && r.startedAt ? Math.max(0, remaining()) / 1000 : S.cfg.secs;
    el.style.setProperty("--p", String(left / S.cfg.secs));
    const out = !!(r && r.startedAt && left <= 0);
    el.classList.toggle("out", out);
    el.querySelector("span").textContent = out ? "Time" : String(Math.ceil(left));
  }
  let audio = null;
  function buzz() {
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), g = audio.createGain();
      o.type = "square"; o.frequency.value = 220;
      g.gain.setValueAtTime(0.12, audio.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + 0.6);
      o.connect(g); g.connect(audio.destination); o.start(); o.stop(audio.currentTime + 0.6);
    } catch (e) { /* no sound */ }
  }

  // ---------- actions ----------
  async function startGame() {
    draft.names = draft.names.map((n, i) => n.trim() || `Team ${i + 1}`);
    const cfg = Object.assign({}, draft);
    const g = drawGame(cfg);
    const next = { cfg, teams: cfg.names.map(n => ({ name: n, adj: 0, doubleUsed: null })), rounds: g.rounds, final: g.final, usedQ: g.used, ri: 0, view: "board", cur: null, picker: 0, res: {}, attempts: {}, specials: {}, specDone: {}, specCount: {}, room: null, claims: [] };
    if (cfg.mode === "devices") {
      starting = true; setupError = ""; render();
      try {
        const r = await fetch("/api/rooms", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ teams: cfg.names }) });
        const d = await r.json().catch(() => ({}));
        if (!r.ok || !d.code) throw new Error(d.message || "No answer");
        noteTime(d.now);
        next.room = { code: d.code, hostKey: d.hostKey };
        next.view = "lobby";
      } catch (e) {
        starting = false;
        setupError = "Couldn't reach the game server, so team devices can't join. That part only works when the site is deployed on Netlify. You can switch \"Teams answer on\" to \"DM to me\" and play right now.";
        render();
        return;
      }
      starting = false;
    }
    S = next; lastPub = "";
    persist(); publish(); render();
  }

  function openCell(key) { S.cur = key; S.view = "question"; res(key); }
  function backToBoard() {
    if (!S.cur) return;
    const key = S.cur, r = res(key), cell = cellAt(key);
    if (r.revealed) {
      if (!r.done) {
        r.done = true;
        if (cell.bonus) { if (!specDone(S.ri).includes(cell.team)) specDone(S.ri).push(cell.team); }
        else if (!cell.final) S.picker = (S.picker + 1) % S.teams.length;
      }
      if (key === "final") { S.view = "end"; S.cur = null; return; }
    } else if (cell.bonus) {
      // Leaving a Special unplayed: the team keeps its Special for later in the round.
      delete S.res[key]; delete S.specials[key];
    } else {
      S.teams.forEach(tm => { if (tm.doubleUsed === key) tm.doubleUsed = null; });
      delete S.res[key];
      S.attempts[key] = ((S.attempts && S.attempts[key]) || 0) + 1;
    }
    S.cur = null; S.view = "board";
  }
  function skipSpecial() {
    const key = S.cur, cell = cellAt(key);
    if (!cell || !cell.bonus) return;
    if (!specDone(S.ri).includes(cell.team)) specDone(S.ri).push(cell.team);
    delete S.res[key]; delete S.specials[key];
    S.cur = null; S.view = "board";
  }
  function newSpecialQuestion() {
    const key = S.cur, cell = cellAt(key), r = res(key);
    if (!cell || !cell.bonus || r.revealed) return;
    cell.q = drawSpecialQ();
    S.attempts[key] = ((S.attempts && S.attempts[key]) || 0) + 1;
    Object.assign(r, { picks: {}, at: {}, startedAt: null, deadline: null });
  }
  function afterResults() {
    if (S.ri < S.rounds.length - 1) { S.ri++; S.view = "board"; return; }
    if (S.final) { openCell("final"); return; }
    S.view = "end";
  }
  async function startClock() {
    if (!S || S.view !== "question") return;
    const r = res(S.cur);
    if (!r.shown || !r.rolled || r.revealed || r.startedAt) return;
    if (live()) {
      r.startedAt = -1; // so the answers go out in this update; the server sets the real time
      const st = pubState();
      r.startedAt = null;
      const d = await queue(async () => {
        try { return await api("PUT", `/${S.room.code}/state`, { state: st, startClock: S.cfg.secs }); }
        catch (e) { return null; }
      });
      if (!d) { setNetError("Couldn't start the clock on team devices. Try again."); render(); return; }
      setNetError("");
      r.startedAt = d.state.startedAt; r.deadline = d.state.deadline;
      lastPub = JSON.stringify(pubState());
    } else {
      r.startedAt = serverNow(); r.deadline = r.startedAt + S.cfg.secs * 1000;
    }
    persist(); render();
  }
  async function mainAction() {
    if (!S || S.view !== "question") return;
    const r = res(S.cur), cell = cellAt(S.cur);
    if (!r.rolled) { stopRoll(); return; }
    if (!r.shown) { r.shown = true; persist(); publish(); render(); return; }
    if (!r.startedAt) { await startClock(); return; }
    if (!r.revealed) {
      if (live()) { try { const d = await api("GET", `/${S.room.code}/subs?qid=${encodeURIComponent(qid(S.cur))}`); applySubs(d.teams); } catch (e) { /* reveal with what we have */ } }
      r.revealed = true;
      if (cell.bonus) showCelebration(r.picks[cell.team] === cell.q.answer, cell);
    } else {
      r.revealed = false;
    }
    persist(); publish(); render();
  }
  function showCelebration(win, cell) {
    clearTimeout(celebrateTimer);
    celebrate = { win, amount: cell.value, team: S.teams[cell.team].name };
    celebrateTimer = setTimeout(() => { celebrate = null; render(); }, 5200);
  }
  function toggleDouble(t) {
    const r = res(S.cur), team = S.teams[t], cell = cellAt(S.cur);
    if (r.revealed || r.startedAt || isWager(cell) || cell.bonus) return;
    if (team.doubleUsed === S.cur) { team.doubleUsed = null; r.doubled = r.doubled.filter(x => x !== t); return; }
    if (team.doubleUsed) return;
    team.doubleUsed = S.cur; r.doubled.push(t);
  }

  // ---------- views ----------
  function field(id, label, opts, val, show) {
    return `<div class="field"><label for="${id}">${label}</label><select id="${id}">${opts.map(o => `<option value="${o}" ${String(o) === String(val) ? "selected" : ""}>${show(o)}</option>`).join("")}</select></div>`;
  }
  function onOff(id, label, val) {
    return `<div class="field"><label for="${id}">${label}</label><select id="${id}"><option value="1" ${val ? "selected" : ""}>On</option><option value="0" ${val ? "" : "selected"}>Off</option></select></div>`;
  }
  function viewSetup() {
    const values = r => Array.from({ length: draft.rows }, (_, k) => (k + 1) * 100 * r).join(", ");
    return `
    <section class="setup">
      <h1>Design <span>Jeopardy</span></h1>
      <form class="panel" id="setup-form">
        <div class="setup-cols">
          <div>
            <h3>Teams</h3>
            <div class="team-rows">
              ${draft.names.map((n, i) => `
                <div class="team-row">
                  <input id="team-name-${i}" data-i="${i}" value="${esc(n)}" aria-label="Team ${i + 1} name">
                  ${draft.names.length > 2 ? `<button type="button" class="btn" data-remove="${i}" aria-label="Remove team ${i + 1}">Remove</button>` : ""}
                </div>`).join("")}
            </div>
            ${draft.names.length < 8 ? `<div class="row" style="margin-top:8px"><button type="button" class="btn" id="add-team">Add a team</button></div>` : ""}
          </div>
          <div>
            <h3>Game</h3>
            <div class="fields">
              <div class="field"><label for="mode">Teams answer on</label><select id="mode">
                <option value="devices" ${draft.mode === "devices" ? "selected" : ""}>Their own phones or laptops</option>
                <option value="dm" ${draft.mode === "dm" ? "selected" : ""}>DM to me, I click it in</option></select></div>
              ${field("rounds", "Rounds", [1, 2, 3], draft.rounds, v => ["Jeopardy only", "Jeopardy and Double Jeopardy", "Add Triple Jeopardy"][v - 1])}
              ${field("cats", "Categories per board", [4, 5, 6], draft.cats, v => v)}
              ${field("rows", "Questions per category", [3, 4, 5], draft.rows, v => v)}
              ${field("secs", "Answer clock", [15, 20, 25, 30, 45, 60], draft.secs, v => v + " seconds")}
              ${onOff("specials", "Specials, one per team each round", draft.specials !== false)}
              ${onOff("final", "Final Jeopardy", draft.final)}
            </div>
            <p class="note">Round one ${values(1)}.${draft.rounds > 1 ? ` Double Jeopardy ${values(2)}.` : ""}${draft.rounds > 2 ? ` Triple Jeopardy ${values(3)}.` : ""}</p>
          </div>
        </div>
        ${setupError ? `<p class="msg bad">${esc(setupError)}</p>` : ""}
        <div class="row">
          <button type="submit" class="btn primary" ${starting ? "disabled" : ""}>${starting ? "Opening a room" : "Draw boards and start"}</button>
        </div>
      </form>
    </section>`;
  }

  const ROUND_NAMES = ["Jeopardy", "Double Jeopardy", "Triple Jeopardy"];
  function viewTop() {
    let meta = "";
    if (S.view === "lobby") meta = "Join the game";
    else if (S.view === "board" || S.view === "results") meta = ROUND_NAMES[S.ri] || `Round ${S.ri + 1}`;
    else if (S.view === "question") {
      const cell = cellAt(S.cur), r = res(S.cur);
      if (cell.bonus) meta = `Special · ${esc(S.teams[cell.team].name)}${r.rolled ? ` · <b>${fmt(cell.value)}</b>` : ""}`;
      else meta = cell.final ? "Final Jeopardy" : cell.dd ? "Daily Double" : `${esc(cell.q.cat)} · <b>${cell.value}</b>`;
    } else if (S.view === "end") meta = "Final scores";
    let right = "";
    if (S.view === "question") {
      const r = res(S.cur), cell = cellAt(S.cur);
      if (r.shown && r.rolled && !r.revealed) {
        if (r.startedAt && !cell.bonus) right += `<span class="chip">${lockedCount()} of ${S.teams.length} locked in</span>`;
        right += `<button class="timer" id="timer" title="Start the clock (space)" aria-label="Answer clock"><span>${S.cfg.secs}</span></button>`;
      }
    }
    const join = live() && S.view !== "lobby" ? `<span class="joinhint">${esc(location.host)}/play · <b>${esc(S.room.code)}</b></span>` : "";
    return `
    <header class="topbar">
      <div class="brand">Design <span>Jeopardy</span></div>
      <div class="qmeta">${meta}</div>
      <span class="spacer"></span>
      ${join}${right}
    </header>
    <p class="msg bad neterr" id="neterr" ${netError ? "" : "hidden"}>${esc(netError)}</p>`;
  }

  function viewLobby() {
    const joined = S.claims || [];
    return `
    <section class="lobby">
      <div class="join panel">
        <p class="join-label">On your phone or laptop, go to</p>
        <p class="join-url">${esc(location.host)}/play</p>
        <p class="join-label">and enter the room code</p>
        <p class="join-code">${esc(S.room.code)}</p>
        <div id="qr" class="qr" aria-hidden="true"></div>
      </div>
      <div class="panel lobby-teams">
        <h3>${joined.filter(Boolean).length} of ${S.teams.length} teams joined</h3>
        ${S.teams.map((tm, t) => `<div class="lobby-team ${joined[t] ? "in" : ""}"><span>${esc(tm.name)}</span><span class="state">${joined[t] ? "Joined" : "Waiting"}</span></div>`).join("")}
        <p class="note">One device per team. The captain picks the team name, and that device answers for the whole team.</p>
      </div>
    </section>`;
  }

  function viewBoard() {
    const round = S.rounds[S.ri];
    const done = roundDone(S.ri);
    const left = specialsLeft(S.ri), nextT = nextSpecialTeam(S.ri);
    let line = done ? "Board cleared." : `Next pick: <b>${esc(S.teams[S.picker].name)}</b>`;
    if (left) line += ` <span class="sep">·</span> Specials left this round: ${left}`;
    const banner = specialDue(S.ri) && nextT != null ? `<div class="special-due"><span>Special for <b>${esc(S.teams[nextT].name)}</b></span><button class="btn primary" data-act="special">Roll it</button></div>` : "";
    return `
    <section class="board-stage">
      <div class="board" style="--cols:${round.cols.length}">
        ${round.cols.map(col => `<div class="cat-head">${esc(col.cat)}</div>`).join("")}
        ${Array.from({ length: S.cfg.rows }, (_, k) => round.cols.map((col, c) => {
          const key = `${S.ri}-${c}-${k}`;
          const isDone = S.res[key] && S.res[key].done;
          return `<button class="cell ${isDone ? "done" : ""}" data-cell="${key}" aria-label="${esc(col.cat)} for ${col.cells[k].value}${isDone ? ", played" : ""}">${isDone ? "" : col.cells[k].value}</button>`;
        }).join("")).join("")}
      </div>
      <div class="board-foot"><p class="picker">${line}</p>${banner}</div>
    </section>`;
  }

  function rollInfo(cell, verb) {
    const name = esc(S.teams[cell.team].name);
    const hint = live() ? `${name}, ${verb} on your device` : "Tell me when!";
    return `<div class="roll-center" id="rollcenter">
          <p class="roll-title">Special</p>
          <p class="roll-team">${name}</p>
          <p class="roll-hint">${hint}</p>
        </div>`;
  }
  function viewRoll(cell) {
    const type = rollType(cell);
    if (type === "wheel") return viewWheel(cell);
    if (type === "plinko") return viewPlinko(cell);
    return `<section class="stage roll-stage">
      <div class="rollboard">
        ${ROLL_BASE.map((v, i) => `<div class="rcell" data-i="${i}" style="grid-row:${RING[i][0]};grid-column:${RING[i][1]}">${fmt(v * mult())}</div>`).join("")}
        ${rollInfo(cell, "press Stop")}
      </div>
    </section>`;
  }
  function viewWheel(cell) {
    const R = 230, n = WHEEL_BASE.length, step = 360 / n;
    const pt = deg => { const a = (deg - 90) * Math.PI / 180; return [(R * Math.cos(a)).toFixed(2), (R * Math.sin(a)).toFixed(2)]; };
    const wedges = WHEEL_BASE.map((v, i) => {
      const [x0, y0] = pt(i * step - step / 2), [x1, y1] = pt(i * step + step / 2);
      const top = i === WHEEL_TOP;
      const fill = top ? "#f4f6ff" : WHEEL_COLORS[i % WHEEL_COLORS.length];
      const ink = top || fill === "#f2b632" ? "#1b1f33" : "#ffffff";
      return `<g class="wedge" data-i="${i}"><path d="M0 0 L${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} Z" fill="${fill}" stroke="#0a1238" stroke-width="2"/>
        <text transform="rotate(${i * step}) translate(0 -${R - 62}) rotate(-90)" text-anchor="middle" dominant-baseline="central" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="${top ? 26 : 23}" fill="${ink}">${fmt(v * mult())}</text></g>`;
    }).join("");
    const bulbs = Array.from({ length: 24 }, (_, i) => { const a = (i * 15 - 90) * Math.PI / 180; return `<circle class="bulb" cx="${(R + 14) * Math.cos(a)}" cy="${(R + 14) * Math.sin(a)}" r="4.5" style="animation-delay:${(i % 2) * 0.35}s"/>`; }).join("");
    return `<section class="stage roll-stage">
      <div class="wheel-wrap">
        <svg class="wheel" viewBox="-262 -275 524 540" role="img" aria-label="Prize wheel">
          <circle r="${R + 22}" fill="#0a1238" stroke="#f2b632" stroke-width="6"/>
          ${bulbs}
          <g id="wheelspin" class="wheelspin">${wedges}<circle r="46" fill="#0a1238" stroke="#f2b632" stroke-width="5"/><text text-anchor="middle" dominant-baseline="central" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="24" fill="#f2b632">SPIN</text></g>
          <path d="M-20 -270 L20 -270 L0 -224 Z" fill="#f2b632" stroke="#0a1238" stroke-width="3"/>
        </svg>
        ${rollInfo(cell, "tap Spin")}
      </div>
    </section>`;
  }
  function viewPlinko(cell) {
    let pegs = "";
    for (let j = 0; j < PLINKO_ROWS; j++) {
      const y = 90 + j * 55 + 22;
      for (let m = 0; m <= 18; m++) if ((m + j) % 2 === 0 && m > 0 && m < 18) pegs += `<circle cx="${m * 30}" cy="${y}" r="5" fill="#c9d1f5"/>`;
    }
    const slots = PLINKO_BASE.map((v, i) => `<g class="pslot ${i === 4 ? "top" : ""}" data-i="${i}"><rect x="${i * 60 + 2}" y="520" width="56" height="78" rx="6"/><text x="${i * 60 + 30}" y="566" text-anchor="middle" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="${v * mult() >= 1000 ? 19 : 22}">${fmt(v * mult())}</text></g>`).join("");
    const aims = PLINKO_AIMS.map((s, a) => `<g class="paim" data-aim="${a}"><path d="M${30 + 60 * s - 14} 2 L${30 + 60 * s + 14} 2 L${30 + 60 * s} 20 Z"/></g>`).join("");
    const walls = Array.from({ length: 8 }, (_, i) => `<rect x="${(i + 1) * 60 - 2}" y="500" width="4" height="98" fill="#2e3f99"/>`).join("");
    return `<section class="stage roll-stage">
      <div class="wheel-wrap">
        <svg class="plinko" viewBox="-6 -4 552 606" role="img" aria-label="Plinko board">
          <rect x="-6" y="-4" width="552" height="606" rx="14" fill="#0e1a52" stroke="#2e3f99" stroke-width="3"/>
          ${pegs}${walls}${slots}${aims}
          <circle id="chip" cx="${plinkoX(8)}" cy="-40" r="16" fill="#f2b632" stroke="#8a5d00" stroke-width="4"/>
        </svg>
        ${rollInfo(cell, "pick a spot to drop")}
      </div>
    </section>`;
  }

  function viewMedia(m) { return m ? `<div class="media">${m.svg || ""}</div>` : ""; }
  function viewClip(m) {
    if (!m || m.type !== "video") return "";
    return `<div class="clip"><a href="${esc(m.url)}" target="_blank" rel="noopener">▶ ${esc(m.label || "Play the clip")}</a><small>${esc(m.note || "Opens in a new tab.")}</small></div>`;
  }
  function viewExplain(q) {
    return `<div class="explain"><span><b>${LETTERS[q.answer]}. ${esc(q.options[q.answer])}.</b> ${esc(q.why)}</span>${q.src ? `<cite>${esc(q.src)}</cite>` : ""}</div>`;
  }

  function viewQuestion() {
    const cell = cellAt(S.cur), q = cell.q, r = res(S.cur);
    if (cell.bonus && !r.rolled) return viewRoll(cell);
    if (!r.shown) {
      const how = live() ? "Captains, enter your wager on your team's device." : "Captains, DM the host your wager.";
      return `<section class="stage"><div class="splash">
        <h2>${cell.final ? "Final<br>Jeopardy" : "Daily<br>Double"}</h2>
        <span class="tag">${esc(q.cat)}${q.media ? (q.media.type === "video" ? " · Video" : " · Visual") : ""}</span>
        <p>${how} ${cell.final ? "Bet any part of your score." : `Bet up to your score, or up to ${fmt(boardTop(S.ri))} if you have less.`}</p>
      </div></section>`;
    }
    const whoPicked = i => S.teams.map((tm, t) => r.picks[t] === i ? `<i>${esc(tm.name)}</i>` : "").join("");
    const options = r.startedAt ? `<div class="options">
        ${q.options.map((o, i) => {
          const cls = ["opt"];
          if (r.revealed && i === q.answer) cls.push("right");
          if (r.revealed && i !== q.answer && Object.values(r.picks).includes(i)) cls.push("wrong-picked");
          return `<div class="${cls.join(" ")}"><span class="letter">${LETTERS[i]}</span><span class="text">${esc(o)}${r.revealed ? `<span class="who">${whoPicked(i)}</span>` : ""}</span></div>`;
        }).join("")}
      </div>` : `<div class="options-wait">Answers appear when the clock starts.</div>`;
    const showCat = isWager(cell) || cell.bonus;
    const heading = `${showCat ? `<p class="category">${esc(q.cat)}</p>` : ""}<h1 class="prompt">${esc(q.q)}</h1>`;
    if (q.media) {
      return `
    <section class="stage media-stage ${r.revealed ? "revealed" : ""}">
      ${viewMedia(q.media)}
      <div class="side">
        <div class="qtext">${heading}${viewClip(q.media)}</div>
        ${options}
        ${r.revealed ? viewExplain(q) : ""}
      </div>
    </section>`;
    }
    return `
    <section class="stage ${r.revealed ? "revealed" : ""}">
      <div class="qtext">${heading}</div>
      ${options}
      ${r.revealed ? viewExplain(q) : `<div></div>`}
    </section>`;
  }

  // Team cards. Until the reveal they only say whether a team has locked in, never what it picked.
  function teamStatus(t) {
    const r = res(S.cur), cell = cellAt(S.cur);
    const joined = (S.claims || [])[t];
    if (cell.bonus && t !== cell.team) return ["off", "Sitting out"];
    if (cell.bonus && !r.rolled) return ["wait", "Rolling"];
    if (!r.shown) return r.wagers[t] != null ? ["ok", "Wager in"] : [joined ? "wait" : "off", joined ? "No wager yet" : "Not joined"];
    if (!r.startedAt) return [joined ? "wait" : "off", joined ? "Ready" : "Not joined"];
    if (r.picks[t] != null) return ["ok", "Locked in"];
    return clockRunning() ? ["wait", "Thinking"] : ["off", "No answer"];
  }
  function viewTeams() {
    const inQ = S.view === "question";
    return `<section class="teams" aria-label="Teams">
      ${S.teams.map((tm, t) => {
        const sc = score(t);
        let body = "";
        let mine = false;
        if (inQ) {
          const cell = cellAt(S.cur), r = res(S.cur), wager = isWager(cell), pick = r.picks[t];
          mine = !!cell.bonus && t === cell.team;
          const out = cell.bonus && t !== cell.team;
          if (!r.revealed) {
            if (live() || out || (cell.bonus && !r.rolled)) {
              const st = teamStatus(t);
              body += `<div class="status ${st[0]}">${st[1]}</div>`;
            } else if (wager && !r.shown) {
              const max = maxWager(t, S.cur);
              body += `<label class="wager" for="wager-${t}">Wager <input id="wager-${t}" data-wager="${t}" type="number" inputmode="numeric" min="0" max="${max}" step="50" value="${r.wagers[t] != null ? r.wagers[t] : ""}" placeholder="max ${fmt(max)}"></label>`;
            } else {
              if (pick == null) body += `<div class="picks">${LETTERS.map((L, i) => `<button data-pick="${t}:${i}" aria-label="${esc(tm.name)} answers ${L}">${L}</button>`).join("")}</div>`;
              else body += `<div class="status ok">Locked in <button class="linkbtn" data-unpick="${t}">change</button></div>`;
              if (!wager && !cell.bonus && r.shown && !r.startedAt) {
                const used = tm.doubleUsed && tm.doubleUsed !== S.cur, on = tm.doubleUsed === S.cur;
                body += `<div class="extras"><button data-double="${t}" class="${on ? "active" : used ? "spent" : ""}">Double</button></div>`;
              }
            }
          } else if (out) {
            body += `<div class="status off">Sat out</div>`;
          } else {
            const d = points(t, S.cur);
            const notes = [];
            if (wager) notes.push(pick == null ? "no answer" : `bet ${fmt(Number(r.wagers[t]) || 0)}`);
            else if (r.doubled.includes(t)) notes.push("doubled");
            const cls = pick == null ? "none" : pick === cell.q.answer ? "right" : "wrong";
            body += `<div class="reveal-row"><span class="pickchip ${cls}">${pick == null ? "?" : LETTERS[pick]}</span><span class="delta ${d > 0 ? "up" : d < 0 ? "down" : "zero"}">${signed(d)}</span></div>`;
            if (notes.length) body += `<div class="notes">${notes.join(" · ")}</div>`;
          }
        }
        const picking = S.view === "board" && t === S.picker;
        return `<article class="team ${picking || mine ? "picking" : ""}">
          <div class="team-head"><span class="team-name" title="${esc(tm.name)}">${esc(tm.name)}</span><span class="team-score ${sc < 0 ? "neg" : ""}">${fmt(sc)}</span></div>
          ${body}
        </article>`;
      }).join("")}
    </section>`;
  }

  function viewResults() {
    const rows = S.teams.map((tm, t) => ({ name: tm.name, gain: roundPoints(t, S.ri), total: score(t) })).sort((a, b) => b.total - a.total);
    const top = Math.max(1, ...rows.map(o => o.total));
    const best = Math.max(...rows.map(o => o.gain));
    return `<section class="stage">
      <div class="panel results">
        <h2>Standings after ${ROUND_NAMES[S.ri] || "round " + (S.ri + 1)}</h2>
        <div class="standings">${rows.map((o, k) => `
          <div class="standing four">
            <span class="rank">${k + 1}</span>
            <div class="bar-wrap"><span class="bar-name">${esc(o.name)}${o.gain === best && best > 0 ? ` <span class="tagsmall">Best round</span>` : ""}</span><span class="bar" style="width:${Math.max(0, o.total) / top * 100}%"></span></div>
            <span class="gain ${o.gain > 0 ? "up" : o.gain < 0 ? "down" : ""}">${signed(o.gain)} this round</span>
            <span class="pts">${fmt(o.total)}</span>
          </div>`).join("")}</div>
      </div>
    </section>`;
  }

  function viewHost() {
    if (S.view === "lobby") {
      return `<footer class="hostbar"><button class="btn primary" data-act="tostart">Start the game</button><span class="spacer"></span><button class="btn" data-act="key">Answer key</button><button class="btn" data-act="menu">Menu</button></footer>`;
    }
    if (S.view === "board") {
      const done = roundDone(S.ri), left = specialsLeft(S.ri);
      return `<footer class="hostbar">
        <button class="btn ${done && !left ? "primary" : ""}" data-act="endround">End ${ROUND_NAMES[S.ri] || "round"} and show standings</button>
        ${left ? `<button class="btn ${done ? "primary" : ""}" data-act="special">Roll a Special</button>` : ""}
        <span class="spacer"></span>
        <button class="btn" data-act="key">Answer key</button>
        <button class="btn" data-act="scores">Scoreboard<kbd>S</kbd></button>
        <button class="btn" data-act="menu">Menu</button>
      </footer>`;
    }
    if (S.view === "results") {
      const last = S.ri === S.rounds.length - 1;
      return `<footer class="hostbar"><button class="btn primary" data-act="afterresults">${last ? (S.final ? "Go to Final Jeopardy" : "Show final scores") : `Start ${ROUND_NAMES[S.ri + 1] || "the next round"}`}</button><span class="spacer"></span><button class="btn" data-act="menu">Menu</button></footer>`;
    }
    const r = res(S.cur), cell = cellAt(S.cur);
    if (cell.bonus && !r.rolled) {
      const done = specDone(S.ri);
      return `<footer class="hostbar">
        <button class="btn" data-act="board">Back without playing<kbd>B</kbd></button>
        <button class="btn primary" data-act="main">${{ wheel: "Spin the wheel", plinko: "Drop in the middle" }[rollType(cell)] || "Stop"}<kbd>Space</kbd></button>
        <label class="inline" for="special-team">Give it to
          <select id="special-team">${S.teams.map((tm, t) => `<option value="${t}" ${t === cell.team ? "selected" : ""}>${esc(tm.name)}${done.includes(t) ? " (had one)" : ""}</option>`).join("")}</select>
        </label>
        <button class="btn" data-act="skipspecial">Skip this team</button>
        <span class="spacer"></span>
        <button class="btn" data-act="menu">Menu</button>
      </footer>`;
    }
    let main = "Reveal answer", key = "R";
    if (!r.shown) main = "Show the question";
    else if (!r.startedAt) { main = "Start clock"; key = "Space"; }
    else if (r.revealed) main = "Hide answer";
    const back = r.revealed ? (S.cur === "final" ? "Final scores" : "Back to board") : (cell.bonus ? "Back without playing" : "Back without scoring");
    return `<footer class="hostbar">
      <button class="btn" data-act="board">${back}<kbd>B</kbd></button>
      <button class="btn primary" data-act="main">${main}<kbd>${key}</kbd></button>
      ${cell.bonus && !r.revealed ? `<button class="btn" data-act="newq">New question</button>` : ""}
      <span class="spacer"></span>
      <button class="btn" data-act="scores">Scoreboard<kbd>S</kbd></button>
      <button class="btn" data-act="menu">Menu</button>
    </footer>`;
  }

  function viewStandings(withAdjust) {
    const order = S.teams.map((tm, t) => ({ t, name: tm.name, s: score(t) })).sort((a, b) => b.s - a.s);
    const top = Math.max(1, ...order.map(o => o.s));
    return `<div class="standings">${order.map((o, k) => `
      <div class="standing">
        <span class="rank">${k + 1}</span>
        <div class="bar-wrap"><span class="bar-name">${esc(o.name)}</span><span class="bar" style="width:${Math.max(0, o.s) / top * 100}%"></span></div>
        <span class="pts">${fmt(o.s)}</span>
        ${withAdjust ? `<span class="adj"><button data-adj="${o.t}:-100" aria-label="Take 100 from ${esc(o.name)}">−100</button><button data-adj="${o.t}:100" aria-label="Give 100 to ${esc(o.name)}">+100</button></span>` : "<span></span>"}
      </div>`).join("")}</div>`;
  }

  function viewEnd() {
    const order = S.teams.map((tm, t) => ({ name: tm.name, s: score(t) })).sort((a, b) => b.s - a.s);
    const winners = order.filter(o => o.s === order[0].s);
    return `<section class="stage">
      <div class="panel winner">
        <p class="category">${winners.length > 1 ? "Tie" : "Winner"}</p>
        <h2>${esc(winners.map(o => o.name).join(" & "))}</h2>
        <div style="width:100%">${viewStandings(false)}</div>
      </div>
    </section>
    <footer class="hostbar"><span class="spacer"></span><button class="btn" data-act="key">Answer key</button><button class="btn" data-act="menu">Menu</button></footer>`;
  }

  // ---------- the Special characters ----------
  // Three original critters. They bring the money in when a team is right and laugh when it's wrong.
  function critter(x, y, fill, dark, mood, delay) {
    const eyes = mood === "win"
      ? `<circle cx="-17" cy="-10" r="13" fill="#fff"/><circle cx="17" cy="-10" r="13" fill="#fff"/><circle cx="-15" cy="-14" r="6" fill="#141414"/><circle cx="19" cy="-14" r="6" fill="#141414"/>`
      : `<path d="M-30 -10 q12 -14 24 0 M6 -10 q12 -14 24 0" stroke="#141414" stroke-width="5" fill="none" stroke-linecap="round"/>`;
    const mouth = mood === "win"
      ? `<path d="M-20 12 q20 24 40 0" stroke="#141414" stroke-width="5" fill="none" stroke-linecap="round"/>`
      : `<ellipse cx="0" cy="18" rx="17" ry="15" fill="#3a0d10"/><ellipse cx="0" cy="27" rx="9" ry="5" fill="#e0607a"/>`;
    const arms = mood === "win"
      ? `<path d="M-48 0 L-70 -34 M48 0 L70 -34" stroke="${fill}" stroke-width="10" stroke-linecap="round"/>`
      : `<path d="M-48 4 L-30 30 M48 0 L84 -6" stroke="${fill}" stroke-width="10" stroke-linecap="round"/>`;
    return `<g transform="translate(${x} ${y})"><g class="crit ${mood}" style="animation-delay:${delay}s">
      <path d="M0 -46 L-10 -74" stroke="${dark}" stroke-width="5"/><circle cx="-10" cy="-77" r="8" fill="#f2b632"/>
      ${arms}
      <ellipse cx="-20" cy="46" rx="16" ry="8" fill="${dark}"/><ellipse cx="20" cy="46" rx="16" ry="8" fill="${dark}"/>
      <ellipse cx="0" cy="0" rx="52" ry="48" fill="${fill}"/>
      <ellipse cx="-14" cy="-26" rx="16" ry="9" fill="#fff" opacity="0.25"/>
      ${eyes}${mouth}
    </g></g>`;
  }
  function viewCelebration() {
    if (!celebrate) return "";
    const win = celebrate.win;
    const crew = [critter(200, 200, "#2fbf9f", "#1b7a65", win ? "win" : "lose", 0), critter(450, 210, "#a77bf0", "#6a45b0", win ? "win" : "lose", 0.12), critter(700, 200, "#f08a4b", "#b0582a", win ? "win" : "lose", 0.24)].join("");
    const extras = win
      ? `<g class="bag"><path d="M405 120 q45 -40 90 0 l18 110 q-63 30 -126 0 z" fill="#d9a62c"/><path d="M420 118 q30 -22 60 0" stroke="#8a5d00" stroke-width="8" fill="none"/><text x="450" y="200" text-anchor="middle" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="40" fill="#241800">${fmt(celebrate.amount)}</text></g>
         ${Array.from({ length: 14 }, (_, i) => `<circle class="coin" cx="${60 + i * 60}" cy="-20" r="13" fill="#f2b632" stroke="#b07a00" stroke-width="3" style="animation-delay:${(i % 5) * 0.22}s;animation-duration:${1.4 + (i % 3) * 0.3}s"/>`).join("")}`
      : [[150, 90, 0], [430, 80, 0.2], [690, 90, 0.4], [300, 60, 0.6], [570, 55, 0.3]].map(([x, y, d]) => `<text class="ha" x="${x}" y="${y}" style="animation-delay:${d}s" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="46" fill="#f2b632">HA</text>`).join("");
    return `<div class="celebrate ${win ? "win" : "lose"}" data-dismiss>
      <svg class="crew" viewBox="0 0 900 300" role="img" aria-label="${win ? "Characters bring the money" : "Characters laugh"}">${win ? crew + extras : extras + crew}</svg>
      <p class="cel-title">${win ? `${esc(celebrate.team)} wins ${fmt(celebrate.amount)}` : `Not this time, ${esc(celebrate.team)}`}</p>
    </div>`;
  }

  function keyHTML() {
    const rows = [];
    const row = (label, q) => `<tr><td class="v">${label}</td><td class="l">${LETTERS[q.answer]}</td><td><b>${esc(q.options[q.answer])}</b><div class="qq">${esc(q.q)}</div></td></tr>`;
    S.rounds.forEach((round, ri) => {
      rows.push(`<h2>${ROUND_NAMES[ri] || "Round " + (ri + 1)}</h2>`);
      round.cols.forEach(col => {
        rows.push(`<h3>${esc(col.cat)}</h3><table>`);
        col.cells.forEach(cell => rows.push(row(cell.value + (cell.dd ? " DD" : ""), cell.q)));
        rows.push(`</table>`);
      });
    });
    if (S.final) rows.push(`<h2>Final Jeopardy</h2><table>${row("Final", S.final.q)}</table>`);
    const sp = Object.keys(S.specials || {});
    rows.push(`<h2>Specials</h2>`);
    rows.push(sp.length ? `<table>${sp.map(k => row(esc(S.teams[S.specials[k].team].name), S.specials[k].q)).join("")}</table>` : `<p>Specials are drawn when they're rolled. Open the key again after rolling one to see its answer.</p>`);
    return rows.join("");
  }
  function openKey() {
    const css = `body{font:14px/1.4 system-ui,sans-serif;margin:24px;color:#111;background:#fff}h1{margin:0 0 4px}h2{margin:24px 0 4px;border-bottom:2px solid #111}h3{margin:14px 0 4px}table{border-collapse:collapse;width:100%}td{border-top:1px solid #ddd;padding:5px 8px;vertical-align:top}td.v{width:110px;white-space:nowrap;color:#555}td.l{width:24px;font-weight:800;font-size:16px}.qq{color:#555;font-size:12px}`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Design Jeopardy answer key</title><style>${css}</style></head><body><h1>Design Jeopardy answer key</h1><p>Letters match this game's boards.</p>${keyHTML()}</body></html>`;
    let w = null;
    try { w = window.open("", "design-jeopardy-key"); } catch (e) { w = null; }
    if (w && w.document) { w.document.open(); w.document.write(html); w.document.close(); return; }
    overlay = "key"; render();
  }

  function viewOverlay() {
    if (overlay === "scores") {
      return `<div class="overlay" data-close><div class="panel" role="dialog" aria-label="Scoreboard">
        <div class="row between"><h2>Scoreboard</h2><button class="btn" data-act="close">Close<kbd>Esc</kbd></button></div>
        ${viewStandings(true)}
        <p class="note">Use plus and minus to fix a score by hand.</p>
      </div></div>`;
    }
    if (overlay === "menu") {
      return `<div class="overlay" data-close><div class="panel" role="dialog" aria-label="Menu">
        <div class="row between"><h2>Menu</h2><button class="btn" data-act="close">Close<kbd>Esc</kbd></button></div>
        <div class="row">
          <button class="btn" data-act="key">Open answer key</button>
          ${live() ? `<button class="btn" data-act="devices">Team devices</button>` : ""}
          ${S.view !== "end" ? `<button class="btn" data-act="endgame">Show final scores now</button>` : ""}
          <button class="btn" data-act="newgame">${confirmNew ? "Click again to end this game" : "New game"}</button>
        </div>
        ${live() ? `<p class="note">Room code ${esc(S.room.code)}. Teams join at ${esc(location.host)}/play.</p>` : ""}
        <p class="note">Scores save in this browser, so a refresh won't lose the game.</p>
      </div></div>`;
    }
    if (overlay === "devices") {
      return `<div class="overlay" data-close><div class="panel" role="dialog" aria-label="Team devices">
        <div class="row between"><h2>Team devices</h2><button class="btn" data-act="close">Close<kbd>Esc</kbd></button></div>
        <p class="note">If a team's phone dies or someone joined as the wrong team, free that team. Another device can then join as it at ${esc(location.host)}/play with code ${esc(S.room.code)}.</p>
        ${S.teams.map((tm, t) => { const j = (S.claims || [])[t]; return `<div class="lobby-team ${j ? "in" : ""}"><span>${esc(tm.name)}</span><span class="state">${j ? "Joined" : "Waiting"}</span>${j ? `<button class="btn" data-free="${t}">Free this team</button>` : "<span></span>"}</div>`; }).join("")}
      </div></div>`;
    }
    if (overlay === "key") {
      return `<div class="overlay"><div class="panel keypanel" role="dialog" aria-label="Answer key">
        <div class="row between"><h2>Answer key</h2><button class="btn" data-act="close">Close<kbd>Esc</kbd></button></div>
        <p class="note">Your browser blocked a separate window, so the key is showing here. Stop sharing your screen before you open it.</p>
        <div class="keybody">${keyHTML()}</div>
      </div></div>`;
    }
    return "";
  }

  function drawQR() {
    const el = document.getElementById("qr");
    if (!el || typeof window.qrcode !== "function") return;
    try { const qr = window.qrcode(0, "M"); qr.addData(joinURL(true)); qr.make(); el.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); } catch (e) { /* the code still works without a QR */ }
  }

  function render() {
    if (!S) { app.innerHTML = viewSetup(); return; }
    if (roll && roll.stopping && S.view === "question" && S.cur === roll.key) return;
    let body = viewTop();
    if (S.view === "lobby") body += viewLobby() + viewHost();
    else if (S.view === "board") body += viewBoard() + viewTeams() + viewHost();
    else if (S.view === "question") body += viewQuestion() + viewTeams() + viewHost();
    else if (S.view === "results") body += viewResults() + viewHost();
    else body += viewEnd();
    app.innerHTML = body + viewOverlay() + viewCelebration();
    paintClock();
    drawQR();
    ensureRolling();
  }

  // ---------- events ----------
  function act(fn) { fn(); persist(); publish(); render(); }

  app.addEventListener("submit", e => { e.preventDefault(); if (e.target.id === "setup-form" && !starting) startGame(); });

  app.addEventListener("input", e => {
    const el = e.target;
    if (el.dataset.i != null) draft.names[Number(el.dataset.i)] = el.value;
  });

  app.addEventListener("change", e => {
    const el = e.target;
    if (["rounds", "cats", "rows", "secs"].includes(el.id)) { draft[el.id] = Number(el.value); render(); }
    if (el.id === "mode") { draft.mode = el.value; setupError = ""; render(); }
    if (el.id === "final" || el.id === "specials") { draft[el.id] = el.value === "1"; render(); }
    if (el.id === "special-team") { act(() => { const cell = cellAt(S.cur); if (cell && cell.bonus) cell.team = Number(el.value); }); }
    if (el.dataset.wager != null) {
      const t = Number(el.dataset.wager), r = res(S.cur);
      if (el.value === "") delete r.wagers[t];
      else r.wagers[t] = Math.min(maxWager(t, S.cur), Math.max(0, Math.round(Number(el.value) || 0)));
      persist(); render();
    }
  });

  app.addEventListener("click", e => {
    if (celebrate && e.target.closest("[data-dismiss]")) { celebrate = null; clearTimeout(celebrateTimer); render(); return; }
    const aimEl = e.target.closest(".paim");
    if (aimEl && roll && roll.type === "plinko") { stopRoll(Number(aimEl.dataset.aim)); return; }
    if (e.target.closest(".wheel") && roll && roll.type === "wheel") { stopRoll(); return; }
    const b = e.target.closest("button, [data-close]");
    if (!b) return;
    if (b.hasAttribute("data-close") && b === e.target) { overlay = null; confirmNew = false; render(); return; }
    if (b.tagName !== "BUTTON") return;
    const d = b.dataset;

    if (b.id === "add-team") { draft.names.push(`Team ${draft.names.length + 1}`); render(); return; }
    if (d.remove != null) { draft.names.splice(Number(d.remove), 1); render(); return; }
    if (b.id === "timer") { startClock(); return; }

    if (d.cell) { if (!(S.res[d.cell] && S.res[d.cell].done)) act(() => openCell(d.cell)); return; }
    if (d.pick) { const [t, i] = d.pick.split(":").map(Number); act(() => { const r = res(S.cur); if (!r.revealed) r.picks[t] = i; }); return; }
    if (d.unpick != null) { act(() => { const r = res(S.cur); if (!r.revealed) delete r.picks[Number(d.unpick)]; }); return; }
    if (d.double != null) { act(() => toggleDouble(Number(d.double))); return; }
    if (d.adj) { const [t, n] = d.adj.split(":").map(Number); act(() => { S.teams[t].adj += n; }); return; }
    if (d.free != null) { api("DELETE", `/${S.room.code}/claim/${Number(d.free)}`).then(poll).catch(() => setNetError("Couldn't free that team. Try again.")); return; }

    switch (d.act) {
      case "main": mainAction(); break;
      case "board": act(backToBoard); break;
      case "special": { const t = nextSpecialTeam(S.ri); if (t != null) act(() => startSpecial(t)); break; }
      case "skipspecial": act(skipSpecial); break;
      case "newq": act(newSpecialQuestion); break;
      case "tostart": act(() => { S.view = "board"; }); break;
      case "endround": act(() => { S.view = "results"; }); break;
      case "afterresults": act(afterResults); break;
      case "scores": overlay = "scores"; render(); break;
      case "menu": overlay = "menu"; confirmNew = false; render(); break;
      case "devices": overlay = "devices"; render(); poll(); break;
      case "close": overlay = null; confirmNew = false; render(); break;
      case "key": overlay = null; openKey(); render(); break;
      case "endgame": overlay = null; act(() => { S.view = "end"; S.cur = null; }); break;
      case "newgame":
        if (!confirmNew) { confirmNew = true; render(); break; }
        confirmNew = false; overlay = null;
        draft = Object.assign({}, draft, S.cfg, { names: S.teams.map(t => t.name) });
        S = null; lastPub = ""; persist(); render(); break;
    }
  });

  document.addEventListener("keydown", e => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (["input", "textarea", "select"].includes(tag)) return;
    if (e.key === "Escape" && celebrate) { celebrate = null; clearTimeout(celebrateTimer); render(); return; }
    if (e.key === "Escape" && overlay) { overlay = null; confirmNew = false; render(); return; }
    if (!S || overlay) return;
    if (e.key === "s" || e.key === "S") { overlay = "scores"; render(); return; }
    if (S.view !== "question") return;
    const r = res(S.cur);
    if (e.key === " ") { e.preventDefault(); if (!r.rolled) stopRoll(); else if (r.shown && !r.startedAt) startClock(); }
    else if (e.key === "r" || e.key === "R" || e.key === "Enter") mainAction();
    else if (e.key === "b" || e.key === "B") act(backToBoard);
  });

  render();
  if (live()) { publish(); poll(); }
})();
