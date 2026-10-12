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
5. Click **Answer key** to open this game's answers in a separate window. Keep it off the screen you share.

## Running a square

1. The team on the gold card picks a square. Click it.
2. Read the question. The answers stay hidden on every screen. Teams can tap **Double this square** on their device now, once per game.
3. Press **Space**. The clock starts and the four answers appear on the board and on team devices. The question itself never appears on team devices, which makes it harder to paste into a chatbot.
4. Each team taps an answer and then **Lock in**. A locked answer can't change. Your screen shows "3 of 6 locked in" and "Locked in" on each card, never the letter.
5. Press **R** to reveal. The board shows who picked what and how many points each team got. Each team's device shows its own result.
6. Press **B** to go back to the board.

**Daily Doubles and the final wager**: captains type their wager on their device. Your screen shows "Wager in" without the amount. Press **R** to show the question, then **Space** for the clock.

**After each board**: click **End Jeopardy** (or Double Jeopardy) to show the standings, with points from that round and the totals.

## Specials

Each round, every team gets one Special: a bonus question only that team answers.

* The game spaces Specials evenly through the round. When one is due, the board shows **Special for (team)** with a **Roll it** button. **Roll a Special** in the bottom bar starts the next one any time.
* Specials go in reverse team order. The last team gets the first Special of every round, and every round starts the order again.
* How the amount gets picked changes by round. Values double in Double Jeopardy and triple in Triple Jeopardy.
  * **Jeopardy:** a board of 16 point values with a light jumping between them. The team presses **Stop** on its device, or you press **Space**.
  * **Double Jeopardy:** each Special is randomly a **wheel** or **Plinko**. On the prize wheel, the team taps **Spin**. The wheel has 24 bright wedges with a $ and the points stacked digit by digit, a gold rim and hub, a flapper at the top that clicks as it slows, and one silver top wedge. On Plinko, the team picks one of five drop spots and the chip bounces down into one of 9 slots; the middle pays most and the slots beside it pay least. Every wedge and slot pays something. You can spin with **Space**, or drop from any spot by clicking the arrows above the board.
  * **Triple Jeopardy:** any of the three.
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
| Esc | Close a panel |

## Editing questions

All questions live in `bank.js`, grouped by category. Each has a level from 1 (easy) to 4 (hardest), the right answer in `a`, and three wrong answers in `w`. Answer order is shuffled every game. The board fills rows from easy to hard, so each category needs questions at every level.

To show a picture, add `media: { type: "svg", svg: SVG_NAME }`. Drawings live in `visuals.js`; `phone()` and `browser()` wrap a screen in a device frame.

`ANSWER_KEY.md` lists every question in the bank with its answer.
