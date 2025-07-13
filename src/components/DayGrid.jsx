import "./DayGrid.css";

import PropTypes from "prop-types";

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function groupDaysByMonth(days) {
  return days.reduce((acc, day) => {
    const monthIdx = day.date.getMonth();
    if (!acc[monthIdx]) acc[monthIdx] = [];
    acc[monthIdx].push(day);
    return acc;
  }, {});
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

function DayGrid({ days, dayColors, onDayClick }) {
  const daysByMonth = groupDaysByMonth(days);
  const year = days.length
    ? days[0].date.getFullYear()
    : new Date().getFullYear();

  return (
    <div className="daygrid-all-months">
      {Object.entries(daysByMonth).map(([monthIdx, monthDays]) => {
        const month = parseInt(monthIdx, 10);
        const firstDayOfWeek = getFirstDayOfWeek(year, month);

        const emptyCells = Array.from({ length: firstDayOfWeek });
        return (
          <section className="daygrid-month-section" key={monthIdx}>
            <h3 className="daygrid-month-header">{MONTHS[month]}</h3>
            <div className="daygrid-weekdays-row">
              {WEEKDAYS.map((wd) => (
                <div className="daygrid-weekday-label" key={wd}>
                  {wd}
                </div>
              ))}
            </div>
            <div className="daygrid-days-grid">
              {emptyCells.map((_, idx) => (
                <div className="daygrid-empty-cell" key={"empty-" + idx} />
              ))}
              {monthDays.map((day) => (
                <div
                  key={day.key}
                  className={`day-cell${dayColors[day.key] ? " colored" : ""}`}
                  style={
                    dayColors[day.key] ? { background: dayColors[day.key] } : {}
                  }
                  tabIndex={0}
                  title={day.date.toDateString()}
                  onClick={() => onDayClick(day)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onDayClick(day);
                  }}>
                  {day.day}
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default DayGrid;
