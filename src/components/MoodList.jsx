import "./MoodList.css";

import PropTypes from "prop-types";

function MoodList({ moods, onDeleteMood }) {
  return (
    <div className="mood-list">
      <div className="mood-list-label">Your moods:</div>
      <ul>
        {moods.map((m) => (
          <li key={m.mood}>
            <span className="mood-color" style={{ background: m.color }} />
            <span className="mood-name">{m.mood}</span>
            <button
              className="delete-btn"
              title="Delete mood"
              onClick={() => onDeleteMood(m.mood)}>
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default MoodList;
