import { useEffect } from 'react';
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { aboutDescription, contact, passtimePhotos, passtimes, projects, skills } from './data';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    const id = location.hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 50);
    }
  }, [location]);

  const goToSection = async (sectionId) => {
    if (location.pathname === '/projects') {
      await navigate(`/#${sectionId}`);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div className="app-shell">
      <TopBar onNavigate={goToSection} />
      <Routes>
        <Route path="/projects" element={<ProjectsPage />} />
        <Route
          path="*"
          element={
            <main className="desktop">
              <section id="home" className="desktop-panel">
                <HeroWindow onNavigate={goToSection} />
              </section>
              <section id="about" className="desktop-panel">
                <AboutWindow />
              </section>
              <section id="passtimes" className="desktop-panel">
                <PasstimesWindow />
              </section>
              <section id="skills" className="desktop-panel">
                <SkillsWindow />
              </section>
              <section id="dirtcore" className="desktop-panel">
                <DirtCoreWindow />
              </section>
              <section id="contact" className="desktop-panel">
                <ContactWindow />
              </section>
              <Footer />
            </main>
          }
        />
      </Routes>
    </div>
  );
}

function TopBar({ onNavigate }) {
  return (
    <header className="topbar">
      <div className="topbar__brand">
        <span className="apple-dot" aria-hidden="true" />
        <span>Ryan Franco Portfolio 1.1</span>
      </div>
      <nav className="topbar__nav" aria-label="Primary">
        <button type="button" onClick={() => onNavigate('home')}>
          Home
        </button>
        <button type="button" onClick={() => onNavigate('about')}>
          About
        </button>
        <button type="button" onClick={() => onNavigate('passtimes')}>
          Passtimes
        </button>
        <button type="button" onClick={() => onNavigate('skills')}>
          Skills
        </button>
        <button type="button" onClick={() => onNavigate('dirtcore')}>
          DirtCore
        </button>
        <Link className="nav-link-button" to="/projects">
          Projects
        </Link>
        <button type="button" onClick={() => onNavigate('contact')}>
          Contact
        </button>
      </nav>
    </header>
  );
}

