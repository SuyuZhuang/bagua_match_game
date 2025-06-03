import React, { useState, useEffect, useCallback } from 'react';
import { trigrams } from '../data/trigrams';
import { Option } from '../types/gameTypes';
import Timer from './Timer';
import LivesDisplay from './LivesDisplay';
import { getRandomTrigram, generateOptions } from '../utils/gameUtils';

interface GameScreenProps {
  onGameOver: (score: number) => void;
}

const GameScreen: React.FC<GameScreenProps> = ({ onGameOver }) => {
  const [currentTrigram, setCurrentTrigram] = useState(getRandomTrigram());
  const [options, setOptions] = useState<Option[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [isSparkle, setIsSparkle] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);

  // Generate new question
  const generateNewQuestion = useCallback(() => {
    const newTrigram = getRandomTrigram(currentTrigram.symbol);
    setCurrentTrigram(newTrigram);
    setOptions(generateOptions(newTrigram));
    setTimeRemaining(5);
    setSelectedOption(null);
    setIsShaking(false);
    setIsSparkle(false);
    setIsFlashing(false);
  }, [currentTrigram]);

  // Handle option selection
  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent multiple selections
    
    setSelectedOption(index);
    
    if (options[index].isCorrect) {
      // Correct answer
      setIsSparkle(true);
      const timeBonus = Math.floor(timeRemaining * 10);
      setScore(prevScore => prevScore + 100 + timeBonus);
      
      setTimeout(() => {
        generateNewQuestion();
      }, 1500);
    } else {
      // Wrong answer
      setIsShaking(true);
      setLives(prevLives => prevLives - 1);
      
      setTimeout(() => {
        if (lives <= 1) {
          onGameOver(score);
        } else {
          generateNewQuestion();
        }
      }, 1500);
    }
  };

  // Handle timeout
  const handleTimeout = useCallback(() => {
    setIsFlashing(true);
    setLives(prevLives => prevLives - 1);
    
    setTimeout(() => {
      if (lives <= 1) {
        onGameOver(score);
      } else {
        generateNewQuestion();
      }
    }, 1500);
  }, [lives, onGameOver, score, generateNewQuestion]);

  // Initialize game
  useEffect(() => {
    generateNewQuestion();
  }, []);

  // Set up options on trigram change
  useEffect(() => {
    if (!options.length) {
      setOptions(generateOptions(currentTrigram));
    }
  }, [currentTrigram, options]);

  return (
    <div className="p-6 bg-opacity-90 bg-red-900 min-h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <div className="score text-xl font-bold text-yellow-300">
          Score: {score}
        </div>
        <LivesDisplay lives={lives} />
      </div>
      
      <Timer 
        initialTime={5} 
        timeRemaining={timeRemaining}
        setTimeRemaining={setTimeRemaining}
        onTimeout={handleTimeout}
        isPaused={selectedOption !== null || isFlashing}
        isFlashing={timeRemaining <= 2}
      />
      
      <div className={`flex flex-col items-center justify-center my-8 ${isShaking ? 'shake' : ''} ${isSparkle ? 'sparkle' : ''} ${isFlashing ? 'flash' : ''}`}>
        <div className="trigram text-center mb-4 text-yellow-400">
          {currentTrigram.symbol}
        </div>
        
        <div className="question text-xl mb-2 text-center">
          这是哪一卦？
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionSelect(index)}
            disabled={selectedOption !== null}
            className={`option p-4 rounded-lg text-left ${
              selectedOption === index && option.isCorrect ? 'correct' : 
              selectedOption === index && !option.isCorrect ? 'incorrect' : ''
            }`}
          >
            <div className="font-bold text-lg">{option.name}</div>
            <div className="text-sm text-gray-200">{option.meaning}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;