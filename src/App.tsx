import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowUpRight,
  BrainCircuit,
  BriefcaseBusiness,
  Cloud,
  Code2,
  Mail,
  Menu,
  Moon,
  Sparkles,
  Sun,
  Waves,
  X,
} from 'lucide-react';
import Pfp from './assets/pfp.jpeg';
import './App.css';

const WellCanvas = lazy(() => import('./WellCanvas'));

type Theme = 'light' | 'dark';

type Project = {
  number: string;
  title: string;
  short: string;
  description: string;
  detail: string;
  tags: string[];
  href?: string;
  visual: string;
};

const projects: Project[] = [
  { number: '01', title: 'Real-time Voice AI Systems', short: 'A voice that travels through the well.', description: 'Production voice agents that listen, reason and respond in real time.', detail: 'I work across LiveKit, WebRTC, speech recognition, synthesis, RAG and the infrastructure that makes a conversation feel immediate rather than mechanical.', tags: ['LiveKit', 'WebRTC', 'RAG', 'FastAPI', 'Docker'], visual: 'voice' },
  { number: '02', title: 'Mobile Apps with Supabase', short: 'Useful tools that keep their footing.', description: 'Phone-first products backed by dependable data and calm interfaces.', detail: 'From authentication to offline-friendly records, I build mobile experiences that still feel clear when connectivity is imperfect and the user is busy.', tags: ['Flutter', 'Supabase', 'PostgreSQL', 'Realtime'], visual: 'mobile' },
  { number: '03', title: 'AI Transaction Categorization', short: 'Messy rows become a path upward.', description: 'A multi-tenant workflow for importing, normalizing and reviewing bank data.', detail: 'Rules handle the obvious work; LLM assistance helps with the ambiguous work; people stay in the loop where the decision matters.', tags: ['React', 'FastAPI', 'PostgreSQL', 'LLMs', 'RBAC'], visual: 'ledger' },
  { number: '04', title: 'Nepali Voice Cloner', short: 'Technology that sounds closer to home.', description: 'Speech exploration for more natural Nepali voice experiences.', detail: 'This work is about making conversational interfaces feel less foreign: careful phonetics, respectful data handling and a voice people can actually understand.', tags: ['Speech AI', 'Nepali', 'TTS', 'Python'], visual: 'voice-local' },
  { number: '05', title: 'Smart Plant Monitoring System', short: 'A tiny ecosystem that reports back.', description: 'ESP32 sensors, soil readings and automatic watering in one small loop.', detail: 'An open-source experiment where the physical world becomes a simple, visible feedback system instead of a mystery behind a screen.', tags: ['ESP32', 'Sensors', 'C++', 'Blynk'], href: 'https://github.com/Shishir3D/PlantMonitoringSystem', visual: 'plant' },
  { number: '06', title: 'Weather App', short: 'A window that makes the day legible.', description: 'A Flutter weather experience shaped for quick, everyday decisions.', detail: 'Forecasts, location-aware data and a clear mobile rhythm—like looking up through the well before deciding whether to climb out.', tags: ['Flutter', 'Dart', 'Weather API'], href: 'https://github.com/Shishir3D/WeatherApp', visual: 'weather' },
  { number: '07', title: 'Chabi Varnan', short: 'An image, understood in Nepali.', description: 'An AI application that describes what is in an image in Nepali.', detail: 'A small but meaningful accessibility direction: helping visual information travel through a language that feels familiar.', tags: ['Python', 'Vision AI', 'Nepali'], href: 'https://github.com/Shishir3D/chabi_varnan', visual: 'vision' },
  { number: '08', title: 'PyQuest', short: 'Questions become part of the level.', description: 'A Unity learning game made for Hackademia 2.0.', detail: 'The experiment was simple: make learning Python feel like movement, discovery and a little bit of play instead of a wall of syntax.', tags: ['Unity', 'C#', 'Gemini'], href: 'https://github.com/Shishir3D/pyquest', visual: 'game' },
  { number: '09', title: 'Garbage Classification', short: 'A practical loop for a practical problem.', description: 'A computer-vision experiment for sorting waste into useful categories.', detail: 'No glowing robot story—just a clear classifier, real categories and the question of how small technical choices can support better everyday systems.', tags: ['ML', 'Computer Vision', 'Python'], href: 'https://github.com/Shishir3D/garbage-classification', visual: 'sorting' },
  { number: '10', title: 'CPR Feedback Device', short: 'A rhythm you can feel and correct.', description: 'A sensor-based training device for real-time CPR feedback.', detail: 'The build turns pressure and rhythm into immediate guidance for practice, with a focus on clarity rather than medical overclaiming.', tags: ['Arduino', 'Sensors', 'C++'], href: 'https://github.com/Shishir3D/CPR-Feedback', visual: 'cpr' },
];

