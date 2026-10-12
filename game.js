/* Design Jeopardy host screen.
   Two ways to play:
   "devices"  each team answers on its own phone or laptop at /play. This screen only shows who has locked in.
   "dm"       captains DM the host, who clicks answers in. No server needed. */
(function () {
  "use strict";

  const STORE = "design-jeopardy-v3";
  const LETTERS = ["A", "B", "C", "D"];
  const SPEED_HOLD = 0.2;  // full value for the first 20 percent of the clock
  const SPEED_FLOOR = 0.5; // a correct answer at the buzzer still earns half
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
        cell.dd = true;
        cell.q = prep(d, d.cat);
      }
      rounds.push({ cols });
    }
    const final = cfg.final && FINALS.length ? { value: 0, dd: false, final: true, q: prep(shuffle(FINALS)[0]) } : null;
    return { rounds, final };
  }

  // ---------- state ----------
  let S = load();
  if (S && !S.cfg) S = null;
  let draft = { names: ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5", "Team 6"], rounds: 2, cats: 6, rows: 2, secs: 30, mode: "devices", speed: true, penalty: true, final: true };
  if (S) draft = Object.assign({}, draft, S.cfg, { names: S.teams.map(t => t.name) });
  let overlay = null, confirmNew = false, setupError = "", starting = false;
  const buzzed = {};

  function cellAt(key) {
    if (key === "final") return S.final;
    const [r, c, k] = key.split("-").map(Number);
    return S.rounds[r].cols[c].cells[k];
  }
  function isSpecial(cell) { return !!(cell.dd || cell.final); }
  function res(key) {
    if (!S.res[key]) {
      const cell = cellAt(key);
      S.res[key] = { picks: {}, at: {}, wagers: {}, doubled: [], shown: !isSpecial(cell), revealed: false, done: false, startedAt: null, deadline: null };
    }
    return S.res[key];
  }
  function qid(key) { return key + "." + ((S.attempts && S.attempts[key]) || 0); }
  function speedOn(cell) { return !!(S.cfg.speed && live() && !isSpecial(cell)); }
  function mult(at) {
    if (at == null) return 1;
    const frac = Math.min(1, Math.max(0, at / (S.cfg.secs * 1000)));
    return frac <= SPEED_HOLD ? 1 : 1 - (1 - SPEED_FLOOR) * (frac - SPEED_HOLD) / (1 - SPEED_HOLD);
  }
  function worth(cell, at) { return speedOn(cell) ? Math.round(cell.value * mult(at) / 10) * 10 : cell.value; }

  function points(t, key) {
    const r = S.res[key];
    if (!r || !r.revealed) return 0;
    const cell = cellAt(key);
    const pick = r.picks[t];
    if (isSpecial(cell)) {
      const w = Number(r.wagers[t]) || 0;
      if (pick == null) return 0;
      return pick === cell.q.answer ? w : -w;
    }
    if (pick == null) return 0;
    const x = r.doubled.includes(t) ? 2 : 1;
    if (pick === cell.q.answer) return worth(cell, r.at[t]) * x;
    return S.cfg.penalty ? -(cell.value / 4) * x : 0;
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
  function roundDone(ri) {
    return S.rounds[ri].cols.every((col, c) => col.cells.every((cell, k) => { const r = S.res[`${ri}-${c}-${k}`]; return r && r.done; }));
  }
  function remaining() { const r = S.cur && S.res[S.cur]; return r && r.deadline ? r.deadline - serverNow() : null; }
  function clockRunning() { const r = S.cur && S.res[S.cur]; return !!(r && r.startedAt && !r.revealed && remaining() > 0); }
  function lockedCount() { const r = S.cur && S.res[S.cur]; return r ? S.teams.filter((_, t) => r.picks[t] != null).length : 0; }

  // What team devices are allowed to see. The question text never goes to devices.
  function pubState() {
    const base = { phase: "board", round: S.ri + 1, rounds: S.rounds.length, teams: S.teams.map(t => t.name), scores: S.teams.map((_, t) => score(t)), picker: S.picker };
    if (S.view === "lobby") return Object.assign(base, { phase: "lobby" });
    if (S.view === "board") return base;
    if (S.view === "results") return Object.assign(base, { phase: "results", roundPts: S.teams.map((_, t) => roundPoints(t, S.ri)) });
    if (S.view === "end") return Object.assign(base, { phase: "end" });
    const cell = cellAt(S.cur), r = res(S.cur), q = cell.q;
    const kind = cell.final ? "final" : cell.dd ? "dd" : "q";
    const common = { qid: qid(S.cur), kind, cat: q.cat, value: cell.value || 0, visual: !!q.media };
    if (isSpecial(cell) && !r.shown) return Object.assign(base, common, { phase: "splash", maxWager: S.teams.map((_, t) => maxWager(t, S.cur)) });
    if (!r.revealed) {
      return Object.assign(base, common, {
        phase: "question", secs: S.cfg.secs, speed: speedOn(cell), hold: SPEED_HOLD, floor: SPEED_FLOOR,
        penalty: kind === "q" && !!S.cfg.penalty, startedAt: r.startedAt, deadline: r.deadline,
        options: r.startedAt ? q.options : null
      });
    }
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
      const r = res(S.cur), id = qid(S.cur);
      if (!r.revealed) {
        teams.forEach((x, t) => {
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
    const w = document.getElementById("worth");
    if (w && r && r.startedAt) w.textContent = fmt(worth(cellAt(S.cur), Math.min(S.cfg.secs * 1000, serverNow() - r.startedAt)));
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
    const next = { cfg, teams: cfg.names.map(n => ({ name: n, adj: 0, doubleUsed: null })), rounds: g.rounds, final: g.final, ri: 0, view: "board", cur: null, picker: 0, res: {}, attempts: {}, room: null, claims: [] };
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
    const r = res(S.cur);
    if (r.revealed) {
      if (!r.done) { r.done = true; S.picker = (S.picker + 1) % S.teams.length; }
      if (S.cur === "final") { S.view = "end"; S.cur = null; return; }
    } else {
      // Leaving without scoring: forget this attempt so the square replays cleanly later.
      S.teams.forEach(tm => { if (tm.doubleUsed === S.cur) tm.doubleUsed = null; });
      delete S.res[S.cur];
      S.attempts[S.cur] = ((S.attempts && S.attempts[S.cur]) || 0) + 1;
    }
    S.cur = null; S.view = "board";
  }
  function afterResults() {
    if (S.ri < S.rounds.length - 1) { S.ri++; S.view = "board"; return; }
    if (S.final) { openCell("final"); return; }
    S.view = "end";
  }
  async function startClock() {
    if (!S || S.view !== "question") return;
    const r = res(S.cur);
    if (!r.shown || r.revealed || r.startedAt) return;
    if (live()) {
      r.startedAt = -1; // placeholder so the options show in what we send; the server sets the real time
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
    const r = res(S.cur);
    if (!r.shown) { r.shown = true; persist(); publish(); render(); return; }
    if (!r.startedAt) { await startClock(); return; }
    if (!r.revealed) {
      if (live()) { try { const d = await api("GET", `/${S.room.code}/subs?qid=${encodeURIComponent(qid(S.cur))}`); applySubs(d.teams); } catch (e) { /* reveal with what we have */ } }
      r.revealed = true;
    } else {
      r.revealed = false;
    }
    persist(); publish(); render();
  }
  function toggleDouble(t) {
    const r = res(S.cur), team = S.teams[t];
    if (r.revealed || r.startedAt || isSpecial(cellAt(S.cur))) return;
    if (team.doubleUsed === S.cur) { team.doubleUsed = null; r.doubled = r.doubled.filter(x => x !== t); return; }
    if (team.doubleUsed) return;
    team.doubleUsed = S.cur; r.doubled.push(t);
  }

  // ---------- views ----------
  function field(id, label, opts, val, show) {
    return `<div class="field"><label for="${id}">${label}</label><select id="${id}">${opts.map(o => `<option value="${o}" ${String(o) === String(val) ? "selected" : ""}>${show(o)}</option>`).join("")}</select></div>`;
  }
  function onOff(id, label, val, on, off, disabled) {
    return `<div class="field"><label for="${id}">${label}</label><select id="${id}" ${disabled ? "disabled" : ""}><option value="1" ${val ? "selected" : ""}>${on}</option><option value="0" ${val ? "" : "selected"}>${off}</option></select></div>`;
  }
  function viewSetup() {
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
              ${field("rounds", "Rounds", [1, 2, 3], draft.rounds, v => v + (v === 1 ? " board" : " boards"))}
              ${field("cats", "Categories per board", [4, 5, 6], draft.cats, v => v)}
              ${field("rows", "Questions per category", [2, 3, 4, 5], draft.rows, v => v)}
              ${field("secs", "Answer clock", [15, 20, 25, 30, 45, 60], draft.secs, v => v + " seconds")}
              ${onOff("speed", "Faster answers score more", draft.speed && draft.mode === "devices", "On", "Off", draft.mode !== "devices")}
              ${onOff("penalty", "Wrong answers", draft.penalty, "Lose a quarter of the value", "Score zero")}
              ${onOff("final", "Final wager", draft.final, "On", "Off")}
            </div>
            <p class="note">${draft.rounds * draft.cats * draft.rows} squares drawn from ${BANK.reduce((n, c) => n + c.qs.length, 0)} questions, plus Daily Doubles${draft.final ? " and a final wager" : ""}.</p>
          </div>
        </div>
        ${setupError ? `<p class="msg bad">${esc(setupError)}</p>` : ""}
        <div class="row">
          <button type="submit" class="btn primary" ${starting ? "disabled" : ""}>${starting ? "Opening a room" : "Draw boards and start"}</button>
        </div>
      </form>
    </section>`;
  }

  function viewTop() {
    let meta = "";
    if (S.view === "lobby") meta = "Join the game";
    else if (S.view === "board") meta = `Round ${S.ri + 1} of ${S.rounds.length}`;
    else if (S.view === "results") meta = `Round ${S.ri + 1} of ${S.rounds.length}`;
    else if (S.view === "question") {
      const cell = cellAt(S.cur);
      meta = cell.final ? "Final wager" : cell.dd ? "Daily Double" : `${esc(cell.q.cat)} · <b>${cell.value}</b>`;
    } else if (S.view === "end") meta = "Final scores";
    let right = "";
    if (S.view === "question") {
      const r = res(S.cur), cell = cellAt(S.cur);
      if (r.shown && !r.revealed) {
        if (r.startedAt) right += `<span class="chip">${lockedCount()} of ${S.teams.length} locked in</span>`;
        if (r.startedAt && speedOn(cell)) right += `<span class="chip">Worth <b id="worth">${fmt(cell.value)}</b></span>`;
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
      <p class="picker">${done ? "Board cleared." : `Next pick: <b>${esc(S.teams[S.picker].name)}</b>`}</p>
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
    if (!r.shown) {
      const how = live() ? "Captains, enter your wager on your team's device." : "Captains, DM the host your wager.";
      return `<section class="stage"><div class="splash">
        <h2>${cell.final ? "Final<br>Wager" : "Daily<br>Double"}</h2>
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
    const heading = `${isSpecial(cell) ? `<p class="category">${esc(q.cat)}</p>` : ""}<h1 class="prompt">${esc(q.q)}</h1>`;
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
    const r = res(S.cur);
    const joined = (S.claims || [])[t];
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
        if (inQ) {
          const cell = cellAt(S.cur), r = res(S.cur), special = isSpecial(cell), pick = r.picks[t];
          if (!r.revealed) {
            if (live()) {
              const st = teamStatus(t);
              body += `<div class="status ${st[0]}">${st[1]}</div>`;
            } else {
              if (special && !r.shown) {
                const max = maxWager(t, S.cur);
                body += `<label class="wager" for="wager-${t}">Wager <input id="wager-${t}" data-wager="${t}" type="number" inputmode="numeric" min="0" max="${max}" step="50" value="${r.wagers[t] != null ? r.wagers[t] : ""}" placeholder="max ${fmt(max)}"></label>`;
              } else if (pick == null) {
                body += `<div class="picks">${LETTERS.map((L, i) => `<button data-pick="${t}:${i}" aria-label="${esc(tm.name)} answers ${L}">${L}</button>`).join("")}</div>`;
              } else {
                body += `<div class="status ok">Locked in <button class="linkbtn" data-unpick="${t}">change</button></div>`;
              }
              if (!special && r.shown && !r.startedAt) {
                const used = tm.doubleUsed && tm.doubleUsed !== S.cur, on = tm.doubleUsed === S.cur;
                body += `<div class="extras"><button data-double="${t}" class="${on ? "active" : used ? "spent" : ""}">Double</button></div>`;
              }
            }
          } else {
            const d = points(t, S.cur);
            const notes = [];
            if (special) notes.push(pick == null ? "no answer" : `bet ${fmt(Number(r.wagers[t]) || 0)}`);
            else {
              if (r.doubled.includes(t)) notes.push("doubled");
              if (pick != null && live() && r.at[t] != null) notes.push((r.at[t] / 1000).toFixed(1) + " sec");
            }
            const cls = pick == null ? "none" : pick === cell.q.answer ? "right" : "wrong";
            body += `<div class="reveal-row"><span class="pickchip ${cls}">${pick == null ? "?" : LETTERS[pick]}</span><span class="delta ${d > 0 ? "up" : d < 0 ? "down" : "zero"}">${signed(d)}</span></div>`;
            if (notes.length) body += `<div class="notes">${notes.join(" · ")}</div>`;
          }
        }
        const picking = S.view === "board" && t === S.picker;
        return `<article class="team ${picking ? "picking" : ""}">
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
        <h2>Standings after round ${S.ri + 1}</h2>
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
      return `<footer class="hostbar"><button class="btn primary" data-act="tostart">Start round 1</button><span class="spacer"></span><button class="btn" data-act="key">Answer key</button><button class="btn" data-act="menu">Menu</button></footer>`;
    }
    if (S.view === "board") {
      const done = roundDone(S.ri);
      return `<footer class="hostbar">
        <button class="btn ${done ? "primary" : ""}" data-act="endround">End round ${S.ri + 1} and show standings</button>
        <span class="spacer"></span>
        <button class="btn" data-act="key">Answer key</button>
        <button class="btn" data-act="scores">Scoreboard<kbd>S</kbd></button>
        <button class="btn" data-act="menu">Menu</button>
      </footer>`;
    }
    if (S.view === "results") {
      const last = S.ri === S.rounds.length - 1;
      return `<footer class="hostbar"><button class="btn primary" data-act="afterresults">${last ? (S.final ? "Go to the final wager" : "Show final scores") : `Start round ${S.ri + 2}`}</button><span class="spacer"></span><button class="btn" data-act="menu">Menu</button></footer>`;
    }
    const r = res(S.cur);
    let main = "Reveal answer", key = "R";
    if (!r.shown) main = "Show the question";
    else if (!r.startedAt) { main = "Start clock"; key = "Space"; }
    else if (r.revealed) main = "Hide answer";
    return `<footer class="hostbar">
      <button class="btn" data-act="board">${r.revealed ? (S.cur === "final" ? "Final scores" : "Back to board") : "Back without scoring"}<kbd>B</kbd></button>
      <button class="btn primary" data-act="main">${main}<kbd>${key}</kbd></button>
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

  function keyHTML() {
    const rows = [];
    S.rounds.forEach((round, ri) => {
      rows.push(`<h2>Round ${ri + 1}</h2>`);
      round.cols.forEach(col => {
        rows.push(`<h3>${esc(col.cat)}</h3><table>`);
        col.cells.forEach(cell => rows.push(`<tr><td class="v">${cell.value}${cell.dd ? " DD" : ""}</td><td class="l">${LETTERS[cell.q.answer]}</td><td><b>${esc(cell.q.options[cell.q.answer])}</b><div class="qq">${esc(cell.q.q)}</div></td></tr>`));
        rows.push(`</table>`);
      });
    });
    if (S.final) rows.push(`<h2>Final wager</h2><table><tr><td class="v">Final</td><td class="l">${LETTERS[S.final.q.answer]}</td><td><b>${esc(S.final.q.options[S.final.q.answer])}</b><div class="qq">${esc(S.final.q.q)}</div></td></tr></table>`);
    return rows.join("");
  }
  function openKey() {
    const css = `body{font:14px/1.4 system-ui,sans-serif;margin:24px;color:#111;background:#fff}h1{margin:0 0 4px}h2{margin:24px 0 4px;border-bottom:2px solid #111}h3{margin:14px 0 4px}table{border-collapse:collapse;width:100%}td{border-top:1px solid #ddd;padding:5px 8px;vertical-align:top}td.v{width:70px;white-space:nowrap;color:#555}td.l{width:24px;font-weight:800;font-size:16px}.qq{color:#555;font-size:12px}`;
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
    let body = viewTop();
    if (S.view === "lobby") body += viewLobby() + viewHost();
    else if (S.view === "board") body += viewBoard() + viewTeams() + viewHost();
    else if (S.view === "question") body += viewQuestion() + viewTeams() + viewHost();
    else if (S.view === "results") body += viewResults() + viewHost();
    else body += viewEnd();
    app.innerHTML = body + viewOverlay();
    paintClock();
    drawQR();
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
    if (["speed", "penalty", "final"].includes(el.id)) { draft[el.id] = el.value === "1"; render(); }
    if (el.dataset.wager != null) {
      const t = Number(el.dataset.wager), r = res(S.cur);
      if (el.value === "") delete r.wagers[t];
      else r.wagers[t] = Math.min(maxWager(t, S.cur), Math.max(0, Math.round(Number(el.value) || 0)));
      persist(); render();
    }
  });

  app.addEventListener("click", e => {
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
    if (e.key === "Escape" && overlay) { overlay = null; confirmNew = false; render(); return; }
    if (!S || overlay) return;
    if (e.key === "s" || e.key === "S") { overlay = "scores"; render(); return; }
    if (S.view !== "question") return;
    const r = res(S.cur);
    if (e.key === " ") { e.preventDefault(); if (r.shown && !r.startedAt) startClock(); }
    else if (e.key === "r" || e.key === "R" || e.key === "Enter") mainAction();
    else if (e.key === "b" || e.key === "B") act(backToBoard);
  });

  render();
  if (live()) { publish(); poll(); }
})();
