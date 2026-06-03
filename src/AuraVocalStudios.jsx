import { useState, useRef, useEffect, useCallback } from "react";

const PROFILE_IMG = "/profile.jpg";

// ─── ICON FACTORY ─────────────────────────────────────────────────────────────
const sz = (w=20,h=20) => ({width:`${w}px`,height:`${h}px`,display:"block",flexShrink:0});

const PlayIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" style={sz()}><polygon points="5,3 19,12 5,21"/></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" style={sz()}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const SunIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={sz(15,15)}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={sz(15,15)}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const MailIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(16,16)}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>;
const LinkIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(14,14)}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const TwIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" style={sz(15,15)}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const IgIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(15,15)}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
const LiIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" style={sz(15,15)}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;

const UpworkIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={sz(15,15)}>
    <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H8.535v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H1.419v7.112c0 2.521 2.049 4.575 4.57 4.575 2.521 0 4.57-2.054 4.57-4.575v-1.19c.535 1.113 1.19 2.241 1.952 3.239l-1.652 7.757h2.55l1.19-5.602c1.115.74 2.431 1.227 3.963 1.227 3 0 5.439-2.441 5.439-5.442 0-3-2.439-5.435-5.439-5.435z"/>
  </svg>
);
const MicIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>;
const WaveIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><path d="M2 12h2l3-8 4 16 3-10 2 4h6"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const GlobeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={sz(14,14)}><polyline points="20 6 9 17 4 12"/></svg>;
const StarIcon  = ({color="#00F2FE"}) => <svg viewBox="0 0 20 20" fill={color} style={sz(12,12)}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>;

// ─── CONTACT CONSTANTS ───────────────────────────────────────────────────────────
const MAILTO_LINK = "mailto:concierge@studiohqauravocal.site?subject=Project%20Inquiry%20%E2%80%94%20Aura%20Vocal%20Studios&body=Hello%20David%2C%0A%0AI%20am%20reaching%20out%20regarding%20a%20voice-over%20project%20for%20%5BBrand%2FProject%20Name%5D.%0A%0AProject%20Overview%3A%0A%5BDescribe%20your%20project%20briefly%5D%0A%0ACategory%3A%0A%5BCommercial%20%2F%20Documentary%20%2F%20Enterprise%20%2F%20Character%20%2F%20Other%5D%0A%0ADeadline%3A%0A%5BYour%20required%20delivery%20date%5D%0A%0ABudget%20Range%3A%0A%5BYour%20budget%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BCompany%2FOrganisation%5D";
const BOOKING_LINK = "https://calendly.com/d/cyvv-gj7-2n7";

// ─── WAVEFORM (CSS-only, zero state updates, mobile-safe) ────────────────────
const BARS = 28;
const BAR_HEIGHTS = Array.from({length:BARS}, (_,i) =>
  Math.max(6, Math.abs(Math.sin(i*0.71)*13 + Math.cos(i*0.43)*7) + 6)
);

const OrganicWaveform = ({ isPlaying, accent }) => (
  <div style={{display:"flex",alignItems:"center",gap:"2px",height:"40px",overflow:"hidden",userSelect:"none"}}>
    {BAR_HEIGHTS.map((h,i) => (
      <div key={i} style={{
        width:"2.5px", borderRadius:"9999px", flexShrink:0,
        height: isPlaying ? `${h}px` : `${3+(i%4)*2}px`,
        background: isPlaying ? `linear-gradient(180deg,${accent},${accent}66)` : accent,
        opacity: isPlaying ? 0.88 : 0.22,
        boxShadow: isPlaying ? `0 0 5px ${accent}55` : "none",
        animation: isPlaying ? `wave ${0.38+(i%5)*0.12}s ease-in-out infinite alternate` : "none",
        animationDelay: `${i*0.03}s`,
        transition: "height 0.35s ease, opacity 0.35s ease",
      }}/>
    ))}
  </div>
);

