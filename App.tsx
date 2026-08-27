
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ExperienceList from './components/ExperienceList';
import GithubProjects from './components/GithubProjects';
import Skills from './components/Skills';
import { EDUCATION_DATA, WORK_DATA, ABOUT_ME_TEXT, SOCIAL_LINKS } from './constants';

/** Section label with its hairline rule: the page's only heading device. */
const SectionHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-baseline gap-5 mb-10 md:mb-14">
    <h2 className="font-display font-semibold uppercase text-xl md:text-2xl tracking-[0.08em] whitespace-nowrap">
      {children}
    </h2>
    <span aria-hidden="true" className="flex-1 h-px bg-line" />
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-ground text-fg transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-28">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">

          {/* Identity Pillar */}
          <Sidebar />

          {/* Content Area */}
          <main className="flex-1 space-y-24 md:space-y-36">

            {/* Thesis */}
            <section id="home" className="pt-2">
              <div className="max-w-3xl">
                <p
                  className="rise text-2xl md:text-[1.7rem] leading-[1.5] font-light tracking-[-0.01em]"
                  style={{ '--i': 1 } as React.CSSProperties}
                >
                  {ABOUT_ME_TEXT.trim()}
                </p>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <SectionHeading>Technical Skills</SectionHeading>
              <Skills />
            </section>

            {/* Experience & Education Section */}
            <div className="space-y-28">
              <section id="work">
                <SectionHeading>Experience</SectionHeading>
                <ExperienceList items={WORK_DATA} />
              </section>

              <section id="school">
                <SectionHeading>Education</SectionHeading>
                <ExperienceList items={EDUCATION_DATA} />
              </section>
            </div>

            {/* Projects Section */}
            <section id="projects">
              <SectionHeading>Projects</SectionHeading>
              <GithubProjects />
            </section>

            {/* Footer */}
            <footer className="pt-14 border-t border-line flex flex-col md:flex-row justify-between items-center gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              <p className="whitespace-nowrap">© 2026 Mihal Dimo</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
                <a href="/about/" className="hover:text-fg transition-colors">About</a>
                <a href="/contact/" className="hover:text-fg transition-colors">Contact</a>
                <a href="/privacy/" className="hover:text-fg transition-colors">Privacy</a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">GitHub</a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg transition-colors">LinkedIn</a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
