import React, { useState } from 'react';
import GameScreen from './components/GameScreen';
import StartScreen from './components/StartScreen';
import GameOverScreen from './components/GameOverScreen';
import { GameState } from './types/gameTypes';
import './App.css';

function App() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [score, setScore] = useState(0);
  
  const startGame = () => {
    setGameState('playing');
    setScore(0);
  };

  const endGame = (finalScore: number) => {
    setScore(finalScore);
    setGameState('gameOver');
  };

  return (
    <div className="app-container min-h-screen bg-gradient-to-b from-red-900 to-red-950 flex items-center justify-center p-4 font-sans text-white">
      <div className="game-wrapper max-w-3xl w-full rounded-lg overflow-hidden shadow-2xl relative border-4 border-yellow-500">
        <div className="bg-pattern absolute inset-0 opacity-10"></div>
        
        <div className="relative z-10 w-full h-full">
          {gameState === 'start' && <StartScreen onStart={startGame} />}
          {gameState === 'playing' && <GameScreen onGameOver={endGame} />}
          {gameState === 'gameOver' && <GameOverScreen score={score} onRestart={startGame} />}
        </div>
      </div>
    </div>
  );
}

export default App;