import React from 'react';
import { Heart } from 'lucide-react';

interface LivesDisplayProps {
  lives: number;
}

const LivesDisplay: React.FC<LivesDisplayProps> = ({ lives }) => {
  return (
    <div className="lives-container flex space-x-1">
      {[...Array(3)].map((_, index) => (
        <Heart 
          key={index}
          size={24}
          fill={index < lives ? '#ef4444' : 'transparent'}
          stroke={index < lives ? '#ef4444' : '#71717a'}
          className={index < lives ? 'text-red-500' : 'text-gray-500 opacity-50'}
        />
      ))}
    </div>
  );
};

export default LivesDisplay;