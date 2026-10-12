/* Design Jeopardy question bank. Drawings first, then the bank, Daily Doubles and finals. */

const SVG_CONFIRMSHAME = `
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A website pop up offering a discount code">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <rect x="20" y="18" width="440" height="22" rx="4" fill="#3a3f4c"/>
  <rect x="20" y="52" width="210" height="110" rx="6" fill="#3a3f4c"/>
  <rect x="250" y="52" width="210" height="110" rx="6" fill="#3a3f4c"/>
  <rect width="480" height="320" fill="#000" opacity="0.45"/>
  <rect x="80" y="40" width="320" height="250" rx="14" fill="#fbfbfd"/>
  <text x="240" y="88" text-anchor="middle" font-family="Georgia, serif" font-size="24" font-weight="700" fill="#1d1f27">Get 15% off</text>
  <text x="240" y="114" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#4a4f5c">your first order when you join our list</text>
  <rect x="110" y="134" width="260" height="38" rx="8" fill="#fff" stroke="#c8cbd4"/>
  <text x="124" y="158" font-family="Arial, sans-serif" font-size="13" fill="#9a9eaa">you@email.com</text>
  <rect x="110" y="184" width="260" height="42" rx="8" fill="#e2483d"/>
  <text x="240" y="211" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" font-weight="700" fill="#fff">Yes, send my code</text>
  <text x="240" y="256" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#4a4f5c" text-decoration="underline">No thanks, I like paying full price</text>
</svg>`;

const SVG_DOOR = `
<svg viewBox="0 0 320 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A glass door with a flat metal plate and a taped sign">
  <rect width="320" height="360" fill="#2b2f3a"/>
  <rect x="0" y="330" width="320" height="30" fill="#3a3f4c"/>
  <rect x="60" y="30" width="200" height="300" fill="#6b5a45"/>
  <rect x="74" y="44" width="172" height="286" fill="#9fc2d6" opacity="0.55"/>
  <rect x="74" y="44" width="172" height="286" fill="none" stroke="#5a4a38" stroke-width="4"/>
  <rect x="196" y="160" width="36" height="70" rx="3" fill="#c9ccd3" stroke="#8d919b" stroke-width="2"/>
  <rect x="110" y="96" width="100" height="44" fill="#fffef6" transform="rotate(-4 160 118)"/>
  <rect x="104" y="92" width="18" height="10" fill="#e8d98a" opacity="0.8" transform="rotate(-30 113 97)"/>
  <rect x="198" y="88" width="18" height="10" fill="#e8d98a" opacity="0.8" transform="rotate(25 207 93)"/>
  <text x="160" y="127" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="26" font-weight="900" fill="#c23a2c" transform="rotate(-4 160 118)">PULL</text>
</svg>`;

const SVG_FAREGATE = `
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A transit fare gate with a reader that accepts only a phone">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <rect x="0" y="270" width="480" height="50" fill="#3a3f4c"/>
  <rect x="110" y="110" width="70" height="160" rx="8" fill="#8d939f"/>
  <rect x="300" y="110" width="70" height="160" rx="8" fill="#8d939f"/>
  <path d="M180 170 h55 a10 10 0 0 1 0 20 h-55 z" fill="#d94f43"/>
  <path d="M300 170 h-55 a10 10 0 0 0 0 20 h55 z" fill="#d94f43"/>
  <rect x="116" y="58" width="58" height="72" rx="6" fill="#1d1f27" stroke="#5c6270" stroke-width="2"/>
  <rect x="135" y="68" width="20" height="34" rx="4" fill="none" stroke="#7fd1a8" stroke-width="3"/>
  <circle cx="145" cy="96" r="2" fill="#7fd1a8"/>
  <path d="M160 74 q8 10 0 20 M165 70 q12 14 0 28" fill="none" stroke="#7fd1a8" stroke-width="2"/>
  <text x="145" y="122" text-anchor="middle" font-family="Arial, sans-serif" font-size="9" fill="#e8eaf0">TAP PHONE</text>
  <rect x="190" y="26" width="100" height="30" rx="4" fill="#1d1f27"/>
  <text x="240" y="46" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#f2c94c">ENTRY</text>
  <text x="240" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" fill="#c9ccd3">No card slot. No coin slot. No staffed booth.</text>
</svg>`;

const SVG_LYNCH = `
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A hand drawn mental map of a city with one element highlighted">
  <rect width="480" height="320" fill="#f3f1ea"/>
  <path d="M30 230 L130 205 L200 170 L260 160 L330 120 L460 90" fill="none" stroke="#8a8f99" stroke-width="5" stroke-linecap="round"/>
  <path d="M90 40 L120 120 L160 200 L190 300" fill="none" stroke="#8a8f99" stroke-width="5" stroke-linecap="round"/>
  <path d="M250 30 L265 160 L275 300" fill="none" stroke="#8a8f99" stroke-width="5" stroke-linecap="round"/>
  <path d="M330 120 L400 300" fill="none" stroke="#8a8f99" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 6"/>
  <ellipse cx="380" cy="200" rx="70" ry="45" fill="#c9b6d9" opacity="0.6"/>
  <path d="M0 278 C 90 250, 160 300, 250 268 S 400 240, 480 262" fill="none" stroke="#5c9ccf" stroke-width="26"/>
  <path d="M0 278 C 90 250, 160 300, 250 268 S 400 240, 480 262" fill="none" stroke="#e0a400" stroke-width="40" opacity="0.28"/>
  <circle cx="200" cy="170" r="16" fill="#f3f1ea" stroke="#3d4250" stroke-width="3"/>
  <rect x="300" y="40" width="16" height="56" fill="#3d4250"/>
  <path d="M296 40 L308 18 L320 40 z" fill="#3d4250"/>
  <g font-family="Georgia, serif" font-size="14" fill="#3d4250" font-style="italic">
    <text x="335" y="60">the clock tower</text>
    <text x="224" y="196">the square</text>
    <text x="350" y="204">old mill blocks</text>
    <text x="40" y="196">Main St.</text>
  </g>
  <g font-family="Arial Black, Arial, sans-serif" font-size="30" fill="#b07a00">
    <text x="214" y="246">?</text>
  </g>
</svg>`;


