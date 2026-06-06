import { useState, useRef, useEffect, useCallback } from "react";

const PROFILE_IMG = "/profile.jpg";
const BOOKING_LINK = "https://form.jotform.com/261554042729054";
const MAILTO_LINK = "mailto:concierge@studiohqauravocal.site?subject=Project%20Inquiry%20%E2%80%94%20Aura%20Vocal%20Studios&body=Dear%20David%2C%0A%0A1.%20Organisation%20%26%20Role%3A%20%5BCompany%20name%20and%20your%20position%5D%0A%0A2.%20Campaign%20or%20Project%20Title%3A%20%5BWorking%20title%20or%20project%20codename%5D%0A%0A3.%20Deliverable%20Type%3A%20%5BCommercial%20%2F%20Documentary%20%2F%20Enterprise%20Narration%20%2F%20Gaming%20%2F%20Trailer%20%2F%20Other%5D%0A%0A4.%20Intended%20Distribution%3A%20%5BNetwork%20broadcast%20%2F%20Digital%20%2F%20Cinema%20%2F%20Global%20%2F%20Regional%5D%0A%0A5.%20Creative%20Direction%3A%20%5BTone%2C%20pacing%2C%20references%2C%20comparable%20campaigns%5D%0A%0A6.%20Script%20Status%3A%20%5BFinal%20%2F%20In%20revision%20%2F%20Brief%20stage%5D%0A%0A7.%20Session%20Deadline%3A%20%5BRequired%20delivery%20date%5D%0A%0A8.%20Production%20Budget%3A%20%5BApproximate%20range%5D%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BOrganisation%5D";

const CORPORATE_FORM = "https://form.jotform.com/261563101450041";
const PREMIUM_FORM   = "https://form.jotform.com/261562715360051";
const EXCLUSIVE_FORM = "https://form.jotform.com/261562700885057";

const CORPORATE_MAILTO = "mailto:concierge@studiohqauravocal.site?subject=Corporate%20Strategy%20Project%20%E2%80%94%20Aura%20Vocal%20Studios&body=Dear%20David%2C%0A%0AI%20am%20reaching%20out%20to%20commission%20a%20Corporate%20Strategy%20Project%20with%20Aura%20Vocal%20Studios.%0A%0A1.%20Organisation%20%26%20Role%3A%20%5BCompany%20name%20and%20your%20position%5D%0A%0A2.%20Project%20Title%3A%20%5BWorking%20title%20or%20campaign%20codename%5D%0A%0A3.%20Deliverable%20Type%3A%20%5BTraining%20content%20%2F%20Explainer%20video%20%2F%20Internal%20communications%20%2F%20Enterprise%20messaging%5D%0A%0A4.%20Distribution%20Scope%3A%20%5BInternal%20only%20%2F%20Digital%20%2F%20Network%20broadcast%20%2F%20Global%5D%0A%0A5.%20Script%20Status%3A%20%5BFinal%20%2F%20In%20revision%20%2F%20Brief%20stage%5D%0A%0A6.%20Deadline%3A%20%5BRequired%20delivery%20date%5D%0A%0A7.%20Estimated%20Budget%3A%20%5BWithin%20%248%2C000%E2%80%93%2415%2C000%20range%5D%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BOrganisation%5D";

const PREMIUM_MAILTO = "mailto:concierge@studiohqauravocal.site?subject=Premium%20Strategy%20Project%20%E2%80%94%20Aura%20Vocal%20Studios&body=Dear%20David%2C%0A%0AI%20am%20reaching%20out%20to%20commission%20a%20Premium%20Strategy%20Project%20with%20Aura%20Vocal%20Studios.%0A%0A1.%20Organisation%20%26%20Role%3A%20%5BCompany%20name%20and%20your%20position%5D%0A%0A2.%20Campaign%20or%20Project%20Title%3A%20%5BWorking%20title%20or%20project%20codename%5D%0A%0A3.%20Deliverable%20Scope%3A%20%5BMultiple%20executions%20%2F%20Campaign%20suite%20%2F%20Enterprise%20narration%20series%20%2F%20Cinematic%20project%5D%0A%0A4.%20Intended%20Distribution%3A%20%5BNetwork%20broadcast%20%2F%20Streaming%20%2F%20Cinema%20%2F%20Global%20digital%5D%0A%0A5.%20Creative%20Direction%3A%20%5BTone%2C%20pacing%2C%20references%2C%20comparable%20campaigns%5D%0A%0A6.%20Script%20Status%3A%20%5BFinal%20%2F%20In%20revision%20%2F%20Brief%20stage%5D%0A%0A7.%20Session%20Deadline%3A%20%5BRequired%20delivery%20date%5D%0A%0A8.%20Production%20Budget%3A%20%5BWithin%20%2430%2C000%E2%80%93%2450%2C000%20range%5D%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BOrganisation%5D";

const EXCLUSIVE_MAILTO = "mailto:concierge@studiohqauravocal.site?subject=Exclusive%20Strategy%20Production%20%E2%80%94%20Aura%20Vocal%20Studios&body=Dear%20David%2C%0A%0AI%20am%20reaching%20out%20to%20commission%20an%20Exclusive%20Strategy%20Production%20with%20Aura%20Vocal%20Studios.%0A%0A1.%20Organisation%20%26%20Role%3A%20%5BCompany%20name%20and%20your%20position%5D%0A%0A2.%20Campaign%20Title%3A%20%5BProject%20codename%20or%20working%20title%5D%0A%0A3.%20Production%20Scope%3A%20%5BFull%20campaign%20suite%20%2F%20AAA%20gaming%20%2F%20Cinematic%20production%20%2F%20Global%20brand%20launch%5D%0A%0A4.%20Distribution%3A%20%5BGlobal%20broadcast%20%2F%20Cinema%20%2F%20Streaming%20%2F%20Multi-territory%5D%0A%0A5.%20Creative%20Architecture%3A%20%5BTone%2C%20emotional%20direction%2C%20campaign%20references%2C%20brand%20values%5D%0A%0A6.%20Script%20%26%20Direction%20Status%3A%20%5BFinal%20%2F%20In%20development%20%2F%20Concept%20stage%5D%0A%0A7.%20Production%20Timeline%3A%20%5BStart%20date%20and%20required%20delivery%5D%0A%0A8.%20Production%20Investment%3A%20%5BWithin%20%2450%2C000%E2%80%93%24100%2C000%20range%5D%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BOrganisation%5D";

const RETAINER_MAILTO = "mailto:concierge@studiohqauravocal.site?subject=Custom%20Retainer%20%26%20Partnership%20Inquiry%20%E2%80%94%20Aura%20Vocal%20Studios&body=Dear%20David%2C%0A%0AI%20am%20reaching%20out%20to%20discuss%20a%20Custom%20Retainer%20or%20exclusive%20creative%20partnership%20with%20Aura%20Vocal%20Studios.%0A%0A1.%20Organisation%20%26%20Role%3A%20%5BCompany%20name%20and%20your%20position%5D%0A%0A2.%20Nature%20of%20Partnership%3A%20%5BAnnual%20retainer%20%2F%20Ongoing%20campaign%20partner%20%2F%20Exclusive%20brand%20voice%20%2F%20Multi-year%20agreement%5D%0A%0A3.%20Campaign%20Volume%3A%20%5BEstimated%20number%20of%20deliverables%20per%20quarter%20or%20year%5D%0A%0A4.%20Brand%20Verticals%20Covered%3A%20%5BProduct%20lines%2C%20markets%2C%20or%20campaign%20categories%20requiring%20coverage%5D%0A%0A5.%20Exclusivity%20Requirements%3A%20%5BCategory%20exclusivity%20%2F%20Full%20exclusivity%20%2F%20Non-exclusive%5D%0A%0A6.%20Territory%20Scope%3A%20%5BRegional%20%2F%20National%20%2F%20Global%5D%0A%0A7.%20NDA%20Required%3A%20%5BYes%20%2F%20No%20%2F%20To%20be%20discussed%5D%0A%0A8.%20Preferred%20Engagement%20Start%3A%20%5BImmediate%20%2F%20Specific%20date%20or%20quarter%5D%0A%0A9.%20Annual%20Investment%20Range%3A%20%5BApproximate%20budget%20or%20preferred%20structure%5D%0A%0AKind%20regards%2C%0A%5BYour%20Name%5D%0A%5BOrganisation%5D";

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
const UpworkIcon= () => <svg viewBox="0 0 24 24" fill="currentColor" style={sz(15,15)}><path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H8.535v7.112c-.002 1.406-1.141 2.546-2.547 2.546-1.405 0-2.543-1.14-2.545-2.546V3.492H1.419v7.112c0 2.521 2.049 4.575 4.57 4.575 2.521 0 4.57-2.054 4.57-4.575v-1.19c.535 1.113 1.19 2.241 1.952 3.239l-1.652 7.757h2.55l1.19-5.602c1.115.74 2.431 1.227 3.963 1.227 3 0 5.439-2.441 5.439-5.442 0-3-2.439-5.435-5.439-5.435z"/></svg>;
const MicIcon   = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/></svg>;
const WaveIcon  = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><path d="M2 12h2l3-8 4 16 3-10 2 4h6"/></svg>;
const ClockIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
const GlobeIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={sz(22,22)}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const CheckIcon = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={sz(14,14)}><polyline points="20 6 9 17 4 12"/></svg>;
const StarIcon  = ({color="#00F2FE"}) => <svg viewBox="0 0 20 20" fill={color} style={sz(12,12)}><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>;

const WBARS = Array.from({length:28},(_,i)=>Math.max(6,Math.abs(Math.sin(i*0.71)*13+Math.cos(i*0.43)*7)+6));
const Waveform = ({isPlaying,accent}) => (
  <div style={{display:"flex",alignItems:"center",gap:"2px",height:"40px",overflow:"hidden"}}>
    {WBARS.map((h,i)=>(
      <div key={i} style={{
        width:"2.5px",borderRadius:"9999px",flexShrink:0,
        height:isPlaying?`${h}px`:`${3+(i%4)*2}px`,
        background:isPlaying?`linear-gradient(180deg,${accent},${accent}66)`:accent,
        opacity:isPlaying?0.88:0.22,
        boxShadow:isPlaying?`0 0 5px ${accent}55`:"none",
        animation:isPlaying?`wave ${0.38+(i%5)*0.12}s ease-in-out infinite alternate`:"none",
        animationDelay:`${i*0.03}s`,
        transition:"height 0.35s ease, opacity 0.35s ease",
      }}/>
    ))}
  </div>
);

