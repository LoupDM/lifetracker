// SPAItem.jsx
import React from 'react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';

const SPAItem = ({
  description,
  selectedStats,
  difficulty,
  completed,
  isCurrent,
  onComplete,
  onSetCurrent
}) => {
  // Difficulty colors for visual feedback
  const difficultyColors = {
    easy: 'border-green-500',
    moderate: 'border-yellow-500',
    challenging: 'border-orange-500',
    hardcore: 'border-red-500'
  };

  return (
    <div className={clsx(
      'p-3 mb-2 border-2',
      difficultyColors[difficulty],
      isCurrent && 'bg-yellow-50',
      completed && 'bg-green-50'
    )}>
      <div className="flex justify-between items-start gap-4">
        <div>
          <p className={completed ? 'line-through' : ''}>
            {description}
          </p>
          <div className="text-sm text-gray-600 mt-1">
            Stats: {selectedStats.join(', ')} • {difficulty}
          </div>
        </div>
        <div className="flex gap-2">
          {!completed && (
            <>
              <Button
                size="small"
                variant={isCurrent ? 'primary' : 'default'}
                onClick={onSetCurrent}
              >
                Focus
              </Button>
              <Button
                size="small"
                variant="success"
                onClick={onComplete}
              >
                Complete
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SPAItem;