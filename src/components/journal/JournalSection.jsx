// src/components/journal/JournalSection.jsx
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Trash2, Edit2 } from 'lucide-react';  // Import icons

const JournalSection = () => {
  const [entries, setEntries] = useState([]);
  const [newEntry, setNewEntry] = useState('');
  // Add state for editing
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  // Function to add a new entry
  const addEntry = () => {
    if (newEntry.trim()) {
      setEntries(prev => [...prev, {
        id: Date.now(),
        text: newEntry,
        date: new Date().toISOString()
      }]);
      setNewEntry('');
    }
  };

  // Function to start editing an entry
  const startEditing = (entry) => {
    setEditingId(entry.id);
    setEditText(entry.text);
  };

  // Function to save edited entry
  const saveEdit = (id) => {
    if (editText.trim()) {
      setEntries(prev => prev.map(entry => 
        entry.id === id
          ? { ...entry, text: editText }
          : entry
      ));
      setEditingId(null);
      setEditText('');
    }
  };

  // Function to delete an entry
  const deleteEntry = (id) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Journal</CardTitle>
      </CardHeader>
      <CardContent>
        {/* New Entry Section */}
        <div className="mb-4">
          <textarea
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="w-full p-2 border-2 border-gray-300 rounded"
            rows="4"
            placeholder="Write your thoughts..."
          />
          <Button 
            variant="primary"
            onClick={addEntry}
            className="mt-2"
          >
            Add Entry
          </Button>
        </div>

        {/* Entries List */}
        <div className="space-y-4">
          {entries.map(entry => (
            <div 
              key={entry.id}
              className="p-3 border-2 border-gray-200 rounded hover:border-gray-300"
            >
              {editingId === entry.id ? (
                // Editing Mode
                <div className="space-y-2">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-2 border-2 border-gray-300 rounded"
                    rows="4"
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="small"
                      variant="success" 
                      onClick={() => saveEdit(entry.id)}
                    >
                      Save
                    </Button>
                    <Button 
                      size="small"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                // Display Mode
                <>
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-gray-600 mb-2">
                      {new Date(entry.date).toLocaleString()}
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="small"
                        variant="default"
                        onClick={() => startEditing(entry)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="small"
                        variant="default"
                        onClick={() => deleteEntry(entry.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="whitespace-pre-wrap">{entry.text}</div>
                </>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default JournalSection;