import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CREATOR_CHANNELS } from '../data/portfolioData';

export const CreatorChannels: React.FC = () => {

  return (
    <ul className="creator-channels-list" aria-label="YouTube Creator Channels">
      {CREATOR_CHANNELS.map((channel) => (
        <li key={channel.id} className="channel-card-item">
          <a
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className="channel-card-link card-glass-interactive"
            aria-label={`Visit ${channel.name} channel on YouTube`}
          >
            <div className="channel-card-top">
              <div className="channel-brand-icon" aria-hidden="true">
                <img src={`/assets/channels/${channel.id}.${channel.id === 'tzailabs' ? 'png' : 'jpg'}`} alt="" width={64} height={64} loading="lazy" decoding="async" />
              </div>
              <span className="channel-category-tag">{channel.category}</span>
            </div>

            <div className="channel-info">
              <h3 className="channel-name">{channel.name}</h3>
              <span className="channel-handle">{channel.handle}</span>
              <p className="channel-tagline">{channel.tagline}</p>
            </div>

            <div className="channel-card-footer">
              <span>Watch on YouTube</span>
              <ArrowUpRight size={15} />
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};
