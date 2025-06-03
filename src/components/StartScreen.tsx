import React from 'react';
import { BookOpen, PlayCircle } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[500px] bg-opacity-90 bg-red-900 text-center">
      <h1 className="text-5xl mb-6 text-gold font-bold text-yellow-400">八卦 Ba Gua Match</h1>
      
      <div className="mb-8 flex justify-center">
        <div className="grid grid-cols-4 gap-2">
          <span className="text-4xl">☰</span>
          <span className="text-4xl">☷</span>
          <span className="text-4xl">☶</span>
          <span className="text-4xl">☵</span>
          <span className="text-4xl">☴</span>
          <span className="text-4xl">☳</span>
          <span className="text-4xl">☲</span>
          <span className="text-4xl">☱</span>
        </div>
      </div>
      
      <p className="text-xl mb-8 max-w-md">
        Match the Ba Gua trigrams with their correct names and meanings. 
        Be quick and accurate to achieve the highest score!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md">
        <button 
          onClick={onStart}
          className="btn flex items-center justify-center gap-2 flex-1"
        >
          <PlayCircle size={20} />
          Play Game
        </button>
        
        <button 
          onClick={() => alert('Learn about the Ba Gua trigrams and their meanings to succeed in the game!')}
          className="btn bg-transparent border-yellow-400 text-yellow-400 flex items-center justify-center gap-2 flex-1"
        >
          <BookOpen size={20} />
          How to Play
        </button>
      </div>
    </div>
  );
};

export default StartScreen;