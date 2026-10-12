/* UT330 Lock It In: host controlled, every team answers every question. */
(function () {
  "use strict";

  const STORE_GAME = "lockitin-game-v1";
  const STORE_BANK = "lockitin-bank-v1";
  const LETTERS = ["A", "B", "C", "D"];
  const LIFELINES = [
    { key: "double", label: "Double" },
    { key: "fifty", label: "50:50" },
    { key: "ask", label: "Ask host" }
  ];

  const app = document.getElementById("app");

  // ---------- storage ----------
  function load(key) {
    try { const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : null; } catch (e) { return null; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* storage unavailable */ }
  }
  function drop(key) {
    try { localStorage.removeItem(key); } catch (e) { /* ignore */ }
  }

  let Q = load(STORE_BANK) || QUESTIONS;

  function freshGame(names, secs) {
    return {
      phase: "play",
      teams: names.map(n => ({ name: n, adj: 0, used: { double: null, fifty: null, ask: null } })),
      secs: secs,
      qi: 0,
      rec: {}
    };
  }

  let S = load(STORE_GAME);
  if (window.claude && window.claude.hot && window.claude.hot.data && window.claude.hot.data.S) S = window.claude.hot.data.S;
  let setupDraft = { names: ["Team 1", "Team 2", "Team 3", "Team 4"], secs: 30 };
  let overlay = null; // "scores" | "edit" | "menu"
  let timer = { end: 0, left: null, running: false, done: false };

  function persist() { if (S) save(STORE_GAME, S); }

  // ---------- helpers ----------
  function esc(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function rec(i) {
    if (!S.rec[i]) S.rec[i] = { picks: {}, doubled: [], fifty: [], wagers: {}, revealed: false, shown: Q[i].kind === "q" };
    return S.rec[i];
  }
  function hash(str) { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) | 0; return Math.abs(h); }
  function removedByFifty(i) {
    const q = Q[i];
    const wrong = [0, 1, 2, 3].filter(x => x !== q.answer);
    const keep = wrong[hash(q.prompt) % 3];
    return wrong.filter(x => x !== keep);
  }
  function points(t, i) {
    const q = Q[i], r = S.rec[i];
    if (!q || !r || !r.revealed) return 0;
    const p = r.picks[t];
    if (q.kind !== "q") {
      const w = Number(r.wagers[t]) || 0;
      if (p == null) return 0;
      return p === q.answer ? w : -w;
    }
    if (p !== q.answer) return 0;
    let v = q.value;
    if (r.doubled.includes(t)) v *= 2;
    if (r.fifty.length && !r.fifty.includes(t)) v = Math.round(v / 2);
    return v;
  }
  function score(t, before) {
    let s = S.teams[t].adj;
    const end = before == null ? Q.length : before;
    for (let i = 0; i < end; i++) s += points(t, i);
    return s;
  }
  function maxWager(t, i) {
    const s = score(t, i);
    return Q[i].kind === "final" ? Math.max(s, 0) : Math.max(s, 500);
  }
  function fmt(n) { return (n < 0 ? "−" : "") + Math.abs(n).toLocaleString("en-US"); }

  // ---------- timer ----------
  function startTimer() {
    timer = { end: Date.now() + S.secs * 1000, left: S.secs, running: true, done: false };
    paintTimer();
  }
  function stopTimer() { timer.running = false; paintTimer(); }
  function resetTimer() { timer = { end: 0, left: null, running: false, done: false }; }
  function toggleTimer() { if (timer.running) stopTimer(); else startTimer(); }
  function tick() {
    if (timer.running) {
      const left = Math.max(0, (timer.end - Date.now()) / 1000);
      timer.left = left;
      if (left <= 0) { timer.running = false; timer.done = true; buzz(); }
      paintTimer();
    }
  }
  setInterval(tick, 100);
  function paintTimer() {
    const el = document.getElementById("timer");
    if (!el) return;
    const secs = S ? S.secs : 30;
    const left = timer.left == null ? secs : timer.left;
    el.style.setProperty("--p", String(left / secs));
    el.classList.toggle("out", timer.done);
    el.querySelector("span").textContent = timer.done ? "Lock in" : String(Math.ceil(left));
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
    } catch (e) { /* no sound available */ }
  }

  // ---------- actions ----------
  const act = {
    pick(t, l) {
      const r = rec(S.qi);
      if (r.revealed || !r.shown) return;
      r.picks[t] = r.picks[t] === l ? undefined : l;
      if (r.picks[t] === undefined) delete r.picks[t];
    },
    life(t, key) {
      const q = Q[S.qi], r = rec(S.qi), team = S.teams[t];
      if (q.kind !== "q" || r.revealed) return;
      if (team.used[key] === S.qi) {
        team.used[key] = null;
        if (key === "double") r.doubled = r.doubled.filter(x => x !== t);
        if (key === "fifty") r.fifty = r.fifty.filter(x => x !== t);
        return;
      }
      if (team.used[key] != null) return;
      team.used[key] = S.qi;
      if (key === "double") r.doubled.push(t);
      if (key === "fifty") r.fifty.push(t);
    },
    show() { const r = rec(S.qi); if (!r.shown) { r.shown = true; resetTimer(); } },
    reveal() {
      const r = rec(S.qi);
      if (!r.shown) return act.show();
      r.revealed = !r.revealed;
      if (r.revealed) stopTimer();
    },
    next() {
      if (S.qi < Q.length - 1) { S.qi++; resetTimer(); rec(S.qi); }
      else { S.phase = "end"; }
    },
    prev() { if (S.phase === "end") { S.phase = "play"; return; } if (S.qi > 0) { S.qi--; resetTimer(); } },
    jump(i) { S.qi = i; S.phase = "play"; resetTimer(); rec(i); overlay = null; },
    adj(t, n) { S.teams[t].adj += n; }
  };

  function run(name, ...args) {
    act[name](...args);
    persist();
    render();
  }

  // ---------- views ----------
  function viewSetup() {
    const saved = load(STORE_GAME);
    return `
    <section class="setup" style="grid-row: 1 / -1">
      <div>
        <h1>Lock It In <span>UT330</span></h1>
        <h3>How it plays</h3>
        <ol class="rules">
          <li>Every team answers every question. Nobody sits out.</li>
          <li>Talk it over in your team chat while the clock runs.</li>
          <li>When the host counts down, captains send <b>one letter</b> in the Zoom chat at the same time.</li>
          <li>Right answers score the question's points. Wrong answers score zero.</li>
          <li><b>Daily Doubles</b> are visual or video questions. Bet up to your score, or up to 500 if you have less.</li>
          <li>The <b>Final Wager</b> closes the game. Bet any part of your score.</li>
          <li>Each team gets three lifelines for the whole game. <b>Double</b> doubles your points on one question; call it before the timer starts. <b>50:50</b> removes two wrong answers for everyone, and every other team earns half points on that question. <b>Ask host</b> lets you ask one yes or no question.</li>
        </ol>
      </div>
      <form class="panel" id="setup-form">
        <h3>Teams</h3>
        <div class="team-rows">
          ${setupDraft.names.map((n, i) => `
            <div class="team-row">
              <input id="team-name-${i}" data-i="${i}" value="${esc(n)}" aria-label="Team ${i + 1} name">
              ${setupDraft.names.length > 2 ? `<button type="button" class="btn" data-remove="${i}" aria-label="Remove team ${i + 1}">Remove</button>` : ""}
            </div>`).join("")}
        </div>
        <div class="row">
          ${setupDraft.names.length < 8 ? `<button type="button" class="btn" id="add-team">Add a team</button>` : ""}
        </div>
        <div class="field">
          <label for="secs">Answer clock</label>
          <select id="secs">
            ${[20, 30, 45, 60, 90].map(s => `<option value="${s}" ${s === setupDraft.secs ? "selected" : ""}>${s} seconds</option>`).join("")}
          </select>
        </div>
        <p class="note">${Q.length} questions: ${Q.filter(q => q.kind === "q").length} regular, ${Q.filter(q => q.kind === "dd").length} Daily Doubles, and a Final Wager.</p>
        <div class="row">
          <button type="submit" class="btn primary">Start the game</button>
          ${saved && saved.teams ? `<button type="button" class="btn" id="resume">Resume saved game</button>` : ""}
          <button type="button" class="btn" id="open-edit">Edit questions</button>
        </div>
      </form>
    </section>`;
  }

  function viewTop() {
    const q = Q[S.qi];
    const label = q.kind === "dd" ? "Daily Double" : q.kind === "final" ? "Final Wager" : `<b>${q.value}</b> points`;
    return `
    <header class="topbar">
      <div class="brand">Lock It In <span>UT330</span></div>
      <nav class="pips" aria-label="Questions">
        ${Q.map((x, i) => `<button class="pip ${x.kind} ${i === S.qi ? "now" : ""} ${S.rec[i] && S.rec[i].revealed ? "done" : ""}" data-jump="${i}" title="Question ${i + 1}" aria-label="Go to question ${i + 1}"></button>`).join("")}
      </nav>
      <div class="qmeta">Question ${S.qi + 1} of ${Q.length} &nbsp;·&nbsp; ${label}</div>
      <button class="timer" id="timer" title="Start or stop the clock (space)" aria-label="Answer clock"><span>${S.secs}</span></button>
    </header>`;
  }

  function viewMedia(m) {
    if (!m) return "";
    return `<div class="media">${m.svg || ""}</div>`;
  }
  function viewClip(m) {
    if (!m || m.type !== "video") return "";
    return `<div class="clip"><a href="${esc(m.url)}" target="_blank" rel="noopener">▶ ${esc(m.label || "Play the clip")}</a><small>${esc(m.note || "Opens in a new tab.")}</small></div>`;
  }
  function viewExplain(q) {
    return `<div class="explain"><span><b>${LETTERS[q.answer]}. ${esc(q.options[q.answer])}.</b> ${esc(q.explain || "")}</span><cite>${esc(q.source || "")}</cite></div>`;
  }

  function viewStage() {
    const q = Q[S.qi], r = rec(S.qi);
    if (!r.shown) {
      const isFinal = q.kind === "final";
      const tag = q.media ? (q.media.type === "video" ? "Video question" : "Visual question") : q.category;
      return `<section class="stage"><div class="splash">
        <h2>${isFinal ? "Final<br>Wager" : "Daily<br>Double"}</h2>
        <span class="tag">${esc(tag)}</span>
        <p>${isFinal
          ? "Category: " + esc(q.category) + ". Captains, send your wager to the host privately. Bet any part of your score."
          : "Category: " + esc(q.category) + ". Captains, send your wager to the host privately. Up to your score, or up to 500 if you have less."}</p>
      </div></section>`;
    }
    const gone = r.fifty.length && !r.revealed ? removedByFifty(S.qi) : (r.fifty.length ? removedByFifty(S.qi) : []);
    const whoPicked = l => S.teams.map((tm, t) => r.picks[t] === l ? `<i>${esc(tm.name)}</i>` : "").join("");
    return `
    <section class="stage ${r.revealed ? "revealed" : ""}">
      <div class="question-row ${q.media ? "has-media" : ""}">
        ${viewMedia(q.media)}
        <div class="qtext">
          <p class="category">${esc(q.category)}</p>
          <h1 class="prompt">${esc(q.prompt)}</h1>
          ${viewClip(q.media)}
          ${q.media && r.revealed ? viewExplain(q) : ""}
        </div>
      </div>
      <div class="options">
        ${q.options.map((o, i) => {
          const cls = ["opt"];
          if (gone.includes(i) && !r.revealed) cls.push("gone");
          if (r.revealed && i === q.answer) cls.push("right");
          if (r.revealed && i !== q.answer && Object.values(r.picks).includes(i)) cls.push("wrong-picked");
          return `<div class="${cls.join(" ")}">
            <span class="letter">${LETTERS[i]}</span>
            <span class="text">${esc(o)}${r.revealed ? `<span class="who">${whoPicked(i)}</span>` : ""}</span>
          </div>`;
        }).join("")}
      </div>
      ${r.revealed && !q.media ? viewExplain(q) : `<div></div>`}
    </section>`;
  }

  function viewTeams() {
    const q = Q[S.qi], r = rec(S.qi);
    return `<section class="teams" aria-label="Teams">
      ${S.teams.map((tm, t) => {
        const sc = score(t);
        const p = r.picks[t];
        let body = "";
        if (q.kind !== "q" && !r.revealed) {
          const max = maxWager(t, S.qi);
          body += `<label class="wager" for="wager-${t}">Wager
            <input id="wager-${t}" data-wager="${t}" type="number" inputmode="numeric" min="0" max="${max}" step="50" value="${r.wagers[t] != null ? r.wagers[t] : ""}" placeholder="max ${fmt(max)}" ${r.revealed ? "disabled" : ""}></label>`;
        }
        body += `<div class="picks">${LETTERS.map((L, i) => {
          let cls = "";
          if (r.revealed && p === i) cls = i === q.answer ? "is-right" : "is-wrong";
          return `<button data-pick="${t}:${i}" aria-pressed="${p === i}" class="${cls}" ${(r.revealed || !r.shown) ? "disabled" : ""} aria-label="${esc(tm.name)} picks ${L}">${L}</button>`;
        }).join("")}</div>`;
        if (q.kind === "q") {
          body += `<div class="lifelines">${LIFELINES.map(lf => {
            const u = tm.used[lf.key];
            const cls = u === S.qi ? "active" : (u != null ? "spent" : "");
            return `<button data-life="${t}:${lf.key}" class="${cls}" ${r.revealed ? "disabled" : ""} title="${u != null && u !== S.qi ? "Used on question " + (u + 1) : ""}">${lf.label}</button>`;
          }).join("")}</div>`;
        }
        if (r.revealed) {
          const d = points(t, S.qi);
          const bet = q.kind !== "q" ? (r.picks[t] == null ? "<small> no answer</small>" : `<small> on a ${fmt(Number(r.wagers[t]) || 0)} bet</small>`) : "";
          body += `<div class="delta ${d > 0 ? "up" : d < 0 ? "down" : "zero"}">${d > 0 ? "+" : ""}${fmt(d)}${bet}</div>`;
        }
        return `<article class="team">
          <div class="team-head"><span class="team-name" title="${esc(tm.name)}">${esc(tm.name)}</span><span class="team-score ${sc < 0 ? "neg" : ""}">${fmt(sc)}</span></div>
          ${body}
        </article>`;
      }).join("")}
    </section>`;
  }

  function viewHost() {
    const q = Q[S.qi], r = rec(S.qi);
    const mainLabel = !r.shown ? "Show the question" : r.revealed ? "Hide answer" : "Reveal answer";
    const last = S.qi === Q.length - 1;
    return `<footer class="hostbar">
      <button class="btn" data-act="prev" ${S.qi === 0 ? "disabled" : ""}>Back<kbd>←</kbd></button>
      <button class="btn" data-act="timer" ${!r.shown ? "disabled" : ""}>${timer.running ? "Stop clock" : "Start clock"}<kbd>Space</kbd></button>
      <button class="btn primary" data-act="reveal">${mainLabel}<kbd>R</kbd></button>
      <button class="btn" data-act="next">${last ? "Final results" : "Next"}<kbd>→</kbd></button>
      <span class="spacer"></span>
      <button class="btn" data-act="scores">Scoreboard<kbd>S</kbd></button>
      <button class="btn" data-act="menu">Menu</button>
    </footer>`;
  }

  function viewBoard(withAdjust) {
    const order = S.teams.map((tm, t) => ({ t, name: tm.name, s: score(t) })).sort((a, b) => b.s - a.s);
    const top = Math.max(1, ...order.map(o => o.s));
    return `<div class="board">${order.map((o, k) => `
      <div class="board-row">
        <span class="rank">${k + 1}</span>
        <div class="bar-wrap"><span class="bar-name">${esc(o.name)}</span><span class="bar" style="width:${Math.max(0, o.s) / top * 100}%"></span></div>
        <span class="pts">${fmt(o.s)}</span>
        ${withAdjust ? `<span class="adj"><button data-adj="${o.t}:-100" aria-label="Take 100 from ${esc(o.name)}">−100</button><button data-adj="${o.t}:100" aria-label="Give 100 to ${esc(o.name)}">+100</button></span>` : "<span></span>"}
      </div>`).join("")}</div>`;
  }

  function viewEnd() {
    const order = S.teams.map((tm, t) => ({ name: tm.name, s: score(t) })).sort((a, b) => b.s - a.s);
    const tie = order.length > 1 && order[0].s === order[1].s;
    return `<section class="stage" style="grid-row: 2 / 4">
      <div class="panel winner">
        <p class="category">${tie ? "It's a tie" : "Winner"}</p>
        <h2>${esc(tie ? order.filter(o => o.s === order[0].s).map(o => o.name).join(" & ") : order[0].name)}</h2>
        <div style="width:100%">${viewBoard(false)}</div>
      </div>
    </section>
    <footer class="hostbar">
      <button class="btn" data-act="prev">Back to the last question</button>
      <span class="spacer"></span>
      <button class="btn" data-act="menu">Menu</button>
    </footer>`;
  }

  function viewOverlay() {
    if (overlay === "scores") {
      return `<div class="overlay" data-close><div class="panel" role="dialog" aria-label="Scoreboard">
        <div class="row" style="justify-content:space-between;align-items:center"><h2>Scoreboard</h2><button class="btn" data-act="close">Close<kbd>Esc</kbd></button></div>
        ${viewBoard(true)}
        <p class="note">Use the plus and minus buttons to fix a score by hand.</p>
      </div></div>`;
    }
    if (overlay === "menu") {
      const finalAt = Q.findIndex(q => q.kind === "final");
      return `<div class="overlay" data-close><div class="panel" role="dialog" aria-label="Menu">
        <div class="row" style="justify-content:space-between;align-items:center"><h2>Menu</h2><button class="btn" data-act="close">Close<kbd>Esc</kbd></button></div>
        <div class="row">
          ${finalAt > -1 ? `<button class="btn primary" data-jump="${finalAt}">Skip to the Final Wager</button>` : ""}
          <button class="btn" data-act="end">Show final results</button>
          <button class="btn" data-act="edit">Edit questions</button>
        </div>
        <div class="row">
          <button class="btn" data-act="newgame" id="newgame">${confirmNew ? "Click again to end this game and start over" : "New game"}</button>
        </div>
        <p class="note">Scores save in this browser as you play, so a refresh won't lose the game.</p>
      </div></div>`;
    }
    if (overlay === "edit") {
      return `<div class="overlay"><div class="panel" role="dialog" aria-label="Edit questions">
        <div class="row" style="justify-content:space-between;align-items:center"><h2>Edit questions</h2><button class="btn" data-act="close">Close</button></div>
        <p class="note">This is the question list as JSON. Change it here for this browser, or edit questions.js in the repo to change it for good. Answer is 0 for A through 3 for D. Scores stay attached to question numbers.</p>
        <textarea id="bank" spellcheck="false">${esc(JSON.stringify(Q, null, 2))}</textarea>
        <div class="row">
          <button class="btn primary" data-act="applybank">Apply</button>
          <button class="btn" data-act="resetbank">Restore questions.js</button>
          <span class="msg" id="bank-msg"></span>
        </div>
      </div></div>`;
    }
    return "";
  }

  let confirmNew = false;

  function render() {
    if (!S || S.phase === "setup") {
      app.innerHTML = viewSetup() + viewOverlay();
    } else if (S.phase === "end") {
      app.innerHTML = viewTop() + viewEnd() + viewOverlay();
    } else {
      app.innerHTML = viewTop() + viewStage() + viewTeams() + viewHost() + viewOverlay();
    }
    paintTimer();
  }

  // ---------- events ----------
  function startGame() {
    const names = setupDraft.names.map((n, i) => n.trim() || `Team ${i + 1}`);
    S = freshGame(names, setupDraft.secs);
    rec(0);
    persist();
    resetTimer();
    render();
  }

  app.addEventListener("submit", e => {
    e.preventDefault();
    if (e.target.id === "setup-form") startGame();
  });

  app.addEventListener("input", e => {
    const el = e.target;
    if (el.dataset.i != null) setupDraft.names[Number(el.dataset.i)] = el.value;
    if (el.id === "secs") setupDraft.secs = Number(el.value);
    if (el.dataset.wager != null) {
      const t = Number(el.dataset.wager);
      const r = rec(S.qi);
      r.wagers[t] = el.value === "" ? undefined : Number(el.value);
      persist();
    }
  });

  app.addEventListener("change", e => {
    const el = e.target;
    if (el.id === "secs") setupDraft.secs = Number(el.value);
    if (el.dataset.wager != null) {
      const t = Number(el.dataset.wager);
      const r = rec(S.qi);
      if (el.value === "") { delete r.wagers[t]; }
      else {
        const max = maxWager(t, S.qi);
        r.wagers[t] = Math.min(max, Math.max(0, Math.round(Number(el.value) || 0)));
      }
      persist();
      render();
    }
  });

  app.addEventListener("click", e => {
    const b = e.target.closest("button, [data-close]");
    if (!b) return;
    if (b.hasAttribute("data-close") && b === e.target) { overlay = null; confirmNew = false; render(); return; }
    if (b.tagName !== "BUTTON") return;
    const d = b.dataset;

    if (b.id === "add-team") { setupDraft.names.push(`Team ${setupDraft.names.length + 1}`); render(); return; }
    if (d.remove != null) { setupDraft.names.splice(Number(d.remove), 1); render(); return; }
    if (b.id === "resume") { S = load(STORE_GAME); S.phase = S.phase === "setup" ? "play" : S.phase; resetTimer(); render(); return; }
    if (b.id === "open-edit") { overlay = "edit"; render(); return; }
    if (b.id === "timer") { toggleTimer(); render(); return; }

    if (d.pick) { const [t, l] = d.pick.split(":").map(Number); run("pick", t, l); return; }
    if (d.life) { const [t, k] = d.life.split(":"); run("life", Number(t), k); return; }
    if (d.jump != null) { run("jump", Number(d.jump)); return; }
    if (d.adj) { const [t, n] = d.adj.split(":").map(Number); run("adj", t, n); return; }

    switch (d.act) {
      case "prev": run("prev"); break;
      case "next": run("next"); break;
      case "reveal": run("reveal"); break;
      case "timer": toggleTimer(); render(); break;
      case "scores": overlay = "scores"; render(); break;
      case "menu": overlay = "menu"; confirmNew = false; render(); break;
      case "close": overlay = null; confirmNew = false; render(); break;
      case "end": S.phase = "end"; overlay = null; persist(); render(); break;
      case "edit": overlay = "edit"; render(); break;
      case "newgame":
        if (!confirmNew) { confirmNew = true; render(); break; }
        confirmNew = false; overlay = null; drop(STORE_GAME);
        if (S) setupDraft = { names: S.teams.map(t => t.name), secs: S.secs };
        S = null; resetTimer(); render(); break;
      case "applybank": applyBank(); break;
      case "resetbank":
        Q = QUESTIONS; drop(STORE_BANK);
        if (S && S.qi >= Q.length) S.qi = Q.length - 1;
        render(); showBankMsg("Restored the questions from questions.js.", true); break;
    }
  });

  function showBankMsg(text, ok) {
    const m = document.getElementById("bank-msg");
    if (m) { m.textContent = text; m.className = "msg " + (ok ? "good" : "bad"); }
  }

  function applyBank() {
    const ta = document.getElementById("bank");
    let data;
    try { data = JSON.parse(ta.value); } catch (err) { showBankMsg("That isn't valid JSON: " + err.message, false); return; }
    if (!Array.isArray(data) || !data.length) { showBankMsg("The list needs at least one question.", false); return; }
    for (let i = 0; i < data.length; i++) {
      const q = data[i];
      if (!["q", "dd", "final"].includes(q.kind)) { showBankMsg(`Question ${i + 1}: kind must be q, dd, or final.`, false); return; }
      if (!Array.isArray(q.options) || q.options.length !== 4) { showBankMsg(`Question ${i + 1} needs exactly four options.`, false); return; }
      if (![0, 1, 2, 3].includes(q.answer)) { showBankMsg(`Question ${i + 1}: answer must be 0, 1, 2, or 3.`, false); return; }
      if (q.kind === "q" && !(q.value > 0)) { showBankMsg(`Question ${i + 1} needs a point value.`, false); return; }
    }
    Q = data;
    save(STORE_BANK, Q);
    if (S && S.qi >= Q.length) S.qi = Q.length - 1;
    persist();
    render();
    showBankMsg(`Saved ${Q.length} questions in this browser.`, true);
  }

  document.addEventListener("keydown", e => {
    const tag = (e.target.tagName || "").toLowerCase();
    if (["input", "textarea", "select"].includes(tag)) return;
    if (e.key === "Escape" && overlay) { overlay = null; confirmNew = false; render(); return; }
    if (!S || S.phase === "setup" || overlay) return;
    if (e.key === " ") { e.preventDefault(); if (rec(S.qi).shown && S.phase === "play") { toggleTimer(); render(); } }
    else if (e.key === "r" || e.key === "R") { if (S.phase === "play") run("reveal"); }
    else if (e.key === "ArrowRight") run("next");
    else if (e.key === "ArrowLeft") run("prev");
    else if (e.key === "s" || e.key === "S") { overlay = "scores"; render(); }
    else if (e.key === "Enter" && !rec(S.qi).shown) run("show");
  });

  if (window.claude && window.claude.hot && window.claude.hot.snapshot) {
    window.claude.hot.snapshot(() => ({ S }));
  }

  render();
})();
