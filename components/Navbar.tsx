
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

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
      const offset = 120;
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 dark:bg-black/90 backdrop-blur-lg border-b border-black/5 dark:border-white/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-24 flex items-center justify-between">
        <div className="hidden lg:flex lg:w-80 justify-center">
          <span className="text-3xl font-black tracking-tighter uppercase leading-none cursor-default">
            Mihal <span className="opacity-40 font-light">Dimo</span>
          </span>
        </div>

        <div className="lg:hidden">
           <span className="text-2xl font-black tracking-tighter uppercase leading-none cursor-default">
            Mihal <span className="opacity-40 font-light">Dimo</span>
          </span>
        </div>

        <div className="flex items-center space-x-6 md:space-x-10">
          <button onClick={() => scrollToSection('home')} className="text-xs uppercase tracking-[0.25em] font-bold opacity-60 hover:opacity-100 transition-opacity">Home</button>
          <button onClick={() => scrollToSection('work')} className="text-xs uppercase tracking-[0.25em] font-bold opacity-60 hover:opacity-100 transition-opacity">Experience</button>
          <button onClick={() => scrollToSection('projects')} className="text-xs uppercase tracking-[0.25em] font-bold opacity-60 hover:opacity-100 transition-opacity">Projects</button>
          <button 
            onClick={handleDownloadCV} 
            className="text-[10px] uppercase tracking-[0.25em] font-bold px-4 py-2 border-2 border-black/10 dark:border-white/10 rounded-lg hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
          >
            CV
          </button>
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
