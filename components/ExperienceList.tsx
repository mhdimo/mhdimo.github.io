import React from 'react';
import { ExperienceItem } from '../types';

const ExperienceList: React.FC<{ items: ExperienceItem[] }> = ({ items }) => {
  return (
    <div className="space-y-14">
      {items.map((item, idx) => (
        <article key={idx}>
          <div className="flex items-start gap-4">
            {item.logo && (
              <div className={`h-10 w-10 shrink-0 overflow-hidden rounded-[3px] border border-line ${item.logoTile === 'black' ? 'bg-black' : 'bg-white'}`}>
                <img
                  src={item.logo}
                  alt={`${item.organization} logo`}
                  loading="lazy"
                  className="h-full w-full object-contain"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              {/* Row 1: organization left, period · location right — always. */}
              <div className="flex flex-wrap items-baseline gap-x-8 gap-y-1">
                <h3 className="font-mono font-bold uppercase tracking-tight text-base md:text-lg leading-tight min-w-0">
                  {item.organization}
                </h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted text-right ml-auto">
                  <span className="whitespace-nowrap">{item.period}</span>
                  <span aria-hidden="true" className="mx-1.5">·</span>
                  <span className="whitespace-nowrap">{item.location}</span>
                </p>
              </div>
              {/* Row 2: role, always on its own line. */}
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent mt-2">
                {item.position}
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-3xl text-[15px] leading-relaxed opacity-80 whitespace-pre-line">
            {item.description}
          </p>
        </article>
      ))}
    </div>
  );
};

export default ExperienceList;