// ─── DEMO DATA — 10 SLOTS ─────────────────────────────────────────────────────
const DEMOS = [
  {
    id:1, size:"featured",
    title:"Luxury Commercial",
    subtitle:"Global Campaign · Premium Devices · Market Dominance",
    tag:"COMMERCIAL", tone:"Sovereign · Polished",
    accentSolid:"#00F2FE",
    src:"/demos/Track1.mp3",
    description:"Not a demo. A declaration. The read global enterprises deploy when the campaign cannot afford to be less than commanding — engineered for flagship launches, VSL infrastructure, and brand manifestos where every syllable carries the full weight of capital.",
  },
  {
    id:2, size:"standard",
    title:"Open World Sovereign",
    subtitle:"AAA Gaming · Cinematic Score · Franchise Narrative",
    tag:"GAMING", tone:"Epic · Commanding",
    accentSolid:"#a78bfa",
    src:"/demos/Track2.mp3",
    description:"The voice that builds worlds. Engineered for AAA open-world titles where the narrative must carry the weight of a franchise — a performance that makes players pause, feel the lore, and believe every word was written for them alone.",
  },
  {
    id:3, size:"standard",
    title:"Podcast Narration",
    subtitle:"True Story · World-Changing Brilliance · Audience Retention",
    tag:"PODCAST", tone:"Warm · Magnetic",
    accentSolid:"#34d399",
    src:"/demos/Track3.mp3",
    description:"Retention isn't requested — it's engineered. Built around a story of quiet, world-altering brilliance. The vocal presence that converts first-time listeners into lifelong audiences.",
  },
  {
    id:4, size:"compact",
    title:"Enterprise Systems & Tech",
    subtitle:"Fortune 100 · IVR · Global Automated Pipelines",
    tag:"ENTERPRISE", tone:"Authoritative · Calibrated",
    accentSolid:"#f59e0b",
    src:"/demos/Track4.mp3",
    description:"Fortune 100 firms. Continental scale. Boardroom-commanding, pipeline-ready, broadcast-clean. First pass. Every time.",
  },
  {
    id:5, size:"compact",
    title:"Cinematic & Dramatic",
    subtitle:"Anti-Hero · Franchise Trailer · High-Stakes Monologue",
    tag:"CINEMATIC", tone:"Ferocious · Commanding",
    accentSolid:"#f43f5e",
    src:"/demos/Track5.mp3",
    description:"The performances studios cite years later. Anti-heroes, trailers, defining monologues — executed with precision so sharp it leaves the room silent.",
  },
  {
    id:6, size:"compact",
    title:"Automotive Brand Spec",
    subtitle:"High-Velocity · Heritage · Prestige Engineering",
    tag:"AUTOMOTIVE", tone:"Visceral · Exacting",
    accentSolid:"#fb923c",
    src:"/demos/Track6.mp3",
    description:"Feel the acceleration before the engine starts. Engineered for brands where horsepower and legacy are inseparable — visceral, exacting, impossible to ignore.",
  },
  {
    id:7, size:"featured",
    title:"ARIVAL'",
    subtitle:"Premium Documentary · Continental Narration · Cultural Authority",
    tag:"SIGNATURE", tone:"Measured · Sovereign",
    accentSolid:"#22d3ee",
    src:"/demos/Track7.mp3",
    description:"There are voices that inform. Then there is ARIVAL' — the standard reserved for productions that demand to be remembered. A narration so architecturally precise and culturally fluent that it doesn't just deliver content, it consecrates it. Deployed across landmark documentary series and premium knowledge platforms at continental scale.",
  },
  {
    id:8, size:"featured",
    title:"Luxury AD · Gaming",
    subtitle:"Next-Gen Console · Cultural Moment · Generational Icon",
    tag:"LUXURY GAMING", tone:"Epic · Mythic",
    accentSolid:"#818cf8",
    src:"/demos/Track8.mp3",
    description:"When a console defines a generation, its voice must be equally mythic. The read behind a cultural detonation — not a product launch. Crafted to make millions feel summoned into something far greater than a game.",
  },
  {
    id:9, size:"standard",
    title:"Financial Power Campaign",
    subtitle:"Global Payments · Premium Tier · Market Confidence",
    tag:"FINANCIAL", tone:"Confident · Commanding",
    accentSolid:"#f97316",
    src:"/demos/Track9.mp3",
    description:"The voice behind the transaction that moves markets. Engineered for premium financial campaigns where trust is currency, confidence is the product, and every word must carry the full weight of institutional authority — accepted, everywhere, without question.",
  },
  {
    id:10, size:"standard",
    title:"Global Football Campaign",
    subtitle:"Mass Market · Stadium Energy · Continental Broadcast",
    tag:"SPORTS", tone:"Explosive · Unifying",
    accentSolid:"#4ade80",
    src:"/demos/Track10.mp3",
    description:"The voice of the beautiful game at its most electric. Built for packed stadiums, continental broadcasts, and billions of fans who demand to feel the match before the whistle blows — the read that makes the world stand up.",
  },
  {
    id:11, size:"compact",
    title:"The Beautiful Game",
    subtitle:"Continental Campaign · Stadium Authority · Billions Watching",
    tag:"FOOTBALL", tone:"Electric · Unifying",
    accentSolid:"#4ade80",
    src:"/demos/Track11.mp3",
    description:"The campaign voice for the sport that stops the world. Engineered for continental broadcasts, kit launches, and tournament anthems — a read so charged with energy and cultural weight that the stadium fills before a single player steps onto the pitch.",
  },
  {
    id:12, size:"compact",
    title:"Sovereign Motion",
    subtitle:"Athletic Prestige · Cultural Velocity · Icon Energy",
    tag:"PRESTIGE SPORT", tone:"Visceral · Iconic",
    accentSolid:"#facc15",
    src:"/demos/Track12.mp3",
    description:"This is what it sounds like when a brand stops selling and starts moving culture. Built for the campaigns that don't follow trends — they set them. The voice of athletic prestige at its most electric: fast, sharp, and impossible to ignore.",
  },
];

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  { id:1, quote:"We briefed David on a 90-second luxury automotive spot and he delivered something so authoritative, so immaculately paced, our creative director called it the finest VO work we've ever commissioned. Clients noticed immediately.", author:"Isabelle Fontaine", role:"Head of Brand Experience", company:"Maison Lumière Group", industry:"LUXURY FASHION", accentColor:"#00F2FE", featured:true },
  { id:2, quote:"We needed authority across 14 markets simultaneously. David recorded the full suite in a single session — clean takes, zero direction. He understands what a brand needs before you finish the brief.", author:"Marcus Osei", role:"VP of Global Marketing", company:"Nexora Technologies", industry:"ENTERPRISE TECH", accentColor:"#f59e0b", featured:false },
  { id:3, quote:"Twenty years in the industry and David occupies a category entirely his own. The emotional precision he brought to our documentary series was extraordinary — our editor said the rough cut moved her to tears on the first pass.", author:"Cynthia Adeyemi", role:"Executive Producer", company:"Meridian Film Studios", industry:"CINEMATIC", accentColor:"#f43f5e", featured:false },
  { id:4, quote:"Our podcast went from 40k to 380k monthly listeners within four months. Retention climbed 67%. The audience DMs us asking about 'the voice.' There is no overstating what the right vocal presence does for long-form audio.", author:"Jordan Calloway", role:"Founder & Host", company:"The Architecture of Thought", industry:"PODCAST", accentColor:"#34d399", featured:false },
  { id:5, quote:"18-hour turnaround on a 3-minute IVR suite. Broadcast-ready, perfectly levelled — clear, warm, professional. We've retained Aura Vocal Studios on an exclusive annual contract since.", author:"Priya Nair", role:"Director of Customer Experience", company:"Stratos Financial Systems", industry:"ENTERPRISE", accentColor:"#f59e0b", featured:false },
  { id:6, quote:"We cast David as lead antagonist in our flagship RPG. The range in a single session — cold calculation to raw menace — had our audio team on their feet. Gamers call it 'the best villain voice in a decade.'", author:"Tomás Reyes", role:"Audio Director", company:"Ironveil Game Studios", industry:"CINEMATIC", accentColor:"#f43f5e", featured:false },
];

