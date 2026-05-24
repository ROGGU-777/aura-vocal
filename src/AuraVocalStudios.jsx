import { useState, useRef, useEffect, useCallback } from "react";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
const PROFILE_IMG = "/profile.jpg";

// ─── ICONS (inline SVG to avoid external deps) ────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"20px",height:"20px"}}>
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"20px",height:"20px"}}>
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"16px",height:"16px"}}>
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{width:"16px",height:"16px"}}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"16px",height:"16px"}}>
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"16px",height:"16px"}}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"16px",height:"16px"}}>
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{width:"16px",height:"16px"}}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{width:"14px",height:"14px"}}>
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const QuoteIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" style={{width:"24px",height:"24px"}}>
    <path d="M10 8C6.686 8 4 10.686 4 14v10h10V14H7.5c0-1.38 1.12-2.5 2.5-2.5V8zm14 0c-3.314 0-6 2.686-6 6v10h10V14h-6.5c0-1.38 1.12-2.5 2.5-2.5V8z"/>
  </svg>
);
const StarIcon = () => (
  <svg viewBox="0 0 20 20" fill="currentColor" style={{ width:"12px", height:"12px" }}>
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
  </svg>
);

// ─── WAVEFORM VISUALIZER ───────────────────────────────────────────────────────
const WaveformVisualizer = ({ isPlaying, accent }) => {
  const bars = 32;
  return (
    <div style={{display:"flex",alignItems:"center",gap:"2px",height:"40px"}}>
      {Array.from({ length: bars }).map((_, i) => {
        const base = 15 + Math.sin(i * 0.8) * 12 + Math.cos(i * 0.4) * 8;
        return (
          <div
            key={i}
            style={{borderRadius:"9999px"}}
            style={{
              width: "3px",
              height: isPlaying ? `${base + Math.random() * 18}px` : `${4 + (i % 4) * 2}px`,
              background: accent,
              opacity: isPlaying ? 0.9 : 0.35,
              animation: isPlaying ? `wave ${0.4 + (i % 5) * 0.12}s ease-in-out infinite alternate` : "none",
              animationDelay: `${i * 0.03}s`,
            }}
          />
        );
      })}
    </div>
  );
};

// ─── DEMO DATA ─────────────────────────────────────────────────────────────────
const DEMOS = [
  {
    id: 1,
    title: "Luxury Commercial",
    subtitle: "Global Campaign · Premium Devices",
    tag: "COMMERCIAL",
    tagColor: "#00F2FE",
    accent: "linear-gradient(90deg,#00F2FE,#4FACFE)",
    accentSolid: "#00F2FE",
    description: "Sonic positioning engineered for deep market dominance. Tailored specifically for primary enterprise manifestos, high-ticket VSL infrastructures, and global brand asset deployment where retention dictates capital allocation.",
    size: "large",
    src: "/demos/Track1.mp3",
  },
  {
    id: 2,
    title: "Audiobook Narration",
    subtitle: "Literary Performance · Page to Sound",
    tag: "NARRATION",
    tagColor: "#a78bfa",
    accent: "linear-gradient(90deg,#a78bfa,#7c3aed)",
    accentSolid: "#a78bfa",
    description: "Single-source character rendering across multiple archetypes — no cast, no coordination overhead. The kind of narration that makes listeners forget they're reading and feel like they're living it.",
    size: "medium",
    src: "/demos/Track2.mp3",
  },
  {
    id: 3,
    title: "Podcast Narration",
    subtitle: "True Story · Human Achievement",
    tag: "PODCAST",
    tagColor: "#34d399",
    accent: "linear-gradient(90deg,#34d399,#059669)",
    accentSolid: "#34d399",
    description: "Some stories don't need embellishment — just the right voice to honour them. This narration follows a young individual whose curiosity quietly changed the world around him before most people had finished growing up.",
    size: "medium",
    src: "/demos/Track3.mp3",
  },
  {
    id: 4,
    title: "Enterprise Systems & Tech",
    subtitle: "Corporate · IVR · Global Systems",
    tag: "ENTERPRISE",
    tagColor: "#f59e0b",
    accent: "linear-gradient(90deg,#f59e0b,#d97706)",
    accentSolid: "#f59e0b",
    description: "Precision-calibrated for the boardroom and the automated pipeline alike. Articulate, warm without being casual, authoritative without being cold — the standard Fortune 100 firms set for global voice systems.",
    size: "small",
    src: "/demos/Track4.mp3",
  },
  {
    id: 5,
    title: "Cinematic & Dramatic",
    subtitle: "Character · Trailer · High Stakes",
    tag: "CINEMATIC",
    tagColor: "#f43f5e",
    accent: "linear-gradient(90deg,#f43f5e,#dc2626)",
    accentSolid: "#f43f5e",
    description: "Built for the screen, the stage and the split second before everything changes. From anti-hero monologues to franchise trailers — performances that audiences remember long after the credits roll.",
    size: "small",
    src: "/demos/Track5.mp3",
  },
  {
    id: 6,
    title: "Luxury AD · Gaming",
    subtitle: "Next-Gen · Immersive World · Icon",
    tag: "LUXURY GAMING",
    tagColor: "#818cf8",
    accent: "linear-gradient(90deg,#818cf8,#6366f1)",
    accentSolid: "#818cf8",
    description: "When a console defines a generation, its voice must be equally legendary. This read was crafted for a launch that didn't just sell hardware — it invited the world into an entirely new dimension of play.",
    size: "large",
    src: "/demos/Track6.mp3",
  },
];

