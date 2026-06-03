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

// ─── ORGANIC WAVEFORM ─────────────────────────────────────────────────────────
// Uses requestAnimationFrame for truly organic, variable-height live animation
// when playing. Static stepped bars when idle.
const BARS = 38;
const BASE_HEIGHTS = Array.from({length:BARS}, (_,i) =>
  5 + Math.abs(Math.sin(i * 0.71) * 13 + Math.cos(i * 0.43) * 7)
);

const OrganicWaveform = ({ isPlaying, accent }) => {
  const [heights, setHeights] = useState(BASE_HEIGHTS);
  const rafRef = useRef(null);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setHeights(BASE_HEIGHTS.map((_,i) => 3 + (i % 4) * 2.5));
      return;
    }
    const tick = (ts) => {
      timeRef.current = ts;
      setHeights(Array.from({length:BARS}, (_,i) => {
        const t = ts / 1000;
        return Math.max(3,
          BASE_HEIGHTS[i]
          + Math.sin(t * 2.3 + i * 0.4) * 9
          + Math.sin(t * 3.7 + i * 0.7) * 5
          + Math.cos(t * 1.9 + i * 0.3) * 4
        );
      }));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying]);

  return (
    <div style={{display:"flex",alignItems:"center",gap:"2px",height:"40px",overflow:"hidden",userSelect:"none"}}>
      {heights.map((h,i) => (
        <div key={i} style={{
          width:"2.5px", borderRadius:"9999px", flexShrink:0,
          height:`${Math.min(h, 38)}px`,
          background: isPlaying
            ? `linear-gradient(180deg, ${accent}ff, ${accent}55)`
            : accent,
          opacity: isPlaying ? 0.85 : 0.22,
          transition: isPlaying ? "none" : "height 0.4s ease, opacity 0.4s ease",
          boxShadow: isPlaying ? `0 0 6px ${accent}66` : "none",
        }}/>
      ))}
    </div>
  );
};

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
        background: `radial-gradient(circle, ${acc}${isPlaying?"40":"14"} 0%, transparent 70%)`,
        filter:"blur(32px)", pointerEvents:"none",
        transition:"background 0.6s ease",
      }}/>

      {}
      <div style={{
        position:"absolute", bottom:"-40px", left:"-40px",
        width:"180px", height:"180px", borderRadius:"50%",
        background: isPlaying ? `radial-gradient(circle, #4FACFE28 0%, transparent 70%)` : "transparent",
        filter:"blur(28px)", pointerEvents:"none",
        transition:"background 0.6s ease",
        animation: isPlaying ? "pulseGlow 3.5s ease-in-out infinite" : "none",
      }}/>

      {}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"9px",flexWrap:"wrap"}}>
            <span style={{
              display:"inline-block", fontSize:"8px", letterSpacing:"0.22em", fontWeight:700,
              padding:"3px 10px", borderRadius:"9999px",
              color: acc,
              background: `${acc}1A`,
              border: `1px solid ${acc}45`,
            }}>{demo.tag}</span>
            <span style={{
              fontSize:"9px", letterSpacing:"0.09em",
              color: isDark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.38)",
            }}>{demo.tone}</span>
          </div>

          <h3 style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontWeight:700, lineHeight:1.15, margin:0,
            fontSize: isFeatured ? "22px" : isCompact ? "15.5px" : "18px",
            color: titleColor,
            letterSpacing:"-0.01em",
          }}>{demo.title}</h3>
          <p style={{
            fontSize:"11px", color: subColor,
            marginTop:"3px", letterSpacing:"0.02em",
            fontFamily:"'DM Sans',sans-serif",
          }}>{demo.subtitle}</p>
        </div>

        {}
        <button
          onClick={onToggle}
          aria-label={isPlaying ? "Pause" : "Play"}
          style={{
            flexShrink:0,
            width: isCompact ? "42px" : "48px",
            height: isCompact ? "42px" : "48px",
            borderRadius:"50%",
            display:"flex", alignItems:"center", justifyContent:"center",
            background: isPlaying
              ? `linear-gradient(135deg, ${acc} 0%, ${acc}cc 100%)`
              : "transparent",
            border: `1.5px solid ${acc}`,
            color: isPlaying ? "#000" : acc,
            cursor:"pointer",
            transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)",
            boxShadow: isPlaying
              ? `0 0 22px ${acc}90, 0 0 44px ${acc}38`
              : `0 0 0 0 transparent`,
            transform: isPlaying ? "scale(1.07)" : "scale(1)",
          }}
          onMouseEnter={e => {
            if (!isPlaying) {
              e.currentTarget.style.background = `${acc}18`;
              e.currentTarget.style.transform = "scale(1.06)";
              e.currentTarget.style.boxShadow = `0 0 16px ${acc}50`;
            }
          }}
          onMouseLeave={e => {
            if (!isPlaying) {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }
          }}
        >
          {isPlaying ? <PauseIcon/> : <PlayIcon/>}
        </button>
      </div>

      {}
      {!isCompact && (
        <p style={{
          fontSize: isFeatured ? "12.5px" : "12px",
          lineHeight:1.75, color: descColor, margin:0,
          fontFamily:"'DM Sans',sans-serif", fontWeight:300,
        }}>{demo.description}</p>
      )}

      {}
      <OrganicWaveform isPlaying={isPlaying} accent={acc}/>

      {}
      <div style={{fontFamily:"'DM Sans',sans-serif"}}>
        <div
          ref={scrubRef} onClick={seek}
          role="slider" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Seek"
          style={{width:"100%",height:"16px",display:"flex",alignItems:"center",cursor:"pointer",position:"relative"}}
        >
          <div style={{width:"100%",height:"3px",borderRadius:"9999px",background: trackBg,position:"relative",overflow:"visible"}}>
            <div style={{
              position:"absolute",left:0,top:0,height:"100%",borderRadius:"9999px",
              width:`${pct}%`,
              background: isPlaying ? `linear-gradient(90deg,${acc},${acc}bb)` : `${acc}55`,
              boxShadow: isPlaying ? `0 0 10px ${acc}99` : "none",
              transition:"width 0.2s linear",
            }}/>
            <div style={{
              position:"absolute",top:"50%",transform:"translateY(-50%)",
              left:`calc(${pct}% - 5px)`,
              width:"10px",height:"10px",borderRadius:"50%",
              background:acc, boxShadow:`0 0 10px ${acc}bb`,
              transition:"left 0.2s linear",
              opacity: pct > 0 ? 1 : 0,
            }}/>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:timeColor,marginTop:"4px",letterSpacing:"0.03em"}}>
          <span>{fmt(cur)}</span>
          <span>{dur ? fmt(dur) : "--:--"}</span>
        </div>
        {/* ════════════════════════════════════════════════════════════════════
            ABOUT MODAL
        ════════════════════════════════════════════════════════════════════ */}
        {showAbout && (
          <div
            onClick={()=>setShowAbout(false)}
            style={{
              position:"fixed",inset:0,zIndex:500,
              background:"rgba(0,0,0,0.82)",
              backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
              display:"flex",alignItems:"center",justifyContent:"center",
              padding:"24px",
            }}>
            <div
              onClick={e=>e.stopPropagation()}
              style={{
                maxWidth:"680px",width:"100%",borderRadius:"24px",
                padding:"52px 52px 44px",
                background:isDark
                  ?"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))"
                  :"rgba(255,255,255,0.97)",
                border:`1px solid ${isDark?"rgba(0,242,254,0.14)":"rgba(0,0,0,0.08)"}`,
                backdropFilter:"blur(32px)",
                boxShadow:isDark?"0 32px 80px rgba(0,0,0,0.7)":"0 24px 64px rgba(0,0,0,0.12)",
                position:"relative",
              }}>
              {/* Close */}
              <button
                onClick={()=>setShowAbout(false)}
                style={{
                  position:"absolute",top:"20px",right:"22px",
                  background:"transparent",border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
                  borderRadius:"50%",width:"32px",height:"32px",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:isDark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",
                  cursor:"pointer",fontSize:"16px",lineHeight:1,
                  transition:"all 0.2s ease",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE";e.currentTarget.style.color="#00F2FE";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)";e.currentTarget.style.color=isDark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)";}}>
                ✕
              </button>

              {/* Eyebrow */}
              <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"20px"}}>
                ABOUT AURA VOCAL STUDIOS
              </div>

              {/* Heading */}
              <h2 className="serif" style={{
                fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,
                color:isDark?"#FFFFFF":"#0A0A0F",lineHeight:1.12,
                letterSpacing:"-0.02em",marginBottom:"28px",
              }}>
                Not a Voice Agency.<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:isDark?"rgba(255,255,255,0.48)":"rgba(10,10,15,0.4)"}}>A Commercial Infrastructure.</span>
              </h2>

              {/* Body */}
              <div className="sans" style={{fontSize:"14px",lineHeight:1.82,color:isDark?"#8B9CC0":"#374151",fontWeight:300}}>
                <p style={{marginBottom:"20px"}}>
                  Aura Vocal Studios is the world's premier single-source voice performance agency — founded and directed by <span style={{color:isDark?"#FFFFFF":"#0A0A0F",fontWeight:500}}>David Chidera Nwaibe</span>. Built not as a marketplace, not as a platform, but as a precision instrument deployed by global enterprises, cinematic studios, and category-defining brands when the brief demands absolute authority.
                </p>
                <p style={{marginBottom:"20px"}}>
                  Where most agencies introduce casting variables, coordination overhead, and creative attrition, Aura operates on a fundamentally different model: one voice, total command, zero friction. Every campaign brief ends in a first-pass final. Every file delivered broadcast-ready. Every read calibrated to the exact cultural and commercial register the brand requires.
                </p>
                <p style={{marginBottom:"28px"}}>
                  Eleven distinct performance categories. Sub-48-hour delivery. Remote directed sessions available globally via Source-Connect. WAV and MP3 delivery cleared for worldwide distribution. This is not a service — it is a standard.
                </p>
              </div>

              {/* Stats row */}
              <div style={{display:"flex",gap:"32px",paddingTop:"24px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"}`,flexWrap:"wrap"}}>
                {[["11","Performance Categories"],["<48H","Delivery Standard"],["Zero","Revision Rate"],["Global","Territorial Clearance"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="serif" style={{fontSize:"24px",fontWeight:700,color:isDark?"#FFFFFF":"#0A0A0F",lineHeight:1,letterSpacing:"-0.02em"}}>{n}</div>
                    <div className="sans" style={{fontSize:"10px",color:isDark?"#475569":"#6B7280",marginTop:"5px",letterSpacing:"0.09em",fontWeight:500,textTransform:"uppercase"}}>{l}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{display:"flex",gap:"12px",marginTop:"32px",flexWrap:"wrap"}}>
                <a
                  href="https://calendly.com/d/cyvv-gj7-2n7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sans shimmer-btn"
                  style={{
                    padding:"12px 28px",borderRadius:"100px",
                    color:"#000",fontWeight:700,fontSize:"12px",
                    letterSpacing:"0.07em",textDecoration:"none",
                    boxShadow:"0 0 28px rgba(0,242,254,0.35)",
                    transition:"transform 0.3s ease,box-shadow 0.3s ease",display:"inline-block",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 0 44px rgba(0,242,254,0.6)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 28px rgba(0,242,254,0.35)";}}>
                  Commission a Session
                </a>
                <a
                  href={`mailto:concierge@studiohqauravocal.site?subject=Project%20Inquiry%20%E2%80%94%20Aura%20Vocal%20Studios&body=Hello%20David%2C%0A%0AI%20am%20reaching%20out%20regarding%20a%20voice-over%20project%20for%20%5BBrand%2FProject%20Name%5D.%0A%0AProject%20Overview%3A%0A%5BDescribe%20your%20project%20briefly%5D%0A%0ACategory%3A%0A%5BCommercial%20%2F%20Documentary%20%2F%20Enterprise%20%2F%20Character%20%2F%20Other%5D%0A%0ADeadline%3A%0A%5BYour%20required%20delivery%20date%5D%0A%0ABudget%20Range%3A%0A%5BYour%20budget%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BCompany%2FOrganisation%5D`}
                  className="sans"
                  style={{
                    padding:"11px 24px",borderRadius:"100px",
                    border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
                    background:"transparent",
                    color:isDark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)",
                    fontSize:"12px",letterSpacing:"0.05em",
                    textDecoration:"none",transition:"all 0.3s ease",display:"inline-block",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE50";e.currentTarget.style.color=isDark?"#FFFFFF":"#0A0A0F";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)";e.currentTarget.style.color=isDark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)";}}>
                  Direct Line
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function AuraVocalStudios() {
  const [isDark, setIsDark]       = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const [scrolled, setScrolled]   = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Strict mutual exclusion — playing one track pauses all others
  const toggle = useCallback(id => {
    setPlayingId(prev => prev === id ? null : id);
  }, []);

  // Derived theme tokens
  const bg     = isDark ? "#050505" : "#F8F9FC";
  const tp     = isDark ? "#FFFFFF" : "#0A0A0F";
  const tm     = isDark ? "#8B9CC0" : "#4B5563";
  const ts     = isDark ? "#475569" : "#6B7280";
  const border = isDark ? "rgba(255,255,255,0.055)" : "rgba(0,0,0,0.09)";
  const glass  = isDark ? "rgba(255,255,255,0.025)" : "rgba(255,255,255,0.78)";
  const navBg  = isDark
    ? `rgba(5,5,5,${scrolled ? 0.95 : 0.65})`
    : `rgba(248,249,252,${scrolled ? 0.97 : 0.80})`;

  return (
    <div style={{background:bg, color:tp, minHeight:"100vh", fontFamily:"'Cormorant Garamond',Georgia,serif", overflowX:"hidden"}}>

      {}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&family=Playfair+Display:ital,wght@0,700;1,400&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(0,242,254,0.28); border-radius:2px; }
        @keyframes pulseGlow { 0%,100%{opacity:0.45;} 50%{opacity:1;} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(30px);} to{opacity:1;transform:translateY(0);} }
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(38px,-28px) scale(1.07);} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-28px,38px) scale(1.05);} }
        @keyframes rotateRing { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
        @keyframes marquee { from{transform:translateX(0);} to{transform:translateX(-50%);} }
        @keyframes floatCard { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-7px);} }
        .fu  { animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .fu1 { animation-delay:0.07s; }
        .fu2 { animation-delay:0.20s; }
        .fu3 { animation-delay:0.35s; }
        .fu4 { animation-delay:0.50s; }
        .sans  { font-family:'DM Sans',sans-serif; }
        .serif { font-family:'Cormorant Garamond',Georgia,serif; }
        .shimmer-btn {
          background:linear-gradient(90deg,#00F2FE 0%,#4FACFE 40%,#00F2FE 60%,#4FACFE 100%);
          background-size:200% 100%;
          animation:shimmer 3.2s linear infinite;
        }
        .marquee-row { animation:marquee 44s linear infinite; display:flex; width:max-content; }
        .marquee-row:hover { animation-play-state:paused; }
        .lift { transition:transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }
        .lift:hover { transform:translateY(-4px); }
        .float { animation:floatCard 6s ease-in-out infinite; }
        a, button { cursor:pointer; }
      `}</style>

      {}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        <div style={{position:"absolute",top:"-18%",left:"-14%",width:"58vw",height:"58vw",borderRadius:"50%",background:isDark?"radial-gradient(circle,#00F2FE09,transparent 70%)":"radial-gradient(circle,#6366F111,transparent 70%)",animation:"orb1 20s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"-18%",right:"-10%",width:"52vw",height:"52vw",borderRadius:"50%",background:isDark?"radial-gradient(circle,#4FACFE07,transparent 70%)":"radial-gradient(circle,#818CF80E,transparent 70%)",animation:"orb2 24s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"2px",height:"38vh",
          background:"linear-gradient(180deg,#00F2FE30,transparent)",opacity:isDark?0.7:0.2}}/>
        <div style={{position:"absolute",inset:0,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
          opacity:isDark?0.65:0.25}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* ════════════════════════════════════════════════════════════════════
            NAVIGATION
        ════════════════════════════════════════════════════════════════════ */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,backdropFilter:"blur(28px) saturate(200%)",WebkitBackdropFilter:"blur(28px) saturate(200%)",background:navBg,borderBottom:`1px solid ${border}`,boxShadow:scrolled?(isDark?"0 4px 40px rgba(0,0,0,0.7)":"0 4px 24px rgba(0,0,0,0.07)"):"none",transition:"background 0.4s ease, box-shadow 0.4s ease",}}>
          <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 28px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div className="serif" style={{letterSpacing:"0.2em",fontSize:"12.5px",fontWeight:600,color:tp,userSelect:"none"}}>
              AURA<span style={{color:"#00F2FE",margin:"0 6px",filter:"drop-shadow(0 0 6px #00F2FE88)"}}>◆</span>VOCAL STUDIOS
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
              <button
                onClick={()=>setIsDark(d=>!d)}
                className="sans"
                style={{display:"flex",alignItems:"center",gap:"7px",padding:"7px 16px",borderRadius:"100px",border:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)",color:tm,fontSize:"11.5px",cursor:"pointer",transition:"all 0.3s ease",letterSpacing:"0.04em",}}>
                {isDark?<SunIcon/>:<MoonIcon/>}
                <span>{isDark?"Light":"Dark"}</span>
              </button>
              <a
                href="https://calendly.com/d/cyvv-gj7-2n7"
                className="sans shimmer-btn"
                style={{
                  padding:"9px 24px",borderRadius:"100px",
                  color:"#000",fontWeight:700,fontSize:"12px",
                  letterSpacing:"0.07em",textDecoration:"none",display:"inline-block",
                  boxShadow:"0 0 28px rgba(0,242,254,0.38)",
                  transition:"transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 44px rgba(0,242,254,0.65)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 28px rgba(0,242,254,0.38)";}}>
                Request Session
              </a>

            </div>
          </div>
        </nav>

        {/* ════════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{paddingTop:"156px",paddingBottom:"112px",paddingLeft:"28px",paddingRight:"28px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"72px",alignItems:"center"}}>

            <div>
              {}
              <div className="sans fu fu1" style={{display:"inline-flex",alignItems:"center",gap:"10px",marginBottom:"30px"}}>
                <div style={{width:"34px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
                <span style={{fontSize:"9.5px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,textTransform:"uppercase"}}>The Definitive Standard in Voice Performance</span>
                <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#00F2FE",
                  boxShadow:"0 0 10px #00F2FE",animation:"pulseGlow 2.2s ease-in-out infinite"}}/>
              </div>

              {}
              <h1 className="serif fu fu2" style={{
                fontSize:"clamp(40px,5.8vw,82px)",fontWeight:700,lineHeight:1.04,
                letterSpacing:"-0.03em",marginBottom:"28px",color:tp,
              }}>
                The Voice That<br/>
                <span style={{fontStyle:"italic",fontWeight:300,
                  color:isDark?"rgba(255,255,255,0.48)":"rgba(10,10,15,0.38)"}}>Defines Market</span>
                <br/>Categories.
              </h1>

              {}
              <p className="sans fu fu3" style={{
                fontSize:"15px",lineHeight:1.82,color:tm,
                maxWidth:"520px",marginBottom:"48px",fontWeight:300,
              }}>
                Not a voice-over agency. A market instrument. <span style={{color:tp,fontWeight:500}}>David Chidera Nwaibe</span> — the voice that global enterprises, cinematic studios, and category-defining brands deploy when the brief demands nothing short of absolute authority. One source. Unmatched precision. Permanent cultural impact.
              </p>

              {}
              <div className="fu fu4" style={{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
                <a
                  href="https://calendly.com/d/cyvv-gj7-2n7"
                  className="sans shimmer-btn"
                  style={{
                    display:"inline-flex",alignItems:"center",gap:"8px",
                    padding:"15px 38px",borderRadius:"100px",
                    color:"#000",fontWeight:700,fontSize:"13px",letterSpacing:"0.08em",
                    textDecoration:"none",
                    boxShadow:"0 0 52px rgba(0,242,254,0.38)",
                    transition:"transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 70px rgba(0,242,254,0.62)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 52px rgba(0,242,254,0.38)";}}>
                  Commission a Session <LinkIcon/>
                </a>
                <a
                  href="mailto:concierge@studiohqauravocal.site?subject=Project%20Inquiry%20%E2%80%94%20Aura%20Vocal%20Studios&body=Hello%20David%2C%0A%0AI%20am%20reaching%20out%20regarding%20a%20voice-over%20project%20for%20%5BBrand%2FProject%20Name%5D.%0A%0AProject%20Overview%3A%0A%5BDescribe%20your%20project%20briefly%5D%0A%0ACategory%3A%0A%5BCommercial%20%2F%20Documentary%20%2F%20Enterprise%20%2F%20Character%20%2F%20Other%5D%0A%0ADeadline%3A%0A%5BYour%20required%20delivery%20date%5D%0A%0ABudget%20Range%3A%0A%5BYour%20budget%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BCompany%2FOrganisation%5D"
                  className="sans"
                  style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 30px",borderRadius:"100px",border:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)",color:tm,fontSize:"13px",letterSpacing:"0.05em",textDecoration:"none",transition:"all 0.3s ease",}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE50";e.currentTarget.style.color=tp;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=tm;}}>
                  <MailIcon/> Direct Line
                </a>
              </div>

              {}
              <div className="fu fu4" style={{display:"flex",gap:"40px",marginTop:"60px",paddingTop:"38px",borderTop:`1px solid ${border}`,flexWrap:"wrap"}}>
                {[["Category·One","Voice Performance Standard"],["<48H","Sonic Core Turnaround"],["Zero","Revision Rate on Quality"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="serif" style={{fontSize:"32px",fontWeight:700,color:tp,lineHeight:1,letterSpacing:"-0.02em"}}>{n}</div>
                    <div className="sans" style={{fontSize:"10.5px",color:ts,marginTop:"7px",letterSpacing:"0.1em",fontWeight:500,textTransform:"uppercase"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {}
            <div style={{position:"relative",flexShrink:0,width:"290px",height:"290px"}}>
              <div style={{position:"absolute",inset:"-22px",border:"1px dashed rgba(0,242,254,0.18)",borderRadius:"50%",animation:"rotateRing 26s linear infinite"}}>
                <div style={{position:"absolute",top:"-5px",left:"50%",transform:"translateX(-50%)",
                  width:"10px",height:"10px",borderRadius:"50%",background:"#00F2FE",
                  boxShadow:"0 0 18px #00F2FE, 0 0 32px #00F2FE55"}}/>
              </div>
              <div style={{position:"absolute",inset:"-50px",border:"1px dashed rgba(79,172,254,0.07)",borderRadius:"50%",animation:"rotateRing 42s linear infinite reverse"}}/>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",
                background:"radial-gradient(circle,rgba(0,242,254,0.14) 0%,transparent 70%)",
                animation:"pulseGlow 4.5s ease-in-out infinite"}}/>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",border:`1px solid ${border}`,backdropFilter:"blur(12px)"}}>
                <img src={PROFILE_IMG} alt="David Chidera Nwaibe" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              </div>
              <div className="sans" style={{position:"absolute",bottom:"-18px",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",padding:"6px 20px",borderRadius:"100px",fontSize:"9px",letterSpacing:"0.2em",fontWeight:600,background:isDark?"rgba(5,5,5,0.9)":"rgba(255,255,255,0.95)",border:`1px solid ${border}`,color:"#00F2FE",backdropFilter:"blur(16px)",}}>
                CREATIVE DIRECTOR
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            WHY BRANDS CHOOSE AURA
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{padding:"80px 28px",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.012)":"rgba(0,0,0,0.012)"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"52px"}}>
              <div className="sans" style={{fontSize:"10px",letterSpacing:"0.26em",color:"#00F2FE",fontWeight:600,marginBottom:"14px"}}>THE OPERATING STANDARD</div>
              <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,46px)",fontWeight:700,color:tp,lineHeight:1.12,letterSpacing:"-0.02em"}}>
                Why the World's Biggest<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Campaigns End Here</span>
              </h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:"18px"}}>
              {WHY.map((w,i)=>(
                <div key={i} className="lift glass-card" style={{padding:"28px 26px",background:glass,border:`1px solid ${border}`,boxShadow:isDark?"0 8px 32px rgba(0,0,0,0.4)":"0 4px 20px rgba(0,0,0,0.06)"}}>
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"11px"}}>
                    <div style={{width:"22px",height:"22px",borderRadius:"50%",flexShrink:0,
                      background:"rgba(0,242,254,0.15)",border:"1px solid rgba(0,242,254,0.4)",
                      display:"flex",alignItems:"center",justifyContent:"center",color:"#00F2FE"}}>
                      <CheckIcon/>
                    </div>
                    <div className="sans" style={{fontSize:"13px",fontWeight:600,color:tp,letterSpacing:"0.04em",textTransform:"uppercase"}}>{w.label}</div>
                  </div>
                  <p className="sans" style={{fontSize:"12px",color:isDark?tm:"#374151",lineHeight:1.72,fontWeight:300}}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            THE SOVEREIGN COLLECTION — 10-SLOT CATEGORISED BENTO
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{padding:"100px 28px 120px",maxWidth:"1280px",margin:"0 auto"}}>

          {}
          <div style={{marginBottom:"56px"}}>
            <div className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
              <div style={{width:"24px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
              <span style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700}}>THE SOVEREIGN COLLECTION</span>
            </div>
            <h2 className="serif" style={{fontSize:"clamp(28px,4vw,52px)",fontWeight:700,color:tp,lineHeight:1.1,letterSpacing:"-0.02em"}}>
              Twelve Chambers<br/>
              <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>of Sonic Authority</span>
            </h2>
            <p className="sans" style={{fontSize:"14px",color:tm,marginTop:"16px",maxWidth:"600px",lineHeight:1.78,fontWeight:300}}>
              Eleven categories. Eleven markets. One voice that dominates them all. What you are about to hear is not a portfolio — it is a body of proof. Each chamber below represents a distinct domain where David Chidera Nwaibe has operated at the highest level of commercial execution. No casting overhead. No creative attrition. No second pass. Press play.
            </p>
          </div>

          {/* ── CATEGORY I: LUXURY & COMMERCIAL ── */}
          <div style={{marginBottom:"12px",marginTop:"8px"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.3em",fontWeight:700,color:isDark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",textTransform:"uppercase",paddingLeft:"2px"}}>I — Luxury &amp; Commercial</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px",marginBottom:"40px"}}>
            <div style={{gridColumn:"span 7"}}>
              <DemoCard demo={DEMOS[0]} isPlaying={playingId===DEMOS[0].id} onToggle={()=>toggle(DEMOS[0].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 5",display:"flex",flexDirection:"column",gap:"16px"}}>
              <DemoCard demo={DEMOS[1]} isPlaying={playingId===DEMOS[1].id} onToggle={()=>toggle(DEMOS[1].id)} isDark={isDark}/>
              <DemoCard demo={DEMOS[2]} isPlaying={playingId===DEMOS[2].id} onToggle={()=>toggle(DEMOS[2].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 12"}}>
              <DemoCard demo={DEMOS[10]} isPlaying={playingId===DEMOS[10].id} onToggle={()=>toggle(DEMOS[10].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 12"}}>
              <DemoCard demo={DEMOS[11]} isPlaying={playingId===DEMOS[11].id} onToggle={()=>toggle(DEMOS[11].id)} isDark={isDark}/>
            </div>
          </div>

          {/* ── CATEGORY II: ENTERPRISE, CINEMATIC & AUTOMOTIVE ── */}
          <div style={{marginBottom:"12px"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.3em",fontWeight:700,color:isDark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",textTransform:"uppercase",paddingLeft:"2px"}}>II — Enterprise, Cinematic &amp; Automotive</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px",marginBottom:"40px"}}>
            <div style={{gridColumn:"span 4"}}>
              <DemoCard demo={DEMOS[3]} isPlaying={playingId===DEMOS[3].id} onToggle={()=>toggle(DEMOS[3].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 4"}}>
              <DemoCard demo={DEMOS[4]} isPlaying={playingId===DEMOS[4].id} onToggle={()=>toggle(DEMOS[4].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 4"}}>
              <DemoCard demo={DEMOS[5]} isPlaying={playingId===DEMOS[5].id} onToggle={()=>toggle(DEMOS[5].id)} isDark={isDark}/>
            </div>
          </div>

          {/* ── CATEGORY III: DOCUMENTARY, GAMING & PRESTIGE ── */}
          <div style={{marginBottom:"12px"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.3em",fontWeight:700,color:isDark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",textTransform:"uppercase",paddingLeft:"2px"}}>III — ARIVAL', Gaming &amp; Prestige</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px",marginBottom:"40px"}}>
            <div style={{gridColumn:"span 6"}}>
              <DemoCard demo={DEMOS[6]} isPlaying={playingId===DEMOS[6].id} onToggle={()=>toggle(DEMOS[6].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 6"}}>
              <DemoCard demo={DEMOS[7]} isPlaying={playingId===DEMOS[7].id} onToggle={()=>toggle(DEMOS[7].id)} isDark={isDark}/>
            </div>
          </div>

          {/* ── CATEGORY IV: FINANCIAL & SPORTS ── */}
          <div style={{marginBottom:"12px"}}>
            <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.3em",fontWeight:700,color:isDark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",textTransform:"uppercase",paddingLeft:"2px"}}>IV — Financial &amp; Sports</span>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px"}}>
            <div style={{gridColumn:"span 5"}}>
              <DemoCard demo={DEMOS[8]} isPlaying={playingId===DEMOS[8].id} onToggle={()=>toggle(DEMOS[8].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 7"}}>
              <DemoCard demo={DEMOS[9]} isPlaying={playingId===DEMOS[9].id} onToggle={()=>toggle(DEMOS[9].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 12"}}>
              <DemoCard demo={DEMOS[11]} isPlaying={playingId===DEMOS[11].id} onToggle={()=>toggle(DEMOS[11].id)} isDark={isDark}/>
            </div>
          </div>

          <p className="sans" style={{marginTop:"22px",textAlign:"center",fontSize:"10.5px",
            color:isDark?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.25)",letterSpacing:"0.07em"}}>
            Twelve chambers · Twelve markets · One voice · Zero compromise
          </p>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            STUDIO INFRASTRUCTURE
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{padding:"80px 28px",background:isDark?"rgba(255,255,255,0.014)":"rgba(0,0,0,0.012)",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"52px"}}>
              <div className="sans" style={{fontSize:"10px",letterSpacing:"0.26em",color:"#00F2FE",fontWeight:600,marginBottom:"14px"}}>STUDIO CHAIN & DELIVERY</div>
              <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,46px)",fontWeight:700,color:tp,lineHeight:1.12,letterSpacing:"-0.02em"}}>
                Engineered for Perfection.<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>From Chain to Delivery.</span>
              </h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"18px"}}>
              {STUDIO.map((s,i)=>(
                <div key={i} className="lift float glass-card" style={{padding:"34px 26px",borderRadius:"20px",textAlign:"center",background:glass,border:`1px solid ${s.color}22`,boxShadow:`0 8px 40px ${s.color}0E`,animationDelay:`${i*0.7}s`}}>
                  <div style={{
                    width:"54px",height:"54px",borderRadius:"16px",margin:"0 auto 18px",
                    background:`linear-gradient(135deg,${s.color}22,${s.color}09)`,
                    border:`1px solid ${s.color}44`,
                    display:"flex",alignItems:"center",justifyContent:"center",color:s.color,
                  }}>{s.icon}</div>
                  <div className="sans" style={{fontSize:"13px",fontWeight:600,color:tp,marginBottom:"7px",letterSpacing:"0.01em"}}>{s.label}</div>
                  <div className="sans" style={{fontSize:"11.5px",color:isDark?ts:"#6B7280",fontWeight:300}}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            CLIENT TESTIMONIALS
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{padding:"100px 0 120px",overflow:"hidden"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 28px 52px"}}>
            <div className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <div style={{width:"24px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
              <span style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700}}>FIELD REPORTS</span>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"22px"}}>
              <h2 className="serif" style={{fontSize:"clamp(28px,4vw,52px)",fontWeight:700,color:tp,lineHeight:1.1,letterSpacing:"-0.02em"}}>
                The Verdict from<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Those Who Set the Standard</span>
              </h2>
              <div className="sans" style={{display:"flex",alignItems:"center",gap:"5px"}}>
                {[1,2,3,4,5].map(s=><StarIcon key={s}/>)}
                <span style={{fontSize:"12px",color:ts,marginLeft:"8px",fontWeight:400}}>5.0 · 200+ engagements</span>
              </div>
            </div>
          </div>

          {}
          <div style={{maxWidth:"1280px",margin:"0 auto 28px",padding:"0 28px"}}>
            {(()=>{
              const r=REVIEWS[0];
              return (
                <div className="lift" style={{position:"relative",overflow:"hidden",borderRadius:"24px",padding:"52px 56px",background:isDark?"linear-gradient(135deg,rgba(0,242,254,0.04),rgba(255,255,255,0.015))":"linear-gradient(135deg,rgba(255,255,255,0.95),rgba(240,248,255,0.9))",border:`1px solid ${isDark?"rgba(0,242,254,0.11)":"rgba(99,102,241,0.14)"}`,backdropFilter:"blur(24px)",boxShadow:isDark?"0 24px 72px rgba(0,0,0,0.45)":"0 16px 48px rgba(0,0,0,0.08)",}}>
                  <div style={{position:"absolute",top:"16px",right:"32px",fontSize:"200px",
                    fontFamily:"Georgia,serif",color:"#00F2FE",opacity:0.04,lineHeight:1,pointerEvents:"none"}}>"</div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"44px",alignItems:"center"}}>
                    <div>
                      <div style={{display:"flex",gap:"4px",marginBottom:"20px"}}>{[1,2,3,4,5].map(s=><StarIcon key={s}/>)}</div>
                      <blockquote className="serif" style={{
                        fontSize:"clamp(18px,2.2vw,26px)",fontWeight:400,lineHeight:1.72,
                        color:tp,fontStyle:"italic",letterSpacing:"-0.01em",
                      }}>"{r.quote}"</blockquote>
                    </div>
                    <div style={{flexShrink:0,textAlign:"right",minWidth:"175px"}}>
                      <div style={{width:"58px",height:"58px",borderRadius:"50%",marginLeft:"auto",marginBottom:"13px",
                        background:"linear-gradient(135deg,#00F2FE22,#4FACFE22)",
                        border:"1px solid rgba(0,242,254,0.28)",
                        display:"flex",alignItems:"center",justifyContent:"center"}}>
                        <span className="serif" style={{fontSize:"22px",color:"#00F2FE",fontWeight:600}}>{r.author.charAt(0)}</span>
                      </div>
                      <div className="serif" style={{fontSize:"15px",fontWeight:600,color:tp,marginBottom:"3px"}}>{r.author}</div>
                      <div className="sans" style={{fontSize:"11px",color:ts,marginBottom:"3px",fontWeight:300}}>{r.role}</div>
                      <div className="sans" style={{fontSize:"11px",color:ts,fontStyle:"italic",fontWeight:300}}>{r.company}</div>
                      <span className="sans" style={{
                        display:"inline-block",marginTop:"12px",
                        fontSize:"8.5px",letterSpacing:"0.2em",fontWeight:700,
                        padding:"4px 12px",borderRadius:"100px",
                        color:"#00F2FE",background:"rgba(0,242,254,0.09)",
                        border:"1px solid rgba(0,242,254,0.22)",
                      }}>{r.industry}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {}
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:"100px",zIndex:2,pointerEvents:"none",background:isDark?"linear-gradient(90deg,#050505,transparent)":"linear-gradient(90deg,#F8F9FC,transparent)"}}/>
            <div style={{position:"absolute",right:0,top:0,bottom:0,width:"100px",zIndex:2,pointerEvents:"none",background:isDark?"linear-gradient(270deg,#050505,transparent)":"linear-gradient(270deg,#F8F9FC,transparent)"}}/>
            <div className="marquee-row" style={{gap:"18px",padding:"6px 0"}}>
              {[...REVIEWS.slice(1),...REVIEWS.slice(1)].map((r,idx)=>(
                <div key={`${r.id}-${idx}`} className="lift" style={{flexShrink:0,width:"370px",borderRadius:"18px",padding:"26px 30px",background:isDark?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.88)",border:`1px solid ${isDark?"rgba(255,255,255,0.055)":"rgba(0,0,0,0.07)"}`,backdropFilter:"blur(20px)",boxShadow:isDark?"0 8px 36px rgba(0,0,0,0.45)":"0 6px 24px rgba(0,0,0,0.07)",cursor:"default",}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"}}>
                    <div style={{display:"flex",gap:"3px"}}>
                      {[1,2,3,4,5].map(s=><StarIcon key={s} color={r.accentColor}/>)}
                    </div>
                    <span className="sans" style={{
                      fontSize:"8px",letterSpacing:"0.2em",fontWeight:700,
                      padding:"3px 10px",borderRadius:"100px",
                      color:r.accentColor,background:`${r.accentColor}15`,
                      border:`1px solid ${r.accentColor}30`,
                    }}>{r.industry}</span>
                  </div>
                  <blockquote className="serif" style={{
                    fontSize:"13.5px",lineHeight:1.8,
                    color:isDark?tp:"#1A202C",fontStyle:"italic",marginBottom:"18px",letterSpacing:"-0.005em",
                  }}>"{r.quote}"</blockquote>
                  <div style={{display:"flex",alignItems:"center",gap:"12px",paddingTop:"14px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)"}`}}>
                    <div style={{width:"34px",height:"34px",borderRadius:"50%",flexShrink:0,
                      background:`linear-gradient(135deg,${r.accentColor}22,${r.accentColor}08)`,
                      border:`1px solid ${r.accentColor}33`,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span className="serif" style={{fontSize:"13px",color:r.accentColor,fontWeight:600}}>{r.author.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="serif" style={{fontSize:"13px",fontWeight:600,color:tp,lineHeight:1.2}}>{r.author}</div>
                      <div className="sans" style={{fontSize:"10px",color:ts,marginTop:"2px",fontWeight:300}}>{r.role} · {r.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            TRUSTED BY STRIP
        ════════════════════════════════════════════════════════════════════ */}
        <section style={{padding:"44px 28px",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.01)":"rgba(0,0,0,0.012)"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",gap:"52px",flexWrap:"wrap"}}>
            <p className="sans" style={{fontSize:"9.5px",letterSpacing:"0.22em",color:ts,fontWeight:500}}>DEPLOYED ACROSS</p>
            {["LUXURY AUTO","ENTERPRISE TECH","CINEMATIC STUDIOS","GLOBAL BROADCAST","PREMIUM FASHION","FINANCIAL SERVICES","SPORTS CAMPAIGNS","HAUTE COUTURE","DOCUMENTARY & MEDIA"].map(b=>(
              <div key={b} className="sans" style={{
                fontSize:"10.5px",letterSpacing:"0.24em",fontWeight:600,
                color:isDark?"rgba(255,255,255,0.14)":"rgba(0,0,0,0.22)",
                whiteSpace:"nowrap",
              }}>{b}</div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════════
            FOOTER
        ════════════════════════════════════════════════════════════════════ */}
        <footer style={{padding:"68px 28px 44px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"40px",marginBottom:"48px"}}>

            <div style={{maxWidth:"290px"}}>
              <div className="serif" style={{fontSize:"12.5px",fontWeight:600,letterSpacing:"0.22em",color:tp,marginBottom:"14px"}}>
                AURA<span style={{color:"#00F2FE",margin:"0 5px"}}>◆</span>VOCAL STUDIOS
              </div>
              <p className="sans" style={{fontSize:"12px",color:tm,lineHeight:1.78,fontWeight:300}}>
                The definitive voice performance agency for brands that operate at the apex. Eleven categories. One voice. Zero creative attrition. Directed by David Chidera Nwaibe.
              </p>
            </div>

            <div style={{display:"flex",gap:"60px"}}>
              <div>
                <div className="sans" style={{fontSize:"9.5px",letterSpacing:"0.24em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>STUDIO</div>
                {["Portfolio","Process","Rates","About"].map(l=>(
                  <div key={l} style={{marginBottom:"11px"}}>
                    <a
                      href="#"
                      onClick={l==="About"?e=>{e.preventDefault();setShowAbout(true);}:undefined}
                      className="sans"
                      style={{fontSize:"13px",color:l==="About"?"#00F2FE":tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em",cursor:"pointer"}}
                      onMouseEnter={e=>e.currentTarget.style.color=tp}
                      onMouseLeave={e=>e.currentTarget.style.color=l==="About"?"#00F2FE":tm}>{l}</a>
                  </div>
                ))}
              </div>
              <div>
                <div className="sans" style={{fontSize:"9.5px",letterSpacing:"0.24em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>CONNECT</div>
                <div style={{marginBottom:"11px"}}>
                  <a href="https://calendly.com/d/cyvv-gj7-2n7" target="_blank" rel="noopener noreferrer" className="sans"
                    style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}}
                    onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Book Session</a>
                </div>
                <div style={{marginBottom:"11px"}}>
                  <a href="mailto:concierge@studiohqauravocal.site?subject=Project%20Inquiry%20%E2%80%94%20Aura%20Vocal%20Studios&body=Hello%20David%2C%0A%0AI%20am%20reaching%20out%20regarding%20a%20voice-over%20project%20for%20%5BBrand%2FProject%20Name%5D.%0A%0AProject%20Overview%3A%0A%5BDescribe%20your%20project%20briefly%5D%0A%0ACategory%3A%0A%5BCommercial%20%2F%20Documentary%20%2F%20Enterprise%20%2F%20Character%20%2F%20Other%5D%0A%0ADeadline%3A%0A%5BYour%20required%20delivery%20date%5D%0A%0ABudget%20Range%3A%0A%5BYour%20budget%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BCompany%2FOrganisation%5D" className="sans"
                    style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}}
                    onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Direct Line</a>
                </div>
                <div style={{marginBottom:"11px"}}>
                  <a href="#" className="sans"
                    style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}}
                    onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Press Kit</a>
                </div>
                <div style={{marginBottom:"11px"}}>
                  <a href="#" className="sans"
                    style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}}
                    onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Partnerships</a>
                </div>
                <div style={{marginBottom:"11px",marginTop:"4px"}}>
                  <a href="#upwork-link-placeholder" target="_blank" rel="noopener noreferrer" className="sans" style={{fontSize:"13px",color:"#14A800",textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em",display:"inline-flex",alignItems:"center",gap:"6px"}}
                    onMouseEnter={e=>e.currentTarget.style.opacity="0.8"}
                    onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                    <UpworkIcon/> Upwork
                  </a>
                </div>
              </div>
            </div>

            <div>
              <div className="sans" style={{fontSize:"9.5px",letterSpacing:"0.24em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>FOLLOW</div>
              <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                {[{icon:<IgIcon/>,label:"Instagram",href:"https://www.instagram.com/hqauravocalstudios?igsh=MXhmZ3hqZTkzN2VueQ=="},{icon:<TwIcon/>,label:"Twitter / X",href:"https://x.com/hqauravocals"},{icon:<LiIcon/>,label:"LinkedIn"}].map((item)=>(
                  <a key={item.label} href={item.href||"#"} target={item.href?"_blank":"_self"} rel="noopener noreferrer" className="sans" style={{
                    display:"inline-flex",alignItems:"center",gap:"10px",
                    fontSize:"12px",color:tm,textDecoration:"none",transition:"color 0.2s ease",
                  }}
                    onMouseEnter={e=>e.currentTarget.style.color="#00F2FE"}
                    onMouseLeave={e=>e.currentTarget.style.color=tm}>
                    {item.icon}{item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div style={{paddingTop:"26px",borderTop:`1px solid ${border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"14px"}}>
            <p className="sans" style={{fontSize:"11px",color:isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.3)",letterSpacing:"0.06em",fontWeight:300}}>
              © {new Date().getFullYear()} Aura Vocal Studios · David Chidera Nwaibe · All rights reserved.
            </p>
            <div style={{display:"flex",gap:"24px"}}>
              {["Privacy","Terms","Cookies"].map(l=>(
                <a key={l} href="#" className="sans" style={{
                  fontSize:"11px",textDecoration:"none",letterSpacing:"0.06em",
                  color:isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.3)",
                  transition:"color 0.2s ease",fontWeight:300,
                }}
                  onMouseEnter={e=>e.currentTarget.style.color=tp}
                  onMouseLeave={e=>e.currentTarget.style.color=isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.3)"}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

        {/* ════════════════════════════════════════════════════════════════════
            ABOUT MODAL
        ════════════════════════════════════════════════════════════════════ */}
        {showAbout && (
          <div
            onClick={()=>setShowAbout(false)}
            style={{
              position:"fixed",inset:0,zIndex:500,
              background:"rgba(0,0,0,0.82)",
              backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",
              display:"flex",alignItems:"center",justifyContent:"center",
              padding:"24px",
            }}>
            <div
              onClick={e=>e.stopPropagation()}
              style={{
                maxWidth:"680px",width:"100%",borderRadius:"24px",
                padding:"52px 52px 44px",
                background:isDark
                  ?"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))"
                  :"rgba(255,255,255,0.97)",
                border:`1px solid ${isDark?"rgba(0,242,254,0.14)":"rgba(0,0,0,0.08)"}`,
                backdropFilter:"blur(32px)",
                boxShadow:isDark?"0 32px 80px rgba(0,0,0,0.7)":"0 24px 64px rgba(0,0,0,0.12)",
                position:"relative",
              }}>
              {/* Close */}
              <button
                onClick={()=>setShowAbout(false)}
                style={{
                  position:"absolute",top:"20px",right:"22px",
                  background:"transparent",border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
                  borderRadius:"50%",width:"32px",height:"32px",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:isDark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",
                  cursor:"pointer",fontSize:"16px",lineHeight:1,
                  transition:"all 0.2s ease",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE";e.currentTarget.style.color="#00F2FE";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)";e.currentTarget.style.color=isDark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)";}}>
                ✕
              </button>

              {/* Eyebrow */}
              <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"20px"}}>
                ABOUT AURA VOCAL STUDIOS
              </div>

              {/* Heading */}
              <h2 className="serif" style={{
                fontSize:"clamp(26px,3.5vw,38px)",fontWeight:700,
                color:isDark?"#FFFFFF":"#0A0A0F",lineHeight:1.12,
                letterSpacing:"-0.02em",marginBottom:"28px",
              }}>
                Not a Voice Agency.<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:isDark?"rgba(255,255,255,0.48)":"rgba(10,10,15,0.4)"}}>A Commercial Infrastructure.</span>
              </h2>

              {/* Body */}
              <div className="sans" style={{fontSize:"14px",lineHeight:1.82,color:isDark?"#8B9CC0":"#374151",fontWeight:300}}>
                <p style={{marginBottom:"20px"}}>
                  Aura Vocal Studios is the world's premier single-source voice performance agency — founded and directed by <span style={{color:isDark?"#FFFFFF":"#0A0A0F",fontWeight:500}}>David Chidera Nwaibe</span>. Built not as a marketplace, not as a platform, but as a precision instrument deployed by global enterprises, cinematic studios, and category-defining brands when the brief demands absolute authority.
                </p>
                <p style={{marginBottom:"20px"}}>
                  Where most agencies introduce casting variables, coordination overhead, and creative attrition, Aura operates on a fundamentally different model: one voice, total command, zero friction. Every campaign brief ends in a first-pass final. Every file delivered broadcast-ready. Every read calibrated to the exact cultural and commercial register the brand requires.
                </p>
                <p style={{marginBottom:"28px"}}>
                  Eleven distinct performance categories. Sub-48-hour delivery. Remote directed sessions available globally via Source-Connect. WAV and MP3 delivery cleared for worldwide distribution. This is not a service — it is a standard.
                </p>
              </div>

              {/* Stats row */}
              <div style={{display:"flex",gap:"32px",paddingTop:"24px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"}`,flexWrap:"wrap"}}>
                {[["11","Performance Categories"],["<48H","Delivery Standard"],["Zero","Revision Rate"],["Global","Territorial Clearance"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="serif" style={{fontSize:"24px",fontWeight:700,color:isDark?"#FFFFFF":"#0A0A0F",lineHeight:1,letterSpacing:"-0.02em"}}>{n}</div>
                    <div className="sans" style={{fontSize:"10px",color:isDark?"#475569":"#6B7280",marginTop:"5px",letterSpacing:"0.09em",fontWeight:500,textTransform:"uppercase"}}>{l}</div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div style={{display:"flex",gap:"12px",marginTop:"32px",flexWrap:"wrap"}}>
                <a
                  href="https://calendly.com/d/cyvv-gj7-2n7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sans shimmer-btn"
                  style={{
                    padding:"12px 28px",borderRadius:"100px",
                    color:"#000",fontWeight:700,fontSize:"12px",
                    letterSpacing:"0.07em",textDecoration:"none",
                    boxShadow:"0 0 28px rgba(0,242,254,0.35)",
                    transition:"transform 0.3s ease,box-shadow 0.3s ease",display:"inline-block",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 0 44px rgba(0,242,254,0.6)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 28px rgba(0,242,254,0.35)";}}>
                  Commission a Session
                </a>
                <a
                  href={`mailto:concierge@studiohqauravocal.site?subject=Project%20Inquiry%20%E2%80%94%20Aura%20Vocal%20Studios&body=Hello%20David%2C%0A%0AI%20am%20reaching%20out%20regarding%20a%20voice-over%20project%20for%20%5BBrand%2FProject%20Name%5D.%0A%0AProject%20Overview%3A%0A%5BDescribe%20your%20project%20briefly%5D%0A%0ACategory%3A%0A%5BCommercial%20%2F%20Documentary%20%2F%20Enterprise%20%2F%20Character%20%2F%20Other%5D%0A%0ADeadline%3A%0A%5BYour%20required%20delivery%20date%5D%0A%0ABudget%20Range%3A%0A%5BYour%20budget%5D%0A%0ALooking%20forward%20to%20hearing%20from%20you.%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BCompany%2FOrganisation%5D`}
                  className="sans"
                  style={{
                    padding:"11px 24px",borderRadius:"100px",
                    border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,
                    background:"transparent",
                    color:isDark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)",
                    fontSize:"12px",letterSpacing:"0.05em",
                    textDecoration:"none",transition:"all 0.3s ease",display:"inline-block",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE50";e.currentTarget.style.color=isDark?"#FFFFFF":"#0A0A0F";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)";e.currentTarget.style.color=isDark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)";}}>
                  Direct Line
                </a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
