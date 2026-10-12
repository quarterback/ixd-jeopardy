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
