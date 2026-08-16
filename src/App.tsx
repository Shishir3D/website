import { useEffect, useRef, useState } from 'react';
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

type Project = {
  number: string;
  label: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  tags: string[];
  icon: typeof AudioLines;
};

type StoryScene = {
  label: string;
  title: string;
  copy: string;
  marker: string;
};

const scenes: StoryScene[] = [
  {
    label: '01 / BEGIN CLOSE',
    title: 'I build systems that feel human.',
    copy: 'I’m an AI developer who likes starting with the small, real problem: a voice that should answer quickly, a record that should stay trustworthy, a person who should not have to fight the interface.',
    marker: 'inside the well',
  },
  {
    label: '02 / CLIMB OUT',
    title: 'Then I make the view wider.',
    copy: 'The best work moves from prototype to product without losing its warmth. I connect the model, the interface, the data, and the infrastructure so the whole thing can keep its promise.',
    marker: 'at the rim',
  },
  {
    label: '03 / CONNECT THE PIECES',
    title: 'Useful technology is a network of details.',
    copy: 'Realtime audio, mobile workflows, retrieval, permissions, deployment, and the tiny decisions in between all shape the experience. I enjoy making those connections dependable.',
    marker: 'across the valley',
  },
  {
    label: '04 / KEEP LOOKING',
    title: 'Curiosity is the part I keep.',
    copy: 'From Nepal, I work across voice AI, production systems, and playful physical prototypes. There is always another horizon worth building toward.',
    marker: 'toward the horizon',
  },
];

