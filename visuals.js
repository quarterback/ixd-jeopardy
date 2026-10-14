/* Drawings used by the question bank. Plain inline SVG, so nothing loads from the web.
   phone() and browser() wrap a screen in a device frame. */

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


/* ---------- frames ---------- */
// Phone screen area: x 148 to 332, y 18 to 302.
function phone(inner, bg) {
  return `<svg viewBox="132 2 216 316" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Arial, Helvetica, sans-serif">
  <rect x="138" y="6" width="204" height="308" rx="26" fill="#0d0f14"/>
  <rect x="148" y="18" width="184" height="284" rx="16" fill="${bg || "#fbfbfd"}"/>
  ${inner}</svg>`;
}
// Browser content area: x 20 to 460, y 44 to 304.
function browser(inner, url) {
  return `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Arial, Helvetica, sans-serif">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <rect x="14" y="10" width="452" height="300" rx="10" fill="#fbfbfd"/>
  <rect x="14" y="10" width="452" height="30" rx="10" fill="#dfe3ea"/>
  <rect x="14" y="30" width="452" height="10" fill="#dfe3ea"/>
  <circle cx="32" cy="25" r="4" fill="#e0544a"/><circle cx="46" cy="25" r="4" fill="#f2b632"/><circle cx="60" cy="25" r="4" fill="#2fbf71"/>
  <rect x="80" y="17" width="300" height="16" rx="8" fill="#fbfbfd"/>
  <text x="92" y="29" font-size="10" fill="#6b7280">${url || "example.com"}</text>
  ${inner}</svg>`;
}

/* ---------- Gestalt ---------- */
const SVG_PROXIMITY = browser(`
  <text x="60" y="78" font-size="16" font-weight="700" fill="#1d1f27">Create your account</text>
  <text x="60" y="104" font-size="13" fill="#3a3f4c">Email</text>
  <rect x="60" y="140" width="300" height="30" rx="5" fill="#fff" stroke="#9aa1ad"/>
  <text x="60" y="186" font-size="13" fill="#3a3f4c">Password</text>
  <rect x="60" y="222" width="300" height="30" rx="5" fill="#fff" stroke="#9aa1ad"/>
  <text x="60" y="268" font-size="13" fill="#3a3f4c">Confirm password</text>
  <rect x="60" y="276" width="110" height="22" rx="5" fill="#1f4e79"/><text x="115" y="291" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Sign up</text>`, "signup.example.com");

const SVG_CARDS = phone(`
  <text x="160" y="44" font-size="13" font-weight="700" fill="#1d1f27">Near you</text>
  <g>
    <rect x="158" y="54" width="164" height="110" rx="10" fill="#fff" stroke="#d6dae2"/>
    <rect x="158" y="54" width="164" height="62" rx="10" fill="#f0b07a"/><circle cx="240" cy="85" r="18" fill="#c46a3a"/>
    <text x="168" y="134" font-size="11" font-weight="700" fill="#1d1f27">Taqueria Sol</text>
    <text x="168" y="152" font-size="10" fill="#6b7280">★ 4.7 · 20 to 30 min</text>
  </g>
  <g>
    <rect x="158" y="174" width="164" height="110" rx="10" fill="#fff" stroke="#d6dae2"/>
    <rect x="158" y="174" width="164" height="62" rx="10" fill="#9fd3a8"/><circle cx="240" cy="205" r="18" fill="#4f9a5d"/>
    <text x="168" y="254" font-size="11" font-weight="700" fill="#1d1f27">Green Bowl</text>
    <text x="168" y="272" font-size="10" fill="#6b7280">★ 4.5 · 15 to 25 min</text>
  </g>`);

const SVG_CLOSURE = `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <circle cx="240" cy="160" r="96" fill="none" stroke="#f2b632" stroke-width="22" stroke-dasharray="58 18" transform="rotate(-20 240 160)"/>
  <circle cx="240" cy="160" r="40" fill="none" stroke="#eef1ff" stroke-width="10" stroke-dasharray="40 23"/>
</svg>`;

const SVG_TRACKER = phone(`
  <text x="160" y="46" font-size="13" font-weight="700" fill="#1d1f27">Your order</text>
  <text x="160" y="64" font-size="10" fill="#6b7280">Arriving in about 18 min</text>
  <line x1="176" y1="92" x2="176" y2="252" stroke="#c9ced8" stroke-width="4"/>
  <line x1="176" y1="92" x2="176" y2="172" stroke="#2fbf71" stroke-width="4"/>
  <g font-size="11" fill="#1d1f27">
    <circle cx="176" cy="92" r="9" fill="#2fbf71"/><text x="194" y="96">Order placed</text>
    <circle cx="176" cy="132" r="9" fill="#2fbf71"/><text x="194" y="136">Cooking</text>
    <circle cx="176" cy="172" r="9" fill="#2fbf71" stroke="#fff" stroke-width="3"/><text x="194" y="176" font-weight="700">On the way</text>
    <circle cx="176" cy="212" r="9" fill="#fff" stroke="#c9ced8" stroke-width="3"/><text x="194" y="216" fill="#9aa1ad">Almost there</text>
    <circle cx="176" cy="252" r="9" fill="#fff" stroke="#c9ced8" stroke-width="3"/><text x="194" y="256" fill="#9aa1ad">Delivered</text>
  </g>`);

/* ---------- Screens and states ---------- */
const SVG_EMPTY = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Your playlists</text>
  <circle cx="240" cy="132" r="38" fill="#ece7fb"/>
  <path d="M232 112 v32 a8 8 0 1 1 -6 -8 M232 112 l20 -6 v28 a8 8 0 1 1 -6 -8" fill="none" stroke="#6b4fd8" stroke-width="4"/>
  <text x="240" y="196" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">No playlists yet</text>
  <text x="240" y="214" text-anchor="middle" font-size="10" fill="#6b7280">Save songs you love in one place.</text>
  <rect x="180" y="230" width="120" height="30" rx="15" fill="#6b4fd8"/>
  <text x="240" y="249" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Make a playlist</text>`);

const SVG_SKELETON = phone(`
  <g fill="#e3e6ec">
    <circle cx="172" cy="46" r="12"/><rect x="190" y="38" width="80" height="8" rx="4"/><rect x="190" y="50" width="50" height="7" rx="3"/>
    <rect x="158" y="68" width="164" height="96" rx="8"/>
    <rect x="158" y="172" width="140" height="8" rx="4"/><rect x="158" y="186" width="110" height="8" rx="4"/>
    <circle cx="172" cy="220" r="12"/><rect x="190" y="212" width="80" height="8" rx="4"/><rect x="190" y="224" width="50" height="7" rx="3"/>
    <rect x="158" y="242" width="164" height="52" rx="8"/>
  </g>`);

const SVG_SNACKBAR = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Chats</text>
  <g font-size="11" fill="#1d1f27">
    <circle cx="174" cy="76" r="13" fill="#f2b632"/><text x="196" y="74" font-weight="700">Maya</text><text x="196" y="88" fill="#6b7280" font-size="10">see you at 6?</text>
    <circle cx="174" cy="114" r="13" fill="#7fb4e8"/><text x="196" y="112" font-weight="700">Study group</text><text x="196" y="126" fill="#6b7280" font-size="10">Jay: who has the notes</text>
    <circle cx="174" cy="152" r="13" fill="#9fd3a8"/><text x="196" y="150" font-weight="700">Mom</text><text x="196" y="164" fill="#6b7280" font-size="10">call me when you can</text>
  </g>
  <rect x="156" y="252" width="168" height="34" rx="6" fill="#2e3036"/>
  <text x="166" y="273" font-size="10" fill="#fff">Conversation archived</text>
  <text x="314" y="273" text-anchor="end" font-size="10" font-weight="700" fill="#b9a6ff">UNDO</text>`);

const SVG_BADGE = phone(`
  <g>
    ${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${166 + c * 52}" y="${40 + r * 62}" width="40" height="40" rx="10" fill="${["#7fb4e8", "#f0b07a", "#9fd3a8", "#c9a7f0", "#f2b632", "#e88f8f", "#8fd0d6", "#b8c0cc", "#e8c47f"][r * 3 + c]}"/>`).join("")).join("")}
    <circle cx="258" cy="104" r="12" fill="#e0544a"/><text x="258" y="108" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">99+</text>
  </g>
  <text x="240" y="250" text-anchor="middle" font-size="10" fill="#6b7280">Your home screen</text>`, "#1d2a4a");

const SVG_BOTTOMNAV = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">For you</text>
  <rect x="158" y="58" width="164" height="90" rx="8" fill="#e8ecf3"/>
  <rect x="158" y="156" width="164" height="90" rx="8" fill="#e8ecf3"/>
  <rect x="148" y="256" width="184" height="46" fill="#fff" stroke="#e3e6ec"/>
  <g fill="#3a3f4c" font-size="8" text-anchor="middle">
    <path d="M166 270 l9 -7 l9 7 v10 h-18 z" fill="#1d1f27"/><text x="175" y="294">Home</text>
    <circle cx="210" cy="271" r="6" fill="none" stroke="#3a3f4c" stroke-width="2"/><text x="211" y="294">Search</text>
    <rect x="236" y="263" width="18" height="16" rx="5" fill="#3a3f4c"/><text x="245" y="294">Create</text>
    <rect x="270" y="265" width="16" height="12" rx="2" fill="none" stroke="#3a3f4c" stroke-width="2"/><text x="278" y="294">Inbox</text>
    <circle cx="312" cy="268" r="5" fill="#3a3f4c"/><path d="M304 280 a8 6 0 0 1 16 0" fill="#3a3f4c"/><text x="312" y="294">Profile</text>
  </g>`);

const SVG_HAMBURGER = phone(`
  <rect x="148" y="18" width="184" height="40" rx="16" fill="#1f4e79"/><rect x="148" y="40" width="184" height="18" fill="#1f4e79"/>
  <g stroke="#fff" stroke-width="3" stroke-linecap="round"><line x1="162" y1="31" x2="178" y2="31"/><line x1="162" y1="38" x2="178" y2="38"/><line x1="162" y1="45" x2="178" y2="45"/></g>
  <text x="240" y="43" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">City Transit</text>
  <rect x="158" y="70" width="164" height="70" rx="8" fill="#e8ecf3"/>
  <text x="168" y="92" font-size="11" font-weight="700" fill="#1d1f27">Next bus</text>
  <text x="168" y="112" font-size="20" font-weight="700" fill="#1f4e79">4 min</text>
  <rect x="158" y="150" width="164" height="40" rx="8" fill="#e8ecf3"/>
  <rect x="158" y="198" width="164" height="40" rx="8" fill="#e8ecf3"/>
  <text x="240" y="268" text-anchor="middle" font-size="9" fill="#6b7280">Fares and alerts are in the menu.</text>`);

/* ---------- Laws and how people think ---------- */
const SVG_HICK = phone(`
  <text x="160" y="44" font-size="13" font-weight="700" fill="#1d1f27">Add toppings</text>
  <g font-size="7" fill="#3a3f4c" text-anchor="middle">
    ${["Corn", "Beans", "Rice", "Kale", "Salsa", "Queso", "Lime", "Onion", "Jalapeño", "Cilantro", "Feta", "Olives", "Peppers", "Tomato", "Cabbage", "Mango", "Pickles", "Sesame", "Avocado", "Radish", "Garlic", "Chili oil", "Herbs", "Crema", "Nori", "Egg", "Tofu", "Beets", "Carrot", "Mint"].map((t, i) => `<rect x="${156 + (i % 3) * 56}" y="${54 + Math.floor(i / 3) * 22}" width="50" height="17" rx="8" fill="#eef0f4" stroke="#d6dae2"/><text x="${181 + (i % 3) * 56}" y="${66 + Math.floor(i / 3) * 22}">${t}</text>`).join("")}
  </g>
  <text x="240" y="292" text-anchor="middle" font-size="9" fill="#6b7280">Choose up to 4</text>`);

const SVG_JAKOB = browser(`
  <rect x="14" y="40" width="452" height="34" fill="#fff" stroke="#e3e6ec"/>
  <text x="34" y="62" font-size="14" font-weight="700" fill="#1d1f27">thread&amp;co</text>
  <g font-size="11" fill="#3a3f4c"><text x="180" y="62">Women</text><text x="230" y="62">Men</text><text x="270" y="62">Sale</text></g>
  <text x="446" y="62" text-anchor="end" font-size="11" fill="#3a3f4c">Help</text>
  <g fill="#e8ecf3"><rect x="34" y="86" width="126" height="126" rx="6"/><rect x="176" y="86" width="126" height="126" rx="6"/><rect x="318" y="86" width="126" height="126" rx="6"/></g>
  <g font-size="10" fill="#1d1f27"><text x="34" y="228">Rain jacket  $68</text><text x="176" y="228">Wool beanie  $24</text><text x="318" y="228">Canvas tote  $30</text></g>
  <rect x="14" y="250" width="452" height="56" fill="#f0f2f6"/>
  <g font-size="10" fill="#6b7280"><text x="34" y="276">About</text><text x="80" y="276">Returns</text><text x="134" y="276">Shipping</text></g>
  <rect x="34" y="284" width="16" height="12" rx="2" fill="none" stroke="#3a3f4c" stroke-width="2"/><text x="56" y="294" font-size="10" fill="#3a3f4c">Your bag (2)</text>`, "threadandco.example.com");

const SVG_STAMPCARD = `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Arial, Helvetica, sans-serif">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <rect x="70" y="70" width="340" height="180" rx="14" fill="#f6efe2"/>
  <text x="96" y="108" font-size="18" font-weight="700" fill="#5a3b22">Corner Coffee</text>
  <text x="96" y="128" font-size="11" fill="#7a5a3a">10 stamps = a free drink</text>
  ${Array.from({ length: 10 }, (_, i) => `<circle cx="${110 + (i % 5) * 64}" cy="${162 + Math.floor(i / 5) * 54}" r="19" fill="${i < 2 ? "#b5532e" : "none"}" stroke="#b5532e" stroke-width="2.5"/>${i < 2 ? `<text x="${110 + (i % 5) * 64}" y="${166 + Math.floor(i / 5) * 54}" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">FREE</text>` : ""}`).join("")}
</svg>`;

const SVG_PRICING = browser(`
  <text x="240" y="76" text-anchor="middle" font-size="15" font-weight="700" fill="#1d1f27">Pick a plan</text>
  <g font-size="11" text-anchor="middle">
    <rect x="40" y="96" width="120" height="180" rx="10" fill="#fff" stroke="#d6dae2"/>
    <text x="100" y="126" font-weight="700" fill="#1d1f27">Basic</text><text x="100" y="160" font-size="22" font-weight="700" fill="#1d1f27">$4</text><text x="100" y="178" fill="#6b7280">per month</text>
    <rect x="180" y="86" width="120" height="200" rx="10" fill="#fff8e6" stroke="#f2b632" stroke-width="3"/>
        <text x="240" y="126" font-weight="700" fill="#1d1f27">Plus</text><text x="240" y="160" font-size="22" font-weight="700" fill="#1d1f27">$9</text><text x="240" y="178" fill="#6b7280">per month</text>
    <rect x="320" y="96" width="120" height="180" rx="10" fill="#fff" stroke="#d6dae2"/>
    <text x="380" y="126" font-weight="700" fill="#1d1f27">Pro</text><text x="380" y="160" font-size="22" font-weight="700" fill="#1d1f27">$19</text><text x="380" y="178" fill="#6b7280">per month</text>
  </g>`, "plans.example.com");

/* ---------- Usability ---------- */
const SVG_UPLOAD = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">New post</text>
  <rect x="158" y="60" width="164" height="120" rx="8" fill="#c9d6e8"/>
  <path d="M220 110 l14 18 l10 -12 l18 22 h-58 z" fill="#8aa1c2"/>
  <text x="160" y="206" font-size="11" fill="#1d1f27">Uploading video</text>
  <text x="320" y="206" text-anchor="end" font-size="11" font-weight="700" fill="#1d1f27">60%</text>
  <rect x="160" y="214" width="160" height="8" rx="4" fill="#e3e6ec"/>
  <rect x="160" y="214" width="96" height="8" rx="4" fill="#2f7de1"/>
  <text x="160" y="240" font-size="9" fill="#6b7280">About 20 seconds left</text>`);

