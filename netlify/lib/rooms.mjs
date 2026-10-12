/*
  Design Jeopardy live rooms.

  One room per game. Keys in the store:
    r/CODE/meta     { hostKey, n, createdAt }      private to the server
    r/CODE/state    what the host screen publishes; team devices read it
    r/CODE/watch    the host screen for watchers at /watch; answers only after the reveal
    r/CODE/t/I      one doc per team: { token, dbl, subs: { [qid]: { pick, at, wager, stop, aim } } }

  Only the host (holding hostKey) can change the state. Each team doc is
  written only by the device that claimed that team, so writes don't collide.
  The server stamps answer times, so "how fast you locked in" can't be faked.
*/

const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";
const LATE_GRACE_MS = 750;

function json(body, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" }
  });
}
function err(status, error, message) { return json({ error, message }, status); }
function newCode() { let c = ""; for (let i = 0; i < 4; i++) c += LETTERS[Math.floor(Math.random() * LETTERS.length)]; return c; }
function token() { return crypto.randomUUID(); }
async function body(req) { try { return await req.json(); } catch (e) { return {}; } }

/** store: { get(key) -> object|null, set(key, object) } */
export async function handle(req, store) {
  const url = new URL(req.url);
  const parts = url.pathname.replace(/^\/api\/?/, "").split("/").filter(Boolean);
  const now = Date.now();
  if (parts[0] !== "rooms") return err(404, "not_found", "Unknown address.");

  try {
    // Create a room
    if (parts.length === 1 && req.method === "POST") {
      const b = await body(req);
      const teams = Array.isArray(b.teams) ? b.teams.map(t => String(t).trim().slice(0, 40)).filter(Boolean) : [];
      if (teams.length < 2 || teams.length > 8) return err(400, "bad_teams", "A game needs 2 to 8 teams.");
      let code = "";
      for (let i = 0; i < 12; i++) { const c = newCode(); if (!(await store.get(`r/${c}/meta`))) { code = c; break; } }
      if (!code) return err(500, "no_code", "Couldn't make a room code. Try again.");
      const hostKey = token();
      await store.set(`r/${code}/meta`, { hostKey, n: teams.length, createdAt: now });
      await Promise.all(teams.map((_, i) => store.set(`r/${code}/t/${i}`, { token: null, dbl: null, subs: {} })));
      const state = { v: 0, phase: "lobby", teams, scores: teams.map(() => 0) };
      await store.set(`r/${code}/state`, state);
      return json({ code, hostKey, state, now });
    }

    const code = String(parts[1] || "").toUpperCase();
    const meta = await store.get(`r/${code}/meta`);
    if (!meta) return err(404, "no_room", "That room code doesn't exist.");
    const isHost = req.headers.get("x-host-key") === meta.hostKey;
    const action = parts[2] || "";
    const teamKey = i => `r/${code}/t/${i}`;

    // Team devices read the shared state (plus their own team's record)
    if (!action && req.method === "GET") {
      const state = await store.get(`r/${code}/state`);
      const out = { state, now };
      if (url.searchParams.get("claims") === "1") {
        const docs = await Promise.all(Array.from({ length: meta.n }, (_, i) => store.get(teamKey(i))));
        out.claimed = docs.map(d => !!(d && d.token));
      }
      const t = Number(url.searchParams.get("team"));
      const tok = url.searchParams.get("token");
      if (Number.isInteger(t) && t >= 0 && t < meta.n && tok) {
        const d = await store.get(teamKey(t));
        if (!d || d.token !== tok) out.me = { lost: true };
        else out.me = { dbl: d.dbl, sub: (state && state.qid && d.subs[state.qid]) || null };
      }
      return json(out);
    }

    // Host publishes the shared state, optionally starting the clock
    if (action === "state" && req.method === "PUT") {
      if (!isHost) return err(403, "not_host", "Only the host can do that.");
      const b = await body(req);
      const state = b.state || {};
      if (b.startClock) {
        const secs = Math.max(5, Math.min(300, Number(b.startClock) || 30));
        state.startedAt = now;
        state.deadline = now + secs * 1000;
      }
      await store.set(`r/${code}/state`, state);
      return json({ state, now });
    }

    // Host reads every team's status for one question
    if (action === "subs" && req.method === "GET") {
      if (!isHost) return err(403, "not_host", "Only the host can do that.");
      const qid = url.searchParams.get("qid") || "";
      const docs = await Promise.all(Array.from({ length: meta.n }, (_, i) => store.get(teamKey(i))));
      const teams = docs.map(d => ({ claimed: !!(d && d.token), dbl: d ? d.dbl : null, sub: (d && qid && d.subs[qid]) || null }));
      return json({ teams, now });
    }

    // Watchers read what the host's screen shows, with no answers before the reveal
    if (action === "watch" && req.method === "GET") {
      const watch = await store.get(`r/${code}/watch`);
      return json({ watch: watch || null, now });
    }
    if (action === "watch" && req.method === "PUT") {
      if (!isHost) return err(403, "not_host", "Only the host can do that.");
      const b = await body(req);
      if (!b.watch || typeof b.watch !== "object") return err(400, "bad_watch", "Nothing to show.");
      await store.set(`r/${code}/watch`, b.watch);
      return json({ ok: true, now });
    }

    // Host frees a team so another device can join as it
    if (action === "claim" && req.method === "DELETE") {
      if (!isHost) return err(403, "not_host", "Only the host can do that.");
      const t = Number(parts[3]);
      const d = await store.get(teamKey(t));
      if (!d) return err(404, "no_team", "No such team.");
      d.token = null;
      await store.set(teamKey(t), d);
      return json({ ok: true });
    }

    // Everything below is a team device acting for its team
    const b = await body(req);
    const t = Number(b.team);
    if (!Number.isInteger(t) || t < 0 || t >= meta.n) return err(400, "bad_team", "Pick a team.");
    const doc = await store.get(teamKey(t));
    if (!doc) return err(404, "no_team", "No such team.");

    if (action === "claim" && req.method === "POST") {
      if (doc.token && doc.token !== b.token) return err(409, "taken", "Someone already joined as this team. Ask the host to free it.");
      if (!doc.token) { doc.token = token(); await store.set(teamKey(t), doc); }
      return json({ token: doc.token });
    }

    if (!b.token || doc.token !== b.token) return err(403, "lost", "This device isn't signed in as that team anymore.");
    const state = await store.get(`r/${code}/state`);
    const qid = String(b.qid || "");
    if (!state || state.qid !== qid) return err(409, "closed", "That question is closed.");
    const sub = doc.subs[qid] || {};

    const onlyTeam = state.onlyTeam == null ? null : Number(state.onlyTeam);
    if (onlyTeam != null && onlyTeam !== t) return err(409, "not_yours", "This Special belongs to another team.");

    if (action === "stop" && req.method === "POST") {
      if (state.phase !== "roll") return err(409, "closed", "The board isn't rolling.");
      if (sub.stop != null) return json({ ok: true });
      const aim = Number(b.aim);
      doc.subs[qid] = Object.assign(sub, { stop: now, aim: Number.isInteger(aim) && aim >= 0 && aim <= 4 ? aim : 2 });
      await store.set(teamKey(t), doc);
      return json({ ok: true });
    }

    if (action === "answer" && req.method === "POST") {
      if (state.phase !== "question" || !state.startedAt) return err(409, "closed", "Answers aren't open.");
      if (now > state.deadline + LATE_GRACE_MS) return err(409, "late", "Time ran out.");
      if (sub.pick != null) return err(409, "locked", "Your team already locked in.");
      const pick = Number(b.pick);
      if (![0, 1, 2, 3].includes(pick)) return err(400, "bad_pick", "Pick A, B, C or D.");
      doc.subs[qid] = Object.assign(sub, { pick, at: Math.max(0, now - state.startedAt) });
      await store.set(teamKey(t), doc);
      return json({ ok: true, at: doc.subs[qid].at });
    }

    if (action === "wager" && req.method === "POST") {
      if (state.phase !== "splash") return err(409, "closed", "Wagers are closed.");
      if (sub.wager != null) return err(409, "locked", "Your team already locked a wager.");
      const max = Math.max(0, Number((state.maxWager || [])[t]) || 0);
      const wager = Math.max(0, Math.min(max, Math.round(Number(b.wager) || 0)));
      doc.subs[qid] = Object.assign(sub, { wager });
      await store.set(teamKey(t), doc);
      return json({ ok: true, wager });
    }

    if (action === "double" && req.method === "POST") {
      if (state.phase !== "question" || state.startedAt || state.kind !== "q") return err(409, "closed", "Doubles close when the clock starts.");
      if (b.on) {
        if (doc.dbl && doc.dbl !== qid) return err(409, "used", "Your team already used its Double.");
        doc.dbl = qid;
      } else if (doc.dbl === qid) {
        doc.dbl = null;
      }
      await store.set(teamKey(t), doc);
      return json({ ok: true, dbl: doc.dbl });
    }

    return err(404, "not_found", "Unknown address.");
  } catch (e) {
    return err(500, "server", String(e && e.message || e));
  }
}
