import React, { useState } from "react";
import "./MoodInput.css";

import PropTypes from "prop-types";

function MoodInput({ onAddMood }) {
  const [mood, setMood] = useState("");
  const [color, setColor] = useState("#ffd700");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mood.trim()) return;
    onAddMood({ mood: mood.trim(), color });
    setMood("");
    setColor("#ffd700");
  };

  return (
    <form className="mood-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        placeholder="Mood name..."
        maxLength={20}
        aria-label="Mood name"
        required
      />
      <label className="color-label">
        <span className="color-preview" style={{ background: color }} />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Mood color"
        />
      </label>
      <button type="submit" disabled={!mood.trim()}>
        Add
      </button>
    </form>
  );
}
export default MoodInput;
