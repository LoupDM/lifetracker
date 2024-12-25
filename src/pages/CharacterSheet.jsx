// CharacterSheet.jsx
import React, { useState, useEffect } from 'react';
import StatsContainer from '../components/character/StatContainer';
import QuestCard from '../components/quests/QuestCard';
import { Button } from '../components/ui/Button';

const CharacterSheet = () => {
  // Main state for our character data
  const [characterData, setCharacterData] = useState(() => {
    // Try to load saved data, or use default values
    const saved = localStorage.getItem('characterData');
    return saved ? JSON.parse(saved) : {
      name: 'New Character',
      stats: {
        strength: { totalXP: 0 },
        endurance: { totalXP: 0 },
        vigor: { totalXP: 0 },
        creativity: { totalXP: 0 },
        knowledge: { totalXP: 0 },
        wisdom: { totalXP: 0 }
      },
      quests: []
    };
  });

  // Save data whenever it changes
  useEffect(() => {
    localStorage.setItem('characterData', JSON.stringify(characterData));
  }, [characterData]);

  // Handler for adding a new quest
  const handleAddQuest = (questTitle) => {
    setCharacterData(prev => ({
      ...prev,
      quests: [
        ...prev.quests,
        {
          id: Date.now(),
          title: questTitle,
          spas: []
        }
      ]
    }));
  };

  // Handler for adding a new SPA to a quest
  const handleAddSPA = (questId, spaData) => {
    setCharacterData(prev => ({
      ...prev,
      quests: prev.quests.map(quest => {
        if (quest.id === questId) {
          return {
            ...quest,
            spas: [
              ...quest.spas,
              {
                ...spaData,
                id: Date.now(),
                completed: false,
                current: false
              }
            ]
          };
        }
        return quest;
      })
    }));
  };

  // Handler for deleting quests and SPAs
const handleDeleteQuest = (questId) => {
  setCharacterData(prev => ({
    ...prev,
    quests: prev.quests.filter(quest => quest.id !== questId)
  }));
};
const handleEditSPA = (questId, spaId, editedData) => {
  setCharacterData(prev => ({
    ...prev,
    quests: prev.quests.map(quest => {
      if (quest.id === questId) {
        return {
          ...quest,
          spas: quest.spas.map(spa => {
            if (spa.id === spaId) {
              return {
                ...spa,
                ...editedData
              };
            }
            return spa;
          })
        };
      }
      return quest;
    })
  }));
};
const handleDeleteSPA = (questId, spaId) => {
  setCharacterData(prev => ({
    ...prev,
    quests: prev.quests.map(quest => {
      if (quest.id === questId) {
        // Filter out the SPA we want to delete
        return {
          ...quest,
          spas: quest.spas.filter(spa => spa.id !== spaId)
        };
      }
      return quest;
    })
  }));
};
  // Handler for completing an SPA
  const handleCompleteSPA = (questId, spaId) => {
    setCharacterData(prev => {
      // Find the SPA to get its stats and difficulty
      const quest = prev.quests.find(q => q.id === questId);
      const spa = quest?.spas.find(s => s.id === spaId);
      
      if (!spa || spa.completed) return prev;

      // Calculate XP based on difficulty
      const xpGains = {
        easy: 25,
        moderate: 50,
        challenging: 100,
        hardcore: 200
      };
      const xpGain = xpGains[spa.difficulty] || 25;

      // Update stats with new XP
      const updatedStats = { ...prev.stats };
      spa.selectedStats.forEach(statName => {
        updatedStats[statName] = {
          totalXP: (updatedStats[statName].totalXP || 0) + xpGain
        };
      });


      // Mark SPA as completed
      const updatedQuests = prev.quests.map(q => {
        if (q.id === questId) {
          return {
            ...q,
            spas: q.spas.map(s => {
              if (s.id === spaId) {
                return { ...s, completed: true };
              }
              return s;
            })
          };
        }
        return q;
      });

      return {
        ...prev,
        stats: updatedStats,
        quests: updatedQuests
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Stats Section */}
        <div className="mb-6">
          <StatsContainer stats={characterData.stats} />
        </div>

        {/* Quests Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Quests</h2>
          
          {/* New Quest Input */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter new quest title..."
              className="flex-1 p-2 border-2 border-gray-300 rounded"
              onKeyPress={e => {
                if (e.key === 'Enter' && e.target.value.trim()) {
                  handleAddQuest(e.target.value.trim());
                  e.target.value = '';
                }
              }}
            />
          </div>

          {/* Quest List */}
          {characterData.quests.map(quest => (
            <QuestCard
              key={quest.id}
              title={quest.title}
              spas={quest.spas}
              onAddSPA={(spaData) => handleAddSPA(quest.id, spaData)}
              onCompleteSPA={(spaId) => handleCompleteSPA(quest.id, spaId)}
              onSetCurrentSPA={(spaId) => {
                // Handle setting current SPA
                setCharacterData(prev => ({
                  ...prev,
                  quests: prev.quests.map(q => ({
                    ...q,
                    spas: q.spas.map(spa => ({
                      ...spa,
                      current: q.id === quest.id && spa.id === spaId
                    }))
                  }))
                }));
              }}
              onDeleteQuest={() => handleDeleteQuest(quest.id)}
              onDeleteSPA={(spaId) => handleDeleteSPA(quest.id, spaId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CharacterSheet;