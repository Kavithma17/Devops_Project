
import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, Trash2, Calendar, Search, Filter, X,
  Smile, Meh, Frown, ArrowLeft, Book, Sparkles,
  Edit3, Clock, ChevronLeft, ChevronRight, Plus
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
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const textareaRef = useRef(null);

  const moods = [
    { value: 'great', label: 'Wonderful' },
    { value: 'okay', label: 'Neutral' },
    { value: 'low', label: 'Struggling' }
  ];

  useEffect(() => {
    fetchEntries();
  }, []);

  useEffect(() => {
    if (textareaRef.current && showNewEntry) {
      textareaRef.current.focus();
    }
  }, [showNewEntry]);

  const fetchEntries = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://16.171.154.30:5000/diary/entries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setEntries(data.entries);
    } catch (error) {
      console.error('Error fetching entries:', error);
    }
  };

  const handleSaveEntry = async () => {
    if (!currentEntry.content.trim() || !currentEntry.mood) return;

    try {
      const token = localStorage.getItem('token');
      const url = isEditing 
        ? `http://16.171.154.30:5000/diary/entries/${editingId}`
        : 'http://16.171.154.30:5000/diary/entries';
      
      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
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
        setShowNewEntry(false);
      }
    } catch (error) {
      console.error('Error saving entry:', error);
    }
  };

  const handleDeleteEntry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this memory?')) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://16.171.154.30:5000/diary/entries/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        fetchEntries();
        setSelectedEntry(null);
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
    setShowNewEntry(true);
    setSelectedEntry(null);
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
      entry.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  return (
    <div className="diary-page">
      {/* Sidebar */}
      <aside className="diary-sidebar">
        <div className="sidebar-header">
          <div className="logo-section">
            <Book className="logo-icon" />
            <h1 className="logo-title">My Diary</h1>
          </div>
          <button 
            className="new-entry-btn"
            onClick={() => {
              setShowNewEntry(true);
              setSelectedEntry(null);
              resetForm();
            }}
          >
            <Plus className="icon-sm" />
            New Entry
          </button>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <Search className="search-icon-left" />
            <input
              type="text"
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input-sidebar"
            />
          </div>
          
          <div className="mood-filter">
            {[{ value: 'all', label: 'All', emoji: '📖' }, ...moods.map(m => ({ ...m, value: m.value }))].map((mood) => (
              <button
                key={mood.value}
                onClick={() => setFilterMood(mood.value)}
                className={`filter-chip ${filterMood === mood.value ? 'active' : ''}`}
              >
                <span className="filter-emoji">{mood.emoji || mood.emoji}</span>
                <span className="filter-label">{mood.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="entries-sidebar">
          {filteredEntries.length === 0 ? (
            <div className="empty-sidebar">
              <p>No entries found</p>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const mood = moods.find(m => m.value === entry.mood);
              return (
                <div
                  key={entry._id}
                  onClick={() => {
                    setSelectedEntry(entry);
                    setShowNewEntry(false);
                  }}
                  className={`entry-preview ${selectedEntry?._id === entry._id ? 'active' : ''}`}
                >
                  <div className="entry-preview-header">
                    <span className="entry-emoji">{mood?.emoji}</span>
                    <span className="entry-preview-date">
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                  <h3 className="entry-preview-title">{entry.title || 'Untitled'}</h3>
                  <p className="entry-preview-content">{entry.content.substring(0, 80)}...</p>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="diary-main">
        {showNewEntry ? (
          <div className="writing-area">
            <div className="writing-header">
              <button className="back-btn-mobile" onClick={() => setShowNewEntry(false)}>
                <ArrowLeft className="icon-sm" />
              </button>
              <h2 className="writing-title">{isEditing ? 'Edit Your Memory' : 'Write Your Heart Out'}</h2>
              <div className="writing-actions">
                <button onClick={resetForm} className="btn-ghost">
                  Cancel
                </button>
                <button 
                  onClick={handleSaveEntry} 
                  disabled={!currentEntry.content.trim() || !currentEntry.mood}
                  className="btn-primary-action"
                >
                  <Save className="icon-sm" />
                  {isEditing ? 'Update' : 'Save'}
                </button>
              </div>
            </div>

            <div className="writing-meta">
              <div className="meta-row">
                <input
                  type="date"
                  value={currentEntry.date}
                  onChange={(e) => setCurrentEntry({ ...currentEntry, date: e.target.value })}
                  className="date-picker"
                />
                <div className="word-counter">
                  {getWordCount(currentEntry.content)} words
                </div>
              </div>

              <div className="mood-selector-inline">
                <span className="mood-label-text">How are you feeling?</span>
                <div className="mood-chips">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: mood.value })}
                      className={`mood-chip ${currentEntry.mood === mood.value ? 'active' : ''}`}
                    >
                      <span className="mood-emoji-large">{mood.emoji}</span>
                      <span>{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="writing-content">
              <input
                type="text"
                placeholder="Give your day a title..."
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                className="title-input"
              />
              <textarea
                ref={textareaRef}
                placeholder="Start writing... Let your thoughts flow freely. This is your safe space."
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                className="content-textarea"
              />
            </div>
          </div>
        ) : selectedEntry ? (
          <div className="reading-area">
            <div className="reading-header">
              <button className="back-btn-mobile" onClick={() => setSelectedEntry(null)}>
                <ArrowLeft className="icon-sm" />
              </button>
              <div className="reading-actions">
                <button 
                  onClick={() => handleEditEntry(selectedEntry)}
                  className="action-btn-icon"
                >
                  <Edit3 className="icon-sm" />
                </button>
                <button 
                  onClick={() => handleDeleteEntry(selectedEntry._id)}
                  className="action-btn-icon danger"
                >
                  <Trash2 className="icon-sm" />
                </button>
              </div>
            </div>

            <div className="reading-content">
              <div className="reading-meta">
                <span className="reading-mood">
                  {moods.find(m => m.value === selectedEntry.mood)?.emoji} 
                  {moods.find(m => m.value === selectedEntry.mood)?.label}
                </span>
                <span className="reading-date">
                  {new Date(selectedEntry.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              
              <h1 className="reading-title">{selectedEntry.title || 'Untitled'}</h1>
              <div className="reading-body">{selectedEntry.content}</div>
              
              <div className="reading-footer">
                <Clock className="icon-xs" />
                <span>{getWordCount(selectedEntry.content)} words • {Math.ceil(getWordCount(selectedEntry.content) / 200)} min read</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="welcome-area">
            <div className="welcome-content">
              <Sparkles className="welcome-icon" />
              <h2 className="welcome-title">Welcome to Your Personal Diary</h2>
              <p className="welcome-subtitle">
                A safe space to capture your thoughts, feelings, and memories.
                Start writing to preserve your precious moments.
              </p>
              <button 
                className="btn-start-writing"
                onClick={() => {
                  setShowNewEntry(true);
                  resetForm();
                }}
              >
                <Edit3 className="icon-sm" />
                Start Writing
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
