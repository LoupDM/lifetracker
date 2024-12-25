// SPAItem.jsx
import React from 'react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';
import { Trash2 } from 'lucide-react';

const SPAItem = ({
  description,
  selectedStats,
  difficulty,
  completed,
  isCurrent,
  onComplete,
  onSetCurrent,
  onDelete
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
                    <Button
            size="small"
            variant="default"
            onClick={onDelete}
            className="text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SPAItem;