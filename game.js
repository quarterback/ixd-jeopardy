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
  const ROLL_BASE = [100, 250, 500, null, 300, 750, 200, 400, 1000, null, 350, 500, 200, 600, null, 800]; // null squares are No Special
  // Where each of those squares sits on a 5 by 5 grid, going clockwise from the top left.
  const RING = [[1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [2, 5], [3, 5], [4, 5], [5, 5], [5, 4], [5, 3], [5, 2], [5, 1], [4, 1], [3, 1], [2, 1]];
  // The wheel: 24 wedges, one top wedge (index 15). Every wedge pays something.
  const WHEEL_BASE = [null, 500, 250, 700, 400, 850, null, 600, 200, 800, 450, 500, null, 650, 250, 1000, 400, 550, null, 750, 350, 600, 250, 900]; // null wedges are LOSE A TURN
  const WHEEL_TOP = 15;
  const WHEEL_COLORS = ["#b8e04a", "#f4a64a", "#f3a6c8", "#e2382e", "#4cbf8c", "#8cc6f2", "#f6ec4a", "#a990d8"];
  // Plinko: 9 slots mirrored from the middle. The middle pays most; the slots beside it pay least.
  const PLINKO_BASE = [200, 300, 500, null, 1000, null, 500, 300, 200]; // null slots are No Special
  const PLINKO_AIMS = [0, 2, 4, 6, 8]; // which slot each of the five drop spots sits above
  const PLINKO_ROWS = 8;
  const NO_SPECIAL_ODDS = 1 / 6; // Plinko only; the board and wheel get their odds from how many empty spaces they have
  const app = document.getElementById("app");
  // watch.html sets this. A watcher sees what the host's screen shows and can't change anything.
  const WATCH = window.DJ_WATCH === true;

  // ---------- storage ----------
  function load() { try { const r = localStorage.getItem(STORE); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function persist() { if (WATCH) return; try { if (S) localStorage.setItem(STORE, JSON.stringify(S)); else localStorage.removeItem(STORE); } catch (e) { /* storage off */ } recordGame(); }

  // ---------- earlier games ----------
  // This browser remembers what each game played, so the next game can skip those questions and categories.
  const HISTORY = "design-jeopardy-history";
  const HISTORY_KEEP = 12;
  function loadHistory() {
    try { const h = JSON.parse(localStorage.getItem(HISTORY) || "null"); if (h && Array.isArray(h.games)) return h; } catch (e) { /* storage off */ }
    return { games: [] };
  }
  function saveHistory(h) { try { localStorage.setItem(HISTORY, JSON.stringify(h)); } catch (e) { /* storage off */ } }
  // A question counts as played once its clock started. Categories count once their board came up.
  function recordGame() {
    if (WATCH || !S || !S.rounds) return;
    S.gameId = S.gameId || "g" + Date.now();
    const qs = new Set(S.seenQ || []);
    for (const key in S.res) {
      const r = S.res[key], cell = cellAt(key);
      if (cell && cell.q && (r.startedAt || r.revealed)) qs.add(cell.q.q);
    }
    const cats = [];
    S.rounds.forEach((round, ri) => { if (ri <= S.ri) round.cols.forEach(col => { if (!cats.includes(col.cat)) cats.push(col.cat); }); });
    const h = loadHistory();
    const prev = h.games.find(g => g.id === S.gameId);
    const entry = { id: S.gameId, at: (prev && prev.at) || S.startedAt || Date.now(), cats, qs: Array.from(qs) };
    const str = JSON.stringify(entry);
    if (prev && JSON.stringify(prev) === str) return;
    h.games = h.games.filter(g => g.id !== S.gameId).concat(entry).sort((a, b) => a.at - b.at).slice(-HISTORY_KEEP);
    saveHistory(h);
  }
  function pastGames() { const id = S && S.gameId; return loadHistory().games.filter(g => g.id !== id && (g.qs.length || g.cats.length)); }
  function pastQs() { const s = new Set(); pastGames().forEach(g => g.qs.forEach(q => s.add(q))); return s; }
  function lastCats() { const g = pastGames().pop(); return new Set(g ? g.cats : []); }

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
    if (!live() || WATCH) return Promise.resolve(null);
    publishWatch();
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
  // Row k of a board asks for this level, 1 (easy) to 4 (hardest).
  function levelFor(k, rows) { return rows === 1 ? 1 : 1 + Math.round(k * 3 / (rows - 1)); }
  // The question nearest the target level. "avoid" is a list of sets of question texts, most important first:
  // when nothing is left, the least important set stops counting until something is.
  function pickQ(qs, target, avoid) {
    let pool = [];
    for (let n = avoid.length; n >= 0 && !pool.length; n--) pool = qs.filter(q => !avoid.slice(0, n).some(s => s.has(q.q)));
    const best = Math.min(...pool.map(q => Math.abs(q.l - target)));
    return shuffle(pool.filter(q => Math.abs(q.l - target) === best))[0];
  }
  // Questions for some rows of one category. Easier questions go to the cheaper rows.
  function pickColumn(cat, rowsWanted, rows, avoid) {
    const used = avoid[0], picks = [];
    rowsWanted.forEach(k => { const p = pickQ(cat.qs, levelFor(k, rows), avoid); used.add(p.q); picks.push(p); });
    picks.sort((a, b) => a.l - b.l);
    return picks;
  }
  function bankCat(name) { return BANK.find(c => c.cat === name) || null; }
  function drawGame(cfg) {
    const used = new Set(), usedDD = new Set();
    const past = cfg.fresh === false ? new Set() : pastQs();
    const lastC = cfg.fresh === false ? new Set() : lastCats();
    const skip = new Set(cfg.skipCats || []);
    const allowed = BANK.filter(c => !skip.has(c.cat));
    // Categories from the last game go to the back of the line, and so do categories with few new questions left.
    const fresh = c => c.qs.filter(q => !past.has(q.q)).length;
    const order = list => shuffle(list).sort((a, b) => (lastC.has(a.cat) - lastC.has(b.cat)) || ((fresh(a) < cfg.rows) - (fresh(b) < cfg.rows)));
    let catsLeft = order(allowed);
    const rounds = [];
    for (let r = 0; r < cfg.rounds; r++) {
      if (catsLeft.length < cfg.cats) catsLeft = catsLeft.concat(order(allowed.filter(c => !catsLeft.includes(c))));
      const cats = catsLeft.splice(0, cfg.cats);
      const cols = cats.map(cat => {
        const picks = pickColumn(cat, Array.from({ length: cfg.rows }, (_, k) => k), cfg.rows, [used, past]);
        return { cat: cat.cat, cells: picks.map((pick, k) => ({ value: (k + 1) * 100 * (r + 1), dd: false, q: prep(pick, cat.cat) })) };
      });
      const ddCount = Math.min(r === 0 ? 1 : 2, DAILY_DOUBLES.length - usedDD.size);
      const spots = shuffle(cols.flatMap((col, c) => col.cells.map((cell, k) => ({ c, k }))).filter(s => s.k > 0 || cfg.rows === 1));
      for (let i = 0; i < ddCount && i < spots.length; i++) {
        const d = pickQ(DAILY_DOUBLES.map(x => Object.assign({ l: 1 }, x)), 1, [usedDD, past]);
        usedDD.add(d.q);
        const cell = cols[spots[i].c].cells[spots[i].k];
        used.delete(cell.q.q);
        cell.dd = true;
        cell.q = prep(d, d.cat);
      }
      rounds.push({ cols });
    }
    const final = cfg.final && FINALS.length ? { value: 0, dd: false, final: true, q: prep(pickQ(FINALS.map(x => Object.assign({ l: 1 }, x)), 1, [past])) } : null;
    return { rounds, final, used: Array.from(used).concat(Array.from(usedDD)) };
  }
  // A Special question: any category, never a question already on a board or used for another Special.
  function drawSpecialQ() {
    const all = [];
    BANK.forEach(cat => cat.qs.forEach(q => all.push(Object.assign({ cat: cat.cat }, q))));
    const pick = pickQ(all.map(q => Object.assign({}, q, { l: 1 })), 1, [inGame(), gamePast()]);
    S.usedQ = (S.usedQ || []).concat(pick.q);
    return prep(pick, pick.cat);
  }
  // Every question this game has put on a board, swapped out or played.
  function inGame() {
    const s = new Set(S.usedQ || []);
    (S.seenQ || []).forEach(q => s.add(q));
    S.rounds.forEach(round => round.cols.forEach(col => col.cells.forEach(cell => s.add(cell.q.q))));
    if (S.final) s.add(S.final.q.q);
    return s;
  }
  function gamePast() { return S.cfg.fresh === false ? new Set() : pastQs(); }

  // ---------- changing the board during a game ----------
  // Give some or all of a column new questions, from the same category or a different one.
  // Squares already played keep theirs. Daily Doubles keep theirs too; use New question on the square for those.
  function refillColumn(ri, c, catName) {
    const col = S.rounds[ri].cols[c], cat = bankCat(catName);
    if (!cat) return;
    const open = col.cells.map((cell, k) => k).filter(k => { const r = S.res[`${ri}-${c}-${k}`]; return !(r && r.done) && !col.cells[k].dd; });
    if (!open.length) return;
    const released = new Set(open.map(k => col.cells[k].q.q));
    const keep = inGame();
    released.forEach(q => { if (!(S.seenQ || []).includes(q)) keep.delete(q); });
    // Never this game's other questions; then not ones from earlier games; then not the ones being replaced.
    const picks = pickColumn(cat, open, S.cfg.rows, [keep, gamePast(), released]);
    open.forEach((k, i) => { col.cells[k].q = prep(picks[i], cat.cat); });
    S.usedQ = (S.usedQ || []).filter(q => !released.has(q) || (S.seenQ || []).includes(q)).concat(picks.map(p => p.q));
    col.cat = cat.cat;
  }
  // Swap the question on the square that's open, before the clock starts. The amount stays, and so do wagers and Doubles.
  function newQuestion() {
    const key = S.cur, cell = cellAt(key), r = res(key);
    if (!cell || r.revealed) return;
    if (cell.bonus) return newSpecialQuestion();
    if (r.startedAt) return;
    const old = cell.q.q, avoid = [inGame(), gamePast()];
    let pick, cat;
    if (cell.final) {
      pick = pickQ(FINALS.map(x => Object.assign({ l: 1 }, x)), 1, avoid);
      if (avoid[0].has(pick.q)) { const all = []; BANK.forEach(c => c.qs.forEach(q => q.l === 4 && all.push(Object.assign({ cat: c.cat }, q)))); pick = pickQ(all, 4, avoid); }
      cat = pick.cat;
    } else {
      const [ri, c, k] = key.split("-").map(Number), col = S.rounds[ri].cols[c];
      if (cell.dd) pick = pickQ(DAILY_DOUBLES.map(x => Object.assign({ l: 1 }, x)), 1, avoid);
      if (!pick || avoid[0].has(pick.q)) {
        const bc = bankCat(col.cat);
        pick = bc ? Object.assign({ cat: bc.cat }, pickQ(bc.qs, cell.dd ? 4 : levelFor(k, S.cfg.rows), avoid)) : null;
      }
      cat = pick && (pick.cat || col.cat);
    }
    if (!pick || pick.q === old) return;
    S.seenQ = (S.seenQ || []).concat(old);
    S.usedQ = (S.usedQ || []).concat(pick.q);
    cell.q = prep(pick, cat);
  }

  // ---------- state ----------
  let S = WATCH ? null : load();
  if (S && !S.cfg) S = null;
  if (S) recordGame(); // a game saved before this browser kept a history still counts as played
  let draft = { names: ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6"], rounds: 2, cats: 5, rows: 5, secs: 25, mode: "devices", final: true, specials: true, autoBack: 8, fresh: true, skipCats: [] };
  if (S) draft = Object.assign({}, draft, S.cfg, { names: S.teams.map(t => t.name) });
  let overlay = null, confirmNew = false, confirmForget = false, swapCol = 0, setupError = "", starting = false;
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
  // A Special comes due after every 2 regular squares, so every team gets one in a short round.
  const SPECIAL_EVERY = 2;
  function specialDue(ri) {
    if (!specialsLeft(ri)) return false;
    return squaresDone(ri) >= SPECIAL_EVERY * (specDone(ri).length + 1);
  }
  // Every round mixes all three rollers in a shuffled order, never the same one twice in a row.
  function nextRollType(ri) {
    S.rollQueue = S.rollQueue || {};
    S.lastRoll = S.lastRoll || {};
    let q = S.rollQueue[ri] || [];
    if (!q.length) {
      do { q = shuffle(["board", "wheel", "plinko"]); } while (q[0] === S.lastRoll[ri]);
    }
    const t = q.shift();
    S.rollQueue[ri] = q; S.lastRoll[ri] = t;
    return t;
  }
  function startSpecial(team) {
    S.specCount = S.specCount || {};
    const n = S.specCount[S.ri] = (S.specCount[S.ri] || 0) + 1;
    const key = `${S.ri}-s-${n}`;
    S.specials = S.specials || {};
    S.specials[key] = { bonus: true, team, value: 0, roll: nextRollType(S.ri), q: drawSpecialQ() };
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
    if (cell.bonus && r.whammy) return Object.assign(base, common, { phase: "nospecial" });
    if (cell.bonus && !r.rolled) return Object.assign(base, common, { phase: "roll", rollType: cell.roll || "board" });
    if (isWager(cell) && !r.shown) return Object.assign(base, common, { phase: "splash", maxWager: S.teams.map((_, t) => maxWager(t, S.cur)) });
    if (!r.revealed) return Object.assign(base, common, { phase: "question", secs: S.cfg.secs, startedAt: r.startedAt, deadline: r.deadline, options: r.startedAt ? q.options : null });
    return Object.assign(base, common, {
      phase: "reveal", options: q.options, answer: q.answer,
      results: S.teams.map((_, t) => ({ pick: r.picks[t] == null ? null : r.picks[t], delta: points(t, S.cur), doubled: r.doubled.includes(t) }))
    });
  }

  // What watchers at /watch get: the host's screen, with no answers, picks or wagers before the reveal.
  // Squares nobody has opened carry no question at all.
  function watchState() {
    const keep = (key, cell) => {
      if (!cell) return cell;
      const r = S.res[key], c = Object.assign({}, cell);
      if (key === S.cur) {
        c.q = Object.assign({}, cell.q);
        if (!(r && r.revealed)) { c.q.answer = null; c.q.why = ""; c.q.src = ""; }
      } else if (r && r.revealed) c.q = { answer: cell.q.answer };
      else { c.q = null; if (!r) c.dd = false; }
      return c;
    };
    const hide = (obj, v) => { const o = {}; for (const k in obj) o[k] = v; return o; };
    const resOut = {};
    for (const key in S.res) {
      const r = S.res[key];
      resOut[key] = r.revealed ? r : Object.assign({}, r, { picks: hide(r.picks, -1), wagers: hide(r.wagers, 0), at: {} });
    }
    const specials = {};
    for (const key in S.specials || {}) specials[key] = keep(key, S.specials[key]);
    return {
      cfg: S.cfg, teams: S.teams.map(t => ({ name: t.name, adj: t.adj, doubleUsed: null })),
      rounds: S.rounds.map((round, ri) => ({ cols: round.cols.map((col, c) => ({ cat: col.cat, cells: col.cells.map((cell, k) => keep(`${ri}-${c}-${k}`, cell)) })) })),
      final: S.final ? keep("final", S.final) : null, specials, res: resOut,
      ri: S.ri, view: S.view, cur: S.cur, picker: S.picker, attempts: S.attempts, specDone: S.specDone,
      room: { code: S.room.code }, claims: S.claims
    };
  }
  let lastWatch = "";
  function publishWatch() {
    if (!live() || WATCH) return;
    const st = watchState(), str = JSON.stringify(st);
    if (str === lastWatch) return;
    lastWatch = str;
    queue(async () => {
      if (!S || !S.room) return;
      try { await api("PUT", `/${S.room.code}/watch`, { watch: st }); } catch (e) { lastWatch = ""; }
    });
  }

  // ---------- polling team devices ----------
  let polling = false;
  async function poll() {
    if (WATCH || !live() || polling) return;
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
  let roll = null; // { key, type, lit, timer, stopping }
  function mult() { return S.ri + 1; }
  function rollType(cell) { return cell.roll || "board"; }
  function money(v) { return "$" + fmt(v); }
  function ensureRolling() {
    if (!S || S.view !== "question" || !S.cur) { if (roll && roll.timer) clearTimeout(roll.timer); if (!roll || !roll.stopping) roll = null; return; }
    const cell = cellAt(S.cur), r = res(S.cur);
    if (!cell.bonus || r.rolled) { if (roll && roll.timer) clearTimeout(roll.timer); roll = null; return; }
    if (roll && roll.key === S.cur) { paintRoll(); watchRoll(cell); return; }
    if (roll && roll.timer) clearTimeout(roll.timer);
    roll = { key: S.cur, type: rollType(cell), lit: Math.floor(Math.random() * 16), timer: null, stopping: false };
    if (watchRoll(cell) || roll.type !== "board") return;
    const mine = roll;
    const step = () => {
      if (roll !== mine || mine.stopping) return;
      mine.lit = nextLit(mine.lit); paintRoll();
      mine.timer = setTimeout(step, 110);
    };
    step();
  }
  // A watcher plays the host's roll once it arrives. If it arrived long ago, skip straight to the result.
  function watchRoll(cell) {
    if (!WATCH || !cell.anim || roll.stopping) return false;
    roll.stopping = true;
    clearTimeout(roll.timer);
    if (serverNow() - cell.anim.at > 9000) { roll.done = true; return true; }
    playRoll(cell.anim, watchLanded);
    return true;
  }
  function nextLit(cur) { let n; do { n = Math.floor(Math.random() * 16); } while (n === cur); return n; }
  function paintRoll() {
    if (!roll || roll.type !== "board") return;
    document.querySelectorAll(".rcell").forEach(el => el.classList.toggle("lit", Number(el.dataset.i) === roll.lit));
  }
  // The host decides where a roll lands up front and saves it on the Special as cell.anim,
  // so watchers can play the very same animation.
  function stopRoll(aim) {
    if (!roll || roll.stopping || roll.key !== S.cur) return;
    roll.stopping = true;
    clearTimeout(roll.timer);
    let a;
    if (roll.type === "wheel") a = wheelPlan();
    else if (roll.type === "plinko") a = { type: "plinko", ps: plinkoPath(Number.isInteger(aim) ? aim : 2) };
    else { const seq = []; let n = roll.lit; for (let i = 0; i < 6; i++) { n = nextLit(n); seq.push(n); } a = { type: "board", seq }; }
    a.at = serverNow();
    cellAt(S.cur).anim = a;
    publishWatch();
    playRoll(a, land);
  }
  function playRoll(a, done) {
    if (a.type === "wheel") return spinWheel(a, done);
    if (a.type === "plinko") return dropChip(a, done);
    const delays = [140, 190, 250, 330, 430, 560];
    let i = 0;
    const slow = () => {
      if (!roll) return;
      if (i < a.seq.length) { roll.lit = a.seq[i]; paintRoll(); setTimeout(slow, delays[i++]); return; }
      document.querySelectorAll(".rcell.lit").forEach(el => el.classList.add("landed"));
      done(roll.lit, ROLL_BASE[roll.lit]);
    };
    slow();
  }
  // On a watcher's screen: show where it landed, then let the next update from the host take over.
  function watchLanded(index, base) {
    if (!roll) return;
    const mine = roll, cell = cellAt(roll.key), center = document.getElementById("rollcenter");
    if (center && cell) center.innerHTML = base == null
      ? `<p class="roll-title nos">No Special</p><p class="roll-team">${esc(S.teams[cell.team].name)}</p>`
      : `<p class="roll-title">Playing for</p><p class="roll-amount">${money(base * mult())}</p>`;
    setTimeout(() => { if (roll === mine) { mine.done = true; watchRelease(); } }, base == null ? 1300 : 1600);
  }
  // Hold the landed roller on screen until the host's update says the roll is over, so it never plays twice.
  function watchRelease() {
    if (!roll || !roll.done) return;
    const r = S && S.res[roll.key];
    if (!S || S.view !== "question" || S.cur !== roll.key || !r || r.rolled) { roll = null; render(); }
  }
  // base is null for a No Special space. Shows the result for a moment, then moves on.
  function land(index, base) {
    const key = roll.key, cell = cellAt(key), r = res(key);
    cell.landIdx = index;
    const center = document.getElementById("rollcenter");
    if (base == null) {
      cell.value = 0;
      if (center) center.innerHTML = `<p class="roll-title nos">No Special</p><p class="roll-team">${esc(S.teams[cell.team].name)}</p>`;
      setTimeout(() => {
        r.rolled = true; r.whammy = true; roll = null;
        scheduleAutoBack(6);
        showWhammy(cell);
        persist(); publish(); render();
      }, 1300);
      return;
    }
    cell.value = base * mult();
    if (center) center.innerHTML = `<p class="roll-title">Playing for</p><p class="roll-amount">${money(cell.value)}</p>`;
    setTimeout(() => { r.rolled = true; r.shown = true; roll = null; persist(); publish(); render(); }, 1600);
  }
  // Spins with an ease out, ticking the flapper every time a peg passes it.
  function wheelPlan() {
    const n = WHEEL_BASE.length, step = 360 / n;
    const w = Math.floor(Math.random() * n);
    const jitter = Math.random() * (step * 0.6) - step * 0.3;
    return { type: "wheel", w, total: (5 + Math.floor(Math.random() * 2)) * 360 - w * step + jitter };
  }
  function spinWheel(a, done) {
    const n = WHEEL_BASE.length, step = 360 / n, w = a.w, total = a.total;
    const el = document.getElementById("wheelspin"), flap = document.getElementById("flapper");
    const dur = 6200, t0 = performance.now();
    let lastPeg = 0;
    const frame = now => {
      const t = Math.min(1, Math.max(0, (now - t0) / dur));
      const ang = total * (1 - Math.pow(1 - t, 3.2));
      if (el) el.setAttribute("transform", `rotate(${ang.toFixed(2)})`);
      const peg = Math.floor((ang + step / 2) / step);
      if (peg !== lastPeg) { lastPeg = peg; tick(flap); }
      if (t < 1) requestAnimationFrame(frame);
      else {
        const wedge = document.querySelector(`.wedge[data-i="${w}"]`);
        if (wedge) wedge.classList.add("landed");
        done(w, WHEEL_BASE[w]);
      }
    };
    if (el) requestAnimationFrame(frame); else done(w, WHEEL_BASE[w]);
  }
  function tick(flap) {
    if (flap && flap.animate) flap.animate([{ transform: "rotate(-26deg)" }, { transform: "rotate(0deg)" }], { duration: 130, easing: "ease-out" });
    try {
      audio = audio || new (window.AudioContext || window.webkitAudioContext)();
      const o = audio.createOscillator(), gn = audio.createGain();
      o.type = "triangle"; o.frequency.value = 1900;
      gn.gain.setValueAtTime(0.05, audio.currentTime);
      gn.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 0.035);
      o.connect(gn); gn.connect(audio.destination); o.start(); o.stop(audio.currentTime + 0.04);
    } catch (e) { /* no sound */ }
  }
  function plinkoX(p) { return 30 + 30 * p; }
  // Plinko picks the slot first so No Special comes up about 1 in 6 times wherever the chip is dropped,
  // then draws a bounce path that really ends there.
  function plinkoPath(aim) {
    const p0 = PLINKO_AIMS[Math.max(0, Math.min(4, aim))] * 2;
    const walk = () => { let p = p0; const ps = [p]; for (let j = 0; j < PLINKO_ROWS; j++) { p += Math.random() < 0.5 ? -1 : 1; if (p < 0) p = 1; if (p > 16) p = 15; ps.push(p); } return ps; };
    const reach = new Set(); for (let k = 0; k < 600; k++) reach.add(walk()[PLINKO_ROWS] / 2);
    const slots = Array.from(reach);
    const ns = slots.filter(s => PLINKO_BASE[s] == null), ok = slots.filter(s => PLINKO_BASE[s] != null);
    let target;
    if (ns.length && ok.length) target = Math.random() < NO_SPECIAL_ODDS ? ns[Math.floor(Math.random() * ns.length)] : ok[Math.floor(Math.random() * ok.length)];
    else target = slots[Math.floor(Math.random() * slots.length)];
    for (let k = 0; k < 6000; k++) { const ps = walk(); if (ps[PLINKO_ROWS] / 2 === target) return ps; }
    return walk();
  }
  function dropChip(a, done) {
    const ps = a.ps;
    const pts = [[plinkoX(ps[0]), 18]].concat(ps.slice(1).map((p, j) => [plinkoX(p), 90 + j * 55]));
    const slot = ps[PLINKO_ROWS] / 2;
    pts.push([plinkoX(ps[PLINKO_ROWS]), 548]);
    const chip = document.getElementById("chip");
    const seg = 330, t0 = performance.now();
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
        done(slot, PLINKO_BASE[slot]);
      }
    };
    if (chip) requestAnimationFrame(frame); else done(slot, PLINKO_BASE[slot]);
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
    if (BANK.length - (cfg.skipCats || []).length < cfg.cats) { setupError = `Turn on at least ${cfg.cats} categories, or use fewer categories per board.`; render(); return; }
    const g = drawGame(cfg);
    const next = { cfg, gameId: "g" + Date.now(), startedAt: Date.now(), teams: cfg.names.map(n => ({ name: n, adj: 0, doubleUsed: null })), rounds: g.rounds, final: g.final, usedQ: g.used, seenQ: [], ri: 0, view: "board", cur: null, picker: 0, res: {}, attempts: {}, specials: {}, specDone: {}, specCount: {}, room: null, claims: [] };
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
    S = next; lastPub = ""; lastWatch = "";
    persist(); publish(); render();
  }

  function openCell(key) { S.cur = key; S.view = "question"; res(key); }
  function backToBoard() {
    if (!S.cur) return;
    const key = S.cur, r = res(key), cell = cellAt(key);
    if (r.revealed || (cell.bonus && r.whammy)) {
      if (!r.done) {
        r.done = true;
        if (cell.bonus) { if (!specDone(S.ri).includes(cell.team)) specDone(S.ri).push(cell.team); }
        else if (!cell.final) S.picker = (S.picker + 1) % S.teams.length;
      }
      if (key === "final") { S.view = "end"; S.cur = null; return; }
    } else if (cell.bonus) {
      // Leaving a Special unplayed: the team keeps its Special for later in the round.
      delete S.res[key]; delete S.specials[key];
      S.flushing = false;
    } else {
      S.teams.forEach(tm => { if (tm.doubleUsed === key) tm.doubleUsed = null; });
      delete S.res[key];
      S.attempts[key] = ((S.attempts && S.attempts[key]) || 0) + 1;
    }
    S.cur = null; S.view = "board";
    afterBoardReturn();
  }
  // When the host chose to play the remaining Specials before ending a round, keep them coming.
  function afterBoardReturn() {
    if (!S.flushing) return;
    const t = nextSpecialTeam(S.ri);
    if (specialsLeft(S.ri) && t != null) startSpecial(t);
    else { S.flushing = false; S.view = "results"; }
  }
  // After a reveal the game returns to the board on its own, after a countdown the host can stop.
  let autoBack = null; // { key, at }
  function scheduleAutoBack(extraSecs) {
    const secs = Number(S.cfg.autoBack);
    if (!secs || S.cur === "final") { autoBack = null; return; }
    autoBack = { key: S.cur, at: Date.now() + (secs + (extraSecs || 0)) * 1000 };
  }
  function cancelAutoBack() { autoBack = null; }
  setInterval(() => {
    if (!autoBack || !S) return;
    if (S.view !== "question" || S.cur !== autoBack.key || overlay) { if (S.cur !== autoBack.key) autoBack = null; return; }
    const left = Math.ceil((autoBack.at - Date.now()) / 1000);
    const el = document.getElementById("autoback");
    if (el) el.textContent = `Back to the board in ${Math.max(0, left)}`;
    if (left <= 0) { autoBack = null; celebrate = null; whammy = null; act(backToBoard); }
  }, 250);
  function skipSpecial() {
    const key = S.cur, cell = cellAt(key);
    if (!cell || !cell.bonus) return;
    if (!specDone(S.ri).includes(cell.team)) specDone(S.ri).push(cell.team);
    delete S.res[key]; delete S.specials[key];
    S.cur = null; S.view = "board";
    afterBoardReturn();
    return;
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
    persist(); publishWatch(); render();
  }
  async function mainAction() {
    if (!S || S.view !== "question") return;
    const r = res(S.cur), cell = cellAt(S.cur);
    if (r.whammy) return;
    if (!r.rolled) { stopRoll(); return; }
    if (!r.shown) { r.shown = true; persist(); publish(); render(); return; }
    if (!r.startedAt) { await startClock(); return; }
    if (!r.revealed) {
      if (live()) { try { const d = await api("GET", `/${S.room.code}/subs?qid=${encodeURIComponent(qid(S.cur))}`); applySubs(d.teams); } catch (e) { /* reveal with what we have */ } }
      r.revealed = true;
      if (cell.bonus) showCelebration(r.picks[cell.team] === cell.q.answer, cell);
      scheduleAutoBack(cell.bonus ? 6 : 0);
    } else {
      r.revealed = false;
      cancelAutoBack();
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
              ${field("autoBack", "After the reveal, back to the board in", [0, 5, 8, 12, 20], draft.autoBack == null ? 8 : draft.autoBack, v => v ? v + " seconds" : "Only when I click")}
              ${onOff("final", "Final Jeopardy", draft.final)}
            </div>
            <p class="note">Round one ${values(1)}.${draft.rounds > 1 ? ` Double Jeopardy ${values(2)}.` : ""}${draft.rounds > 2 ? ` Triple Jeopardy ${values(3)}.` : ""}</p>
          </div>
        </div>
        ${viewCatPick()}
        ${setupError ? `<p class="msg bad">${esc(setupError)}</p>` : ""}
        <div class="row">
          <button type="submit" class="btn primary" ${starting ? "disabled" : ""}>${starting ? "Opening a room" : "Draw boards and start"}</button>
        </div>
      </form>
    </section>`;
  }

  // Which categories can be drawn, and what earlier games on this browser already played.
  function viewCatPick() {
    const games = pastGames(), past = pastQs(), lastC = lastCats();
    const skip = new Set(draft.skipCats || []);
    const fresh = draft.fresh !== false;
    const chips = BANK.map(c => {
      const off = skip.has(c.cat), left = c.qs.filter(q => !past.has(q.q)).length;
      const count = games.length && fresh ? `${left} of ${c.qs.length} new` : `${c.qs.length} questions`;
      return `<button type="button" class="catchip ${off ? "off" : ""}" data-skipcat="${esc(c.cat)}" aria-pressed="${off ? "false" : "true"}">
        <span class="catchip-name">${esc(c.cat)}</span><small>${count}</small>${lastC.has(c.cat) ? `<span class="tagsmall">Last game</span>` : ""}</button>`;
    }).join("");
    const hist = games.length
      ? `This browser remembers ${games.length === 1 ? "1 earlier game" : games.length + " earlier games"}, with ${past.size} questions played. ${fresh ? "New boards skip those questions while others are left, and put last game's categories at the back of the line." : ""} <button type="button" class="linkbtn" data-act="forget">${confirmForget ? "Click again to forget them" : "Forget earlier games"}</button>`
      : "After you play, this browser remembers which questions came up, so the next game can skip them.";
    return `<div class="catpick">
      <div class="row between"><h3>Categories</h3>
        <div class="field inline-field"><label for="fresh">Questions from earlier games</label><select id="fresh">
          <option value="1" ${fresh ? "selected" : ""}>Skip them</option><option value="0" ${fresh ? "" : "selected"}>Allow them</option></select></div>
      </div>
      <p class="note">Tap a category to leave it out of this game. You can also change a category on the board before anyone plays it.</p>
      <div class="catchips">${chips}</div>
      <p class="note">${hist}</p>
    </div>`;
  }

  const ROUND_NAMES = ["Jeopardy", "Double Jeopardy", "Triple Jeopardy"];
  function viewTop() {
    let meta = "";
    if (S.view === "lobby") meta = "Join the game";
    else if (S.view === "board" || S.view === "results") meta = ROUND_NAMES[S.ri] || `Round ${S.ri + 1}`;
    else if (S.view === "question") {
      const cell = cellAt(S.cur), r = res(S.cur);
      if (cell.bonus) meta = `Special · ${esc(S.teams[cell.team].name)}${r.rolled && !r.whammy ? ` · <b>${money(cell.value)}</b>` : ""}`;
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
    const join = WATCH ? `<span class="chip watchchip">Watching</span>`
      : live() && S.view !== "lobby" ? `<span class="joinhint">${esc(location.host)}/play · <b>${esc(S.room.code)}</b></span>` : "";
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
        <p class="note">Anyone can follow along without a team at <b>${esc(location.host)}/watch</b> with the same code.</p>
      </div>
    </section>`;
  }

  function viewBoard() {
    const round = S.rounds[S.ri];
    const done = roundDone(S.ri);
    const left = specialsLeft(S.ri), nextT = nextSpecialTeam(S.ri);
    let line = done ? "Board cleared." : `Next pick: <b>${esc(S.teams[S.picker].name)}</b>`;
    if (left) line += ` <span class="sep">·</span> Specials left this round: ${left}`;
    const banner = specialDue(S.ri) && nextT != null ? `<div class="special-due"><span>Special for <b>${esc(S.teams[nextT].name)}</b></span><button class="btn special" data-act="special">Roll it<kbd>P</kbd></button></div>` : "";
    return `
    <section class="board-stage">
      <div class="board" style="--cols:${round.cols.length}">
        ${round.cols.map((col, c) => WATCH ? `<div class="cat-head">${esc(col.cat)}</div>` : `<button class="cat-head" data-swapcat="${c}" title="Change this category">${esc(col.cat)}</button>`).join("")}
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
    if (res(S.cur).whammy) return `<div class="roll-center" id="rollcenter"><p class="roll-title nos">No Special</p><p class="roll-team">${name}</p><p class="roll-hint">Better luck next round.</p></div>`;
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
    const landed = res(S.cur).whammy ? cell.landIdx : null;
    return `<section class="stage roll-stage">
      <div class="rollboard">
        ${ROLL_BASE.map((v, i) => `<div class="rcell ${v == null ? "nos" : ""} ${landed === i ? "lit landed" : ""}" data-i="${i}" style="grid-row:${RING[i][0]};grid-column:${RING[i][1]}">${v == null ? "<span>No<br>Special</span>" : money(v * mult())}</div>`).join("")}
        ${rollInfo(cell, "press Stop")}
      </div>
    </section>`;
  }
  // A flat game show wheel: bright wedges, a $ and the points stacked digit by digit from the rim inward.
  function viewWheel(cell) {
    const R = 236, n = WHEEL_BASE.length, step = 360 / n;
    const pt = (deg, r) => { const a = (deg - 90) * Math.PI / 180; return [(r * Math.cos(a)).toFixed(2), (r * Math.sin(a)).toFixed(2)]; };
    const slab = `font-family="'Alfa Slab One', Rockwell, Georgia, serif"`;
    const stackText = (chars, startY, size, gapK, ink, outline) => chars.map((d, k) => `<text x="0" y="${startY + k * size * gapK}" text-anchor="middle" dominant-baseline="central" ${slab} font-size="${size}" fill="${ink}" stroke="${outline}" stroke-width="${outline === "none" ? 0 : 2.2}" paint-order="stroke">${d}</text>`).join("");
    const wedges = WHEEL_BASE.map((v, i) => {
      const [x0, y0] = pt(i * step - step / 2, R), [x1, y1] = pt(i * step + step / 2, R);
      const lose = v == null, top = i === WHEEL_TOP;
      const fill = lose ? "#ffffff" : top ? "url(#silver)" : WHEEL_COLORS[i % WHEEL_COLORS.length];
      let label;
      if (lose) {
        label = `<text x="0" y="${-(R - 20)}" text-anchor="middle" dominant-baseline="central" ${slab} font-size="13" fill="#141414">LOSE</text>
          <text x="0" y="${-(R - 38)}" text-anchor="middle" dominant-baseline="central" ${slab} font-size="13" fill="#141414">A</text>
          ${stackText(["T", "U", "R", "N"], -(R - 64), 25, 0.92, "#141414", "none")}`;
      } else {
        const digits = String(v * mult()).split("");
        const size = digits.length > 3 ? 27 : 31;
        label = `<text x="0" y="${-(R - 20)}" text-anchor="middle" dominant-baseline="central" ${slab} font-size="18" fill="#141414">$</text>` + stackText(digits, -(R - 46), size, 0.88, "#141414", "#ffffff");
      }
      return `<g class="wedge ${lose ? "lose" : ""}" data-i="${i}">
        <path d="M0 0 L${x0} ${y0} A${R} ${R} 0 0 1 ${x1} ${y1} Z" fill="${fill}" stroke="#3a3a3a" stroke-width="2"/>
        <g transform="rotate(${i * step})">${label}</g></g>`;
    }).join("");
    const rivets = Array.from({ length: 48 }, (_, i) => { const a = (i * 7.5 - 90) * Math.PI / 180; return `<circle cx="${((R + 13) * Math.cos(a)).toFixed(1)}" cy="${((R + 13) * Math.sin(a)).toFixed(1)}" r="2.6" fill="#8a5d00"/>`; }).join("");
    const pegs = Array.from({ length: n }, (_, i) => { const [x, y] = pt(i * step + step / 2, R - 6); return `<circle cx="${x}" cy="${y}" r="3.6" fill="#8a5d00"/>`; }).join("");
    const r = res(S.cur);
    const start = r.whammy && cell.landIdx != null ? -cell.landIdx * step : 0;
    return `<section class="stage roll-stage">
      <div class="wheel-wrap">
        <svg class="wheel" viewBox="-275 -300 550 580" role="img" aria-label="Prize wheel">
          <defs>
            <linearGradient id="silver" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="0.5" stop-color="#c9ced8"/><stop offset="1" stop-color="#eef0f4"/></linearGradient>
          </defs>
          <circle r="${R + 26}" fill="#c99a2e"/>
          <circle r="${R + 26}" fill="none" stroke="#8a5d00" stroke-width="3"/>
          ${rivets}
          <g id="wheelspin" transform="rotate(${start})">
            ${wedges}${pegs}
            <circle r="${R}" fill="none" stroke="#3a3a3a" stroke-width="3"/>
            <circle r="74" fill="#c99a2e" stroke="#8a5d00" stroke-width="4"/>
          </g>
          <g id="flapper" class="flapper">
            <path d="M-16 -298 L16 -298 L4 -236 L-4 -236 Z" fill="#e2382e" stroke="#ffffff" stroke-width="3"/>
            <circle cx="0" cy="-288" r="6" fill="#ffffff"/>
          </g>
        </svg>
        ${rollInfo(cell, "tap Spin")}
      </div>
    </section>`;
  }
  function viewPlinko(cell) {
    let pegs = "";
    for (let j = 0; j < PLINKO_ROWS; j++) {
      const y = 90 + j * 55 + 22;
      for (let m = 1; m < 18; m++) if ((m + j) % 2 === 0) pegs += `<circle cx="${m * 30}" cy="${y}" r="5" fill="#c9d1f5"/>`;
    }
    const landed = res(S.cur).whammy ? cell.landIdx : null;
    const slots = PLINKO_BASE.map((v, i) => {
      const label = v == null
        ? `<text x="${i * 60 + 30}" y="552" text-anchor="middle" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="15">NO</text><text x="${i * 60 + 30}" y="572" text-anchor="middle" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="12">SPECIAL</text>`
        : `<text x="${i * 60 + 30}" y="566" text-anchor="middle" font-family="Big Shoulders Display, Arial Black, sans-serif" font-weight="900" font-size="${v * mult() >= 1000 ? 17 : 20}">${money(v * mult())}</text>`;
      return `<g class="pslot ${i === 4 ? "top" : ""} ${v == null ? "nos" : ""} ${landed === i ? "landed" : ""}" data-i="${i}"><rect x="${i * 60 + 2}" y="520" width="56" height="78" rx="6"/>${label}</g>`;
    }).join("");
    const aims = PLINKO_AIMS.map((s, a) => `<g class="paim" data-aim="${a}"><path d="M${30 + 60 * s - 14} 2 L${30 + 60 * s + 14} 2 L${30 + 60 * s} 20 Z"/></g>`).join("");
    const walls = Array.from({ length: 8 }, (_, i) => `<rect x="${(i + 1) * 60 - 2}" y="500" width="4" height="98" fill="#2e3f99"/>`).join("");
    const chipAt = landed != null ? `cx="${plinkoX(landed * 2)}" cy="548"` : `cx="${plinkoX(8)}" cy="-40"`;
    return `<section class="stage roll-stage">
      <div class="wheel-wrap">
        <svg class="plinko" viewBox="-6 -4 552 606" role="img" aria-label="Plinko board">
          <rect x="-6" y="-4" width="552" height="606" rx="14" fill="#0e1a52" stroke="#2e3f99" stroke-width="3"/>
          ${pegs}${walls}${slots}${aims}
          <circle id="chip" ${chipAt} r="16" fill="#f2b632" stroke="#8a5d00" stroke-width="4"/>
        </svg>
        ${rollInfo(cell, "pick a spot to drop")}
      </div>
    </section>`;
  }

  // Pictures, clips and sounds. Each one carries a key so a re-render keeps a playing clip playing.
  function hash(str) { let h = 0; for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0; return (h >>> 0).toString(36); }
  function mediaKey(q) { return `${S.cur}-${hash(q.q)}`; }
  function ytURL(m, embed) {
    const t = [];
    if (embed) { t.push("autoplay=1", "rel=0", "modestbranding=1"); if (m.start) t.push("start=" + m.start); if (m.end) t.push("end=" + m.end); }
    else if (m.start) t.push("t=" + m.start);
    return (embed ? `https://www.youtube-nocookie.com/embed/${encodeURIComponent(m.youtube)}` : `https://www.youtube.com/watch?v=${encodeURIComponent(m.youtube)}`) + (t.length ? (embed ? "?" : "&") + t.join("&") : "");
  }
  const SPEAKER = `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A speaker playing a sound">
    <rect width="480" height="320" fill="#101a4a"/>
    <path d="M120 130 h44 l56 -46 v152 l-56 -46 h-44 z" fill="#eef1ff"/>
    <g fill="none" stroke="#f2b632" stroke-width="12" stroke-linecap="round" class="waves">
      <path d="M252 122 q22 38 0 76"/><path d="M284 96 q40 64 0 128"/><path d="M316 70 q58 90 0 180"/>
    </g></svg>`;
  const FILM = `<svg viewBox="0 0 480 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A video clip">
    <rect width="480" height="270" fill="#101a4a"/><rect x="40" y="40" width="400" height="190" rx="14" fill="#16246a" stroke="#2e3f99" stroke-width="3"/>
    <path d="M214 104 l62 31 l-62 31 z" fill="#f2b632"/></svg>`;
  function viewMedia(m, q) {
    if (!m) return "";
    const key = mediaKey(q);
    if (m.type === "video" && m.youtube) {
      return `<div class="media player" data-live="${key}"><div class="poster">${m.svg || FILM}</div>
        <button class="playbig" data-play="youtube" data-src="${esc(ytURL(m, true))}">▶ ${esc(m.label || "Play the clip")}</button></div>`;
    }
    if (m.type === "video" && m.src) {
      return `<div class="media player" data-live="${key}"><video controls preload="metadata" playsinline src="${esc(m.src)}"${m.poster ? ` poster="${esc(m.poster)}"` : ""}></video></div>`;
    }
    if (m.type === "audio") {
      return `<div class="media player audio" data-live="${key}"><div class="poster">${m.svg || SPEAKER}</div>
        <button class="playbig" data-play="sound" ${m.sound ? `data-sound="${esc(m.sound)}"` : `data-src="${esc(m.src || "")}"`}>▶ ${esc(m.label || "Play the sound")}</button></div>`;
    }
    return `<div class="media" data-live="${key}">${m.svg || ""}</div>`;
  }
  // Under the question: how to get sound to the class, and a way out if a clip won't play here.
  function viewClip(m) {
    if (!m || (m.type !== "video" && m.type !== "audio")) return "";
    const out = m.type === "video" && m.youtube ? `<a href="${esc(ytURL(m, false))}" target="_blank" rel="noopener">Open on YouTube</a>` : m.url ? `<a href="${esc(m.url)}" target="_blank" rel="noopener">Open the clip</a>` : "";
    const note = m.note || (WATCH ? "Plays on this device only." : "On Zoom, turn on Share sound when you share your screen.");
    return `<div class="clip">${out}<small>${esc(note)}</small></div>`;
  }
  // Start a clip or a sound in place. No re-render: the element stays put while the game updates around it.
  function playMedia(b) {
    const box = b.closest(".media");
    if (!box) return;
    if (b.dataset.play === "youtube") {
      box.innerHTML = `<iframe src="${esc(b.dataset.src)}" title="Video clip" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
      box.classList.add("on");
      return;
    }
    let secs = 0;
    if (b.dataset.sound && typeof DJ_SOUNDS !== "undefined") secs = DJ_SOUNDS.play(b.dataset.sound);
    else if (b.dataset.src) { try { const a = new Audio(b.dataset.src); a.play(); a.addEventListener("loadedmetadata", () => { clearTimeout(box._t); box._t = setTimeout(() => box.classList.remove("playing"), a.duration * 1000); }); secs = 30; } catch (e) { secs = 0; } }
    if (!secs) return;
    box.classList.add("playing");
    b.textContent = "▶ Play it again";
    clearTimeout(box._t);
    box._t = setTimeout(() => box.classList.remove("playing"), secs * 1000);
  }
  function viewExplain(q) {
    return `<div class="explain"><span><b>${LETTERS[q.answer]}. ${esc(q.options[q.answer])}.</b> ${esc(q.why)}</span>${q.src ? `<cite>${esc(q.src)}</cite>` : ""}</div>`;
  }

  function viewQuestion() {
    const cell = cellAt(S.cur), q = cell.q, r = res(S.cur);
    if (cell.bonus && (!r.rolled || r.whammy)) return viewRoll(cell);
    if (!r.shown) {
      const how = live() ? "Captains, enter your wager on your team's device." : "Captains, DM the host your wager.";
      return `<section class="stage"><div class="splash">
        <h2>${cell.final ? "Final<br>Jeopardy" : "Daily<br>Double"}</h2>
        <span class="tag">${esc(q.cat)}${q.media ? ({ video: " · Video", audio: " · Sound" }[q.media.type] || " · Visual") : ""}</span>
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
      ${viewMedia(q.media, q)}
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
    if (cell.bonus && r.whammy) return ["off", "No Special"];
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
            if (live() || out || (cell.bonus && (!r.rolled || r.whammy))) {
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
    if (WATCH) return "";
    if (S.view === "lobby") {
      return `<footer class="hostbar"><button class="btn primary" data-act="tostart">Start the game</button><span class="spacer"></span><button class="btn" data-act="key">Answer key</button><button class="btn" data-act="menu">Menu</button></footer>`;
    }
    if (S.view === "board") {
      const done = roundDone(S.ri), left = specialsLeft(S.ri);
      return `<footer class="hostbar">
        <button class="btn ${done && !left ? "primary" : ""}" data-act="endround">End ${ROUND_NAMES[S.ri] || "round"} and show standings</button>
        ${left ? `<button class="btn special" data-act="special">Roll a Special for ${esc(S.teams[nextSpecialTeam(S.ri)].name)}<kbd>P</kbd></button>` : ""}
        <span class="spacer"></span>
        ${squaresDone(S.ri) < S.cfg.cats * S.cfg.rows ? `<span class="hint">Click a category name to change it</span>` : ""}
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
    if (cell.bonus && r.whammy) {
      return `<footer class="hostbar"><button class="btn primary" data-act="board">Back to board<kbd>B</kbd></button>${autoChip()}<span class="spacer"></span><button class="btn" data-act="scores">Scoreboard<kbd>S</kbd></button><button class="btn" data-act="menu">Menu</button></footer>`;
    }
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
    const q = cell.q;
    let main = "Reveal answer", key = "R";
    if (!r.shown) main = "Show the question";
    else if (!r.startedAt) { main = "Start clock"; key = "Space"; }
    else if (r.revealed) main = "Hide answer";
    const back = r.revealed ? (S.cur === "final" ? "Final scores" : "Back to board") : (cell.bonus ? "Back without playing" : "Back without scoring");
    return `<footer class="hostbar">
      <button class="btn" data-act="board">${back}<kbd>B</kbd></button>
      <button class="btn primary" data-act="main">${main}<kbd>${key}</kbd></button>
      ${canNewQ(cell, r) ? `<button class="btn" data-act="newq">New question<kbd>N</kbd></button>` : ""}
      ${!r.revealed && r.shown && gamePast().has(q.q) ? `<span class="chip played">Played in an earlier game</span>` : ""}
      ${r.revealed ? autoChip() : ""}
      <span class="spacer"></span>
      <button class="btn" data-act="scores">Scoreboard<kbd>S</kbd></button>
      <button class="btn" data-act="menu">Menu</button>
    </footer>`;
  }

  function canNewQ(cell, r) { return !r.revealed && (cell.bonus || (r.shown && !r.startedAt)); }
  function autoChip() {
    if (!autoBack || autoBack.key !== S.cur) return "";
    return `<span class="autoback"><span id="autoback">Back to the board in ${Math.max(0, Math.ceil((autoBack.at - Date.now()) / 1000))}</span><button class="btn" data-act="stayhere">Stay here</button></span>`;
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
    ${WATCH ? "" : `<footer class="hostbar"><span class="spacer"></span><button class="btn" data-act="key">Answer key</button><button class="btn" data-act="menu">Menu</button></footer>`}`;
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
  // The No Special crew: one eyed horned gremlins, a different set from the critters.
  function gremlin(x, y, fill, dark, delay, flip) {
    return `<g transform="translate(${x} ${y}) scale(${flip ? -1 : 1} 1)"><g class="grem" style="animation-delay:${delay}s">
      <path d="M-30 -40 L-46 -78 L-14 -50 Z M30 -40 L46 -78 L14 -50 Z" fill="#f4f1e6" stroke="${dark}" stroke-width="3"/>
      <path d="M40 30 q40 10 42 -26 l10 6 l-4 -16 l-14 4 l8 4 q-2 26 -34 18" fill="${fill}" stroke="${dark}" stroke-width="3"/>
      <path d="M-24 50 l-6 14 h18 z M24 50 l6 14 h-18 z" fill="${dark}"/>
      <path d="M-50 10 C-56 -40 -30 -62 0 -62 C30 -62 56 -40 50 10 C46 46 24 58 0 58 C-24 58 -46 46 -50 10 Z" fill="${fill}" stroke="${dark}" stroke-width="3.5"/>
      <path d="M-54 6 L-84 -22 M54 6 L84 -22" stroke="${fill}" stroke-width="11" stroke-linecap="round"/>
      <circle cx="-86" cy="-25" r="8" fill="${fill}" stroke="${dark}" stroke-width="3"/><circle cx="86" cy="-25" r="8" fill="${fill}" stroke="${dark}" stroke-width="3"/>
      <circle cx="0" cy="-18" r="22" fill="#ffffff" stroke="${dark}" stroke-width="3"/>
      <circle class="eye" cx="4" cy="-16" r="10" fill="#141414"/><circle cx="8" cy="-21" r="3.5" fill="#ffffff"/>
      <path d="M-30 18 Q0 46 30 18 Z" fill="#3a0d10" stroke="${dark}" stroke-width="3"/>
      <path d="M-22 21 l5 9 l5 -8 l5 9 l5 -9 l5 9 l5 -9 l5 8 l4 -9" fill="#ffffff"/>
    </g></g>`;
  }
  let whammy = null, whammyTimer = null;
  function showWhammy(cell) {
    clearTimeout(whammyTimer);
    whammy = { team: S.teams[cell.team].name };
    whammyTimer = setTimeout(() => { whammy = null; render(); }, 5600);
  }
  function viewWhammy() {
    if (!whammy) return "";
    const crew = [gremlin(190, 190, "#e2382e", "#5a0d0a", 0, false), gremlin(450, 175, "#7c3fd1", "#2a0f55", 0.15, true), gremlin(710, 190, "#1fa34a", "#0b3d1b", 0.3, false)].join("");
    const zaps = [[90, 60], [330, 40], [600, 50], [820, 70], [450, 290]].map(([x, y], i) => `<path class="zap" style="animation-delay:${i * 0.12}s" transform="translate(${x} ${y})" d="M0 -26 L14 -4 L4 -2 L16 26 L-12 0 L-2 -2 Z" fill="#f2b632"/>`).join("");
    return `<div class="celebrate whammy" data-dismiss>
      <svg class="crew" viewBox="0 0 900 320" role="img" aria-label="Gremlins take the Special">${zaps}${crew}
        <g class="poof"><circle cx="450" cy="300" r="40" fill="#ffffff" opacity="0.15"/></g></svg>
      <p class="cel-title">No Special for ${esc(whammy.team)}</p>
    </div>`;
  }
  function viewCelebration() {
    if (whammy) return viewWhammy();
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
    const past = gamePast();
    const row = (label, q) => `<tr><td class="v">${label}</td><td class="l">${LETTERS[q.answer]}</td><td><b>${esc(q.options[q.answer])}</b><div class="qq">${esc(q.q)}${past.has(q.q) ? " <i>(played in an earlier game)</i>" : ""}</div></td></tr>`;
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
  let keyWin = null;
  // After a swap, rewrite the answer key window if it's open, without bringing it to the front.
  function refreshKey() {
    try { if (keyWin && !keyWin.closed && keyWin.document) { const b = keyWin.document.getElementById("keybody"); if (b) b.innerHTML = keyHTML(); } } catch (e) { /* closed */ }
  }
  function openKey() {
    const css = `body{font:14px/1.4 system-ui,sans-serif;margin:24px;color:#111;background:#fff}h1{margin:0 0 4px}h2{margin:24px 0 4px;border-bottom:2px solid #111}h3{margin:14px 0 4px}table{border-collapse:collapse;width:100%}td{border-top:1px solid #ddd;padding:5px 8px;vertical-align:top}td.v{width:110px;white-space:nowrap;color:#555}td.l{width:24px;font-weight:800;font-size:16px}.qq{color:#555;font-size:12px}`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Design Jeopardy answer key</title><style>${css}</style></head><body><h1>Design Jeopardy answer key</h1><p>Letters match this game's boards. This window updates when you change a category or a question.</p><div id="keybody">${keyHTML()}</div></body></html>`;
    let w = null;
    try { w = window.open("", "design-jeopardy-key"); } catch (e) { w = null; }
    if (w && w.document) { keyWin = w; w.document.open(); w.document.write(html); w.document.close(); return; }
    overlay = "key"; render();
  }

  // Change one category on the board, or keep it and get new questions.
  function viewSwapCat() {
    const ri = S.ri, c = swapCol, col = S.rounds[ri].cols[c];
    const doneIn = col.cells.filter((cell, k) => { const r = S.res[`${ri}-${c}-${k}`]; return r && r.done; }).length;
    const game = inGame(), past = gamePast(), lastC = lastCats();
    const onBoard = new Set(S.rounds[ri].cols.map(x => x.cat));
    const newLeft = cat => cat.qs.filter(q => !game.has(q.q) && !past.has(q.q)).length;
    const elsewhere = name => S.rounds.map((round, i) => i !== ri && round.cols.some(x => x.cat === name) ? (ROUND_NAMES[i] || "Round " + (i + 1)) : null).filter(Boolean);
    const skip = new Set(S.cfg.skipCats || []);
    const others = BANK.filter(cat => !onBoard.has(cat.cat)).sort((a, b) => (skip.has(a.cat) - skip.has(b.cat)) || (lastC.has(a.cat) - lastC.has(b.cat)) || (newLeft(b) - newLeft(a)));
    const same = bankCat(col.cat);
    const sameLeft = same ? newLeft(same) : 0;
    const choices = others.map(cat => {
      const tags = [];
      if (lastC.has(cat.cat)) tags.push("Last game");
      elsewhere(cat.cat).forEach(n => tags.push("Also in " + n));
      if (skip.has(cat.cat)) tags.push("Left out in setup");
      const n = newLeft(cat);
      return `<button class="catchip" data-refill="${esc(cat.cat)}" ${doneIn ? "disabled" : ""}><span class="catchip-name">${esc(cat.cat)}</span><small>${n} new question${n === 1 ? "" : "s"}</small>${tags.map(t => `<span class="tagsmall">${esc(t)}</span>`).join("")}</button>`;
    }).join("");
    return `<div class="overlay" data-close><div class="panel swapcat" role="dialog" aria-label="Change a category">
      <div class="row between"><h2>Change ${esc(col.cat)}</h2><button class="btn" data-act="close">Close<kbd>Esc</kbd></button></div>
      <div class="row">
        <button class="btn primary" data-refill="${esc(col.cat)}">Keep ${esc(col.cat)}, draw new questions</button>
        <span class="note">${sameLeft} new question${sameLeft === 1 ? "" : "s"} left in it${doneIn ? `. The ${doneIn} played square${doneIn === 1 ? "" : "s"} stay as they are` : ""}.</span>
      </div>
      <h3>Or switch to</h3>
      ${doneIn ? `<p class="note">Someone has played a square in this category, so it can't switch. You can still draw new questions for the squares that are left.</p>` : ""}
      <div class="catchips">${choices || `<p class="note">Every category is already on this board.</p>`}</div>
      <p class="note">Daily Doubles keep their own question. To change one, open it and click New question.</p>
    </div></div>`;
  }

  function viewOverlay() {
    if (WATCH) return "";
    if (overlay === "swapcat") return viewSwapCat();
    if (overlay === "endcheck") {
      const left = specialsLeft(S.ri);
      const names = S.teams.map((tm, t) => specDone(S.ri).includes(t) ? null : tm.name).filter(Boolean);
      return `<div class="overlay" data-close><div class="panel" role="dialog" aria-label="Specials left">
        <h2>${left} ${left === 1 ? "team hasn't" : "teams haven't"} had their Special</h2>
        <p class="note">${esc(names.join(", "))}</p>
        <div class="row">
          <button class="btn special" data-act="flushspecials">Play the Specials now</button>
          <button class="btn" data-act="endanyway">End the round anyway</button>
          <button class="btn" data-act="close">Keep playing</button>
        </div>
      </div></div>`;
    }
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
        ${live() ? `<p class="note">Room code ${esc(S.room.code)}. Teams join at ${esc(location.host)}/play. Anyone can watch at ${esc(location.host)}/watch.</p>` : ""}
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
    if (!S) { app.innerHTML = WATCH ? viewWatchJoin() : viewSetup(); return; }
    if (roll && roll.stopping && S.view === "question" && S.cur === roll.key) return;
    let body = viewTop();
    if (S.view === "lobby") body += viewLobby() + viewHost();
    else if (S.view === "board") body += viewBoard() + viewTeams() + viewHost();
    else if (S.view === "question") body += viewQuestion() + viewTeams() + viewHost();
    else if (S.view === "results") body += viewResults() + viewHost();
    else body += viewEnd();
    const playing = app.querySelector(".media[data-live]");
    app.innerHTML = body + viewOverlay() + viewCelebration();
    if (playing) { const slot = app.querySelector(`.media[data-live="${playing.dataset.live}"]`); if (slot) slot.replaceWith(playing); }
    paintClock();
    drawQR();
    fitHeads();
    ensureRolling();
  }

  // On narrow screens, shrink a category name until its longest word fits the column.
  function fitHeads() {
    app.querySelectorAll(".cat-head").forEach(el => {
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize);
      while (size > 7 && (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1)) {
        size -= 0.5; el.style.fontSize = size + "px";
      }
    });
  }
  addEventListener("resize", () => { if (S && S.view === "board") fitHeads(); });

  app.addEventListener("click", e => { const b = e.target.closest("[data-play]"); if (b) playMedia(b); });

  // ---------- watching ----------
  let watchCode = "", watchMsg = "", lastWatchIn = "";
  function viewWatchJoin() {
    const waiting = watchCode && !watchMsg;
    return `
    <section class="setup watch-join">
      <h1>Design <span>Jeopardy</span></h1>
      <form class="panel" id="watch-form">
        <h3>Watch a game</h3>
        <div class="field"><label for="watch-code">Room code</label>
          <input id="watch-code" value="${esc(watchCode)}" maxlength="4" autocomplete="off" autocapitalize="characters" spellcheck="false"></div>
        ${watchMsg ? `<p class="msg bad">${esc(watchMsg)}</p>` : waiting ? `<p class="note">Waiting for the host to start room ${esc(watchCode)}.</p>` : ""}
        <div class="row"><button type="submit" class="btn primary">Watch</button></div>
        <p class="note">To answer for a team, go to ${esc(location.host)}/play instead.</p>
      </form>
    </section>`;
  }
  // Something happened on the host's screen since the last update: bring out the characters too.
  function watchEvents(prev) {
    if (prev && (prev.cur !== S.cur || prev.view !== S.view)) { celebrate = null; whammy = null; }
    if (!prev || S.view !== "question" || !S.cur || prev.cur !== S.cur) return;
    const r = S.res[S.cur], pr = prev.res[S.cur], cell = cellAt(S.cur);
    if (!r || !pr || !cell || !cell.bonus) return;
    if (r.whammy && !pr.whammy) showWhammy(cell);
    if (r.revealed && !pr.revealed) showCelebration(r.picks[cell.team] === cell.q.answer, cell);
  }
  let watching = false;
  async function watchPoll() {
    if (!WATCH || !watchCode || watching) return;
    watching = true;
    try {
      const res = await fetch(`/api/rooms/${encodeURIComponent(watchCode)}/watch`, { cache: "no-store" });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (!S) { watchMsg = d.message || "Couldn't find that game."; watchCode = ""; render(); }
        return;
      }
      noteTime(d.now);
      if (!d.watch) { if (!S) render(); return; }
      const str = JSON.stringify(d.watch);
      if (str === lastWatchIn) return;
      lastWatchIn = str;
      const prev = S;
      S = d.watch;
      watchEvents(prev);
      if (roll && roll.done) watchRelease(); else render();
    } catch (e) { /* try again on the next tick */ }
    finally { watching = false; }
  }
  function startWatching(code) {
    watchCode = String(code || "").trim().toUpperCase().replace(/[^A-Z]/g, "");
    watchMsg = ""; S = null; lastWatchIn = "";
    if (!watchCode) { watchMsg = "Enter the 4 letter room code."; render(); return; }
    try { history.replaceState(null, "", location.pathname + "?room=" + watchCode); } catch (e) { /* fine */ }
    render(); watchPoll();
  }
  if (WATCH) {
    document.title = "Watch Design Jeopardy";
    setInterval(watchPoll, 1000);
    const fromURL = new URLSearchParams(location.search).get("room");
    if (fromURL) setTimeout(() => startWatching(fromURL), 0);
    app.addEventListener("submit", e => { e.preventDefault(); if (e.target.id === "watch-form") startWatching(document.getElementById("watch-code").value); });
    app.addEventListener("click", e => { if ((celebrate || whammy) && e.target.closest("[data-dismiss]")) { celebrate = null; whammy = null; clearTimeout(celebrateTimer); clearTimeout(whammyTimer); render(); } });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && (celebrate || whammy)) { celebrate = null; whammy = null; clearTimeout(celebrateTimer); clearTimeout(whammyTimer); render(); } });
    render();
    return;
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
    if (["rounds", "cats", "rows", "secs", "autoBack"].includes(el.id)) { draft[el.id] = Number(el.value); render(); }
    if (el.id === "mode") { draft.mode = el.value; setupError = ""; render(); }
    if (el.id === "final" || el.id === "specials" || el.id === "fresh") { draft[el.id] = el.value === "1"; render(); }
    if (el.id === "special-team") { act(() => { const cell = cellAt(S.cur); if (cell && cell.bonus) cell.team = Number(el.value); }); }
    if (el.dataset.wager != null) {
      const t = Number(el.dataset.wager), r = res(S.cur);
      if (el.value === "") delete r.wagers[t];
      else r.wagers[t] = Math.min(maxWager(t, S.cur), Math.max(0, Math.round(Number(el.value) || 0)));
      persist(); render();
    }
  });

  app.addEventListener("click", e => {
    if ((celebrate || whammy) && e.target.closest("[data-dismiss]")) { celebrate = null; whammy = null; clearTimeout(celebrateTimer); clearTimeout(whammyTimer); render(); return; }
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

    if (d.skipcat != null) {
      const skip = new Set(draft.skipCats || []);
      if (skip.has(d.skipcat)) skip.delete(d.skipcat); else skip.add(d.skipcat);
      draft.skipCats = Array.from(skip); setupError = ""; render(); return;
    }
    if (d.swapcat != null) { swapCol = Number(d.swapcat); overlay = "swapcat"; render(); return; }
    if (d.refill != null) { overlay = null; act(() => refillColumn(S.ri, swapCol, d.refill)); refreshKey(); return; }
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
      case "newq": act(newQuestion); refreshKey(); break;
      case "forget":
        if (!confirmForget) { confirmForget = true; render(); break; }
        confirmForget = false; saveHistory({ games: [] }); render(); break;
      case "tostart": act(() => { S.view = "board"; }); break;
      case "endround":
        if (specialsLeft(S.ri)) { overlay = "endcheck"; render(); }
        else act(() => { S.view = "results"; });
        break;
      case "flushspecials": overlay = null; act(() => { S.flushing = true; afterBoardReturn(); }); break;
      case "endanyway": overlay = null; act(() => { S.view = "results"; }); break;
      case "stayhere": cancelAutoBack(); render(); break;
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
        S = null; lastPub = ""; lastWatch = ""; persist(); render(); break;
    }
  });

  document.addEventListener("keydown", e => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (["input", "textarea", "select"].includes(tag)) return;
    if (e.key === "Escape" && (celebrate || whammy)) { celebrate = null; whammy = null; clearTimeout(celebrateTimer); clearTimeout(whammyTimer); render(); return; }
    if (e.key === "Escape" && overlay) { overlay = null; confirmNew = false; render(); return; }
    if (!S || overlay) return;
    if (e.key === "s" || e.key === "S") { overlay = "scores"; render(); return; }
    if ((e.key === "p" || e.key === "P") && S.view === "board") { const t = nextSpecialTeam(S.ri); if (specialsLeft(S.ri) && t != null) act(() => startSpecial(t)); return; }
    if (S.view !== "question") return;
    const r = res(S.cur);
    if (e.key === " ") { e.preventDefault(); if (r.whammy) return; if (!r.rolled) stopRoll(); else if (r.shown && !r.startedAt) startClock(); }
    else if (e.key === "r" || e.key === "R" || e.key === "Enter") mainAction();
    else if (e.key === "b" || e.key === "B") act(backToBoard);
    else if ((e.key === "n" || e.key === "N") && canNewQ(cellAt(S.cur), r)) { act(newQuestion); refreshKey(); }
  });

  render();
  if (live()) { publish(); poll(); }
})();
