// QuestCard.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import SPAItem from './SPAItem';
import {Trash2} from 'lucide-react';

const QuestCard = ({ title, spas, onAddSPA, onCompleteSPA, onSetCurrentSPA, onDeleteQuest, onDeleteSPA }) => {
  const [newSPA, setNewSPA] = useState({
    description: '',
    selectedStats: [],
    difficulty: 'easy'
  });

  // Available stats that can be assigned to SPAs
  const availableStats = [
    'strength', 'endurance', 'vigor',
    'creativity', 'knowledge', 'wisdom'
  ];

  return (
    <Card>
<CardHeader>
  <div className="flex justify-between items-center">
    <CardTitle>{title}</CardTitle>
    <Button 
      variant="default" 
      size="small"
      onClick={onDeleteQuest}
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
</CardHeader>
      <CardContent>
        {/* SPA List */}
        {spas.map(spa => (
          <SPAItem
            key={spa.id}
            {...spa}
            onComplete={() => onCompleteSPA(spa.id)}
            onSetCurrent={() => onSetCurrentSPA(spa.id)}
            onDelete={() => onDeleteSPA(spa.id)}
          />
        ))}

        {/* New SPA Form */}
        <div className="mt-4 p-3 border-2 border-gray-300">
          <input
            type="text"
            value={newSPA.description}
            onChange={e => setNewSPA(prev => ({
              ...prev,
              description: e.target.value
            }))}
            placeholder="Add a new SPA..."
            className="w-full p-2 border-2 border-gray-300 mb-2"
          />
          
          <div className="flex flex-wrap gap-2 mb-2">
            {availableStats.map(stat => (
              <Button
                key={stat}
                size="small"
                variant={newSPA.selectedStats.includes(stat) ? 'primary' : 'default'}
                onClick={() => setNewSPA(prev => ({
                  ...prev,
                  selectedStats: prev.selectedStats.includes(stat)
                    ? prev.selectedStats.filter(s => s !== stat)
                    : [...prev.selectedStats, stat]
                }))}
              >
                {stat}
              </Button>
            ))}
          </div>

          <select
            value={newSPA.difficulty}
            onChange={e => setNewSPA(prev => ({
              ...prev,
              difficulty: e.target.value
            }))}
            className="w-full p-2 border-2 border-gray-300 mb-2"
          >
            <option value="easy">Easy</option>
            <option value="moderate">Moderate</option>
            <option value="challenging">Challenging</option>
            <option value="hardcore">Hardcore</option>
          </select>

          <Button
            variant="primary"
            onClick={() => {
              if (newSPA.description && newSPA.selectedStats.length > 0) {
                onAddSPA(newSPA);
                setNewSPA({
                  description: '',
                  selectedStats: [],
                  difficulty: 'easy'
                });
              }
            }}
          >
            Add SPA
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestCard;