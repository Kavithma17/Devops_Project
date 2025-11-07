// Diary.jsx
import React, { useState } from "react";
import "./Diary.css"; // Optional: for styling

const Diary = () => {
  const [entry, setEntry] = useState(""); // Current diary entry
  const [entries, setEntries] = useState([]); // All diary entries

  // Handle input change
  const handleChange = (e) => {
    setEntry(e.target.value);
  };

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (entry.trim() === "") return; // Prevent empty entries
    setEntries([entry, ...entries]); // Add new entry at the top
    setEntry(""); // Clear input
  };

  return (
    <div className="diary-container">
      <h2>My Diary</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={entry}
          onChange={handleChange}
          placeholder="Write your diary entry here..."
          rows={5}
        />
        <button type="submit">Add Entry</button>
      </form>

      <div className="entries">
        <h3>Previous Entries</h3>
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((e, index) => (
            <div key={index} className="entry">
              <p>{e}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Diary;
