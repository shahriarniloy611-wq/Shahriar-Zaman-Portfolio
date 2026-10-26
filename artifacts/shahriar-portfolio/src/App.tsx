import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  category: string;
  note: string;
  pages: number[];
  labels: string[];
};

type GalleryImage = {
  project: Project;
  page: number;
  label: string;
  src: string;
  alt: string;
};

const projects: Project[] = [
  {
    id: 'hoodie',
    title: 'Hoodie & trouser concepts',
    category: 'Hoodies',
    note: 'Digital garment simulation · tech pack · 3D product development',
    pages: [3, 4, 5, 6, 7, 8],
    labels: ['Collection overview', 'Graphic placement', 'Front artwork', 'Colour variations', '3D render & details', 'Concept research'],
  },
  {
    id: 'tee',
    title: 'T-shirt concepts',
    category: 'T-shirts',
    note: 'Artwork development · colour direction · fit & construction',
    pages: [10, 11, 12, 13, 14],
    labels: ['Collection overview', 'Trend & concept development', 'Artwork details', '3D render & specs', 'Seasonal colour palette'],
  },
  {
    id: 'sweatshirt',
    title: 'Sweatshirt concepts',
    category: 'Sweatshirts',
    note: 'Graphic-led fleece · seasonal colour development',
    pages: [16, 17, 18, 19, 20],
    labels: ['Collection overview', 'Trend research', 'Artwork placement', 'Seasonal colour palette', '3D render & details'],
  },
  {
    id: 'drop-shoulder',
    title: 'Drop-shoulder concepts',
    category: 'Drop shoulder',
    note: 'Oversized silhouettes · front & back artwork',
    pages: [22, 23],
    labels: ['Collection overview', 'Colour palette & variations'],
  },
  {
    id: 'kids',
    title: 'Kids’ T-shirt concepts',
    category: 'Kidswear',
    note: 'Character-led graphics · product overview',
    pages: [24, 25, 26],
    labels: ['Collection overview', 'Product overview', 'Trend & research'],
  },
];

const filters = ['All work', 'Hoodies', 'T-shirts', 'Sweatshirts', 'Drop shoulder', 'Kidswear'];
const imagePath = (page: number) => `/images/portfolio-page-${String(page).padStart(2, '0')}.webp`;

