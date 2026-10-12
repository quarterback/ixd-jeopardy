/* Design Jeopardy. Host runs it on a shared screen; every team answers every square. */
(function () {
  "use strict";

  const STORE = "design-jeopardy-v2";
  const LETTERS = ["A", "B", "C", "D"];
  const app = document.getElementById("app");

  // ---------- storage ----------
  function load() { try { const r = localStorage.getItem(STORE); return r ? JSON.parse(r) : null; } catch (e) { return null; } }
  function persist() { try { if (S) localStorage.setItem(STORE, JSON.stringify(S)); else localStorage.removeItem(STORE); } catch (e) { /* storage off */ } }

  // ---------- helpers ----------
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function shuffle(arr) { const a = arr.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
  function fmt(n) { return (n < 0 ? "−" : "") + Math.abs(n).toLocaleString("en-US"); }

  // Turn a bank entry into a playable question with shuffled options.
  function prep(src, fallbackCat) {
    let options, answer;
    if (src.fixed) { options = src.fixed.slice(); answer = options.indexOf(src.a); }
    else { options = shuffle([src.a].concat(src.w)); answer = options.indexOf(src.a); }
    return { cat: src.cat || fallbackCat, q: src.q, options, answer, why: src.why || "", src: src.src || "", media: src.media || null };
  }

  // ---------- drawing the boards ----------
  function drawGame(cfg) {
    const used = new Set();
    const usedDD = new Set();
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
      // Daily Doubles: one on the first board, two after that, never in the top row.
      const ddCount = Math.min(r === 0 ? 1 : 2, DAILY_DOUBLES.length - usedDD.size);
      const spots = shuffle(cols.flatMap((col, c) => col.cells.map((cell, k) => ({ c, k }))).filter(s => s.k > 0 || cfg.rows === 1));
      for (let i = 0; i < ddCount && i < spots.length; i++) {
        const avail = DAILY_DOUBLES.filter(d => !usedDD.has(d.q));
        const d = shuffle(avail)[0];
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

  function newGame(cfg) {
    const g = drawGame(cfg);
    return {
      cfg,
      teams: cfg.names.map(n => ({ name: n, adj: 0, doubleUsed: null })),
      rounds: g.rounds,
      final: g.final,
      ri: 0,
      view: "board",
      cur: null,
      picker: 0,
      res: {}
    };
  }

  // ---------- state ----------
  let S = load();
  let draft = { names: ["Team 1", "Team 2", "Team 3", "Team 4", "Team 5"], rounds: 2, cats: 5, rows: 4, secs: 25, speed: 50, final: true };
  if (S && S.cfg) draft = Object.assign({}, S.cfg);
  if (S && S.view === "setup") S = null;
  let overlay = null;
  let confirmNew = false;
  let timer = { end: 0, left: null, running: false, done: false };

  function cellAt(key) {
    if (key === "final") return S.final;
    const [r, c, k] = key.split("-").map(Number);
    return S.rounds[r].cols[c].cells[k];
  }
  function res(key) {
    if (!S.res[key]) {
      const cell = cellAt(key);
      const special = cell.dd || cell.final;
      S.res[key] = { picks: {}, wagers: {}, doubled: [], fast: null, shown: !special, opts: false, revealed: false, done: false };
    }
    return S.res[key];
  }
  function isSpecial(cell) { return cell.dd || cell.final; }

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
    if (pick !== cell.q.answer) return 0;
    let v = cell.value;
    if (r.doubled.includes(t)) v *= 2;
    if (S.cfg.speed && r.fast === t) v += S.cfg.speed;
    return v;
  }
  function score(t, exceptKey) {
    let s = S.teams[t].adj;
    for (const key in S.res) if (key !== exceptKey) s += points(t, key);
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

  // ---------- timer ----------
  function startTimer() {
    timer = { end: Date.now() + S.cfg.secs * 1000, left: S.cfg.secs, running: true, done: false };
    if (S.cur) { res(S.cur).opts = true; persist(); }
  }
  function resetTimer() { timer = { end: 0, left: null, running: false, done: false }; }
  setInterval(() => {
    if (!timer.running) return;
    timer.left = Math.max(0, (timer.end - Date.now()) / 1000);
    if (timer.left <= 0) { timer.running = false; timer.done = true; buzz(); render(); return; }
    paintTimer();
  }, 100);
  function paintTimer() {
    const el = document.getElementById("timer");
    if (!el || !S) return;
    const left = timer.left == null ? S.cfg.secs : timer.left;
    el.style.setProperty("--p", String(left / S.cfg.secs));
    el.classList.toggle("out", timer.done);
    el.querySelector("span").textContent = timer.done ? "Time" : String(Math.ceil(left));
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
  function openCell(key) {
    S.cur = key; S.view = "question"; res(key); resetTimer();
  }
  function backToBoard() {
    if (!S.cur) return;
    const r = res(S.cur);
    if (r.revealed && !r.done) { r.done = true; S.picker = (S.picker + 1) % S.teams.length; }
    if (S.cur === "final") { S.view = "end"; S.cur = null; resetTimer(); return; }
    S.cur = null; S.view = "board"; resetTimer();
  }
  function nextRound() {
    if (S.ri < S.rounds.length - 1) { S.ri++; S.view = "board"; return; }
    if (S.final) { openCell("final"); return; }
    S.view = "end";
  }
  function reveal() {
    const r = res(S.cur);
    if (!r.shown) { r.shown = true; return; }
    if (!r.opts) { r.opts = true; return; }
    r.revealed = !r.revealed;
    if (r.revealed) { timer.running = false; }
  }
  function toggleDouble(t) {
    const r = res(S.cur), team = S.teams[t];
    if (r.revealed || isSpecial(cellAt(S.cur))) return;
    if (team.doubleUsed === S.cur) { team.doubleUsed = null; r.doubled = r.doubled.filter(x => x !== t); return; }
    if (team.doubleUsed) return;
    team.doubleUsed = S.cur; r.doubled.push(t);
  }

  // ---------- views ----------
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
              ${field("rounds", "Rounds", [1, 2, 3], draft.rounds, v => v + (v === 1 ? " board" : " boards"))}
              ${field("cats", "Categories per board", [4, 5, 6], draft.cats, v => v)}
              ${field("rows", "Questions per category", [3, 4, 5], draft.rows, v => v)}
              ${field("secs", "Answer clock", [15, 20, 25, 30, 45, 60], draft.secs, v => v + " seconds")}
              ${field("speed", "First correct DM bonus", [0, 50, 100], draft.speed, v => v ? "+" + v + " points" : "Off")}
              <div class="field"><label for="final">Final wager</label><select id="final"><option value="1" ${draft.final ? "selected" : ""}>On</option><option value="0" ${draft.final ? "" : "selected"}>Off</option></select></div>
            </div>
            <p class="note">${draft.rounds * draft.cats * draft.rows} squares drawn at random from ${BANK.reduce((n, c) => n + c.qs.length, 0)} questions in ${BANK.length} categories, plus ${DAILY_DOUBLES.length} visual Daily Doubles.</p>
          </div>
        </div>
        <div class="row">
          <button type="submit" class="btn primary">Draw boards and start</button>
        </div>
      </form>
    </section>`;
  }
  function field(id, label, opts, val, show) {
    return `<div class="field"><label for="${id}">${label}</label><select id="${id}">${opts.map(o => `<option value="${o}" ${o === val ? "selected" : ""}>${show(o)}</option>`).join("")}</select></div>`;
  }

  function viewTop() {
    let meta = "";
    if (S.view === "board") meta = `Round ${S.ri + 1} of ${S.rounds.length}`;
    else if (S.view === "question") {
      const cell = cellAt(S.cur);
      meta = cell.final ? "Final wager" : cell.dd ? `Daily Double` : `${esc(cellAt(S.cur).q.cat)} · <b>${cell.value}</b>`;
    } else if (S.view === "end") meta = "Final scores";
    const showTimer = S.view === "question" && res(S.cur).shown && !res(S.cur).revealed;
    return `
    <header class="topbar">
      <div class="brand">Design <span>Jeopardy</span></div>
      <div class="qmeta">${meta}</div>
      <span class="spacer"></span>
      ${showTimer ? `<button class="timer" id="timer" title="Start the clock (space)" aria-label="Answer clock"><span>${S.cfg.secs}</span></button>` : ""}
    </header>`;
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
          const r = S.res[key];
          const isDone = r && r.done;
          return `<button class="cell ${isDone ? "done" : ""}" data-cell="${key}" ${isDone ? `aria-label="${esc(col.cat)} ${col.cells[k].value}, played"` : `aria-label="${esc(col.cat)} for ${col.cells[k].value}"`}>${isDone ? "" : col.cells[k].value}</button>`;
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
      return `<section class="stage"><div class="splash">
        <h2>${cell.final ? "Final<br>Wager" : "Daily<br>Double"}</h2>
        <span class="tag">${esc(q.cat)}${q.media ? (q.media.type === "video" ? " · Video" : " · Visual") : ""}</span>
        <p>Captains, DM the host your wager. ${cell.final ? "Bet any part of your score." : `Bet up to your score, or up to ${fmt(boardTop(S.ri))} if you have less.`}</p>
      </div></section>`;
    }
    const whoPicked = i => S.teams.map((tm, t) => r.picks[t] === i ? `<i>${esc(tm.name)}</i>` : "").join("");
    const options = r.opts ? `<div class="options">
        ${q.options.map((o, i) => {
          const cls = ["opt"];
          if (r.revealed && i === q.answer) cls.push("right");
          if (r.revealed && i !== q.answer && Object.values(r.picks).includes(i)) cls.push("wrong-picked");
          return `<div class="${cls.join(" ")}"><span class="letter">${LETTERS[i]}</span><span class="text">${esc(o)}${r.revealed ? `<span class="who">${whoPicked(i)}</span>` : ""}</span></div>`;
        }).join("")}
      </div>` : `<div class="options-wait">Answers appear when the clock starts.</div>`;
    const heading = `${cell.dd || cell.final ? `<p class="category">${esc(q.cat)}</p>` : ""}<h1 class="prompt">${esc(q.q)}</h1>`;
    if (q.media) {
      // Visual question: picture on the left, question, answers and explanation on the right.
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

  function viewTeams() {
    const inQ = S.view === "question";
    const cell = inQ ? cellAt(S.cur) : null;
    const r = inQ ? res(S.cur) : null;
    return `<section class="teams" aria-label="Teams">
      ${S.teams.map((tm, t) => {
        const sc = score(t);
        let body = "";
        if (inQ) {
          const special = isSpecial(cell);
          const pick = r.picks[t];
          if (special && !r.revealed) {
            const max = maxWager(t, S.cur);
            body += `<label class="wager" for="wager-${t}">Wager <input id="wager-${t}" data-wager="${t}" type="number" inputmode="numeric" min="0" max="${max}" step="50" value="${r.wagers[t] != null ? r.wagers[t] : ""}" placeholder="max ${fmt(max)}"></label>`;
          }
          if (r.shown) {
            body += `<div class="picks">${LETTERS.map((L, i) => {
              let cls = "";
              if (r.revealed && pick === i) cls = i === cell.q.answer ? "is-right" : "is-wrong";
              return `<button data-pick="${t}:${i}" aria-pressed="${pick === i}" class="${cls}" ${r.revealed ? "disabled" : ""} aria-label="${esc(tm.name)} answers ${L}">${L}</button>`;
            }).join("")}</div>`;
          }
          if (!special) {
            const used = tm.doubleUsed && tm.doubleUsed !== S.cur;
            const on = tm.doubleUsed === S.cur;
            body += `<div class="extras">
              <button data-double="${t}" class="${on ? "active" : used ? "spent" : ""}" ${r.revealed ? "disabled" : ""} title="${used ? "Double already used" : "Double this question, once per game"}">Double</button>
              ${S.cfg.speed ? `<button data-fast="${t}" class="${r.fast === t ? "active" : ""}" ${r.revealed ? "disabled" : ""} title="First DM in">First in</button>` : ""}
            </div>`;
          }
          if (r.revealed) {
            const d = points(t, S.cur);
            const note = special ? (pick == null ? " no answer" : ` on a ${fmt(Number(r.wagers[t]) || 0)} bet`) : (r.fast === t && d > 0 && S.cfg.speed ? " with bonus" : "");
            body += `<div class="delta ${d > 0 ? "up" : d < 0 ? "down" : "zero"}">${d > 0 ? "+" : ""}${fmt(d)}<small>${note}</small></div>`;
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

  function viewHost() {
    if (S.view === "board") {
      const done = roundDone(S.ri);
      const last = S.ri === S.rounds.length - 1;
      return `<footer class="hostbar">
        <button class="btn ${done ? "primary" : ""}" data-act="nextround">${last ? (S.final ? "Go to the final wager" : "Show final scores") : `Start round ${S.ri + 2}`}</button>
        <span class="spacer"></span>
        <button class="btn" data-act="key">Answer key</button>
        <button class="btn" data-act="scores">Scoreboard<kbd>S</kbd></button>
        <button class="btn" data-act="menu">Menu</button>
      </footer>`;
    }
    const r = res(S.cur);
    let main = "Reveal answer";
    if (!r.shown) main = "Show the question";
    else if (!r.opts) main = "Show answers";
    else if (r.revealed) main = "Hide answer";
    return `<footer class="hostbar">
      <button class="btn" data-act="board">${r.revealed ? (S.cur === "final" ? "Final scores" : "Back to board") : "Back without scoring"}<kbd>B</kbd></button>
      <button class="btn" data-act="timer" ${!r.shown || r.revealed ? "disabled" : ""}>${timer.running ? "Clock running" : "Start clock"}<kbd>Space</kbd></button>
      <button class="btn primary" data-act="reveal">${main}<kbd>R</kbd></button>
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
        col.cells.forEach(cell => {
          rows.push(`<tr><td class="v">${cell.value}${cell.dd ? " DD" : ""}</td><td class="l">${LETTERS[cell.q.answer]}</td><td><b>${esc(cell.q.options[cell.q.answer])}</b><div class="qq">${esc(cell.q.q)}</div></td></tr>`);
        });
        rows.push(`</table>`);
      });
    });
    if (S.final) rows.push(`<h2>Final wager</h2><table><tr><td class="v">Final</td><td class="l">${LETTERS[S.final.q.answer]}</td><td><b>${esc(S.final.q.options[S.final.q.answer])}</b><div class="qq">${esc(S.final.q.q)}</div></td></tr></table>`);
    return rows.join("");
  }
  function openKey() {
    const css = `body{font:14px/1.4 system-ui,sans-serif;margin:24px;color:#111;background:#fff}h1{margin:0 0 4px}h2{margin:24px 0 4px;border-bottom:2px solid #111}h3{margin:14px 0 4px}table{border-collapse:collapse;width:100%}td{border-top:1px solid #ddd;padding:5px 8px;vertical-align:top}td.v{width:70px;white-space:nowrap;color:#555}td.l{width:24px;font-weight:800;font-size:16px}.qq{color:#555;font-size:12px}@media print{h2{break-after:avoid}}`;
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Design Jeopardy answer key</title><style>${css}</style></head><body><h1>Design Jeopardy answer key</h1><p>Letters match this game's boards. Drawing new boards changes them.</p>${keyHTML()}</body></html>`;
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
          ${S.view !== "end" ? `<button class="btn" data-act="endgame">Show final scores now</button>` : ""}
          <button class="btn" data-act="newgame">${confirmNew ? "Click again to end this game" : "New game"}</button>
        </div>
        <p class="note">Scores save in this browser, so a refresh won't lose the game.</p>
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

  function render() {
    if (!S) { app.innerHTML = viewSetup(); return; }
    let body = viewTop();
    if (S.view === "board") body += viewBoard() + viewTeams() + viewHost();
    else if (S.view === "question") body += viewQuestion() + viewTeams() + viewHost();
    else body += viewEnd();
    app.innerHTML = body + viewOverlay();
    paintTimer();
  }

  // ---------- events ----------
  function act(fn) { fn(); persist(); render(); }

  app.addEventListener("submit", e => {
    e.preventDefault();
    if (e.target.id !== "setup-form") return;
    draft.names = draft.names.map((n, i) => n.trim() || `Team ${i + 1}`);
    S = newGame(Object.assign({}, draft));
    resetTimer(); persist(); render();
  });

  app.addEventListener("input", e => {
    const el = e.target;
    if (el.dataset.i != null) draft.names[Number(el.dataset.i)] = el.value;
    if (el.dataset.wager != null) {
      const r = res(S.cur);
      r.wagers[Number(el.dataset.wager)] = el.value === "" ? undefined : Number(el.value);
      persist();
    }
  });

  app.addEventListener("change", e => {
    const el = e.target;
    if (["rounds", "cats", "rows", "secs", "speed"].includes(el.id)) { draft[el.id] = Number(el.value); render(); }
    if (el.id === "final") { draft.final = el.value === "1"; }
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
    if (b.id === "timer") { if (!timer.running) { startTimer(); } act(() => {}); return; }

    if (d.cell) { const r = S.res[d.cell]; if (!(r && r.done)) act(() => openCell(d.cell)); return; }
    if (d.pick) { const [t, i] = d.pick.split(":").map(Number); act(() => { const r = res(S.cur); if (r.revealed) return; if (r.picks[t] === i) delete r.picks[t]; else r.picks[t] = i; }); return; }
    if (d.double != null) { act(() => toggleDouble(Number(d.double))); return; }
    if (d.fast != null) { act(() => { const r = res(S.cur); const t = Number(d.fast); r.fast = r.fast === t ? null : t; }); return; }
    if (d.adj) { const [t, n] = d.adj.split(":").map(Number); act(() => { S.teams[t].adj += n; }); return; }

    switch (d.act) {
      case "reveal": act(reveal); break;
      case "board": act(backToBoard); break;
      case "timer": if (!timer.running) startTimer(); act(() => {}); break;
      case "nextround": act(nextRound); break;
      case "scores": overlay = "scores"; render(); break;
      case "menu": overlay = "menu"; confirmNew = false; render(); break;
      case "close": overlay = null; confirmNew = false; render(); break;
      case "key": overlay = null; openKey(); render(); break;
      case "endgame": overlay = null; act(() => { S.view = "end"; S.cur = null; }); break;
      case "newgame":
        if (!confirmNew) { confirmNew = true; render(); break; }
        confirmNew = false; overlay = null;
        draft = Object.assign({}, S.cfg, { names: S.teams.map(t => t.name) });
        S = null; resetTimer(); persist(); render(); break;
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
    if (e.key === " ") { e.preventDefault(); if (r.shown && !r.revealed && !timer.running) { startTimer(); act(() => {}); } }
    else if (e.key === "r" || e.key === "R" || e.key === "Enter") act(reveal);
    else if (e.key === "b" || e.key === "B") act(backToBoard);
  });

  render();
})();