const SVG_CALENDAR = phone(`
  <text x="160" y="44" font-size="13" font-weight="700" fill="#1d1f27">Pick a pickup date</text>
  <text x="240" y="66" text-anchor="middle" font-size="11" font-weight="700" fill="#3a3f4c">October</text>
  <g font-size="9" text-anchor="middle">
    ${Array.from({ length: 31 }, (_, i) => { const d = i + 1, c = (i + 3) % 7, r = Math.floor((i + 3) / 7); const past = d < 12; return `<text x="${166 + c * 25}" y="${90 + r * 26}" fill="${past ? "#c4c8d0" : d === 14 ? "#fff" : "#1d1f27"}">${d === 14 ? "" : d}</text>${d === 14 ? `<circle cx="${166 + c * 25}" cy="${87 + r * 26}" r="9" fill="#2f7de1"/><text x="${166 + c * 25}" y="${90 + r * 26}" fill="#fff" font-weight="700">14</text>` : ""}${past ? `<line x1="${160 + c * 25}" y1="${87 + r * 26}" x2="${172 + c * 25}" y2="${87 + r * 26}" stroke="#c4c8d0"/>` : ""}`; }).join("")}
  </g>`);

const SVG_RECENT = phone(`
  <rect x="158" y="32" width="164" height="30" rx="15" fill="#eef0f4" stroke="#2f7de1" stroke-width="2"/>
  <circle cx="176" cy="47" r="5" fill="none" stroke="#6b7280" stroke-width="2"/>
  <text x="188" y="51" font-size="11" fill="#9aa1ad">Search</text>
  <text x="160" y="84" font-size="10" font-weight="700" fill="#6b7280">RECENT</text>
  <g font-size="11" fill="#1d1f27">
    ${["thai food near me", "pharmacy open now", "bike repair", "library hours", "laundromat"].map((t, i) => `<text x="180" y="${108 + i * 28}">${t}</text><circle cx="167" cy="${104 + i * 28}" r="5" fill="none" stroke="#9aa1ad" stroke-width="1.5"/>`).join("")}
  </g>`);

const SVG_ERRCODE = browser(`
  <rect x="120" y="80" width="240" height="160" rx="10" fill="#fff" stroke="#c9ced8"/>
  <circle cx="148" cy="112" r="12" fill="#e0544a"/><text x="148" y="117" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">!</text>
  <text x="170" y="117" font-size="13" font-weight="700" fill="#1d1f27">Error</text>
  <text x="140" y="148" font-size="11" fill="#3a3f4c">Operation failed.</text>
  <text x="140" y="166" font-size="11" fill="#3a3f4c">Code 0x80070057</text>
  <rect x="290" y="202" width="56" height="26" rx="5" fill="#1f4e79"/><text x="318" y="219" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">OK</text>`, "account.example.com/signup");

/* ---------- Accessibility ---------- */
const SVG_REDONLY = browser(`
  <text x="60" y="76" font-size="15" font-weight="700" fill="#1d1f27">Shipping address</text>
  <g font-size="11" fill="#3a3f4c">
    <text x="60" y="102">Street</text><rect x="60" y="108" width="300" height="26" rx="4" fill="#fff" stroke="#e0544a" stroke-width="2"/>
    <text x="60" y="152">City</text><rect x="60" y="158" width="180" height="26" rx="4" fill="#fff" stroke="#9aa1ad"/>
    <text x="256" y="152">ZIP</text><rect x="256" y="158" width="104" height="26" rx="4" fill="#fff" stroke="#e0544a" stroke-width="2"/>
    <text x="68" y="174" fill="#1d1f27">Ann Arbor</text>
  </g>
  <rect x="60" y="206" width="110" height="30" rx="5" fill="#1f4e79"/><text x="115" y="225" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Continue</text>`, "shop.example.com/checkout");

const SVG_CONTRAST = phone(`
  <text x="240" y="70" text-anchor="middle" font-size="16" font-weight="700" fill="#c9ccd3">Welcome back</text>
  <text x="240" y="90" text-anchor="middle" font-size="10" fill="#d4d7dd">Sign in to see your orders</text>
  <rect x="164" y="112" width="152" height="30" rx="6" fill="#fff" stroke="#eceef2"/><text x="174" y="131" font-size="10" fill="#dfe2e7">Email</text>
  <rect x="164" y="152" width="152" height="30" rx="6" fill="#fff" stroke="#eceef2"/><text x="174" y="171" font-size="10" fill="#dfe2e7">Password</text>
  <rect x="164" y="200" width="152" height="34" rx="17" fill="#f1f3f6"/><text x="240" y="221" text-anchor="middle" font-size="12" font-weight="700" fill="#cfd3da">Sign in</text>`);

/* ---------- Deceptive design ---------- */
const SVG_PRESELECT = phone(`
  <text x="160" y="44" font-size="13" font-weight="700" fill="#1d1f27">Review your trip</text>
  <g font-size="10" fill="#3a3f4c">
    <text x="160" y="74">DTW to MSP, Fri</text><text x="320" y="74" text-anchor="end">$148</text>
    <text x="160" y="94">Seat 14C</text><text x="320" y="94" text-anchor="end">$0</text>
  </g>
  <rect x="158" y="110" width="164" height="54" rx="8" fill="#eef5ff" stroke="#bcd3f5"/>
  <rect x="166" y="120" width="14" height="14" rx="3" fill="#2f7de1"/><path d="M169 127 l3 3 l6 -6" stroke="#fff" stroke-width="2" fill="none"/>
  <text x="186" y="131" font-size="10" font-weight="700" fill="#1d1f27">Trip protection</text>
  <text x="186" y="147" font-size="9" fill="#6b7280">Recommended</text><text x="314" y="131" text-anchor="end" font-size="10" fill="#1d1f27">+$29</text>
  <line x1="160" y1="182" x2="320" y2="182" stroke="#e3e6ec"/>
  <text x="160" y="202" font-size="11" font-weight="700" fill="#1d1f27">Total</text><text x="320" y="202" text-anchor="end" font-size="11" font-weight="700" fill="#1d1f27">$177</text>
  <rect x="160" y="226" width="160" height="34" rx="17" fill="#2f7de1"/><text x="240" y="247" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Pay $177</text>`);

const SVG_COUNTDOWN = phone(`
  <rect x="148" y="18" width="184" height="64" rx="16" fill="#e0544a"/><rect x="148" y="60" width="184" height="22" fill="#e0544a"/>
  <text x="240" y="44" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">YOUR TICKETS ARE HELD FOR</text>
  <text x="240" y="72" text-anchor="middle" font-size="24" font-weight="700" fill="#fff">04:59</text>
  <text x="160" y="110" font-size="12" font-weight="700" fill="#1d1f27">Indie Night at The Ark</text>
  <text x="160" y="128" font-size="10" fill="#6b7280">2 general admission</text>
  <rect x="160" y="226" width="160" height="34" rx="17" fill="#1d1f27"/><text x="240" y="247" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Buy now</text>`);

const SVG_FEES = phone(`
  <text x="160" y="44" font-size="13" font-weight="700" fill="#1d1f27">Checkout · step 4 of 4</text>
  <g font-size="10" fill="#3a3f4c">
    <text x="160" y="76">Burrito bowl</text><text x="320" y="76" text-anchor="end">$12.00</text>
    <text x="160" y="104">Service fee</text><text x="320" y="104" text-anchor="end">$3.49</text>
    <text x="160" y="122">Delivery fee</text><text x="320" y="122" text-anchor="end">$4.99</text>
    <text x="160" y="140">Small order fee</text><text x="320" y="140" text-anchor="end">$2.50</text>
    <text x="160" y="158">Regulatory response fee</text><text x="320" y="158" text-anchor="end">$0.99</text>
  </g>
  <line x1="160" y1="172" x2="320" y2="172" stroke="#e3e6ec"/>
  <text x="160" y="192" font-size="12" font-weight="700" fill="#1d1f27">Total</text><text x="320" y="192" text-anchor="end" font-size="12" font-weight="700" fill="#1d1f27">$23.97</text>
  <rect x="160" y="226" width="160" height="34" rx="17" fill="#2fbf71"/><text x="240" y="247" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Place order</text>`);

const SVG_COOKIES = browser(`
  <rect x="40" y="56" width="400" height="20" rx="4" fill="#e8ecf3"/><rect x="40" y="86" width="300" height="12" rx="4" fill="#eef0f4"/><rect x="40" y="106" width="340" height="12" rx="4" fill="#eef0f4"/>
  <rect x="14" y="196" width="452" height="114" fill="#1d1f27"/>
  <text x="40" y="224" font-size="12" font-weight="700" fill="#fff">We value your privacy</text>
  <text x="40" y="242" font-size="10" fill="#c9ccd3">We and 847 partners use cookies to personalize content and ads.</text>
  <rect x="250" y="256" width="190" height="36" rx="6" fill="#2fbf71"/><text x="345" y="279" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">ACCEPT ALL</text>
  <text x="40" y="279" font-size="8" fill="#5a5e68">Manage options</text>`, "news.example.com");

/* ---------- Information architecture ---------- */
const SVG_BREADCRUMB = browser(`
  <g font-size="11"><text x="40" y="66" fill="#2f5fb3" text-decoration="underline">Home</text><text x="76" y="66" fill="#6b7280">›</text>
  <text x="88" y="66" fill="#2f5fb3" text-decoration="underline">Parks</text><text x="122" y="66" fill="#6b7280">›</text>
  <text x="134" y="66" fill="#2f5fb3" text-decoration="underline">Pools</text><text x="168" y="66" fill="#6b7280">›</text>
  <text x="180" y="66" fill="#1d1f27">Lap swim</text></g>
  <text x="40" y="104" font-size="20" font-weight="700" fill="#1d1f27">Lap swim</text>
  <rect x="40" y="120" width="380" height="10" rx="4" fill="#eef0f4"/><rect x="40" y="138" width="340" height="10" rx="4" fill="#eef0f4"/><rect x="40" y="156" width="360" height="10" rx="4" fill="#eef0f4"/>`, "city.example.gov/parks/pools/lap-swim");

const SVG_SCENT = browser(`
  <rect x="14" y="40" width="452" height="40" fill="#1f4e79"/>
  <text x="34" y="65" font-size="13" font-weight="700" fill="#fff">City of Maple Falls</text>
  <g font-size="11" fill="#fff"><text x="214" y="65">Solutions</text><text x="278" y="65">Resources</text><text x="346" y="65">Explore</text><text x="404" y="65">More</text></g>
  <text x="40" y="120" font-size="18" font-weight="700" fill="#1d1f27">Welcome to Maple Falls</text>
  <rect x="40" y="136" width="400" height="120" rx="8" fill="#e8ecf3"/>`, "maplefalls.example.gov");

/* ---------- Wayfinding ---------- */
const SVG_DESIRE = `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Arial, Helvetica, sans-serif">
  <rect width="480" height="320" fill="#7fbf6a"/>
  <path d="M40 40 H440 V280" fill="none" stroke="#d9d4c7" stroke-width="22"/>
  <path d="M40 40 V280 H440" fill="none" stroke="#d9d4c7" stroke-width="22"/>
  <path d="M52 268 C 160 190, 300 120, 428 52" fill="none" stroke="#a9875a" stroke-width="9" stroke-linecap="round" stroke-dasharray="1 0"/>
  <rect x="30" y="250" width="46" height="40" fill="#8a5a44"/><text x="53" y="306" text-anchor="middle" font-size="11" fill="#1d1f27">Dorm</text>
  <rect x="404" y="20" width="56" height="40" fill="#5a6b8a"/><text x="432" y="14" text-anchor="middle" font-size="11" fill="#1d1f27">Library</text>
</svg>`;

/* ---------- Words ---------- */
const SVG_DIALOG = phone(`
  <rect x="148" y="18" width="184" height="284" rx="16" fill="#000" opacity="0.35"/>
  <rect x="160" y="96" width="160" height="128" rx="12" fill="#fff"/>
  <text x="172" y="122" font-size="11" font-weight="700" fill="#1d1f27">Are you sure you don't</text>
  <text x="172" y="137" font-size="11" font-weight="700" fill="#1d1f27">want to keep your draft?</text>
  <text x="172" y="160" font-size="9" fill="#6b7280">This can't be undone.</text>
  <text x="250" y="205" text-anchor="end" font-size="11" font-weight="700" fill="#2f7de1">Cancel</text>
  <text x="306" y="205" text-anchor="end" font-size="11" font-weight="700" fill="#2f7de1">OK</text>`);

/* ---------- Affordances ---------- */
const SVG_NOSIGNIFIER = phone(`
  <circle cx="240" cy="70" r="28" fill="#c9a7f0"/>
  <text x="240" y="122" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">Jordan Lee</text>
  <text x="240" y="140" text-anchor="middle" font-size="10" fill="#6b7280">Ann Arbor · joined 2024</text>
  <text x="240" y="160" text-anchor="middle" font-size="10" fill="#6b7280">Edit profile</text>
  <line x1="160" y1="178" x2="320" y2="178" stroke="#e3e6ec"/>
  <g fill="#e8ecf3"><rect x="160" y="190" width="50" height="50"/><rect x="215" y="190" width="50" height="50"/><rect x="270" y="190" width="50" height="50"/><rect x="160" y="245" width="50" height="50"/><rect x="215" y="245" width="50" height="50"/><rect x="270" y="245" width="50" height="50"/></g>`);

const SVG_STOVE = `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img">
  <rect width="480" height="320" fill="#2b2f3a"/>
  <rect x="110" y="30" width="260" height="210" rx="10" fill="#1d1f27"/>
  <g fill="none" stroke="#555b66" stroke-width="6"><circle cx="180" cy="90" r="34"/><circle cx="300" cy="90" r="26"/><circle cx="180" cy="180" r="26"/><circle cx="300" cy="180" r="34"/></g>
  <rect x="110" y="250" width="260" height="46" rx="8" fill="#c9ccd3"/>
  <g fill="#3a3f4c">${[150, 210, 270, 330].map(x => `<circle cx="${x}" cy="273" r="14"/><rect x="${x - 2}" y="260" width="4" height="12" fill="#c9ccd3"/>`).join("")}</g>
</svg>`;

/* ---------- Maps and flows ---------- */
const SVG_WIREFRAME = browser(`
  <g fill="none" stroke="#9aa1ad" stroke-width="2">
    <rect x="34" y="54" width="90" height="20"/><rect x="300" y="54" width="146" height="20"/>
    <rect x="34" y="88" width="412" height="96"/><line x1="34" y1="88" x2="446" y2="184"/><line x1="446" y1="88" x2="34" y2="184"/>
    <rect x="34" y="198" width="128" height="70"/><line x1="34" y1="198" x2="162" y2="268"/><line x1="162" y1="198" x2="34" y2="268"/>
    <rect x="176" y="198" width="128" height="70"/><line x1="176" y1="198" x2="304" y2="268"/><line x1="304" y1="198" x2="176" y2="268"/>
    <rect x="318" y="198" width="128" height="70"/><line x1="318" y1="198" x2="446" y2="268"/><line x1="446" y1="198" x2="318" y2="268"/>
  </g>
  <g fill="#c4c8d0"><rect x="34" y="278" width="200" height="8"/><rect x="34" y="292" width="140" height="8"/></g>`, "wireframe");

/* ====================================================================
   More drawings, including animated ones for Sound & Motion.
   Animations use SVG <animate>, so they play wherever the picture shows.
   ==================================================================== */

// A smooth path through points (Catmull-Rom), for hand drawn shapes.
function smoothPath(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6], c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}
function svg480(inner, bg, label) {
  return `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Arial, Helvetica, sans-serif"${label ? ` aria-label="${label}"` : ""}>
  <rect width="480" height="320" fill="${bg || "#2b2f3a"}"/>${inner}</svg>`;
}

