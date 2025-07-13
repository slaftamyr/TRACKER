import React, { useState, useEffect } from "react";
import MoodInput from "./components/MoodInput";
import MoodList from "./components/MoodList";
import DayGrid from "./components/DayGrid";
import AssignMoodModal from "./components/AssignMoodModal";
import "./App.css";

function getAllDaysOfYear(year) {
  const days = [];
  let date = new Date(year, 0, 1);
  while (date.getFullYear() === year) {
    days.push({
      key: `${year}-${date.getMonth() + 1}-${date.getDate()}`,
      day: date.getDate(),
      month: date.toLocaleString("default", { month: "short" }),
      date: new Date(date),
    });
    date.setDate(date.getDate() + 1);
  }
  return days;
}

const CURRENT_YEAR = new Date().getFullYear();

function loadState(key, fallback) {
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : fallback;
  } catch {
    return fallback;
  }
}

function saveState(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function App() {
  const [moods, setMoods] = useState(() => loadState("moods", []));
  const [dayColors, setDayColors] = useState(() => loadState("dayColors", {}));
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [assignMood, setAssignMood] = useState(null);

  const days = getAllDaysOfYear(CURRENT_YEAR);

  useEffect(() => {
    saveState("moods", moods);
  }, [moods]);

  useEffect(() => {
    saveState("dayColors", dayColors);
  }, [dayColors]);

  const handleAddMood = ({ mood, color }) => {
    if (
      !mood ||
      !color ||
      moods.some((m) => m.mood.toLowerCase() === mood.toLowerCase())
    )
      return;
    setMoods([...moods, { mood, color }]);
  };

  const handleDeleteMood = (moodName) => {
    const moodToDelete = moods.find((m) => m.mood === moodName);
    setMoods(moods.filter((m) => m.mood !== moodName));
    setDayColors(
      Object.fromEntries(
        Object.entries(dayColors).filter(
          ([, color]) => !moodToDelete || color !== moodToDelete.color
        )
      )
    );
  };

  const handleDayClick = (dayObj) => {
    setSelectedDay(dayObj);
    setModalOpen(true);
    setAssignMood(null);
  };

  const handleAssignMood = () => {
    if (assignMood && selectedDay) {
      const color = moods.find((m) => m.mood === assignMood)?.color;
      setDayColors({ ...dayColors, [selectedDay.key]: color });
      setModalOpen(false);
      setAssignMood(null);
      setSelectedDay(null);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Year Tracker</h1>
        <p className="subtitle">
          Track your moods visually throughout the year
        </p>
      </header>
      <main className="main-content">
        <MoodInput onAddMood={handleAddMood} />
        <MoodList moods={moods} onDeleteMood={handleDeleteMood} />
        <DayGrid
          days={days}
          dayColors={dayColors}
          onDayClick={handleDayClick}
        />
      </main>
      <AssignMoodModal
        moods={moods}
        open={modalOpen}
        selectedDay={selectedDay}
        assignMood={assignMood}
        setAssignMood={setAssignMood}
        onAssign={handleAssignMood}
        onClose={() => setModalOpen(false)}
      />
      <footer className="app-footer">
        <span>&copy; {CURRENT_YEAR} Year Tracker</span>
      </footer>
    </div>
  );
}