const SVG_HOMEPAGE = `
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A city aquatics home page with seven buttons of equal size">
  <rect width="480" height="320" fill="#f4f6f9"/>
  <rect width="480" height="44" fill="#1f4e79"/>
  <text x="20" y="28" font-family="Arial, sans-serif" font-size="16" font-weight="700" fill="#fff">Riverton Aquatics</text>
  <text x="20" y="74" font-family="Arial, sans-serif" font-size="13" fill="#3a3f4c">Welcome to Riverton Aquatics. Please choose an option below.</text>
  <g font-family="Arial, sans-serif" font-size="12" font-weight="700" fill="#1f4e79" text-anchor="middle">
    <rect x="20" y="92" width="140" height="56" rx="6" fill="#dbe6f2"/><text x="90" y="125">Facility Information</text>
    <rect x="170" y="92" width="140" height="56" rx="6" fill="#dbe6f2"/><text x="240" y="125">Programs &amp; Activities</text>
    <rect x="320" y="92" width="140" height="56" rx="6" fill="#dbe6f2"/><text x="390" y="125">Forms &amp; Policies</text>
    <rect x="20" y="158" width="140" height="56" rx="6" fill="#dbe6f2"/><text x="90" y="191">Get Started</text>
    <rect x="170" y="158" width="140" height="56" rx="6" fill="#dbe6f2"/><text x="240" y="191">Enrollment Admin</text>
    <rect x="320" y="158" width="140" height="56" rx="6" fill="#dbe6f2"/><text x="390" y="191">Contact Us</text>
    <rect x="170" y="224" width="140" height="56" rx="6" fill="#dbe6f2"/><text x="240" y="257">News &amp; Updates</text>
  </g>
  <text x="240" y="306" text-anchor="middle" font-family="Arial, sans-serif" font-size="11" fill="#6b7280">Lap swim times, lesson signup and pool closures are all somewhere in here.</text>
</svg>`;

const SVG_DUPLICATE = `
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A phone screen showing a message about an existing streetlight report">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <rect x="150" y="10" width="180" height="300" rx="22" fill="#111318"/>
  <rect x="160" y="22" width="160" height="276" rx="14" fill="#fbfbfd"/>
  <text x="174" y="48" font-family="Arial, sans-serif" font-size="11" font-weight="700" fill="#1d1f27">Report a streetlight</text>
  <rect x="172" y="58" width="136" height="70" rx="6" fill="#dfe6ee"/>
  <circle cx="240" cy="90" r="7" fill="#d94f43"/>
  <rect x="172" y="138" width="136" height="98" rx="8" fill="#fff4d6" stroke="#e0b44a"/>
  <g font-family="Arial, sans-serif" font-size="10" fill="#3a3f4c">
    <text x="180" y="156" font-weight="700">Already reported</text>
    <text x="180" y="172">A light at this spot was</text>
    <text x="180" y="185">reported 2 hours ago.</text>
    <text x="180" y="201">Ticket 8841 · Scheduled</text>
  </g>
  <rect x="180" y="210" width="120" height="20" rx="10" fill="#1f4e79"/>
  <text x="240" y="224" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="700" fill="#fff">Follow this report</text>
  <text x="240" y="262" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" fill="#1f4e79" text-decoration="underline">Report a different light</text>
</svg>`;

const SVG_CLOSEX = `
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A large ad covering a phone screen with a tiny close button in the far corner">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <rect x="150" y="10" width="180" height="300" rx="22" fill="#111318"/>
  <rect x="160" y="22" width="160" height="276" rx="14" fill="#cfd5de"/>
  <rect x="168" y="40" width="144" height="240" rx="8" fill="#ffd23f"/>
  <text x="240" y="120" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="22" fill="#1d1f27">SUMMER</text>
  <text x="240" y="146" text-anchor="middle" font-family="Arial Black, Arial, sans-serif" font-size="22" fill="#1d1f27">SALE</text>
  <rect x="190" y="200" width="100" height="44" rx="22" fill="#1d1f27"/>
  <text x="240" y="227" text-anchor="middle" font-family="Arial, sans-serif" font-size="13" font-weight="700" fill="#ffd23f">SHOP NOW</text>
  <text x="305" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" fill="#8a7a3a">×</text>
  <circle cx="305" cy="47" r="12" fill="none" stroke="#e0544a" stroke-width="2" stroke-dasharray="3 3"/>
  <circle cx="200" cy="300" r="10" fill="#e8c4a8" opacity="0.9"/>
  <text x="150" y="304" text-anchor="end" font-family="Arial, sans-serif" font-size="11" fill="#c9ccd3">your thumb</text>
</svg>`;

/*
  THE BANK
  Each category holds questions at four levels: 1 is easiest, 4 is hardest.
  Each board draws categories at random and fills the rows from easy to hard,
  so a big bank means every game plays differently.

  Question fields
    l     level, 1 to 4
    q     the question
    a     the right answer
    w     three wrong answers
    why   one or two sentences shown after the reveal
    src   optional credit line, used only where a person or idea is named
  Options are shuffled every game, so write the right answer in "a" and
  don't worry about letters.
*/

