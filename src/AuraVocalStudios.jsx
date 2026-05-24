import { useState, useRef, useEffect, useCallback } from "react";

// ─── ASSETS ──────────────────────────────────────────────────────────────────
const PROFILE_IMG = "/profile.jpg";

// ─── ICONS (inline SVG to avoid external deps) ────────────────────────────────
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <polygon points="5,3 19,12 5,21" />
  </svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/>
  </svg>
);
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
  </svg>
);
const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/>
  </svg>
);
const QuoteIcon = () => (
  <svg viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6">
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
    <div className="flex items-center gap-[2px] h-10">
      {Array.from({ length: bars }).map((_, i) => {
        const base = 15 + Math.sin(i * 0.8) * 12 + Math.cos(i * 0.4) * 8;
        return (
          <div
            key={i}
            className="rounded-full transition-all"
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
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl p-5 flex flex-col justify-between group cursor-default ${className}`}
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
        className="absolute -top-8 -right-8 w-48 h-48 rounded-full pointer-events-none blur-3xl"
        style={{
          background: demo.accentSolid + (glowing ? "33" : "11"),
          transition: "background 0.6s ease",
        }}
      />
      {/* Bottom-left counter-glow while playing */}
      {glowing && (
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full pointer-events-none blur-3xl"
          style={{ background: demo.accentSolid + "1A", animation: "pulseGlow 3s ease-in-out infinite" }}
        />
      )}

      {/* ── Top row: tag + title + play button ── */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <span
            className="inline-block text-[9px] tracking-[0.18em] font-semibold px-2 py-0.5 rounded-full mb-2 border"
            style={{
              color: demo.accentSolid,
              borderColor: demo.accentSolid + "44",
              background: demo.accentSolid + "18",
            }}
          >
            {demo.tag}
          </span>
          <h3
            className={`font-bold leading-tight mb-0.5 ${demo.size === "large" ? "text-xl" : "text-base"} ${isDark ? "text-white" : "text-slate-900"}`}
          >
            {demo.title}
          </h3>
          <p className={`text-xs ${isDark ? "text-slate-500" : "text-slate-400"}`}>
            {demo.subtitle}
          </p>
        </div>

        {/* Play / Pause button with neon glow on active */}
        <button
          onClick={onToggle}
          className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: isPlaying
              ? `linear-gradient(135deg, ${demo.accentSolid}, ${demo.accentSolid}cc)`
              : "transparent",
            border: `1.5px solid ${demo.accentSolid}`,
            color: isPlaying ? "#000" : demo.accentSolid,
            boxShadow: isPlaying
              ? `0 0 18px ${demo.accentSolid}88, 0 0 36px ${demo.accentSolid}44`
              : `0 0 0 0 ${demo.accentSolid}00`,
            transition: "all 0.3s ease",
          }}
          aria-label={isPlaying ? "Pause demo" : "Play demo"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
      </div>

      {/* Description — large/medium only */}
      {demo.size !== "small" && (
        <p className={`text-xs leading-relaxed mt-3 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
          {demo.description}
        </p>
      )}

      {/* Waveform visualizer */}
      <div className="mt-3">
        <WaveformVisualizer isPlaying={isPlaying} accent={demo.accentSolid} />
      </div>

      {/* ── Scrubber + timestamps ── */}
      <div className={`mt-2 text-[10px] ${isDark ? "text-slate-500" : "text-slate-400"}`}>
        {/* Clickable / draggable progress bar */}
        <div
          ref={scrubRef}
          onClick={seek}
          className="relative w-full cursor-pointer group/scrub"
          style={{ height: "14px", display: "flex", alignItems: "center" }}
          role="slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          aria-label="Seek"
        >
          {/* Track */}
          <div
            className="w-full rounded-full"
            style={{
              height: "3px",
              background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.1)",
              position: "relative",
              overflow: "visible",
            }}
          >
            {/* Filled portion */}
            <div
              className="absolute left-0 top-0 h-full rounded-full"
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
              className="absolute top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover/scrub:opacity-100"
              style={{
                left: `calc(${progress}% - 5px)`,
                width: "10px",
                height: "10px",
                background: demo.accentSolid,
                boxShadow: `0 0 8px ${demo.accentSolid}`,
                transition: "left 0.25s linear, opacity 0.2s",
              }}
            />
          </div>
        </div>

        {/* Time stamps */}
        <div className="flex justify-between mt-1 select-none" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <span>{fmt(currentTime)}</span>
          <span>{duration ? fmt(duration) : "--:--"}</span>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function AuraVocalStudios() {
  const [isDark, setIsDark] = useState(true);
  const [playingId, setPlayingId] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleToggle = useCallback((id) => {
    setPlayingId((prev) => (prev === id ? null : id));
  }, []);

  // ── Derived styles ──────────────────────────────────────────────────────────
  const bg = isDark ? "#050505" : "#FAFAFA";
  const navGlass = isDark
    ? `rgba(5,5,5,${scrolled ? "0.92" : "0.6"})`
    : `rgba(250,250,250,${scrolled ? "0.94" : "0.7"})`;
  const textPrimary = isDark ? "#FFFFFF" : "#0F172A";
  const textMuted = isDark ? "#94A3B8" : "#64748B";
  const borderColor = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";

  return (
    <div style={{ background: bg, color: textPrimary, minHeight: "100vh", fontFamily: "'Cormorant Garamond', Georgia, serif" }}>
      {/* ── CSS Keyframes & Google Fonts ─────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes wave { from { transform: scaleY(1); } to { transform: scaleY(1.8); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes orb1 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(40px,-30px) scale(1.08);} }
        @keyframes orb2 { 0%,100%{transform:translate(0,0) scale(1);} 50%{transform:translate(-30px,40px) scale(1.05);} }
        @keyframes rotateRing { from{transform:rotate(0deg);} to{transform:rotate(360deg);} }
        @keyframes pulseGlow { 0%,100%{opacity:0.5;} 50%{opacity:1;} }
        @keyframes shimmer { 0%{background-position:-200% 0;} 100%{background-position:200% 0;} }
        .fade-up { animation: fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both; }
        .fade-up-1 { animation-delay:0.1s; }
        .fade-up-2 { animation-delay:0.25s; }
        .fade-up-3 { animation-delay:0.42s; }
        .fade-up-4 { animation-delay:0.58s; }
        .sans { font-family:'DM Sans',sans-serif; }
        .serif { font-family:'Cormorant Garamond',Georgia,serif; }
        * { box-sizing:border-box; }
        ::-webkit-scrollbar { width:4px; background:transparent; }
        ::-webkit-scrollbar-thumb { background:rgba(0,242,254,0.3); border-radius:2px; }
        .cta-shimmer {
          background: linear-gradient(90deg, #00F2FE 0%, #4FACFE 40%, #00F2FE 60%, #4FACFE 100%);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee 38s linear infinite; display:flex; width: max-content; }
        .marquee-track:hover { animation-play-state: paused; }
        .review-card-hover { transition: transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease; }
        .review-card-hover:hover { transform: translateY(-4px); }
      `}</style>

      {/* ── BACKGROUND ORBS ──────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        <div style={{
          position:"absolute", top:"-20%", left:"-15%",
          width:"60vw", height:"60vw", borderRadius:"50%",
          background: isDark ? "radial-gradient(circle,#00F2FE08 0%,transparent 70%)" : "radial-gradient(circle,#6366F110 0%,transparent 70%)",
          animation:"orb1 18s ease-in-out infinite",
        }}/>
        <div style={{
          position:"absolute", bottom:"-20%", right:"-10%",
          width:"50vw", height:"50vw", borderRadius:"50%",
          background: isDark ? "radial-gradient(circle,#4FACFE06 0%,transparent 70%)" : "radial-gradient(circle,#818CF810 0%,transparent 70%)",
          animation:"orb2 22s ease-in-out infinite",
        }}/>
        {/* Grain overlay */}
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: isDark ? 0.6 : 0.3,
        }}/>
      </div>

      <div style={{ position:"relative", zIndex:1 }}>

        {/* ══════════════════════════════════════════════════════════════
            NAVIGATION
        ══════════════════════════════════════════════════════════════ */}
        <nav style={{
          position:"fixed", top:0, left:0, right:0, zIndex:100,
          backdropFilter:"blur(24px) saturate(180%)",
          WebkitBackdropFilter:"blur(24px) saturate(180%)",
          background: navGlass,
          borderBottom: `1px solid ${borderColor}`,
          transition:"background 0.4s ease, box-shadow 0.4s ease",
          boxShadow: scrolled ? (isDark ? "0 4px 32px rgba(0,0,0,0.6)" : "0 4px 24px rgba(0,0,0,0.08)") : "none",
        }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 24px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>

            {/* Logo */}
            <div className="serif" style={{ letterSpacing:"0.14em", fontSize:"13px", fontWeight:600, color: textPrimary }}>
              AURA<span style={{ color:"#00F2FE", margin:"0 4px" }}>◆</span>VOCAL STUDIOS
            </div>

            {/* Right */}
            <div style={{ display:"flex", alignItems:"center", gap:"16px" }}>

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDark(!isDark)}
                className="sans"
                style={{
                  display:"flex", alignItems:"center", gap:"6px",
                  padding:"6px 14px", borderRadius:"100px",
                  border: `1px solid ${borderColor}`,
                  background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
                  color: textMuted, fontSize:"12px", cursor:"pointer",
                  transition:"all 0.3s ease",
                }}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
                <span style={{ letterSpacing:"0.04em" }}>{isDark ? "Light" : "Dark"}</span>
              </button>

              {/* CTA */}
              <a
                href="#"
                className="sans cta-shimmer"
                style={{
                  padding:"8px 20px", borderRadius:"100px",
                  color:"#000", fontWeight:600, fontSize:"12px",
                  letterSpacing:"0.06em", textDecoration:"none",
                  transition:"transform 0.3s ease, box-shadow 0.3s ease",
                  boxShadow:"0 0 24px rgba(0,242,254,0.35)",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 0 36px rgba(0,242,254,0.55)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 0 24px rgba(0,242,254,0.35)"; }}
              >
                Request Session
              </a>
            </div>
          </div>
        </nav>

        {/* ══════════════════════════════════════════════════════════════
            HERO
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ paddingTop:"160px", paddingBottom:"120px", paddingLeft:"24px", paddingRight:"24px", maxWidth:"1280px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"80px", alignItems:"center" }}>

            {/* Left: Text */}
            <div>
              {/* Eyebrow */}
              <div className="sans fade-up fade-up-1" style={{ display:"inline-flex", alignItems:"center", gap:"8px", marginBottom:"28px" }}>
                <div style={{ width:"32px", height:"1px", background:"linear-gradient(90deg,#00F2FE,transparent)" }}/>
                <span style={{ fontSize:"10px", letterSpacing:"0.24em", color:"#00F2FE", fontWeight:500 }}>
                  ELITE VOICE-OVER AGENCY
                </span>
              </div>

              {/* Main headline */}
              <h1 className="serif fade-up fade-up-2" style={{
                fontSize:"clamp(40px,6vw,80px)", fontWeight:700, lineHeight:1.08,
                letterSpacing:"-0.01em", marginBottom:"28px", color: textPrimary,
              }}>
                The Sonic Identity<br/>
                <span style={{ fontStyle:"italic", fontWeight:300, color: isDark ? "rgba(255,255,255,0.55)" : "rgba(15,23,42,0.45)" }}>
                  of the World's
                </span>
                <br/>Elite Brands.
              </h1>

              {/* Subheadline */}
              <p className="sans fade-up fade-up-3" style={{
                fontSize:"15px", lineHeight:1.75, color: textMuted, maxWidth:"520px",
                marginBottom:"44px", fontWeight:300,
              }}>
                A rare instrument — honed over eight years at the crossroads of cinematic storytelling and corporate command. <span style={{ color: textPrimary, fontWeight:500 }}>David Chidera Nwaibe</span> is the voice behind campaigns that don't just speak — they resonate, convert, and endure.
              </p>

              {/* CTAs */}
              <div className="fade-up fade-up-4" style={{ display:"flex", alignItems:"center", gap:"16px", flexWrap:"wrap" }}>
                {/* Primary CTA */}
                <a
                  href="https://calendly.com/dcn-automations-meeting"
                  className="sans cta-shimmer"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    padding:"14px 32px", borderRadius:"100px",
                    color:"#000", fontWeight:600, fontSize:"13px",
                    letterSpacing:"0.08em", textDecoration:"none",
                    boxShadow:"0 0 40px rgba(0,242,254,0.3)",
                    transition:"transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform="scale(1.04)"; e.currentTarget.style.boxShadow="0 0 56px rgba(0,242,254,0.5)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform="scale(1)"; e.currentTarget.style.boxShadow="0 0 40px rgba(0,242,254,0.3)"; }}
                >
                  Book a Session
                  <ExternalLinkIcon />
                </a>

                {/* Secondary CTA */}
                <a
                  href="mailto:auravocal.studio777@gmail.com"
                  className="sans"
                  style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    padding:"13px 28px", borderRadius:"100px",
                    border:`1px solid ${borderColor}`,
                    background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                    color: textMuted, fontSize:"13px", letterSpacing:"0.06em",
                    textDecoration:"none", transition:"all 0.3s ease",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="#00F2FE44"; e.currentTarget.style.color=textPrimary; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=borderColor; e.currentTarget.style.color=textMuted; }}
                >
                  <MailIcon />
                  Direct Line
                </a>
              </div>

              {/* Stats row */}
              <div className="fade-up fade-up-4" style={{ display:"flex", gap:"40px", marginTop:"60px", paddingTop:"40px", borderTop:`1px solid ${borderColor}` }}>
                {[["100%","Single-Source Infrastructure"],["<48H","Sonic Core Turnaround"],["Global","Enterprise Distribution"]].map(([num,label]) => (
                  <div key={label}>
                    <div className="serif" style={{ fontSize:"28px", fontWeight:700, color: textPrimary, lineHeight:1 }}>{num}</div>
                    <div className="sans" style={{ fontSize:"11px", color: textMuted, marginTop:"4px", letterSpacing:"0.06em" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Profile visual */}
            <div style={{ position:"relative", flexShrink:0, width:"280px", height:"280px" }}>
              {/* Rotating ring */}
              <div style={{
                position:"absolute", inset:"-20px",
                border:"1px dashed rgba(0,242,254,0.2)",
                borderRadius:"50%",
                animation:"rotateRing 24s linear infinite",
              }}>
                <div style={{ position:"absolute", top:"-4px", left:"50%", transform:"translateX(-50%)", width:"8px", height:"8px", borderRadius:"50%", background:"#00F2FE", boxShadow:"0 0 12px #00F2FE" }}/>
              </div>
              <div style={{
                position:"absolute", inset:"-40px",
                border:"1px dashed rgba(79,172,254,0.1)",
                borderRadius:"50%",
                animation:"rotateRing 36s linear infinite reverse",
              }}/>

              {/* Glow backdrop */}
              <div style={{
                position:"absolute", inset:0, borderRadius:"50%",
                background:"radial-gradient(circle,rgba(0,242,254,0.12) 0%,transparent 70%)",
                animation:"pulseGlow 4s ease-in-out infinite",
              }}/>

              {/* Profile circle */}
              <div style={{
                position:"absolute", inset:0, borderRadius:"50%",
                background: isDark ? "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))" : "linear-gradient(135deg,rgba(99,102,241,0.08),rgba(99,102,241,0.02))",
                backdropFilter:"blur(12px)",
                border:`1px solid ${borderColor}`,
                display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center",
                overflow:"hidden",
              }}>
                {/* Placeholder avatar */}
                <img src={PROFILE_IMG} alt="David Chidera Nwaibe"
                  style={{ width:"100%", height:"100%", objectFit:"cover", borderRadius:"50%", position:"absolute", inset:0 }} />

              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            MASTERS COLLECTION — BENTO GRID
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ padding:"0 24px 120px", maxWidth:"1280px", margin:"0 auto" }}>

          {/* Section header */}
          <div style={{ marginBottom:"56px" }}>
            <div className="sans" style={{ display:"inline-flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
              <div style={{ width:"24px", height:"1px", background:"linear-gradient(90deg,#00F2FE,transparent)" }}/>
              <span style={{ fontSize:"10px", letterSpacing:"0.24em", color:"#00F2FE", fontWeight:500 }}>THE MASTERS COLLECTION</span>
            </div>
            <h2 className="serif" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:700, color: textPrimary, lineHeight:1.15 }}>
              Five Signature<br/>
              <span style={{ fontStyle:"italic", fontWeight:300, color: textMuted }}>Performance Demos</span>
            </h2>
          </div>

          {/* Bento Grid — asymmetric 6-card layout */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(12,1fr)", gap:"16px" }}>

            {/* Row 1: Demo 1 large (7 cols) + Demo 2 + Demo 3 stacked (5 cols) */}
            <div style={{ gridColumn:"span 7" }}>
              <DemoCard
                demo={DEMOS[0]}
                isPlaying={playingId === DEMOS[0].id}
                onToggle={() => handleToggle(DEMOS[0].id)}
                isDark={isDark}
                className="h-full"
              />
            </div>
            <div style={{ gridColumn:"span 5", display:"flex", flexDirection:"column", gap:"16px" }}>
              <DemoCard
                demo={DEMOS[1]}
                isPlaying={playingId === DEMOS[1].id}
                onToggle={() => handleToggle(DEMOS[1].id)}
                isDark={isDark}
              />
              <DemoCard
                demo={DEMOS[2]}
                isPlaying={playingId === DEMOS[2].id}
                onToggle={() => handleToggle(DEMOS[2].id)}
                isDark={isDark}
              />
            </div>

            {/* Row 2: Demo 4 (4 cols) + Demo 5 (4 cols) + Demo 6 large (4 cols) */}
            <div style={{ gridColumn:"span 4" }}>
              <DemoCard
                demo={DEMOS[3]}
                isPlaying={playingId === DEMOS[3].id}
                onToggle={() => handleToggle(DEMOS[3].id)}
                isDark={isDark}
                className="h-full"
              />
            </div>
            <div style={{ gridColumn:"span 4" }}>
              <DemoCard
                demo={DEMOS[4]}
                isPlaying={playingId === DEMOS[4].id}
                onToggle={() => handleToggle(DEMOS[4].id)}
                isDark={isDark}
                className="h-full"
              />
            </div>
            <div style={{ gridColumn:"span 4" }}>
              <DemoCard
                demo={DEMOS[5]}
                isPlaying={playingId === DEMOS[5].id}
                onToggle={() => handleToggle(DEMOS[5].id)}
                isDark={isDark}
                className="h-full"
              />
            </div>
          </div>

          {/* Note */}
          <p className="sans" style={{ marginTop:"24px", textAlign:"center", fontSize:"11px", color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)", letterSpacing:"0.06em" }}>
            Audio files to be connected · Waveforms are live visualizer placeholders
          </p>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            CLIENT REVIEWS — INFINITE MARQUEE
        ══════════════════════════════════════════════════════════════ */}
        <section style={{ padding:"0 0 120px", overflow:"hidden" }}>

          {/* Section header — padded */}
          <div style={{ maxWidth:"1280px", margin:"0 auto", padding:"0 24px 56px" }}>
            <div className="sans" style={{ display:"inline-flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
              <div style={{ width:"24px", height:"1px", background:"linear-gradient(90deg,#00F2FE,transparent)" }}/>
              <span style={{ fontSize:"10px", letterSpacing:"0.24em", color:"#00F2FE", fontWeight:500 }}>CLIENT TESTIMONIALS</span>
            </div>
            <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", flexWrap:"wrap", gap:"24px" }}>
              <h2 className="serif" style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:700, color: textPrimary, lineHeight:1.15, margin:0 }}>
                Voices That Move<br/>
                <span style={{ fontStyle:"italic", fontWeight:300, color: textMuted }}>Industries Forward</span>
              </h2>
              <div className="sans" style={{ display:"flex", alignItems:"center", gap:"6px" }}>
                {[1,2,3,4,5].map(s => <StarIcon key={s} style={{ color:"#00F2FE" }}/>)}
                <span style={{ fontSize:"12px", color: textMuted, marginLeft:"6px" }}>5.0 · 200+ engagements</span>
              </div>
            </div>
          </div>

          {/* Featured review — full width */}
          {(() => {
            const r = REVIEWS[0];
            return (
              <div style={{ maxWidth:"1280px", margin:"0 auto 32px", padding:"0 24px" }}>
                <div
                  className="review-card-hover"
                  style={{
                    position:"relative", overflow:"hidden",
                    borderRadius:"20px", padding:"48px 56px",
                    background: isDark
                      ? "linear-gradient(135deg,rgba(0,242,254,0.04) 0%,rgba(255,255,255,0.015) 100%)"
                      : "linear-gradient(135deg,rgba(99,102,241,0.06) 0%,rgba(255,255,255,0.8) 100%)",
                    border:`1px solid ${isDark ? "rgba(0,242,254,0.12)" : "rgba(99,102,241,0.15)"}`,
                    backdropFilter:"blur(20px)",
                    boxShadow: isDark ? "0 24px 64px rgba(0,0,0,0.4)" : "0 16px 48px rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Background quote mark */}
                  <div style={{ position:"absolute", top:"24px", right:"40px", opacity:0.06, transform:"scale(6)", transformOrigin:"top right", color:"#00F2FE" }}>
                    <QuoteIcon />
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"1fr auto", gap:"48px", alignItems:"center" }}>
                    <div>
                      <div style={{ display:"flex", gap:"4px", marginBottom:"20px" }}>
                        {[1,2,3,4,5].map(s => <StarIcon key={s} style={{ color:"#00F2FE" }}/>)}
                      </div>
                      <blockquote className="serif" style={{
                        fontSize:"clamp(18px,2.2vw,26px)", fontWeight:400,
                        lineHeight:1.6, color: textPrimary, margin:0,
                        fontStyle:"italic",
                      }}>
                        "{r.quote}"
                      </blockquote>
                    </div>
                    <div style={{ flexShrink:0, textAlign:"right", minWidth:"180px" }}>
                      <div style={{
                        width:"56px", height:"56px", borderRadius:"50%", marginLeft:"auto", marginBottom:"14px",
                        background:"linear-gradient(135deg,#00F2FE22,#4FACFE22)",
                        border:"1px solid rgba(0,242,254,0.25)",
                        display:"flex", alignItems:"center", justifyContent:"center",
                      }}>
                        <span className="serif" style={{ fontSize:"20px", color:"#00F2FE", fontWeight:600 }}>
                          {r.author.charAt(0)}
                        </span>
                      </div>
                      <div className="serif" style={{ fontSize:"15px", fontWeight:600, color: textPrimary, marginBottom:"2px" }}>{r.author}</div>
                      <div className="sans" style={{ fontSize:"11px", color: textMuted, marginBottom:"4px" }}>{r.role}</div>
                      <div className="sans" style={{ fontSize:"11px", color: textMuted, fontStyle:"italic" }}>{r.company}</div>
                      <span className="sans" style={{
                        display:"inline-block", marginTop:"10px",
                        fontSize:"9px", letterSpacing:"0.16em", fontWeight:600,
                        padding:"3px 10px", borderRadius:"100px",
                        color:"#00F2FE", background:"rgba(0,242,254,0.08)",
                        border:"1px solid rgba(0,242,254,0.2)",
                      }}>{r.industry}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Scrolling marquee of remaining reviews */}
          <div style={{ position:"relative" }}>
            {/* Edge fade — left */}
            <div style={{
              position:"absolute", left:0, top:0, bottom:0, width:"120px", zIndex:2, pointerEvents:"none",
              background: isDark
                ? "linear-gradient(90deg,#050505,transparent)"
                : "linear-gradient(90deg,#FAFAFA,transparent)",
            }}/>
            {/* Edge fade — right */}
            <div style={{
              position:"absolute", right:0, top:0, bottom:0, width:"120px", zIndex:2, pointerEvents:"none",
              background: isDark
                ? "linear-gradient(270deg,#050505,transparent)"
                : "linear-gradient(270deg,#FAFAFA,transparent)",
            }}/>

            <div className="marquee-track" style={{ gap:"20px", padding:"8px 0" }}>
              {/* Render twice for seamless loop */}
              {[...REVIEWS.slice(1), ...REVIEWS.slice(1)].map((r, idx) => (
                <div
                  key={`${r.id}-${idx}`}
                  className="review-card-hover"
                  style={{
                    flexShrink:0, width:"380px",
                    borderRadius:"16px", padding:"28px 32px",
                    background: isDark
                      ? "rgba(255,255,255,0.025)"
                      : "rgba(255,255,255,0.85)",
                    border:`1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)"}`,
                    backdropFilter:"blur(16px)",
                    boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.4)" : "0 8px 24px rgba(0,0,0,0.06)",
                    cursor:"default",
                  }}
                >
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"16px" }}>
                    <div style={{ display:"flex", gap:"3px" }}>
                      {[1,2,3,4,5].map(s => <StarIcon key={s} style={{ color: r.accentColor }}/>)}
                    </div>
                    <span className="sans" style={{
                      fontSize:"8px", letterSpacing:"0.16em", fontWeight:600,
                      padding:"3px 8px", borderRadius:"100px",
                      color: r.accentColor,
                      background: r.accentColor + "15",
                      border:`1px solid ${r.accentColor}30`,
                    }}>{r.industry}</span>
                  </div>

                  <blockquote className="serif" style={{
                    fontSize:"14px", lineHeight:1.75,
                    color: textPrimary, margin:"0 0 20px",
                    fontStyle:"italic", fontWeight:400,
                  }}>
                    "{r.quote}"
                  </blockquote>

                  <div style={{ display:"flex", alignItems:"center", gap:"12px", paddingTop:"16px", borderTop:`1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)"}` }}>
                    <div style={{
                      width:"36px", height:"36px", borderRadius:"50%", flexShrink:0,
                      background:`linear-gradient(135deg,${r.accentColor}22,${r.accentColor}08)`,
                      border:`1px solid ${r.accentColor}33`,
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      <span className="serif" style={{ fontSize:"14px", color: r.accentColor, fontWeight:600 }}>
                        {r.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <div className="serif" style={{ fontSize:"13px", fontWeight:600, color: textPrimary, lineHeight:1.2 }}>{r.author}</div>
                      <div className="sans" style={{ fontSize:"10px", color: textMuted, marginTop:"1px" }}>{r.role} · {r.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section style={{
          padding:"48px 24px",
          borderTop:`1px solid ${borderColor}`,
          borderBottom:`1px solid ${borderColor}`,
          background: isDark ? "rgba(255,255,255,0.01)" : "rgba(0,0,0,0.015)",
        }}>
          <div style={{ maxWidth:"1280px", margin:"0 auto", display:"flex", alignItems:"center", justifyContent:"center", gap:"64px", flexWrap:"wrap" }}>
            <p className="sans" style={{ fontSize:"10px", letterSpacing:"0.18em", color: textMuted }}>TRUSTED BY</p>
            {["LUXURY AUTO","ENTERPRISE TECH","CINEMATIC STUDIOS","GLOBAL BROADCAST","PREMIUM FASHION"].map(brand => (
              <div key={brand} className="sans" style={{ fontSize:"11px", letterSpacing:"0.2em", color: isDark ? "rgba(255,255,255,0.18)" : "rgba(0,0,0,0.18)", fontWeight:500, whiteSpace:"nowrap" }}>
                {brand}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            FOOTER
        ══════════════════════════════════════════════════════════════ */}
        <footer style={{ padding:"64px 24px 40px", maxWidth:"1280px", margin:"0 auto" }}>

          {/* Top row */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"40px", marginBottom:"48px" }}>

            {/* Brand */}
            <div>
              <div className="serif" style={{ fontSize:"14px", fontWeight:600, letterSpacing:"0.14em", color: textPrimary, marginBottom:"12px" }}>
                AURA<span style={{ color:"#00F2FE", margin:"0 4px" }}>◆</span>VOCAL STUDIOS
              </div>
              <p className="sans" style={{ fontSize:"12px", color: textMuted, maxWidth:"280px", lineHeight:1.7, fontWeight:300 }}>
                The definitive voice-over atelier for brands that refuse to be ordinary. Directed by David Chidera Nwaibe.
              </p>
            </div>

            {/* Nav links */}
            <div style={{ display:"flex", gap:"64px" }}>
              <div>
                <div className="sans" style={{ fontSize:"10px", letterSpacing:"0.2em", color:"#00F2FE", marginBottom:"16px", fontWeight:500 }}>STUDIO</div>
                {["Portfolio","Process","Rates","About"].map(link => (
                  <div key={link} style={{ marginBottom:"10px" }}>
                    <a href="#" className="sans" style={{ fontSize:"13px", color: textMuted, textDecoration:"none", transition:"color 0.2s ease", letterSpacing:"0.02em" }}
                       onMouseEnter={e => e.currentTarget.style.color=textPrimary}
                       onMouseLeave={e => e.currentTarget.style.color=textMuted}>
                      {link}
                    </a>
                  </div>
                ))}
              </div>
              <div>
                <div className="sans" style={{ fontSize:"10px", letterSpacing:"0.2em", color:"#00F2FE", marginBottom:"16px", fontWeight:500 }}>CONNECT</div>
                {["Book Session","Direct Line","Press Kit","Partnerships"].map(link => (
                  <div key={link} style={{ marginBottom:"10px" }}>
                    <a href="#" className="sans" style={{ fontSize:"13px", color: textMuted, textDecoration:"none", transition:"color 0.2s ease", letterSpacing:"0.02em" }}
                       onMouseEnter={e => e.currentTarget.style.color=textPrimary}
                       onMouseLeave={e => e.currentTarget.style.color=textMuted}>
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div>
              <div className="sans" style={{ fontSize:"10px", letterSpacing:"0.2em", color:"#00F2FE", marginBottom:"16px", fontWeight:500 }}>FOLLOW</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
                {[
                  { icon:<InstagramIcon/>, label:"Instagram" },
                  { icon:<TwitterIcon/>, label:"Twitter / X" },
                  { icon:<LinkedInIcon/>, label:"LinkedIn" },
                ].map(({ icon, label }) => (
                  <a key={label} href="#" className="sans" style={{
                    display:"inline-flex", alignItems:"center", gap:"8px",
                    fontSize:"12px", color: textMuted, textDecoration:"none",
                    transition:"color 0.2s ease",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color="#00F2FE"}
                  onMouseLeave={e => e.currentTarget.style.color=textMuted}>
                    {icon}{label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ paddingTop:"24px", borderTop:`1px solid ${borderColor}`, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"16px" }}>
            <p className="sans" style={{ fontSize:"11px", color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.3)", letterSpacing:"0.06em" }}>
              © {new Date().getFullYear()} Aura Vocal Studios · David Chidera Nwaibe · All rights reserved.
            </p>
            <div style={{ display:"flex", gap:"24px" }}>
              {["Privacy","Terms","Cookies"].map(link => (
                <a key={link} href="#" className="sans" style={{ fontSize:"11px", color: isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.3)", textDecoration:"none", letterSpacing:"0.06em", transition:"color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color=textPrimary}
                  onMouseLeave={e => e.currentTarget.style.color= isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.3)"}>
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
