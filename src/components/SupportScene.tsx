import { useEffect, useRef, useState } from 'react';

export default function SupportScene({ reducedMotion }: { reducedMotion: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setActive(entry.isIntersecting), { threshold: 0.18 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`support-scene ${active && !reducedMotion ? 'is-active' : ''}`} role="img" aria-label="Illustration of a customer question passing into a locally hosted AI model, retrieving an answer, and returning a response">
    <div className="support-scene-grid" aria-hidden="true" />
    <div className="support-stage support-question"><span className="support-symbol">?</span><span className="support-stage-label">A question arrives</span></div>
    <div className="support-path support-path-one" aria-hidden="true"><i/></div>
    <div className="support-stage support-model"><div className="support-cube"><span>LOCAL<br/>LLM</span></div><span className="support-stage-label">Knowledge + model</span></div>
    <div className="support-path support-path-two" aria-hidden="true"><i/></div>
    <div className="support-stage support-answer"><span className="support-symbol">↗</span><span className="support-stage-label">An answer returns</span></div>
    <div className="support-scene-footer"><span>ON-DEVICE / PRIVATE INFRASTRUCTURE</span><span>01 → 02 → 03</span></div>
  </div>;
}