const BANK = [
  {
    cat: "UX Laws",
    qs: [
      { l: 1, q: "Big buttons placed close to your thumb are faster to hit than small ones far away. Which law describes this?", a: "Fitts's law", w: ["Hick's law", "Jakob's law", "Miller's law"], why: "The time to reach a target depends on its distance and its size. Make important targets big and close.", src: "Paul Fitts, 1954" },
      { l: 1, q: "A menu with 40 choices takes longer to decide on than a menu with 5. Which law describes this?", a: "Hick's law", w: ["Fitts's law", "Tesler's law", "Postel's law"], why: "Decision time grows as the number and complexity of choices grows.", src: "William Hick and Ray Hyman" },
      { l: 2, q: "People expect your site to work like the other sites they already use. Which law is that?", a: "Jakob's law", w: ["Conway's law", "Parkinson's law", "Goodhart's law"], why: "People spend most of their time on other sites, so familiar patterns save them from relearning.", src: "Jakob Nielsen" },
      { l: 2, q: "Miller's law is usually summed up as people holding about how many items in short term memory?", a: "Seven, plus or minus two", w: ["Three, plus or minus one", "Twelve, plus or minus three", "Twenty, plus or minus five"], why: "Later research puts the real number lower, closer to four chunks. Either way, chunking helps.", src: "George Miller, 1956" },
      { l: 3, q: "Every system has some complexity that can't be removed, only moved between the user and the system. Which law is that?", a: "Tesler's law", w: ["Hick's law", "Occam's razor", "The Pareto principle"], why: "Also called the law of conservation of complexity. Good design moves the burden onto the system.", src: "Larry Tesler" },
      { l: 3, q: "A phone number field accepts spaces, dashes and parentheses and cleans them up itself. Which law is it following?", a: "Postel's law", w: ["Fitts's law", "Jakob's law", "Miller's law"], why: "Be liberal in what you accept and conservative in what you send.", src: "Jon Postel" },
      { l: 4, q: "A city's website is organized by department instead of by what residents need. Which law predicts that?", a: "Conway's law", w: ["Tesler's law", "Hick's law", "Parkinson's law"], why: "Systems end up mirroring the structure of the organization that builds them.", src: "Melvin Conway, 1968" },
      { l: 4, q: "A team is rewarded for time on page, so they make pages harder to leave. Which law warns about this?", a: "Goodhart's law", w: ["Jakob's law", "Postel's law", "Fitts's law"], why: "When a measure becomes a target, it stops being a good measure.", src: "Charles Goodhart" },
      { l: 4, q: "The Doherty threshold says people stay engaged when a system responds within about how long?", a: "400 milliseconds", w: ["4 seconds", "40 milliseconds", "1.5 seconds"], why: "Under roughly 400 ms the exchange feels continuous. Slower than that, attention starts to drift.", src: "Walter Doherty and Ahrvind Thadani, 1982" }
    ]
  },
  {
    cat: "Gestalt",
    qs: [
      { l: 1, q: "A label sits right next to its input field so you know they go together. Which principle is at work?", a: "Proximity", w: ["Closure", "Symmetry", "Continuity"], why: "Things that are close together are read as a group." },
      { l: 1, q: "Every link on a page is blue and underlined, so you read them all as the same kind of thing. Which principle?", a: "Similarity", w: ["Proximity", "Figure and ground", "Closure"], why: "Things that look alike are read as belonging together." },
      { l: 2, q: "A card with a border makes the image, title and price inside it feel like one unit. Which principle?", a: "Common region", w: ["Similarity", "Continuity", "Symmetry"], why: "Elements inside a shared boundary are read as a group." },
      { l: 2, q: "You see a full circle even though the logo only draws three quarters of it. Which principle?", a: "Closure", w: ["Proximity", "Common region", "Similarity"], why: "People fill in gaps to see a complete shape." },
      { l: 3, q: "A modal dims everything behind it so the dialog stands out. Which principle is the dimming using?", a: "Figure and ground", w: ["Closure", "Continuity", "Proximity"], why: "People separate a focal figure from its background. Dimming pushes the page back into ground." },
      { l: 3, q: "Steps in a progress tracker are joined by a line, so you read them as one sequence. Which principle?", a: "Uniform connectedness", w: ["Closure", "Similarity", "Symmetry"], why: "Elements that are visually connected are read as more related than ones that aren't." },
      { l: 4, q: "People see a complex shape as the simplest form that could explain it. What is that principle called?", a: "Prägnanz", w: ["Isomorphism", "Emergence", "Reification"], why: "Prägnanz, or the law of simplicity: we read things in the simplest way we can." },
      { l: 4, q: "Gestalt principles come from which field?", a: "Psychology", w: ["Typography", "Architecture", "Computer science"], why: "Gestalt psychologists in early 1900s Germany studied how people perceive wholes." }
    ]
  },
  {
    cat: "How People Think",
    qs: [
      { l: 1, q: "People believe a beautiful interface is easier to use, even when it isn't. What is this called?", a: "The aesthetic usability effect", w: ["The halo of choice", "The Zeigarnik effect", "The peak end rule"], why: "Good looks buy patience, but they can also hide real usability problems in testing." },
      { l: 1, q: "A loyalty card that starts you with two free stamps makes you finish it faster. Which effect?", a: "The goal gradient effect", w: ["The serial position effect", "The anchoring effect", "The decoy effect"], why: "People speed up as they get closer to a goal, even an artificial head start." },
      { l: 2, q: "People judge an experience mostly by its most intense moment and how it ended. What is this called?", a: "The peak end rule", w: ["The recency bias", "The halo effect", "The framing effect"], why: "That is why endings and recovery moments deserve design attention.", src: "Daniel Kahneman" },
      { l: 2, q: "In a list, people remember the first and last items best. What is this called?", a: "The serial position effect", w: ["The Von Restorff effect", "The peak end rule", "The mere exposure effect"], why: "Put the most important items at the start or end of navigation." },
      { l: 3, q: "One red button among grey ones is the one people remember. Which effect?", a: "The Von Restorff effect", w: ["The serial position effect", "The decoy effect", "The bandwagon effect"], why: "Also called the isolation effect: the item that differs stands out." },
      { l: 3, q: "A half finished profile with a progress bar nags at you until you complete it. Which effect?", a: "The Zeigarnik effect", w: ["The goal gradient effect", "The IKEA effect", "The peak end rule"], why: "People remember unfinished tasks better than finished ones." },
      { l: 3, q: "What do we call a person's internal picture of how a system works?", a: "A mental model", w: ["A persona", "A conceptual map", "A heuristic"], why: "Problems start when the system works differently from what people expect." },
      { l: 4, q: "Offering too many similar options can make people choose nothing at all. What is that called?", a: "Choice overload", w: ["Cognitive dissonance", "Loss aversion", "The decoy effect"], why: "The famous jam study found more people bought when fewer flavors were on display.", src: "Sheena Iyengar and Mark Lepper, 2000" },
      { l: 4, q: "The total mental effort needed to use an interface is called what?", a: "Cognitive load", w: ["Interaction cost", "Information scent", "Working memory"], why: "Reduce it by cutting choices, chunking information, and using familiar patterns." }
    ]
  },
  {
    cat: "Affordances",
    qs: [
      { l: 1, q: "A door has a pull handle, but you're supposed to push it. What is that kind of door called?", a: "A Norman door", w: ["A Tesler door", "A Fitts door", "A dark pattern door"], why: "Its design signals the wrong action, so someone tapes up a sign.", src: "Named for Don Norman" },
      { l: 1, q: "A flat metal plate on a door tells you where to push. The plate is a...", a: "Signifier", w: ["Constraint", "Mapping", "Mental model"], why: "A signifier tells you where and how to act.", src: "Don Norman" },
      { l: 2, q: "What does an affordance describe?", a: "What actions an object makes possible for someone", w: ["How an object looks", "What an object costs to make", "How a brand feels"], why: "A chair affords sitting. The concept describes possible actions between a person and a thing." },
      { l: 2, q: "A button changes color and makes a click sound when you press it. That is...", a: "Feedback", w: ["A constraint", "A signifier", "Mapping"], why: "Feedback tells you the system received your action and what happened." },
      { l: 3, q: "Stove knobs laid out in the same pattern as the burners are an example of good...", a: "Mapping", w: ["Feedback", "Affordance", "Closure"], why: "Mapping is the relationship between controls and what they control." },
      { l: 3, q: "A SIM card tray only fits one way, so you can't put it in wrong. That is a...", a: "Constraint", w: ["Signifier", "Mapping", "Feedback"], why: "Constraints limit the possible actions so errors can't happen." },
      { l: 4, q: "\"Did that do what I wanted?\" is a question about which gulf?", a: "The gulf of evaluation", w: ["The gulf of execution", "The gulf of expectation", "The gulf of experience"], why: "Execution is figuring out how to act. Evaluation is figuring out what happened.", src: "Don Norman" },
      { l: 4, q: "Who coined the word affordance, before designers borrowed it?", a: "James J. Gibson, a psychologist", w: ["Don Norman, a designer", "Jakob Nielsen, a usability researcher", "Kevin Lynch, an urban planner"], why: "Gibson used it in ecological psychology. Don Norman brought it into design in the late 1980s." },
    ]
  },
  {
    cat: "Usability",
    qs: [
      { l: 1, q: "A progress bar shows your upload is 60 percent done. Which usability heuristic is it serving?", a: "Visibility of system status", w: ["Recognition rather than recall", "Help and documentation", "Aesthetic and minimalist design"], why: "Keep people informed about what is going on, with timely feedback.", src: "Jakob Nielsen's 10 usability heuristics" },
      { l: 1, q: "Gmail lets you undo a sent email for a few seconds. Which heuristic?", a: "User control and freedom", w: ["Error prevention", "Consistency and standards", "Flexibility and efficiency of use"], why: "People make mistakes and need a clearly marked emergency exit.", src: "Jakob Nielsen's 10 usability heuristics" },
      { l: 2, q: "A date picker greys out dates in the past so you can't choose them. Which heuristic?", a: "Error prevention", w: ["Visibility of system status", "User control and freedom", "Help and documentation"], why: "Stopping a mistake before it happens beats a good error message.", src: "Jakob Nielsen's 10 usability heuristics" },
      { l: 2, q: "When you tap a search box, the app shows your last five searches. Which heuristic?", a: "Recognition rather than recall", w: ["Error prevention", "Match between system and the real world", "Consistency and standards"], why: "Let people pick from what they see instead of remembering it.", src: "Jakob Nielsen's 10 usability heuristics" },
      { l: 3, q: "A trash can icon for deleting files is an example of which heuristic?", a: "Match between system and the real world", w: ["Aesthetic and minimalist design", "Consistency and standards", "Recognition rather than recall"], why: "Use concepts and words people already know from the world." },
      { l: 3, q: "Keyboard shortcuts that experts use and beginners can ignore fit which heuristic?", a: "Flexibility and efficiency of use", w: ["User control and freedom", "Consistency and standards", "Help and documentation"], why: "Accelerators speed up experienced users without getting in the way of new ones." },
      { l: 3, q: "Testing with about five users finds roughly how much of a design's usability problems?", a: "About 85 percent", w: ["About a third", "About half", "All of them"], why: "Run several small rounds and fix things between them, instead of one big study.", src: "Jakob Nielsen, 2000" },
      { l: 4, q: "Experts review an interface against a set of principles, without users. What is that method called?", a: "Heuristic evaluation", w: ["Usability testing", "Cognitive walkthrough", "Card sorting"], why: "It is fast and cheap, but it finds expert opinions, not what real people actually do." },
      { l: 4, q: "The System Usability Scale is a questionnaire with how many statements?", a: "10", w: ["5", "20", "50"], why: "Ten statements, each rated on a five point scale, scored out of 100.", src: "John Brooke, 1986" }
    ]
  },
  {
    cat: "Research",
    qs: [
      { l: 1, q: "\"Don't you think this new design is much easier?\" is a problem in an interview because it is...", a: "A leading question", w: ["A closed question", "A follow up question", "A screener question"], why: "It tells the person what answer you want. Ask \"How did that go?\" instead." },
      { l: 1, q: "In a usability test, you ask people to say what they're thinking as they work. What is that called?", a: "Think aloud", w: ["Card sorting", "A diary study", "Contextual inquiry"], why: "It shows you their expectations and confusion as they happen." },
      { l: 2, q: "Two versions of a page go to two random groups of real users to see which performs better. What is that?", a: "An A/B test", w: ["A usability test", "A card sort", "A heuristic evaluation"], why: "Change one thing at a time, or you won't know what caused the difference." },
      { l: 2, q: "You put interview notes on sticky notes and group similar ones to find patterns. What is that called?", a: "Affinity mapping", w: ["Journey mapping", "Card sorting", "Tree testing"], why: "Cluster, label the groups, then name the pattern each group points to." },
      { l: 2, q: "What is the difference between what people say and what people do called in research?", a: "The say do gap", w: ["The gulf of execution", "Confirmation bias", "The observer effect"], why: "It is why we watch people use things instead of only asking them." },
      { l: 3, q: "You watch and talk with someone while they do the work in their own setting. What is that method?", a: "Contextual inquiry", w: ["A focus group", "A survey", "A diary study"], why: "Being in their context shows workarounds people would never think to mention." },
      { l: 3, q: "Participants log their experience over days or weeks, in the moment. What method is that?", a: "A diary study", w: ["A usability test", "A focus group", "A card sort"], why: "Useful for things that happen over time, like a commute or a recurring chore." },
      { l: 4, q: "Checking a finding against a second source, like analytics plus interviews, is called...", a: "Triangulation", w: ["Synthesis", "Validation", "Saturation"], why: "If different kinds of evidence point the same way, you can trust the finding more." },
      { l: 4, q: "You keep interviewing until new interviews stop revealing anything new. That point is called...", a: "Saturation", w: ["Triangulation", "Significance", "Convergence"], why: "It is a sign you have enough for that question, not that you are done forever." }
    ]
  },
  {
    cat: "Information Architecture",
    qs: [
      { l: 1, q: "A trail like Home > Pools > Lap Swim at the top of a page is called...", a: "Breadcrumbs", w: ["A mega menu", "A sitemap", "Tabs"], why: "They show where you are and let you jump back up the hierarchy." },
      { l: 1, q: "Which question does a content inventory answer?", a: "What is there?", w: ["Is it any good?", "Who reads it?", "What should we write next?"], why: "An inventory lists everything. An audit judges it." },
      { l: 2, q: "People sort topic cards into groups and name the groups themselves. What kind of card sort is that?", a: "An open card sort", w: ["A closed card sort", "A tree test", "A reverse card sort"], why: "Open sorts show how people think about the content. Closed sorts test categories you already made." },
      { l: 2, q: "In a content audit, ROT stands for...", a: "Redundant, outdated, trivial", w: ["Read, organize, test", "Remove, outline, tag", "Relevant, organized, timely"], why: "It is the standard filter for what to cut." },
      { l: 3, q: "People try to find items using only a text version of the menu, with no visual design. What is that test?", a: "A tree test", w: ["An open card sort", "A first click test", "An A/B test"], why: "It tests whether the structure and labels work on their own." },
      { l: 3, q: "Showing only the basics first and revealing advanced options when asked is called...", a: "Progressive disclosure", w: ["Lazy loading", "Information scent", "Chunking"], why: "It keeps the first screen simple without hiding power features forever." },
      { l: 3, q: "The cues in a link's words that tell you whether it leads to what you want are called...", a: "Information scent", w: ["Wayfinding", "Breadcrumbs", "Microcopy"], why: "Strong scent keeps people clicking. Vague labels like \"Resources\" have weak scent." },
      { l: 4, q: "Creating content once in a structured form so it can appear on a website, an app and a watch is called...", a: "Create once, publish everywhere", w: ["Responsive design", "Content syndication", "Single page architecture"], why: "COPE, made famous by NPR, depends on keeping content separate from how it is displayed." },
      { l: 4, q: "A vocabulary of approved terms so everyone tags and labels content the same way is called...", a: "A controlled vocabulary", w: ["A style guide", "A content model", "A sitemap"], why: "It keeps \"swim lessons\", \"aquatics classes\" and \"learn to swim\" from becoming three different things." }
    ]
  },
  {
    cat: "Maps & Flows",
    qs: [
      { l: 1, q: "Which map answers \"What happens, step by step?\"", a: "A task flow", w: ["A journey map", "A mood board", "A sitemap"], why: "A task flow shows actions, decisions and system responses toward a goal." },
      { l: 1, q: "Which map answers \"What is the experience of it happening?\"", a: "A journey map", w: ["A task flow", "A wireframe", "A sitemap"], why: "Journey maps add context, emotion and friction across time and channels." },
      { l: 2, q: "A simple layout that shows structure, placement and hierarchy, with no color or styling, is a...", a: "Wireframe", w: ["Mockup", "Style tile", "Mood board"], why: "Wireframes settle structure before anyone argues about colors." },
      { l: 2, q: "Drawing a sequence of frames that shows a person, their setting and what happens around the screen is a...", a: "Storyboard", w: ["Wireframe", "Task flow", "Sitemap"], why: "Storyboards show hands, bodies, places and interruptions, not just floating phone screens." },
      { l: 3, q: "On a service blueprint, what does the line of visibility separate?", a: "What the customer sees from what happens out of sight", w: ["Digital steps from physical steps", "The happy path from errors", "Research from design"], why: "Above it is frontstage. Below it is backstage work that supports the customer." },
      { l: 3, q: "A person behind a curtain secretly plays the computer while someone tests a prototype. What is that called?", a: "A Wizard of Oz prototype", w: ["A paper prototype", "A smoke test", "A clickable prototype"], why: "It tests an idea before anyone builds the technology behind it." },
      { l: 3, q: "Every place a person interacts with a service, like a sign, an app, a phone call or a counter, is called a...", a: "Touchpoint", w: ["Breakpoint", "Waypoint", "Endpoint"], why: "Journey maps and blueprints line up the touchpoints across a whole experience." },
      { l: 4, q: "On a Wardley map, the horizontal axis runs from Genesis to...", a: "Commodity", w: ["Product", "Retirement", "Market"], why: "Genesis, custom built, product, commodity. The vertical axis is how visible each part is to the user.", src: "Simon Wardley" },
      { l: 4, q: "A list of every state a screen can be in, like empty, loading, error and done, is called a...", a: "State inventory", w: ["Content inventory", "Component library", "Task flow"], why: "Beginners design one pretty screen and forget the states around it." }
    ]
  },
  {
    cat: "Accessibility",
    qs: [
      { l: 1, q: "What is alt text for?", a: "Describing an image for people who can't see it", w: ["Showing a tooltip on hover", "Naming the image file", "Improving image quality"], why: "Screen readers read it aloud. Decorative images get an empty alt so they're skipped." },
      { l: 1, q: "Software that reads the screen aloud for blind and low vision users is called a...", a: "Screen reader", w: ["Screen magnifier", "Voice assistant", "Text expander"], why: "VoiceOver and NVDA are common ones." },
      { l: 2, q: "A form shows errors only by turning fields red. Who does that fail first?", a: "People who can't tell red from other colors", w: ["People on slow connections", "People using a mouse", "People with large screens"], why: "Never use color alone to carry meaning. Add text or an icon." },
      { l: 2, q: "Curb cuts were made for wheelchairs but help strollers, carts and bikes too. What is that idea called?", a: "The curb cut effect", w: ["The ramp principle", "Universal access", "The spillover effect"], why: "Designing for people at the edges often makes things better for everyone.", src: "Angela Glover Blackwell, 2017" },
      { l: 3, q: "The four principles of web accessibility, POUR, stand for perceivable, operable, understandable and...", a: "Robust", w: ["Readable", "Responsive", "Reliable"], why: "Robust means content works across browsers and assistive technologies.", src: "WCAG" },
      { l: 3, q: "Someone can't use a mouse and moves through a page with the Tab key. What must every control show?", a: "A visible focus state", w: ["A hover state", "A tooltip", "An icon"], why: "Without a focus indicator, keyboard users can't tell where they are." },
      { l: 4, q: "What contrast ratio does WCAG AA require for normal sized body text?", a: "4.5 to 1", w: ["2 to 1", "3 to 1", "7 to 1"], why: "Large text needs 3 to 1. The stricter AAA level asks for 7 to 1.", src: "WCAG 2" },
      { l: 4, q: "Apple's guidelines say tap targets should be at least how big?", a: "44 by 44 points", w: ["16 by 16 points", "24 by 24 points", "100 by 100 points"], why: "Small targets punish anyone with shaky hands, big thumbs or a moving bus." }
    ]
  },
  {
    cat: "Deceptive Design",
    qs: [
      { l: 1, q: "Signing up takes two taps. Canceling takes a phone call during business hours. Which pattern?", a: "Hard to cancel", w: ["Sneaking", "Nagging", "Fake scarcity"], why: "Easy in, hard out, on purpose." },
      { l: 1, q: "An app asks you to turn on notifications every single time you open it. Which pattern?", a: "Nagging", w: ["Confirmshaming", "Preselection", "Forced action"], why: "Repeated interruptions wear people down until they say yes." },
      { l: 2, q: "Travel insurance is already checked when you reach checkout. Which pattern?", a: "Preselection", w: ["Sneaking", "Trick wording", "Visual interference"], why: "A default chosen for you nudges you toward what the company wants." },
      { l: 2, q: "A countdown timer says the deal ends soon, but it resets every time you reload. Which pattern?", a: "Fake urgency", w: ["Fake scarcity", "Nagging", "Hidden costs"], why: "A made up time limit pressures you to decide now." },
      { l: 2, q: "\"No thanks, I don't like saving money\" on a decline button. Which pattern?", a: "Confirmshaming", w: ["Trick wording", "Nagging", "Visual interference"], why: "It uses guilt to steer your choice." },
      { l: 3, q: "Service fees appear only on the last step of checkout. Which pattern?", a: "Hidden costs", w: ["Sneaking", "Comparison prevention", "Fake urgency"], why: "By the end you've invested time, so you're less likely to walk away." },
      { l: 3, q: "\"Only 2 left in stock!\" when there are plenty. Which pattern?", a: "Fake scarcity", w: ["Fake urgency", "Fake social proof", "Nagging"], why: "A false sense of limited supply pushes people to buy." },
      { l: 4, q: "\"Uncheck this box if you would prefer not to stop receiving emails.\" Which pattern?", a: "Trick wording", w: ["Preselection", "Confirmshaming", "Obstruction"], why: "Confusing language makes people do the opposite of what they meant." },
      { l: 4, q: "Before \"deceptive patterns\", what were these commonly called?", a: "Dark patterns", w: ["Black hat UX", "Grey patterns", "Anti patterns"], why: "Harry Brignull coined dark patterns in 2010 and later moved to deceptive patterns.", src: "Harry Brignull" }
    ]
  },
  {
    cat: "Wayfinding & Cities",
    qs: [
      { l: 1, q: "A dirt trail worn across a lawn where people actually walk, instead of the sidewalk, is called a...", a: "Desire path", w: ["Wayfinding line", "Shortcut node", "Edge path"], why: "It shows the route people want. Some campuses wait to see them before paving." },
      { l: 1, q: "A tall clock tower you can see from all over town and use to orient yourself is a...", a: "Landmark", w: ["Node", "Edge", "District"], why: "Landmarks are reference points you look at, not places you enter.", src: "Kevin Lynch" },
      { l: 2, q: "In a wayfinding study, the moments where someone has to choose which way to go are called...", a: "Decision points", w: ["Pain points", "Touchpoints", "Breakpoints"], why: "Signs matter most at decision points. Put them where the choice happens." },
      { l: 2, q: "A busy plaza where several streets meet and people gather is which of Lynch's elements?", a: "Node", w: ["Landmark", "Edge", "Path"], why: "Nodes are strategic spots you can enter, like junctions and squares.", src: "Kevin Lynch" },
      { l: 3, q: "A river or rail line that acts as a boundary people don't travel along is which of Lynch's elements?", a: "Edge", w: ["Path", "District", "Landmark"], why: "Edges are linear boundaries like shorelines, walls and rail cuts.", src: "Kevin Lynch" },
      { l: 3, q: "Kevin Lynch's word for how easily a city forms a strong picture in people's minds is...", a: "Imageability", w: ["Walkability", "Legibility", "Permeability"], why: "Lynch also used legibility, for how easily the parts can be recognized and organized.", src: "Kevin Lynch, 1960" },
      { l: 3, q: "How many elements did Kevin Lynch use to describe a person's mental map of a city?", a: "Five", w: ["Three", "Seven", "Ten"], why: "Paths, edges, districts, nodes and landmarks.", src: "Kevin Lynch, 1960" },
      { l: 4, q: "A \"You are here\" map on a wall should be oriented so that...", a: "Up on the map is the direction you're facing", w: ["North is always up", "The entrance is always at the bottom", "The largest building is at the center"], why: "When the map is turned to match your view, you don't have to rotate it in your head." },
      { l: 4, q: "Someone gets lost, notices, and finds their way back on track. What part of wayfinding is that?", a: "Recovery", w: ["Orientation", "Route decision", "Destination recognition"], why: "Good systems help people notice an error and correct it, not just follow the happy path." }
    ]
  },
  {
    cat: "Screens & States",
    qs: [
      { l: 1, q: "A small message pops up at the bottom saying \"Message archived. Undo.\" What is that component called in Material 3?", a: "Snackbar", w: ["Dialog", "Tooltip", "Banner"], why: "Snackbars give brief feedback and can hold a single action like Undo." },
      { l: 1, q: "What is the screen called that a person sees when there's nothing there yet, like an empty inbox?", a: "An empty state", w: ["A splash screen", "A loading state", "An error state"], why: "A good one explains what will appear and how to add the first thing." },
      { l: 2, q: "Grey boxes in the shape of the content appear while a page loads. What are they called?", a: "A skeleton screen", w: ["A spinner", "A placeholder image", "A wireframe"], why: "They make the wait feel shorter and show what's coming." },
      { l: 2, q: "A form tells you your password is too short while you're still typing. What is that called?", a: "Inline validation", w: ["Progressive disclosure", "Form autofill", "Input masking"], why: "Catching problems as people go beats a wall of errors after they hit submit." },
      { l: 2, q: "Material 3's round button that floats above the content for a screen's main action is the...", a: "Floating action button", w: ["Chip", "Segmented button", "Icon button"], why: "Called the FAB. One per screen, for the most important action." },
      { l: 3, q: "A reusable set of components, styles and rules that a team shares is called a...", a: "Design system", w: ["Mood board", "Style tile", "Wireframe kit"], why: "Material 3 is Google's. It keeps screens built by different people consistent." },
      { l: 3, q: "Named values like color.primary or spacing.medium that a design system uses everywhere are called...", a: "Design tokens", w: ["Variants", "Instances", "Breakpoints"], why: "Change a token once and every component that uses it updates." },
      { l: 4, q: "Instead of \"Are you sure you want to delete?\", many apps delete right away and offer Undo. Why?", a: "People click through confirmations without reading them", w: ["Undo is cheaper to build", "Confirmations are banned by accessibility rules", "Undo makes pages load faster"], why: "Confirmation dialogs become habit. Undo lets people recover from the mistake they actually made." },
      { l: 4, q: "Most products design a rich welcome for new users and almost nothing for when people leave. Designing that exit is called...", a: "Offboarding", w: ["Churn reduction", "Retargeting", "Sunsetting"], why: "Canceling, exporting your data and saying goodbye are part of the experience too.", src: "Joe Macleod" }
    ]
  },
  {
    cat: "Words on Screen",
    qs: [
      { l: 1, q: "A product's consistent personality is its voice. How that personality adjusts to the situation is its...", a: "Tone", w: ["Brand", "Style", "Diction"], why: "A playful app should get plain and calm on the screen where your card was declined." },
      { l: 1, q: "The small bits of text on buttons, labels, hints and errors are often called...", a: "Microcopy", w: ["Body copy", "Metadata", "Alt text"], why: "Small words, big effect. Most interface confusion starts with a label." },
      { l: 2, q: "Which is the better button label for submitting a benefits application?", a: "Submit application", w: ["Submit", "OK", "Continue"], why: "Say what will happen. A specific verb and object beats a generic word." },
      { l: 2, q: "Which error message does its job best?", a: "Enter a date in the future, like 10/20/2026", w: ["Invalid input", "Error 422: date validation failed", "Oops! Something went wrong"], why: "Say what went wrong and how to fix it, in plain words." },
      { l: 3, q: "Before button labels or layouts, some writers recommend starting interface work in which tool?", a: "A plain text editor", w: ["Figma", "A whiteboard", "A style guide"], why: "Writing what the product needs to say first brings clarity to the team before the screens.", src: "Michael J. Metts and Andy Welfle" },
      { l: 3, q: "Designing for a person who is panicked, grieving or rushed, instead of the calm average user, is designing for...", a: "Stress cases", w: ["Edge cases", "Use cases", "Test cases"], why: "Calling them edge cases makes real people sound rare and unimportant.", src: "Eric Meyer and Sara Wachter-Boettcher" },
      { l: 4, q: "A pool page lists classes as SS, SB1, SB2 and ST1 with no names. Which writing rule does it break?", a: "Don't use internal codes as labels", w: ["Keep labels under three words", "Always use title case", "Put the price first"], why: "The codes make sense to staff and mean nothing to a parent choosing a class." },
      { l: 4, q: "Writing so people can find what they need, understand it and use it the first time they read it is called...", a: "Plain language", w: ["Simple English", "Readable copy", "Low literacy writing"], why: "It is about clear structure and familiar words, not dumbing things down." }
    ]
  },
  {
    cat: "Our Class",
    qs: [
      { l: 1, q: "Which design kit did teams build their sprint screens from?", a: "Material 3", w: ["Apple's Human Interface Guidelines", "Bootstrap", "Fluent"], why: "Building inside a copy of the kit keeps the components working." },
      { l: 1, q: "In the Riverton IA lab, friction is any moment where you have to stop, search, remember or...", a: "Guess", w: ["Scroll", "Click", "Wait"], why: "Stop, search, remember or guess. Log each one." },
      { l: 2, q: "The SpeedyBeans owner wanted a regular customer to finish ordering in under how long?", a: "60 seconds", w: ["30 seconds", "2 minutes", "5 minutes"], why: "Most people reorder their usual, so the fastest path is a reorder with small changes." },
      { l: 2, q: "The YumBowl manager wanted how many choices or fewer before the review step?", a: "Four", w: ["Two", "Six", "Ten"], why: "Base, protein, toppings and the bowl or burrito choice." },
      { l: 2, q: "In the Riverton IA lab, \"The words don't match what's behind them\" is which problem type?", a: "Label", w: ["Hierarchy", "Wrong page", "Buried"], why: "Like \"Facility Information\" in the menu leading to the lap swim page." },
      { l: 3, q: "The Riverton home page shows four alerts at once, sorted by nothing. Which problem type?", a: "Too much", w: ["Hierarchy", "Duplication", "Buried"], why: "Everything is equally loud, so nothing gets heard." },
      { l: 3, q: "The rental request form lives on the Contact Us page. Which problem type?", a: "Wrong page", w: ["Buried", "Label", "Sequence"], why: "It is filed where the department put it, not where you'd look." },
      { l: 3, q: "The Riverton 311 city client wanted what on every single report?", a: "A ticket number", w: ["A photo", "An email address", "A map pin"], why: "Residents wanted proof the report went through, and the city wanted a way to track it." },
      { l: 4, q: "When a Riverton Rec swim class fills up while a parent is registering, the design had to...", a: "Keep what they entered and move them to the waitlist", w: ["Start the form over", "Show an error and stop", "Email them later"], why: "Losing someone's work at the last step is the worst possible ending." },
      { l: 4, q: "\"Get Started\" explains how to register only in its last section. Which Riverton problem type?", a: "Sequence", w: ["Buried", "Hierarchy", "Missing connection"], why: "The right information in the wrong order." },
      { l: 4, q: "The class schedule lists SB2 but its description lives on another page, so a parent needs three pages to pick a class. Which problem type?", a: "Missing connection", w: ["Duplication", "Wrong page", "Too much"], why: "Two things that need each other aren't linked." }
    ]
  },
  {
    cat: "Building for the Web",
    qs: [
      { l: 1, q: "On GitHub Pages, which file loads when someone visits the site's main address?", a: "index.html", w: ["home.html", "main.css", "readme.md"], why: "The server looks for index.html by default." },
      { l: 1, q: "In HTML, which tag makes a link?", a: "<a>", w: ["<link>", "<href>", "<url>"], why: "The href attribute on an <a> tag holds the address." },
      { l: 2, q: "Two CSS rules with the same specificity disagree. Which one wins?", a: "The one that comes later", w: ["The one that comes first", "The shorter one", "Neither, the browser picks randomly"], why: "That is why your custom.css loads after the base stylesheet." },
      { l: 2, q: "Which HTML element should wrap a site's main navigation links?", a: "<nav>", w: ["<div>", "<menu>", "<header>"], why: "Semantic elements tell screen readers and browsers what a section is." },
      { l: 3, q: "How many <h1> headings should a typical page have?", a: "One", w: ["One per section", "As many as you like", "None"], why: "One main heading, then h2 and h3 in order without skipping levels." },
      { l: 3, q: "A layout that rearranges itself to fit a phone, a tablet and a laptop is called...", a: "Responsive design", w: ["Adaptive branding", "Fluid typography", "Mobile only design"], why: "CSS media queries change the layout at different widths." },
      { l: 4, q: "You're on logs/week3.html. Which link goes back to the index.html one folder up?", a: "../index.html", w: ["./index.html", "/logs/index.html", "index.html"], why: "Two dots mean go up one folder." },
      { l: 4, q: "Which CSS property sets the space inside an element's border?", a: "padding", w: ["margin", "gap", "border spacing"], why: "Padding is inside the border. Margin is outside it." }
    ]
  }
];

