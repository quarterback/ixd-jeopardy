# Lock It In: UT330

A host controlled quiz game for running interaction design review live over Zoom. Every team answers every question at the same time, so nobody waits for a turn and nobody fights Zoom lag on a buzzer.

## Running it

Open `index.html` in a browser, or turn on GitHub Pages for this repo (Settings, Pages, deploy from `main`) and share your screen from that page. Everything runs in the browser; scores save in that browser as you play, so a refresh won't lose the game.

## How a question runs

1. Show the question. Press **Space** to start the clock.
2. Teams talk it over in their own team chat.
3. When time is up, count down "3, 2, 1, send." Captains send one letter in the Zoom chat at the same moment.
4. Click each team's letter on its card, then press **R** to reveal.
5. Press **→** for the next question.

Daily Doubles and the Final Wager open on a splash screen. Captains DM you their wager, you type it into each team card, then press **Enter** to show the question.

## Scoring

| Situation | Points |
| --- | --- |
| Right answer | The question's value (100, 200, 300, 500) |
| Wrong answer | 0 |
| Double lifeline | Twice the value |
| Someone else used 50:50 | Half the value |
| Daily Double | Plus or minus the wager. Max wager is the team's score, or 500 if lower |
| Final Wager | Plus or minus the wager. Max wager is the team's score |

Each team gets each lifeline once per game. Clicking an active lifeline again on the same question undoes it. The scoreboard (**S**) has plus and minus 100 buttons for fixing a score by hand.

## Keyboard

| Key | Does |
| --- | --- |
| Space | Start or stop the clock |
| R | Reveal or hide the answer |
| Enter | Show the question after a Daily Double or Final Wager splash |
| → / ← | Next or previous question |
| S | Scoreboard |
| Esc | Close the scoreboard or menu |

The dots across the top jump to any question.

## Editing questions

All questions live in `questions.js`, in order of play. Each has four options and an `answer` from 0 (A) to 3 (D). Visual questions carry an inline SVG; the video question links out to the clip, since Zoom shares a separate tab more reliably than an embedded player.

For a quick change during class, use **Menu, Edit questions**. Those edits save in that browser only.

## Sources the questions draw on

Jakob Nielsen and Nielsen Norman Group; Don Norman, *The Design of Everyday Things*; Government Digital Service, *Government Design Principles*; Sara Wachter-Boettcher, *Content Everywhere*; IDEO.org Design Kit; Michael J. Metts and Andy Welfle, *Writing Is Designing*; Joe Macleod, *Ends*; 18F Method Cards and UX Guide; G. Lynn Shostack on service blueprints; Jenny L. Davis, *How Artifacts Afford*; Golden Krishna, *The Best Interface Is No Interface*; Alexandra Schmidt, *Deliberate Intervention*; Harry Brignull, deceptive.design; Simon Wardley; Kevin Lynch, *The Image of the City*; Vox, "It's not you. Bad doors are everywhere."