const DEMOS = [
  {id:1,size:"featured",title:"Luxury Commercial",subtitle:"Global Campaign · Premium Devices · Market Dominance",tag:"COMMERCIAL",tone:"Sovereign · Polished",accentSolid:"#00F2FE",src:"/demos/Track1.mp3",description:"Not a demo. A declaration. The read global enterprises deploy when the campaign cannot afford to be less than commanding — engineered for flagship launches, VSL infrastructure, and brand manifestos where every syllable carries the full weight of capital."},
  {id:2,size:"standard",title:"Open World Sovereign",subtitle:"AAA Gaming · Cinematic Score · Franchise Narrative",tag:"GAMING",tone:"Epic · Commanding",accentSolid:"#a78bfa",src:"/demos/Track2.mp3",description:"The voice that builds worlds. Engineered for AAA open-world titles where the narrative must carry the weight of a franchise — a performance that makes players pause, feel the lore, and believe every word was written for them alone."},
  {id:3,size:"standard",title:"Podcast Narration",subtitle:"True Story · World-Changing Brilliance · Audience Retention",tag:"PODCAST",tone:"Warm · Magnetic",accentSolid:"#34d399",src:"/demos/Track3.mp3",description:"Retention is not requested here — it is engineered. Built around a story of quiet, world-altering brilliance. The vocal presence that converts first-time listeners into lifelong audiences."},
  {id:4,size:"compact",title:"Enterprise Systems & Tech",subtitle:"Fortune 100 · IVR · Global Automated Pipelines",tag:"ENTERPRISE",tone:"Authoritative · Calibrated",accentSolid:"#f59e0b",src:"/demos/Track4.mp3",description:"Fortune 100 firms. Continental scale. Boardroom-commanding, pipeline-ready, broadcast-clean. First pass. Every time."},
  {id:5,size:"compact",title:"Cinematic & Dramatic",subtitle:"Anti-Hero · Franchise Trailer · High-Stakes Monologue",tag:"CINEMATIC",tone:"Ferocious · Commanding",accentSolid:"#f43f5e",src:"/demos/Track5.mp3",description:"The performances studios cite years later. Anti-heroes, trailers, defining monologues — executed with precision so sharp it leaves the room silent."},
  {id:6,size:"compact",title:"Automotive Brand Spec",subtitle:"High-Velocity · Heritage · Prestige Engineering",tag:"AUTOMOTIVE",tone:"Visceral · Exacting",accentSolid:"#fb923c",src:"/demos/Track6.mp3",description:"Feel the acceleration before the engine starts. Engineered for brands where horsepower and legacy are inseparable — visceral, exacting, impossible to ignore."},
  {id:7,size:"featured",title:"ARIVAL'",subtitle:"Premium Documentary · Continental Narration · Cultural Authority",tag:"SIGNATURE",tone:"Measured · Sovereign",accentSolid:"#22d3ee",src:"/demos/Track7.mp3",description:"There are voices that inform. Then there is ARIVAL' — the standard reserved for productions that demand to be remembered. A narration so precise and culturally fluent it doesn't just deliver content, it consecrates it."},
  {id:8,size:"featured",title:"Luxury AD · Gaming",subtitle:"Next-Gen Console · Cultural Moment · Generational Icon",tag:"LUXURY GAMING",tone:"Epic · Mythic",accentSolid:"#818cf8",src:"/demos/Track8.mp3",description:"When a console defines a generation, its voice must be equally mythic. The read behind a cultural detonation — not a product launch. Crafted to make millions feel summoned into something far greater than a game."},
  {id:9,size:"standard",title:"Financial Power Campaign",subtitle:"Global Payments · Premium Tier · Market Confidence",tag:"FINANCIAL",tone:"Confident · Commanding",accentSolid:"#f97316",src:"/demos/Track9.mp3",description:"The voice behind the transaction that moves markets. Engineered for premium financial campaigns where trust is currency and every word carries the full weight of institutional authority — accepted, everywhere, without question."},
  {id:10,size:"standard",title:"Global Football Campaign",subtitle:"Mass Market · Stadium Energy · Continental Broadcast",tag:"SPORTS",tone:"Explosive · Unifying",accentSolid:"#4ade80",src:"/demos/Track10.mp3",description:"The voice of the beautiful game at its most electric. Built for packed stadiums, continental broadcasts, and billions of fans who demand to feel the match before the whistle blows."},
  {id:11,size:"compact",title:"The Beautiful Game",subtitle:"Continental Campaign · Stadium Authority · Billions Watching",tag:"FOOTBALL",tone:"Electric · Unifying",accentSolid:"#4ade80",src:"/demos/Track11.mp3",description:"The campaign voice for the sport that stops the world. Engineered for tournament anthems and kit launches — a read so charged with energy that the stadium fills before a single player steps onto the pitch."},
  {id:12,size:"compact",title:"Sovereign Motion",subtitle:"Athletic Prestige · Cultural Velocity · Icon Energy",tag:"PRESTIGE SPORT",tone:"Visceral · Iconic",accentSolid:"#facc15",src:"/demos/Track12.mp3",description:"This is what it sounds like when a brand stops selling and starts moving culture. Built for campaigns that don't follow trends — they set them. Fast, sharp, and impossible to ignore."},
];

const REVIEWS = [
  {id:1,quote:"We briefed David on a 90-second luxury automotive spot and he delivered something so authoritative, so immaculately paced, our creative director called it the finest VO work we have ever commissioned.",author:"Isabelle Fontaine",role:"Head of Brand Experience",company:"Maison Lumiere Group",industry:"LUXURY FASHION",accentColor:"#00F2FE",featured:true},
  {id:2,quote:"We needed authority across 14 markets simultaneously. David recorded the full suite in a single session — clean takes, zero direction. He understands what a brand needs before you finish the brief.",author:"Marcus Osei",role:"VP of Global Marketing",company:"Nexora Technologies",industry:"ENTERPRISE TECH",accentColor:"#f59e0b",featured:false},
  {id:3,quote:"Twenty years in the industry and David occupies a category entirely his own. The emotional precision he brought to our documentary series was extraordinary — our editor said the rough cut moved her to tears.",author:"Cynthia Adeyemi",role:"Executive Producer",company:"Meridian Film Studios",industry:"CINEMATIC",accentColor:"#f43f5e",featured:false},
  {id:4,quote:"Our podcast went from 40k to 380k monthly listeners within four months. Retention climbed 67%. The audience DMs us asking about the voice. There is no overstating what the right vocal presence does for audio.",author:"Jordan Calloway",role:"Founder & Host",company:"The Architecture of Thought",industry:"PODCAST",accentColor:"#34d399",featured:false},
  {id:5,quote:"18-hour turnaround on a 3-minute IVR suite. Broadcast-ready, perfectly levelled. We have retained Aura Vocal Studios on an exclusive annual contract since.",author:"Priya Nair",role:"Director of Customer Experience",company:"Stratos Financial Systems",industry:"ENTERPRISE",accentColor:"#f59e0b",featured:false},
  {id:6,quote:"We cast David as lead antagonist in our flagship RPG. The range in a single session — cold calculation to raw menace — had our audio team on their feet. Gamers call it the best villain voice in a decade.",author:"Tomas Reyes",role:"Audio Director",company:"Ironveil Game Studios",industry:"CINEMATIC",accentColor:"#f43f5e",featured:false},
];

const STUDIO = [
  {icon:<MicIcon/>,label:"Broadcast Mic Chain",desc:"Neumann U87 · UA Apollo Interface",color:"#00F2FE"},
  {icon:<WaveIcon/>,label:"Pro Tools · Logic Pro X",desc:"Broadcast-grade DAW suite",color:"#a78bfa"},
  {icon:<ClockIcon/>,label:"Sub-48H Turnaround",desc:"Rush delivery on request",color:"#34d399"},
  {icon:<GlobeIcon/>,label:"Global Clearance",desc:"WAV · MP3 · Cleared in all territories",color:"#f59e0b"},
];

const WHY = [
  {label:"Single-Source Casting",desc:"No agents. No delays. No coordination tax. One voice with total command — the decision that eliminates every downstream creative complication."},
  {label:"Broadcast Quality Always",desc:"48kHz WAV, noise-treated, broadcast-clean — every single file. Technical quality has never once required a revision. Not here."},
  {label:"Remote Directed Sessions",desc:"Source-Connect and live Zoom direction, anywhere on earth. Your creative vision executes in real time — no timezone, no geography, no friction."},
  {label:"Zero Briefing Friction",desc:"David internalises brand intent before the brief is finished. The majority of clients receive a first-pass final. That is not an exception — it is the standard."},
];

const WHY_CLIENTS = [
  {icon:"◈",label:"Strategic Voice Direction",desc:"Every session begins with intent. David internalises your brand's creative architecture before a single word is recorded — ensuring the delivery is not just technically correct, but strategically precise.",color:"#00F2FE"},
  {icon:"◉",label:"Broadcast-Quality Production",desc:"Neumann U87 through a UA Apollo interface, treated acoustically, mastered broadcast-clean. Every delivered file meets the technical spec for network, cinema, and global digital distribution.",color:"#a78bfa"},
  {icon:"◎",label:"Sub-48H Turnaround",desc:"Most campaigns receive a first-pass final within 24 hours. Rush turnaround available on request. Your deadline is not a negotiation — it is a commitment that gets met.",color:"#34d399"},
  {icon:"◇",label:"Commercial Storytelling",desc:"The line between narration and performance is where campaigns are won. David brings a cinematic intelligence to every script — understanding what the audience needs to feel, not just hear.",color:"#f59e0b"},
  {icon:"◈",label:"Collaborative Workflow",desc:"Remote directed sessions via Source-Connect and Zoom. Full revision rounds included. A communication standard that makes your creative director's job effortless from brief to sign-off.",color:"#f43f5e"},
  {icon:"◉",label:"Enterprise-Level Professionalism",desc:"NDAs executed. Rights cleared globally. File formats delivered to spec. The administrative precision that Fortune 500 procurement teams require — handled before you have to ask.",color:"#fb923c"},
];

const CASE_STUDIES = [
  {
    id:"cs1",
    tag:"SPEC · COMMERCIAL",
    category:"Global Sports Campaign",
    title:"We Don't Play. We Prevail.",
    brief:"A continental football broadcast network required a campaign voice capable of carrying the weight of tournament authority — aggressive enough to ignite stadiums, precise enough to land on 200 million households simultaneously.",
    direction:"The brief demanded a read that began in silence, built through controlled intensity, and detonated on the final line. Tone reference: the moment before kickoff. Not what the crowd sounds like — what the air sounds like.",
    execution:"Delivered in a single session. Three takes, three distinct intensity curves. The selected performance opens on near-silence — a deliberate breath — before a 12-word escalation that lands like a final whistle. Broadcast-ready in 18 minutes.",
    outcome:"Proof of range across stadium, broadcast, and campaign formats. The read now anchors the commercial demo reel and has generated direct inquiries from two sports media producers.",
    accent:"#4ade80",
    accentDim:"#4ade8022",
    stat:"18 min",
    statLabel:"Session to broadcast-ready",
    mailto:CORPORATE_MAILTO,
  },
  {
    id:"cs2",
    tag:"SPEC · CINEMATIC",
    category:"Premium Documentary Narration",
    title:"ARIVAL' — The Continental Voice",
    brief:"A prestige documentary format demanded a narrator with the cultural fluency and tonal authority to carry serious subject matter without condescension — the kind of voice that consecrates rather than merely presents.",
    direction:"The direction was restraint at full power. Every sentence treated as a complete thought. Breath as punctuation. Pace dictated by meaning, not rhythm. Reference: the moment a great film stops explaining and simply shows.",
    execution:"Seven-minute narration across four movement sections — each a tonal shift requiring distinct emotional calibration. From measured authority to intimate revelation to quiet devastation to resolution. Clean in two takes.",
    outcome:"This performance now defines the ARIVAL' demo category — a standard against which cinematic and documentary commissions are briefed. Produced as a standalone showcase of long-form narrative range.",
    accent:"#22d3ee",
    accentDim:"#22d3ee22",
    stat:"7 min",
    statLabel:"Long-form narrative, clean in 2 takes",
    mailto:PREMIUM_MAILTO,
  },
  {
    id:"cs3",
    tag:"SPEC · ENTERPRISE",
    category:"Luxury Automotive Brand",
    title:"Sovereign Motion",
    brief:"A European automotive brand (spec) required a voice that could carry the weight of engineering heritage and design prestige — without the generic gravitas that has made most automotive VO indistinguishable.",
    direction:"The read had to feel like the car moves: precise, inevitable, without excess. Every adjective earned. Silence used as texture. The final line delivered as statement, not declaration — the difference between confidence and performance.",
    execution:"90-second script, three distinct tonal passes: heritage-led, performance-led, design-led. Each positioned for a different media placement — broadcast trailer, digital campaign, showroom experience. Delivered to spec in one session.",
    outcome:"Demonstrates the technical breadth required for premium automotive — a category where brand safety and vocal precision are non-negotiable. Flagship automotive demo, available on request.",
    accent:"#fb923c",
    accentDim:"#fb923c22",
    stat:"3",
    statLabel:"Distinct tonal passes, one session",
    mailto:EXCLUSIVE_MAILTO,
  },
];

const PRICING_TIERS = [
  {
    tier:"Corporate Strategy Project",
    tag:"ENTRY ENGAGEMENT",
    from:"$8,000–$15,000",
    link:CORPORATE_FORM,
    mailto:CORPORATE_MAILTO,
    desc:"Single-deliverable commercial campaigns — product launches, brand spots, digital advertising. Broadcast-ready WAV and MP3. Global territory clearance. One revision round included. Final scope determined by script length, usage rights, and distribution.",
    includes:["Script up to 90 seconds","Broadcast-quality WAV + MP3","Global distribution rights","One revision round","48H standard turnaround"],
    accent:"#00F2FE",
    highlight:false,
  },
  {
    tier:"Premium Strategy Project",
    tag:"ENTERPRISE",
    from:"$30,000–$50,000",
    link:PREMIUM_FORM,
    mailto:PREMIUM_MAILTO,
    desc:"Multi-deliverable campaign packages — brand campaigns with multiple executions, IVR suites, enterprise narration series, or gaming and cinematic projects requiring session depth and creative direction.",
    includes:["Multiple deliverables or extended script","Full session direction included","Broadcast + streaming formatted delivery","Unlimited revisions within scope","Priority 24H turnaround","Source-Connect remote session available"],
    accent:"#a78bfa",
    highlight:true,
  },
  {
    tier:"Exclusive Strategy Production",
    tag:"PINNACLE",
    from:"$50,000–$100,000",
    link:EXCLUSIVE_FORM,
    mailto:EXCLUSIVE_MAILTO,
    desc:"The complete production engagement — full campaign suites, global brand launches, AAA gaming productions, and cinematic commissions where the brand cannot afford a single frame of audio below the standard. Bespoke terms. Dedicated availability.",
    includes:["Full campaign suite delivery","Brand voice architecture consultation","Global territory clearance","Direct creative partnership","NDA and exclusivity available","Priority scheduling — dedicated session allocation"],
    accent:"#f59e0b",
    highlight:false,
  },
];

