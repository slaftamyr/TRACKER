import React, { useState } from "react";
import DayCell from "./DayCell";
import "./Calendar.css";
import PropTypes from "prop-types";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year, month) {
  return new Date(year, month, 1).getDay();
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function Calendar({
  year,
  dayColors,
  onAssignColor,
  selectedMoodColor,
  onDayClick,
}) {
  const [selectedDate, setSelectedDate] = useState(null);
  const today = new Date();

  return (
    <div className="calendar-wrapper">
      <div className="calendar-header">
        <span>{year}</span>
      </div>
      <div className="calendar-grid">
        {WEEKDAYS.map((w) => (
          <div key={w} className="weekday-label">
            {w}
          </div>
        ))}
        {Array.from({ length: 12 }).map((_, month) => {
          const days = getDaysInMonth(year, month);
          const firstDay = getFirstDayOfWeek(year, month);
          return (
            <div className="month-block" key={month}>
              <div className="month-label">
                {new Date(year, month).toLocaleString("default", {
                  month: "short",
                })}
              </div>
              <div className="month-grid">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={"empty-" + i} className="empty-cell" />
                ))}
                {Array.from({ length: days }).map((_, day) => {
                  const date = new Date(year, month, day + 1);
                  const key = `${year}-${month + 1}-${day + 1}`;
                  const color = dayColors[key] || null;
                  const isToday =
                    today.getFullYear() === year &&
                    today.getMonth() === month &&
                    today.getDate() === day + 1;
                  const isSelected =
                    selectedDate && selectedDate.getTime() === date.getTime();
                  return (
                    <DayCell
                      key={key}
                      date={date}
                      color={color}
                      isToday={isToday}
                      isSelected={isSelected}
                      onClick={() => {
                        setSelectedDate(date);
                        if (onDayClick) {
                          onDayClick(
                            day + 1,
                            new Date(year, month).toLocaleString("default", {
                              month: "short",
                            })
                          );
                        } else if (selectedMoodColor) {
                          onAssignColor(key, selectedMoodColor);
                        }
                      }}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
