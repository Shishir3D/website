import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, Moon, Sun } from 'lucide-react';
import Pfp from './assets/pfp.jpeg';
import voice from './assets/projects/voice-ai.webp'; import mobile from './assets/projects/mobile.webp';
import transactions from './assets/projects/transactions.webp'; import nepaliVoice from './assets/projects/nepali-voice.webp';
import plant from './assets/projects/plant.webp'; import weather from './assets/projects/weather.webp';
import chabi from './assets/projects/chabi-varnan.webp'; import pyquest from './assets/projects/pyquest.webp';
import garbage from './assets/projects/garbage.webp'; import cpr from './assets/projects/cpr.webp';
import './App.css';
const WellCanvas = lazy(() => import('./WellCanvas'));

const projects = [
  ['Real-time Voice AI Systems','I build the full conversational path: LiveKit and WebRTC, speech recognition, reasoning, retrieval, synthesis, and the infrastructure that keeps the reply immediate.',voice,'LiveKit · WebRTC · RAG · FastAPI'],
  ['Mobile Apps with Supabase','Phone-first products with authentication, realtime data, and records that remain understandable when connectivity is imperfect.',mobile,'Flutter · Supabase · PostgreSQL'],
  ['AI Transaction Categorization','A multi-tenant workflow where rules handle obvious bank rows, AI assists with ambiguity, and people retain the final review.',transactions,'React · FastAPI · LLMs · RBAC'],
  ['Nepali Voice Cloner','An exploration of phonetics, careful data handling, and speech interfaces that sound closer to home.',nepaliVoice,'Speech AI · Nepali · Python'],
  ['Smart Plant Monitoring','A physical feedback loop using an ESP32, soil sensing, and automatic watering—built as a compact working ecosystem.',plant,'ESP32 · Sensors · C++'],
  ['Weather App','A focused mobile weather experience for reading the day quickly: location, forecast, and a clear visual rhythm.',weather,'Flutter · Dart · Weather API'],
  ['Chabi Varnan','A small accessibility direction: observe an image, understand its contents, and describe it in familiar Nepali.',chabi,'Vision AI · Nepali · Python'],
  ['PyQuest','A Unity learning world where Python questions become gates, bridges, and reasons to keep moving.',pyquest,'Unity · C# · Gemini'],
  ['Garbage Classification','A practical computer-vision sorter built around real waste categories and a clear classification loop.',garbage,'Computer Vision · ML · Python'],
  ['CPR Feedback Device','A sensor-based training device that turns pressure and rhythm into immediate practice feedback.',cpr,'Arduino · Sensors · C++'],
] as const;

function Mark(){return <svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="19"/><path d="M12 26c3-8 8-12 12-12s9 4 12 12c-4 4-8 6-12 6s-8-2-12-6Z"/><circle cx="24" cy="24" r="4"/></svg>}

export default function App(){
  const [dark,setDark]=useState(true),[progress,setProgress]=useState(0),[reduced,setReduced]=useState(false); const raf=useRef(0);
  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light'},[dark]);
  useEffect(()=>{const m=matchMedia('(prefers-reduced-motion: reduce)'),s=()=>setReduced(m.matches);s();m.addEventListener('change',s);return()=>m.removeEventListener('change',s)},[]);
  useEffect(()=>{const s=()=>{cancelAnimationFrame(raf.current);raf.current=requestAnimationFrame(()=>{const m=document.documentElement.scrollHeight-innerHeight;setProgress(m?scrollY/m:0)})};s();addEventListener('scroll',s,{passive:true});addEventListener('resize',s);return()=>{removeEventListener('scroll',s);removeEventListener('resize',s);cancelAnimationFrame(raf.current)}},[]);
  return <div className="site"><header><a className="brand" href="#top"><Mark/><span>SHISHIR<br/>POUDEL</span></a><nav><a href="#work">Work</a><a href="#path">Path</a><a href="#contact">Contact</a></nav><button className="theme" onClick={()=>setDark(!dark)} aria-label="Toggle theme">{dark?<Sun/>:<Moon/>}</button></header>
  <main id="top"><section className="hero"><div className="hero-scene"><Suspense fallback={<div className="canvas-fallback"/>}><WellCanvas progress={progress} reducedMotion={reduced}/></Suspense></div><div className="hero-copy"><p className="overline">AI DEVELOPER · SYSTEMS BUILDER · NEPAL</p><h1>I build AI<br/>that <i>speaks, listens,</i><br/>and works in the real world.</h1><p className="intro">I’m Shishir Poudel. I make realtime voice systems, mobile products, and the difficult infrastructure beneath simple experiences.</p><div className="hero-actions"><a href="#work">Enter the work <ArrowDown/></a><a href="mailto:shishirpoudel7@gmail.com">Talk to me <ArrowUpRight/></a></div></div><p className="story-note">The well is where the story begins—not the headline. Scroll upward with the frog as each project opens a wider view.</p></section>
  <section className="manifesto"><p className="chapter">01 / THE VIEW FROM BELOW</p><h2>Deep focus first.<br/><span>Then look beyond the rim.</span></h2><p>I started coding around twelve. Games taught me to make worlds; AI taught me to make them respond. The frog and well run through this site as a personal map of that curiosity—not as a costume for the work.</p></section>
  <section id="work" className="work"><div className="section-title"><p className="chapter">02 / DISCOVERIES ON THE CLIMB</p><h2>Selected work,<br/>not a card grid.</h2></div>{projects.map(([title,copy,image,tech],i)=><article className="project" key={title}><figure><img src={image} width="1440" height="960" loading={i<2?'eager':'lazy'} alt={`Original illustrated scene for ${title}`}/><figcaption>{String(i+1).padStart(2,'0')} / 10</figcaption></figure><div className="project-copy"><p className="project-index">LEDGE {String(i+1).padStart(2,'0')}</p><h3>{title}</h3><p>{copy}</p><small>{tech}</small></div></article>)}</section>
  <section id="path" className="path"><img src={Pfp} alt="Shishir Poudel"/><div><p className="chapter">03 / NEAR THE RIM</p><h2>The systems got bigger.<br/>The curiosity stayed.</h2><p>I study AI at Islington College and build at NextAI, working across voice agents, WebRTC infrastructure, mobile apps, and production systems. I also lead hackathons and keep exploring technology that serves Nepali language and people better.</p><ol><li><b>12</b><span>started programming through games</span></li><li><b>AI</b><span>moved from prototypes into useful systems</span></li><li><b>NOW</b><span>building realtime products at production scale</span></li></ol></div></section>
  <section id="contact" className="contact"><p className="chapter">04 / OPEN SKY</p><h2>The rim only reveals<br/>a larger world.</h2><p>If you are building something useful, strange, ambitious, or hard to explain—let’s talk.</p><a href="mailto:shishirpoudel7@gmail.com">shishirpoudel7@gmail.com <ArrowUpRight/></a></section></main>
  <footer><span>© {new Date().getFullYear()} SHISHIR POUDEL</span><div><a href="https://github.com/Shishir3D">GitHub</a><a href="https://linkedin.com/in/shishir3d">LinkedIn</a><a href="mailto:shishirpoudel7@gmail.com">Email</a></div></footer></div>
}