const STUDIO = [
  { icon:<MicIcon/>,  label:"Broadcast Mic Chain",   desc:"Neumann U87 · UA Apollo Interface",  color:"#00F2FE" },
  { icon:<WaveIcon/>, label:"Pro Tools · Logic Pro X", desc:"Broadcast-grade DAW suite",       color:"#a78bfa" },
  { icon:<ClockIcon/>,label:"Sub-48H Turnaround",      desc:"Rush delivery on request",         color:"#34d399" },
  { icon:<GlobeIcon/>,label:"Global Clearance",       desc:"WAV · MP3 · Cleared in all territories",  color:"#f59e0b" },
];

const WHY = [
  { label:"Single-Source Casting",    desc:"No agents. No delays. No coordination tax. One voice with total command — the decision that eliminates every downstream creative complication." },
  { label:"Broadcast Quality Always", desc:"48kHz WAV, noise-treated, broadcast-clean — every single file. Technical quality has never once required a revision. Not here." },
  { label:"Remote Directed Sessions", desc:"Source-Connect and live Zoom direction, anywhere on earth. Your creative vision executes in real time — no timezone, no geography, no friction." },
  { label:"Zero Briefing Friction",   desc:"David internalises brand intent before the brief is finished. The majority of clients receive a first-pass final. That is not an exception — it is the standard." },
];

