import React from 'react';
import { ExperienceItem } from '../types';

interface ExperienceListProps {
  items: ExperienceItem[];
  title: string;
}

const ExperienceList: React.FC<ExperienceListProps> = ({ items, title }) => {
  return (
    <div className="mb-16">
      <div className="mb-12">
        <h2 className="text-3xl font-black tracking-tight uppercase">{title}.</h2>
      </div>
      <div className="space-y-16">
        {items.map((item, idx) => (
          <div key={idx} className="group relative">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-1 gap-2">
              <div className="flex items-center gap-3">
                {item.logo && (
                  <div className={`h-10 w-10 shrink-0 overflow-hidden rounded-xl ${item.logoTile === 'black' ? 'bg-black' : 'bg-white'}`}>
                    <img
                      src={item.logo}
                      alt={`${item.organization} logo`}
                      loading="lazy"
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <h4 className="text-xl font-bold tracking-tight uppercase">{item.organization}</h4>
              </div>
              <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">
                <span>{item.location}</span>
                <span className="opacity-30">•</span>
                <span>{item.period}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mb-4">
               <div className="w-4 h-[1px] bg-black/20 dark:bg-white/20"></div>
               <p className="text-xs font-black uppercase tracking-[0.2em] opacity-60">
                 {item.position}
               </p>
            </div>
            <div className="relative max-w-3xl pl-6 ml-1">
              {/* Brand gradient along the paragraph's line */}
              <span
                aria-hidden="true"
                className={`absolute inset-y-0 left-0 w-[3px] rounded-full ${item.accent ? '' : 'bg-black/10 dark:bg-white/10'}`}
                style={item.accent ? { backgroundImage: `linear-gradient(180deg, ${item.accent[0]}, ${item.accent[1]})` } : undefined}
              />
              <p className="text-base leading-relaxed opacity-75 whitespace-pre-line">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceList;