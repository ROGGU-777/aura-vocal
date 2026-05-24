import { useState, useRef, useEffect, useCallback } from "react";

const PROFILE_IMG = "/profile.jpg";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const I = (w=20,h=20) => ({width:`${w}px`,height:`${h}px`});
const PlayIcon  = () => <svg viewBox="0 0 24 24" fill="currentColor" style={I()}><polygon points="5,3 19,12 5,21"/></svg>;
const PauseIcon = () => <svg viewBox="0 0 24 24" fill="currentColor" style={I()}><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>;
const SunIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={I(16,16)}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>;
const MoonIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={I(16,16)}><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>;
const MailIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={I(16,16)}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="2,4 12,13 22,4"/></svg>;
const LinkIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={I(14,14)}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
const StarIcon  = () => <svg viewBox="0 0 20 20" fill="#00F2FE" style={I(12,12)}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>;
const TwIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" style={I(16,16)}><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const IgIcon    = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={I(16,16)}><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
const LiIcon    = () => <svg viewBox="0 0 24 24" fill="currentColor" style={I(16,16)}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>;
const MicIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={I(22,22)}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>;
const WaveIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={I(22,22)}><path d="M2 12h2l3-8 4 16 3-10 2 4h6"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={I(22,22)}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const GlobeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={I(22,22)}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={I(16,16)}><polyline points="20 6 9 17 4 12"/></svg>;

// ─── WAVEFORM ──────────────────────────────────────────────────────────────────
const Waveform = ({ isPlaying, accent }) => (
  <div style={{display:"flex",alignItems:"center",gap:"2px",height:"36px",overflow:"hidden"}}>
    {Array.from({length:36}).map((_,i) => {
      const h = 4 + Math.abs(Math.sin(i*0.7)*14 + Math.cos(i*0.4)*8);
      return (
        <div key={i} style={{
          width:"2.5px", borderRadius:"9999px",
          height: isPlaying ? `${h + Math.random()*16}px` : `${3+(i%4)*2}px`,
          background: accent, opacity: isPlaying ? 0.9 : 0.3,
          animation: isPlaying ? `wave ${0.38+(i%5)*0.11}s ease-in-out infinite alternate` : "none",
          animationDelay:`${i*0.025}s`, transition:"height 0.3s ease",
        }}/>
      );
    })}
  </div>
);

// ─── DEMOS ─────────────────────────────────────────────────────────────────────
const DEMOS = [
  { id:1, title:"Luxury Commercial", subtitle:"Global Campaign · Premium Devices", tag:"COMMERCIAL", tone:"Authoritative · Polished", accentSolid:"#00F2FE", size:"large", src:"/demos/Track1.mp3",
    description:"Sonic positioning engineered for deep market dominance. Tailored for enterprise manifestos, high-ticket VSL infrastructures, and global brand asset deployment where retention dictates capital allocation." },
  { id:2, title:"Audiobook Narration", subtitle:"Literary Performance · Page to Sound", tag:"NARRATION", tone:"Intimate · Immersive", accentSolid:"#a78bfa", size:"medium", src:"/demos/Track2.mp3",
    description:"Single-source character rendering across multiple archetypes — no cast, no coordination overhead. Narration that makes listeners forget they're reading and feel like they're living it." },
  { id:3, title:"Podcast Narration", subtitle:"True Story · Human Achievement", tag:"PODCAST", tone:"Warm · Resonant", accentSolid:"#34d399", size:"medium", src:"/demos/Track3.mp3",
    description:"Some stories don't need embellishment — just the right voice to honour them. This narration follows a young individual whose curiosity quietly changed the world before most people had finished growing up." },
  { id:4, title:"Enterprise Systems & Tech", subtitle:"Corporate · IVR · Global Systems", tag:"ENTERPRISE", tone:"Clear · Trustworthy", accentSolid:"#f59e0b", size:"small", src:"/demos/Track4.mp3",
    description:"Precision-calibrated for the boardroom and automated pipeline alike. Articulate, warm without casual, authoritative without cold — the standard Fortune 100 firms set for global voice systems." },
  { id:5, title:"Cinematic & Dramatic", subtitle:"Character · Trailer · High Stakes", tag:"CINEMATIC", tone:"Intense · Commanding", accentSolid:"#f43f5e", size:"small", src:"/demos/Track5.mp3",
    description:"Built for the screen and the split second before everything changes. From anti-hero monologues to franchise trailers — performances audiences remember long after the credits roll." },
  { id:6, title:"Luxury AD · Gaming", subtitle:"Next-Gen · Immersive World · Icon", tag:"LUXURY GAMING", tone:"Epic · Legendary", accentSolid:"#818cf8", size:"large", src:"/demos/Track6.mp3",
    description:"When a console defines a generation, its voice must be equally legendary. Crafted for a launch that didn't just sell hardware — it invited the world into an entirely new dimension of play." },
];

