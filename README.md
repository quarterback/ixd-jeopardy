# Design Jeopardy

A quiz board for reviewing interaction design, on Zoom or in the room. The host's screen shows the board and the questions. Each team answers on its own phone or laptop, privately. Until the host reveals the answer, the shared screen only shows which teams have locked in.

## Deploying on Netlify

1. In Netlify, choose **Add new site, Import an existing project**, and pick this repo.
2. Leave the build command empty and the publish directory as the root. `netlify.toml` already sets both.
3. Deploy.

There is no build step. Netlify serves the files as they are and runs one small function (`netlify/functions/api.mjs`) that holds each game's room, team answers and wagers, using Netlify's built in storage. There is nothing else to sign up for.

The team answering feature needs that function, so it runs on Netlify only. On any other host, or opening `index.html` from your computer, choose **DM to me** in setup and the game works the old way: captains DM you and you click their answers in.

## Before class

1. Open the site. Enter team names (six by default, up to eight).
2. Pick **Teams answer on: Their own phones or laptops**, then the rounds and board size. Round one is 100 to 500, Double Jeopardy 200 to 1000, and the optional Triple Jeopardy 300 to 1500.
3. Click **Draw boards and start**. The lobby shows the join address, a room code and a QR code.
4. One captain per team goes to `yoursite.netlify.app/play`, enters the code and taps their team. The lobby ticks each team off as it joins.
5. Anyone who wants to follow along without a team goes to `yoursite.netlify.app/watch` and enters the same code. They see your screen as it plays: the board, questions, clock, reveals, rollers and standings, on a phone or a laptop. They can't answer, and they never get the answer key or an answer before you reveal it.
6. Click **Answer key** to open this game's answers in a separate window. Keep it off the screen you share.

## Running a square

1. The team on the gold card picks a square. Click it.
2. Read the question. The answers stay hidden on every screen. Teams can tap **Double this square** on their device now, once per game.
3. Press **Space**. The clock starts and the four answers appear on the board and on team devices. The question itself never appears on team devices, which makes it harder to paste into a chatbot.
4. Each team taps an answer and then **Lock in**. A locked answer can't change. Your screen shows "3 of 6 locked in" and "Locked in" on each card, never the letter.
5. Press **R** to reveal. The board shows who picked what and how many points each team got. Each team's device shows its own result.
6. The game goes back to the board on its own after a countdown (8 seconds by default, set in setup). Click **Stay here** to keep the answer up, or press **B** to go back sooner.

**Daily Doubles and the final wager**: captains type their wager on their device. Your screen shows "Wager in" without the amount. Press **R** to show the question, then **Space** for the clock.

**After each board**: click **End Jeopardy** (or Double Jeopardy) to show the standings, with points from that round and the totals.

## Specials

Each round, every team gets one Special: a bonus question only that team answers.

* A Special comes due after every 2 regular squares, so every team gets theirs even when you only go around the teams twice. The board shows **Special for (team)** with a magenta **Roll it** button. The magenta **Roll a Special** button, or the **P** key, starts the next one any time.
* Specials go in reverse team order. The last team gets the first Special of every round, and every round starts the order again.
* If you end a round while some teams haven't had their Special, the game asks first: play the remaining Specials now, one after another, or end the round anyway.
* Every round mixes three rollers in a shuffled order, never the same one twice in a row. Values double in Double Jeopardy and triple in Triple Jeopardy.
  * **Light board:** 16 point values with a light jumping between them. The team presses **Stop** on its device, or you press **Space**.
  * **Prize wheel:** the team taps **Spin**. 24 bright wedges with a $ and the points stacked digit by digit, a gold rim and hub, a flapper that clicks as it slows, and one silver top wedge.
  * **Plinko:** the team picks one of five drop spots and the chip bounces into one of 9 slots; the middle pays most. You can drop from any spot by clicking the arrows above the board.
* The question comes from any category and is never one already used in the game. Other teams sit it out.
* Some spaces on every roller are **No Special**: 3 squares on the light board, 4 LOSE A TURN wedges on the wheel, and the 2 Plinko slots beside the middle. Each roller comes up empty about 1 time in 6. When it does, gremlins pop out, the team gets no question and loses no points, and their Special for that round is used up.
* A right answer earns the team the amount, and characters bring the money. A wrong answer costs nothing; the characters laugh, and that's it.
* While it's rolling you can **Give it to** another team or **Skip this team**. Before the reveal, **New question** swaps in a different question and keeps the amount. **Back without playing** leaves the team's Special for later.
* Specials can be switched off in setup.

## Scoring

| Situation | Points |
| --- | --- |
| Right answer | The square's value |
| Wrong answer or no answer | 0 |
| Double | Once per game, chosen on the team's device before the clock starts. Doubles the points for a right answer. |
| Daily Double and Final Jeopardy | Right answers win the wager, wrong answers lose it |
| Special | Right answers win the rolled amount for that team only. Wrong answers score 0. |

## If something goes wrong

* A phone dies or someone joins as the wrong team: **Menu, Team devices, Free this team**. Another device can then join as that team.
* A score needs fixing: press **S** and use plus or minus 100.
* You opened the wrong square: **Back without scoring** clears it, and it can be played again later.
* Refreshing the host page keeps the game. Refreshing a team device puts it back in the game as the same team.

## Keys

| Key | Does |
| --- | --- |
| Space | Start the clock, or stop, spin or drop a Special |
| R or Enter | Show the question, reveal, or hide the answer |
| B | Back to the board |
| S | Scoreboard |
| P | Roll the next Special (from the board) |
| Esc | Close a panel |

## Editing questions

All questions live in `bank.js`, grouped by category. Each has a level from 1 (easy) to 4 (hardest), the right answer in `a`, and three wrong answers in `w`. Answer order is shuffled every game. The board fills rows from easy to hard, so each category needs questions at every level.

To show a picture, add `media: { type: "svg", svg: SVG_NAME }`. Drawings live in `visuals.js`; `phone()` and `browser()` wrap a screen in a device frame.

`ANSWER_KEY.md` lists every question in the bank with its answer.
