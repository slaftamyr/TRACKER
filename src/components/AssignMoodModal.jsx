import PropTypes from "prop-types";
import "./AssignMoodModal.css";

function AssignMoodModal({
  moods,
  open,
  selectedDay,
  assignMood,
  setAssignMood,
  onAssign,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="amodal-overlay">
      <div className="amodal-card" role="dialog" aria-modal="true">
        <button
          className="amodal-close"
          onClick={onClose}
          aria-label="Close modal">
          &times;
        </button>
        <header className="amodal-header">
          <h2>
            Assign Mood for{" "}
            <span className="amodal-date">
              {selectedDay?.day} {selectedDay?.month}
            </span>
          </h2>
        </header>
        <div className="amodal-mood-list">
          {moods.length === 0 && (
            <div className="amodal-no-moods">Add moods first!</div>
          )}
          <div className="amodal-mood-grid">
            {moods.map((m) => (
              <button
                key={m.mood}
                className={`amodal-mood-btn${
                  assignMood === m.mood ? " selected" : ""
                }`}
                style={{ background: m.color }}
                onClick={() => setAssignMood(m.mood)}
                tabIndex={0}
                aria-pressed={assignMood === m.mood}>
                {m.mood}
              </button>
            ))}
          </div>
        </div>
        <div className="amodal-actions">
          <button className="amodal-btn amodal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            className="amodal-btn amodal-assign"
            onClick={onAssign}
            disabled={!assignMood}>
            Assign
          </button>
        </div>
      </div>
    </div>
  );
}

AssignMoodModal.propTypes = {
  moods: PropTypes.arrayOf(
    PropTypes.shape({
      mood: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
  selectedDay: PropTypes.shape({
    day: PropTypes.number,
    month: PropTypes.string,
  }),
  assignMood: PropTypes.string,
  setAssignMood: PropTypes.func.isRequired,
  onAssign: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AssignMoodModal;
