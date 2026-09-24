const photoFiles = import.meta.glob('../assets/photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const curated = [
  { filename: 'hackathon-placeholder.webp', title: 'Hackathon nights', detail: 'Six hackathons, one win, and a NASA Space Apps 2023 honourable mention.', label: 'AI-generated scene · replace with your photo', alt: 'Illustrative hackathon team collaborating around laptops in Nepal' },
  { filename: 'apiga-placeholder.webp', title: 'A wider internet', detail: 'APIGA sharpened my interest in how technology, policy and people meet.', label: 'AI-generated scene · replace with your photo', alt: 'Illustrative internet governance discussion in Nepal' },
  { filename: 'speaking-placeholder.webp', title: 'Ideas out loud', detail: 'Learning in public through conversations, demos and events.', label: 'AI-generated scene · replace with your photo', alt: 'Illustrative speaker at a technology event in Nepal' },
];

const uploaded = Object.entries(photoFiles)
  .filter(([path]) => !path.includes('-placeholder.'))
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, src]) => ({
    src,
    title: path.split('/').pop()?.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ') ?? 'From the field',
    detail: '',
    label: 'From my photo archive',
    alt: 'Uploaded portfolio event photo',
  }));
const photos = [
  { src: '/profile.jpeg', title: 'A real moment', detail: 'At an AWS community event, still learning from the people around me.', label: 'Photo from my archive', alt: 'Shishir Poudel at an AWS community event' },
  ...curated.map((item) => ({ ...item, src: photoFiles[`../assets/photos/${item.filename}`] })),
  ...uploaded,
];

export default function PhotoArchive() {
  return <section className="photo-archive" id="field-notes" data-sc-act="flow" aria-labelledby="field-title">
    <div className="section-shell">
      <div className="section-heading photo-archive-heading">
        <div><p className="section-kicker">04 / FIELD NOTES</p><h2 id="field-title">Out of the <span className="highlight-mark">well, together.</span></h2></div>
        <p>The best lessons happened beyond a screen: building under pressure, meeting people and sharing ideas.</p>
      </div>
      <div className="photo-grid" data-sc-stagger="75">
        {photos.map((photo, index) => <figure className={`photo-card photo-card-${index % 3}`} data-sc-in key={photo.src}>
          <div className="photo-image"><img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" /></div>
          <figcaption><span className="photo-count">{String(index + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span><strong>{photo.title}</strong><span>{photo.detail}</span><small>{photo.label}</small></figcaption>
        </figure>)}
      </div>
      <div className="field-note"><span className="field-note-asterisk">✳</span><p>My final-year project turned paper invoices into digital records and used AI to answer phone orders when a small business owner was away. I keep coming back to that test: does the technology help someone in a real moment?</p></div>
    </div>
  </section>;
}
