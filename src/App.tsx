import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  AudioLines,
  CircleDot,
  Code2,
  Leaf,
  Menu,
  Smartphone,
  Sparkles,
  X,
} from 'lucide-react';
import './App.css';

const StoryCanvas = lazy(() => import('./StoryCanvas'));

type Project = {
  number: string;
  label: string;
  title: string;
  copy: string;
  image: string;
  tags: string[];
  icon: typeof AudioLines;
  accent: string;
};

const projects: Project[] = [
  {
    number: '01',
    label: 'REALTIME VOICE AI',
    title: 'Make machines feel present.',
    copy: 'I build the whole conversational path: LiveKit and WebRTC, speech recognition, reasoning, retrieval, synthesis, and the infrastructure that keeps a reply immediate.',
    image: '/story/voice.webp',
    tags: ['LiveKit', 'WebRTC', 'RAG', 'FastAPI'],
    icon: AudioLines,
    accent: '#ee9c55',
  },
  {
    number: '02',
    label: 'MOBILE + DATA',
    title: 'Make the useful thing stay useful.',
    copy: 'Phone-first products with authentication, realtime data, and records that still make sense when the connection is not perfect.',
    image: '/story/mobile.webp',
    tags: ['Flutter', 'Supabase', 'PostgreSQL'],
    icon: Smartphone,
    accent: '#5eabc5',
  },
  {
    number: '03',
    label: 'AI WORKFLOWS',
    title: 'Make complexity readable.',
    copy: 'Rules handle the obvious bank rows, AI helps with ambiguity, and people retain the final review. Good automation should make judgment clearer, not hide it.',
    image: '/story/transactions.webp',
    tags: ['React', 'FastAPI', 'LLMs', 'RBAC'],
    icon: CircleDot,
    accent: '#9a7a51',
  },
  {
    number: '04',
    label: 'NEPALI VOICE + ACCESS',
    title: 'Make technology sound closer to home.',
    copy: 'I explore speech, phonetics, and image understanding for Nepali-speaking people—quietly useful work that begins by listening carefully.',
    image: '/story/nepali-voice.webp',
    tags: ['Speech AI', 'Nepali', 'Python'],
    icon: Sparkles,
    accent: '#c66d68',
  },
  {
    number: '05',
    label: 'PHYSICAL SYSTEMS',
    title: 'Make ideas touch the world.',
    copy: 'Sensors, feedback loops, weather, plants, learning games, and prototypes. I like the moment software leaves the screen and becomes a small working thing.',
    image: '/story/plant.webp',
    tags: ['ESP32', 'Sensors', 'C++', 'Computer Vision'],
    icon: Leaf,
    accent: '#6f9b55',
  },
];

const sideProjects = [
  ['Weather app', 'A quick, calm read of the day.'],
  ['PyQuest', 'Python questions turned into a world to move through.'],
  ['Garbage classification', 'A practical computer-vision sorting loop.'],
  ['CPR feedback device', 'Pressure and rhythm made visible for practice.'],
  ['Chabi Varnan', 'Image understanding in familiar Nepali.'],
];

