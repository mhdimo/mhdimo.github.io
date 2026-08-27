
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Experience', id: 'work' },
  { label: 'Projects', id: 'projects' },
];

const Navbar: React.FC = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/Resume.pdf';
    link.download = 'Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 104;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-ground/90 backdrop-blur-lg border-b border-line transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6">
        <button
          onClick={() => scrollToSection('home')}
          aria-label="Back to top"
          className="font-black uppercase tracking-tighter text-xl leading-none cursor-default"
        >
          Mihal&nbsp;<span className="opacity-40 font-light">Dimo</span>
        </button>

        {/* Section links only where they fit — on phones the page scrolls
            and the brand button returns to the top. */}
        <div className="hidden lg:flex items-center space-x-5 md:space-x-8">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted hover:text-fg transition-colors duration-200"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={handleDownloadCV}
            className="font-mono text-[11px] uppercase tracking-[0.2em] px-3.5 py-2 border border-line hover:border-fg text-fg hover:bg-fg hover:text-ground transition-colors duration-200 rounded-[3px]"
          >
            Resume
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