function App() {
  const [activeFilter, setActiveFilter] = useState('All work');
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  const allImages = useMemo<GalleryImage[]>(
    () =>
      projects.flatMap((project) =>
        project.pages.map((page, index) => ({
          project,
          page,
          label: project.labels[index],
          src: imagePath(page),
          alt: `${project.title}: ${project.labels[index].toLowerCase()}, portfolio page ${String(page).padStart(2, '0')}`,
        })),
      ),
    [],
  );

  const visibleProjects = activeFilter === 'All work'
    ? projects
    : projects.filter((project) => project.category === activeFilter);

  const currentImageIndex = activeImage
    ? allImages.findIndex((image) => image.page === activeImage.page)
    : -1;

  const changeImage = (direction: number) => {
    if (currentImageIndex < 0) return;
    const nextIndex = (currentImageIndex + direction + allImages.length) % allImages.length;
    setActiveImage(allImages[nextIndex]);
  };

  useEffect(() => {
    if (!activeImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowRight') changeImage(1);
      if (event.key === 'ArrowLeft') changeImage(-1);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeImage, currentImageIndex]);

  return (
    <div className="portfolio-shell">
      <header className="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href="#top" aria-label="Shahriar Zaman home" data-testid="link-home">
            <span className="brand-mark">sz</span>
            <span className="brand-name">Shahriar Zaman<span className="brand-sub">Fashion & 3D design</span></span>
          </a>
          <nav className="nav-links" aria-label="Main navigation">
            <a href="#work" data-testid="link-work">Selected work</a>
            <a href="#about" data-testid="link-about">About</a>
            <a href="#contact" data-testid="link-contact">Contact <ArrowUpRight size={12} /></a>
          </nav>
          <div className="nav-availability"><span className="availability-dot" /> Dhaka, Bangladesh</div>
        </div>
      </header>

      <main>
        <section className="hero wrap" id="top">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="hero-kicker eyebrow reveal">Independent design practice · Dhaka</div>
              <h1 className="reveal reveal-delay-1">Made to be<br /><em>worn.</em></h1>
              <p className="hero-lede reveal reveal-delay-2">
                I’m Shahriar Zaman, a junior fashion designer working across apparel graphics, digital garment simulation and 3D product development.
              </p>
              <div className="hero-actions reveal reveal-delay-3">
                <a className="button-primary" href="#work" data-testid="link-explore-work">Explore selected work <ArrowDown size={14} /></a>
                <a className="text-link" href="#about" data-testid="link-about-me">A little about me</a>
              </div>
              <div className="hero-meta">
                <div className="meta-item"><span>Studio base</span><strong>Dhaka, Bangladesh</strong></div>
                <div className="meta-item"><span>Working in</span><strong>Apparel & 3D</strong></div>
                <div className="meta-item"><span>Currently</span><strong>Fuad Apearels</strong></div>
              </div>
            </div>
            <div className="hero-portrait reveal reveal-delay-2">
              <span className="portrait-index eyebrow">01 — The designer</span>
              <img src={imagePath(1)} alt="Portrait of fashion designer Shahriar Zaman in a black jacket" fetchPriority="high" />
              <div className="portrait-caption eyebrow"><span>Shahriar Zaman</span><span>Designer / 3D developer</span></div>
            </div>
          </div>
          <div className="scroll-note eyebrow"><span>A considered eye for the everyday</span><span>Scroll to explore ↓</span></div>
        </section>

        <div className="intro-strip">
          <div className="wrap intro-strip-inner">
            <p>From first sketch to a garment you can almost touch.</p>
            <div className="strip-right">Graphics / colour / construction<br />Digital-first, detail-led</div>
          </div>
        </div>

        <section className="work-section wrap" id="work">
          <div className="section-head">
            <div>
              <div className="eyebrow">The portfolio · 2025—26</div>
              <h2 className="section-title">Ideas into <em>form.</em></h2>
            </div>
            <p className="section-aside">Apparel concepts developed through artwork, colour studies, technical thinking and digital product views.</p>
          </div>
          <div className="filter-row" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                className={`filter-btn${activeFilter === filter ? ' active' : ''}`}
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                data-testid={`filter-${filter.toLowerCase().replaceAll(' ', '-')}`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="project-list" aria-live="polite">
            {visibleProjects.length ? visibleProjects.map((project, projectIndex) => (
              <article className="project-block" key={project.id}>
                <div className="project-head">
                  <h3 className="project-name"><span className="project-number">0{projects.indexOf(project) + 1}</span>{project.title}</h3>
                  <span className="project-note">{project.note}</span>
                </div>
                <div className="project-gallery">
                  {project.pages.map((page, index) => (
                    <button
                      className="gallery-item"
                      type="button"
                      key={page}
                      onClick={() => setActiveImage(allImages.find((image) => image.page === page) ?? null)}
                      aria-label={`Open ${project.title}, ${project.labels[index]}`}
                      data-testid={`open-project-image-${page}`}
                    >
                      <img src={imagePath(page)} alt={`${project.title}: ${project.labels[index].toLowerCase()}`} loading={projectIndex > 0 || index > 1 ? 'lazy' : 'eager'} />
                      <span className="image-label">{project.labels[index]}</span>
                      <span className="image-count">{String(page).padStart(2, '0')} / 26</span>
                    </button>
                  ))}
                </div>
              </article>
            )) : <div className="no-projects">No projects in this category yet.</div>}
          </div>
        </section>

        <section className="practice" aria-labelledby="practice-title">
          <div className="wrap practice-grid">
            <div>
              <div className="eyebrow">The way I work</div>
              <h2 className="practice-title" id="practice-title">A clear path<br />from <em>idea</em> to<br />apparel.</h2>
              <p className="practice-copy">A good concept should read clearly on screen and make sense on the production floor. I bring the visual and technical sides of a garment into the same conversation.</p>
            </div>
            <div className="discipline-list">
              <div className="discipline"><span className="discipline-num">01</span><strong>Digital garment simulation</strong><span>CLO3D</span></div>
              <div className="discipline"><span className="discipline-num">02</span><strong>Tech packs & apparel development</strong><span>Construction</span></div>
              <div className="discipline"><span className="discipline-num">03</span><strong>Apparel graphics & artwork</strong><span>Illustrator / Photoshop</span></div>
              <div className="discipline"><span className="discipline-num">04</span><strong>Colour development</strong><span>Seasonal palettes</span></div>
              <div className="discipline"><span className="discipline-num">05</span><strong>3D product development</strong><span>Digital product views</span></div>
            </div>
          </div>
        </section>

        <section className="profile wrap" id="about">
          <div className="profile-grid">
            <div>
              <div className="eyebrow">A little context</div>
              <h2 className="profile-heading">Curious about<br /><em>how it’s made.</em></h2>
              <p className="profile-lede">I’m a Dhaka-based junior fashion designer building a practice around wearable graphics, thoughtful colour and digital apparel workflows. My work connects creative direction with the information a product needs to move forward.</p>
              <div className="skill-label">Tools in my practice</div>
              <div className="skill-chips"><span className="skill-chip">CLO3D</span><span className="skill-chip">Adobe Illustrator</span><span className="skill-chip">Adobe Photoshop</span></div>
              <div className="skill-label">Languages</div>
              <div className="language-list">
                <div className="language-item"><span>Bangla</span><span>Excellent</span></div>
                <div className="language-item"><span>English</span><span>Excellent</span></div>
                <div className="language-item"><span>Hindi</span><span>Medium</span></div>
              </div>
            </div>
            <div>
              <div className="eyebrow">Experience & education</div>
              <div className="timeline">
                <div className="timeline-row">
                  <div className="timeline-date">Sept 2025<br />— Present</div>
                  <div>
                    <strong>Junior Fashion Designer · Fuad Apearels</strong>
                    <p>Builds mood boards, flat sketches, print artwork and seasonal colour stories; prepares tech packs for sampling and bulk production; presents concepts to buyers and works with development and sample teams.</p>
                  </div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-date">2023<br />— 2026</div>
                  <div><strong>BBA in Management · Ongoing</strong><p>Daffodil Institute of IT</p></div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-date">2021<br />— 2022</div>
                  <div><strong>Higher Secondary Certificate · Science</strong><p>Dhaka Uddan Govt. College · GPA 4.50 / 5.00</p></div>
                </div>
                <div className="timeline-row">
                  <div className="timeline-date">2018<br />— 2020</div>
                  <div><strong>Secondary School Certificate · Science</strong><p>Mohammadpur Govt. High School · GPA 4.89 / 5.00</p></div>
                </div>
              </div>
              <div className="skill-label">Training & workshops</div>
              <div className="training-list">
                <div className="training-item">
                  <strong>Fashion Graphics Design · PoranA</strong>
                  <span>Apr–Aug 2025 · Flat sketches, pattern layouts and apparel presentation materials with Illustrator and Photoshop</span>
                </div>
                <div className="training-item">
                  <strong>CLO3D Garment Simulation & Design · PoranA</strong>
                  <span>Jan–Mar 2025 · 3D digital draping, virtual prototyping and digital fabric simulation</span>
                </div>
                <div className="training-item">
                  <strong>Additional training · PoranA</strong>
                  <span>Tech Pack Design · Textile Print Design</span>
                </div>
              </div>
              <div className="skill-label">Core competencies</div>
              <div className="skill-chips">
                <span className="skill-chip">Digital garment simulation</span>
                <span className="skill-chip">Technical flat sketching</span>
                <span className="skill-chip">Tech pack development</span>
                <span className="skill-chip">Pattern making</span>
                <span className="skill-chip">Mood board creation</span>
                <span className="skill-chip">Sustainable fabric sourcing</span>
                <span className="skill-chip">Textile properties</span>
                <span className="skill-chip">Production costing sheets</span>
                <span className="skill-chip">Sample development</span>
                <span className="skill-chip">Textile print design</span>
                <span className="skill-chip">Colour development</span>
                <span className="skill-chip">Marketing</span>
              </div>
              <div className="skill-label">Additional creative work</div>
              <p className="achievement-copy">Created pitch decks, vector graphics and promotional campaign assets with Illustrator and Photoshop. Trend analysis and precise layouts helped strengthen brand consistency, support client acquisition and streamline visual communication for business development.</p>
            </div>
          </div>
        </section>

        <footer className="contact" id="contact">
          <div className="wrap">
            <div className="contact-top">
              <div>
                <div className="eyebrow">Open to thoughtful collaborations · Dhaka, Bangladesh</div>
                <h2>Let’s make<br /><em>something.</em></h2>
                <p className="contact-sub">Have a garment, graphic or product idea in mind? I’d love to hear what you’re working on.</p>
              </div>
              <div className="contact-actions">
                <a className="contact-link" href="mailto:shahriarniloy611@gmail.com" data-testid="link-email"><span>shahriarniloy611@gmail.com</span><ArrowUpRight size={16} /></a>
                <a className="contact-link" href="tel:01540771585" data-testid="link-phone"><span>01540771585</span><ArrowUpRight size={16} /></a>
              </div>
            </div>
            <div className="contact-foot"><span>Shahriar Zaman · Fashion & 3D apparel</span><span>Dhaka, Bangladesh</span><a href="#top" className="text-link" style={{ color: 'inherit' }} data-testid="link-back-to-top">Back to top ↑</a></div>
          </div>
        </footer>
      </main>

      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activeImage.project.title} image viewer`} onClick={() => setActiveImage(null)}>
          <button className="lightbox-close" type="button" aria-label="Close image viewer" onClick={() => setActiveImage(null)} data-testid="button-close-image"><X size={22} /></button>
          <button className="lightbox-prev" type="button" aria-label="Previous image" onClick={(event) => { event.stopPropagation(); changeImage(-1); }} data-testid="button-previous-image"><ArrowLeft size={20} /></button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
          <button className="lightbox-next" type="button" aria-label="Next image" onClick={(event) => { event.stopPropagation(); changeImage(1); }} data-testid="button-next-image"><ArrowRight size={20} /></button>
          <div className="lightbox-caption">{activeImage.project.title} · {activeImage.label} · page {String(activeImage.page).padStart(2, '0')}</div>
        </div>
      )}
    </div>
  );
}

export default App;
