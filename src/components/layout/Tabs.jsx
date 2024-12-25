// src/components/layout/Tabs.jsx
import React from 'react';
import { Button } from '../ui/Button';

const Tabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'focus', label: 'Current Focus' },
    { id: 'stats', label: 'Stats & Journal' },
    { id: 'quests', label: 'Quests' }
  ];

  return (
    <div className="flex gap-2 mb-6 border-b border-gray-200">
      {tabs.map(tab => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? 'primary' : 'default'}
          onClick={() => onTabChange(tab.id)}
          className={`rounded-b-none ${
            activeTab === tab.id 
              ? 'border-b-2 border-blue-500' 
              : ''
          }`}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

export default Tabs;