const projects: Project[] = [
  {
    number: '01',
    label: 'REALTIME VOICE AI',
    title: 'Make machines feel present.',
    copy: 'Conversational systems from microphone to response: LiveKit, WebRTC, speech recognition, retrieval, synthesis, and the infrastructure that keeps a reply immediate.',
    image: '/story/voice.webp',
    imageAlt: 'Illustrated realtime voice AI project scene',
    tags: ['LiveKit', 'WebRTC', 'RAG', 'FastAPI'],
    icon: AudioLines,
  },
  {
    number: '02',
    label: 'MOBILE + DATA',
    title: 'Make the useful thing stay useful.',
    copy: 'Phone-first products with authentication, realtime data, and records that still make sense when the connection is not perfect.',
    image: '/story/mobile.webp',
    imageAlt: 'Illustrated mobile product project scene',
    tags: ['Flutter', 'Supabase', 'PostgreSQL'],
    icon: Smartphone,
  },
  {
    number: '03',
    label: 'AI WORKFLOWS',
    title: 'Make complexity readable.',
    copy: 'Rules handle the obvious rows, AI helps with ambiguity, and people retain the final review. Good automation makes judgment clearer.',
    image: '/story/transactions.webp',
    imageAlt: 'Illustrated AI workflow project scene',
    tags: ['React', 'FastAPI', 'LLMs', 'RBAC'],
    icon: CircleDot,
  },
  {
    number: '04',
    label: 'NEPALI VOICE + ACCESS',
    title: 'Make technology sound closer to home.',
    copy: 'Speech, phonetics, and image understanding for Nepali-speaking people—quietly useful work that begins by listening carefully.',
    image: '/story/nepali-voice.webp',
    imageAlt: 'Illustrated Nepali voice project scene',
    tags: ['Speech AI', 'Nepali', 'Python'],
    icon: Sparkles,
  },
  {
    number: '05',
    label: 'PHYSICAL SYSTEMS',
    title: 'Make ideas touch the world.',
    copy: 'Sensors, feedback loops, weather, plants, learning games, and prototypes. I like the moment software becomes a small working thing.',
    image: '/story/plant.webp',
    imageAlt: 'Illustrated physical computing project scene',
    tags: ['ESP32', 'Sensors', 'C++', 'Computer Vision'],
    icon: Leaf,
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
  const storyRef = useRef<HTMLElement>(null);
  const [storyProgress, setStoryProgress] = useState(0);
  const [activeScene, setActiveScene] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const story = storyRef.current;
        if (!story) return;
        const bounds = story.getBoundingClientRect();
        const range = Math.max(1, bounds.height - window.innerHeight);
        const progress = clamp((window.innerHeight * 0.08 - bounds.top) / range, 0, 1);
        setStoryProgress(progress);
        setActiveScene(Math.min(scenes.length - 1, Math.floor(progress * scenes.length)));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const scrollToScene = (index: number) => {
    const scene = document.getElementById(`scene-${index}`);
    scene?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
    closeMenu();
  };

  return (
    <div className="site">
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu} aria-label="Shishir Poudel home">
          <Mark />
          <span>SHISHIR<br />POUDEL</span>
        </a>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Primary navigation">
          <a href="#story" onClick={closeMenu}>Story</a>
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="story-progress" aria-label="Story chapters">
        <span className="story-progress-label">SCROLL TO DISCOVER</span>
        <div className="story-progress-line"><span style={{ height: `${(activeScene + 1) / scenes.length * 100}%` }} /></div>
        {scenes.map((scene, index) => (
          <button
            className={activeScene === index ? 'story-dot is-active' : 'story-dot'}
            key={scene.label}
            type="button"
            onClick={() => scrollToScene(index)}
            aria-label={`Go to story chapter ${index + 1}: ${scene.marker}`}
          />
        ))}
        <span className="story-count">0{activeScene + 1} / 0{scenes.length}</span>
      </div>

      <main id="top">
        <section className="story" id="story" ref={storyRef} aria-label="A scrollable introduction to Shishir's work">
          <div className="scene-viewport" aria-hidden="true">
            <div className="scene-glow" />
            {scenes.map((scene, index) => (
              <div
                className={activeScene === index ? 'scene-image is-active' : 'scene-image'}
                key={scene.label}
                style={{
                  backgroundImage: `url(/story/scene-${['well', 'rim', 'valley', 'horizon'][index]}.webp)`,
                  transform: `scale(${1.04 - storyProgress * 0.025}) translate3d(0, ${-storyProgress * 1.6}%, 0)`,
                }}
              />
            ))}
            <div className="scene-shade" />
            <div className="scene-caption"><span>SHISHIR / 2026</span><span>{scenes[activeScene].marker}</span></div>
          </div>

          <div className="story-steps">
            {scenes.map((scene, index) => (
              <article className={activeScene === index ? 'story-step is-active' : 'story-step'} id={`scene-${index}`} key={scene.label}>
                <div className="story-copy">
                  <p className="scene-kicker"><span className="kicker-dot" />{scene.label}</p>
                  <h1>{index === 0 ? <>I’m an AI developer<br />building systems that <em>feel human.</em></> : scene.title}</h1>
                  <p className="story-lede">{scene.copy}</p>
                  {index === 0 && (
                    <div className="story-actions">
                      <a className="button button-light" href="#work">Walk through the work <ArrowDown /></a>
                      <a className="story-link" href="mailto:shishirpoudel7@gmail.com">Say hello <ArrowUpRight /></a>
                    </div>
                  )}
                  {index > 0 && <span className="chapter-note">{scene.marker} <span aria-hidden="true">↗</span></span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow"><span className="eyebrow-dot" />THE WORK / FIVE CHAPTERS</p>
              <h2 id="work-title">A few things<br /><em>I’ve made real.</em></h2>
            </div>
            <p>Scroll-led scenes give the work a place to breathe. The details live here.</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => {
              const Icon = project.icon;
              return (
                <article className="project-card" key={project.number}>
                  <div className="project-image-wrap">
                    <img src={project.image} alt={project.imageAlt} width="1448" height="1086" loading="lazy" />
                    <span className="project-number">{project.number}</span>
                  </div>
                  <div className="project-copy">
                    <div className="project-meta"><Icon /><span>{project.label}</span></div>
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
            <p className="eyebrow"><span className="eyebrow-dot" />SMALLER WORLDS</p>
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
            <p className="eyebrow"><span className="eyebrow-dot" />NEAR THE RIM / ABOUT ME</p>
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
          <p className="eyebrow"><span className="eyebrow-dot" />THE NEXT HORIZON</p>
          <h2 id="contact-title">Let’s build something<br /><em>worth looking up to.</em></h2>
          <p>If you are building something useful, strange, ambitious, or hard to explain, I’d like to hear about it.</p>
          <a className="button button-dark" href="mailto:shishirpoudel7@gmail.com">shishirpoudel7@gmail.com <ArrowUpRight /></a>
        </section>
      </main>

      <footer>
        <span>© {new Date().getFullYear()} SHISHIR POUDEL</span>
        <div><a href="https://github.com/Shishir3D"><Code2 /> GitHub</a><a href="https://linkedin.com/in/shishir3d"><Code2 /> LinkedIn</a><a href="mailto:shishirpoudel7@gmail.com">Email</a></div>
      </footer>
    </div>
  );
}
