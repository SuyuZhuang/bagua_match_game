import React, { useEffect, useRef } from 'react';

interface TimerProps {
  initialTime: number;
  timeRemaining: number;
  setTimeRemaining: React.Dispatch<React.SetStateAction<number>>;
  onTimeout: () => void;
  isPaused: boolean;
  isFlashing: boolean;
}

const Timer: React.FC<TimerProps> = ({ 
  initialTime, 
  timeRemaining, 
  setTimeRemaining, 
  onTimeout, 
  isPaused,
  isFlashing
}) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Clear timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  // Set up timer
  useEffect(() => {
    if (!isPaused) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0.1) {
            clearInterval(timerRef.current!);
            onTimeout();
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPaused, setTimeRemaining, onTimeout]);
  
  // Calculate timer bar color
  const getTimerColor = () => {
    if (timeRemaining > initialTime * 0.6) return 'bg-green-500';
    if (timeRemaining > initialTime * 0.3) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Calculate width percentage
  const widthPercentage = (timeRemaining / initialTime) * 100;
  
  return (
    <div className={`timer-container w-full h-2 bg-gray-700 rounded-full ${isFlashing ? 'flash' : ''}`}>
      <div 
        className={`timer-bar rounded-full ${getTimerColor()}`}
        style={{ width: `${widthPercentage}%` }}
      ></div>
    </div>
  );
};

export default Timer;