const REVIEWS = [
  { id:1, quote:"We briefed David on a 90-second luxury automotive spot and he delivered something so authoritative, so immaculately paced, our creative director called it the finest VO work we've ever commissioned. Clients noticed immediately.", author:"Isabelle Fontaine", role:"Head of Brand Experience", company:"Maison Lumière Group", industry:"LUXURY FASHION", accentColor:"#00F2FE", featured:true },
  { id:2, quote:"We needed authority across 14 markets simultaneously. David recorded the full suite in a single session — clean takes, zero direction. He understands what a brand needs before you finish the brief.", author:"Marcus Osei", role:"VP of Global Marketing", company:"Nexora Technologies", industry:"ENTERPRISE TECH", accentColor:"#f59e0b", featured:false },
  { id:3, quote:"Twenty years in the industry and David occupies a category entirely his own. The emotional precision he brought to our documentary series was extraordinary — our editor said the rough cut moved her to tears on the first pass.", author:"Cynthia Adeyemi", role:"Executive Producer", company:"Meridian Film Studios", industry:"CINEMATIC", accentColor:"#f43f5e", featured:false },
  { id:4, quote:"Our podcast went from 40k to 380k monthly listeners within four months. Retention climbed 67%. The audience DMs us asking about 'the voice.' There is no overstating what the right vocal presence does for long-form audio.", author:"Jordan Calloway", role:"Founder & Host", company:"The Architecture of Thought", industry:"PODCAST", accentColor:"#34d399", featured:false },
  { id:5, quote:"18-hour turnaround on a 3-minute IVR suite. Broadcast-ready, perfectly levelled — clear, warm, professional. We've retained Aura Vocal Studios on an exclusive annual contract since.", author:"Priya Nair", role:"Director of Customer Experience", company:"Stratos Financial Systems", industry:"ENTERPRISE", accentColor:"#f59e0b", featured:false },
  { id:6, quote:"We cast David as lead antagonist in our flagship RPG. The range in a single session — cold calculation to raw menace — had our audio team on their feet. Gamers call it 'the best villain voice in a decade.'", author:"Tomás Reyes", role:"Audio Director", company:"Ironveil Game Studios", industry:"CINEMATIC", accentColor:"#f43f5e", featured:false },
];

const STUDIO = [
  { icon:<MicIcon/>, label:"Broadcast Mic Chain", desc:"Neumann U87 · Universal Audio", color:"#00F2FE" },
  { icon:<WaveIcon/>, label:"Pro Tools · Logic Pro X", desc:"Broadcast-grade DAW suite", color:"#a78bfa" },
  { icon:<ClockIcon/>, label:"<48H Turnaround", desc:"Rush delivery available", color:"#34d399" },
  { icon:<GlobeIcon/>, label:"Global Distribution", desc:"WAV + MP3 · Cleared worldwide", color:"#f59e0b" },
];

const WHY = [
  { label:"Single-Source Casting", desc:"No agents, no delays, no multiple-talent coordination. One voice, total creative control." },
  { label:"Broadcast Quality Always", desc:"Every file delivered at 48kHz WAV, noise-treated, broadcast-ready. Zero revisions on technical quality." },
  { label:"Remote Directed Sessions", desc:"Live Source-Connect and Zoom direction. Your creative vision, real-time." },
  { label:"Zero Briefing Friction", desc:"David understands your brand from the brief. Most clients receive first-pass finals." },
];

