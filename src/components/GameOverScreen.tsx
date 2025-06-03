import React from 'react';
import { RotateCcw, Home } from 'lucide-react';

interface GameOverScreenProps {
  score: number;
  onRestart: () => void;
}

const GameOverScreen: React.FC<GameOverScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-[500px] bg-opacity-90 bg-red-900 text-center">
      <h2 className="text-4xl mb-6 text-yellow-400 font-bold">Game Over</h2>
      
      <div className="text-7xl text-yellow-400 mb-6">☯</div>
      
      <p className="text-2xl mb-2">Your Score</p>
      <p className="text-5xl mb-8 font-bold text-yellow-400">{score}</p>
      
      {score > 500 ? (
        <p className="mb-8 text-xl text-green-300">Impressive knowledge of the Ba Gua!</p>
      ) : score > 200 ? (
        <p className="mb-8 text-xl text-yellow-300">Good effort! Keep studying the trigrams.</p>
      ) : (
        <p className="mb-8 text-xl text-red-300">The wisdom of the I Ching awaits your discovery.</p>
      )}
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button 
          onClick={onRestart}
          className="btn flex items-center justify-center gap-2 flex-1"
        >
          <RotateCcw size={20} />
          Play Again
        </button>
        
        <button 
          onClick={() => window.location.reload()}
          className="btn bg-transparent border-yellow-400 text-yellow-400 flex items-center justify-center gap-2 flex-1"
        >
          <Home size={20} />
          Main Menu
        </button>
      </div>
    </div>
  );
};

export default GameOverScreen;