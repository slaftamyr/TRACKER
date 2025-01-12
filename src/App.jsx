import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [colors, setColors] = useState([]);
  const [newColor, setNewColor] = useState('#000000');
  const [newTitle, setNewTitle] = useState('');
  const [daysData, setDaysData] = useState({});
  const [selectedDay, setSelectedDay] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const months = [
    { name: 'Jan', days: 31, icon: '❄️' },
    { name: 'Feb', days: 28, icon: '🐧' },
    { name: 'Mar', days: 31, icon: '🌸' },
    { name: 'Apr', days: 30, icon: '🌦️' },
    { name: 'May', days: 31, icon: '🌼' },
    { name: 'June', days: 30, icon: '☀️' },
    { name: 'July', days: 31, icon: '🎆' },
    { name: 'Aug', days: 31, icon: '🌴' },
    { name: 'Sept', days: 30, icon: '🍂' },
    { name: 'Oct', days: 31, icon: '❄️' },
    { name: 'Nov', days: 30, icon: '🦃' },
    { name: 'Dec', days: 31, icon: '⛄' },
  ];

  
  useEffect(() => {
    try {
      const savedColors = JSON.parse(localStorage.getItem('colors')) || [];
      const savedDaysData = JSON.parse(localStorage.getItem('daysData')) || {};
      setColors(savedColors);
      setDaysData(savedDaysData);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
  }, []);
 
  useEffect(() => {
    try {
      console.log('Saving colors:', colors);
      localStorage.setItem('colors', JSON.stringify(colors));
    } catch (error) {
      console.error('Error saving colors to localStorage:', error);
    }
  }, [colors]);
 
  useEffect(() => {
    try {
      console.log('Saving daysData:', daysData);
      localStorage.setItem('daysData', JSON.stringify(daysData));
    } catch (error) {
      console.error('Error saving daysData to localStorage:', error);
    }
  }, [daysData]);

  const addNewColor = () => {
    if (newTitle.trim() !== '') {
      setColors([...colors, { color: newColor, title: newTitle }]);
      setNewColor('#000000');
      setNewTitle('');
    }
  };

  const openModal = (month, day) => {
    setSelectedDay({ month, day });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const saveDayColor = (color) => {
    if (selectedDay) {
      const updatedDaysData = { ...daysData };
      if (!updatedDaysData[selectedDay.month]) {
        updatedDaysData[selectedDay.month] = {};
      }
      updatedDaysData[selectedDay.month][selectedDay.day] = color;
      setDaysData(updatedDaysData);
      closeModal();
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1>YEAR TRACKER</h1>
        <div className="color-picker-container">
          <div className="new-color-box">
            <input
              type="color"
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter mood title (e.g., Happy 😊)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <button onClick={addNewColor}>Add Color</button>
          </div>
          <div className="colors-display">
            {colors.map((colorData, index) => (
              <div key={index} className="color-item">
                <div
                  className="color-circle"
                  style={{ backgroundColor: colorData.color }}
                ></div>
                <span>{colorData.title}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="main">
        <div className="months-container">
          {months.map((month, monthIndex) => (
            <div
              key={monthIndex}
              className="month"
              style={{ backgroundImage: `url(/images/${month.name.toLowerCase()}.jpg)` }}
            >
              <h2>
                {month.icon} {month.name}
              </h2>
              <div className="days-container">
                {Array.from({ length: month.days }, (_, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="day-box"
                    onClick={() => openModal(month.name, dayIndex + 1)}
                    style={{
                      backgroundColor: daysData[month.name]?.[dayIndex + 1] || 'transparent',
                    }}
                  >
                    {dayIndex + 1}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {modalOpen && selectedDay && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              {selectedDay.day} {selectedDay.month}
            </h2>
            <div className="color-options">
              {colors.map((colorData, index) => (
                <div
                  key={index}
                  className="color-option"
                  style={{ backgroundColor: colorData.color }}
                  onClick={() => saveDayColor(colorData.color)}
                >
                  <span>{colorData.title}</span>
                </div>
              ))}
            </div>
            <button className="close-modal-btn" onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