const stackGroups = [
  { title: 'AI & realtime', icon: BrainCircuit, items: ['LiveKit', 'WebRTC', 'RAG', 'LLMs', 'STT / TTS', 'Speech AI'] },
  { title: 'Product engineering', icon: Code2, items: ['React', 'TypeScript', 'Flutter', 'FastAPI', 'Supabase', 'PostgreSQL'] },
  { title: 'Infrastructure', icon: Cloud, items: ['Docker', 'Linux', 'HAProxy', 'AWS', 'GPU inference', 'CI/CD'] },
];

function getInitialTheme(): Theme {
  const saved = window.localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function WellMark({ small = false }: { small?: boolean }) {
  return (
    <svg className={small ? 'well-mark well-mark-small' : 'well-mark'} viewBox="0 0 48 48" role="img" aria-label="Frog eye and well mark">
      <circle cx="24" cy="24" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M12 25c3.3-6.4 8.8-9.6 12-9.6S32.7 18.6 36 25c-3.2 4.1-7.4 6.2-12 6.2S15.2 29.1 12 25Z" fill="currentColor" opacity=".2" />
      <circle cx="24" cy="24.4" r="4.8" fill="currentColor" />
      <path d="M24 5.8v5.4M24 36.8v5.4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ProjectVisual({ kind }: { kind: string }) {
  return (
    <div className={`project-visual visual-${kind}`} aria-hidden="true">
      <span className="visual-sun" />
      <span className="visual-sky" />
      <span className="visual-well-ring" />
      <span className="visual-orbit orbit-one" />
      <span className="visual-orbit orbit-two" />
      <span className="visual-object object-one" />
      <span className="visual-object object-two" />
      <span className="visual-object object-three" />
      <span className="visual-frog">•ᴗ•</span>
      <span className="visual-caption">a small discovery</span>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const progressFrame = useRef<number | null>(null);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    updateMotion();
    media.addEventListener('change', updateMotion);
    return () => media.removeEventListener('change', updateMotion);
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      if (progressFrame.current !== null) return;
      progressFrame.current = window.requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrollProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        progressFrame.current = null;
      });
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
      if (progressFrame.current !== null) window.cancelAnimationFrame(progressFrame.current);
    };
  }, []);

  const storyLabel = useMemo(() => {
    if (scrollProgress < 0.22) return 'At the bottom';
    if (scrollProgress < 0.62) return 'On the climb';
    return 'Under open sky';
  }, [scrollProgress]);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="scroll-rail" aria-hidden="true"><span style={{ transform: `scaleY(${scrollProgress})` }} /></div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Shishir Poudel — home"><span className="brand-mark"><WellMark /></span><span><strong>Shishir Poudel</strong><small>AI systems builder · Nepal</small></span></a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation"><a href="#story" onClick={closeMenu}>Story</a><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact</a></nav>
        <div className="header-actions"><span className="story-status" aria-live="polite">{storyLabel}</span><button className="icon-button" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button><button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>{menuOpen ? <X size={19} /> : <Menu size={19} />}</button></div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy"><div className="eyebrow"><span className="sun-dot" /> A sunny little corner of the internet</div><p className="hero-index">chapter 01 <span>·</span> the view from below</p><h1>I’m a frog in a well, looking for the <em>next sky.</em></h1><p className="hero-lede">I’m Shishir Poudel—a Nepal-based AI systems builder making voice agents, mobile products and infrastructure that help useful ideas travel further.</p><div className="hero-actions"><a className="button button-primary" href="#work">Follow the climb <ArrowUpRight size={17} /></a><a className="button button-secondary" href="#contact">Say hello <Mail size={17} /></a></div><div className="hero-note"><Waves size={17} /><span>The well is not a cage. It is where I learned to look up.</span></div></div>
          <div className="well-hero-art" aria-label="A bright, stylized well with a frog looking up at the sky"><div className="hero-cloud cloud-left" /><div className="hero-cloud cloud-right" /><div className="hero-sky-disc"><span className="hero-sun" /></div><div className="hero-wall wall-back" /><div className="hero-wall wall-front" /><div className="hero-water"><span className="water-line one" /><span className="water-line two" /><span className="water-line three" /></div><div className="hero-frog"><span className="frog-eye left" /><span className="frog-eye right" /><span className="frog-mouth" /></div><span className="hero-art-label label-sky">possibility</span><span className="hero-art-label label-water">curiosity</span></div>
        </section>

        <section className="story-section" id="story"><div className="story-intro"><div><p className="section-label">The story</p><h2>Start small. Look carefully. Keep climbing.</h2></div><p className="story-intro-copy">The frog is me: curious, technical, observant and slightly impatient to understand what is beyond the current boundary. Every project is one more ledge, tool or rope in the climb.</p></div><div className="story-scene"><div className="scene-copy"><span className="chapter-number">02</span><h3>Scroll to change the view.</h3><p>The 3D layer follows your natural scroll. It is intentionally quiet: a circular well, a moving frog, a widening sky. If the scene cannot load, the story still works.</p><a href="#work" className="text-link">See the discoveries <ArrowUpRight size={16} /></a></div><div className="scene-canvas-wrap"><div className="scene-fallback" aria-hidden="true"><div className="fallback-moon" /><div className="fallback-stone stone-a" /><div className="fallback-stone stone-b" /><div className="fallback-frog">•ᴗ•</div></div><Suspense fallback={null}><WellCanvas progress={scrollProgress} reducedMotion={reducedMotion} /></Suspense></div></div></section>

        <section className="work-section" id="work"><div className="section-heading work-heading"><div><p className="section-label">The discoveries</p><h2>Ten ways to climb a little higher.</h2></div><p>Each project starts with a real problem. The visual world changes, but the question stays the same: can this make something clearer, faster or more human?</p></div><div className="project-story-list">{projects.map((project, index) => <article className={`project-story project-${index % 2 === 0 ? 'left' : 'right'}`} key={project.title}><div className="project-story-art"><ProjectVisual kind={project.visual} /><span className="project-pin">{project.number}</span></div><div className="project-story-copy"><p className="project-kicker">ledge {project.number}</p><h3>{project.title}</h3><p className="project-short">{project.short}</p><p>{project.detail}</p><ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>{project.href ? <a className="text-link" href={project.href} target="_blank" rel="noreferrer">Open the project <ArrowUpRight size={16} /></a> : <span className="project-note"><Sparkles size={15} /> Built as part of the climb</span>}</div></article>)}</div></section>

        <section className="about-section" id="about"><div className="about-art"><img className="about-photo" src={Pfp} alt="Shishir Poudel" /><div className="about-sun" /><div className="about-ridge ridge-one" /><div className="about-ridge ridge-two" /><div className="about-frog"><span /><span /></div><span className="about-art-note">still looking up</span></div><div className="about-copy"><p className="section-label">Near the rim</p><h2>The view gets bigger. The curiosity stays.</h2><p className="about-lead">I started programming around age 12, moved from making games into artificial intelligence, and never lost the urge to turn ideas into working products.</p><p>I study AI at Islington College and build at NextAI, where my work touches WebRTC, voice agents, mobile apps and production-level realtime systems. I like the seam between a friendly interface and the difficult systems underneath.</p><p>Outside work, I join hackathons, build open-source experiments and explore how speech and language technology can serve Nepali users better.</p><div className="timeline"><div><strong>12</strong><span>first lines of code</span></div><div><strong>AI</strong><span>the direction I chose</span></div><div><strong>∞</strong><span>still more to learn</span></div></div><div className="social-links"><a href="https://github.com/Shishir3D" target="_blank" rel="noreferrer"><Code2 size={17} /> GitHub</a><a href="https://linkedin.com/in/shishir3d" target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /> LinkedIn</a></div></div></section>

        <section className="section toolkit-section" id="toolkit"><div className="section-heading"><div><p className="section-label">The tools in the rope bag</p><h2>From prototype to production.</h2></div><p>Tools change. The goal stays the same: ship dependable systems that solve real problems.</p></div><div className="stack-grid">{stackGroups.map((group) => { const Icon = group.icon; return <article className="stack-card" key={group.title}><Icon size={21} /><h3>{group.title}</h3><div className="stack-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>; })}</div></section>

        <section className="contact-section" id="contact"><div className="contact-sky"><span className="contact-sun" /><span className="contact-cloud cloud-a" /><span className="contact-cloud cloud-b" /></div><div className="contact-copy"><p className="section-label">The rim is not the end</p><h2>Have something useful to build?</h2><p>Bring the idea. We’ll figure out the rope, the ledges and the weather together.</p><a className="button button-primary" href="mailto:shishirpoudel7@gmail.com">Start a conversation <ArrowUpRight size={17} /></a></div><div className="contact-frog" aria-hidden="true">•ᴗ•</div></section>
      </main>

      <footer className="site-footer"><div className="footer-brand"><span className="brand-mark small"><WellMark small /></span><p>Shishir Poudel · building from Nepal</p></div><div className="footer-links"><a href="mailto:shishirpoudel7@gmail.com">Email</a><a href="https://github.com/Shishir3D" target="_blank" rel="noreferrer">GitHub</a><a href="https://linkedin.com/in/shishir3d" target="_blank" rel="noreferrer">LinkedIn</a></div><p>© {new Date().getFullYear()} · keep looking up</p></footer>
    </div>
  );
}

export default App;
