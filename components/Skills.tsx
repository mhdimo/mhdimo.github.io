
import React from 'react';
import { SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <div className="divide-y divide-line border-t border-b border-line">
      {SKILLS_DATA.map((group, i) => (
        <div
          key={i}
          className="flex flex-col md:flex-row py-6 md:py-7 group"
        >
          {/* Category Label */}
          <div className="w-full md:w-52 shrink-0 mb-4 md:mb-0">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted group-hover:text-fg transition-colors duration-200">
              {group.category}
            </h4>
          </div>

          {/* Skill chips — mono, squared, part-number sized */}
          <div className="flex-1 flex flex-wrap gap-2">
            {group.items.map((skill, j) => (
              <span
                key={j}
                className="font-mono text-[11px] tracking-tight px-2.5 py-1.5 border border-line rounded-[3px] opacity-70 hover:opacity-100 hover:border-muted transition-colors cursor-default"
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
