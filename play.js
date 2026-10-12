/* Design Jeopardy team page. One device per team: join with the room code, then lock in answers privately. */
(function () {
  "use strict";

  const LETTERS = ["A", "B", "C", "D"];
  const app = document.getElementById("play");
  const params = new URLSearchParams(location.search);

  let code = (params.get("room") || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
  let me = null;           // { team, token }
  let state = null;        // what the host publishes
  let mine = null;         // this team's record for the current question: { dbl, sub }
  let claimed = null;      // which teams are taken, on the join screen
  let offset = 0;          // server clock minus this clock
  let picked = null;       // answer tapped but not yet locked
  let wagerDraft = "";
  let note = "";           // a short message under the main content
  let busy = false;
  let lastShape = "";
  let stopped = null;      // the Special this device already pressed Stop on

  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function fmt(n) { n = Number(n) || 0; return (n < 0 ? "−" : "") + Math.abs(n).toLocaleString("en-US"); }
  function signed(n) { return (n > 0 ? "+" : "") + fmt(n); }
  function serverNow() { return Date.now() + offset; }
  function saveMe() { try { if (me) localStorage.setItem("dj-team-" + code, JSON.stringify(me)); else localStorage.removeItem("dj-team-" + code); } catch (e) { /* storage off */ } }
  function loadMe() { try { const r = localStorage.getItem("dj-team-" + code); return r ? JSON.parse(r) : null; } catch (e) { return null; } }

  async function api(method, path, body) {
    const res = await fetch("/api/rooms/" + code + path, { method, headers: { "content-type": "application/json" }, body: body ? JSON.stringify(body) : undefined, cache: "no-store" });
    const data = await res.json().catch(() => ({}));
    if (data.now) offset = data.now - Date.now();
    if (!res.ok) { const e = new Error(data.message || "Couldn't reach the game."); e.code = data.error; throw e; }
    return data;
  }

  // ---------- joining ----------
  async function loadRoom() {
    try {
      const d = await api("GET", "?claims=1");
      state = d.state; claimed = d.claimed; note = "";
      me = loadMe();
      if (me) { try { await api("POST", "/claim", { team: me.team, token: me.token }); } catch (e) { me = null; saveMe(); } }
    } catch (e) {
      note = e.code === "no_room" ? "That room code doesn't exist. Check the main screen." : "Couldn't reach the game. Check your connection.";
      code = ""; state = null;
    }
    render(true);
  }
  async function claim(t) {
    if (busy) return; busy = true;
    try { const d = await api("POST", "/claim", { team: t }); me = { team: t, token: d.token }; saveMe(); note = ""; }
    catch (e) { note = e.message; const d = await api("GET", "?claims=1").catch(() => null); if (d) claimed = d.claimed; }
    busy = false; render(true);
  }

  // ---------- staying in sync ----------
  async function poll() {
    if (!code || !me) return;
    try {
      const d = await api("GET", `?team=${me.team}&token=${encodeURIComponent(me.token)}`);
      if (d.me && d.me.lost) { me = null; saveMe(); note = "The host freed your team. Join again."; await loadRoom(); return; }
      const prevQ = state && state.qid;
      state = d.state; mine = d.me || null;
      if (!state || state.qid !== prevQ) { picked = null; wagerDraft = ""; note = ""; }
      render(false);
    } catch (e) { /* keep showing the last screen; the next poll retries */ }
  }
  function loop() { poll().finally(() => setTimeout(loop, state && state.phase === "question" && state.startedAt ? 700 : 1200)); }

  setInterval(() => {
    const el = document.getElementById("count");
    if (!el || !state || !state.deadline) return;
    const left = Math.max(0, (state.deadline - serverNow()) / 1000);
    el.textContent = left > 0 ? String(Math.ceil(left)) : "Time";
    const bar = document.getElementById("countbar");
    if (bar) bar.style.width = (100 * left / state.secs) + "%";
    if (left <= 0 && !(mine && mine.sub && mine.sub.pick != null) && !document.getElementById("timeup")) render(true);
  }, 100);

  // ---------- actions ----------
  async function lockAnswer() {
    if (busy || picked == null) return; busy = true;
    try { const d = await api("POST", "/answer", { team: me.team, token: me.token, qid: state.qid, pick: picked }); mine = Object.assign({}, mine, { sub: { pick: picked, at: d.at } }); note = ""; }
    catch (e) { note = e.code === "late" ? "Time ran out before your answer arrived." : e.message; if (e.code === "lost") { me = null; saveMe(); } }
    busy = false; render(true);
  }
  async function lockWager() {
    if (busy) return;
    const max = (state.maxWager || [])[me.team] || 0;
    const w = Math.round(Number(wagerDraft));
    if (!(w >= 0)) { note = "Enter a number."; render(true); return; }
    if (w > max) { note = `The most you can bet is ${fmt(max)}.`; render(true); return; }
    busy = true;
    try { const d = await api("POST", "/wager", { team: me.team, token: me.token, qid: state.qid, wager: w }); mine = Object.assign({}, mine, { sub: Object.assign({}, mine && mine.sub, { wager: d.wager }) }); note = ""; }
    catch (e) { note = e.message; }
    busy = false; render(true);
  }
  async function sendStop(aim) {
    if (busy) return; busy = true; stopped = state.qid;
    try { await api("POST", "/stop", { team: me.team, token: me.token, qid: state.qid, aim }); note = ""; }
    catch (e) { note = e.message; stopped = null; }
    busy = false; render(true);
  }
  async function setDouble(on) {
    if (busy) return; busy = true;
    try { const d = await api("POST", "/double", { team: me.team, token: me.token, qid: state.qid, on }); mine = Object.assign({}, mine, { dbl: d.dbl }); note = ""; }
    catch (e) { note = e.message; }
    busy = false; render(true);
  }

  // ---------- views ----------
  function header() {
    if (!me || !state) return `<header class="p-head"><span class="p-brand">Design <b>Jeopardy</b></span></header>`;
    const score = (state.scores || [])[me.team] || 0;
    return `<header class="p-head"><span class="p-team">${esc(state.teams[me.team])}</span><span class="p-score ${score < 0 ? "neg" : ""}">${fmt(score)}</span></header>`;
  }
  function placeOf(t) {
    const s = state.scores || [];
    return 1 + s.filter(x => x > s[t]).length;
  }
  function ordinal(n) { const s = ["th", "st", "nd", "rd"], v = n % 100; return n + (s[(v - 20) % 10] || s[v] || s[0]); }

  function viewCode() {
    return `<section class="p-card">
      <h1 class="p-title">Join the game</h1>
      <form id="codeform" class="p-form">
        <label for="code">Room code from the main screen</label>
        <input id="code" autocomplete="off" autocapitalize="characters" maxlength="4" inputmode="text" value="${esc(code)}" placeholder="ABCD">
        <button class="p-btn primary" type="submit">Join</button>
      </form>
    </section>`;
  }
  function viewTeams() {
    return `<section class="p-card">
      <h1 class="p-title">Which team are you?</h1>
      <p class="p-sub">One device per team. You'll answer for the whole team.</p>
      <div class="p-list">${state.teams.map((n, t) => `<button class="p-btn team-pick" data-claim="${t}" ${claimed && claimed[t] ? "disabled" : ""}>${esc(n)}${claimed && claimed[t] ? " <small>taken</small>" : ""}</button>`).join("")}</div>
      <button class="p-btn ghost" data-act="refresh">Refresh list</button>
    </section>`;
  }

  function viewWaiting(title, sub) { return `<section class="p-card center"><h1 class="p-title">${title}</h1>${sub ? `<p class="p-sub">${sub}</p>` : ""}</section>`; }

  function viewGame() {
    const s = state, t = me.team;
    if (s.phase === "lobby") return viewWaiting("You're in", "Watch the main screen. The game starts soon.");
    if (s.phase === "board") return viewWaiting(s.picker === t ? "Your team picks next" : "Watch the board", s.picker === t ? "Tell the host which category and value you want." : `${esc(s.teams[s.picker] || "")} picks the next square.`);
    if (s.phase === "results") {
      const gain = (s.roundPts || [])[t] || 0;
      return viewWaiting(`Round ${s.round} done`, `${signed(gain)} this round. You're in ${ordinal(placeOf(t))} place.`);
    }
    if (s.phase === "end") return viewWaiting(placeOf(t) === 1 ? "You won" : `You finished ${ordinal(placeOf(t))}`, `Final score ${fmt(s.scores[t])}.`);

    const label = s.kind === "final" ? "Final Jeopardy" : s.kind === "dd" ? "Daily Double" : s.kind === "special" ? `Special · ${fmt(s.value)}` : `${esc(s.cat)} · ${fmt(s.value)}`;
    const sub = mine && mine.sub ? mine.sub : {};
    const owner = s.onlyTeam == null ? null : Number(s.onlyTeam);
    const ownerName = owner == null ? "" : esc(s.teams[owner] || "");

    if (s.phase === "nospecial") {
      if (owner === t) return `<section class="p-card center reveal bad"><h1 class="p-title">No Special</h1><p class="p-sub">The gremlins took it this round. You didn't lose any points.</p></section>`;
      return viewWaiting(`${ownerName} rolled No Special`, "The gremlins took it. Watch the board.");
    }
    if (s.phase === "roll") {
      if (owner !== t) return viewWaiting(`${ownerName} is ${s.rollType === "wheel" ? "spinning the wheel" : s.rollType === "plinko" ? "dropping a Plinko chip" : "rolling"} for a Special`, "Watch the main screen.");
      if (sub.stop != null || stopped === s.qid) return viewWaiting(s.rollType === "wheel" ? "Spinning" : s.rollType === "plinko" ? "Dropped" : "Stopped", "Watch the main screen to see what you're playing for.");
      if (s.rollType === "wheel") return `<section class="p-card center"><h1 class="p-title">Your Special</h1><p class="p-sub">Spin the wheel and watch it on the main screen.</p><button class="p-btn primary huge" data-act="stop" ${busy ? "disabled" : ""}>Spin</button></section>`;
      if (s.rollType === "plinko") return `<section class="p-card center"><h1 class="p-title">Your Special</h1><p class="p-sub">Pick where to drop your chip, then watch it on the main screen.</p><div class="p-aims">${["Far left", "Left", "Middle", "Right", "Far right"].map((n, a) => `<button class="p-btn" data-aim="${a}" ${busy ? "disabled" : ""}><b>${a + 1}</b>${n}</button>`).join("")}</div></section>`;
      return `<section class="p-card center"><h1 class="p-title">Your Special</h1><p class="p-sub">Watch the board on the main screen and stop it when you like.</p><button class="p-btn primary huge" data-act="stop" ${busy ? "disabled" : ""}>Stop</button></section>`;
    }
    if (owner != null && owner !== t) {
      if (s.phase === "reveal") {
        const r = (s.results || [])[owner] || {};
        const got = r.pick != null && r.pick === s.answer;
        return viewWaiting(`${ownerName} ${got ? `won ${fmt(s.value)}` : "missed their Special"}`, `Answer: ${LETTERS[s.answer]}. ${esc(s.options[s.answer])}`);
      }
      return viewWaiting(`${ownerName}'s Special`, `They're playing for ${fmt(s.value)}. Only they answer this one.`);
    }

    if (s.phase === "splash") {
      const max = (s.maxWager || [])[t] || 0;
      if (sub.wager != null) return `<section class="p-card center"><p class="p-kicker">${label}</p><h1 class="p-title">Wager locked: ${fmt(sub.wager)}</h1><p class="p-sub">Watch the main screen for the question.</p></section>`;
      return `<section class="p-card">
        <p class="p-kicker">${label}</p>
        <h1 class="p-title">How much will you bet?</h1>
        <p class="p-sub">Category: ${esc(s.cat)}. You can bet up to ${fmt(max)}. Right answers win the bet, wrong answers lose it.</p>
        <form id="wagerform" class="p-form">
          <label for="wager">Your wager</label>
          <input id="wager" type="number" inputmode="numeric" min="0" max="${max}" step="50" value="${esc(wagerDraft)}" placeholder="0 to ${max}">
          <div class="p-quick">${[0, Math.round(max / 4 / 50) * 50, Math.round(max / 2 / 50) * 50, max].filter((v, i, a) => a.indexOf(v) === i).map(v => `<button type="button" class="p-btn ghost" data-wq="${v}">${v === max ? "All in" : fmt(v)}</button>`).join("")}</div>
          <button class="p-btn primary" type="submit" ${busy ? "disabled" : ""}>Lock wager</button>
        </form>
      </section>`;
    }

    if (s.phase === "question") {
      const open = !!s.startedAt;
      if (!open) {
        let dbl = "";
        if (s.kind === "q") {
          const used = mine && mine.dbl && mine.dbl !== s.qid;
          const on = mine && mine.dbl === s.qid;
          dbl = used ? `<p class="p-sub">Your team already used its Double.</p>`
            : `<button class="p-btn ${on ? "primary" : "ghost"} big" data-act="double">${on ? "Doubled. Tap to undo" : "Double this square"}</button><p class="p-sub">Once per game. Doubles your points if you get it right. Closes when the clock starts.</p>`;
        }
        return `<section class="p-card center"><p class="p-kicker">${label}</p><h1 class="p-title">Read the question on the main screen</h1><p class="p-sub">Answers open here when the clock starts.</p>${dbl}</section>`;
      }
      const left = s.deadline - serverNow();
      const top = `<div class="p-clock"><span id="count">${Math.max(0, Math.ceil(left / 1000))}</span><div class="p-bar"><span id="countbar"></span></div></div>`;
      if (sub.pick != null) {
        return `<section class="p-card center"><p class="p-kicker">${label}</p><h1 class="p-title">Locked in: ${LETTERS[sub.pick]}</h1><p class="p-sub">${esc(s.options[sub.pick])}</p><p class="p-sub">Wait for the reveal on the main screen.</p></section>`;
      }
      if (left <= 0) return `<section class="p-card center" id="timeup"><p class="p-kicker">${label}</p><h1 class="p-title">Time's up</h1><p class="p-sub">No answer from your team this time.</p></section>`;
      const rules = s.kind !== "q" ? ["Right wins your wager, wrong loses it."] : [];
      return `<section class="p-card">
        <p class="p-kicker">${label}</p>
        ${top}
        <div class="p-options">${s.options.map((o, i) => `<button class="p-opt ${picked === i ? "sel" : ""}" data-pick="${i}"><b>${LETTERS[i]}</b><span>${esc(o)}</span></button>`).join("")}</div>
        <button class="p-btn primary big" data-act="lock" ${picked == null || busy ? "disabled" : ""}>${picked == null ? "Tap an answer" : `Lock in ${LETTERS[picked]}`}</button>
        <p class="p-sub">${rules.join(" ")} You can't change it after you lock in.</p>
      </section>`;
    }

    if (s.phase === "reveal") {
      const r = (s.results || [])[t] || {};
      const right = r.pick != null && r.pick === s.answer;
      const title = r.pick == null ? "No answer" : right ? "Correct" : "Not this time";
      return `<section class="p-card center reveal ${r.pick == null ? "" : right ? "good" : "bad"}">
        <p class="p-kicker">${label}</p>
        <h1 class="p-title">${title}</h1>
        <p class="p-delta">${signed(r.delta || 0)}</p>
        <p class="p-sub">Answer: <b>${LETTERS[s.answer]}. ${esc(s.options[s.answer])}</b></p>
        ${r.pick != null && !right ? `<p class="p-sub">You picked ${LETTERS[r.pick]}. ${esc(s.options[r.pick])}</p>` : ""}
      </section>`;
    }
    return viewWaiting("Watch the main screen", "");
  }

  function render(force) {
    let body;
    if (!code || !state) body = viewCode();
    else if (!me) body = viewTeams();
    else body = viewGame();
    const shape = body + note;
    if (!force && shape === lastShape) return;
    const active = document.activeElement && document.activeElement.id;
    if (!force && active === "wager") return; // don't wipe a wager while it's being typed
    lastShape = shape;
    app.innerHTML = header() + body + (note ? `<p class="p-note">${esc(note)}</p>` : "");
  }

  // ---------- events ----------
  app.addEventListener("submit", e => {
    e.preventDefault();
    if (e.target.id === "codeform") {
      code = (document.getElementById("code").value || "").toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);
      if (code.length !== 4) { note = "Room codes are 4 letters."; render(true); return; }
      history.replaceState(null, "", "?room=" + code);
      loadRoom();
    }
    if (e.target.id === "wagerform") lockWager();
  });
  app.addEventListener("input", e => { if (e.target.id === "wager") wagerDraft = e.target.value; });
  app.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (!b || b.disabled) return;
    const d = b.dataset;
    if (d.claim != null) claim(Number(d.claim));
    else if (d.pick != null) { picked = Number(d.pick); render(true); }
    else if (d.wq != null) { wagerDraft = d.wq; render(true); }
    else if (d.act === "lock") lockAnswer();
    else if (d.act === "stop") sendStop();
    else if (d.aim != null) sendStop(Number(d.aim));
    else if (d.act === "double") setDouble(!(mine && mine.dbl === state.qid));
    else if (d.act === "refresh") loadRoom();
  });

  render(true);
  if (code) loadRoom().then(loop); else loop();
})();