// ─── UTILITIES ────────────────────────────────────────────────────────────────
const fmt = s => {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
};

// ─── DEMO CARD ────────────────────────────────────────────────────────────────
const DemoCard = ({ demo, isPlaying, onToggle, isDark }) => {
  const audioRef = useRef(null);
  const scrubRef = useRef(null);
  const [cur, setCur] = useState(0);
  const [dur, setDur] = useState(0);
  const acc = demo.accentSolid;

  // Sync playback with parent state
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    if (isPlaying) a.play().catch(() => {});
    else { a.pause(); }
  }, [isPlaying]);

  // Audio event listeners
  useEffect(() => {
    const a = audioRef.current; if (!a) return;
    const onTime = () => setCur(a.currentTime);
    const onMeta = () => setDur(a.duration);
    const onEnd  = () => { setCur(0); onToggle(); };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("durationchange", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("durationchange", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [onToggle]);

  const seek = useCallback(e => {
    const a = audioRef.current, b = scrubRef.current;
    if (!a || !b || !dur) return;
    const r = b.getBoundingClientRect();
    a.currentTime = Math.max(0, Math.min(1, (e.clientX - r.left) / r.width)) * dur;
    setCur(a.currentTime);
  }, [dur]);

  const pct = dur ? (cur / dur) * 100 : 0;
  const isFeatured = demo.size === "featured";
  const isCompact  = demo.size === "compact";

  // Glass card background — dark mode: deep smoked glass; light mode: clean white glass
  const cardBg = isDark
    ? isPlaying
      ? `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`
      : `rgba(255,255,255,0.02)`
    : isPlaying
      ? `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,255,0.9) 100%)`
      : `rgba(255,255,255,0.75)`;

  const cardBorder = isPlaying
    ? `1px solid ${acc}60`
    : isDark
      ? `1px solid rgba(255,255,255,0.05)`
      : `1px solid rgba(0,0,0,0.09)`;

  const cardShadow = isPlaying
    ? `0 0 0 1px ${acc}28, 0 20px 60px ${acc}20, 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)`
    : isDark
      ? `0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.03)`
      : `0 4px 24px rgba(0,0,0,0.07), 0 1px 4px rgba(0,0,0,0.04)`;

  const titleColor  = isDark ? "#FFFFFF" : "#0A0A0F";
  const subColor    = isDark ? "#475569" : "#64748B";
  const descColor   = isDark ? "#8B9CC0" : "#374151";
  const timeColor   = isDark ? "#475569" : "#9CA3AF";
  const trackBg     = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.09)";

  return (
    <div style={{
      position:"relative", overflow:"hidden", borderRadius:"20px",
      padding: isCompact ? "20px" : "26px",
      display:"flex", flexDirection:"column", gap: isCompact ? "12px" : "16px",
      minHeight: isFeatured ? "220px" : isCompact ? "170px" : "190px",
      background: cardBg,
      border: cardBorder,
      boxShadow: cardShadow,
      backdropFilter: "blur(28px) saturate(180%)",
      WebkitBackdropFilter: "blur(28px) saturate(180%)",
      transition: "border-color 0.45s ease, box-shadow 0.5s ease, background 0.4s ease, transform 0.3s ease",
      cursor: "default",
    }}>
      <audio ref={audioRef} src={demo.src} preload="metadata"/>

      {}
      <div style={{
        position:"absolute", top:"-50px", right:"-50px",
        width:"220px", height:"220px", borderRadius:"50%",
        background: `radial-gradient(circle, ${acc}${is
