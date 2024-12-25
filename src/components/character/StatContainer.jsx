// StatsContainer.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import StatBlock from './StatBlock';

const StatsContainer = ({ stats, onStatUpdate }) => {
  // Helper function to calculate the current level and XP from total XP
  const calculateLevelAndXP = (totalXP) => {
    let level = 0;
    let currentXP = totalXP;
    let requiredXP = 100; // Initial XP required to reach level 1
    
    // Keep leveling up while we have enough XP
    while (currentXP >= requiredXP) {
      currentXP -= requiredXP;  // Remove the XP used for this level
      level += 1;               // Increase the level
      requiredXP = Math.ceil(requiredXP * 1.2);  // Increase XP requirement by 20%
    }

    return {
      level,
      currentXP,
      requiredXP
    };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Character Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {Object.entries(stats).map(([statName, { totalXP }]) => {
            // Calculate current level, XP, and XP required for next level
            const { level, currentXP, requiredXP } = calculateLevelAndXP(totalXP);

            return (
              <StatBlock
                key={statName}
                statName={statName}
                level={level}
                currentXP={currentXP}
                requiredXP={requiredXP}
              />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsContainer;