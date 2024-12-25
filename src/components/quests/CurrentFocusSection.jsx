import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const CurrentFocusSection = ({ quests }) => {
  // Get all currently focused SPAs across all quests
  const currentSPAs = quests.flatMap(quest => 
    quest.spas
      .filter(spa => spa.current && !spa.completed)
      .map(spa => ({
        ...spa,
        questTitle: quest.title
      }))
  );

  if (currentSPAs.length === 0) return null;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Current Focus</CardTitle>
      </CardHeader>
      <CardContent>
        {currentSPAs.map(spa => (
          <div 
            key={spa.id} 
            className="p-3 mb-2 border-2 border-yellow-400 bg-yellow-50"
          >
            <div className="font-medium">{spa.description}</div>
            <div className="text-sm text-gray-600">
              Quest: {spa.questTitle} • Stats: {spa.selectedStats.join(', ')}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CurrentFocusSection;