const DAILY_DOUBLES = [
  { cat: "Deceptive Design", q: "Look at the decline link. Which pattern is this?", a: "Confirmshaming", w: ["Nagging", "Fake urgency", "Preselection"], why: "The decline link is written so that saying no feels like insulting yourself.", media: { type: "svg", svg: SVG_CONFIRMSHAME } },
  { cat: "Affordances", q: "Watch the clip. What makes a door a Norman door?", a: "Its design sends the wrong signal, so it needs a sign", w: ["Don Norman designed it", "It opens in both directions", "It has no handle at all"], why: "Its shape tells you to do the opposite of what it needs. Doors should explain themselves.", src: "Vox, \"It's not you. Bad doors are everywhere.\" 2016", media: { type: "video", url: "https://www.youtube.com/watch?v=yY96hTb8WgI", label: "Play the Vox clip", note: "Opens in a new tab. Share that tab with sound on, then come back.", svg: SVG_DOOR } },
  { cat: "Accessibility", q: "A rider without a smartphone reaches this gate. What is the core design problem?", a: "It offers only one way in, so it locks out anyone without that device", w: ["The paddles are the wrong color", "The sign says ENTRY instead of WAY IN", "The reader is placed too low"], why: "One required device means one group of people simply can't get through. Design for more than one way in." , media: { type: "svg", svg: SVG_FAREGATE } },
  { cat: "Wayfinding & Cities", q: "This is a resident's sketch map. In Kevin Lynch's terms, the highlighted river is a...", a: "Edge", w: ["Path", "Node", "Landmark"], why: "Edges are boundaries people don't travel along, like shorelines, walls and rivers.", src: "Kevin Lynch, 1960", media: { type: "svg", svg: SVG_LYNCH } },
  { cat: "Our Class", q: "In Riverton IA lab terms, what is the main problem with this home page?", a: "Hierarchy", w: ["Duplication", "Wrong page", "Sequence"], why: "Seven buttons of equal weight. The important thing is not the prominent thing.", media: { type: "svg", svg: SVG_HOMEPAGE } },
  { cat: "Our Class", q: "This Riverton 311 screen answers which research finding from the sprint?", a: "The same light often gets reported several times, which slows the queue", w: ["People want to see open times before picking a date", "People want the price to update as they add things", "People miss the counter call"], why: "Showing the existing report and a way to follow it stops duplicate tickets.", media: { type: "svg", svg: SVG_DUPLICATE } },
  { cat: "UX Laws", q: "Why is it so hard to close this ad on a phone?", a: "Fitts's law: the target is tiny and far from your thumb", w: ["Hick's law: there are too many choices", "Miller's law: you can't remember where the X is", "Jakob's law: ads never have close buttons"], why: "Small and far means slow and error prone. Here it's on purpose, which also makes it a deceptive pattern.", src: "Paul Fitts, 1954", media: { type: "svg", svg: SVG_CLOSEX } }
];