/* ---------- UX Laws ---------- */
const SVG_FITTS_DELETE = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Settings</text>
  <text x="320" y="44" text-anchor="end" font-size="8" fill="#2f7de1">Save</text>
  <g font-size="11" fill="#1d1f27">
    <rect x="158" y="60" width="164" height="30" rx="6" fill="#eef0f4"/><text x="168" y="79">Name</text><text x="312" y="79" text-anchor="end" fill="#6b7280">Sam Ortiz</text>
    <rect x="158" y="96" width="164" height="30" rx="6" fill="#eef0f4"/><text x="168" y="115">Email</text><text x="312" y="115" text-anchor="end" fill="#6b7280">sam@mail.com</text>
    <rect x="158" y="132" width="164" height="30" rx="6" fill="#eef0f4"/><text x="168" y="151">Notifications</text><text x="312" y="151" text-anchor="end" fill="#6b7280">On</text>
  </g>
  <rect x="158" y="236" width="164" height="50" rx="12" fill="#e0544a"/>
  <text x="240" y="266" text-anchor="middle" font-size="14" font-weight="700" fill="#fff">Delete account</text>
  <ellipse cx="292" cy="296" rx="20" ry="28" fill="#c98f6b" opacity="0.55"/>`);

const SVG_CHUNK = svg480(`
  <g font-size="18" fill="#c9ccd3"><text x="60" y="92">Your account number</text><text x="60" y="222">Your account number</text></g>
  <text x="34" y="132" font-size="22" font-weight="700" fill="#f2b632">1</text>
  <text x="34" y="262" font-size="22" font-weight="700" fill="#f2b632">2</text>
  <g font-family="Courier New, monospace" font-size="38" font-weight="700" fill="#eef1ff">
    <text x="60" y="136">4829105736</text><text x="60" y="266">482 910 5736</text>
  </g>`);

const SVG_ZIP = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Shipping address</text>
  <g font-size="9" fill="#6b7280"><text x="160" y="66">Street</text><text x="160" y="108">ZIP code</text><text x="160" y="150">City</text><text x="276" y="150">State</text></g>
  <rect x="158" y="72" width="164" height="24" rx="5" fill="#fff" stroke="#c8cbd4"/><text x="166" y="88" font-size="10" fill="#1d1f27">2200 N Lincoln Ave</text>
  <rect x="158" y="114" width="164" height="24" rx="5" fill="#fff" stroke="#2f7de1" stroke-width="2"/><text x="166" y="130" font-size="10" fill="#1d1f27">60614</text>
  <rect x="158" y="156" width="110" height="24" rx="5" fill="#eaf3ff" stroke="#c8cbd4"/><text x="166" y="172" font-size="10" fill="#1d1f27">Chicago</text>
  <rect x="274" y="156" width="48" height="24" rx="5" fill="#eaf3ff" stroke="#c8cbd4"/><text x="282" y="172" font-size="10" fill="#1d1f27">IL</text>
  <text x="160" y="196" font-size="9" fill="#2f7de1">✓ Filled in from your ZIP code</text>
  <rect x="158" y="256" width="164" height="32" rx="8" fill="#1f4e79"/><text x="240" y="276" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Continue</text>`);

/* ---------- Gestalt ---------- */
const SVG_SIMILAR_DOTS = svg480(Array.from({ length: 36 }, (_, i) => {
  const r = Math.floor(i / 6), c = i % 6;
  return `<circle cx="${115 + c * 50}" cy="${35 + r * 50}" r="15" fill="${c % 2 ? "#7fb4e8" : "#f2b632"}"/>`;
}).join(""));

const SVG_CONTINUITY = svg480(`
  <path d="M40 270 C 160 250, 320 70, 440 50" fill="none" stroke="#eef1ff" stroke-width="14" stroke-linecap="round"/>
  <path d="M40 60 C 170 90, 300 250, 440 270" fill="none" stroke="#eef1ff" stroke-width="14" stroke-linecap="round"/>`);

const SVG_VASE = (function () {
  const side = [[80, 14], [70, 40], [62, 70], [60, 96], [50, 110], [58, 124], [52, 138], [32, 156], [50, 170], [42, 182], [52, 193], [42, 205], [54, 219], [46, 240], [64, 262], [80, 290], [86, 306]];
  const left = side.map(([o, y]) => [240 - o, y]);
  const right = side.slice().reverse().map(([o, y]) => [240 + o, y]);
  const lp = smoothPath(left), rp = smoothPath(right).replace(/^M/, "L");
  return svg480(`<path d="${lp} ${rp} Z" fill="#f3f1ea"/>`, "#14161c", "A white vase whose two edges are also two faces looking at each other");
})();

const SVG_COMMON_FATE = svg480(`
  ${Array.from({ length: 20 }, (_, i) => {
    const r = Math.floor(i / 5), c = i % 5, x = 100 + c * 70, y = 70 + r * 60;
    return [1, 7, 13, 19].includes(i) ? "" : `<circle cx="${x}" cy="${y}" r="16" fill="#eef1ff"/>`;
  }).join("")}
  <g>
    ${[1, 7, 13, 19].map(i => `<circle cx="${100 + (i % 5) * 70}" cy="${70 + Math.floor(i / 5) * 60}" r="16" fill="#eef1ff"/>`).join("")}
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 -22; 0 0" dur="1.4s" repeatCount="indefinite"/>
  </g>`);

const SVG_RINGS = svg480(`
  <g fill="none" stroke-width="12">
    <circle cx="150" cy="130" r="56" stroke="#4c8ee8"/><circle cx="240" cy="130" r="56" stroke="#eef1ff"/><circle cx="330" cy="130" r="56" stroke="#e0544a"/>
    <circle cx="195" cy="190" r="56" stroke="#f2b632"/><circle cx="285" cy="190" r="56" stroke="#2fbf71"/>
  </g>`);

/* ---------- How people think ---------- */
const SVG_ANCHOR = phone(`
  <rect x="158" y="30" width="164" height="110" rx="8" fill="#e8ecf3"/>
  <path d="M190 120 q50 -80 100 0" fill="#9fb3cc"/><rect x="214" y="92" width="52" height="30" rx="4" fill="#6d84a3"/>
  <text x="160" y="160" font-size="12" font-weight="700" fill="#1d1f27">Noise cancelling headphones</text>
  <text x="160" y="182" font-size="12" fill="#9aa1ad" text-decoration="line-through">Was $199</text>
  <text x="160" y="214" font-size="28" font-weight="700" fill="#c23a2c">$89</text>
  <rect x="158" y="250" width="164" height="34" rx="8" fill="#1d1f27"/><text x="240" y="271" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Add to cart</text>`);

const SVG_DECOY = svg480(`
  <rect x="40" y="26" width="400" height="268" rx="12" fill="#1d1f27"/>
  <text x="240" y="66" text-anchor="middle" font-size="24" font-weight="700" fill="#f2b632">POPCORN</text>
  <g text-anchor="middle">
    ${[["Small", "$3.00", 60, 110], ["Medium", "$6.50", 80, 240], ["Large", "$7.00", 100, 370]].map(([n, p, h, x]) => `
      <path d="M${x - h * 0.35} ${250 - h} L${x - h * 0.25} 250 L${x + h * 0.25} 250 L${x + h * 0.35} ${250 - h} Z" fill="#e0544a"/>
      <path d="M${x - h * 0.2} ${250 - h} L${x - h * 0.14} 250 M${x + h * 0.2} ${250 - h} L${x + h * 0.14} 250" stroke="#fff" stroke-width="6"/>
      <circle cx="${x - h * 0.18}" cy="${250 - h}" r="${h * 0.13}" fill="#fff4cc"/><circle cx="${x + h * 0.05}" cy="${244 - h}" r="${h * 0.15}" fill="#fff4cc"/><circle cx="${x + h * 0.22}" cy="${250 - h}" r="${h * 0.12}" fill="#fff4cc"/>
      <text x="${x}" y="272" font-size="16" fill="#eef1ff">${n}</text><text x="${x}" y="${232 - h - h * 0.15}" font-size="22" font-weight="700" fill="#eef1ff">${p}</text>`).join("")}
  </g>`);

const SVG_SOCIAL = phone(`
  <rect x="148" y="18" width="184" height="96" rx="16" fill="#8fc0dd"/><rect x="148" y="70" width="184" height="44" fill="#6c9a72"/>
  <rect x="210" y="56" width="60" height="40" fill="#f3e3c3"/><path d="M204 58 l36 -22 l36 22 z" fill="#b5574b"/>
  <text x="160" y="134" font-size="13" font-weight="700" fill="#1d1f27">Harbor Inn</text>
  <text x="160" y="150" font-size="10" fill="#6b7280">★ 4.6 · $142 a night</text>
  <rect x="158" y="162" width="164" height="26" rx="6" fill="#fdecea"/><text x="166" y="179" font-size="10" font-weight="700" fill="#c23a2c">Booked 38 times in the last day</text>
  <rect x="158" y="194" width="164" height="26" rx="6" fill="#fff6dd"/><text x="166" y="211" font-size="10" fill="#7a5a00">12 people are looking right now</text>
  <rect x="158" y="256" width="164" height="32" rx="8" fill="#1f4e79"/><text x="240" y="276" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Reserve</text>`);

/* ---------- Affordances ---------- */
const SVG_PLATE_HANDLE = svg480(`
  <rect x="0" y="286" width="480" height="34" fill="#3a3f4c"/>
  <rect x="60" y="30" width="170" height="256" fill="#6b5a45"/><rect x="72" y="42" width="146" height="244" fill="#9fc2d6" opacity="0.5"/>
  <rect x="250" y="30" width="170" height="256" fill="#6b5a45"/><rect x="262" y="42" width="146" height="244" fill="#9fc2d6" opacity="0.5"/>
  <rect x="176" y="140" width="34" height="64" rx="3" fill="#c9ccd3" stroke="#8d919b" stroke-width="2"/>
  <rect x="276" y="120" width="10" height="104" rx="5" fill="#c9ccd3" stroke="#8d919b" stroke-width="2"/>
  <rect x="286" y="124" width="12" height="6" fill="#8d919b"/><rect x="286" y="214" width="12" height="6" fill="#8d919b"/>
  <g font-size="16" font-weight="700" fill="#f2b632" text-anchor="middle"><text x="145" y="22">Left door</text><text x="335" y="22">Right door</text></g>`);