const fmt = s => { if(!isFinite(s)||isNaN(s)) return "0:00"; return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`; };

// ─── DEMO CARD ─────────────────────────────────────────────────────────────────
const DemoCard = ({ demo, isPlaying, onToggle, isDark }) => {
  const audioRef = useRef(null);
  const scrubRef = useRef(null);
  const [cur,setCur] = useState(0);
  const [dur,setDur] = useState(0);

  useEffect(() => {
    const a = audioRef.current; if(!a) return;
    if(isPlaying) a.play().catch(()=>{}); else a.pause();
  },[isPlaying]);

  useEffect(() => {
    const a = audioRef.current; if(!a) return;
    const t=()=>setCur(a.currentTime), m=()=>setDur(a.duration), e=()=>{setCur(0);onToggle();};
    a.addEventListener("timeupdate",t); a.addEventListener("loadedmetadata",m);
    a.addEventListener("durationchange",m); a.addEventListener("ended",e);
    return ()=>{ a.removeEventListener("timeupdate",t); a.removeEventListener("loadedmetadata",m);
      a.removeEventListener("durationchange",m); a.removeEventListener("ended",e); };
  },[onToggle]);

  const seek = useCallback(e => {
    const a=audioRef.current, b=scrubRef.current; if(!a||!b||!dur) return;
    const r=b.getBoundingClientRect();
    a.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*dur;
    setCur(a.currentTime);
  },[dur]);

  const pct = dur?(cur/dur)*100:0;
  const acc = demo.accentSolid;

  return (
    <div style={{
      position:"relative", overflow:"hidden", borderRadius:"20px",
      padding:"24px", display:"flex", flexDirection:"column", gap:"16px",
      minHeight:"180px", cursor:"default",
      background: isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
      border:`1px solid ${isPlaying ? acc+"66" : isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"}`,
      boxShadow: isPlaying
        ? `0 0 0 1px ${acc}33, 0 16px 64px ${acc}22, 0 4px 16px rgba(0,0,0,0.4)`
        : isDark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.06)",
      backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      transition:"border-color 0.4s ease, box-shadow 0.5s ease",
    }}>
      <audio ref={audioRef} src={demo.src} preload="metadata"/>

      {/* Glow orbs */}
      <div style={{position:"absolute",top:"-40px",right:"-40px",width:"200px",height:"200px",borderRadius:"50%",
        background:acc+(isPlaying?"44":"11"),filter:"blur(50px)",pointerEvents:"none",
        transition:"background 0.6s ease",animation:isPlaying?"pulseGlow 3s ease-in-out infinite":"none"}}/>
      {isPlaying&&<div style={{position:"absolute",bottom:"-40px",left:"-40px",width:"160px",height:"160px",
        borderRadius:"50%",background:acc+"22",filter:"blur(40px)",pointerEvents:"none",
        animation:"pulseGlow 2.5s ease-in-out infinite reverse"}}/>}

      {/* Header row */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px"}}>
        <div style={{flex:1,minWidth:0}}>
          {/* Tag + tone */}
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px",flexWrap:"wrap"}}>
            <span style={{
              display:"inline-block",fontSize:"8px",letterSpacing:"0.2em",fontWeight:700,
              padding:"3px 10px",borderRadius:"9999px",
              color:acc, border:`1px solid ${acc}44`, background:acc+"18",
            }}>{demo.tag}</span>
            <span style={{fontSize:"9px",color:isDark?"rgba(255,255,255,0.3)":"rgba(0,0,0,0.3)",letterSpacing:"0.1em"}}>{demo.tone}</span>
          </div>
          <h3 style={{
            fontFamily:"'Cormorant Garamond',Georgia,serif",
            fontWeight:700, lineHeight:1.15, margin:0,
            fontSize: demo.size==="large"?"22px":"17px",
            color: isDark?"#ffffff":"#0f172a",
          }}>{demo.title}</h3>
          <p style={{fontSize:"11px",color:isDark?"#475569":"#94a3b8",marginTop:"3px",letterSpacing:"0.03em"}}>{demo.subtitle}</p>
        </div>

        {/* Play button */}
        <button onClick={onToggle} style={{
          flexShrink:0, width:"48px", height:"48px", borderRadius:"50%",
          display:"flex", alignItems:"center", justifyContent:"center",
          background: isPlaying ? `linear-gradient(135deg,${acc},${acc}bb)` : "transparent",
          border:`1.5px solid ${acc}`,
          color: isPlaying?"#000":acc,
          boxShadow: isPlaying ? `0 0 20px ${acc}99, 0 0 40px ${acc}44` : "none",
          cursor:"pointer", transition:"all 0.3s cubic-bezier(0.22,1,0.36,1)",
          transform: isPlaying?"scale(1.08)":"scale(1)",
        }}>
          {isPlaying?<PauseIcon/>:<PlayIcon/>}
        </button>
      </div>

      {/* Description — large/medium */}
      {demo.size!=="small"&&(
        <p style={{fontSize:"12px",lineHeight:1.7,color:isDark?"#94a3b8":"#64748b",margin:0}}>{demo.description}</p>
      )}

      {/* Waveform */}
      <Waveform isPlaying={isPlaying} accent={acc}/>

      {/* Scrubber */}
      <div style={{fontFamily:"'DM Sans',sans-serif"}}>
        <div ref={scrubRef} onClick={seek} style={{width:"100%",height:"16px",display:"flex",alignItems:"center",cursor:"pointer"}}>
          <div style={{width:"100%",height:"3px",borderRadius:"9999px",position:"relative",
            background:isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)"}}>
            <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:"9999px",
              width:`${pct}%`,
              background:isPlaying?`linear-gradient(90deg,${acc},${acc}cc)`:acc+"55",
              boxShadow:isPlaying?`0 0 10px ${acc}99`:"none",
              transition:"width 0.25s linear"}}/>
            <div style={{position:"absolute",top:"50%",transform:"translateY(-50%)",
              left:`calc(${pct}% - 5px)`,width:"10px",height:"10px",
              borderRadius:"50%",background:acc,
              boxShadow:`0 0 8px ${acc}`,transition:"left 0.25s linear",opacity:0.9}}/>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",
          color:isDark?"#475569":"#94a3b8",marginTop:"4px"}}>
          <span>{fmt(cur)}</span>
          <span>{dur?fmt(dur):"--:--"}</span>
        </div>
      </div>
    </div>
  );
};