// ─── REVIEWS DATA ─────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    quote: "We briefed David on a 90-second luxury automotive spot and he delivered something so authoritative, so immaculately paced, our creative director called it the finest VO work we've ever commissioned. Clients noticed immediately.",
    author: "Isabelle Fontaine",
    role: "Head of Brand Experience",
    company: "Maison Lumière Group",
    industry: "LUXURY FASHION",
    accentColor: "#00F2FE",
    stars: 5,
    featured: true,
  },
  {
    id: 2,
    quote: "We needed authority across 14 markets simultaneously. David recorded the full suite in a single session — clean takes, zero direction. He understands what a brand needs before you finish the brief.",
    author: "Marcus Osei",
    role: "VP of Global Marketing",
    company: "Nexora Technologies",
    industry: "ENTERPRISE TECH",
    accentColor: "#f59e0b",
    stars: 5,
    featured: false,
  },
  {
    id: 3,
    quote: "Twenty years in the industry and David occupies a category entirely his own. The emotional precision he brought to our documentary series was extraordinary — our editor said the rough cut moved her to tears on the first pass.",
    author: "Cynthia Adeyemi",
    role: "Executive Producer",
    company: "Meridian Film Studios",
    industry: "CINEMATIC",
    accentColor: "#f43f5e",
    stars: 5,
    featured: false,
  },
  {
    id: 4,
    quote: "Our podcast went from 40k to 380k monthly listeners within four months. Retention climbed 67%. The audience DMs us asking about 'the voice.' There is no overstating what the right vocal presence does for long-form audio.",
    author: "Jordan Calloway",
    role: "Founder & Host",
    company: "The Architecture of Thought",
    industry: "PODCAST",
    accentColor: "#34d399",
    stars: 5,
    featured: false,
  },
  {
    id: 5,
    quote: "18-hour turnaround on a 3-minute IVR suite. Broadcast-ready, perfectly levelled — clear, warm, professional without sterile. We've retained Aura Vocal Studios on an exclusive annual contract since.",
    author: "Priya Nair",
    role: "Director of Customer Experience",
    company: "Stratos Financial Systems",
    industry: "ENTERPRISE",
    accentColor: "#f59e0b",
    stars: 5,
    featured: false,
  },
  {
    id: 6,
    quote: "We cast David as lead antagonist in our flagship RPG. The range in a single session — cold calculation to raw menace — had our audio team on their feet. Gamers call it 'the best villain voice in a decade.' Highest praise imaginable.",
    author: "Tomás Reyes",
    role: "Audio Director",
    company: "Ironveil Game Studios",
    industry: "CINEMATIC",
    accentColor: "#f43f5e",
    stars: 5,
    featured: false,
  },
];

