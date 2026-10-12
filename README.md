# Design Jeopardy

A quiz board for reviewing interaction design live over Zoom. The host shares their screen. Every team answers every square, and captains send their answer to the host by Zoom DM.

## Deploying

There is no build step. The site is four files: `index.html`, `styles.css`, `bank.js` and `game.js`. On Netlify or Vercel, point a new site at this repo with no build command and the root folder as the publish directory. You can also open `index.html` straight from your computer.

## Before class

1. Open the site and enter the team names (five by default, up to eight).
2. Choose rounds, categories per board, questions per category, the answer clock, and whether the first correct DM earns a bonus.
3. Click **Draw boards and start**. Each round draws a fresh board at random from the bank, so no two games are the same.
4. Click **Answer key**. It opens in its own window with the letters for this game's boards. Keep that window off the screen you share.

## Running a square

1. The team on the gold card picks a category and value. Click it.
2. Read the question aloud. The answers stay hidden.
3. Press **Space**. The clock starts and the four answers appear.
4. Captains DM you a letter. Click each team's letter on its card. If you're using the bonus, click **First in** on the team whose correct DM arrived first.
5. Press **R** to reveal. Press **B** to go back to the board. The next team in order picks.

**Double**: once per game, a team can double one square. The captain says so in their DM before the clock starts, and you click **Double** on their card.

**Daily Doubles** are visual or video squares. Captains DM you their wager, you type it in, then press **R** to show the question. A wager can go up to the team's score, or up to the board's top value if the team has less.

**Final wager**: after the last board, teams bet any part of their score.

## Keys

| Key | Does |
| --- | --- |
| Space | Start the clock and show the answers |
| R or Enter | Show the question, show the answers, or reveal |
| B | Back to the board |
| S | Scoreboard, with plus and minus 100 to fix a score |
| Esc | Close the scoreboard or menu |

Scores save in your browser as you play, so a refresh won't lose the game. **Menu, New game** clears it.

## Editing questions

All questions live in `bank.js`, grouped by category. Each question has a level from 1 (easy) to 4 (hardest), the right answer in `a`, and three wrong answers in `w`. The game shuffles answer order every time, so you never set letters by hand. The board fills rows from easy to hard, so each category needs questions at every level.

`ANSWER_KEY.md` lists every question in the bank with its answer, for reviewing or printing ahead of time.
