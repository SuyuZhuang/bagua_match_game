import { trigrams } from '../data/trigrams';
import { Trigram, Option } from '../types/gameTypes';

// Get random trigram (different from previous)
export const getRandomTrigram = (previousSymbol: string = ''): Trigram => {
  let filteredTrigrams = trigrams;
  
  if (previousSymbol) {
    filteredTrigrams = trigrams.filter(trigram => trigram.symbol !== previousSymbol);
  }
  
  const randomIndex = Math.floor(Math.random() * filteredTrigrams.length);
  return filteredTrigrams[randomIndex];
};

// Generate options for a question (one correct, three incorrect)
export const generateOptions = (currentTrigram: Trigram): Option[] => {
  // Create correct option
  const correctOption: Option = {
    name: currentTrigram.name,
    meaning: currentTrigram.meaning,
    isCorrect: true
  };
  
  // Get incorrect options
  const incorrectOptions: Option[] = [];
  const usedIndexes = new Set<number>();
  
  // Find the index of the current trigram to exclude it
  const currentIndex = trigrams.findIndex(t => t.symbol === currentTrigram.symbol);
  usedIndexes.add(currentIndex);
  
  // Get three random incorrect options
  while (incorrectOptions.length < 3) {
    const randomIndex = Math.floor(Math.random() * trigrams.length);
    
    if (!usedIndexes.has(randomIndex)) {
      usedIndexes.add(randomIndex);
      incorrectOptions.push({
        name: trigrams[randomIndex].name,
        meaning: trigrams[randomIndex].meaning,
        isCorrect: false
      });
    }
  }
  
  // Combine all options and shuffle them
  const allOptions = [correctOption, ...incorrectOptions];
  return shuffleArray(allOptions);
};

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Calculate time bonus
export const calculateTimeBonus = (timeRemaining: number): number => {
  return Math.floor(timeRemaining * 10);
};

// Format time to display
export const formatTime = (time: number): string => {
  return time.toFixed(1);
};