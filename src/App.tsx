import { useEffect, useState } from 'react';
import {
  ArrowUpRight, BrainCircuit, BriefcaseBusiness, Cloud, Code2, Cpu,
  Mail, Menu, Moon, Radio, Smartphone, Sparkles, Sun, X,
} from 'lucide-react';
import Pfp from './assets/pfp.jpeg';
import './App.css';

type Theme = 'light' | 'dark';

const featuredProjects = [
  {
    title: 'Real-time Voice AI Systems',
    description: 'Production voice agents that listen, reason and respond in real time, combining LiveKit, WebRTC, speech recognition, synthesis and retrieval-augmented generation.',
    tags: ['LiveKit', 'WebRTC', 'RAG', 'FastAPI', 'Docker'], icon: Radio, accent: 'coral',
  },
  {
    title: 'Mobile Apps with Supabase',
    description: 'Responsive cross-platform mobile experiences backed by Supabase authentication, databases, storage and real-time updates, designed for dependable use on phones.',
    tags: ['Flutter', 'Supabase', 'PostgreSQL', 'Realtime'], icon: Smartphone, accent: 'blue',
  },
  {
    title: 'AI Transaction Categorization',
    description: 'A multi-tenant financial workflow that ingests spreadsheets, normalizes transactions and combines deterministic rules with LLM-assisted categorization and review.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'LLMs', 'RBAC'], icon: BrainCircuit, accent: 'green',
  },
  {
    title: 'Nepali Voice Cloner',
    description: 'A speech project exploring natural Nepali voice synthesis and cloning, bringing local-language support to modern conversational AI experiences.',
    tags: ['Speech AI', 'Nepali', 'TTS', 'Python'], icon: Sparkles, accent: 'purple',
  },
];