function Mark() {
  return (
    <svg className="mark" viewBox="0 0 52 52" aria-hidden="true">
      <circle cx="26" cy="26" r="21" />
      <path d="M13 29c3-9 8-14 13-14s10 5 13 14c-4 4-8 6-13 6s-9-2-13-6Z" />
      <circle cx="26" cy="27" r="4" />
      <path d="M26 5v7" />
    </svg>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function App() {
  const journeyRef = useRef<HTMLElement>(null);
  const [journeyProgress, setJourneyProgress] = useState(0);
  const [activeChapter, setActiveChapter] = useState(0);
  const [sceneOpacity, setSceneOpacity] = useState(1);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateScrollState = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const journey = journeyRef.current;
        const contact = document.getElementById('contact');
        if (!journey) return;
        const journeyBounds = journey.getBoundingClientRect();
        const journeyRange = Math.max(1, journeyBounds.height - window.innerHeight);
        const progress = clamp((window.innerHeight * 0.18 - journeyBounds.top) / journeyRange, 0, 1);
        setJourneyProgress(progress);
        setActiveChapter(Math.min(projects.length - 1, Math.round(progress * (projects.length - 1))));

        const contactTop = contact?.getBoundingClientRect().top ?? window.innerHeight * 2;
        setSceneOpacity(clamp(contactTop / (window.innerHeight * 0.75), 0, 1));
      });
    };
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', updateScrollState);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', updateScrollState);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Shishir Poudel home">
          <Mark />
          <span>SHISHIR<br />POUDEL</span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="scene-layer" style={{ opacity: sceneOpacity }} aria-hidden="true">
        <Suspense fallback={<div className="scene-fallback" />}>
          <StoryCanvas progress={journeyProgress} chapter={activeChapter} reducedMotion={reducedMotion} />
        </Suspense>
      </div>

      <div className="chapter-rail" aria-label="Story chapters">
        <span className="rail-label">SCROLL STORY</span>
        <div className="rail-line"><span style={{ height: `${(activeChapter + 1) / projects.length * 100}%` }} /></div>
        {projects.map((project, index) => (
          <button
            className={activeChapter === index ? 'rail-dot active' : 'rail-dot'}
            key={project.number}
            type="button"
            aria-label={`Go to chapter ${index + 1}`}
            onClick={() => document.getElementById(`chapter-${index}`)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' })}
          />
        ))}
      </div>

      <main id="top">
        <section className="opening" aria-labelledby="opening-title">
          <div className="opening-wash" />
          <div className="opening-copy">
            <p className="eyebrow"><span className="eyebrow-dot" /> AI DEVELOPER · SYSTEMS BUILDER · NEPAL</p>
            <h1 id="opening-title">I’m an AI developer building systems that <em>feel human.</em></h1>
            <p className="lede">I make realtime voice experiences, mobile products, and the infrastructure underneath them—one curious climb at a time.</p>
            <div className="opening-actions">
              <a className="button button-primary" href="#work">Walk through the work <ArrowDown /></a>
              <a className="text-link" href="mailto:shishirpoudel7@gmail.com">Say hello <ArrowUpRight /></a>
            </div>
          </div>
          <div className="opening-note"><span>01</span><p>The well is a starting point.<br />The view keeps getting wider.</p></div>
          <div className="scroll-cue"><span>scroll to travel</span><ArrowDown /></div>
        </section>

        <section className="thesis" aria-labelledby="thesis-title">
          <div className="thesis-card">
            <p className="eyebrow">A SMALL WORLD, A BIGGER VIEW</p>
            <h2 id="thesis-title">Good technology is a little like climbing out of a well.</h2>
            <p>You begin with one deep problem. You learn its walls, its echoes, its hidden water. Then you look up, connect it to the wider world, and build something that helps another person see further too.</p>
          </div>
          <div className="thesis-stamp"><Code2 /><span>curiosity<br />as infrastructure</span></div>
        </section>

        <section className="journey" id="work" ref={journeyRef} aria-labelledby="work-title">
          <div className="journey-heading">
            <p className="eyebrow">THE CLIMB / 05 CHAPTERS</p>
            <h2 id="work-title">A few things<br /><em>I’ve made real.</em></h2>
            <p>Scroll slowly. The scene moves with you; each ledge opens onto a different kind of work.</p>
          </div>
          <div className="chapter-list">
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <article className={activeChapter === index ? 'chapter-panel is-active' : 'chapter-panel'} id={`chapter-${index}`} key={project.number} style={{ '--chapter-accent': project.accent } as React.CSSProperties}>
                  <div className="chapter-image-wrap">
                    <img src={project.image} alt={`${project.label.toLowerCase()} illustrated scene`} width="1448" height="1086" loading={index === 0 ? 'eager' : 'lazy'} />
                    <span className="chapter-number">{project.number}</span>
                  </div>
                  <div className="chapter-copy">
                    <div className="chapter-meta"><Icon /><span>{project.label}</span></div>
                    <h3>{project.title}</h3>
                    <p>{project.copy}</p>
                    <ul className="tag-list" aria-label="Technologies used">
                      {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="side-quests" aria-labelledby="side-quests-title">
          <div>
            <p className="eyebrow">SMALLER WORLDS</p>
            <h2 id="side-quests-title">The side quests<br /><em>count too.</em></h2>
          </div>
          <div className="quest-list">
            {sideProjects.map(([title, copy], index) => (
              <div className="quest" key={title}>
                <span>0{index + 1}</span>
                <div><h3>{title}</h3><p>{copy}</p></div>
                <ArrowUpRight />
              </div>
            ))}
          </div>
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <div className="about-portrait">
            <img src="/profile.jpeg" alt="Shishir Poudel" width="600" height="800" />
            <span>still looking up</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">NEAR THE RIM / ABOUT ME</p>
            <h2 id="about-title">The systems got bigger.<br /><em>The curiosity stayed.</em></h2>
            <p>I study AI at Islington College and build at NextAI, working across voice agents, WebRTC infrastructure, mobile apps, and production systems. I also lead hackathons and keep exploring technology that serves Nepali language and people better.</p>
            <div className="about-facts">
              <div><strong>12</strong><span>started programming<br />through games</span></div>
              <div><strong>AI</strong><span>from prototypes<br />into useful systems</span></div>
              <div><strong>NOW</strong><span>building realtime<br />products at scale</span></div>
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-sky" />
          <p className="eyebrow">THE NEXT HORIZON</p>
          <h2 id="contact-title">Let’s build something<br /><em>worth looking up to.</em></h2>
          <p>If you are building something useful, strange, ambitious, or hard to explain, I’d like to hear about it.</p>
          <a className="button button-primary" href="mailto:shishirpoudel7@gmail.com">shishirpoudel7@gmail.com <ArrowUpRight /></a>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} SHISHIR POUDEL</span>
        <div><a href="https://github.com/Shishir3D"><Code2 /> GitHub</a><a href="https://linkedin.com/in/shishir3d"><Code2 /> LinkedIn</a><a href="mailto:shishirpoudel7@gmail.com">Email</a></div>
      </footer>
    </div>
  );
}