const FINALS = [
  { cat: "UX Laws", q: "Under the Doherty threshold, a system should respond within about how many milliseconds to keep people engaged?", fixed: ["40", "400", "1,500", "4,000"], a: "400", why: "Under roughly 400 milliseconds the exchange feels continuous.", src: "Walter Doherty and Ahrvind Thadani, 1982" },
  { cat: "Accessibility", q: "What contrast ratio does WCAG AA require for normal sized body text?", fixed: ["2 to 1", "3 to 1", "4.5 to 1", "7 to 1"], a: "4.5 to 1", why: "Large text needs 3 to 1. AAA asks for 7 to 1.", src: "WCAG 2" },
  { cat: "Wayfinding & Cities", q: "Kevin Lynch studied three American cities for The Image of the City. Which was NOT one of them?", a: "Chicago", w: ["Boston", "Jersey City", "Los Angeles"], why: "Boston, Jersey City and Los Angeles.", src: "Kevin Lynch, 1960" },
  { cat: "How People Think", q: "In the famous jam study, shoppers saw either 24 flavors or 6. Which display led to more purchases?", a: "The 6 flavor display", w: ["The 24 flavor display", "Both sold the same", "Neither sold any"], why: "More people stopped at 24, but far more bought from 6. Choice overload in action.", src: "Sheena Iyengar and Mark Lepper, 2000" }
];