function HeroWindow({ onNavigate }) {
  return (
    <MacWindow title="Welcome!">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Software Development and Network Engineering</p>
          <h1>Welcome to my Portfolio, Come stay for awhile...</h1>
          <p className="hero-intro">
            Ryan Franco is building toward systems architecture through software engineering,
            networking, hands on product work and home labs. 
          </p>
          <div className="hero-actions">
            <Link className="mac-button nav-link-button" to="/projects">
              View Work
            </Link>
            <button type="button" className="mac-button mac-button--inverse" onClick={() => onNavigate('contact')}>
              Contact
            </button>
          </div>
          <div className="hero-meta">
            <div className="meta-card">
              <span className="meta-label">Focus</span>
              <strong>Architecture, backend, networking</strong>
            </div>
            <div className="meta-card">
              <span className="meta-label">Current Stage</span>
              <strong>Third year Sheridan College student</strong>
            </div>
          </div>
        </div>

        <div className="hero-portrait-panel">
          <div className="portrait-frame">
            <img src="/images/port.jpg" alt="Portrait of Ryan Franco" />
          </div>
          <div className="finder-note">
            <span className="finder-note__title">Profile Notes</span>
            <p>Adrenaline-driven builder with an interest in reliable systems and deliberate design.</p>
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

function AboutWindow() {
  return (
    <MacWindow title="About Me">
      <div className="split-layout">
        <div className="window-copy">
          <h2>About Me</h2>
          <p>{aboutDescription}</p>
        </div>
        <aside className="side-panel">
          <h3>Working Style</h3>
          <ul className="check-list">
            <li>Fast learner across new platforms and tools</li>
            <li>Comfortable in high-pressure, team-driven environments</li>
            <li>Interested in systems architecture and durable software</li>
          </ul>
        </aside>
      </div>
    </MacWindow>
  );
}

function PasstimesWindow() {
  return (
    <MacWindow title="Passtimes">
      <div className="window-copy">
        <h2>Hobbies &amp; Passtimes</h2>
        <div className="passtimes-layout">
          <div className="passtimes-copy">
            {passtimes.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div className="photo-strip">
            {passtimePhotos.map((img, index) => (
              <figure key={img} className="photo-card">
                <img src={img} className="passtime-img" alt={`Passtime ${index + 1}`} />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

function SkillsWindow() {
  const skillSections = [
    ['Programming', skills.programming],
    ['Operating Systems', skills.operatingSystems],
    ['Network Technologies', skills.networkTechnologies],
    ['Database Administration', skills.databaseAdministration],
    ['Virtual Machines', skills.virtualMachines],
    ['Linux File Systems', skills.linuxFileSystems],
  ];

  return (
    <MacWindow title="Technical Skills">
      <div className="window-copy">
        <h2>Technical Skills</h2>
        <div className="skill-grid">
          {skillSections.map(([title, items]) => (
            <section className="skill-box" key={title}>
              <h3>{title}</h3>
              <ul>
                {items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </MacWindow>
  );
}

function ProjectsPage() {
  return (
    <main className="desktop desktop--projects">
      <section className="desktop-panel">
        <MacWindow title="Projects">
          <div className="projects-header">
            <div>
              <p className="eyebrow">Selected Work</p>
              <h1>Projects</h1>
            </div>
            <Link className="mac-button nav-link-button mac-button--inverse" to="/">
              Back to Welcome Page
            </Link>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.name} className="project-card">
                <div className="project-card-header">
                  <h2>{project.name}</h2>
                </div>
                <img src={project.img} alt={`${project.name} screenshot`} className="project-image" />
                <div className="project-card-content">
                  <p>{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </MacWindow>
      </section>
      <Footer />
    </main>
  );
}

function DirtCoreWindow() {
  return (
    <MacWindow title="DirtCore Concepts">
      <div className="split-layout">
        <div className="window-copy">
          <h2>DirtCore Concepts</h2>
          <p>
            I am the owner and operator of DirtCore Concepts, a brand rooted in motocross,
            creative direction, and execution. It is a hands on extension of who I am outside of
            school and gives me another outlet to build something with intention.
          </p>
          <p>
            Running DirtCore Concepts has strengthened how I think about identity, presentation,
            and follow through with ideas, which carries directly into the way I approach software and other
            projects.
          </p>
        </div>
        <aside className="side-panel">
          <h3>Visit The Site</h3>
          <p>Open the live DirtCore Concepts website directly.</p>
          <a
            className="mac-button nav-link-button"
            href="https://www.dirtcoreconcepts.com"
            target="_blank"
            rel="noreferrer"
          >
            Go to DirtCore Concepts
          </a>
        </aside>
      </div>
    </MacWindow>
  );
}

function ContactWindow() {
  return (
    <MacWindow title="Contact">
      <div className="split-layout">
        <div className="window-copy">
          <h2>Contact Me</h2>
          <p>{contact.message}</p>
          <div className="contact-list">
            <p>
              <span>Email</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </p>
            <p>
              <span>LinkedIn</span>
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                View Profile
              </a>
            </p>
            <p>
              <span>GitHub</span>
              <a href={contact.github} target="_blank" rel="noreferrer">
                Browse Repositories
              </a>
            </p>
          </div>
        </div>
        <aside className="side-panel">
          <h3>Resume</h3>
          <p>Download the latest resume directly from the portfolio.</p>
          <a className="mac-button nav-link-button" href="/assets/Ryan-Franco-ResumeFinal.pdf" download>
            Download Resume
          </a>
        </aside>
      </div>
    </MacWindow>
  );
}

function MacWindow({ title, children }) {
  return (
    <article className="mac-window">
      <header className="mac-window__titlebar">
        <div className="window-controls" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p>{title}</p>
        <div className="window-lines" aria-hidden="true" />
      </header>
      <div className="mac-window__body">{children}</div>
    </article>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} The Franco Software Agency (FSA). All rights reserved.</p>
    </footer>
  );
}

export default App;
