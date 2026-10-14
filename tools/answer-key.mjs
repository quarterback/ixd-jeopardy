// Rebuilds ANSWER_KEY.md from bank.js. Run from the repo folder: node tools/answer-key.mjs
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";

const ctx = {};
vm.createContext(ctx);
vm.runInContext(readFileSync("visuals.js", "utf8") + readFileSync("bank.js", "utf8") + ";this.BANK = BANK; this.DD = DAILY_DOUBLES; this.FINALS = FINALS;", ctx);

const LEVELS = { 1: "Easy", 2: "Medium", 3: "Hard", 4: "Hardest" };
const cell = s => String(s).replace(/\|/g, "\\|");
function kind(q) {
  const m = q.media;
  if (!m) return "";
  if (m.type === "video") return "(video) ";
  if (m.type === "audio") return "(sound) ";
  return /<animate/.test(m.svg || "") ? "(animation) " : "(picture) ";
}
const row = (first, q) => `| ${first} | ${kind(q)}${cell(q.q)} | **${cell(q.a)}** |`;

const out = [
  "# Design Jeopardy: full answer key",
  "",
  "Every question in `bank.js` with its right answer. Questions marked (picture), (animation), (video) or (sound) show or play something on screen. The game shuffles the A to D order each time it draws boards, so letters only appear in the in game answer key. Use this file to review or print the whole bank.",
  "",
  "This file is generated. After editing `bank.js`, run `node tools/answer-key.mjs` to rebuild it.",
  ""
];
for (const c of ctx.BANK) {
  out.push(`## ${c.cat}`, "", "| Level | Question | Answer |", "| --- | --- | --- |");
  c.qs.slice().sort((a, b) => a.l - b.l).forEach(q => out.push(row(LEVELS[q.l], q)));
  out.push("");
}
out.push("## Daily Doubles", "", "| Category | Question | Answer |", "| --- | --- | --- |");
ctx.DD.forEach(q => out.push(row(q.cat, q)));
out.push("", "## Final wager pool", "", "| Category | Question | Answer |", "| --- | --- | --- |");
ctx.FINALS.forEach(q => out.push(row(q.cat, q)));
out.push("");
writeFileSync("ANSWER_KEY.md", out.join("\n"));
console.log(`Wrote ANSWER_KEY.md: ${ctx.BANK.reduce((n, c) => n + c.qs.length, 0)} board questions, ${ctx.DD.length} Daily Doubles, ${ctx.FINALS.length} finals.`);
