import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, Trash2, Calendar, Search, Filter, ChevronDown, 
  Heart, Smile, Meh, Frown, ArrowLeft, Book, Sparkles 
} from 'lucide-react';
import './Diary.css';

export default function Diary() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({ 
    title: '', 
    content: '', 
    mood: '', 
    date: new Date().toISOString().split('T')[0] 
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [filterMood, setFilterMood] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const textareaRef = useRef(null);

  const moods = [
    { value: 'great', label: 'Great', icon: <Smile />, color: 'green' },
    { value: 'okay', label: 'Okay', icon: <Meh />, color: 'yellow' },
    { value: 'low', label: 'Low', icon: <Frown />, color: 'red' }
  ];

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isEditing]);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/diary/entries', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setEntries(data.entries);
      }
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSaveEntry = async () => {
    if (!currentEntry.content.trim()) return;

    try {
      const token = localStorage.getItem('token');
      const url = isEditing 
        ? `http://localhost:3000/api/diary/entries/${editingId}`
        : 'http://localhost:3000/api/diary/entries';
      
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(currentEntry)
      });

      const data = await response.json();
      if (data.success) {
        fetchEntries();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Delete this entry?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/diary/entries/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchEntries();
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const handleEditEntry = (entry) => {
    setCurrentEntry({
      title: entry.title,
      content: entry.content,
      mood: entry.mood,
      date: entry.date.split('T')[0]
    });
    setIsEditing(true);
    setEditingId(entry._id);
  };

  const resetForm = () => {
    setCurrentEntry({ 
      title: '', 
      content: '', 
      mood: '', 
      date: new Date().toISOString().split('T')[0] 
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredEntries = entries
    .filter(entry => filterMood === 'all' || entry.mood === filterMood)
    .filter(entry => 
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="diary-page min-h-screen bg-black">
      {/* Header */}
      <header className="diary-header bg-gray-900 border-b border-green-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <button onClick={() => window.history.back()} className="text-green-400 hover:text-green-300">
                <ArrowLeft className="w-6 h-6" />
              </button>
              <Book className="w-8 h-8 text-green-400" />
              <h1 className="text-2xl font-bold text-white">Mood Diary</h1>
            </div>
            <Sparkles className="w-6 h-6 text-green-400 animate-pulse" />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Editor Section */}
        <div className="editor-section mb-8 p-6 rounded-2xl border border-green-500/30 bg-gradient-to-br from-gray-900 to-black">
          <h2 className="text-xl font-semibold text-white mb-4">
            {isEditing ? 'Edit Entry' : 'New Entry'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Date</label>
              <input
                type="date"
                value={currentEntry.date}
                onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
                className="w-full p-3 bg-black border border-green-500/20 rounded-lg text-white focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">Title</label>
              <input
                type="text"
                placeholder="Give your entry a title..."
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                className="w-full p-3 bg-black border border-green-500/20 rounded-lg text-white placeholder-gray-600 focus:border-green-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">How are you feeling?</label>
              <div className="flex space-x-3">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.value })}
                    className={`flex-1 p-3 rounded-lg border transition-all ${
                      currentEntry.mood === mood.value
                        ? `border-${mood.color}-500 bg-${mood.color}-500/10 text-${mood.color}-400`
                        : 'border-green-500/20 bg-black text-gray-400 hover:border-green-500/40'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <div className="w-8 h-8">{mood.icon}</div>
                      <span className="text-sm">{mood.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">What's on your mind?</label>
              <textarea
                ref={textareaRef}
                placeholder="Write about your day, thoughts, and feelings..."
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                rows="8"
                className="w-full p-4 bg-black border border-green-500/20 rounded-lg text-white placeholder-gray-600 focus:border-green-500 focus:outline-none resize-none"
              />
            </div>

            <div className="flex space-x-3">
              <button
                onClick={handleSaveEntry}
                disabled={!currentEntry.content.trim()}
                className="flex-1 py-3 px-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Save className="w-5 h-5" />
                <span>{isEditing ? 'Update' : 'Save'} Entry</span>
              </button>
              {isEditing && (
                <button
                  onClick={resetForm}
                  className="py-3 px-6 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter & Search */}
        <div className="filters mb-6 flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-green-500/20 rounded-lg text-white placeholder-gray-600 focus:border-green-500 focus:outline-none"
            />
          </div>
          <div className="relative">
            <select
              value={filterMood}
              onChange={(e) => setFilterMood(e.target.value)}
              className="appearance-none w-full md:w-48 px-4 py-3 bg-gray-900 border border-green-500/20 rounded-lg text-white focus:border-green-500 focus:outline-none cursor-pointer"
            >
              <option value="all">All Moods</option>
              {moods.map(mood => (
                <option key={mood.value} value={mood.value}>{mood.label}</option>
              ))}
            </select>
            <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Entries List */}
        <div className="entries-list space-y-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Book className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>No entries yet. Start writing your first entry!</p>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const mood = moods.find(m => m.value === entry.mood);
              return (
                <div
                  key={entry._id}
                  className="entry-card p-6 rounded-xl border border-green-500/20 bg-gray-900 hover:border-green-500/40 transition-all"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 flex items-center justify-center rounded-full bg-${mood?.color}-500/10 text-${mood?.color}-400`}>
                        {mood?.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{entry.title || 'Untitled'}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditEntry(entry)}
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                      >
                        <Calendar className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEntry(entry._id)}
                        className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-300 whitespace-pre-wrap">{entry.content}</p>
                </div>
              );
            })
          )}
        </div>
      </main>
    </div>
  );
}