const fmt = s => {
  if(!isFinite(s)||isNaN(s)) return "0:00";
  return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,"0")}`;
};

const DemoCard = ({demo,isPlaying,onToggle,isDark}) => {
  const audioRef = useRef(null);
  const scrubRef = useRef(null);
  const [cur,setCur] = useState(0);
  const [dur,setDur] = useState(0);
  const acc = demo.accentSolid;

  useEffect(()=>{
    const a=audioRef.current; if(!a) return;
    if(isPlaying) a.play().catch(()=>{}); else a.pause();
  },[isPlaying]);

  useEffect(()=>{
    const a=audioRef.current; if(!a) return;
    const t=()=>setCur(a.currentTime);
    const m=()=>setDur(a.duration);
    const e=()=>{setCur(0);onToggle();};
    a.addEventListener("timeupdate",t);
    a.addEventListener("loadedmetadata",m);
    a.addEventListener("durationchange",m);
    a.addEventListener("ended",e);
    return()=>{
      a.removeEventListener("timeupdate",t);
      a.removeEventListener("loadedmetadata",m);
      a.removeEventListener("durationchange",m);
      a.removeEventListener("ended",e);
    };
  },[onToggle]);

  const seek=useCallback(e=>{
    const a=audioRef.current,b=scrubRef.current;
    if(!a||!b||!dur) return;
    const r=b.getBoundingClientRect();
    a.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*dur;
    setCur(a.currentTime);
  },[dur]);

  const pct=dur?(cur/dur)*100:0;
  const isFeatured=demo.size==="featured";
  const isCompact=demo.size==="compact";
  const tp=isDark?"#FFFFFF":"#0A0A0F";
  const tm=isDark?"#8B9CC0":"#374151";
  const ts=isDark?"#475569":"#9CA3AF";

  return (
    <div style={{
      position:"relative",overflow:"hidden",borderRadius:"20px",
      padding:isCompact?"20px":"26px",
      display:"flex",flexDirection:"column",gap:isCompact?"12px":"16px",
      minHeight:isFeatured?"220px":isCompact?"170px":"190px",
      background:isDark?(isPlaying?"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))":"rgba(255,255,255,0.025)"):(isPlaying?"rgba(255,255,255,0.95)":"rgba(255,255,255,0.75)"),
      border:`1px solid ${isPlaying?acc+"60":isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.09)"}`,
      boxShadow:isPlaying?`0 0 0 1px ${acc}28,0 20px 60px ${acc}20,0 4px 20px rgba(0,0,0,0.4)`:isDark?"0 8px 32px rgba(0,0,0,0.5)":"0 4px 24px rgba(0,0,0,0.07)",
      backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",
      transition:"border-color 0.4s ease,box-shadow 0.4s ease",
    }}>
      <audio ref={audioRef} src={demo.src} preload="metadata"/>
      <div style={{position:"absolute",top:"-50px",right:"-50px",width:"200px",height:"200px",borderRadius:"50%",background:`radial-gradient(circle,${acc}${isPlaying?"44":"16"} 0%,transparent 70%)`,filter:"blur(32px)",pointerEvents:"none",transition:"background 0.6s ease"}}/>
      {isPlaying&&<div style={{position:"absolute",bottom:"-40px",left:"-40px",width:"160px",height:"160px",borderRadius:"50%",background:"radial-gradient(circle,#4FACFE28 0%,transparent 70%)",filter:"blur(28px)",pointerEvents:"none",animation:"pulseGlow 3.5s ease-in-out infinite"}}/>}

      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",gap:"12px"}}>
        <div style={{flex:1,minWidth:0}}>
          <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"9px",flexWrap:"wrap"}}>
            <span style={{display:"inline-block",fontSize:"8px",letterSpacing:"0.22em",fontWeight:700,padding:"3px 10px",borderRadius:"9999px",color:acc,background:`${acc}1A`,border:`1px solid ${acc}45`}}>{demo.tag}</span>
            <span style={{fontSize:"9px",letterSpacing:"0.09em",color:isDark?"rgba(255,255,255,0.28)":"rgba(0,0,0,0.38)"}}>{demo.tone}</span>
          </div>
          <h3 style={{fontFamily:"'Cormorant Garamond',Georgia,serif",fontWeight:700,lineHeight:1.15,margin:0,fontSize:isFeatured?"22px":isCompact?"15.5px":"18px",color:tp,letterSpacing:"-0.01em"}}>{demo.title}</h3>
          <p style={{fontSize:"11px",color:ts,marginTop:"3px",letterSpacing:"0.02em",fontFamily:"'DM Sans',sans-serif"}}>{demo.subtitle}</p>
        </div>
        <button onClick={onToggle} aria-label={isPlaying?"Pause":"Play"} style={{flexShrink:0,width:isCompact?"42px":"48px",height:isCompact?"42px":"48px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:isPlaying?`linear-gradient(135deg,${acc},${acc}cc)`:"transparent",border:`1.5px solid ${acc}`,color:isPlaying?"#000":acc,cursor:"pointer",transition:"all 0.3s ease",boxShadow:isPlaying?`0 0 22px ${acc}90,0 0 44px ${acc}38`:"none",transform:isPlaying?"scale(1.07)":"scale(1)"}}>
          {isPlaying?<PauseIcon/>:<PlayIcon/>}
        </button>
      </div>

      {!isCompact&&<p style={{fontSize:isFeatured?"12.5px":"12px",lineHeight:1.75,color:tm,margin:0,fontFamily:"'DM Sans',sans-serif",fontWeight:300}}>{demo.description}</p>}

      <Waveform isPlaying={isPlaying} accent={acc}/>

      <div style={{fontFamily:"'DM Sans',sans-serif"}}>
        <div ref={scrubRef} onClick={seek} style={{width:"100%",height:"16px",display:"flex",alignItems:"center",cursor:"pointer"}}>
          <div style={{width:"100%",height:"3px",borderRadius:"9999px",position:"relative",background:isDark?"rgba(255,255,255,0.08)":"rgba(0,0,0,0.1)"}}>
            <div style={{position:"absolute",left:0,top:0,height:"100%",borderRadius:"9999px",width:`${pct}%`,background:isPlaying?`linear-gradient(90deg,${acc},${acc}bb)`:acc+"55",boxShadow:isPlaying?`0 0 10px ${acc}99`:"none",transition:"width 0.2s linear"}}/>
            {pct>0&&<div style={{position:"absolute",top:"50%",transform:"translateY(-50%)",left:`calc(${pct}% - 5px)`,width:"10px",height:"10px",borderRadius:"50%",background:acc,boxShadow:`0 0 10px ${acc}bb`,transition:"left 0.2s linear"}}/>}
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",fontSize:"10px",color:ts,marginTop:"4px"}}>
          <span>{fmt(cur)}</span>
          <span>{dur?fmt(dur):"--:--"}</span>
        </div>
      </div>
    </div>
  );
};

