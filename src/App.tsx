import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Download, Mail, Menu, X } from 'lucide-react';
import { capabilities, chapters, projects, repositories } from './content';
import LoopVideo from './components/LoopVideo';
import RepoDoodle from './components/RepoDoodle';
import PhotoArchive from './components/PhotoArchive';
import SupportScene from './components/SupportScene';
import './App.css';

const DoodleScene = lazy(() => import('./components/DoodleScene'));
const clamp = (n: number) => Math.max(0, Math.min(1, n));

export default function App() {
  const storyRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(media.matches);
    change();
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = storyRef.current?.getBoundingClientRect();
        if (rect) setProgress(clamp(-rect.top / Math.max(1, rect.height - window.innerHeight)));
      });
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); window.removeEventListener('resize', update); };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('keydown', close);
    return () => document.removeEventListener('keydown', close);
  }, [menuOpen]);

  return <div className="site" id="top">
    <a className="skip-link" href="#work">Skip to work</a>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Shishir Poudel, back to top" onClick={() => setMenuOpen(false)}>
        <img src="/favicon.svg?v=2" alt="" width="38" height="38" /><span>SHISHIR<span className="brand-dot">.</span></span>
      </a>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <a href="#story" onClick={() => setMenuOpen(false)}>The story</a>
        <a href="#work" onClick={() => setMenuOpen(false)}>Selected work</a>
        <a href="#field-notes" onClick={() => setMenuOpen(false)}>Field notes</a>
        <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
        <a href="#contact" onClick={() => setMenuOpen(false)} className="nav-contact">Say hello <ArrowUpRight size={16}/></a>
      </nav>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero section-shell" data-sc-act="flow" aria-labelledby="hero-title">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> SHISHIR POUDEL / AI ENGINEER / NEPAL</div>
          <h1 id="hero-title">A frog in a well<span className="hero-comma">,</span><br/><em>building a way out.</em></h1>
          <p className="hero-intro">I make voice AI, grounded retrieval systems and useful products. Every build is another rung toward a wider view.</p>
          <div className="hero-actions"><a className="button button-dark" href="#work">Explore my work <ArrowDownRight size={18}/></a><a className="text-link" href="#story">The story <ArrowRight size={17}/></a></div>
          <p className="hand-note hero-note">still looking up ↗</p>
        </div>
        <div className="hero-orbit hero-orbit-back" data-sc-parallax="-0.07" aria-hidden="true" />
        <figure className="hero-art" data-sc-tilt="3">
          <div className="paper-tape tape-one"/><div className="art-tag">FIG. 01 — THE CLIMB</div>
          <LoopVideo src="/media/ascent.mp4" poster="/media/ascent.webp" className="hero-film" reducedMotion={reducedMotion}/>
          <figcaption>A little frog climbs out of a sketched well toward the open sky.</figcaption>
          <span className="sketch-star star-one" aria-hidden="true">✳</span>
        </figure>
        <div className="hero-orbit hero-orbit-front" data-sc-parallax="0.11" aria-hidden="true"><span>↗</span></div>
        <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span>PORTFOLIO / 2026</span></div>
      </section>

      <section className="story" id="story" ref={storyRef} data-sc-act="flow" aria-labelledby="story-title">
        <div className="section-shell story-grid">
          <div className="story-visual">
            <div className="story-sticky">
              <div className="section-kicker">01 / THE JOURNEY</div>
              <h2 id="story-title">One step toward <span className="highlight-mark">more sky.</span></h2>
              <div className="scene-frame">
                <div className="scene-coordinates">A LITTLE INK, A LITTLE MOTION</div>
                <Suspense fallback={<div className="scene-placeholder" aria-hidden="true">◌</div>}><DoodleScene progress={progress} reducedMotion={reducedMotion}/></Suspense>
                <div className="scene-progress" aria-hidden="true"><span style={{ width: `${progress * 100}%` }}/></div>
              </div>
              <p className="scene-caption">The view changes as you move through the story.</p>
            </div>
          </div>
          <div className="story-chapters">
            {chapters.map((chapter) => <article className="chapter" id={`chapter-${chapter.number}`} data-sc-in key={chapter.number}>
              <div className="chapter-meta"><span>{chapter.number} / 04</span><span>✳ {chapter.name}</span></div>
              <h3>{chapter.title}</h3><p>{chapter.copy}</p>
              <div className="chapter-rule"/>
            </article>)}
          </div>
        </div>
      </section>

      <section className="work section-shell" id="work" data-sc-act="flow" aria-labelledby="work-title">
        <div className="section-heading"><div><p className="section-kicker">02 / SELECTED WORK</p><h2 id="work-title">Things I've <span className="highlight-mark">made real.</span></h2></div><p>From a sketch on paper to software people can actually use.</p></div>
        <div className="project-list">{projects.map((project, index) => <article className={`project-card project-${project.id}`} data-sc-in key={project.id}>
          <div className="project-media"><span className="project-index">{project.number} / 03</span>{project.id === 'support' ? <SupportScene reducedMotion={reducedMotion}/> : <LoopVideo src={project.video} poster={project.poster} className="project-film" reducedMotion={reducedMotion}/>}<span className="media-corner" data-sc-parallax="-0.04">↗</span></div>
          <div className="project-copy"><p className="section-kicker">{project.label}</p><h3>{project.title}</h3><p>{project.description}</p><ul className="tag-list" aria-label={`${project.title} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="project-fact"><span className="fact-spark">✳</span> {project.fact}</div>{index === 0 && <span className="hand-note project-note">the conversation keeps going →</span>}</div>
        </article>)}</div>
      </section>

      <section className="playground" aria-labelledby="playground-title"><div className="section-shell">
        <div className="section-heading"><div><p className="section-kicker">03 / FROM THE GITHUB NOTEBOOK</p><h2 id="playground-title">Side quests <span className="highlight-mark">count too.</span></h2></div><a className="text-link" href="https://github.com/Shishir3D" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={17}/></a></div>
        <div className="repo-grid">{repositories.map((repo) => <a className="repo-card" key={repo.id} href={repo.href} target="_blank" rel="noreferrer" aria-label={`${repo.title} on GitHub, opens in a new tab`}><div className="repo-card-top"><span>NO. {repo.number}</span><ArrowUpRight size={20}/></div><div className="repo-image"><RepoDoodle kind={repo.id}/></div><div className="repo-body"><h3>{repo.title}</h3><p>{repo.description}</p><span className="repo-tags">{repo.tags.join(' / ')}</span></div></a>)}</div>
      </div></section>

      <PhotoArchive />

      <section className="about section-shell" id="about" aria-labelledby="about-title"><div className="about-main">
        <div className="about-photo-wrap"><img className="about-photo" src="/profile.jpeg" alt="Shishir Poudel at an AWS community event" loading="lazy"/><span className="photo-label">ME, OUTSIDE THE WELL ↗</span><span className="hand-note photo-note">hi, I'm Shishir!</span></div>
        <div className="about-copy"><p className="section-kicker">05 / THE HUMAN BEHIND THE BUILDS</p><h2 id="about-title">A builder with <span className="highlight-mark">room to grow.</span></h2><p>I'm Shishir Poudel, an AI engineer in Nepal. I care about what happens after the prototype: whether a conversation feels natural, an answer can be traced to its source, or a product makes sense on a real person's phone.</p><p>My work crosses models, APIs, data, mobile interfaces and deployment. I keep learning because the horizon keeps moving.</p><a className="button button-outline" href="/resume/Shishir-Poudel-Resume.pdf?v=2" download="Shishir-Poudel-Resume.pdf">Download résumé <Download size={17}/></a></div>
      </div>
      <div className="experience"><div className="mini-heading"><p className="section-kicker">EXPERIENCE / NOTES FROM THE CLIMB</p><span>2025 → NOW</span></div><div className="experience-grid">
        <article className="experience-card"><span className="experience-date">NOV 2025 — PRESENT · FULL-TIME</span><h3>AI Developer <span>@ Next AI Pvt. Ltd</span></h3><p>Own a voice-to-voice AI system for 1,000+ concurrent users in an app with 500k+ downloads. Build speech processing, FastAPI workflows, orchestration and scalable deployment. Fine-tuned Gemma 3 for customer support and Piper TTS; deployed Omni Voice and Qwen3 TTS. Prompt-engineered 48 English-learning characters and built a customer-support agent using RAG and a locally deployed LLM. I am also exploring local Nepali STT, LLM and TTS components.</p></article>
        <article className="experience-card"><span className="experience-date">JUN 2025 — PRESENT · CONTRACT</span><h3>Full-Stack Developer <span>@ Simal</span></h3><p>Built an end-to-end, multi-tenant SaaS mobile app with React Native, Supabase and PostgreSQL, including a generative UI reporting dashboard.</p></article>
      </div></div>
      <div className="skills-wrap"><p className="section-kicker">TOOLS IN THE BACKPACK</p><div className="skill-grid">{capabilities.map(([label, value]) => <div className="skill-row" key={label}><h3>{label}</h3><p>{value}</p></div>)}</div></div>
      <div className="credentials"><p className="section-kicker">SMALL WINS ALONG THE WAY</p><p>NASA Space Apps Challenge 2023 — Honorable Mention <span>✳</span> Hackathon winner <span>✳</span> AWS Certified Cloud Practitioner <span>✳</span> AWS Machine Learning Fundamentals</p><p className="degree">BSc (Hons) Computing with Artificial Intelligence · 2023–2026</p></div>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title"><div className="section-shell contact-inner"><p className="section-kicker">06 / THE HORIZON IS OPEN</p><h2 id="contact-title">Have a good <span>question?</span></h2><p>Let's make something thoughtful, useful and a little unexpected.</p><a className="contact-mail" href="mailto:shishirpoudel.dev@gmail.com">shishirpoudel.dev@gmail.com <ArrowUpRight size={24}/></a><div className="contact-links"><a href="https://github.com/Shishir3D" target="_blank" rel="noreferrer"><ArrowUpRight size={18}/> GitHub</a><a href="https://www.linkedin.com/in/shishir3d/" target="_blank" rel="noreferrer"><ArrowUpRight size={18}/> LinkedIn</a><a href="mailto:shishirpoudel.dev@gmail.com"><Mail size={18}/> Email</a></div><div className="contact-doodle" aria-hidden="true">↗</div></div></section>
    </main>
    <footer className="site-footer section-shell"><span>© {new Date().getFullYear()} SHISHIR POUDEL</span><span>DRAWN WITH CURIOSITY · BUILT WITH CODE</span><a href="#top">BACK TO TOP ↑</a></footer>
  </div>;
}
