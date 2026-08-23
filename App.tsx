
import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ExperienceList from './components/ExperienceList';
import GithubProjects from './components/GithubProjects';
import Skills from './components/Skills';
import { EDUCATION_DATA, WORK_DATA, ABOUT_ME_TEXT, SOCIAL_LINKS } from './constants';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-48 pb-32">
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          
          {/* Identity Pillar */}
          <Sidebar />
          
          {/* Content Area */}
          <main className="flex-1 space-y-28 md:space-y-40">
            
            {/* Hero Introduction */}
            <section id="home" className="pt-4">
              <div className="max-w-4xl">
                <p className="text-3xl md:text-4xl font-normal leading-[1.4] tracking-tight opacity-95">
                  {ABOUT_ME_TEXT}
                </p>
              </div>
            </section>

            {/* Skills Section */}
            <section>
              <div className="mb-12">
                <h2 className="text-3xl font-black tracking-tight uppercase">Technical Skills.</h2>
              </div>
              <Skills />
            </section>

            {/* Experience & Education Section */}
            <div className="space-y-32">
              <section id="work">
                <ExperienceList items={WORK_DATA} title="Experience" />
              </section>
              
              <section id="school">
                <ExperienceList items={EDUCATION_DATA} title="Education" />
              </section>
            </div>

            {/* Projects Section */}
            <section id="projects" className="pt-4">
              <div className="mb-12">
                <h2 className="text-3xl font-black tracking-tight uppercase">Projects.</h2>
              </div>
              <GithubProjects />
            </section>

            {/* Footer */}
            <footer className="pt-24 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 opacity-40 text-xs font-bold uppercase tracking-[0.4em]">
              <p>© 2026 Mihal Dimo</p>
              <div className="flex flex-wrap justify-center gap-x-12 gap-y-4">
                <a href="/about/" className="hover:opacity-100 transition-opacity">About</a>
                <a href="/contact/" className="hover:opacity-100 transition-opacity">Contact</a>
                <a href="/privacy/" className="hover:opacity-100 transition-opacity">Privacy</a>
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">GitHub</a>
                <a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a>
              </div>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
