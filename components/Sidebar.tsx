
import React from 'react';
import { CONTACT_INFO, PROFILE_IMAGE_URL, SOCIAL_LINKS } from '../constants';

const SOCIAL_ITEMS = [
  { icon: <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>, label: 'GitHub', link: SOCIAL_LINKS.github },
  { icon: <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>, label: 'LinkedIn', link: SOCIAL_LINKS.linkedin },
  { icon: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>, label: 'Email', link: SOCIAL_LINKS.email }
];

const Sidebar: React.FC = () => {
  return (
    <div className="w-full lg:w-80">
      <div className="lg:sticky lg:top-24 space-y-10 rise" style={{ '--i': 0 } as React.CSSProperties}>

        {/* Portrait — square with a hairline frame, like a spec-sheet ID photo */}
        <div className="w-36 h-36 lg:w-44 lg:h-44 overflow-hidden rounded-[4px] border border-line bg-panel pointer-events-none">
          <img
            src={PROFILE_IMAGE_URL}
            alt="Mihal Dimo"
            className="w-full h-full object-cover"
            onError={(e) => { (e.target as HTMLImageElement).src = 'https://ui-avatars.com/api/?name=Mihal+Dimo&background=000&color=fff'; }}
          />
        </div>

        <div className="space-y-5">
          <h1 className="font-black uppercase leading-none text-3xl tracking-tighter">
            Mihal<br />
            <span className="opacity-30 font-light">Dimo</span>
          </h1>
          <div className="space-y-1.5 font-mono text-[11px] uppercase tracking-[0.22em]">
            <p className="text-muted">Software engineer</p>
            <p className="text-muted">{CONTACT_INFO.location}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          {SOCIAL_ITEMS.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center space-x-3 text-muted hover:text-fg transition-colors duration-200"
            >
              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">{item.icon}</svg>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]">{item.label}</span>
              <span aria-hidden="true" className="font-mono text-[11px] text-accent opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
