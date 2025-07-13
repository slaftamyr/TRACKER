import "./DayCell.css";
import PropTypes from "prop-types";

function DayCell({ date, color, onClick, isToday, isSelected }) {
  return (
    <div
      className={`day-cell${color ? " colored" : ""}${isToday ? " today" : ""}${
        isSelected ? " selected" : ""
      }`}
      style={color ? { background: color } : {}}
      tabIndex={0}
      title={date.toDateString()}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}>
      {date.getDate()}
    </div>
  );
}

export default DayCell;
