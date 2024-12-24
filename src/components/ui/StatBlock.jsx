// StatBlock.jsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';

const StatBlock = ({ statName, level, currentXP, requiredXP }) => {
  // Calculate the percentage for our progress bar
  const progressPercentage = (currentXP / requiredXP) * 100;
  
  return (
    <Card>
      <CardHeader>
        {/* Show the stat name and current level */}
        <div className="flex justify-between items-center">
          <CardTitle>{statName}</CardTitle>
          <span className="text-lg font-bold">Level {level}</span>
        </div>
      </CardHeader>
      <CardContent>
        {/* Create an 8-bit style progress bar */}
        <div className="h-4 bg-gray-200 border-2 border-gray-700">
          <div 
            className="h-full bg-blue-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        {/* Show XP numbers */}
        <div className="text-sm text-right">
          {currentXP} / {requiredXP} XP
        </div>
      </CardContent>
    </Card>
  );
};

export default StatBlock;