const SVG_TOGGLE = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Privacy</text>
  <g font-size="11" fill="#1d1f27">
    <text x="160" y="84">Location sharing</text>
    <rect x="282" y="72" width="40" height="18" rx="9" fill="#c9ced8"/><circle cx="313" cy="81" r="8" fill="#9aa1ad"/>
    <text x="160" y="124" fill="#9aa1ad">Contact syncing</text>
    <rect x="282" y="112" width="40" height="18" rx="9" fill="#dfe3ea"/><circle cx="291" cy="121" r="8" fill="#c9ced8"/>
  </g>
  <text x="160" y="160" font-size="9" fill="#6b7280">Changes save automatically.</text>`);

const SVG_FAKELINK = browser(`
  <text x="40" y="78" font-size="13" fill="#6b7280">Riverside Library</text>
  <text x="40" y="112" font-size="22" font-weight="700" fill="#1a5fd0" text-decoration="underline">Our services</text>
  <g fill="#c4c8d0"><rect x="40" y="128" width="400" height="8" rx="3"/><rect x="40" y="144" width="380" height="8" rx="3"/><rect x="40" y="160" width="300" height="8" rx="3"/></g>
  <text x="40" y="200" font-size="14" font-weight="700" fill="#1d1f27">Hours</text>
  <g fill="#c4c8d0"><rect x="40" y="212" width="360" height="8" rx="3"/><rect x="40" y="228" width="260" height="8" rx="3"/></g>
  <g fill="#e0544a" opacity="0.8">${[[96, 104], [120, 98], [150, 108], [180, 101], [210, 106], [134, 112]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>
  <text x="250" y="104" font-size="10" fill="#e0544a">clicks</text>`, "riverside-library.org");

/* ---------- Usability ---------- */
function miniDialog(x, title, buttons) {
  return `<rect x="${x}" y="70" width="190" height="150" rx="12" fill="#fbfbfd"/>
  <text x="${x + 18}" y="104" font-size="15" font-weight="700" fill="#1d1f27">${title}</text>
  <rect x="${x + 18}" y="116" width="150" height="7" rx="3" fill="#c4c8d0"/><rect x="${x + 18}" y="130" width="110" height="7" rx="3" fill="#c4c8d0"/>
  ${buttons.map(([bx, label, fill, ink]) => `<rect x="${x + bx}" y="170" width="76" height="32" rx="8" fill="${fill}"/><text x="${x + bx + 38}" y="191" text-anchor="middle" font-size="12" font-weight="700" fill="${ink}">${label}</text>`).join("")}`;
}
const SVG_INCONSISTENT = svg480(`
  ${miniDialog(36, "Edit note", [[18, "Cancel", "#e3e6ec", "#1d1f27"], [98, "Save", "#2f7de1", "#fff"]])}
  ${miniDialog(254, "Edit photo", [[18, "Save", "#e3e6ec", "#1d1f27"], [98, "Delete", "#2f7de1", "#fff"]])}
  <g font-size="13" fill="#c9ccd3" text-anchor="middle"><text x="131" y="250">Notes screen</text><text x="349" y="250">Photos screen</text></g>`);

const SVG_CLUTTER = browser(`
  <rect x="20" y="44" width="440" height="20" fill="#e0544a"/><text x="240" y="58" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">NEW! Earn 2X points this weekend only!! Learn more</text>
  <rect x="20" y="64" width="440" height="18" fill="#f2b632"/><text x="240" y="77" text-anchor="middle" font-size="9" fill="#241800">Update your app · Rate us · Refer a friend for $50 · Take our survey</text>
  <g font-size="8" fill="#fff" text-anchor="middle">
    ${["Pay", "Transfer", "Deposit", "Loans", "Invest", "Offers", "Cards", "Help", "Rewards", "Insure"].map((t, i) => `<rect x="${26 + (i % 5) * 87}" y="${90 + Math.floor(i / 5) * 30}" width="80" height="24" rx="4" fill="${["#2f7de1", "#7a4fd8", "#2fbf71", "#e0544a", "#f28c32"][i % 5]}"/><text x="${66 + (i % 5) * 87}" y="${106 + Math.floor(i / 5) * 30}">${t}</text>`).join("")}
  </g>
  <rect x="26" y="152" width="200" height="64" fill="#ffe1f0"/><text x="36" y="172" font-size="11" font-weight="700" fill="#c2338f">HOT DEAL 0% APR*</text><text x="36" y="188" font-size="8" fill="#c2338f">*terms apply see details below</text>
  <rect x="236" y="152" width="218" height="64" fill="#e0f4ff"/><text x="246" y="172" font-size="11" font-weight="700" fill="#1a5fd0">Checking ****4021</text><text x="246" y="196" font-size="16" font-weight="700" fill="#1d1f27">$1,284.07</text>
  <g fill="#c4c8d0">${Array.from({ length: 8 }, (_, i) => `<rect x="${26 + (i % 4) * 108}" y="${226 + Math.floor(i / 4) * 36}" width="100" height="28" rx="3"/>`).join("")}</g>
  <circle cx="440" cy="284" r="14" fill="#2fbf71"/><text x="440" y="288" text-anchor="middle" font-size="9" font-weight="700" fill="#fff">Chat</text>`, "bigbank.com");

/* ---------- Research ---------- */
const SVG_PERSONA = svg480(`
  <rect x="40" y="24" width="400" height="272" rx="12" fill="#fbfbfd"/>
  <circle cx="100" cy="86" r="40" fill="#f0b07a"/><circle cx="100" cy="76" r="15" fill="#7a4a2a"/><path d="M72 116 a28 22 0 0 1 56 0" fill="#7a4a2a"/>
  <text x="156" y="72" font-size="22" font-weight="700" fill="#1d1f27">Maya, 34</text>
  <text x="156" y="94" font-size="13" fill="#6b7280">Night shift nurse · two kids · rides the bus</text>
  <text x="156" y="118" font-size="12" font-style="italic" fill="#1f4e79">"I book appointments at 2 a.m. on my phone."</text>
  <text x="64" y="160" font-size="13" font-weight="700" fill="#1d1f27">Goals</text>
  <text x="250" y="160" font-size="13" font-weight="700" fill="#1d1f27">Frustrations</text>
  <g font-size="11" fill="#3a3f4c"><text x="64" y="182">• Book care in under 5 minutes</text><text x="64" y="202">• Get reminders by text</text><text x="64" y="222">• Find clinics on her bus line</text>
  <text x="250" y="182">• Forms that time out</text><text x="250" y="202">• Phone only booking</text><text x="250" y="222">• Tiny text on small screens</text></g>`, "#2b2f3a");

const SVG_LIKERT = browser(`
  <text x="240" y="96" text-anchor="middle" font-size="18" font-weight="700" fill="#1d1f27">"The app was easy to use."</text>
  ${["Strongly\ndisagree", "Disagree", "Neutral", "Agree", "Strongly\nagree"].map((t, i) => `<circle cx="${80 + i * 80}" cy="160" r="16" fill="#fff" stroke="#6b7280" stroke-width="2"/>${i === 3 ? `<circle cx="${80 + i * 80}" cy="160" r="9" fill="#1f4e79"/>` : ""}
    ${t.split("\n").map((ln, k) => `<text x="${80 + i * 80}" y="${200 + k * 16}" text-anchor="middle" font-size="12" fill="#3a3f4c">${ln}</text>`).join("")}`).join("")}
  <rect x="190" y="252" width="100" height="30" rx="6" fill="#1f4e79"/><text x="240" y="272" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Next</text>`, "survey.example.com");

const SVG_FPATTERN = browser(`
  <g fill="#c4c8d0">${Array.from({ length: 12 }, (_, i) => `<rect x="40" y="${58 + i * 20}" width="${[400, 380, 300, 390, 400, 360, 330, 400, 390, 300, 370, 250][i]}" height="8" rx="3"/>`).join("")}</g>
  <defs><radialGradient id="heat"><stop offset="0" stop-color="#e0201a" stop-opacity="0.85"/><stop offset="0.5" stop-color="#f2b632" stop-opacity="0.55"/><stop offset="1" stop-color="#f2b632" stop-opacity="0"/></radialGradient></defs>
  <g fill="url(#heat)">
    <ellipse cx="190" cy="66" rx="190" ry="26"/><ellipse cx="150" cy="128" rx="140" ry="24"/>
    <ellipse cx="66" cy="190" rx="48" ry="70"/><ellipse cx="60" cy="260" rx="38" ry="44"/>
  </g>`, "news.example.com/article");

const SVG_DOUBLEBARREL = phone(`
  <text x="160" y="46" font-size="10" fill="#6b7280">Question 3 of 10</text>
  <text x="160" y="72" font-size="13" font-weight="700" fill="#1d1f27">How satisfied are you</text>
  <text x="160" y="90" font-size="13" font-weight="700" fill="#1d1f27">with our prices and</text>
  <text x="160" y="108" font-size="13" font-weight="700" fill="#1d1f27">delivery speed?</text>
  ${[1, 2, 3, 4, 5].map(n => `<rect x="${160 + (n - 1) * 33}" y="130" width="28" height="28" rx="6" fill="#eef0f4" stroke="#c8cbd4"/><text x="${174 + (n - 1) * 33}" y="149" text-anchor="middle" font-size="12" fill="#1d1f27">${n}</text>`).join("")}
  <text x="160" y="174" font-size="8" fill="#6b7280">Very unhappy</text><text x="320" y="174" text-anchor="end" font-size="8" fill="#6b7280">Very happy</text>`);

/* ---------- Information architecture ---------- */
function treeBox(x, y, w, label, hi) {
  return `<rect x="${x - w / 2}" y="${y - 16}" width="${w}" height="32" rx="6" fill="${hi ? "#f2b632" : "#fbfbfd"}"/><text x="${x}" y="${y + 5}" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">${label}</text>`;
}
function treeLine(x1, y1, x2, y2) { return `<path d="M${x1} ${y1 + 16} V${(y1 + y2) / 2} H${x2} V${y2 - 16}" fill="none" stroke="#9aa1ad" stroke-width="2"/>`; }

const SVG_SITEMAP = svg480(`
  ${treeLine(240, 50, 90, 140)}${treeLine(240, 50, 240, 140)}${treeLine(240, 50, 390, 140)}
  ${treeLine(240, 140, 180, 240)}${treeLine(240, 140, 300, 240)}${treeLine(390, 140, 390, 240)}
  ${treeBox(240, 50, 100, "Home")}
  ${treeBox(90, 140, 100, "About")}${treeBox(240, 140, 110, "Programs")}${treeBox(390, 140, 100, "Visit")}
  ${treeBox(180, 240, 90, "Swim")}${treeBox(300, 240, 90, "Camps")}${treeBox(390, 240, 70, "Hours")}`);

const SVG_MEGAMENU = browser(`
  <rect x="14" y="40" width="452" height="30" fill="#1d1f27"/>
  <g font-size="12" fill="#fff"><text x="40" y="60" font-weight="700">OUTFITTER</text><text x="160" y="60" fill="#f2b632" font-weight="700">Shop ▾</text><text x="220" y="60">Rentals</text><text x="282" y="60">Trips</text></g>
  <rect x="24" y="70" width="432" height="170" fill="#fff" stroke="#dfe3ea"/>
  ${[["Camping", ["Tents", "Sleeping bags", "Stoves", "Lanterns"]], ["Climbing", ["Ropes", "Harnesses", "Shoes", "Chalk"]], ["Water", ["Kayaks", "Paddles", "Life vests", "Dry bags"]], ["Clothing", ["Jackets", "Base layers", "Boots", "Hats"]]].map(([h, items], i) => `
    <text x="${44 + i * 106}" y="98" font-size="12" font-weight="700" fill="#1d1f27">${h}</text>
    ${items.map((t, k) => `<text x="${44 + i * 106}" y="${122 + k * 22}" font-size="11" fill="#3a3f4c">${t}</text>`).join("")}`).join("")}
  <g fill="#e8ecf3"><rect x="24" y="250" width="200" height="46"/><rect x="236" y="250" width="220" height="46"/></g>`, "outfitter.example.com");

const SVG_FACETS = browser(`
  <rect x="20" y="44" width="130" height="260" fill="#f3f4f7"/>
  <g font-size="11" fill="#1d1f27">
    <text x="32" y="66" font-weight="700">Size</text>
    ${["8", "9", "10"].map((t, i) => `<rect x="32" y="${74 + i * 18}" width="11" height="11" rx="2" fill="${i === 1 ? "#1f4e79" : "#fff"}" stroke="#6b7280"/><text x="50" y="${84 + i * 18}">${t}</text>`).join("")}
    <text x="32" y="148" font-weight="700">Color</text>
    ${["Black", "Red", "White"].map((t, i) => `<rect x="32" y="${156 + i * 18}" width="11" height="11" rx="2" fill="${i === 0 ? "#1f4e79" : "#fff"}" stroke="#6b7280"/><text x="50" y="${166 + i * 18}">${t}</text>`).join("")}
    <text x="32" y="230" font-weight="700">Price</text>
    ${["Under $50", "$50 to $100"].map((t, i) => `<rect x="32" y="${238 + i * 18}" width="11" height="11" rx="2" fill="${i === 1 ? "#1f4e79" : "#fff"}" stroke="#6b7280"/><text x="50" y="${248 + i * 18}">${t}</text>`).join("")}
  </g>
  <text x="166" y="66" font-size="12" font-weight="700" fill="#1d1f27">Running shoes · 14 results</text>
  ${Array.from({ length: 6 }, (_, i) => `<rect x="${166 + (i % 3) * 98}" y="${78 + Math.floor(i / 3) * 112}" width="88" height="100" rx="6" fill="#e8ecf3"/><path d="M${178 + (i % 3) * 98} ${140 + Math.floor(i / 3) * 112} q20 -26 40 -6 l24 6 q10 4 0 10 h-64 z" fill="#1d1f27"/>`).join("")}`, "shoes.example.com");

const SVG_POLY = svg480(`
  ${treeLine(240, 46, 130, 140)}${treeLine(240, 46, 350, 140)}
  ${treeLine(130, 140, 70, 240)}${treeLine(130, 140, 200, 240)}${treeLine(350, 140, 280, 240)}${treeLine(350, 140, 410, 240)}
  ${treeBox(240, 46, 90, "Food")}
  ${treeBox(130, 140, 90, "Fruit")}${treeBox(350, 140, 120, "Vegetables")}
  ${treeBox(70, 240, 84, "Apple")}${treeBox(200, 240, 96, "Tomato", true)}${treeBox(280, 240, 96, "Tomato", true)}${treeBox(410, 240, 84, "Carrot")}`);

/* ---------- Maps and flows ---------- */
const SVG_FLOWCHART = svg480(`
  <g fill="none" stroke="#9aa1ad" stroke-width="2.5">
    <path d="M100 76 V112"/><path d="M100 152 V178"/><path d="M160 214 H300"/><path d="M100 250 V276"/>
  </g>
  <path d="M100 112 l-6 -10 h12 z M100 178 l-6 -10 h12 z M300 214 l-10 -6 v12 z M100 276 l-6 -10 h12 z" fill="#9aa1ad"/>
  <rect x="40" y="40" width="120" height="36" rx="18" fill="#eef1ff"/><text x="100" y="63" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">Start</text>
  <rect x="34" y="112" width="132" height="40" rx="3" fill="#eef1ff"/><text x="100" y="137" text-anchor="middle" font-size="13" fill="#1d1f27">Enter email</text>
  <path d="M100 178 L160 214 L100 250 L40 214 Z" fill="#f2b632"/><text x="100" y="212" text-anchor="middle" font-size="11" font-weight="700" fill="#241800">Has an</text><text x="100" y="226" text-anchor="middle" font-size="11" font-weight="700" fill="#241800">account?</text>
  <rect x="300" y="194" width="140" height="40" rx="3" fill="#eef1ff"/><text x="370" y="219" text-anchor="middle" font-size="13" fill="#1d1f27">Create account</text>
  <rect x="34" y="276" width="132" height="36" rx="3" fill="#eef1ff"/><text x="100" y="299" text-anchor="middle" font-size="13" fill="#1d1f27">Enter password</text>
  <g font-size="12" font-weight="700" fill="#c9ccd3"><text x="226" y="206">No</text><text x="108" y="268">Yes</text></g>`);

const SVG_JOURNEY = svg480(`
  <rect x="20" y="24" width="440" height="272" rx="10" fill="#fbfbfd"/>
  ${["Discover", "Book", "Wait", "Visit", "Follow up"].map((t, i) => `<rect x="${30 + i * 86}" y="34" width="80" height="26" rx="4" fill="#dfe3ea"/><text x="${70 + i * 86}" y="52" text-anchor="middle" font-size="12" font-weight="700" fill="#1d1f27">${t}</text>`).join("")}
  <line x1="30" y1="170" x2="450" y2="170" stroke="#c4c8d0" stroke-dasharray="4 4"/>
  <path d="${smoothPath([[70, 120], [156, 100], [242, 250], [328, 140], [414, 110]])}" fill="none" stroke="#1f4e79" stroke-width="4"/>
  ${[[70, 120], [156, 100], [242, 250], [328, 140], [414, 110]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7" fill="#1f4e79"/>`).join("")}
  <g font-size="22"><text x="436" y="96">🙂</text><text x="436" y="286">🙁</text></g>`);

const SVG_FIDELITY = svg480(`
  <rect x="24" y="30" width="200" height="260" rx="10" fill="#fffef6"/>
  <g fill="none" stroke="#55585f" stroke-width="2.5" stroke-linecap="round">
    <path d="M40 54 q60 -4 120 2"/><path d="M40 72 h70"/><path d="M38 92 l168 2 l-2 82 l-166 -2 z"/><path d="M40 94 l164 80 M204 94 l-164 80"/>
    <path d="M40 198 q60 3 140 -1"/><path d="M40 214 q40 2 100 0"/><path d="M60 246 q48 -4 100 0 q4 20 0 26 q-50 4 -100 0 q-4 -12 0 -26"/>
  </g>
  <rect x="256" y="30" width="200" height="260" rx="10" fill="#fbfbfd"/>
  <text x="272" y="58" font-size="15" font-weight="700" fill="#1d1f27">Lakeside Park</text><text x="272" y="76" font-size="10" fill="#6b7280">Open today · 6 a.m. to 10 p.m.</text>
  <rect x="272" y="88" width="168" height="84" rx="8" fill="#8fc0dd"/><path d="M272 150 q40 -30 84 -6 t84 -10 v38 h-168 z" fill="#5f9a6a"/><circle cx="410" cy="110" r="12" fill="#f2d16b"/>
  <text x="272" y="196" font-size="11" fill="#3a3f4c">Trails, a beach and a boat launch</text><text x="272" y="212" font-size="11" fill="#3a3f4c">on the north shore.</text>
  <rect x="292" y="244" width="128" height="30" rx="15" fill="#1f4e79"/><text x="356" y="263" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Get directions</text>`);

const SVG_STORYMAP = svg480(`
  ${["Find", "Choose", "Pay", "Track"].map((t, i) => `<rect x="${30 + i * 110}" y="30" width="96" height="40" rx="4" fill="#f2b632"/><text x="${78 + i * 110}" y="56" text-anchor="middle" font-size="14" font-weight="700" fill="#241800">${t}</text>`).join("")}
  ${[[3, 2], [2, 3], [3, 1], [2, 2]].map(([a, b], i) => Array.from({ length: a + b }, (_, k) => `<rect x="${36 + i * 110}" y="${k < a ? 84 + k * 32 : 200 + (k - a) * 32}" width="84" height="24" rx="3" fill="#7fb4e8"/>`).join("")).join("")}
  <line x1="20" y1="186" x2="460" y2="186" stroke="#e0544a" stroke-width="3" stroke-dasharray="8 6"/>
  <text x="460" y="178" text-anchor="end" font-size="12" font-weight="700" fill="#e0544a">Release 1</text>`);

/* ---------- Accessibility ---------- */
const SVG_NOALT = browser(`
  <text x="40" y="76" font-size="18" font-weight="700" fill="#1d1f27">Meet our volunteers</text>
  <rect x="40" y="90" width="210" height="140" rx="6" fill="#9fd3a8"/><circle cx="110" cy="150" r="22" fill="#4f9a5d"/><circle cx="180" cy="150" r="22" fill="#4f9a5d"/><rect x="80" y="172" width="130" height="58" rx="20" fill="#4f9a5d"/>
  <g fill="#c4c8d0"><rect x="40" y="244" width="200" height="8" rx="3"/><rect x="40" y="260" width="160" height="8" rx="3"/></g>
  <rect x="270" y="104" width="180" height="76" rx="12" fill="#1d1f27"/><path d="M270 150 l-14 8 l16 4 z" fill="#1d1f27"/>
  <text x="284" y="130" font-size="12" fill="#f2b632">🔊 Screen reader</text>
  <text x="284" y="156" font-size="13" font-weight="700" fill="#fff">"Image. IMG_4032.jpg"</text>`, "volunteer.example.org");

const SVG_PLACEHOLDER = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Request a ride</text>
  <rect x="158" y="62" width="164" height="30" rx="6" fill="#fff" stroke="#c8cbd4"/><text x="168" y="81" font-size="11" fill="#1d1f27">Maria</text>
  <rect x="158" y="100" width="164" height="30" rx="6" fill="#fff" stroke="#c8cbd4"/><text x="168" y="119" font-size="11" fill="#1d1f27">04/12</text>
  <rect x="158" y="138" width="164" height="30" rx="6" fill="#fff" stroke="#c8cbd4"/><text x="168" y="157" font-size="11" fill="#b4b8c2">Pickup address</text>
  <rect x="158" y="176" width="164" height="30" rx="6" fill="#fff" stroke="#c8cbd4"/><text x="168" y="195" font-size="11" fill="#b4b8c2">Phone number</text>
  <rect x="158" y="256" width="164" height="32" rx="8" fill="#1f4e79"/><text x="240" y="276" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Send request</text>`);

const SVG_CLICKHERE = browser(`
  <rect x="120" y="56" width="240" height="236" rx="10" fill="#1d1f27"/>
  <text x="140" y="84" font-size="13" font-weight="700" fill="#f2b632">Links on this page</text>
  ${["Click here", "Click here", "Read more", "Click here", "More", "Read more", "Here"].map((t, i) => `<rect x="134" y="${96 + i * 26}" width="212" height="22" rx="4" fill="${i === 0 ? "#2f7de1" : "#2b2f3a"}"/><text x="144" y="${111 + i * 26}" font-size="12" fill="#fff">${t}</text>`).join("")}`, "city.example.gov/permits");

/* ---------- Deceptive design ---------- */
const SVG_DISGUISED = browser(`
  <text x="40" y="74" font-size="16" font-weight="700" fill="#1d1f27">FreeFonts · Brushline Regular</text>
  <rect x="40" y="88" width="190" height="56" rx="8" fill="#2fbf71"/><text x="135" y="123" text-anchor="middle" font-size="20" font-weight="900" fill="#fff">⬇ DOWNLOAD</text>
  <rect x="250" y="88" width="190" height="56" rx="8" fill="#2fbf71"/><text x="345" y="116" text-anchor="middle" font-size="16" font-weight="900" fill="#fff">START DOWNLOAD</text><text x="345" y="134" text-anchor="middle" font-size="9" fill="#fff">Fast · Secure</text>
  <text x="434" y="154" text-anchor="end" font-size="7" fill="#9aa1ad">Ad</text>
  <text x="40" y="176" font-size="11" fill="#3a3f4c">brushline-regular.zip (84 KB)</text>
  <text x="40" y="194" font-size="10" fill="#1a5fd0" text-decoration="underline">download</text>
  <rect x="40" y="218" width="400" height="66" rx="10" fill="#2fbf71"/><text x="240" y="258" text-anchor="middle" font-size="24" font-weight="900" fill="#fff">⬇ DOWNLOAD NOW</text>
  <text x="434" y="296" text-anchor="end" font-size="7" fill="#9aa1ad">Ad</text>`, "freefonts.example.com");

const SVG_COMPARE = svg480(`
  ${[["Basic", "$9.99", "a month", "50 GB"], ["Plus", "$99", "a year", "1 TB"], ["Pro", "$0.45", "a day", "Unlimited"]].map(([n, p, u, s], i) => `
    <rect x="${28 + i * 146}" y="40" width="132" height="240" rx="12" fill="#fbfbfd"/>
    <text x="${94 + i * 146}" y="78" text-anchor="middle" font-size="18" font-weight="700" fill="#1d1f27">${n}</text>
    <text x="${94 + i * 146}" y="134" text-anchor="middle" font-size="36" font-weight="700" fill="#1f4e79">${p}</text>
    <text x="${94 + i * 146}" y="158" text-anchor="middle" font-size="14" fill="#6b7280">${u}</text>
    <text x="${94 + i * 146}" y="200" text-anchor="middle" font-size="14" fill="#1d1f27">${s} storage</text>
    <rect x="${48 + i * 146}" y="230" width="92" height="30" rx="8" fill="#1f4e79"/><text x="${94 + i * 146}" y="250" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Choose</text>`).join("")}`);

const SVG_FORCED = phone(`
  <text x="240" y="50" text-anchor="middle" font-size="14" font-weight="700" fill="#1d1f27">Your results are ready!</text>
  <rect x="166" y="62" width="148" height="56" rx="8" fill="#e8ecf3"/><text x="240" y="96" text-anchor="middle" font-size="20" fill="#9aa1ad">🔒</text>
  <text x="240" y="138" text-anchor="middle" font-size="11" fill="#1d1f27">Invite 5 friends to unlock</text>
  <text x="240" y="152" text-anchor="middle" font-size="11" fill="#1d1f27">your personality type</text>
  ${["Alex", "Bri", "Chen", "Dee", "Eli"].map((n, i) => `<rect x="166" y="${164 + i * 18}" width="11" height="11" rx="2" fill="#1f4e79"/><text x="184" y="${174 + i * 18}" font-size="10" fill="#1d1f27">${n}</text>`).join("")}
  <rect x="158" y="262" width="164" height="30" rx="8" fill="#c2338f"/><text x="240" y="281" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Send invites</text>`);

const SVG_SNEAK = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Your cart</text>
  <g font-size="10" fill="#1d1f27">
    <text x="160" y="76" font-weight="700">Flight DTW to SEA</text><text x="320" y="76" text-anchor="end">$218.00</text>
    <text x="160" y="104" font-weight="700">Seat selection</text><text x="320" y="104" text-anchor="end">$24.00</text><text x="160" y="117" font-size="8" fill="#6b7280">Added for you</text>
    <text x="160" y="142" font-weight="700">Travel protection</text><text x="320" y="142" text-anchor="end">$31.50</text><text x="160" y="155" font-size="8" fill="#6b7280">Added for you</text>
    <text x="160" y="180" font-weight="700">Magazine subscription</text><text x="320" y="180" text-anchor="end">$12.00</text><text x="160" y="193" font-size="8" fill="#6b7280">Added for you</text>
  </g>
  <line x1="160" y1="208" x2="320" y2="208" stroke="#d6dae2"/>
  <text x="160" y="228" font-size="12" font-weight="700" fill="#1d1f27">Total</text><text x="320" y="228" text-anchor="end" font-size="12" font-weight="700" fill="#1d1f27">$285.50</text>
  <rect x="158" y="256" width="164" height="32" rx="8" fill="#1f4e79"/><text x="240" y="276" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">Pay now</text>`);

/* ---------- Wayfinding ---------- */
const SVG_PICTOGRAMS = svg480(`
  <rect x="20" y="70" width="440" height="180" rx="10" fill="#f2c94c"/>
  <g fill="#1d1f27">
    <circle cx="70" cy="118" r="12"/><rect x="58" y="134" width="24" height="44" rx="6"/><rect x="60" y="174" width="8" height="34"/><rect x="72" y="174" width="8" height="34"/>
    <circle cx="112" cy="118" r="12"/><path d="M98 134 h28 l8 50 h-44 z"/><rect x="104" y="180" width="7" height="28"/><rect x="113" y="180" width="7" height="28"/>
    <rect x="160" y="128" width="58" height="60" rx="8"/><rect x="176" y="114" width="26" height="16" rx="4" fill="none" stroke="#1d1f27" stroke-width="5"/><circle cx="170" cy="194" r="6"/><circle cx="208" cy="194" r="6"/>
    <path d="M250 170 h76 l-10 -26 h-56 z"/><rect x="246" y="168" width="84" height="22" rx="6"/><circle cx="262" cy="196" r="9"/><circle cx="314" cy="196" r="9"/>
    <path d="M356 160 l60 -22 l8 6 l-30 22 l20 22 l-8 4 l-26 -16 l-20 12 l-6 -2 l12 -14 l-14 -4 z"/>
  </g>
  <path d="M60 228 h340 l-14 -10 m14 10 l-14 10" fill="none" stroke="#1d1f27" stroke-width="5" stroke-linecap="round"/>`);

const SVG_TACTILE = svg480(`
  <rect width="480" height="320" fill="#6b7280"/>
  <path d="M0 0 H480 V150 H0 Z" fill="#c9ccd3"/>
  <path d="M120 150 L360 150 L380 210 L100 210 Z" fill="#b5b9c1"/>
  <path d="M150 150 L330 150 L340 190 L140 190 Z" fill="#f2c94c"/>
  <g fill="#d9a92a">${Array.from({ length: 40 }, (_, i) => { const r = Math.floor(i / 10), c = i % 10; return `<circle cx="${162 + c * 17 - r * 2 + r * 0}" cy="${158 + r * 9}" r="3.4"/>`; }).join("")}</g>
  <g fill="#fff"><rect x="40" y="240" width="60" height="70"/><rect x="140" y="240" width="60" height="70"/><rect x="240" y="240" width="60" height="70"/><rect x="340" y="240" width="60" height="70"/></g>
  <text x="240" y="40" text-anchor="middle" font-size="16" fill="#3a3f4c">Sidewalk</text><text x="440" y="230" text-anchor="end" font-size="16" fill="#eef1ff">Street</text>`);

const SVG_DISTRICT = `
<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" font-family="Arial, Helvetica, sans-serif" aria-label="A hand drawn mental map of a city with a neighborhood shaded">
  <rect width="480" height="320" fill="#f3f1ea"/>
  <path d="M60 60 L220 40 L260 150 L120 190 Z" fill="#e8a0a0" opacity="0.55" stroke="#c0504d" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="160" y="118" text-anchor="middle" font-family="Comic Sans MS, Marker Felt, cursive" font-size="18" fill="#7a2a28">Chinatown</text>
  <path d="M20 250 L460 210" fill="none" stroke="#8a8f99" stroke-width="5" stroke-linecap="round"/>
  <path d="M300 20 L340 300" fill="none" stroke="#8a8f99" stroke-width="5" stroke-linecap="round"/>
  <path d="M0 290 C 120 270, 260 310, 480 280" fill="none" stroke="#5c9ccf" stroke-width="12"/>
  <rect x="360" y="70" width="18" height="60" fill="#8a8f99"/><path d="M356 70 l13 -16 l13 16 z" fill="#8a8f99"/>
  <circle cx="320" cy="232" r="12" fill="none" stroke="#8a8f99" stroke-width="4"/>
</svg>`;

/* ---------- Screens and states ---------- */
const SVG_MODAL = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">New post</text>
  <rect x="158" y="60" width="164" height="120" rx="8" fill="#eef0f4"/>
  <rect x="148" y="18" width="184" height="284" rx="16" fill="#000" opacity="0.5"/>
  <rect x="164" y="104" width="152" height="112" rx="12" fill="#fff"/>
  <text x="240" y="132" text-anchor="middle" font-size="12" font-weight="700" fill="#1d1f27">Leave without posting?</text>
  <text x="240" y="150" text-anchor="middle" font-size="9" fill="#6b7280">Your draft will be lost.</text>
  <rect x="174" y="170" width="64" height="30" rx="8" fill="#eef0f4"/><text x="206" y="189" text-anchor="middle" font-size="10" font-weight="700" fill="#1d1f27">Keep editing</text>
  <rect x="244" y="170" width="62" height="30" rx="8" fill="#e0544a"/><text x="275" y="189" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Leave</text>`);

const SVG_ACCORDION = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">FAQ</text>
  <g font-size="10" fill="#1d1f27">
    <rect x="158" y="58" width="164" height="30" rx="6" fill="#eef0f4"/><text x="168" y="77" font-weight="700">How do I renew?</text><text x="312" y="77" text-anchor="end">+</text>
    <rect x="158" y="94" width="164" height="94" rx="6" fill="#eef0f4"/><text x="168" y="113" font-weight="700">Can I pay late fees online?</text><text x="312" y="113" text-anchor="end">−</text>
    <text x="168" y="134" fill="#3a3f4c">Yes. Sign in, open My account</text><text x="168" y="148" fill="#3a3f4c">and choose Fees. Cards and</text><text x="168" y="162" fill="#3a3f4c">bank transfers both work.</text>
    <rect x="158" y="194" width="164" height="30" rx="6" fill="#eef0f4"/><text x="168" y="213" font-weight="700">Where do I return books?</text><text x="312" y="213" text-anchor="end">+</text>
    <rect x="158" y="230" width="164" height="30" rx="6" fill="#eef0f4"/><text x="168" y="249" font-weight="700">Is there parking?</text><text x="312" y="249" text-anchor="end">+</text>
  </g>`);

const SVG_SEGMENTED = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Steps</text>
  <rect x="158" y="58" width="164" height="28" rx="8" fill="#eef0f4"/>
  <rect x="213" y="61" width="54" height="22" rx="6" fill="#fff" stroke="#d6dae2"/>
  <g font-size="10" text-anchor="middle" fill="#1d1f27"><text x="185" y="76">Day</text><text x="240" y="76" font-weight="700">Week</text><text x="295" y="76">Month</text></g>
  <g fill="#2fbf71">${[70, 110, 50, 130, 90, 150, 60].map((h, i) => `<rect x="${166 + i * 22}" y="${250 - h}" width="14" height="${h}" rx="3"/>`).join("")}</g>
  <g font-size="8" fill="#6b7280" text-anchor="middle">${["M", "T", "W", "T", "F", "S", "S"].map((d, i) => `<text x="${173 + i * 22}" y="266">${d}</text>`).join("")}</g>`);

const SVG_DISABLED = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Create account</text>
  <g font-size="9" fill="#6b7280"><text x="160" y="66">Email</text><text x="160" y="108">Password</text><text x="160" y="150">Confirm password</text></g>
  <rect x="158" y="72" width="164" height="24" rx="5" fill="#fff" stroke="#c8cbd4"/><text x="166" y="88" font-size="10" fill="#1d1f27">lee@mail.com</text>
  <rect x="158" y="114" width="164" height="24" rx="5" fill="#fff" stroke="#c8cbd4"/><text x="166" y="130" font-size="10" fill="#1d1f27">••••••••</text>
  <rect x="158" y="156" width="164" height="24" rx="5" fill="#fff" stroke="#c8cbd4"/><text x="166" y="172" font-size="10" fill="#1d1f27">•••••••</text>
  <rect x="160" y="192" width="10" height="10" rx="2" fill="#fff" stroke="#6b7280"/><text x="176" y="201" font-size="8" fill="#3a3f4c">I agree to the terms</text>
  <rect x="158" y="256" width="164" height="32" rx="8" fill="#d6dae2"/><text x="240" y="276" text-anchor="middle" font-size="11" font-weight="700" fill="#9aa1ad">Continue</text>`);

/* ---------- Words on screen ---------- */
const SVG_CASE = svg480(`
  ${["Save Your Changes", "Save your changes", "SAVE YOUR CHANGES"].map((t, i) => `
    <text x="60" y="${86 + i * 90}" font-size="26" font-weight="700" fill="#f2b632">${i + 1}</text>
    <rect x="100" y="${52 + i * 90}" width="300" height="52" rx="10" fill="#2f7de1"/>
    <text x="250" y="${86 + i * 90}" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">${t}</text>`).join("")}`);

const SVG_SWW = phone(`
  <rect x="148" y="18" width="184" height="284" rx="16" fill="#000" opacity="0.35"/>
  <rect x="166" y="110" width="148" height="100" rx="12" fill="#fff"/>
  <text x="240" y="150" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">Something went wrong.</text>
  <rect x="210" y="170" width="60" height="28" rx="8" fill="#2f7de1"/><text x="240" y="188" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">OK</text>`);

const SVG_LOREM = browser(`
  <rect x="40" y="56" width="190" height="236" rx="10" fill="#fff" stroke="#dfe3ea"/>
  <rect x="40" y="56" width="190" height="90" rx="10" fill="#c9a7f0"/>
  <text x="54" y="170" font-size="14" font-weight="700" fill="#1d1f27">Lorem ipsum dolor</text>
  <text x="54" y="190" font-size="10" fill="#6b7280">Sit amet consectetur</text>
  <rect x="54" y="248" width="80" height="26" rx="13" fill="#1f4e79"/><text x="94" y="265" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Lorem</text>
  <rect x="250" y="56" width="190" height="236" rx="10" fill="#fff" stroke="#dfe3ea"/>
  <rect x="250" y="56" width="190" height="90" rx="10" fill="#c9a7f0"/>
  <text x="264" y="170" font-size="14" font-weight="700" fill="#1d1f27">Introduction to Interaction</text>
  <text x="264" y="188" font-size="14" font-weight="700" fill="#1d1f27">Design for Public Services</text>
  <text x="264" y="206" font-size="14" font-weight="700" fill="#1d1f27">and Civic Technology</text>
  <text x="264" y="226" font-size="10" fill="#6b7280">Tuesdays and Thursdays, 9:30</text>
  <rect x="264" y="248" width="80" height="26" rx="13" fill="#1f4e79"/><text x="304" y="265" text-anchor="middle" font-size="10" font-weight="700" fill="#fff">Enroll now ›</text>
  <text x="135" y="44" text-anchor="middle" font-size="9" fill="#9aa1ad">The mockup</text><text x="345" y="44" text-anchor="middle" font-size="9" fill="#9aa1ad">The real content</text>`, "courses.example.edu");

/* ---------- Building for the web ---------- */
const SVG_BOXMODEL = svg480(`
  <rect x="60" y="30" width="360" height="260" rx="4" fill="#f2b632" opacity="0.35" stroke="#f2b632" stroke-dasharray="6 5"/>
  <rect x="100" y="66" width="280" height="188" fill="#1d1f27" stroke="#eef1ff" stroke-width="8"/>
  <rect x="104" y="70" width="272" height="180" fill="#2fbf71" opacity="0.35"/>
  <rect x="150" y="110" width="180" height="100" fill="#7fb4e8"/>
  <text x="240" y="166" text-anchor="middle" font-size="16" font-weight="700" fill="#1d1f27">Content</text>
  <path d="M460 50 L404 46" stroke="#e0544a" stroke-width="5" stroke-linecap="round"/><path d="M404 46 l14 -9 l-2 17 z" fill="#e0544a"/>`);

const SVG_SPACEBETWEEN = svg480(`
  <rect x="40" y="110" width="400" height="100" rx="6" fill="none" stroke="#9aa1ad" stroke-width="3" stroke-dasharray="8 6"/>
  <rect x="44" y="124" width="72" height="72" rx="6" fill="#f2b632"/><rect x="204" y="124" width="72" height="72" rx="6" fill="#7fb4e8"/><rect x="364" y="124" width="72" height="72" rx="6" fill="#2fbf71"/>
  <text x="240" y="90" text-anchor="middle" font-family="Courier New, monospace" font-size="16" fill="#c9ccd3">display: flex;</text>`);

const SVG_BROKENIMG = browser(`
  <text x="40" y="76" font-size="18" font-weight="700" fill="#1d1f27">About our studio</text>
  <rect x="40" y="92" width="260" height="170" fill="#fff" stroke="#c4c8d0"/>
  <g transform="translate(50 102)"><path d="M0 0 h20 v14 l-5 -4 l-5 6 l-4 -3 l-6 7 z" fill="#c4c8d0"/><path d="M2 4 l4 -2 l2 3" fill="none" stroke="#2fbf71" stroke-width="1.5"/></g>
  <text x="76" y="116" font-size="12" fill="#3a3f4c">Team photo</text>
  <g fill="#c4c8d0"><rect x="320" y="96" width="120" height="8" rx="3"/><rect x="320" y="112" width="110" height="8" rx="3"/><rect x="320" y="128" width="90" height="8" rx="3"/></g>`, "studio.example.com/about.html");

const SVG_NOVIEWPORT = phone(`
  <rect x="148" y="18" width="184" height="284" rx="16" fill="#fbfbfd"/>
  <g transform="translate(152 30) scale(0.37)">
    <rect width="480" height="60" fill="#1f4e79"/><text x="20" y="38" font-size="26" font-weight="700" fill="#fff">Westside Food Bank</text>
    <g font-size="14" fill="#fff"><text x="290" y="36">Give</text><text x="340" y="36">Volunteer</text><text x="420" y="36">Find food</text></g>
    <rect x="20" y="80" width="440" height="180" fill="#f0b07a"/>
    <text x="20" y="300" font-size="22" font-weight="700" fill="#1d1f27">Get groceries this week</text>
    <g fill="#c4c8d0">${Array.from({ length: 8 }, (_, i) => `<rect x="20" y="${320 + i * 22}" width="${[430, 400, 420, 300, 430, 380, 410, 260][i]}" height="10" rx="4"/>`).join("")}</g>
  </g>
  <text x="240" y="280" text-anchor="middle" font-size="9" fill="#6b7280">Everything is tiny. Pinch to zoom.</text>`);

/* ---------- Sound and motion (animated) ---------- */
const SVG_EASE = phone(`
  <text x="240" y="46" text-anchor="middle" font-size="14" font-weight="700" fill="#1d1f27">Library</text>
  <g fill="#e8ecf3"><rect x="158" y="60" width="164" height="60" rx="8"/><rect x="158" y="128" width="164" height="60" rx="8"/><rect x="158" y="196" width="164" height="60" rx="8"/></g>
  <rect x="148" y="18" width="184" height="284" rx="16" fill="#000" opacity="0.35">
    <animate attributeName="opacity" values="0;0.35;0.35;0;0" keyTimes="0;0.3;0.8;0.8001;1" dur="2.6s" repeatCount="indefinite"/>
  </rect>
  <g>
    <rect x="148" y="18" width="130" height="284" rx="16" fill="#1f4e79"/><rect x="200" y="18" width="78" height="284" fill="#1f4e79"/>
    <g font-size="11" fill="#fff"><text x="164" y="60" font-weight="700">Menu</text><text x="164" y="92">Search</text><text x="164" y="116">Holds</text><text x="164" y="140">Events</text><text x="164" y="164">Hours</text></g>
    <animateTransform attributeName="transform" type="translate" values="-140 0; 0 0; 0 0; -140 0; -140 0" keyTimes="0;0.3;0.8;0.8001;1" calcMode="spline" keySplines="0 0 0.2 1; 0 0 1 1; 0 0 1 1; 0 0 1 1" dur="2.6s" repeatCount="indefinite"/>
  </g>`);

const SVG_SHAKE = phone(`
  <text x="240" y="70" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Enter passcode</text>
  <g>
    ${[0, 1, 2, 3].map(i => `<circle cx="${204 + i * 24}" cy="100" r="7" fill="#e0544a"/>`).join("")}
    <animateTransform attributeName="transform" type="translate" values="0 0; -14 0; 14 0; -10 0; 10 0; -5 0; 0 0; 0 0" keyTimes="0;0.06;0.12;0.18;0.24;0.3;0.36;1" dur="2.2s" repeatCount="indefinite"/>
  </g>
  <g font-size="16" fill="#fff" text-anchor="middle">
    ${[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n, i) => `<circle cx="${190 + (i % 3) * 50}" cy="${150 + Math.floor(i / 3) * 44}" r="18" fill="#ffffff22"/><text x="${190 + (i % 3) * 50}" y="${156 + Math.floor(i / 3) * 44}">${n}</text>`).join("")}
  </g>`, "#1d2a4a");

const SVG_NOFEEDBACK = phone(`
  <text x="160" y="46" font-size="14" font-weight="700" fill="#1d1f27">Checkout</text>
  <g font-size="11" fill="#1d1f27"><text x="160" y="80">2 tickets</text><text x="320" y="80" text-anchor="end">$38.00</text></g>
  <rect x="158" y="236" width="164" height="40" rx="10" fill="#1f4e79"/>
  <text x="240" y="261" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">Pay $38.00</text>
  <g opacity="0"><rect x="158" y="236" width="164" height="40" rx="10" fill="#2fbf71"/><text x="240" y="261" text-anchor="middle" font-size="13" font-weight="700" fill="#fff">✓ Paid</text>
    <animate attributeName="opacity" values="0;1;0" keyTimes="0;0.7;0.95" calcMode="discrete" dur="5s" repeatCount="indefinite"/></g>
  <circle cx="250" cy="256" r="14" fill="#c98f6b" opacity="0">
    <animate attributeName="opacity" values="0;0.8;0;0" keyTimes="0;0.06;0.14;1" dur="5s" repeatCount="indefinite"/>
    <animate attributeName="r" values="18;12;18" keyTimes="0;0.08;1" dur="5s" repeatCount="indefinite"/>
  </circle>
  <g font-size="22" font-weight="700" text-anchor="middle" fill="#c23a2c">
    ${["1 second", "2 seconds", "3 seconds"].map((t, i) => `<text x="240" y="170" opacity="0">${t}<animate attributeName="opacity" values="0;1;0" keyTimes="0;${(0.1 + i * 0.2).toFixed(2)};${(0.3 + i * 0.2).toFixed(2)}" calcMode="discrete" dur="5s" repeatCount="indefinite"/></text>`).join("")}
  </g>
  <text x="240" y="200" text-anchor="middle" font-size="10" fill="#6b7280">after tapping Pay</text>`);

const SVG_SPINNER = phone(`
  <text x="240" y="70" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">Uploading your video</text>
  <text x="240" y="88" text-anchor="middle" font-size="10" fill="#6b7280">class-presentation.mov · 2.4 GB</text>
  <g>
    <circle cx="240" cy="160" r="30" fill="none" stroke="#e3e6ec" stroke-width="8"/>
    <path d="M240 130 a30 30 0 0 1 30 30" fill="none" stroke="#2f7de1" stroke-width="8" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate" values="0 240 160; 360 240 160" dur="0.9s" repeatCount="indefinite"/>
  </g>
  <text x="240" y="226" text-anchor="middle" font-size="11" fill="#3a3f4c">Please wait…</text>`);

const SVG_PULL = phone(`
  <text x="240" y="44" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">Inbox</text>
  <g opacity="0">
    <circle cx="240" cy="74" r="10" fill="none" stroke="#2f7de1" stroke-width="3" stroke-dasharray="40 30"/>
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.35;0.7;0.8;1" dur="3s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="rotate" values="0 240 74; 720 240 74" dur="3s" repeatCount="indefinite"/>
  </g>
  <g>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="158" y="${56 + i * 46}" width="164" height="40" rx="6" fill="#eef0f4"/><circle cx="174" cy="${76 + i * 46}" r="9" fill="${["#f2b632", "#7fb4e8", "#9fd3a8", "#c9a7f0", "#e88f8f"][i]}"/><rect x="190" y="${68 + i * 46}" width="90" height="7" rx="3" fill="#9aa1ad"/><rect x="190" y="${80 + i * 46}" width="60" height="6" rx="3" fill="#c4c8d0"/>`).join("")}
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 44; 0 44; 0 0; 0 0" keyTimes="0;0.3;0.7;0.85;1" dur="3s" repeatCount="indefinite"/>
  </g>
  <g>
    <ellipse cx="282" cy="150" rx="16" ry="24" fill="#c98f6b" opacity="0.7"/>
    <animateTransform attributeName="transform" type="translate" values="0 0; 0 44; 0 44; 0 0; 0 0" keyTimes="0;0.3;0.4;0.5;1" dur="3s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.38;0.42;1" dur="3s" repeatCount="indefinite"/>
  </g>`);

const SVG_CARTFLY = browser(`
  <text x="40" y="76" font-size="16" font-weight="700" fill="#1d1f27">Trail Mug</text>
  <rect x="40" y="88" width="170" height="150" rx="8" fill="#e8ecf3"/>
  <path d="M90 130 h56 v66 a12 12 0 0 1 -12 12 h-32 a12 12 0 0 1 -12 -12 z" fill="#c2338f"/><path d="M146 146 a16 16 0 0 1 0 32" fill="none" stroke="#c2338f" stroke-width="8"/>
  <rect x="240" y="196" width="140" height="34" rx="8" fill="#1d1f27"/><text x="310" y="218" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Add to cart</text>
  <g transform="translate(420 66)"><path d="M-14 -8 h6 l6 18 h18 l5 -13 h-26" fill="none" stroke="#1d1f27" stroke-width="3"/><circle cx="0" cy="16" r="3" fill="#1d1f27"/><circle cx="14" cy="16" r="3" fill="#1d1f27"/>
    <circle cx="20" cy="-10" r="9" fill="#e0544a"/>
    <text x="20" y="-6" text-anchor="middle" font-size="11" font-weight="700" fill="#fff">1<animate attributeName="opacity" values="1;0;1" keyTimes="0;0.55;1" calcMode="discrete" dur="2.6s" repeatCount="indefinite"/></text>
    <text x="20" y="-6" text-anchor="middle" font-size="11" font-weight="700" fill="#fff" opacity="0">2<animate attributeName="opacity" values="0;1;0" keyTimes="0;0.55;1" calcMode="discrete" dur="2.6s" repeatCount="indefinite"/></text>
  </g>
  <g opacity="0">
    <path d="M-20 -24 h40 v40 a8 8 0 0 1 -8 8 h-24 a8 8 0 0 1 -8 -8 z" fill="#c2338f"/>
    <animateMotion path="M125 170 C 200 40, 360 40, 425 64" keyPoints="0;0;1;1" keyTimes="0;0.15;0.55;1" calcMode="spline" keySplines="0 0 1 1; 0.4 0 0.2 1; 0 0 1 1" dur="2.6s" repeatCount="indefinite"/>
    <animate attributeName="opacity" values="0;1;1;0;0" keyTimes="0;0.15;0.5;0.55;1" dur="2.6s" repeatCount="indefinite"/>
    <animateTransform attributeName="transform" type="scale" additive="sum" values="1;1;0.3;0.3" keyTimes="0;0.15;0.55;1" dur="2.6s" repeatCount="indefinite"/>
  </g>
  <circle cx="320" cy="214" r="12" fill="#c98f6b" opacity="0"><animate attributeName="opacity" values="0;0.8;0;0" keyTimes="0;0.06;0.14;1" dur="2.6s" repeatCount="indefinite"/></circle>`, "shop.example.com/trail-mug");

const SVG_PARALLAX = svg480(`
  <rect width="480" height="320" fill="#8fc0dd"/>
  <g><circle cx="120" cy="70" r="30" fill="#f2d16b"/><ellipse cx="320" cy="60" rx="50" ry="16" fill="#fff" opacity="0.9"/><ellipse cx="560" cy="80" rx="60" ry="18" fill="#fff" opacity="0.9"/>
    <animateTransform attributeName="transform" type="translate" values="0 0; -40 0; 0 0" dur="4s" repeatCount="indefinite"/></g>
  <g><path d="M-100 220 L40 120 L160 200 L300 100 L440 210 L580 130 L700 220 V320 H-100 Z" fill="#6d84a3"/>
    <animateTransform attributeName="transform" type="translate" values="0 0; -90 0; 0 0" dur="4s" repeatCount="indefinite"/></g>
  <g><path d="M-200 260 C -100 220, 0 280, 120 240 S 360 220, 480 250 S 700 230, 800 260 V320 H-200 Z" fill="#5f9a6a"/>
    <animateTransform attributeName="transform" type="translate" values="0 0; -180 0; 0 0" dur="4s" repeatCount="indefinite"/></g>
  <g fill="#2f5a36">${Array.from({ length: 12 }, (_, i) => `<path d="M${-120 + i * 90} 320 l18 -70 l18 70 z"/>`).join("")}
    <animateTransform attributeName="transform" type="translate" values="0 0; -320 0; 0 0" dur="4s" repeatCount="indefinite"/></g>
  <rect x="150" y="130" width="180" height="56" rx="10" fill="#1d1f27" opacity="0.8"/><text x="240" y="166" text-anchor="middle" font-size="20" font-weight="700" fill="#fff">Visit the Rockies</text>`);

/* ---------- Figma ---------- */
// A design tool canvas: grey canvas, white frames, blue selection.
const FIG_PURPLE = "#9747ff", FIG_BLUE = "#0d99ff", FIG_PINK = "#f24e8c";
function diamonds(x, y, s, hollow) {
  const d = (cx, cy) => `<path d="M${cx} ${cy - s} L${cx + s} ${cy} L${cx} ${cy + s} L${cx - s} ${cy} Z" fill="${hollow ? "none" : FIG_PURPLE}" stroke="${FIG_PURPLE}" stroke-width="${hollow ? 2 : 0}"/>`;
  return hollow ? d(x, y) : d(x, y - s - 1) + d(x + s + 1, y) + d(x, y + s + 1) + d(x - s - 1, y);
}
const SVG_FIG_AUTOLAYOUT = svg480(`
  <text x="80" y="58" font-size="12" fill="#6b7280">Button row</text>
  <rect x="80" y="66" width="320" height="76" fill="#fff"/>
  <rect x="80" y="66" width="320" height="76" fill="none" stroke="${FIG_BLUE}" stroke-width="2"/>
  ${[["Back", 96], ["Save draft", 184], ["Publish", 300]].map(([t, x], i) => `<rect x="${x}" y="84" width="${[72, 100, 84][i]}" height="40" rx="8" fill="${i === 2 ? "#1d1f27" : "#eef0f4"}"/><text x="${x + [36, 50, 42][i]}" y="109" text-anchor="middle" font-size="13" font-weight="700" fill="${i === 2 ? "#fff" : "#1d1f27"}">${t}</text>`).join("")}
  <g fill="${FIG_PINK}" opacity="0.55"><rect x="168" y="84" width="16" height="40"/><rect x="284" y="84" width="16" height="40"/></g>
  <g font-size="10" font-weight="700" fill="#fff"><rect x="166" y="128" width="20" height="14" rx="3" fill="${FIG_PINK}"/><text x="176" y="139" text-anchor="middle">16</text><rect x="282" y="128" width="20" height="14" rx="3" fill="${FIG_PINK}"/><text x="292" y="139" text-anchor="middle">16</text></g>
  <rect x="80" y="190" width="320" height="76" fill="#fff" stroke="${FIG_BLUE}" stroke-width="2" stroke-dasharray="6 4">
    <animate attributeName="width" values="320;410;410;320" keyTimes="0;0.3;0.8;1" dur="3s" repeatCount="indefinite"/></rect>
  ${[["Back", 96], ["Save draft", 184], ["Publish", 300]].map(([t, x], i) => `<rect x="${x}" y="208" width="${[72, 100, 84][i]}" height="40" rx="8" fill="${i === 2 ? "#1d1f27" : "#eef0f4"}"/><text x="${x + [36, 50, 42][i]}" y="233" text-anchor="middle" font-size="13" font-weight="700" fill="${i === 2 ? "#fff" : "#1d1f27"}">${t}</text>`).join("")}
  <g opacity="0"><rect x="400" y="208" width="74" height="40" rx="8" fill="#eef0f4"/><text x="437" y="233" text-anchor="middle" font-size="13" font-weight="700" fill="#1d1f27">Share</text>
    <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.29;0.3;0.8;0.81" dur="3s" repeatCount="indefinite"/></g>
  <text x="80" y="292" font-size="12" fill="#6b7280">Add a button: the frame grows and keeps the 16 px gaps</text>`, "#e5e5e5");

const SVG_FIG_LAYERS = svg480(`
  <rect x="100" y="20" width="280" height="280" rx="8" fill="#fff" stroke="#d6d6d6"/>
  <text x="120" y="50" font-size="13" font-weight="700" fill="#1d1f27">Layers</text>
  <line x1="100" y1="62" x2="380" y2="62" stroke="#e5e5e5"/>
  <g font-size="14" fill="#1d1f27">
    <text x="124" y="96" font-size="16" fill="#6b7280">#</text><text x="150" y="96">Checkout screen</text>
    <text x="144" y="136" font-size="16" fill="#6b7280">#</text><text x="170" y="136">Header</text>
    ${diamonds(156, 170, 5)}<text x="174" y="175" fill="${FIG_PURPLE}" font-weight="700">Button</text>
    <rect x="114" y="154" width="252" height="32" rx="4" fill="none" stroke="#f2b632" stroke-width="3"/>
    ${diamonds(156, 212, 6, true)}<text x="174" y="217" fill="${FIG_PURPLE}">Button</text>
    <text x="144" y="258" font-size="15" font-weight="700" fill="#6b7280">T</text><text x="170" y="258">Total: $38.00</text>
  </g>`, "#2b2f3a");

const SVG_FIG_INSTANCE = svg480(`
  <rect x="100" y="20" width="280" height="280" rx="8" fill="#fff" stroke="#d6d6d6"/>
  <text x="120" y="50" font-size="13" font-weight="700" fill="#1d1f27">Layers</text>
  <line x1="100" y1="62" x2="380" y2="62" stroke="#e5e5e5"/>
  <g font-size="14" fill="#1d1f27">
    <text x="124" y="96" font-size="16" fill="#6b7280">#</text><text x="150" y="96">Checkout screen</text>
    <text x="144" y="136" font-size="16" fill="#6b7280">#</text><text x="170" y="136">Header</text>
    ${diamonds(156, 170, 6, true)}<text x="174" y="175" fill="${FIG_PURPLE}">Button</text>
    <rect x="114" y="154" width="252" height="32" rx="4" fill="none" stroke="#f2b632" stroke-width="3"/>
    <text x="144" y="216" font-size="15" font-weight="700" fill="#6b7280">T</text><text x="170" y="216">Total: $38.00</text>
  </g>`, "#2b2f3a");

const SVG_FIG_CONSTRAINTS = svg480(`
  <rect x="30" y="60" width="150" height="220" fill="#fff"/>
  <rect x="30" y="60" width="150" height="34" fill="#1f4e79"/>
  <rect x="104" y="230" width="64" height="34" rx="8" fill="#1d1f27"/><text x="136" y="252" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Next</text>
  <rect x="220" y="60" width="240" height="220" fill="#fff"/>
  <rect x="220" y="60" width="240" height="34" fill="#1f4e79"/>
  <rect x="384" y="230" width="64" height="34" rx="8" fill="#1d1f27"/><text x="416" y="252" text-anchor="middle" font-size="12" font-weight="700" fill="#fff">Next</text>
  <g stroke="${FIG_BLUE}" stroke-width="2" stroke-dasharray="4 3"><line x1="168" y1="247" x2="180" y2="247"/><line x1="136" y1="264" x2="136" y2="280"/><line x1="448" y1="247" x2="460" y2="247"/><line x1="416" y1="264" x2="416" y2="280"/></g>
  <g font-size="12" fill="#6b7280"><text x="30" y="48">Frame at 150 wide</text><text x="220" y="48">Same frame stretched to 240</text></g>
  <path d="M186 170 h24" stroke="#6b7280" stroke-width="3"/><path d="M210 170 l-8 -6 v12 z" fill="#6b7280"/>`, "#e5e5e5");

const SVG_FIG_PROTO = svg480(`
  ${[[30, "Cart"], [180, "Checkout"], [330, "Done"]].map(([x, t]) => `<text x="${x}" y="50" font-size="12" fill="#6b7280">${t}</text><rect x="${x}" y="58" width="120" height="220" rx="6" fill="#fff"/>
    <rect x="${x + 10}" y="74" width="100" height="10" rx="3" fill="#c4c8d0"/><rect x="${x + 10}" y="92" width="70" height="8" rx="3" fill="#e3e6ec"/><rect x="${x + 10}" y="236" width="100" height="26" rx="6" fill="#1d1f27"/>`).join("")}
  <g fill="none" stroke="${FIG_BLUE}" stroke-width="3">
    <path d="M140 249 C 160 249, 160 150, 180 150"/><path d="M290 249 C 310 249, 310 150, 330 150"/>
  </g>
  <circle cx="140" cy="249" r="5" fill="#fff" stroke="${FIG_BLUE}" stroke-width="3"/><circle cx="290" cy="249" r="5" fill="#fff" stroke="${FIG_BLUE}" stroke-width="3"/>
  <path d="M180 150 l-9 -5 v10 z M330 150 l-9 -5 v10 z" fill="${FIG_BLUE}"/>
  <rect x="150" y="286" width="180" height="24" rx="4" fill="#fff"/><text x="160" y="302" font-size="11" fill="#1d1f27">On tap → Navigate to · Smart animate</text>`, "#e5e5e5");

/* ---------- Code on screen ---------- */
// A code editor. Each line is [text, color]; use "" for a blank line.
function code(lines, file) {
  const colors = { tag: "#7fb4e8", attr: "#f2b632", str: "#9fd3a8", key: "#c9a7f0", txt: "#e8eaf0", dim: "#7d8494" };
  return `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img">
  <rect width="480" height="320" fill="#151821"/>
  <rect width="480" height="30" fill="#232733"/><text x="16" y="20" font-family="Arial, sans-serif" font-size="12" fill="#c9ccd3">${file || ""}</text>
  <g font-family="Courier New, monospace" font-size="16">
    ${lines.map((ln, i) => `<text x="16" y="${62 + i * 26}" fill="#4b5263">${i + 1}</text><text x="48" y="${62 + i * 26}" xml:space="preserve">${(Array.isArray(ln) ? ln : [[ln, "txt"]]).map(([t, c]) => `<tspan fill="${colors[c] || c}">${t.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</tspan>`).join("")}</text>`).join("")}
  </g></svg>`;
}
const SVG_MEDIAQ = code([
  [[".cards", "key"], [" {", "txt"]],
  [["  display: ", "txt"], ["grid", "str"], [";", "txt"]],
  [["  grid-template-columns: ", "txt"], ["1fr", "str"], [";", "txt"]],
  [["}", "txt"]],
  "",
  [["@media", "tag"], [" (", "txt"], ["min-width: 768px", "attr"], [") {", "txt"]],
  [["  .cards", "key"], [" { grid-template-columns: ", "txt"], ["1fr 1fr", "str"], ["; }", "txt"]],
  [["}", "txt"]]
], "styles.css");
const SVG_LABELFOR = code([
  [["<", "tag"], ["label", "tag"], [" for", "attr"], ["=", "txt"], ['"email"', "str"], [">", "tag"], ["Email", "txt"], ["</label>", "tag"]],
  [["<", "tag"], ["input", "tag"], [" id", "attr"], ["=", "txt"], ['"email"', "str"], [" type", "attr"], ["=", "txt"], ['"email"', "str"], [">", "tag"]]
], "signup.html");
const SVG_HEADINGS = code([
  [["<h1>", "tag"], ["Library hours", "txt"], ["</h1>", "tag"]],
  [["<h4>", "tag"], ["Main branch", "txt"], ["</h4>", "tag"]],
  [["<p>", "tag"], ["Open 9 to 8 every day.", "txt"], ["</p>", "tag"]],
  [["<h4>", "tag"], ["Eastside branch", "txt"], ["</h4>", "tag"]],
  [["<p>", "tag"], ["Closed Sundays.", "txt"], ["</p>", "tag"]]
], "hours.html");
const SVG_DIVBUTTON = code([
  [["<", "tag"], ["div", "tag"], [" class", "attr"], ["=", "txt"], ['"btn"', "str"], [" onclick", "attr"], ["=", "txt"], ['"save()"', "str"], [">", "tag"]],
  [["  Save", "txt"]],
  [["</div>", "tag"]]
], "editor.html");
const SVG_ICONBTN = (function () {
  const inner = code([
    [["<", "tag"], ["button", "tag"], [">", "tag"]],
    [["  <", "tag"], ["svg", "tag"], [" ...", "dim"], [">", "tag"], ["<!-- magnifying glass -->", "dim"]],
    [["</button>", "tag"]]
  ], "header.html");
  return inner.replace("</svg>", `<g transform="translate(380 230)"><circle cx="0" cy="0" r="22" fill="none" stroke="#e8eaf0" stroke-width="6"/><path d="M15 15 l22 22" stroke="#e8eaf0" stroke-width="8" stroke-linecap="round"/></g></svg>`);
})();

/* ---------- Responsive design ---------- */
const SVG_BREAKPOINTS = svg480(`
  <rect x="24" y="70" width="90" height="170" rx="12" fill="#0d0f14"/><rect x="30" y="80" width="78" height="150" rx="4" fill="#fbfbfd"/>
  ${[0, 1, 2].map(i => `<rect x="36" y="${88 + i * 46}" width="66" height="40" rx="3" fill="#7fb4e8"/>`).join("")}
  <rect x="140" y="60" width="140" height="190" rx="10" fill="#0d0f14"/><rect x="148" y="70" width="124" height="170" rx="3" fill="#fbfbfd"/>
  ${[0, 1, 2, 3].map(i => `<rect x="${154 + (i % 2) * 58}" y="${78 + Math.floor(i / 2) * 60}" width="54" height="54" rx="3" fill="#7fb4e8"/>`).join("")}
  <rect x="300" y="60" width="160" height="110" rx="6" fill="#0d0f14"/><rect x="306" y="66" width="148" height="96" rx="2" fill="#fbfbfd"/><rect x="350" y="170" width="60" height="10" fill="#0d0f14"/><rect x="330" y="180" width="100" height="6" rx="3" fill="#0d0f14"/>
  ${[0, 1, 2].map(i => `<rect x="${312 + i * 47}" y="74" width="42" height="80" rx="2" fill="#7fb4e8"/>`).join("")}
  <g font-size="14" fill="#c9ccd3" text-anchor="middle"><text x="69" y="268">under 600 px</text><text x="210" y="276">600 to 1024 px</text><text x="380" y="210">over 1024 px</text></g>
  <g font-size="14" font-weight="700" fill="#f2b632" text-anchor="middle"><text x="127" y="160">|</text><text x="290" y="160">|</text></g>`);

const SVG_THUMBZONE = phone(`
  <defs><radialGradient id="thumb" cx="0.75" cy="1" r="1"><stop offset="0" stop-color="#2fbf71"/><stop offset="0.55" stop-color="#2fbf71"/><stop offset="0.75" stop-color="#f2b632"/><stop offset="1" stop-color="#e0544a"/></radialGradient></defs>
  <rect x="148" y="18" width="184" height="284" rx="16" fill="url(#thumb)" opacity="0.75"/>
  <g font-size="11" font-weight="700" fill="#1d1f27" text-anchor="middle"><text x="240" y="50">Hard</text><text x="240" y="150">OK</text><text x="270" y="260">Easy</text></g>
  <ellipse cx="320" cy="300" rx="24" ry="40" fill="#c98f6b" opacity="0.8" transform="rotate(-30 320 300)"/>`);

const SVG_HOVERMENU = browser(`
  <rect x="14" y="40" width="452" height="34" fill="#1d1f27"/>
  <g font-size="13" fill="#fff"><text x="40" y="62" font-weight="700">Parks</text><text x="160" y="62">Programs ▾</text><text x="270" y="62">Permits</text><text x="350" y="62">Contact</text></g>
  <rect x="150" y="74" width="140" height="110" fill="#fff" stroke="#dfe3ea"/>
  <g font-size="12" fill="#1d1f27"><text x="164" y="100">Swim lessons</text><text x="164" y="126">Summer camps</text><text x="164" y="152">Adult sports</text></g>
  <path d="M200 58 l0 16 l5 -4 l3 7 l3 -1 l-3 -7 l6 0 z" fill="#fff" stroke="#1d1f27"/>
  <text x="300" y="120" font-size="12" fill="#6b7280">Opens on mouse hover</text>`, "parks.example.gov");

/* ---------- Transit and mobility ---------- */
const SVG_BECK = svg480(`
  <rect x="10" y="10" width="225" height="300" rx="8" fill="#f3f1ea"/>
  <g fill="none" stroke-width="5" stroke-linecap="round">
    <path d="M30 60 C 70 90, 90 70, 120 130 S 170 230, 220 250" stroke="#e0544a"/>
    <path d="M40 260 C 80 210, 100 170, 120 130 S 150 60, 210 40" stroke="#2f7de1"/>
    <path d="M25 170 C 60 160, 90 140, 120 130 S 190 150, 225 120" stroke="#2fbf71"/>
  </g>
  ${[[52, 76], [120, 130], [180, 214], [70, 214], [170, 70], [60, 162], [190, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#1d1f27" stroke-width="2"/>`).join("")}
  <text x="122" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6b7280">Map A</text>
  <rect x="245" y="10" width="225" height="300" rx="8" fill="#f3f1ea"/>
  <g fill="none" stroke-width="6" stroke-linejoin="round" stroke-linecap="round">
    <path d="M265 70 L310 70 L357 117 L357 190 L440 190" stroke="#e0544a"/>
    <path d="M285 260 L357 188 L357 117 L410 64 L455 64" stroke="#2f7de1"/>
    <path d="M260 150 L455 150" stroke="#2fbf71"/>
  </g>
  ${[[290, 70], [357, 150], [400, 190], [320, 225], [420, 64], [300, 150], [420, 150]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#fff" stroke="#1d1f27" stroke-width="2"/>`).join("")}
  <text x="357" y="300" text-anchor="middle" font-family="Arial, sans-serif" font-size="12" fill="#6b7280">Map B</text>`, "#2b2f3a");

const SVG_BUSSIGN = svg480(`
  <rect width="480" height="320" fill="#8fc0dd"/><rect y="250" width="480" height="70" fill="#9aa1ad"/>
  <rect x="226" y="40" width="10" height="230" fill="#6b7280"/>
  <rect x="90" y="40" width="282" height="130" rx="8" fill="#14161c"/>
  <g font-family="Courier New, monospace" font-weight="700" font-size="19" fill="#f2b632">
    <text x="106" y="76">4 Downtown</text><text x="356" y="76" text-anchor="end">3 min</text>
    <text x="106" y="110">4 Downtown</text><text x="356" y="110" text-anchor="end">15 min</text>
    <text x="106" y="144">22 Airport</text><text x="356" y="144" text-anchor="end">8 min</text>
  </g>
  <rect x="290" y="190" width="40" height="64" rx="8" fill="#3a3f4c"/><circle cx="310" cy="178" r="12" fill="#3a3f4c"/>`);

const SVG_FARECAP = svg480(`
  <text x="40" y="40" font-size="15" font-weight="700" fill="#eef1ff">What a rider pays in one week</text>
  <line x1="60" y1="270" x2="450" y2="270" stroke="#9aa1ad" stroke-width="2"/><line x1="60" y1="60" x2="60" y2="270" stroke="#9aa1ad" stroke-width="2"/>
  <line x1="60" y1="120" x2="450" y2="120" stroke="#f2b632" stroke-width="2" stroke-dasharray="6 5"/>
  <text x="70" y="112" font-size="12" font-weight="700" fill="#f2b632">Weekly pass price: $25</text>
  ${Array.from({ length: 14 }, (_, i) => { const paid = Math.min((i + 1) * 2.5, 25); const h = paid / 25 * 150; return `<rect x="${70 + i * 27}" y="${270 - h}" width="20" height="${h}" fill="${(i + 1) * 2.5 > 25 ? "#2fbf71" : "#7fb4e8"}"/>`; }).join("")}
  <text x="255" y="294" text-anchor="middle" font-size="12" fill="#c9ccd3">Rides 1 to 14, at $2.50 each</text>
  <text x="395" y="88" text-anchor="middle" font-size="12" font-weight="700" fill="#2fbf71">Rides 11 to 14 are free</text>`);

const SVG_SCRAMBLE = svg480(`
  <rect width="480" height="320" fill="#5d636e"/>
  <g fill="#c9ccd3"><rect x="0" y="0" width="150" height="90"/><rect x="330" y="0" width="150" height="90"/><rect x="0" y="230" width="150" height="90"/><rect x="330" y="230" width="150" height="90"/></g>
  <g fill="#fff">${Array.from({ length: 8 }, (_, i) => `<rect x="${160 + i * 21}" y="94" width="12" height="28"/><rect x="${160 + i * 21}" y="198" width="12" height="28"/><rect x="154" y="${128 + i * 0}" width="0" height="0"/>`).join("")}
    ${Array.from({ length: 5 }, (_, i) => `<rect x="152" y="${108 + i * 22}" width="28" height="12"/><rect x="300" y="${108 + i * 22}" width="28" height="12"/>`).join("")}</g>
  <g stroke="#f2b632" stroke-width="4" stroke-dasharray="10 8" fill="none"><path d="M150 90 L330 230"/><path d="M330 90 L150 230"/></g>
  <g fill="#1d1f27">${[[200, 130], [280, 130], [240, 160], [210, 190], [270, 195], [170, 110], [310, 205]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`).join("")}</g>
  <g>${[[50, 160, 0], [430, 160, 180]].map(([x, y, r]) => `<rect x="${x - 30}" y="${y - 14}" width="60" height="28" rx="6" fill="#e0544a" transform="rotate(${r} ${x} ${y})"/>`).join("")}</g>
  <rect x="226" y="10" width="28" height="64" rx="5" fill="#14161c"/><circle cx="240" cy="26" r="8" fill="#e0544a"/><circle cx="240" cy="42" r="8" fill="#3a3f4c"/><circle cx="240" cy="58" r="8" fill="#3a3f4c"/>`);

const SVG_15MIN = svg480(`
  <circle cx="240" cy="160" r="130" fill="#2fbf71" opacity="0.18" stroke="#2fbf71" stroke-width="3" stroke-dasharray="8 6"/>
  <path d="M222 168 l18 -16 l18 16 v20 h-36 z" fill="#eef1ff"/>
  ${[["🛒", 0], ["🏫", 1], ["🏥", 2], ["🌳", 3], ["📚", 4], ["☕", 5], ["🚌", 6], ["💼", 7]].map(([e, i]) => { const a = i / 8 * Math.PI * 2; return `<text x="${240 + Math.cos(a) * 95}" y="${168 + Math.sin(a) * 95}" text-anchor="middle" font-size="30">${e}</text>`; }).join("")}
  <text x="240" y="306" text-anchor="middle" font-size="13" fill="#c9ccd3">A short walk or bike ride from home</text>`);

/* ---------- Public space ---------- */
const SVG_HOSTILE = svg480(`
  <rect width="480" height="320" fill="#c9ccd3"/><rect y="230" width="480" height="90" fill="#9aa1ad"/>
  <rect x="70" y="170" width="340" height="18" rx="4" fill="#6b4a2f"/>
  <rect x="90" y="188" width="14" height="60" fill="#3a3f4c"/><rect x="376" y="188" width="14" height="60" fill="#3a3f4c"/>
  ${[150, 240, 330].map(x => `<path d="M${x - 10} 170 v-26 a10 10 0 0 1 20 0 v26 z" fill="#3a3f4c"/>`).join("")}
  <g fill="#6b7280">${Array.from({ length: 14 }, (_, i) => `<path d="M${40 + i * 30} 300 l8 -22 l8 22 z"/>`).join("")}</g>`);

const SVG_TACTICAL = svg480(`
  <rect width="480" height="320" fill="#5d636e"/>
  <path d="M0 0 H200 V120 H0 Z" fill="#c9ccd3"/><path d="M280 0 H480 V120 H280 Z" fill="#c9ccd3"/>
  <path d="M0 120 H200 C 200 170, 170 190, 120 200 H0 Z" fill="#7fd1c0"/>
  <g fill="#f2b632">${Array.from({ length: 9 }, (_, i) => `<circle cx="${20 + i * 22}" cy="${150 + (i % 3) * 14}" r="6"/>`).join("")}</g>
  ${[[40, 210], [100, 206], [160, 186]].map(([x, y]) => `<rect x="${x - 6}" y="${y - 22}" width="12" height="26" rx="5" fill="#fff"/><rect x="${x - 6}" y="${y - 18}" width="12" height="4" fill="#e0544a"/>`).join("")}
  <rect x="30" y="126" width="40" height="22" rx="4" fill="#8a5a3a"/><circle cx="50" cy="122" r="14" fill="#4f9a5d"/>
  <rect x="130" y="126" width="40" height="22" rx="4" fill="#8a5a3a"/><circle cx="150" cy="122" r="14" fill="#4f9a5d"/>
  <g fill="#fff">${Array.from({ length: 6 }, (_, i) => `<rect x="${220 + i * 0}" y="${130 + i * 28}" width="40" height="14"/>`).join("")}</g>`);

const SVG_PARKLET = svg480(`
  <rect width="480" height="320" fill="#5d636e"/><rect y="0" width="480" height="110" fill="#c9ccd3"/>
  <rect x="0" y="110" width="480" height="6" fill="#9aa1ad"/>
  <rect x="20" y="130" width="120" height="64" rx="10" fill="#2f7de1"/><rect x="340" y="130" width="120" height="64" rx="10" fill="#e0544a"/>
  <rect x="160" y="118" width="160" height="80" fill="#b5895a"/>
  <g stroke="#6b4a2f" stroke-width="2">${Array.from({ length: 8 }, (_, i) => `<line x1="${160 + i * 20}" y1="118" x2="${160 + i * 20}" y2="198"/>`).join("")}</g>
  <rect x="160" y="190" width="160" height="10" fill="#4f9a5d"/><circle cx="172" cy="188" r="10" fill="#4f9a5d"/><circle cx="308" cy="188" r="10" fill="#4f9a5d"/>
  <rect x="190" y="136" width="36" height="24" rx="4" fill="#f3f1ea"/><rect x="250" y="136" width="36" height="24" rx="4" fill="#f3f1ea"/>
  <circle cx="200" cy="130" r="8" fill="#1d1f27"/><circle cx="276" cy="130" r="8" fill="#1d1f27"/>
  <g fill="#fff">${Array.from({ length: 10 }, (_, i) => `<rect x="${10 + i * 48}" y="252" width="30" height="6"/>`).join("")}</g>`);

/* ---------- Accessibility standards ---------- */
const SVG_VPAT = svg480(`
  <rect x="20" y="20" width="440" height="280" rx="8" fill="#fbfbfd"/>
  <text x="36" y="48" font-size="14" font-weight="700" fill="#1d1f27">Transit Fare App · WCAG 2.1 report</text>
  <rect x="36" y="60" width="408" height="26" fill="#1f4e79"/>
  <g font-size="11" font-weight="700" fill="#fff"><text x="44" y="77">Criteria</text><text x="230" y="77">Conformance Level</text><text x="350" y="77">Remarks</text></g>
  ${[["1.1.1 Non-text Content", "Supports", "#2fbf71", "Icons have labels"], ["1.4.3 Contrast (Minimum)", "Partially Supports", "#f2b632", "Map legend is faint"], ["2.1.1 Keyboard", "Supports", "#2fbf71", ""], ["2.4.7 Focus Visible", "Does Not Support", "#e0544a", "No focus ring on menu"], ["3.3.1 Error Identification", "Supports", "#2fbf71", ""]].map(([c, l, col, r], i) => `
    <rect x="36" y="${86 + i * 40}" width="408" height="40" fill="${i % 2 ? "#f0f2f6" : "#fff"}"/>
    <text x="44" y="${110 + i * 40}" font-size="11" fill="#1d1f27">${c}</text>
    <circle cx="236" cy="${106 + i * 40}" r="5" fill="${col}"/><text x="246" y="${110 + i * 40}" font-size="11" fill="#1d1f27">${l}</text>
    <text x="350" y="${110 + i * 40}" font-size="10" fill="#6b7280">${r}</text>`).join("")}`);

const SVG_CAPTIONS = svg480(`
  <rect x="30" y="30" width="420" height="236" rx="8" fill="#14161c"/>
  <rect x="30" y="30" width="420" height="236" rx="8" fill="#3d5a80" opacity="0.6"/>
  <circle cx="190" cy="120" r="34" fill="#f0b07a"/><rect x="146" y="156" width="88" height="80" rx="30" fill="#e0544a"/>
  <rect x="270" y="90" width="130" height="90" rx="4" fill="#eef1ff"/><path d="M286 160 l24 -30 l20 20 l14 -12 l40 22" fill="none" stroke="#3d5a80" stroke-width="4"/>
  <rect x="96" y="200" width="288" height="44" rx="4" fill="#000" opacity="0.8"/>
  <text x="240" y="218" text-anchor="middle" font-size="14" fill="#fff">[bus brakes hiss]</text>
  <text x="240" y="236" text-anchor="middle" font-size="14" fill="#fff">Route 4 now stops at Liberty Street.</text>
  <rect x="30" y="266" width="420" height="30" fill="#232733"/><path d="M46 274 l12 7 l-12 7 z" fill="#fff"/>
  <rect x="70" y="279" width="260" height="4" rx="2" fill="#5c6270"/><rect x="70" y="279" width="110" height="4" rx="2" fill="#e0544a"/>
  <rect x="396" y="273" width="28" height="16" rx="3" fill="#fff"/><text x="410" y="285" text-anchor="middle" font-size="10" font-weight="700" fill="#14161c">CC</text>`);