// ─── FORMAT SECONDS → M:SS ────────────────────────────────────────────────────
const fmt = (s) => {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

// ─── AUDIO DEMO CARD ───────────────────────────────────────────────────────────
// Each card owns its own <audio> element via useRef.
// The parent controls which ID is "active"; this card pauses itself when its
// id !== playingId, and notifies the parent when the user presses play.
const DemoCard = ({ demo, isPlaying, onToggle, isDark, className = "" }) => {
  const audioRef = useRef(null);
  const scrubRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [glowing, setGlowing]         = useState(false);

  // ── Sync play/pause with parent's playingId ────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {}); // catches browser autoplay block gracefully
      setGlowing(true);
    } else {
      audio.pause();
      setGlowing(false);
    }
  }, [isPlaying]);

  // ── Audio event listeners ──────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime  = () => setCurrentTime(audio.currentTime);
    const onMeta  = () => setDuration(audio.duration);
    const onEnded = () => { setCurrentTime(0); onToggle(); }; // auto-stop when done
    audio.addEventListener("timeupdate",        onTime);
    audio.addEventListener("loadedmetadata",    onMeta);
    audio.addEventListener("durationchange",    onMeta);
    audio.addEventListener("ended",             onEnded);
    return () => {
      audio.removeEventListener("timeupdate",     onTime);
      audio.removeEventListener("loadedmetadata", onMeta);
      audio.removeEventListener("durationchange", onMeta);
      audio.removeEventListener("ended",          onEnded);
    };
  }, [onToggle]);

  // ── Scrubber click / drag ──────────────────────────────────────────────────
  const seek = useCallback((e) => {
    const audio = audioRef.current;
    const bar   = scrubRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct  = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = pct * duration;
    setCurrentTime(audio.currentTime);
  }, [duration]);

  const progress = duration ? (currentTime / duration) * 100 : 0;

  // ── Glass styles ──────────────────────────────────────────────────────────
  const cardBg = isDark
    ? "rgba(255,255,255,0.025)"
    : "rgba(255,255,255,0.75)";
  const cardBorder = isPlaying
    ? `${demo.accentSolid}55`
    : isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const cardShadow = isPlaying
    ? `0 0 0 1px ${demo.accentSolid}33, 0 8px 48px ${demo.accentSolid}22, 0 2px 8px rgba(0,0,0,0.4)`
    : isDark
      ? "0 8px 32px rgba(0,0,0,0.5)"
      : "0 8px 32px rgba(0,0,0,0.08)";

  return (
    <div
      style={{...{position:"relative",overflow:"hidden",borderRadius:"16px",backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",padding:"20px",display:"flex",flexDirection:"column",justifyContent:"space-between",cursor:"default"}, ...{minHeight:"160px",background:cardBg,border:`1px solid ${cardBorder}`,boxShadow:cardShadow,transition:"border-color 0.4s ease, box-shadow 0.4s ease"}}}
      style={{
        minHeight: "160px",
        background: cardBg,
        border: `1px solid ${cardBorder}`,
        boxShadow: cardShadow,
        transition: "border-color 0.4s ease, box-shadow 0.4s ease",
      }}
    >
      {/* Hidden HTML5 audio element — the real engine */}
      <audio ref={audioRef} src={demo.src} preload="metadata" />

      {/* Ambient glow orb — intensifies while playing */}
      <div
        style={{position:"absolute",top:"-32px",right:"-32px",width:"192px",height:"192px",borderRadius:"50%",pointerEvents:"none",filter:"blur(40px)"}}
        style={{
          background: demo.accentSolid + (glowing ? "33" : "11"),
          transition: "background 0.6s ease",
        }}
      />
      {/* Bottom-left counter-glow while playing */}
      {glowing && (
        <div
          style={{position:"absolute",bottom:"-40px",left:"-40px",width:"160px",height:"160px",borderRadius:"50%",pointerEvents:"none",filter:"blur(40px)"}}
          style={{ background: demo.accentSolid + "1A", animation: "pulseGlow 3s ease-in-out infinite" }}
        />
      )}

      {/* ── Top row: tag + title + play button ── */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px"}}>
        <div style={{flex:1,minWidth:0}}>
          <span
            style={{display:"inline-block",fontSize:"9px",letterSpacing:"0.18em",fontWeight:600,padding:"2px 8px",borderRadius:"9999px",marginBottom:"8px",border:"1px solid"}}
            style={{
              color: demo.accentSolid,
              borderColor: demo.accentSolid + "44",
              background: demo.accentSolid + "18",
            }}
          >
            {demo.tag}
          </span>
          <h3
            style={{fontWeight:"bold",lineHeight:1.2,marginBottom:"2px",fontSize:demo.size==="large"?"20px":"16px",color:isDark?"#ffffff":"#0f172a"}}
          >
            {demo.title}
          </h3>
          <p style={{fontSize:"12px",color:isDark?"#64748b":"#94a3b8"}}>
            {demo.subtitle}
          </p>
        </div>

        {/* Play / Pause button with neon glow on active */}
        <button
          onClick={onToggle}
          style={{
            flexShrink:0,
            width:"44px",
            height:"44px",
            borderRadius:"50%",
            display:"flex",
            alignItems:"center",
            justifyContent:"center",
            background: isPlaying
              ? `linear-gradient(135deg, ${demo.accentSolid}, ${demo.accentSolid}cc)`
              : "transparent",
            border: `1.5px solid ${demo.accentSolid}`,
            color: isPlaying ? "#000" : demo.accentSolid,
            boxShadow: isPlaying
              ? `0 0 18px ${demo.accentSolid}88, 0 0 36px ${demo.accentSolid}44`
              : "none",
            cursor:"pointer",
            transition:"all 0.3s ease",
          }}
          aria-label={isPlaying ? "Pause demo" : "Play demo"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      {/* Description — large/medium only */}
      {demo.size !== "small" && (
        <p style={{fontSize:"12px",lineHeight:1.6,marginTop:"12px",color:isDark?"#94a3b8":"#64748b"}}>
          {demo.description}
        </p>
      )}

      {/* Waveform visualizer */}
      <div style={{marginTop:"12px"}}>
        <WaveformVisualizer isPlaying={isPlaying} accent={demo.accentSolid} />
      </div>

      {/* ── Scrubber + timestamps ── */}
      <div style={{marginTop:"8px",fontSize:"10px",color:isDark?"#64748b":"#94a3b8",fontFamily:"'DM Sans',sans-serif"}}>
        {/* Clickable / draggable progress bar */}
        <div
          ref={scrubRef}
          onClick={seek}
          style={{position:"relative",width:"100%",cursor:"pointer",height:"14px",display:"flex",alignItems:"center"}}
          style={{ height: "14px", display: "flex", alignItems: "center" }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Seek"
        >
          {/* Track */}
          <div
            style={{width:"100%",borderRadius:"9999px",position:"relative",overflow:"visible",height:"3px",background:isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)"}}
            style={{
              height: "3px",
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Filled portion */}
            <div
              style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:"9999px",width:`${progress}%`,background:isPlaying?`linear-gradient(90deg,${demo.accentSolid},${demo.accentSolid}cc)`:demo.accentSolid+"66",boxShadow:isPlaying?`0 0 8px ${demo.accentSolid}99`:"none",transition:"width 0.25s linear, box-shadow 0.4s ease"}}
              style={{
                width: `${progress}%`,
                background: isPlaying
                  ? `linear-gradient(90deg, ${demo.accentSolid}, ${demo.accentSolid}cc)`
                  : demo.accentSolid + "66",
                boxShadow: isPlaying ? `0 0 8px ${demo.accentSolid}99` : "none",
                transition: "width 0.25s linear, box-shadow 0.4s ease",
              }}
            />
            {/* Thumb dot */}
            <div
              style={{position:"absolute",top:"50%",transform:"translateY(-50%)",borderRadius:"50%",opacity:0.85,left:`calc(${progress}% - 5px)`,width:"10px",height:"10px",background:demo.accentSolid,boxShadow:`0 0 8px ${demo.accentSolid}`,transition:"left 0.25s linear"}}
              style={{
                left: `calc(${progress}% - 5px)`,
                width: "10px",
                height: "10px",
                background: demo.accentSolid,
                boxShadow: `0 0 8px ${demo.accentSolid}`,
                transition: "left 0.25s 
