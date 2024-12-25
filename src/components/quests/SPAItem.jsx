// SPAItem.jsx
import React, {useState} from 'react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';
import { Trash2 } from 'lucide-react';


// SPAItem.jsx
const SPAItem = ({
  id,
  description,
  selectedStats,
  difficulty,
  completed,
  isCurrent,
  onComplete,
  onSetCurrent,
  onDelete,
  onEdit  // Add this new prop
}) => {
  // Add states for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedStats, setEditedStats] = useState(selectedStats);
  const [editedDifficulty, setEditedDifficulty] = useState(difficulty);

  // Available stats (same as in QuestCard)
  const availableStats = [
    'strength', 'endurance', 'vigor',
    'creativity', 'knowledge', 'wisdom'
  ];

  const difficultyColors = {
    easy: 'border-green-500',
    moderate: 'border-yellow-500',
    challenging: 'border-orange-500',
    hardcore: 'border-red-500'
  };

  // Handle saving edits
  const handleSaveEdit = () => {
    if (editedDescription.trim()) {
      onEdit({
        description: editedDescription.trim(),
        selectedStats: editedStats,
        difficulty: editedDifficulty
      });
      setIsEditing(false);
    }
  };

  return (
    <div className={clsx(
      'p-3 mb-2 border-2',
      difficultyColors[difficulty],
      isCurrent && 'bg-yellow-50',
      completed && 'bg-green-50'
    )}>
      {isEditing ? (
        // Edit form
        <div className="space-y-2">
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded"
            autoFocus
          />
          
          <div className="flex flex-wrap gap-2">
            {availableStats.map(stat => (
              <Button
                key={stat}
                size="small"
                variant={editedStats.includes(stat) ? 'primary' : 'default'}
                onClick={() => setEditedStats(prev => 
                  prev.includes(stat)
                    ? prev.filter(s => s !== stat)
                    : [...prev, stat]
                )}
              >
                {stat}
              </Button>
            ))}
          </div>

          <select
            value={editedDifficulty}
            onChange={(e) => setEditedDifficulty(e.target.value)}
            className="w-full p-2 border-2 border-gray-300"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="challenging">Challenging</option>
            <option value="hardcore">Hardcore</option>
          </select>

          <div className="flex gap-2 justify-end">
            <Button size="small" variant="success" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button size="small" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        // Normal view (not editing)
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
                <Button
                  size="small"
                  variant="default"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
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
      )}
    </div>
  );
};

export default SPAItem;