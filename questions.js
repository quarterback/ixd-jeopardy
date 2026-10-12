/*
  Question bank for UT330 Lock It In.

  Each question:
    kind     "q" (regular), "dd" (Daily Double, teams wager first), or "final" (Final Wager)
    value    points for a regular question (ignored for dd and final)
    category short label shown above the question
    prompt   the question
    options  exactly four answers, shown as A, B, C, D
    answer   index of the correct option: 0 = A, 1 = B, 2 = C, 3 = D
    explain  shown after the reveal
    source   shown after the reveal
    media    optional. { type: "svg", svg: "<svg ...>" }
             or { type: "video", url: "https://...", label: "...", note: "...", svg: "<svg ...>" }

  Order in this file is the order of play.
*/

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

const QUESTIONS = [
  // ---------- 100 ----------
  {
    kind: "q", value: 100, category: "Usability",
    prompt: "A progress bar shows your upload is 60 percent done. Which NN/g usability heuristic is it serving?",
    options: ["Recognition rather than recall", "Visibility of system status", "Aesthetic and minimalist design", "Help and documentation"],
    answer: 1,
    explain: "The design keeps people informed about what is going on, with feedback in a reasonable amount of time.",
    source: "Jakob Nielsen, 10 Usability Heuristics for User Interface Design, Nielsen Norman Group"
  },
  {
    kind: "q", value: 100, category: "Affordances",
    prompt: "A flat metal plate on a door tells you where to push. In Don Norman's vocabulary, the plate is a...",
    options: ["Constraint", "Mapping", "Signifier", "Conceptual model"],
    answer: 2,
    explain: "A signifier communicates where and how to act. The affordance is the push itself; the plate is the signal that makes it discoverable.",
    source: "Don Norman, The Design of Everyday Things, revised edition (2013)"
  },
  {
    kind: "q", value: 100, category: "Government design",
    prompt: "What is the first of the UK Government Design Principles?",
    options: ["Do less", "Design with data", "Make things open: it makes things better", "Start with user needs"],
    answer: 3,
    explain: "If you don't know what the user needs are, you won't build the right thing.",
    source: "Government Digital Service, Government Design Principles (gov.uk)"
  },
  {
    kind: "q", value: 100, category: "Content",
    prompt: "Content Everywhere uses NPR as its model for COPE. What does COPE stand for?",
    options: ["Create Once, Publish Everywhere", "Copy Once, Paste Everywhere", "Collect, Organize, Publish, Edit", "Content Owned by Product Engineering"],
    answer: 0,
    explain: "NPR built its CMS to keep content separate from display, so a story filed once could go to the website, apps, and partners without being rewritten for each one.",
    source: "Sara Wachter-Boettcher, Content Everywhere (Rosenfeld Media, 2012)"
  },
  {
    kind: "q", value: 100, category: "Usability",
    prompt: "When you tap a search box, the app lists your last five searches. Which heuristic is that?",
    options: ["Recognition rather than recall", "Error prevention", "User control and freedom", "Consistency and standards"],
    answer: 0,
    explain: "Showing recent options lets people pick from what they see instead of remembering and retyping it.",
    source: "Jakob Nielsen, 10 Usability Heuristics for User Interface Design, Nielsen Norman Group"
  },

  // ---------- Daily Double 1 (visual) ----------
  {
    kind: "dd", category: "Deceptive design",
    prompt: "Look at the decline link. Which deceptive pattern is this?",
    options: ["Nagging", "Fake urgency", "Confirmshaming", "Preselection"],
    answer: 2,
    explain: "It uses guilt or embarrassment to steer the choice. The decline link is written so saying no feels like insulting yourself.",
    source: "Harry Brignull, deceptive.design, Types of deceptive pattern",
    media: { type: "svg", svg: SVG_CONFIRMSHAME }
  },

  // ---------- 200 ----------
  {
    kind: "q", value: 200, category: "IDEO",
    prompt: "Which of these is NOT one of IDEO's seven brainstorming rules?",
    options: ["Defer judgment", "Encourage wild ideas", "Build on the ideas of others", "Vote on the best idea before moving on"],
    answer: 3,
    explain: "The seven rules are defer judgment, encourage wild ideas, build on the ideas of others, stay focused on the topic, one conversation at a time, be visual, and go for quantity.",
    source: "IDEO.org, Design Kit: Brainstorm Rules"
  },
  {
    kind: "q", value: 200, category: "Writing",
    prompt: "An insurance app is jokey on its home screen but plain and direct on its roadside emergency screen. Writing Is Designing calls that change a shift in...",
    options: ["Tone", "Voice", "Brand", "Style guide"],
    answer: 0,
    explain: "Voice is the product's consistent personality. Tone is how that personality adjusts to the situation the person is in.",
    source: "Michael J. Metts and Andy Welfle, Writing Is Designing (Rosenfeld Media, 2020), chapters 6 and 7"
  },
  {
    kind: "q", value: 200, category: "Endings",
    prompt: "Joe Macleod's Ends argues that products put enormous care into onboarding while neglecting...",
    options: ["Pricing pages", "Offboarding", "Notifications", "Error messages"],
    answer: 1,
    explain: "Macleod argues consumers get rich, emotional onboarding and barren offboarding, and that the ending is an overlooked part of the lifecycle.",
    source: "Joe Macleod, Ends (2017)"
  },
  {
    kind: "q", value: 200, category: "18F",
    prompt: "Which of these is NOT one of the four 18F Method Card phases?",
    options: ["Discover", "Decide", "Empathize", "Validate"],
    answer: 2,
    explain: "The 18F phases are Discover, Decide, Make, and Validate, plus a set of Fundamentals cards. Empathize comes from the Stanford d.school model.",
    source: "18F, Method Cards (methods.18f.gov)"
  },
  {
    kind: "q", value: 200, category: "Service blueprints",
    prompt: "On a service blueprint, what does the line of visibility separate?",
    options: ["Digital steps from physical steps", "The happy path from error states", "Research findings from design decisions", "What the customer sees from what happens out of their sight"],
    answer: 3,
    explain: "Above the line is frontstage, the actions the customer can see. Below it is backstage, the work that supports them out of view.",
    source: "G. Lynn Shostack, Designing Services That Deliver, Harvard Business Review (1984)"
  },
  {
    kind: "q", value: 200, category: "Research",
    prompt: "Jakob Nielsen argued that testing with five users finds about how much of a design's usability problems?",
    options: ["About a third", "About half", "About 85 percent", "All of them"],
    answer: 2,
    explain: "His advice is to run several small rounds of five and fix things in between, instead of one big study.",
    source: "Jakob Nielsen, Why You Only Need to Test with 5 Users, Nielsen Norman Group (2000)"
  },

  // ---------- Daily Double 2 (video) ----------
  {
    kind: "dd", category: "Affordances",
    prompt: "In the Vox clip with Don Norman and Roman Mars, what makes a door a Norman door?",
    options: ["Don Norman designed it", "It opens in both directions", "Its design sends the wrong signal, so it needs a sign to explain it", "It has no handle at all"],
    answer: 2,
    explain: "A Norman door's shape tells you to do the opposite of what it needs, so someone tapes up a sign. Doors should explain themselves.",
    source: "Vox, It's not you. Bad doors are everywhere. (2016), with Don Norman and Roman Mars of 99% Invisible",
    media: {
      type: "video",
      url: "https://www.youtube.com/watch?v=yY96hTb8WgI",
      label: "Play the Vox clip",
      note: "Opens in a new tab. Share that tab with sound on, then come back here.",
      svg: SVG_DOOR
    }
  },

  // ---------- 300 ----------
  {
    kind: "q", value: 300, category: "Affordances",
    prompt: "Jenny Davis shifts the affordance question from what objects afford to...",
    options: ["How they afford, for whom, and under what circumstances", "How much they cost to build", "Which users like them most", "What they look like on screen"],
    answer: 0,
    explain: "Her mechanisms and conditions framework asks how an artifact affords, for whom, and under what circumstances, which brings power and politics into the analysis.",
    source: "Jenny L. Davis, How Artifacts Afford (MIT Press, 2020)"
  },
  {
    kind: "q", value: 300, category: "Affordances",
    prompt: "Which of these is NOT one of Davis's conditions of affordance?",
    options: ["Perception", "Dexterity", "Cultural and institutional legitimacy", "Price"],
    answer: 3,
    explain: "The three conditions are perception, dexterity, and cultural and institutional legitimacy. They shape whether a mechanism works the same way for different people.",
    source: "Jenny L. Davis, How Artifacts Afford (MIT Press, 2020)"
  },
  {
    kind: "q", value: 300, category: "No UI",
    prompt: "Complete Golden Krishna's principle: Leverage computers instead of ___ them.",
    options: ["Serving", "Replacing", "Programming", "Upgrading"],
    answer: 0,
    explain: "Computers should do the tedious work for people. His other two principles are embrace typical processes instead of screens, and adapt to individuals.",
    source: "Golden Krishna, The Best Interface Is No Interface (New Riders, 2015)"
  },
  {
    kind: "q", value: 300, category: "Policy",
    prompt: "In Deliberate Intervention, policy written in response to a harm that has already happened is called...",
    options: ["Proactive policy", "Reactive policy", "Ex ante policy", "Adaptive policy"],
    answer: 1,
    explain: "Reactive policy is post hoc. Proactive policy shapes the future ex ante, before harm happens. Schmidt notes most policy in history has been reactive.",
    source: "Alexandra Schmidt, Deliberate Intervention (Rosenfeld Media, 2022)"
  },
  {
    kind: "q", value: 300, category: "Deceptive design",
    prompt: "Joining a gym takes two taps online. Canceling takes a phone call during business hours. Which deceptive pattern is this?",
    options: ["Sneaking", "Hard to cancel", "Nagging", "Fake scarcity"],
    answer: 1,
    explain: "Signing up is easy and leaving is made difficult on purpose. It has more logged examples on deceptive.design than any other type.",
    source: "Harry Brignull, deceptive.design, Types of deceptive pattern"
  },
  {
    kind: "q", value: 300, category: "Government design",
    prompt: "A benefits team spends months untangling three back office systems so applicants see one short form. Which GDS principle is that?",
    options: ["Do the hard work to make it simple", "Do less", "Be consistent, not uniform", "Make things open: it makes things better"],
    answer: 0,
    explain: "Making something look simple is easy. Making it simple to use is harder, especially when the systems underneath are complex.",
    source: "Government Digital Service, Government Design Principles (gov.uk)"
  },

  // ---------- Daily Double 3 (visual) ----------
  {
    kind: "dd", category: "Affordances",
    prompt: "For a rider without a smartphone, which Davis mechanism describes what this gate does?",
    options: ["Refuses", "Requests", "Discourages", "Allows"],
    answer: 0,
    explain: "It refuses: entry is not available to that rider at all. For a rider with a phone, the same gate allows. The mechanism changes with the conditions, which is Davis's point.",
    source: "Jenny L. Davis, How Artifacts Afford (MIT Press, 2020)",
    media: { type: "svg", svg: SVG_FAREGATE }
  },

  // ---------- 500 ----------
  {
    kind: "q", value: 500, category: "Affordances",
    prompt: "A city's online form won't submit until you pick a household type from a fixed list. In Davis's terms, the form...",
    options: ["Requests", "Demands", "Encourages", "Allows"],
    answer: 1,
    explain: "A request pushes you in a direction you can still decline. A demand gives you no way around it: no selection, no submission.",
    source: "Jenny L. Davis, How Artifacts Afford (MIT Press, 2020)"
  },
  {
    kind: "q", value: 500, category: "Government design",
    prompt: "Which GDS principle says the people who most need a service are often the people who find it hardest to use?",
    options: ["Start with user needs", "Understand context", "This is for everyone", "Build digital services, not websites"],
    answer: 2,
    explain: "Accessible design is good design, and if elegance has to be sacrificed for that, so be it.",
    source: "Government Digital Service, Government Design Principles (gov.uk)"
  },
  {
    kind: "q", value: 500, category: "Writing",
    prompt: "Before button labels or voice guidelines, Metts and Welfle say to start with which underrated design tool?",
    options: ["Figma", "A text editor", "A whiteboard", "A style guide"],
    answer: 1,
    explain: "Write what the product needs to say in plain text first, without worrying about layout. It brings clarity to the team before it reaches users.",
    source: "Michael J. Metts and Andy Welfle, Writing Is Designing (Rosenfeld Media, 2020), chapter 3"
  },
  {
    kind: "q", value: 500, category: "Strategy",
    prompt: "On a Wardley map, the horizontal axis runs from Genesis to...",
    options: ["Product", "Retirement", "Market", "Commodity"],
    answer: 3,
    explain: "Genesis, custom built, product, commodity. The vertical axis is the value chain, ordered by how visible each part is to the user.",
    source: "Simon Wardley, Wardley Maps"
  },
  {
    kind: "q", value: 500, category: "Government design",
    prompt: "In April 2025 the UK added an eleventh Government Design Principle. What is it about?",
    options: ["Using AI responsibly", "Designing mobile first", "Measuring user satisfaction", "Minimising environmental impact"],
    answer: 3,
    explain: "Digital services use real energy, water, and materials, and even small improvements reduce that.",
    source: "Government Digital Service, Government Design Principles (gov.uk), updated 2 April 2025"
  },

  // ---------- Daily Double 4 (visual) ----------
  {
    kind: "dd", category: "Cities",
    prompt: "This is a resident's sketch map. In Kevin Lynch's terms, the highlighted river is a...",
    options: ["Path", "Edge", "Node", "Landmark"],
    answer: 1,
    explain: "Edges are linear boundaries people don't travel along as paths: shorelines, rail cuts, walls, rivers. The other elements are paths, districts, nodes, and landmarks.",
    source: "Kevin Lynch, The Image of the City (MIT Press, 1960)",
    media: { type: "svg", svg: SVG_LYNCH }
  },

  // ---------- Final ----------
  {
    kind: "final", category: "18F",
    prompt: "Under the Paperwork Reduction Act, what is the most people an 18F team could ask the same set of questions without OMB clearance?",
    options: ["5", "9", "12", "25"],
    answer: 1,
    explain: "The PRA kicks in at ten or more people answering identical questions, which is why 18F leans on interviews, usability tests, and direct observation.",
    source: "18F, User Experience Guide: Legal and privacy (ux-guide.18f.gov)"
  }
];