// ─── MAIN ──────────────────────────────────────────────────────────────────────
export default function AuraVocalStudios() {
  const [isDark,setIsDark] = useState(true);
  const [playingId,setPlayingId] = useState(null);
  const [scrolled,setScrolled] = useState(false);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return ()=>window.removeEventListener("scroll",fn);
  },[]);

  const toggle = useCallback(id=>setPlayingId(p=>p===id?null:id),[]);

  const bg         = isDark?"#050505":"#FAFAFA";
  const tp         = isDark?"#FFFFFF":"#0F172A";
  const tm         = isDark?"#94A3B8":"#64748B";
  const border     = isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)";
  const glass      = isDark?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.7)";

  return (
    <div style={{background:bg,color:tp,minHeight:"100vh",fontFamily:"'Cormorant Garamond',Georgia,serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(0,242,254,0.3);border-radius:2px;}
        @keyframes wave{from{transform:scaleY(1);}to{transform:scaleY(1.9);}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
        @keyframes orb1{0%,100%{transform:translate(0,0)scale(1);}50%{transform:translate(40px,-30px)scale(1.08);}}
        @keyframes orb2{0%,100%{transform:translate(0,0)scale(1);}50%{transform:translate(-30px,40px)scale(1.05);}}
        @keyframes rotateRing{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes pulseGlow{0%,100%{opacity:0.4;}50%{opacity:1;}}
        @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
        .fu{animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both;}
        .fu1{animation-delay:0.08s;}.fu2{animation-delay:0.22s;}.fu3{animation-delay:0.38s;}.fu4{animation-delay:0.52s;}
        .sans{font-family:'DM Sans',sans-serif;}
        .serif{font-family:'Cormorant Garamond',Georgia,serif;}
        .shimmer{background:linear-gradient(90deg,#00F2FE 0%,#4FACFE 40%,#00F2FE 60%,#4FACFE 100%);background-size:200% 100%;animation:shimmer 3s linear infinite;}
        .marquee{animation:marquee 42s linear infinite;display:flex;width:max-content;}
        .marquee:hover{animation-play-state:paused;}
        .card-hover{transition:transform 0.35s cubic-bezier(0.22,1,0.36,1),box-shadow 0.35s ease;}
        .card-hover:hover{transform:translateY(-4px);}
        .float{animation:float 6s ease-in-out infinite;}
        a{cursor:pointer;}
        button{font-family:'DM Sans',sans-serif;}
      `}</style>

      {/* BG ORBS */}
      <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        <div style={{position:"absolute",top:"-20%",left:"-15%",width:"60vw",height:"60vw",borderRadius:"50%",
          background:isDark?"radial-gradient(circle,#00F2FE09 0%,transparent 70%)":"radial-gradient(circle,#6366F112 0%,transparent 70%)",
          animation:"orb1 18s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"-20%",right:"-10%",width:"50vw",height:"50vw",borderRadius:"50%",
          background:isDark?"radial-gradient(circle,#4FACFE06 0%,transparent 70%)":"radial-gradient(circle,#818CF810 0%,transparent 70%)",
          animation:"orb2 22s ease-in-out infinite"}}/>
        {/* Hero cinematic light beam */}
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"1px",height:"40vh",
          background:"linear-gradient(180deg,#00F2FE22,transparent)",opacity:0.6}}/>
        <div style={{position:"absolute",inset:0,
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity:isDark?0.6:0.3}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* ══════ NAV ══════════════════════════════════════════════════════════ */}
        <nav style={{
          position:"fixed",top:0,left:0,right:0,zIndex:100,
          backdropFilter:"blur(24px) saturate(180%)",WebkitBackdropFilter:"blur(24px) saturate(180%)",
          background:isDark?`rgba(5,5,5,${scrolled?0.94:0.6})`:`rgba(250,250,250,${scrolled?0.96:0.7})`,
          borderBottom:`1px solid ${border}`,
          transition:"background 0.4s ease, box-shadow 0.4s ease",
          boxShadow:scrolled?(isDark?"0 4px 32px rgba(0,0,0,0.7)":"0 4px 24px rgba(0,0,0,0.08)"):"none",
        }}>
          <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 24px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div className="serif" style={{letterSpacing:"0.16em",fontSize:"13px",fontWeight:600,color:tp}}>
              AURA<span style={{color:"#00F2FE",margin:"0 5px"}}>◆</span>VOCAL STUDIOS
            </div>
            <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
              <button onClick={()=>setIsDark(!isDark)} className="sans" style={{
                display:"flex",alignItems:"center",gap:"6px",
                padding:"6px 14px",borderRadius:"100px",
                border:`1px solid ${border}`,
                background:isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",
                color:tm,fontSize:"12px",cursor:"pointer",transition:"all 0.3s ease",
              }}>
                {isDark?<SunIcon/>:<MoonIcon/>}
                <span style={{letterSpacing:"0.04em"}}>{isDark?"Light":"Dark"}</span>
              </button>
              <a href="https://calendly.com/dcn-automations-meeting" className="sans shimmer"
                style={{padding:"8px 22px",borderRadius:"100px",color:"#000",fontWeight:600,
                  fontSize:"12px",letterSpacing:"0.07em",textDecoration:"none",
                  boxShadow:"0 0 24px rgba(0,242,254,0.35)",transition:"transform 0.3s ease,box-shadow 0.3s ease",display:"inline-block"}}
                onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 40px rgba(0,242,254,0.6)";}}
                onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 24px rgba(0,242,254,0.35)";}}>
                Request Session
              </a>
            </div>
          </div>
        </nav>

        {/* ══════ HERO ══════════════════════════════════════════════════════════ */}
        <section style={{paddingTop:"160px",paddingBottom:"120px",padding:"160px 24px 120px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"80px",alignItems:"center"}}>

            <div>
              {/* Eyebrow */}
              <div className="sans fu fu1" style={{display:"inline-flex",alignItems:"center",gap:"10px",marginBottom:"32px"}}>
                <div style={{width:"36px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
                <span style={{fontSize:"10px",letterSpacing:"0.28em",color:"#00F2FE",fontWeight:600}}>ELITE VOICE-OVER AGENCY</span>
                <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#00F2FE",boxShadow:"0 0 8px #00F2FE",animation:"pulseGlow 2s ease-in-out infinite"}}/>
              </div>

              {/* Headline */}
              <h1 className="serif fu fu2" style={{
                fontSize:"clamp(42px,6vw,82px)",fontWeight:700,lineHeight:1.05,
                letterSpacing:"-0.02em",marginBottom:"28px",color:tp,
              }}>
                The Sonic Identity<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:isDark?"rgba(255,255,255,0.5)":"rgba(15,23,42,0.4)"}}>of the World's</span>
                <br/>Elite Brands.
              </h1>

              {/* Sub */}
              <p className="sans fu fu3" style={{fontSize:"15px",lineHeight:1.8,color:tm,maxWidth:"520px",marginBottom:"48px",fontWeight:300}}>
                A rare instrument — honed over eight years at the crossroads of cinematic storytelling and corporate command.{" "}
                <span style={{color:tp,fontWeight:500}}>David Chidera Nwaibe</span> is the voice behind campaigns that don't just speak — they resonate, convert, and endure.
              </p>

              {/* CTAs */}
              <div className="fu fu4" style={{display:"flex",alignItems:"center",gap:"16px",flexWrap:"wrap"}}>
                <a href="https://calendly.com/dcn-automations-meeting" className="sans shimmer"
                  style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"15px 36px",
                    borderRadius:"100px",color:"#000",fontWeight:700,fontSize:"13px",
                    letterSpacing:"0.08em",textDecoration:"none",
                    boxShadow:"0 0 48px rgba(0,242,254,0.35)",transition:"transform 0.3s ease,box-shadow 0.3s ease"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 64px rgba(0,242,254,0.6)";}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 48px rgba(0,242,254,0.35)";}}>
                  Book a Session <LinkIcon/>
                </a>
                <a href="mailto:auravocal.studio777@gmail.com" className="sans"
                  style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 30px",
                    borderRadius:"100px",border:`1px solid ${border}`,
                    background:isDark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.03)",
                    color:tm,fontSize:"13px",letterSpacing:"0.06em",textDecoration:"none",transition:"all 0.3s ease"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE44";e.currentTarget.style.color=tp;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=tm;}}>
                  <MailIcon/> Direct Line
                </a>
              </div>

              {/* Stats */}
              <div className="fu fu4" style={{display:"flex",gap:"40px",marginTop:"64px",paddingTop:"40px",borderTop:`1px solid ${border}`,flexWrap:"wrap"}}>
                {[["100%","Single-Source Infrastructure"],["<48H","Sonic Core Turnaround"],["Global","Enterprise Distribution"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="serif" style={{fontSize:"30px",fontWeight:700,color:tp,lineHeight:1}}>{n}</div>
                    <div className="sans" style={{fontSize:"11px",color:tm,marginTop:"5px",letterSpacing:"0.07em"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profile */}
            <div style={{position:"relative",flexShrink:0,width:"300px",height:"300px"}}>
              {/* Rings */}
              <div style={{position:"absolute",inset:"-24px",border:"1px dashed rgba(0,242,254,0.2)",borderRadius:"50%",animation:"rotateRing 24s linear infinite"}}>
                <div style={{position:"absolute",top:"-5px",left:"50%",transform:"translateX(-50%)",width:"10px",height:"10px",borderRadius:"50%",background:"#00F2FE",boxShadow:"0 0 16px #00F2FE"}}/>
              </div>
              <div style={{position:"absolute",inset:"-48px",border:"1px dashed rgba(79,172,254,0.08)",borderRadius:"50%",animation:"rotateRing 38s linear infinite reverse"}}/>
              {/* Glow */}
              <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,242,254,0.15) 0%,transparent 70%)",animation:"pulseGlow 4s ease-in-out infinite"}}/>
              {/* Photo */}
              <div style={{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",border:`1px solid ${border}`,backdropFilter:"blur(12px)"}}>
                <img src={PROFILE_IMG} alt="David Chidera Nwaibe" style={{width:"100%",height:"100%",objectFit:"cover"}}/>
              </div>
              {/* Badge */}
              <div className="sans" style={{position:"absolute",bottom:"-16px",left:"50%",transform:"translateX(-50%)",
                whiteSpace:"nowrap",padding:"6px 18px",borderRadius:"100px",fontSize:"9px",letterSpacing:"0.18em",fontWeight:600,
                background:isDark?"rgba(0,0,0,0.8)":"rgba(255,255,255,0.9)",border:`1px solid ${border}`,
                color:"#00F2FE",backdropFilter:"blur(12px)"}}>
                CREATIVE DIRECTOR
              </div>
            </div>
          </div>
        </section>

        {/* ══════ WHY BRANDS CHOOSE AURA ════════════════════════════════════════ */}
        <section style={{padding:"80px 24px",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,
          background:isDark?"rgba(255,255,255,0.01)":"rgba(0,0,0,0.01)"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"56px"}}>
              <div className="sans" style={{fontSize:"10px",letterSpacing:"0.24em",color:"#00F2FE",fontWeight:600,marginBottom:"14px"}}>WHY BRANDS CHOOSE AURA</div>
              <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,44px)",fontWeight:700,color:tp,lineHeight:1.2}}>
                Built for Brands That<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Refuse to Sound Ordinary</span>
              </h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"20px"}}>
              {WHY.map((w,i)=>(
                <div key={i} className="card-hover" style={{
                  padding:"28px",borderRadius:"16px",
                  background:glass,border:`1px solid ${border}`,
                  backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
                }}>
                  <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
                    <div style={{width:"20px",height:"20px",borderRadius:"50%",background:"#00F2FE22",
                      border:"1px solid #00F2FE44",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                      <CheckIcon/>
                    </div>
                    <div className="sans" style={{fontSize:"13px",fontWeight:600,color:tp,letterSpacing:"0.02em"}}>{w.label}</div>
                  </div>
                  <p className="sans" style={{fontSize:"12px",color:tm,lineHeight:1.7}}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ DEMO CARDS ════════════════════════════════════════════════════ */}
        <section style={{padding:"100px 24px 120px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{marginBottom:"60px"}}>
            <div className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <div style={{width:"24px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
              <span style={{fontSize:"10px",letterSpacing:"0.24em",color:"#00F2FE",fontWeight:600}}>THE MASTERS COLLECTION</span>
            </div>
            <h2 className="serif" style={{fontSize:"clamp(28px,4vw,50px)",fontWeight:700,color:tp,lineHeight:1.15}}>
              Six Signature<br/><span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Performance Demos</span>
            </h2>
          </div>

          {/* Grid */}
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px"}}>
            {/* Row 1: large(7) + stacked(5) */}
            <div style={{gridColumn:"span 7"}}>
              <DemoCard demo={DEMOS[0]} isPlaying={playingId===DEMOS[0].id} onToggle={()=>toggle(DEMOS[0].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 5",display:"flex",flexDirection:"column",gap:"16px"}}>
              <DemoCard demo={DEMOS[1]} isPlaying={playingId===DEMOS[1].id} onToggle={()=>toggle(DEMOS[1].id)} isDark={isDark}/>
              <DemoCard demo={DEMOS[2]} isPlaying={playingId===DEMOS[2].id} onToggle={()=>toggle(DEMOS[2].id)} isDark={isDark}/>
            </div>
            {/* Row 2: 4+4+4 */}
            {[DEMOS[3],DEMOS[4],DEMOS[5]].map(d=>(
              <div key={d.id} style={{gridColumn:"span 4"}}>
                <DemoCard demo={d} isPlaying={playingId===d.id} onToggle={()=>toggle(d.id)} isDark={isDark}/>
              </div>
            ))}
          </div>
          <p className="sans" style={{marginTop:"24px",textAlign:"center",fontSize:"11px",
            color:isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.22)",letterSpacing:"0.06em"}}>
            Audio loads on demand · Click any card to play
          </p>
        </section>

        {/* ══════ STUDIO SPECS ══════════════════════════════════════════════════ */}
        <section style={{padding:"80px 24px",background:isDark?"rgba(255,255,255,0.015)":"rgba(0,0,0,0.015)",
          borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"56px"}}>
              <div className="sans" style={{fontSize:"10px",letterSpacing:"0.24em",color:"#00F2FE",fontWeight:600,marginBottom:"14px"}}>STUDIO INFRASTRUCTURE</div>
              <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,44px)",fontWeight:700,color:tp,lineHeight:1.2}}>
                Broadcast-Grade Chain.<br/><span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Every Single Take.</span>
              </h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"20px"}}>
              {STUDIO.map((s,i)=>(
                <div key={i} className="card-hover float" style={{
                  padding:"32px 24px",borderRadius:"20px",textAlign:"center",
                  background:glass,border:`1px solid ${s.color}22`,
                  backdropFilter:"blur(16px)",WebkitBackdropFilter:"blur(16px)",
                  boxShadow:`0 8px 32px ${s.color}11`,
                  animationDelay:`${i*0.8}s`,
                }}>
                  <div style={{width:"52px",height:"52px",borderRadius:"16px",margin:"0 auto 16px",
                    background:`linear-gradient(135deg,${s.color}22,${s.color}08)`,
                    border:`1px solid ${s.color}44`,
                    display:"flex",alignItems:"center",justifyContent:"center",color:s.color}}>
                    {s.icon}
                  </div>
                  <div className="sans" style={{fontSize:"13px",fontWeight:600,color:tp,marginBottom:"6px"}}>{s.label}</div>
                  <div className="sans" style={{fontSize:"11px",color:tm}}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ REVIEWS ═══════════════════════════════════════════════════════ */}
        <section style={{padding:"100px 0 120px",overflow:"hidden"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 24px 56px"}}>
            <div className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <div style={{width:"24px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
              <span style={{fontSize:"10px",letterSpacing:"0.24em",color:"#00F2FE",fontWeight:600}}>CLIENT TESTIMONIALS</span>
            </div>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"24px"}}>
              <h2 className="serif" style={{fontSize:"clamp(28px,4vw,50px)",fontWeight:700,color:tp,lineHeight:1.15,margin:0}}>
                Voices That Move<br/><span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Industries Forward</span>
              </h2>
              <div className="sans" style={{display:"flex",alignItems:"center",gap:"6px"}}>
                {[1,2,3,4,5].map(s=><StarIcon key={s}/>)}
                <span style={{fontSize:"12px",color:tm,marginLeft:"8px"}}>5.0 · 200+ engagements</span>
              </div>
            </div>
          </div>

          {/* Featured */}
          {(()=>{const r=REVIEWS[0];return(
            <div style={{maxWidth:"1280px",margin:"0 auto 32px",padding:"0 24px"}}>
              <div className="card-hover" style={{
                position:"relative",overflow:"hidden",borderRadius:"24px",padding:"52px 60px",
                background:isDark?"linear-gradient(135deg,rgba(0,242,254,0.04),rgba(255,255,255,0.015))":"linear-gradient(135deg,rgba(99,102,241,0.06),rgba(255,255,255,0.85))",
                border:`1px solid ${isDark?"rgba(0,242,254,0.12)":"rgba(99,102,241,0.15)"}`,
                backdropFilter:"blur(20px)",boxShadow:isDark?"0 24px 64px rgba(0,0,0,0.4)":"0 16px 48px rgba(0,0,0,0.07)",
              }}>
                <div style={{position:"absolute",top:"20px",right:"36px",opacity:0.04,fontSize:"180px",fontFamily:"Georgia,serif",color:"#00F2FE",lineHeight:1}}>"</div>
                <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"48px",alignItems:"center"}}>
                  <div>
                    <div style={{display:"flex",gap:"4px",marginBottom:"22px"}}>{[1,2,3,4,5].map(s=><StarIcon key={s}/>)}</div>
                    <blockquote className="serif" style={{fontSize:"clamp(18px,2.2vw,26px)",fontWeight:400,lineHeight:1.65,color:tp,fontStyle:"italic",margin:0}}>
                      "{r.quote}"
                    </blockquote>
                  </div>
                  <div style={{flexShrink:0,textAlign:"right",minWidth:"180px"}}>
                    <div style={{width:"60px",height:"60px",borderRadius:"50%",marginLeft:"auto",marginBottom:"14px",
                      background:"linear-gradient(135deg,#00F2FE22,#4FACFE22)",border:"1px solid rgba(0,242,254,0.25)",
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span className="serif" style={{fontSize:"22px",color:"#00F2FE",fontWeight:600}}>{r.author.charAt(0)}</span>
                    </div>
                    <div className="serif" style={{fontSize:"15px",fontWeight:600,color:tp,marginBottom:"3px"}}>{r.author}</div>
                    <div className="sans" style={{fontSize:"11px",color:tm,marginBottom:"4px"}}>{r.role}</div>
                    <div className="sans" style={{fontSize:"11px",color:tm,fontStyle:"italic"}}>{r.company}</div>
                    <span className="sans" style={{display:"inline-block",marginTop:"12px",fontSize:"9px",letterSpacing:"0.18em",fontWeight:600,
                      padding:"4px 12px",borderRadius:"100px",color:"#00F2FE",background:"rgba(0,242,254,0.08)",border:"1px solid rgba(0,242,254,0.2)"}}>
                      {r.industry}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );})()}

          {/* Marquee */}
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:"120px",zIndex:2,pointerEvents:"none",
              background:isDark?"linear-gradient(90deg,#050505,transparent)":"linear-gradient(90deg,#FAFAFA,transparent)"}}/>
            <div style={{position:"absolute",right:0,top:0,bottom:0,width:"120px",zIndex:2,pointerEvents:"none",
              background:isDark?"linear-gradient(270deg,#050505,transparent)":"linear-gradient(270deg,#FAFAFA,transparent)"}}/>
            <div className="marquee" style={{gap:"20px",padding:"8px 0"}}>
              {[...REVIEWS.slice(1),...REVIEWS.slice(1)].map((r,idx)=>(
                <div key={`${r.id}-${idx}`} className="card-hover" style={{
                  flexShrink:0,width:"380px",borderRadius:"18px",padding:"28px 32px",
                  background:isDark?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.85)",
                  border:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"}`,
                  backdropFilter:"blur(16px)",cursor:"default",
                  boxShadow:isDark?"0 8px 32px rgba(0,0,0,0.4)":"0 8px 24px rgba(0,0,0,0.06)",
                }}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"16px"}}>
                    <div style={{display:"flex",gap:"3px"}}>{[1,2,3,4,5].map(s=>(
                      <svg key={s} viewBox="0 0 20 20" fill={r.accentColor} style={I(12,12)}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    ))}</div>
                    <span className="sans" style={{fontSize:"8px",letterSpacing:"0.18em",fontWeight:700,
                      padding:"3px 10px",borderRadius:"100px",color:r.accentColor,
                      background:r.accentColor+"15",border:`1px solid ${r.accentColor}30`}}>{r.industry}</span>
                  </div>
                  <blockquote className="serif" style={{fontSize:"13.5px",lineHeight:1.75,color:tp,margin:"0 0 20px",fontStyle:"italic"}}>
                    "{r.quote}"
                  </blockquote>
                  <div style={{display:"flex",alignItems:"center",gap:"12px",paddingTop:"16px",
                    borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)"}`}}>
                    <div style={{width:"36px",height:"36px",borderRadius:"50%",flexShrink:0,
                      background:`linear-gradient(135deg,${r.accentColor}22,${r.accentColor}08)`,
                      border:`1px solid ${r.accentColor}33`,
                      display:"flex",alignItems:"center",justifyContent:"center"}}>
                      <span className="serif" style={{fontSize:"14px",color:r.accentColor,fontWeight:600}}>{r.author.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="serif" style={{fontSize:"13px",fontWeight:600,color:tp,lineHeight:1.2}}>{r.author}</div>
                      <div className="sans" style={{fontSize:"10px",color:tm,marginTop:"2px"}}>{r.role} · {r.company}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════ TRUSTED BY ════════════════════════════════════════════════════ */}
        <section style={{padding:"48px 24px",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,
          background:isDark?"rgba(255,255,255,0.01)":"rgba(0,0,0,0.015)"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",gap:"56px",flexWrap:"wrap"}}>
            <p className="sans" style={{fontSize:"10px",letterSpacing:"0.2em",color:tm}}>TRUSTED BY</p>
            {["LUXURY AUTO","ENTERPRISE TECH","CINEMATIC STUDIOS","GLOBAL BROADCAST","PREMIUM FASHION"].map(b=>(
              <div key={b} className="sans" style={{fontSize:"11px",letterSpacing:"0.22em",
                color:isDark?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.18)",fontWeight:600,whiteSpace:"nowrap"}}>
                {b}
              </div>
            ))}
          </div>
        </section>

        {/* ══════ FOOTER ════════════════════════════════════════════════════════ */}
        <footer style={{padding:"72px 24px 48px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"40px",marginBottom:"52px"}}>
            <div style={{maxWidth:"300px"}}>
              <div className="serif" style={{fontSize:"14px",fontWeight:600,letterSpacing:"0.16em",color:tp,marginBottom:"14px"}}>
                AURA<span style={{color:"#00F2FE",margin:"0 5px"}}>◆</span>VOCAL STUDIOS
              </div>
              <p className="sans" style={{fontSize:"12px",color:tm,lineHeight:1.75,fontWeight:300}}>
                The definitive voice-over atelier for brands that refuse to be ordinary. Directed by David Chidera Nwaibe.
              </p>
            </div>
            <div style={{display:"flex",gap:"64px"}}>
              <div>
                <div className="sans" style={{fontSize:"10px",letterSpacing:"0.22em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>STUDIO</div>
                {["Portfolio","Process","Rates","About"].map(l=>(
                  <div key={l} style={{marginBottom:"12px"}}>
                    <a href="#" className="sans" style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}}
                      onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>{l}</a>
                  </div>
                ))}
              </div>
              <div>
                <div className="sans" style={{fontSize:"10px",letterSpacing:"0.22em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>CONNECT</div>
                {["Book Session","Direct Line","Press Kit","Partnerships"].map(l=>(
                  <div key={l} style={{marginBottom:"12px"}}>
                    <a href="#" className="sans" style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}}
                      onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>{l}</a>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="sans" style={{fontSize:"10px",letterSpacing:"0.22em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>FOLLOW</div>
              <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                {[{icon:<IgIcon/>,label:"Instagram"},{icon:<TwIcon/>,label:"Twitter / X"},{icon:<LiIcon/>,label:"LinkedIn"}].map(({icon,label})=>(
                  <a key={label} href="#" className="sans" style={{display:"inline-flex",alignItems:"center",gap:"10px",
                    fontSize:"12px",color:tm,textDecoration:"none",transition:"color 0.2s ease"}}
                    onMouseEnter={e=>e.currentTarget.style.color="#00F2FE"} onMouseLeave={e=>e.currentTarget.style.color=tm}>
                    {icon}{label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{paddingTop:"28px",borderTop:`1px solid ${border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"16px"}}>
            <p className="sans" style={{fontSize:"11px",color:isDark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.28)",letterSpacing:"0.06em"}}>
              © {new Date().getFullYear()} Aura Vocal Studios · David Chidera Nwaibe · All rights reserved.
            </p>
            <div style={{display:"flex",gap:"24px"}}>
              {["Privacy","Terms","Cookies"].map(l=>(
                <a key={l} href="#" className="sans" style={{fontSize:"11px",color:isDark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.28)",textDecoration:"none",letterSpacing:"0.06em",transition:"color 0.2s"}}
                  onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=isDark?"rgba(255,255,255,0.2)":"rgba(0,0,0,0.28)"}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}
