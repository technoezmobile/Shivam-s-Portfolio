import React from 'react';
import { Wrench, Database, Sparkles, Terminal, Globe, Code2 } from 'lucide-react';

interface ToolItem {
  name: string;
  icon: React.ReactNode;
}

const TOOLS: ToolItem[] = [
  {
    name: 'HTML5',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#e34f26">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.6 5.5H5.8l.4 4.5h12.5l-.5 5.5-6.2 1.7-6.2-1.7-.3-3.2h3.3l.1 1.4 3.1.8 3.1-.8.3-3.7H6.5L5.4 3h14l-.3 2.5z" />
      </svg>
    ),
  },
  {
    name: 'CSS3',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#1572b6">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.6 5.5H5.8l.4 4.5h12.5l-.5 5.5-6.2 1.7-6.2-1.7-.3-3.2h3.3l.1 1.4 3.1.8 3.1-.8.3-3.7H6.5L5.4 3h14l-.3 2.5z" />
      </svg>
    ),
  },
  {
    name: 'JavaScript (Basics)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#f7df1e">
        <path d="M0 0h24v24H0V0zm22 17.5c0-.9-.7-1.4-1.9-1.9l-.6-.2c-1-.4-1.4-.7-1.4-1.3 0-.6.5-1 1.3-1 .8 0 1.2.3 1.6.9l1.6-1c-.7-1.2-1.8-1.7-3.2-1.7-1.9 0-3.3 1.1-3.3 2.8 0 1.1.7 1.8 2 2.3l.6.2c1 .4 1.3.8 1.3 1.4 0 .7-.6 1.1-1.5 1.1-1.1 0-1.7-.6-2.2-1.4l-1.6 1c.7 1.4 1.9 2.2 3.8 2.2 2.2 0 3.6-1.1 3.6-2.9zm-7.6-6.2h-2.1v6.5c0 1.3-.7 1.8-1.8 1.8-.6 0-1.1-.2-1.4-.5l-.7 1.6c.6.5 1.4.7 2.3.7 2.2 0 3.7-1.1 3.7-3.5v-6.6z" />
      </svg>
    ),
  },
  {
    name: 'WordPress',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#21759b">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.9C6 22.9 1.1 18 1.1 12c0-2.4.8-4.7 2.2-6.5l6.3 17.2c-.8.1-1.6.2-2.4.2zm9.8-10.9c0 1.8-.7 3.5-1.8 4.9l-4.4-12.8c3.7 1.6 6.2 5.2 6.2 9.1v-1.2z" />
      </svg>
    ),
  },
  {
    name: 'Git & GitHub',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M12 0C5.4 0 0 5.4 0 12c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.3-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.9 1.2 2 1.2 3.3 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C20.6 21.8 24 17.3 24 12c0-6.6-5.4-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Vercel',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
        <path d="M12 1L24 22H0L12 1z" />
      </svg>
    ),
  },
  {
    name: 'SQL',
    icon: <Database size={18} color="#60a5fa" />,
  },
  {
    name: 'Python (Basics)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#387eb8">
        <path d="M11.9 0c-3.1 0-5.8.5-5.8 2.4v1.8h5.9v.6H3.8c-1.9 0-3.8 1.2-3.8 3.7 0 2.4 1.6 3.7 3.5 3.7h1.4v-1.7c0-2 1.7-3.7 3.7-3.7h5.8c1.7 0 3.1-1.4 3.1-3.1V2.4C17.6.5 15 0 11.9 0zm-1.8 1.2c.5 0 .9.4.9.9 0 .5-.4.9-.9.9-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9z" fill="#387eb8"/>
        <path d="M12.1 24c3.1 0 5.8-.5 5.8-2.4v-1.8h-5.9v-.6h8.2c1.9 0 3.8-1.2 3.8-3.7 0-2.4-1.6-3.7-3.5-3.7h-1.4v1.7c0 2-1.7 3.7-3.7 3.7H9.6c-1.7 0-3.1 1.4-3.1 3.1v1.8c0 1.9 2.6 2.4 5.6 2.4zm1.8-1.2c-.5 0-.9-.4-.9-.9 0-.5.4-.9.9-.9.5 0 .9.4.9.9 0 .5-.4.9-.9.9z" fill="#ffe052"/>
      </svg>
    ),
  },
  {
    name: 'Excel',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#107c41">
        <path d="M22.5 2h-13l-8 4v12l8 4h13c.8 0 1.5-.7 1.5-1.5V3.5c0-.8-.7-1.5-1.5-1.5zm-14 15.5l-2.2-3.7-2.2 3.7H2.5l3.2-5-3-4.8h1.7l2.1 3.7 2.1-3.7h1.6l-3 4.8 3.2 5h-1.9z" />
      </svg>
    ),
  },
  {
    name: 'Google Sheets',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="#0f9d58">
        <path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm2 14h-8v-2h8v2zm0-4h-8v-2h8v2zm-3-5V3.5L18.5 9H13z" />
      </svg>
    ),
  },
  {
    name: 'Search Console',
    icon: <Globe size={18} color="#4285f4" />,
  },
  {
    name: 'Filmora',
    icon: <Terminal size={18} color="#00f2d4" />,
  },
  {
    name: 'Canva',
    icon: <Code2 size={18} color="#00c4cc" />,
  },
  {
    name: 'AI-assisted Tools',
    icon: <Sparkles size={18} color="#3b82f6" />,
  },
];

export const Toolkit: React.FC = () => {
  return (
    <div className="toolkit-container" aria-label="Technical Toolkit & Software">
      <div className="toolkit-header-badge">
        <Wrench size={16} />
        <span>MY TOOLKIT</span>
      </div>

      <div className="toolkit-items-flex">
        {TOOLS.map((tool) => (
          <div key={tool.name} className="toolkit-tile">
            <span className="toolkit-tile-icon" aria-hidden="true">
              {tool.icon}
            </span>
            <span>{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
