
import React from 'react';
import { SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <div className="divide-y divide-black/5 dark:divide-white/5 border-t border-b border-black/5 dark:border-white/5">
      {SKILLS_DATA.map((group, i) => (
        <div 
          key={i} 
          className="flex flex-col md:flex-row py-7 md:py-8 transition-colors duration-300 group"
        >
          {/* Category Label */}
          <div className="w-full md:w-56 mb-4 md:mb-0">
            <h4 className="text-xs uppercase tracking-[0.3em] font-bold opacity-30 group-hover:opacity-100 transition-opacity">
              {group.category}
            </h4>
          </div>

          {/* Skill Tags */}
          <div className="flex-1 flex flex-wrap gap-2.5">
            {group.items.map((skill, j) => (
              <span 
                key={j} 
                className="text-xs font-medium tracking-tight px-3.5 py-1.5 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-md opacity-75 hover:opacity-100 hover:border-black/20 dark:hover:border-white/20 transition-all cursor-default"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skills;