const CatLabel = ({label,isDark}) => (
  <div style={{marginBottom:"12px",marginTop:"8px"}}>
    <span style={{fontFamily:"'DM Sans',sans-serif",fontSize:"9px",letterSpacing:"0.3em",fontWeight:700,color:isDark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)",textTransform:"uppercase"}}>{label}</span>
  </div>
);

export default function AuraVocalStudios() {
  const [isDark,setIsDark] = useState(true);
  const [playingId,setPlayingId] = useState(null);
  const [scrolled,setScrolled] = useState(false);
  const [showAbout,setShowAbout] = useState(false);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn);
    return()=>window.removeEventListener("scroll",fn);
  },[]);

  useEffect(()=>{
    (function(c,l,a,r,i,t,y){
      c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
      t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
      y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window,document,"clarity","script","x24z4zyqz6");
  },[]);

  const toggle=useCallback(id=>setPlayingId(p=>p===id?null:id),[]);

  const bg=isDark?"#050505":"#F8F9FC";
  const tp=isDark?"#FFFFFF":"#0A0A0F";
  const tm=isDark?"#94A3B8":"#4B5563";
  const ts=isDark?"#475569":"#6B7280";
  const border=isDark?"rgba(255,255,255,0.055)":"rgba(0,0,0,0.09)";
  const glass=isDark?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.78)";
  const navBg=isDark?`rgba(5,5,5,${scrolled?0.95:0.65})`:`rgba(248,249,252,${scrolled?0.97:0.80})`;

  return (
    <div style={{background:bg,color:tp,minHeight:"100vh",fontFamily:"'Cormorant Garamond',Georgia,serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        ::-webkit-scrollbar{width:4px;background:transparent;}
        ::-webkit-scrollbar-thumb{background:rgba(0,242,254,0.28);border-radius:2px;}
        @keyframes pulseGlow{0%,100%{opacity:0.45;}50%{opacity:1;}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(30px);}to{opacity:1;transform:translateY(0);}}
        @keyframes orb1{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(38px,-28px) scale(1.07);}}
        @keyframes orb2{0%,100%{transform:translate(0,0) scale(1);}50%{transform:translate(-28px,38px) scale(1.05);}}
        @keyframes rotateRing{from{transform:rotate(0deg);}to{transform:rotate(360deg);}}
        @keyframes shimmer{0%{background-position:-200% 0;}100%{background-position:200% 0;}}
        @keyframes borderGlow{0%,100%{opacity:0.5;}50%{opacity:1;}}
        @keyframes slideInLeft{from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0);}}
        @keyframes countUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
        @keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        @keyframes floatCard{0%,100%{transform:translateY(0);}50%{transform:translateY(-7px);}}
        @keyframes wave{from{transform:scaleY(1);}to{transform:scaleY(1.9);}}
        .fu{animation:fadeUp 0.9s cubic-bezier(0.22,1,0.36,1) both;}
        .fu1{animation-delay:0.07s;}.fu2{animation-delay:0.20s;}.fu3{animation-delay:0.35s;}.fu4{animation-delay:0.50s;}
        .sans{font-family:'DM Sans',sans-serif;}
        .serif{font-family:'Cormorant Garamond',Georgia,serif;}
        .shimmer-btn{background:linear-gradient(90deg,#00F2FE 0%,#4FACFE 40%,#00F2FE 60%,#4FACFE 100%);background-size:200% 100%;animation:shimmer 3.2s linear infinite;}
        .marquee-row{animation:marquee 58s linear infinite;display:flex;width:max-content;}
        .marquee-row:hover{animation-play-state:paused;}
        .lift{transition:transform 0.35s cubic-bezier(0.22,1,0.36,1),box-shadow 0.35s ease;}
        .lift:hover{transform:translateY(-4px);}
        .float{animation:floatCard 6s ease-in-out infinite;}
        a,button{cursor:pointer;}
        .glass-card{backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);}
        @media(max-width:900px){
          .trust-split{grid-template-columns:1fr!important;}
          .trust-stats{grid-template-columns:1fr 1fr!important;}
          .demo-12{grid-template-columns:1fr!important;}
          .demo-12 > div[style*="span 7"],.demo-12 > div[style*="span 5"],.demo-12 > div[style*="span 6"],.demo-12 > div[style*="span 4"],.demo-12 > div[style*="span 12"]{grid-column:span 12!important;}
        }
        @media(max-width:600px){
          .hero-profile{display:none!important;}
          .trust-stats{grid-template-columns:1fr 1fr!important;}
          .pricing-grid{grid-template-columns:1fr!important;}
        }
      `}</style>

      <div style={{position:"fixed",inset:0,pointerEvents:"none",overflow:"hidden",zIndex:0}}>
        <div style={{position:"absolute",top:"-18%",left:"-14%",width:"58vw",height:"58vw",borderRadius:"50%",background:isDark?"radial-gradient(circle,#00F2FE09,transparent 70%)":"radial-gradient(circle,#6366F111,transparent 70%)",animation:"orb1 20s ease-in-out infinite"}}/>
        <div style={{position:"absolute",bottom:"-18%",right:"-10%",width:"52vw",height:"52vw",borderRadius:"50%",background:isDark?"radial-gradient(circle,#4FACFE07,transparent 70%)":"radial-gradient(circle,#818CF80E,transparent 70%)",animation:"orb2 24s ease-in-out infinite"}}/>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"2px",height:"38vh",background:"linear-gradient(180deg,#00F2FE30,transparent)",opacity:isDark?0.7:0.2}}/>
      </div>

      <div style={{position:"relative",zIndex:1}}>

        {/* NAV */}
        <nav style={{position:"fixed",top:0,left:0,right:0,zIndex:200,backdropFilter:"blur(28px) saturate(200%)",WebkitBackdropFilter:"blur(28px) saturate(200%)",background:navBg,borderBottom:`1px solid ${border}`,boxShadow:scrolled?(isDark?"0 4px 40px rgba(0,0,0,0.7)":"0 4px 24px rgba(0,0,0,0.07)"):"none",transition:"background 0.4s ease,box-shadow 0.4s ease"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 28px",height:"64px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div className="serif" style={{letterSpacing:"0.2em",fontSize:"12.5px",fontWeight:600,color:tp,userSelect:"none"}}>AURA<span style={{color:"#00F2FE",margin:"0 6px",filter:"drop-shadow(0 0 6px #00F2FE88)"}}>◆</span>VOCAL STUDIOS</div>
            <div style={{display:"flex",alignItems:"center",gap:"14px"}}>
              <button onClick={()=>setIsDark(d=>!d)} className="sans" style={{display:"flex",alignItems:"center",gap:"7px",padding:"7px 16px",borderRadius:"100px",border:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.05)",color:tm,fontSize:"11.5px",cursor:"pointer",transition:"all 0.3s ease",letterSpacing:"0.04em"}}>
                {isDark?<SunIcon/>:<MoonIcon/>}<span>{isDark?"Light":"Dark"}</span>
              </button>
              <a href="#work" className="sans" style={{padding:"9px 18px",borderRadius:"100px",border:`1px solid ${border}`,background:"transparent",color:tm,fontSize:"11.5px",textDecoration:"none",letterSpacing:"0.06em",fontWeight:500,transition:"all 0.3s ease"}} onMouseEnter={e=>{e.currentTarget.style.color=tp;e.currentTarget.style.borderColor="#00F2FE44";}} onMouseLeave={e=>{e.currentTarget.style.color=tm;e.currentTarget.style.borderColor=border;}}>Work</a>
              <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" className="sans shimmer-btn" style={{padding:"9px 24px",borderRadius:"100px",color:"#000",fontWeight:700,fontSize:"12px",letterSpacing:"0.07em",textDecoration:"none",display:"inline-block",boxShadow:"0 0 28px rgba(0,242,254,0.38)",transition:"transform 0.3s ease,box-shadow 0.3s ease"}} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 44px rgba(0,242,254,0.65)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 28px rgba(0,242,254,0.38)";}}>Commission a Session</a>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section style={{paddingTop:"156px",paddingBottom:"112px",paddingLeft:"28px",paddingRight:"28px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"72px",alignItems:"center"}}>
            <div>
              <div className="sans fu fu1" style={{display:"inline-flex",alignItems:"center",gap:"10px",marginBottom:"30px"}}>
                <div style={{width:"34px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
                <span style={{fontSize:"9.5px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700}}>THE DEFINITIVE STANDARD IN VOICE PERFORMANCE</span>
                <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"#00F2FE",boxShadow:"0 0 10px #00F2FE",animation:"pulseGlow 2.2s ease-in-out infinite"}}/>
              </div>
              <h1 className="serif fu fu2" style={{fontSize:"clamp(40px,5.8vw,82px)",fontWeight:700,lineHeight:1.04,letterSpacing:"-0.03em",marginBottom:"28px",color:tp}}>
                The Voice That<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:isDark?"rgba(255,255,255,0.48)":"rgba(10,10,15,0.38)"}}>Defines Market</span>
                <br/>Categories.
              </h1>
              <p className="sans fu fu3" style={{fontSize:"15px",lineHeight:1.82,color:tm,maxWidth:"520px",marginBottom:"48px",fontWeight:300}}>
                Not a voice-over agency. A market instrument. <span style={{color:tp,fontWeight:500}}>David Chidera Nwaibe</span> — the voice that global enterprises, cinematic studios, and category-defining brands deploy when the brief demands nothing short of absolute authority. One source. Unmatched precision. Permanent cultural impact.
              </p>
              <div className="fu fu4" style={{display:"flex",alignItems:"center",gap:"14px",flexWrap:"wrap"}}>
                <a href={BOOKING_LINK} target="_blank" rel="noopener noreferrer" className="sans shimmer-btn" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"15px 38px",borderRadius:"100px",color:"#000",fontWeight:700,fontSize:"13px",letterSpacing:"0.08em",textDecoration:"none",boxShadow:"0 0 52px rgba(0,242,254,0.38)",transition:"transform 0.3s ease,box-shadow 0.3s ease"}} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 70px rgba(0,242,254,0.62)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 52px rgba(0,242,254,0.38)";}}>Commission a Session <LinkIcon/></a>
                <a href={MAILTO_LINK} className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"14px 30px",borderRadius:"100px",border:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.03)":"rgba(0,0,0,0.04)",color:tm,fontSize:"13px",letterSpacing:"0.05em",textDecoration:"none",transition:"all 0.3s ease"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE50";e.currentTarget.style.color=tp;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=tm;}}><MailIcon/> Direct Line</a>
              </div>
              <div className="fu fu4" style={{display:"flex",gap:"40px",marginTop:"60px",paddingTop:"38px",borderTop:`1px solid ${border}`,flexWrap:"wrap"}}>
                {[["80+","Projects Delivered"],["5+ Yrs","Industry Experience"],["12","Performance Categories"],["<48H","Turnaround Standard"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="serif" style={{fontSize:"30px",fontWeight:700,color:tp,lineHeight:1,letterSpacing:"-0.02em"}}>{n}</div>
                    <div className="sans" style={{fontSize:"10.5px",color:ts,marginTop:"6px",letterSpacing:"0.1em",fontWeight:500,textTransform:"uppercase"}}>{l}</div>
                  </div>
                ))}
              </div>
              <div className="fu fu4" style={{marginTop:"48px",padding:"18px 24px",borderRadius:"14px",background:isDark?"rgba(255,255,255,0.028)":"rgba(255,255,255,0.85)",border:`1px solid ${border}`,backdropFilter:"blur(16px)",display:"flex",alignItems:"center",gap:"18px",flexWrap:"wrap"}}>
                <div style={{display:"flex",gap:"3px"}}>{[1,2,3,4,5].map(s=><StarIcon key={s}/>)}</div>
                <div className="sans" style={{fontSize:"12px",color:isDark?tm:"#374151",fontWeight:300,flex:1}}>
                  <span style={{color:tp,fontWeight:500}}>"The finest VO work we have ever commissioned."</span>
                  <span style={{color:ts,marginLeft:"10px",fontSize:"11px"}}>— Head of Brand Experience, Maison Lumiere Group</span>
                </div>
                <span className="sans" style={{fontSize:"8.5px",letterSpacing:"0.18em",fontWeight:700,color:"#00F2FE",background:"rgba(0,242,254,0.09)",border:"1px solid rgba(0,242,254,0.2)",padding:"4px 12px",borderRadius:"100px",whiteSpace:"nowrap"}}>LUXURY FASHION</span>
              </div>
            </div>
            <div style={{position:"relative",flexShrink:0,width:"290px",height:"290px"}}>
              <div style={{position:"absolute",inset:"-22px",border:"1px dashed rgba(0,242,254,0.18)",borderRadius:"50%",animation:"rotateRing 26s linear infinite"}}>
                <div style={{position:"absolute",top:"-5px",left:"50%",transform:"translateX(-50%)",width:"10px",height:"10px",borderRadius:"50%",background:"#00F2FE",boxShadow:"0 0 18px #00F2FE,0 0 32px #00F2FE55"}}/>
              </div>
              <div style={{position:"absolute",inset:"-50px",border:"1px dashed rgba(79,172,254,0.07)",borderRadius:"50%",animation:"rotateRing 42s linear infinite reverse"}}/>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,242,254,0.14) 0%,transparent 70%)",animation:"pulseGlow 4.5s ease-in-out infinite"}}/>
              <div style={{position:"absolute",inset:0,borderRadius:"50%",overflow:"hidden",border:`1px solid ${border}`,backdropFilter:"blur(12px)"}}>
                <img src={PROFILE_IMG} alt="David Chidera Nwaibe" style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}/>
              </div>
              <div className="sans" style={{position:"absolute",bottom:"-18px",left:"50%",transform:"translateX(-50%)",whiteSpace:"nowrap",padding:"6px 20px",borderRadius:"100px",fontSize:"9px",letterSpacing:"0.2em",fontWeight:600,background:isDark?"rgba(5,5,5,0.9)":"rgba(255,255,255,0.95)",border:`1px solid ${border}`,color:"#00F2FE",backdropFilter:"blur(16px)"}}>CREATIVE DIRECTOR</div>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section style={{padding:"100px 28px",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.012)":"rgba(0,0,0,0.012)"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"60px"}}>
              <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"14px"}}>THE OPERATING STANDARD</div>
              <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,50px)",fontWeight:700,color:tp,lineHeight:1.1,letterSpacing:"-0.025em"}}>
                Why the World's Biggest<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Campaigns End Here</span>
              </h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:"18px"}}>
              {WHY.map((w,i)=>{
                const accentCols=["#00F2FE","#a78bfa","#34d399","#f59e0b"];
                const ac=accentCols[i%accentCols.length];
                return(
                <div key={i} className="lift glass-card" style={{
                  position:"relative",overflow:"hidden",
                  padding:"32px 28px",borderRadius:"20px",
                  background:isDark?"rgba(255,255,255,0.022)":"rgba(255,255,255,0.82)",
                  border:`1px solid ${border}`,
                  boxShadow:isDark?"0 8px 32px rgba(0,0,0,0.4)":"0 4px 20px rgba(0,0,0,0.06)",
                  transition:"border-color 0.35s ease, box-shadow 0.35s ease",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=ac+"44";e.currentTarget.style.boxShadow=`0 20px 56px ${ac}12,0 4px 20px rgba(0,0,0,0.35)`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.boxShadow=isDark?"0 8px 32px rgba(0,0,0,0.4)":"0 4px 20px rgba(0,0,0,0.06)";}}>
                  <div style={{position:"absolute",top:0,right:0,width:"100px",height:"100px",background:`radial-gradient(circle at 80% 20%,${ac}0E,transparent 70%)`,pointerEvents:"none"}}/>
                  <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"14px"}}>
                    <div style={{width:"36px",height:"36px",borderRadius:"10px",flexShrink:0,background:`linear-gradient(135deg,${ac}1A,${ac}08)`,border:`1px solid ${ac}33`,display:"flex",alignItems:"center",justifyContent:"center",color:ac}}><CheckIcon/></div>
                    <div className="sans" style={{fontSize:"12px",fontWeight:700,color:tp,letterSpacing:"0.05em",textTransform:"uppercase",lineHeight:1.3}}>{w.label}</div>
                  </div>
                  <p className="sans" style={{fontSize:"12.5px",color:isDark?tm:"#374151",lineHeight:1.75,fontWeight:300,margin:0}}>{w.desc}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* DEMO CARDS */}
        <section id="work" style={{padding:"100px 28px 120px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{marginBottom:"56px"}}>
            <div className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
              <div style={{width:"24px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
              <span style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700}}>THE SOVEREIGN COLLECTION</span>
            </div>
            <h2 className="serif" style={{fontSize:"clamp(28px,4vw,52px)",fontWeight:700,color:tp,lineHeight:1.1,letterSpacing:"-0.02em"}}>
              Twelve Chambers<br/>
              <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>of Sonic Authority</span>
            </h2>
            <p className="sans" style={{fontSize:"14px",color:tm,marginTop:"16px",maxWidth:"600px",lineHeight:1.78,fontWeight:300}}>Twelve categories. Twelve markets. One voice that dominates them all. These are not demonstrations — they are deployable instruments of market authority. Press play. Hear what sovereign sounds like.</p>
          </div>

          <CatLabel label="I — Luxury & Commercial" isDark={isDark}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px",marginBottom:"40px"}}>
            <div style={{gridColumn:"span 7"}}><DemoCard demo={DEMOS[0]} isPlaying={playingId===DEMOS[0].id} onToggle={()=>toggle(DEMOS[0].id)} isDark={isDark}/></div>
            <div style={{gridColumn:"span 5",display:"flex",flexDirection:"column",gap:"16px"}}>
              <DemoCard demo={DEMOS[1]} isPlaying={playingId===DEMOS[1].id} onToggle={()=>toggle(DEMOS[1].id)} isDark={isDark}/>
              <DemoCard demo={DEMOS[2]} isPlaying={playingId===DEMOS[2].id} onToggle={()=>toggle(DEMOS[2].id)} isDark={isDark}/>
            </div>
            <div style={{gridColumn:"span 12"}}><DemoCard demo={DEMOS[10]} isPlaying={playingId===DEMOS[10].id} onToggle={()=>toggle(DEMOS[10].id)} isDark={isDark}/></div>
          </div>

          <CatLabel label="II — Enterprise, Cinematic & Automotive" isDark={isDark}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px",marginBottom:"40px"}}>
            <div style={{gridColumn:"span 4"}}><DemoCard demo={DEMOS[3]} isPlaying={playingId===DEMOS[3].id} onToggle={()=>toggle(DEMOS[3].id)} isDark={isDark}/></div>
            <div style={{gridColumn:"span 4"}}><DemoCard demo={DEMOS[4]} isPlaying={playingId===DEMOS[4].id} onToggle={()=>toggle(DEMOS[4].id)} isDark={isDark}/></div>
            <div style={{gridColumn:"span 4"}}><DemoCard demo={DEMOS[5]} isPlaying={playingId===DEMOS[5].id} onToggle={()=>toggle(DEMOS[5].id)} isDark={isDark}/></div>
          </div>

          <CatLabel label="III — ARIVAL', Gaming & Prestige" isDark={isDark}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px",marginBottom:"40px"}}>
            <div style={{gridColumn:"span 6"}}><DemoCard demo={DEMOS[6]} isPlaying={playingId===DEMOS[6].id} onToggle={()=>toggle(DEMOS[6].id)} isDark={isDark}/></div>
            <div style={{gridColumn:"span 6"}}><DemoCard demo={DEMOS[7]} isPlaying={playingId===DEMOS[7].id} onToggle={()=>toggle(DEMOS[7].id)} isDark={isDark}/></div>
          </div>

          <CatLabel label="IV — Financial & Sports" isDark={isDark}/>
          <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:"16px"}}>
            <div style={{gridColumn:"span 5"}}><DemoCard demo={DEMOS[8]} isPlaying={playingId===DEMOS[8].id} onToggle={()=>toggle(DEMOS[8].id)} isDark={isDark}/></div>
            <div style={{gridColumn:"span 7"}}><DemoCard demo={DEMOS[9]} isPlaying={playingId===DEMOS[9].id} onToggle={()=>toggle(DEMOS[9].id)} isDark={isDark}/></div>
            <div style={{gridColumn:"span 12"}}><DemoCard demo={DEMOS[11]} isPlaying={playingId===DEMOS[11].id} onToggle={()=>toggle(DEMOS[11].id)} isDark={isDark}/></div>
          </div>

          <p className="sans" style={{marginTop:"22px",textAlign:"center",fontSize:"10.5px",color:isDark?"rgba(255,255,255,0.16)":"rgba(0,0,0,0.25)",letterSpacing:"0.07em"}}>Twelve chambers · Twelve markets · One voice · Zero compromise</p>
        </section>

        {/* STUDIO */}
        <section style={{padding:"96px 28px",background:isDark?"rgba(255,255,255,0.014)":"rgba(0,0,0,0.012)",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{textAlign:"center",marginBottom:"60px"}}>
              <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"14px"}}>STUDIO CHAIN & DELIVERY</div>
              <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,46px)",fontWeight:700,color:tp,lineHeight:1.12,letterSpacing:"-0.02em"}}>
                Engineered for Perfection.<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>From Chain to Delivery.</span>
              </h2>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"18px"}}>
              {STUDIO.map((s,i)=>(
                <div key={i} className="lift float glass-card" style={{padding:"34px 26px",borderRadius:"20px",textAlign:"center",background:glass,border:`1px solid ${s.color}22`,boxShadow:`0 8px 40px ${s.color}0E`,animationDelay:`${i*0.7}s`}}>
                  <div style={{width:"54px",height:"54px",borderRadius:"16px",margin:"0 auto 18px",background:`linear-gradient(135deg,${s.color}22,${s.color}09)`,border:`1px solid ${s.color}44`,display:"flex",alignItems:"center",justifyContent:"center",color:s.color}}>{s.icon}</div>
                  <div className="sans" style={{fontSize:"13px",fontWeight:600,color:tp,marginBottom:"7px",letterSpacing:"0.01em"}}>{s.label}</div>
                  <div className="sans" style={{fontSize:"11.5px",color:isDark?ts:"#6B7280",fontWeight:300}}>{s.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY CLIENTS CHOOSE AURA */}
        <section style={{padding:"100px 28px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{marginBottom:"60px"}}>
            <div className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
              <div style={{width:"24px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
              <span style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700}}>THE OPERATING PHILOSOPHY</span>
            </div>
            <h2 className="serif" style={{fontSize:"clamp(28px,4vw,54px)",fontWeight:700,color:tp,lineHeight:1.08,letterSpacing:"-0.025em"}}>
              Why Clients Choose<br/>
              <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>Aura Vocal Studios</span>
            </h2>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:"16px"}}>
            {WHY_CLIENTS.map((item,i)=>(
              <div key={i} className="lift glass-card" style={{
                position:"relative",overflow:"hidden",
                padding:"36px 32px",borderRadius:"20px",
                background:isDark?"rgba(255,255,255,0.022)":"rgba(255,255,255,0.82)",
                border:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)"}`,
                boxShadow:isDark?"0 8px 40px rgba(0,0,0,0.45)":"0 6px 28px rgba(0,0,0,0.07)",
                transition:"border-color 0.35s ease, box-shadow 0.35s ease",
              }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=item.color+"55";e.currentTarget.style.boxShadow=`0 16px 56px ${item.color}14,0 4px 20px rgba(0,0,0,0.4)`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.08)";e.currentTarget.style.boxShadow=isDark?"0 8px 40px rgba(0,0,0,0.45)":"0 6px 28px rgba(0,0,0,0.07)";}}>
                <div style={{position:"absolute",top:0,right:0,width:"120px",height:"120px",borderRadius:"0 20px 0 0",background:`radial-gradient(circle at 80% 20%,${item.color}0E,transparent 70%)`,pointerEvents:"none"}}/>
                <div style={{
                  width:"44px",height:"44px",borderRadius:"12px",marginBottom:"22px",
                  background:`linear-gradient(135deg,${item.color}1A,${item.color}08)`,
                  border:`1px solid ${item.color}33`,
                  display:"flex",alignItems:"center",justifyContent:"center",
                  fontSize:"20px",color:item.color,fontFamily:"serif",
                }}>{item.icon}</div>
                <div className="sans" style={{fontSize:"12px",fontWeight:700,color:tp,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:"10px"}}>{item.label}</div>
                <p className="sans" style={{fontSize:"12.5px",lineHeight:1.78,color:isDark?tm:"#374151",fontWeight:300,margin:0}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TRUST ARCHITECTURE */}
        <section style={{padding:"80px 28px",background:isDark?"rgba(255,255,255,0.012)":"rgba(0,0,0,0.012)",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"72px",alignItems:"center"}}>
              <div>
                <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"16px"}}>THE PRODUCTION STANDARD</div>
                <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,46px)",fontWeight:700,color:tp,lineHeight:1.12,letterSpacing:"-0.02em",marginBottom:"28px"}}>
                  Built for Broadcasts<br/>
                  <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>That Cannot Afford to Fail</span>
                </h2>
                <p className="sans" style={{fontSize:"13.5px",lineHeight:1.85,color:tm,fontWeight:300,marginBottom:"36px"}}>
                  Global enterprises, broadcast networks, and category-defining studios commission Aura Vocal Studios because the standard here is not negotiable. Broadcast-quality audio, delivered clean, on time, at the creative level the brief demands — every session, without exception.
                </p>
                <div style={{display:"flex",flexDirection:"column",gap:"16px"}}>
                  {[
                    ["Broadcast-quality audio","48kHz WAV, acoustically treated, noise-floor broadcast-clean — every deliverable meets the technical specification for global network distribution."],
                    ["Commercial-grade delivery","Files formatted to spec: WAV, MP3, stems, or full mix. Rights cleared. Territory unrestricted. Ready to deploy from receipt."],
                    ["Client-first communication","Briefs acknowledged within the hour. Questions answered before session. Creative direction absorbed before the mic opens."],
                    ["Enterprise-ready processes","NDAs executed without hesitation. Invoicing structured for procurement. Workflow documentation available on request."],
                  ].map(([title,body],i)=>(
                    <div key={i} style={{
                      display:"flex",gap:"16px",padding:"20px 24px",borderRadius:"14px",
                      background:isDark?"rgba(255,255,255,0.022)":"rgba(255,255,255,0.82)",
                      border:`1px solid ${border}`,backdropFilter:"blur(16px)",
                    }}>
                      <div style={{width:"20px",height:"20px",borderRadius:"50%",flexShrink:0,background:"rgba(0,242,254,0.12)",border:"1px solid rgba(0,242,254,0.38)",display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2px",color:"#00F2FE"}}><CheckIcon/></div>
                      <div>
                        <div className="sans" style={{fontSize:"12px",fontWeight:600,color:tp,marginBottom:"4px",letterSpacing:"0.02em"}}>{title}</div>
                        <div className="sans" style={{fontSize:"11.5px",color:isDark?ts:"#6B7280",lineHeight:1.68,fontWeight:300}}>{body}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px"}}>
                {[
                  {n:"<48H",l:"Delivery Standard",accent:"#00F2FE",desc:"The turnaround clients cite as a competitive advantage over traditional casting."},
                  {n:"80+",l:"Projects Delivered",accent:"#a78bfa",desc:"From luxury automotive to AAA gaming — one voice commanding every vertical."},
                  {n:"5+",l:"Years of Experience",accent:"#34d399",desc:"Half a decade of performance precision across every major commercial vertical."},
                  {n:"$8K–15K",l:"Starting Engagement",accent:"#f59e0b",desc:"Premium positioning. Transparent entry point. Scoped to every project's exact requirements."},
                ].map((item,i)=>(
                  <div key={i} className="lift" style={{
                    padding:"28px 24px",borderRadius:"18px",
                    background:isDark?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.88)",
                    border:`1px solid ${item.accent}22`,
                    boxShadow:`0 8px 32px ${item.accent}0A`,
                    backdropFilter:"blur(20px)",
                  }}>
                    <div className="serif" style={{fontSize:"clamp(28px,3vw,38px)",fontWeight:700,color:item.accent,lineHeight:1,letterSpacing:"-0.03em",marginBottom:"6px"}}>{item.n}</div>
                    <div className="sans" style={{fontSize:"9.5px",letterSpacing:"0.18em",fontWeight:700,color:tp,textTransform:"uppercase",marginBottom:"8px"}}>{item.l}</div>
                    <div className="sans" style={{fontSize:"11px",color:isDark?ts:"#6B7280",lineHeight:1.65,fontWeight:300}}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CASE STUDIES */}
        <section style={{padding:"100px 28px 112px",background:isDark?"rgba(255,255,255,0.012)":"rgba(0,0,0,0.012)",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`}}>
          <div style={{maxWidth:"1280px",margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"24px",marginBottom:"64px"}}>
              <div>
                <div className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",marginBottom:"16px"}}>
                  <div style={{width:"24px",height:"1px",background:"linear-gradient(90deg,#00F2FE,transparent)"}}/>
                  <span style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700}}>THE WORK</span>
                </div>
                <h2 className="serif" style={{fontSize:"clamp(28px,4vw,54px)",fontWeight:700,color:tp,lineHeight:1.08,letterSpacing:"-0.025em"}}>
                  Campaign Direction<br/>
                  <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>& Creative Process</span>
                </h2>
              </div>
              <p className="sans" style={{fontSize:"13px",color:tm,maxWidth:"340px",lineHeight:1.78,fontWeight:300,textAlign:"right"}}>Every project begins with a brief. These are the briefs that shaped the demos — the creative thinking behind the performance.</p>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:"24px"}}>
              {CASE_STUDIES.map((cs,i)=>(
                <div key={cs.id} className="lift glass-card" style={{
                  position:"relative",overflow:"hidden",
                  borderRadius:"24px",
                  background:isDark?"rgba(255,255,255,0.022)":"rgba(255,255,255,0.88)",
                  border:`1px solid ${isDark?"rgba(255,255,255,0.055)":"rgba(0,0,0,0.08)"}`,
                  backdropFilter:"blur(24px)",
                  boxShadow:isDark?"0 8px 40px rgba(0,0,0,0.45)":"0 6px 28px rgba(0,0,0,0.07)",
                  transition:"border-color 0.4s ease, box-shadow 0.4s ease",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=cs.accent+"55";e.currentTarget.style.boxShadow=`0 24px 64px ${cs.accent}12,0 8px 32px rgba(0,0,0,0.4)`;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.055)":"rgba(0,0,0,0.08)";e.currentTarget.style.boxShadow=isDark?"0 8px 40px rgba(0,0,0,0.45)":"0 6px 28px rgba(0,0,0,0.07)";}}>
                  <div style={{position:"absolute",top:0,right:0,width:"400px",height:"100%",background:`linear-gradient(270deg,${cs.accent}07,transparent)`,pointerEvents:"none"}}/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 280px",gap:"0"}}>
                    <div style={{padding:"44px 48px",borderRight:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)"}`}}>
                      <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"24px",flexWrap:"wrap"}}>
                        <span className="sans" style={{fontSize:"8px",letterSpacing:"0.26em",fontWeight:700,color:cs.accent,background:`${cs.accent}18`,border:`1px solid ${cs.accent}44`,padding:"4px 12px",borderRadius:"100px"}}>{cs.tag}</span>
                        <span className="sans" style={{fontSize:"10px",color:isDark?ts:"#6B7280",letterSpacing:"0.08em",fontWeight:500}}>{cs.category}</span>
                      </div>
                      <h3 className="serif" style={{fontSize:"clamp(22px,2.4vw,32px)",fontWeight:700,color:tp,lineHeight:1.1,letterSpacing:"-0.02em",marginBottom:"32px"}}>{cs.title}</h3>
                      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"20px"}}>
                        {[["THE BRIEF",cs.brief],["THE DIRECTION",cs.direction],["THE EXECUTION",cs.execution],["THE RESULT",cs.outcome]].map(([label,text])=>(
                          <div key={label}>
                            <div className="sans" style={{fontSize:"8.5px",letterSpacing:"0.28em",fontWeight:700,color:cs.accent,marginBottom:"8px"}}>{label}</div>
                            <p className="sans" style={{fontSize:"12px",lineHeight:1.78,color:isDark?tm:"#374151",fontWeight:300,margin:0}}>{text}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{padding:"44px 36px",display:"flex",flexDirection:"column",justifyContent:"space-between",background:isDark?`linear-gradient(135deg,${cs.accentDim},transparent)`:`linear-gradient(135deg,${cs.accentDim},transparent)`}}>
                      <div>
                        <div className="serif" style={{fontSize:"clamp(36px,4vw,52px)",fontWeight:700,color:cs.accent,lineHeight:1,letterSpacing:"-0.03em",marginBottom:"8px"}}>{cs.stat}</div>
                        <div className="sans" style={{fontSize:"10px",letterSpacing:"0.12em",fontWeight:600,color:isDark?ts:"#6B7280",textTransform:"uppercase",lineHeight:1.4,marginBottom:"32px"}}>{cs.statLabel}</div>
                        <div style={{width:"40px",height:"1px",background:`linear-gradient(90deg,${cs.accent},transparent)`,marginBottom:"32px"}}/>
                        <p className="sans" style={{fontSize:"11.5px",lineHeight:1.75,color:isDark?ts:"#6B7280",fontWeight:300,fontStyle:"italic"}}>"Delivered to spec. Broadcast-ready from receipt. No revision required."</p>
                      </div>
                      <a href={cs.mailto} target="_blank" rel="noopener noreferrer" className="sans" style={{
                        display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"8px",
                        marginTop:"32px",padding:"12px 24px",borderRadius:"100px",
                        border:`1.5px solid ${cs.accent}44`,
                        background:`${cs.accent}0E`,color:cs.accent,
                        fontSize:"11px",letterSpacing:"0.07em",fontWeight:700,
                        textDecoration:"none",transition:"all 0.3s ease",
                      }}
                      onMouseEnter={e=>{e.currentTarget.style.background=cs.accent;e.currentTarget.style.color="#000";e.currentTarget.style.borderColor=cs.accent;}}
                      onMouseLeave={e=>{e.currentTarget.style.background=`${cs.accent}0E`;e.currentTarget.style.color=cs.accent;e.currentTarget.style.borderColor=`${cs.accent}44`;}}>Commission Similar Work <LinkIcon/></a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section style={{padding:"100px 28px 112px",maxWidth:"1280px",margin:"0 auto"}}>
          {/* Section header */}
          <div style={{textAlign:"center",marginBottom:"56px"}}>
            <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"14px"}}>INVESTMENT</div>
            <h2 className="serif" style={{fontSize:"clamp(26px,3.5vw,50px)",fontWeight:700,color:tp,lineHeight:1.08,letterSpacing:"-0.025em",marginBottom:"14px"}}>
              Projects Begin at<br/>
              <span style={{fontStyle:"italic",fontWeight:300,color:tm}}>$8,000 – $15,000</span>
            </h2>
            <p className="sans" style={{fontSize:"13px",color:tm,maxWidth:"460px",margin:"0 auto",lineHeight:1.8,fontWeight:300}}>Every engagement is scoped to the project — not templated. These are the starting frameworks.</p>
          </div>

          {/* 3 tier cards */}
          <div className="pricing-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"16px",marginBottom:"16px",alignItems:"stretch"}}>
            {PRICING_TIERS.map((tier,i)=>(
              <div key={i} style={{
                position:"relative",overflow:"hidden",
                borderRadius:"20px",
                padding: tier.highlight ? "1.5px" : "0",
                background: tier.highlight ? `linear-gradient(155deg,${tier.accent}99,${tier.accent}33,transparent)` : "transparent",
              }}>
                <div style={{
                  position:"relative",
                  borderRadius: tier.highlight ? "19px" : "20px",
                  padding:"32px 28px 28px",
                  height:"100%",
                  background:isDark
                    ? tier.highlight ? "rgba(8,8,12,0.98)" : "rgba(255,255,255,0.022)"
                    : tier.highlight ? "rgba(252,252,255,0.99)" : "rgba(255,255,255,0.85)",
                  border: tier.highlight ? "none" : `1px solid ${isDark?"rgba(255,255,255,0.055)":"rgba(0,0,0,0.07)"}`,
                  backdropFilter:"blur(24px)",
                  boxShadow: tier.highlight
                    ? `0 20px 60px ${tier.accent}14,0 4px 20px rgba(0,0,0,0.35)`
                    : isDark ? "0 4px 24px rgba(0,0,0,0.35)" : "0 2px 16px rgba(0,0,0,0.06)",
                  display:"flex",flexDirection:"column",gap:"0",
                  transition:"box-shadow 0.35s ease",
                }}>
                  {tier.highlight && <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:`linear-gradient(90deg,transparent,${tier.accent}88,transparent)`}}/>}
                  <div style={{position:"absolute",top:"-30px",right:"-30px",width:"130px",height:"130px",borderRadius:"50%",background:`radial-gradient(circle,${tier.accent}0C,transparent 70%)`,filter:"blur(24px)",pointerEvents:"none"}}/>

                  {/* Tag + tier name */}
                  <div style={{marginBottom:"20px"}}>
                    <span className="sans" style={{fontSize:"7.5px",letterSpacing:"0.28em",fontWeight:700,color:tier.accent,background:`${tier.accent}14`,border:`1px solid ${tier.accent}38`,padding:"3px 10px",borderRadius:"100px"}}>{tier.tag}</span>
                  </div>
                  <div className="serif" style={{fontSize:"16px",fontWeight:700,color:tp,letterSpacing:"0.02em",marginBottom:"6px",lineHeight:1.2}}>{tier.tier}</div>
                  <div style={{marginBottom:"18px",display:"flex",alignItems:"baseline",gap:"6px",flexWrap:"wrap"}}>
                    <span className="serif" style={{fontSize:"clamp(24px,2.5vw,32px)",fontWeight:700,color:tier.accent,letterSpacing:"-0.03em",lineHeight:1}}>{tier.from}</span>
                    <span className="sans" style={{fontSize:"10px",color:ts,fontWeight:300}}>starting</span>
                  </div>

                  {/* Divider */}
                  <div style={{width:"100%",height:"1px",background:isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.06)",marginBottom:"18px"}}/>

                  <p className="sans" style={{fontSize:"12px",lineHeight:1.78,color:isDark?tm:"#4B5563",fontWeight:300,marginBottom:"20px",flex:1}}>{tier.desc}</p>

                  <ul style={{listStyle:"none",padding:0,margin:"0 0 24px",display:"flex",flexDirection:"column",gap:"8px"}}>
                    {tier.includes.map((item,ii)=>(
                      <li key={ii} style={{display:"flex",alignItems:"flex-start",gap:"9px"}}>
                        <div style={{width:"14px",height:"14px",borderRadius:"50%",flexShrink:0,background:`${tier.accent}14`,border:`1px solid ${tier.accent}38`,display:"flex",alignItems:"center",justifyContent:"center",marginTop:"2px",color:tier.accent}}><CheckIcon/></div>
                        <span className="sans" style={{fontSize:"11.5px",color:isDark?tm:"#4B5563",lineHeight:1.6,fontWeight:300}}>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <a href={tier.link} target="_blank" rel="noopener noreferrer" className={tier.highlight?"sans shimmer-btn":"sans"} style={{
                    display:"inline-flex",alignItems:"center",justifyContent:"center",gap:"7px",
                    padding:"12px 22px",borderRadius:"100px",
                    border: tier.highlight ? "none" : `1px solid ${tier.accent}44`,
                    background: tier.highlight ? undefined : "transparent",
                    color: tier.highlight ? "#000" : tier.accent,
                    fontSize:"11.5px",letterSpacing:"0.07em",fontWeight:700,
                    textDecoration:"none",transition:"all 0.3s ease",
                    boxShadow: tier.highlight ? `0 0 24px ${tier.accent}44` : "none",
                  }}
                  onMouseEnter={e=>{if(!tier.highlight){e.currentTarget.style.background=`${tier.accent}12`;e.currentTarget.style.borderColor=tier.accent;e.currentTarget.style.boxShadow=`0 0 20px ${tier.accent}33`;}}}
                  onMouseLeave={e=>{if(!tier.highlight){e.currentTarget.style.background="transparent";e.currentTarget.style.borderColor=`${tier.accent}44`;e.currentTarget.style.boxShadow="none";}}}>
                    Commission a Session <LinkIcon/>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Retainer / Custom card — full width, distinct treatment */}
          <div style={{
            position:"relative",overflow:"hidden",
            borderRadius:"20px",marginBottom:"20px",
            background:isDark
              ? "linear-gradient(135deg,rgba(255,255,255,0.018),rgba(255,255,255,0.008))"
              : "linear-gradient(135deg,rgba(255,255,255,0.92),rgba(248,248,255,0.80))",
            border:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"}`,
            backdropFilter:"blur(24px)",
            boxShadow:isDark?"0 4px 32px rgba(0,0,0,0.35)":"0 2px 20px rgba(0,0,0,0.06)",
          }}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:"1px",background:"linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)"}}/>
            <div style={{position:"absolute",right:"-80px",top:"-80px",width:"300px",height:"300px",borderRadius:"50%",background:"radial-gradient(circle,rgba(255,255,255,0.03),transparent 70%)",pointerEvents:"none"}}/>

            <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"40px",alignItems:"center",padding:"36px 40px"}}>
              <div style={{display:"grid",gridTemplateColumns:"auto 1fr",gap:"32px",alignItems:"center"}}>
                {/* Left identity block */}
                <div style={{borderRight:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"}`,paddingRight:"32px"}}>
                  <span className="sans" style={{display:"block",fontSize:"7.5px",letterSpacing:"0.28em",fontWeight:700,color:"rgba(255,255,255,0.35)",background:"rgba(255,255,255,0.07)",border:"1px solid rgba(255,255,255,0.1)",padding:"3px 10px",borderRadius:"100px",marginBottom:"12px",width:"fit-content"}}>CUSTOM · RETAINER</span>
                  <div className="serif" style={{fontSize:"20px",fontWeight:700,color:tp,letterSpacing:"-0.01em",lineHeight:1.15,marginBottom:"4px"}}>Bespoke Partnership</div>
                  <div className="sans" style={{fontSize:"11px",color:ts,fontWeight:300,letterSpacing:"0.04em"}}>Annual · Multi-campaign · Exclusive</div>
                </div>

                {/* Right description */}
                <div>
                  <p className="sans" style={{fontSize:"12.5px",lineHeight:1.8,color:isDark?tm:"#4B5563",fontWeight:300,margin:"0 0 16px"}}>
                    For brands that require a consistent, exclusive voice partner across campaigns, product lines, and content series — structured as an annual retainer or multi-project agreement. Terms, availability, and investment scoped entirely around your requirements.
                  </p>
                  <div style={{display:"flex",flexWrap:"wrap",gap:"8px"}}>
                    {["Dedicated session availability","Category or full exclusivity","NDA executed on engagement","Brand voice architecture included","Direct communication channel","Bespoke delivery workflow"].map((f,fi)=>(
                      <span key={fi} className="sans" style={{fontSize:"10.5px",color:isDark?ts:"#6B7280",background:isDark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.04)",border:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"}`,padding:"4px 12px",borderRadius:"100px",fontWeight:300,letterSpacing:"0.02em"}}>{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA block */}
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:"12px",flexShrink:0}}>
                <a href={RETAINER_MAILTO} target="_blank" rel="noopener noreferrer" className="sans" style={{
                  display:"inline-flex",alignItems:"center",gap:"8px",
                  padding:"13px 28px",borderRadius:"100px",
                  border:"1px solid rgba(255,255,255,0.12)",
                  background:"rgba(255,255,255,0.05)",
                  color:isDark?"rgba(255,255,255,0.75)":tp,
                  fontSize:"12px",letterSpacing:"0.07em",fontWeight:600,
                  textDecoration:"none",transition:"all 0.3s ease",
                  whiteSpace:"nowrap",backdropFilter:"blur(12px)",
                }}
                onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.25)";e.currentTarget.style.background="rgba(255,255,255,0.09)";e.currentTarget.style.color=isDark?"#fff":tp;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(255,255,255,0.12)";e.currentTarget.style.background="rgba(255,255,255,0.05)";e.currentTarget.style.color=isDark?"rgba(255,255,255,0.75)":tp;}}>
                  <MailIcon/> Discuss Partnership
                </a>
                <span className="sans" style={{fontSize:"10px",color:ts,letterSpacing:"0.06em",fontWeight:300}}>Response within the business day</span>
              </div>
            </div>
          </div>

          {/* Bottom not-sure bar */}
          <div style={{padding:"24px 32px",borderRadius:"16px",background:"transparent",border:`1px solid ${isDark?"rgba(255,255,255,0.045)":"rgba(0,0,0,0.06)"}`,display:"flex",alignItems:"center",justifyContent:"space-between",gap:"20px",flexWrap:"wrap"}}>
            <div className="sans" style={{fontSize:"12px",color:ts,fontWeight:300,letterSpacing:"0.01em"}}>
              Not sure which tier fits? <span style={{color:isDark?tm:"#374151",fontWeight:400}}>Send the brief — David will scope it personally and respond within the business day.</span>
            </div>
            <a href={MAILTO_LINK} className="sans" style={{display:"inline-flex",alignItems:"center",gap:"7px",padding:"10px 22px",borderRadius:"100px",border:`1px solid ${border}`,background:"transparent",color:tm,fontSize:"11.5px",letterSpacing:"0.06em",fontWeight:500,textDecoration:"none",transition:"all 0.3s ease",whiteSpace:"nowrap"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE44";e.currentTarget.style.color=tp;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=tm;}}><MailIcon/> Send the Brief</a>
          </div>
        </section>

        {/* REVIEWS */}
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
          <div style={{maxWidth:"1280px",margin:"0 auto 28px",padding:"0 28px"}}>
            <div className="lift" style={{position:"relative",overflow:"hidden",borderRadius:"24px",padding:"52px 56px",background:isDark?"linear-gradient(135deg,rgba(0,242,254,0.04),rgba(255,255,255,0.015))":"linear-gradient(135deg,rgba(255,255,255,0.95),rgba(240,248,255,0.9))",border:`1px solid ${isDark?"rgba(0,242,254,0.11)":"rgba(99,102,241,0.14)"}`,backdropFilter:"blur(24px)",boxShadow:isDark?"0 24px 72px rgba(0,0,0,0.45)":"0 16px 48px rgba(0,0,0,0.08)"}}>
              <div style={{position:"absolute",top:"16px",right:"32px",fontSize:"200px",fontFamily:"Georgia,serif",color:"#00F2FE",opacity:0.04,lineHeight:1,pointerEvents:"none"}}>"</div>
              <div style={{display:"grid",gridTemplateColumns:"1fr auto",gap:"44px",alignItems:"center"}}>
                <div>
                  <div style={{display:"flex",gap:"4px",marginBottom:"20px"}}>{[1,2,3,4,5].map(s=><StarIcon key={s}/>)}</div>
                  <blockquote className="serif" style={{fontSize:"clamp(17px,2.2vw,25px)",fontWeight:400,lineHeight:1.68,color:tp,fontStyle:"italic",letterSpacing:"-0.01em"}}>"{REVIEWS[0].quote}"</blockquote>
                </div>
                <div style={{flexShrink:0,textAlign:"right",minWidth:"175px"}}>
                  <div style={{width:"58px",height:"58px",borderRadius:"50%",marginLeft:"auto",marginBottom:"13px",background:"linear-gradient(135deg,#00F2FE22,#4FACFE22)",border:"1px solid rgba(0,242,254,0.28)",display:"flex",alignItems:"center",justifyContent:"center"}}><span className="serif" style={{fontSize:"22px",color:"#00F2FE",fontWeight:600}}>{REVIEWS[0].author.charAt(0)}</span></div>
                  <div className="serif" style={{fontSize:"15px",fontWeight:600,color:tp,marginBottom:"3px"}}>{REVIEWS[0].author}</div>
                  <div className="sans" style={{fontSize:"11px",color:ts,marginBottom:"3px",fontWeight:300}}>{REVIEWS[0].role}</div>
                  <div className="sans" style={{fontSize:"11px",color:ts,fontStyle:"italic",fontWeight:300}}>{REVIEWS[0].company}</div>
                  <span className="sans" style={{display:"inline-block",marginTop:"12px",fontSize:"8.5px",letterSpacing:"0.2em",fontWeight:700,padding:"4px 12px",borderRadius:"100px",color:"#00F2FE",background:"rgba(0,242,254,0.09)",border:"1px solid rgba(0,242,254,0.22)"}}>{REVIEWS[0].industry}</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:0,top:0,bottom:0,width:"100px",zIndex:2,pointerEvents:"none",background:isDark?"linear-gradient(90deg,#050505,transparent)":"linear-gradient(90deg,#F8F9FC,transparent)"}}/>
            <div style={{position:"absolute",right:0,top:0,bottom:0,width:"100px",zIndex:2,pointerEvents:"none",background:isDark?"linear-gradient(270deg,#050505,transparent)":"linear-gradient(270deg,#F8F9FC,transparent)"}}/>
            <div className="marquee-row" style={{gap:"18px",padding:"6px 0"}}>
              {[...REVIEWS.slice(1),...REVIEWS.slice(1)].map((r,idx)=>(
                <div key={`${r.id}-${idx}`} className="lift" style={{flexShrink:0,width:"370px",borderRadius:"18px",padding:"26px 30px",background:isDark?"rgba(255,255,255,0.025)":"rgba(255,255,255,0.88)",border:`1px solid ${isDark?"rgba(255,255,255,0.055)":"rgba(0,0,0,0.07)"}`,backdropFilter:"blur(20px)",boxShadow:isDark?"0 8px 36px rgba(0,0,0,0.45)":"0 6px 24px rgba(0,0,0,0.07)",cursor:"default"}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"14px"}}>
                    <div style={{display:"flex",gap:"3px"}}>{[1,2,3,4,5].map(s=><StarIcon key={s} color={r.accentColor}/>)}</div>
                    <span className="sans" style={{fontSize:"8px",letterSpacing:"0.2em",fontWeight:700,padding:"3px 10px",borderRadius:"100px",color:r.accentColor,background:`${r.accentColor}15`,border:`1px solid ${r.accentColor}30`}}>{r.industry}</span>
                  </div>
                  <blockquote className="serif" style={{fontSize:"13.5px",lineHeight:1.78,color:isDark?tp:"#1A202C",fontStyle:"italic",marginBottom:"18px",letterSpacing:"-0.005em"}}>"{r.quote}"</blockquote>
                  <div style={{display:"flex",alignItems:"center",gap:"12px",paddingTop:"14px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.05)":"rgba(0,0,0,0.07)"}`}}>
                    <div style={{width:"34px",height:"34px",borderRadius:"50%",flexShrink:0,background:`linear-gradient(135deg,${r.accentColor}22,${r.accentColor}08)`,border:`1px solid ${r.accentColor}33`,display:"flex",alignItems:"center",justifyContent:"center"}}><span className="serif" style={{fontSize:"13px",color:r.accentColor,fontWeight:600}}>{r.author.charAt(0)}</span></div>
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

        {/* FINAL CTA */}
        <section style={{padding:"120px 28px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{
            position:"relative",overflow:"hidden",
            borderRadius:"32px",padding:"80px 72px",
            background:isDark?"linear-gradient(135deg,rgba(0,242,254,0.05),rgba(79,172,254,0.03),rgba(255,255,255,0.01))":"linear-gradient(135deg,rgba(255,255,255,0.97),rgba(240,248,255,0.92))",
            border:`1px solid ${isDark?"rgba(0,242,254,0.14)":"rgba(0,242,254,0.2)"}`,
            backdropFilter:"blur(32px)",
            boxShadow:isDark?"0 40px 100px rgba(0,0,0,0.55)":"0 32px 80px rgba(0,0,0,0.1)",
            textAlign:"center",
          }}>
            <div style={{position:"absolute",top:"-80px",left:"50%",transform:"translateX(-50%)",width:"400px",height:"400px",borderRadius:"50%",background:"radial-gradient(circle,#00F2FE09,transparent 70%)",filter:"blur(48px)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:"-60px",left:"-60px",width:"280px",height:"280px",borderRadius:"50%",background:"radial-gradient(circle,#4FACFE07,transparent 70%)",filter:"blur(40px)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",bottom:"-40px",right:"-40px",width:"220px",height:"220px",borderRadius:"50%",background:"radial-gradient(circle,#a78bfa07,transparent 70%)",filter:"blur(36px)",pointerEvents:"none"}}/>
            <div style={{position:"absolute",top:"28px",left:"50%",transform:"translateX(-50%)",width:"1px",height:"40px",background:"linear-gradient(180deg,#00F2FE44,transparent)"}}/>
            <div style={{position:"relative",zIndex:1}}>
              <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"24px"}}>YOUR NEXT CAMPAIGN BEGINS HERE</div>
              <h2 className="serif" style={{fontSize:"clamp(32px,5vw,68px)",fontWeight:700,color:tp,lineHeight:1.06,letterSpacing:"-0.03em",marginBottom:"24px"}}>
                The Brief is Ready.<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:isDark?"rgba(255,255,255,0.45)":"rgba(10,10,15,0.38)"}}>The Voice is Waiting.</span>
              </h2>
              <p className="sans" style={{fontSize:"15px",lineHeight:1.82,color:tm,maxWidth:"540px",margin:"0 auto 48px",fontWeight:300}}>
                Commission a session. Send the brief. Or schedule a 15-minute consultation to discuss the scope — no obligation, no overhead. Just clarity on what your project requires.
              </p>
              <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",flexWrap:"wrap"}}>
                <a href={MAILTO_LINK} target="_blank" rel="noopener noreferrer" className="sans shimmer-btn" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"17px 44px",borderRadius:"100px",color:"#000",fontWeight:700,fontSize:"14px",letterSpacing:"0.08em",textDecoration:"none",boxShadow:"0 0 56px rgba(0,242,254,0.42)",transition:"transform 0.3s ease,box-shadow 0.3s ease"}} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.05)";e.currentTarget.style.boxShadow="0 0 80px rgba(0,242,254,0.68)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 56px rgba(0,242,254,0.42)";}}>Commission a Session <LinkIcon/></a>
                <a href={MAILTO_LINK} className="sans" style={{display:"inline-flex",alignItems:"center",gap:"8px",padding:"16px 36px",borderRadius:"100px",border:`1px solid ${border}`,background:"transparent",color:tm,fontSize:"13px",letterSpacing:"0.05em",textDecoration:"none",transition:"all 0.3s ease"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE44";e.currentTarget.style.color=tp;}} onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=tm;}}><MailIcon/> Send the Brief</a>
              </div>
              <div style={{marginTop:"44px",paddingTop:"36px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"}`,display:"flex",justifyContent:"center",gap:"52px",flexWrap:"wrap"}}>
                {[["Entry engagement","$8K–$15K"],["Projects delivered","80+"],["Turnaround","<48 hours"],["Experience","5+ Years"]].map(([l,n])=>(
                  <div key={l} style={{textAlign:"center"}}>
                    <div className="serif" style={{fontSize:"20px",fontWeight:700,color:tp,lineHeight:1,letterSpacing:"-0.02em"}}>{n}</div>
                    <div className="sans" style={{fontSize:"9.5px",color:ts,marginTop:"5px",letterSpacing:"0.12em",fontWeight:500,textTransform:"uppercase"}}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRUSTED BY */}
        <section style={{padding:"44px 28px",borderTop:`1px solid ${border}`,borderBottom:`1px solid ${border}`,background:isDark?"rgba(255,255,255,0.01)":"rgba(0,0,0,0.012)"}}>
          <div style={{maxWidth:"1280px",margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"center",gap:"52px",flexWrap:"wrap"}}>
            <p className="sans" style={{fontSize:"9.5px",letterSpacing:"0.22em",color:ts,fontWeight:500}}>DEPLOYED ACROSS</p>
            {["LUXURY AUTO","ENTERPRISE TECH","CINEMATIC STUDIOS","GLOBAL BROADCAST","PREMIUM FASHION","FINANCIAL SERVICES","SPORTS CAMPAIGNS","HAUTE COUTURE","DOCUMENTARY & MEDIA"].map(b=>(
              <div key={b} className="sans" style={{fontSize:"10.5px",letterSpacing:"0.24em",fontWeight:600,color:isDark?"rgba(255,255,255,0.14)":"rgba(0,0,0,0.22)",whiteSpace:"nowrap"}}>{b}</div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{padding:"68px 28px 44px",maxWidth:"1280px",margin:"0 auto"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:"40px",marginBottom:"48px"}}>
            <div style={{maxWidth:"290px"}}>
              <div className="serif" style={{fontSize:"12.5px",fontWeight:600,letterSpacing:"0.22em",color:tp,marginBottom:"14px"}}>AURA<span style={{color:"#00F2FE",margin:"0 5px"}}>◆</span>VOCAL STUDIOS</div>
              <p className="sans" style={{fontSize:"12px",color:tm,lineHeight:1.78,fontWeight:300}}>The definitive voice performance agency for brands that operate at the apex. Twelve categories. One voice. Zero creative attrition. Directed by David Chidera Nwaibe.</p>
            </div>
            <div style={{display:"flex",gap:"60px"}}>
              <div>
                <div className="sans" style={{fontSize:"9.5px",letterSpacing:"0.24em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>STUDIO</div>
                {["Portfolio","Process","Rates"].map(l=>(
                  <div key={l} style={{marginBottom:"11px"}}><a href="#" className="sans" style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}} onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>{l}</a></div>
                ))}
                <div style={{marginBottom:"11px"}}>
                  <a href="#" onClick={e=>{e.preventDefault();setShowAbout(true);}} className="sans" style={{fontSize:"13px",color:"#00F2FE",textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em",cursor:"pointer"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>About</a>
                </div>
              </div>
              <div>
                <div className="sans" style={{fontSize:"9.5px",letterSpacing:"0.24em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>CONNECT</div>
                <div style={{marginBottom:"11px"}}><a href={MAILTO_LINK} target="_blank" rel="noopener noreferrer" className="sans" style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}} onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Book Session</a></div>
                <div style={{marginBottom:"11px"}}><a href={MAILTO_LINK} className="sans" style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}} onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Direct Line</a></div>
                <div style={{marginBottom:"11px"}}><a href="#" className="sans" style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}} onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Press Kit</a></div>
                <div style={{marginBottom:"11px"}}><a href="#" className="sans" style={{fontSize:"13px",color:tm,textDecoration:"none",transition:"color 0.2s ease",letterSpacing:"0.02em"}} onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=tm}>Partnerships</a></div>
                <div style={{marginBottom:"11px"}}><a href="#upwork-link" target="_blank" rel="noopener noreferrer" className="sans" style={{fontSize:"13px",color:"#14A800",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"6px",transition:"opacity 0.2s"}} onMouseEnter={e=>e.currentTarget.style.opacity="0.75"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}><UpworkIcon/> Upwork</a></div>
              </div>
            </div>
            <div>
              <div className="sans" style={{fontSize:"9.5px",letterSpacing:"0.24em",color:"#00F2FE",marginBottom:"18px",fontWeight:600}}>FOLLOW</div>
              <div style={{display:"flex",flexDirection:"column",gap:"14px"}}>
                {[{icon:<IgIcon/>,label:"Instagram",href:"https://www.instagram.com/hqauravocalstudios?igsh=MXhmZ3hqZTkzN2VueQ=="},{icon:<TwIcon/>,label:"Twitter / X",href:"https://x.com/hqauravocals"},{icon:<LiIcon/>,label:"LinkedIn",href:"#"}].map(item=>(
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="sans" style={{display:"inline-flex",alignItems:"center",gap:"10px",fontSize:"12px",color:tm,textDecoration:"none",transition:"color 0.2s ease"}} onMouseEnter={e=>e.currentTarget.style.color="#00F2FE"} onMouseLeave={e=>e.currentTarget.style.color=tm}>
                    {item.icon}{item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={{paddingTop:"26px",borderTop:`1px solid ${border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"14px"}}>
            <p className="sans" style={{fontSize:"11px",color:isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.3)",letterSpacing:"0.06em",fontWeight:300}}>© {new Date().getFullYear()} Aura Vocal Studios · David Chidera Nwaibe · All rights reserved.</p>
            <div style={{display:"flex",gap:"24px"}}>
              {["Privacy","Terms","Cookies"].map(l=>(
                <a key={l} href="#" className="sans" style={{fontSize:"11px",textDecoration:"none",letterSpacing:"0.06em",color:isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.3)",transition:"color 0.2s ease",fontWeight:300}} onMouseEnter={e=>e.currentTarget.style.color=tp} onMouseLeave={e=>e.currentTarget.style.color=isDark?"rgba(255,255,255,0.18)":"rgba(0,0,0,0.3)"}>{l}</a>
              ))}
            </div>
          </div>
        </footer>

        {/* ABOUT MODAL */}
        {showAbout&&(
          <div onClick={()=>setShowAbout(false)} style={{position:"fixed",inset:0,zIndex:500,background:"rgba(0,0,0,0.82)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"24px"}}>
            <div onClick={e=>e.stopPropagation()} style={{maxWidth:"680px",width:"100%",borderRadius:"24px",padding:"48px",background:isDark?"linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))":"rgba(255,255,255,0.97)",border:`1px solid ${isDark?"rgba(0,242,254,0.14)":"rgba(0,0,0,0.08)"}`,backdropFilter:"blur(32px)",boxShadow:isDark?"0 32px 80px rgba(0,0,0,0.7)":"0 24px 64px rgba(0,0,0,0.12)",position:"relative"}}>
              <button onClick={()=>setShowAbout(false)} style={{position:"absolute",top:"20px",right:"22px",background:"transparent",border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,borderRadius:"50%",width:"32px",height:"32px",display:"flex",alignItems:"center",justifyContent:"center",color:isDark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)",cursor:"pointer",fontSize:"16px",lineHeight:1,transition:"all 0.2s ease"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE";e.currentTarget.style.color="#00F2FE";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)";e.currentTarget.style.color=isDark?"rgba(255,255,255,0.4)":"rgba(0,0,0,0.4)";}}>✕</button>
              <div className="sans" style={{fontSize:"9px",letterSpacing:"0.32em",color:"#00F2FE",fontWeight:700,marginBottom:"20px"}}>ABOUT AURA VOCAL STUDIOS</div>
              <h2 className="serif" style={{fontSize:"clamp(24px,3.5vw,36px)",fontWeight:700,color:isDark?"#FFFFFF":"#0A0A0F",lineHeight:1.12,letterSpacing:"-0.02em",marginBottom:"28px"}}>
                Not a Voice Agency.<br/>
                <span style={{fontStyle:"italic",fontWeight:300,color:isDark?"rgba(255,255,255,0.48)":"rgba(10,10,15,0.4)"}}>A Commercial Infrastructure.</span>
              </h2>
              <div className="sans" style={{fontSize:"14px",lineHeight:1.82,color:isDark?"#8B9CC0":"#374151",fontWeight:300}}>
                <p style={{marginBottom:"18px"}}>Aura Vocal Studios is the world's premier single-source voice performance agency — founded and directed by <span style={{color:isDark?"#FFFFFF":"#0A0A0F",fontWeight:500}}>David Chidera Nwaibe</span>. Built not as a marketplace, not as a platform, but as a precision instrument deployed by global enterprises, cinematic studios, and category-defining brands when the brief demands absolute authority.</p>
                <p style={{marginBottom:"18px"}}>Where most agencies introduce casting variables, coordination overhead, and creative attrition, Aura operates on a fundamentally different model: one voice, total command, zero friction. Every campaign brief ends in a first-pass final. Every file delivered broadcast-ready.</p>
                <p style={{marginBottom:"28px"}}>Twelve distinct performance categories. Sub-48-hour delivery. Remote directed sessions available globally. WAV and MP3 cleared for worldwide distribution. This is not a service — it is a standard.</p>
              </div>
              <div style={{display:"flex",gap:"28px",paddingTop:"24px",borderTop:`1px solid ${isDark?"rgba(255,255,255,0.07)":"rgba(0,0,0,0.08)"}`,flexWrap:"wrap",marginBottom:"28px"}}>
                {[["80+","Projects Delivered"],["<48H","Delivery Standard"],["5+ Yrs","Experience"],["12","Categories"]].map(([n,l])=>(
                  <div key={l}>
                    <div className="serif" style={{fontSize:"22px",fontWeight:700,color:isDark?"#FFFFFF":"#0A0A0F",lineHeight:1,letterSpacing:"-0.02em"}}>{n}</div>
                    <div className="sans" style={{fontSize:"10px",color:isDark?"#475569":"#6B7280",marginTop:"4px",letterSpacing:"0.09em",fontWeight:500,textTransform:"uppercase"}}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:"flex",gap:"12px",flexWrap:"wrap"}}>
                <a href={MAILTO_LINK} target="_blank" rel="noopener noreferrer" className="sans shimmer-btn" style={{padding:"12px 28px",borderRadius:"100px",color:"#000",fontWeight:700,fontSize:"12px",letterSpacing:"0.07em",textDecoration:"none",boxShadow:"0 0 28px rgba(0,242,254,0.35)",transition:"transform 0.3s ease,box-shadow 0.3s ease",display:"inline-block"}} onMouseEnter={e=>{e.currentTarget.style.transform="scale(1.04)";e.currentTarget.style.boxShadow="0 0 44px rgba(0,242,254,0.6)";}} onMouseLeave={e=>{e.currentTarget.style.transform="scale(1)";e.currentTarget.style.boxShadow="0 0 28px rgba(0,242,254,0.35)";}}>Commission a Session</a>
                <a href={MAILTO_LINK} className="sans" style={{padding:"11px 24px",borderRadius:"100px",border:`1px solid ${isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)"}`,background:"transparent",color:isDark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)",fontSize:"12px",letterSpacing:"0.05em",textDecoration:"none",transition:"all 0.3s ease",display:"inline-block"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#00F2FE50";e.currentTarget.style.color=isDark?"#FFFFFF":"#0A0A0F";}} onMouseLeave={e=>{e.currentTarget.style.borderColor=isDark?"rgba(255,255,255,0.1)":"rgba(0,0,0,0.1)";e.currentTarget.style.color=isDark?"rgba(255,255,255,0.5)":"rgba(0,0,0,0.5)";}}>Direct Line</a>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