const publicProjects = [
  { title: 'Smart Plant Monitoring System', description: 'ESP32-powered plant care with soil, temperature and humidity sensing, automatic watering and Blynk remote control.', meta: '21 GitHub stars · C++ · IoT', href: 'https://github.com/Shishir3D/PlantMonitoringSystem' },
  { title: 'Weather App', description: 'A Flutter weather app with forecasts, location-aware data and a clear mobile-first interface.', meta: 'Flutter · Dart · Weather API', href: 'https://github.com/Shishir3D/WeatherApp' },
  { title: 'Chabi Varnan', description: 'An AI application that describes the contents of an image in Nepali.', meta: 'Python · Vision AI · Nepali', href: 'https://github.com/Shishir3D/chabi_varnan' },
  { title: 'PyQuest', description: 'An educational Unity game created for Hackademia 2.0, using Gemini to generate interactive questions.', meta: 'Unity · C# · Gemini', href: 'https://github.com/Shishir3D/pyquest' },
  { title: 'Garbage Classification', description: 'A practical computer-vision experiment for classifying waste into useful categories.', meta: 'Machine Learning · Computer Vision', href: 'https://github.com/Shishir3D/garbage-classification' },
  { title: 'CPR Feedback Device', description: 'A sensor-based training device that gives real-time feedback to help improve CPR technique.', meta: 'Arduino · Sensors · C++', href: 'https://github.com/Shishir3D/CPR-Feedback' },
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

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Shishir Paudel — home">
          <span className="brand-mark" aria-hidden="true">SP</span><span>Shishir Paudel</span>
        </a>
        <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a>
          <a href="#stack" onClick={closeMenu}>Stack</a><a href="#contact" onClick={closeMenu}>Contact</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="top">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> Building production AI in Nepal</div>
            <h1>I make AI systems that feel <em>fast, useful</em> and human.</h1>
            <p className="hero-lede">I’m Shishir Paudel, an AI systems builder focused on real-time voice agents, mobile applications and the infrastructure that keeps them reliable.</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#work">See selected work <ArrowUpRight size={18} /></a>
              <a className="button button-secondary" href="https://linkedin.com/in/shishir3d" target="_blank" rel="noreferrer"><Mail size={18} /> Get in touch</a>
            </div>
            <div className="hero-proof" aria-label="Areas of focus"><span>Voice AI</span><span>WebRTC</span><span>Mobile</span><span>AI infrastructure</span></div>
          </div>
          <aside className="profile-card" aria-label="Profile summary">
            <div className="profile-photo-wrap">
              <img src={Pfp} alt="Shishir Paudel" className="profile-photo" />
              <span className="profile-badge"><Cpu size={18} /> AI systems</span>
            </div>
            <div className="profile-copy"><p className="profile-kicker">Currently</p><h2>Building real-time AI systems at NextAI</h2><p>From voice-to-voice RAG agents to scalable speech infrastructure.</p></div>
          </aside>
        </section>

        <section className="section" id="work">
          <div className="section-heading"><div><p className="section-label">Selected work</p><h2>AI products built end to end</h2></div><p>I work across interfaces, models, realtime communication, APIs and deployment.</p></div>
          <div className="featured-grid">
            {featuredProjects.map((project) => {
              const Icon = project.icon;
              return <article className={`featured-card accent-${project.accent}`} key={project.title}>
                <div className="project-icon"><Icon size={25} /></div><h3>{project.title}</h3><p>{project.description}</p>
                <ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
              </article>;
            })}
          </div>
          <div className="project-list-heading"><h3>Open-source & experiments</h3><a href="https://github.com/Shishir3D?tab=repositories" target="_blank" rel="noreferrer">All GitHub projects <ArrowUpRight size={16} /></a></div>
          <div className="project-list">
            {publicProjects.map((project) => <a className="project-row" href={project.href} target="_blank" rel="noreferrer" key={project.title}>
              <div><h4>{project.title}</h4><p>{project.description}</p><span>{project.meta}</span></div><ArrowUpRight size={20} aria-hidden="true" />
            </a>)}
          </div>
        </section>

        <section className="section about-section" id="about">
          <div className="about-intro"><p className="section-label">About</p><h2>Curious since the first line of code.</h2></div>
          <div className="about-copy">
            <p className="about-lead">I started programming around age 12, moved from making games into artificial intelligence, and never lost the urge to turn ideas into working products.</p>
            <p>I completed my bachelor’s studies in AI at Islington College and work at NextAI, where I focus on WebRTC, voice agents and production-level realtime systems. My work sits where product thinking meets systems engineering: a useful interface on the front, resilient infrastructure underneath, and AI that earns its place.</p>
            <p>Outside work, I build open-source experiments, join hackathons and explore how speech and language technology can serve Nepali users better.</p>
            <div className="social-links"><a href="https://github.com/Shishir3D" target="_blank" rel="noreferrer"><Code2 size={19} /> GitHub</a><a href="https://linkedin.com/in/shishir3d" target="_blank" rel="noreferrer"><BriefcaseBusiness size={19} /> LinkedIn</a></div>
          </div>
        </section>

        <section className="section" id="stack">
          <div className="section-heading"><div><p className="section-label">Technical toolkit</p><h2>From prototype to production</h2></div><p>Tools change. The goal stays the same: ship dependable systems that solve real problems.</p></div>
          <div className="stack-grid">{stackGroups.map((group) => { const Icon = group.icon; return <article className="stack-card" key={group.title}><Icon size={22} /><h3>{group.title}</h3><div className="stack-items">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>; })}</div>
        </section>

        <section className="contact-section" id="contact">
          <div><p className="section-label">Let’s build something useful</p><h2>Have an AI, voice or mobile product in mind?</h2></div>
          <a className="button button-primary" href="https://linkedin.com/in/shishir3d" target="_blank" rel="noreferrer">Start a conversation <ArrowUpRight size={18} /></a>
        </section>
      </main>

      <footer className="site-footer"><div><span className="brand-mark small" aria-hidden="true">SP</span><p>Shishir Paudel · AI systems builder in Nepal</p></div><p>© {new Date().getFullYear()} Built with curiosity.</p></footer>
    </div>
  );
}

export default App;
