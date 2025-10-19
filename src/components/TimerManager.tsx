import React, { useState, useEffect } from 'react';
import Timer from './Timer';

interface HistoryEntry {
  id: string;
  timerId: string;
  timerName: string;
  duration: number;
  date: string;
  note: string;
}

interface TimerData {
  id: string;
  name: string;
  elapsed: number;
  isRunning: boolean;
  history: HistoryEntry[];
}

interface TimerManagerProps {
  allowMultipleTimers?: boolean;
}

const TimerManager: React.FC<TimerManagerProps> = ({ allowMultipleTimers = false }) => {
  const [timers, setTimers] = useState<TimerData[]>([]);
  const [newTimerName, setNewTimerName] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [selectedTimer, setSelectedTimer] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimers((currentTimers) =>
        currentTimers.map((timer) => ({
          ...timer,
          elapsed: timer.isRunning ? timer.elapsed + 1 : timer.elapsed,
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addTimer = () => {
    if (newTimerName.trim()) {
      const newTimer: TimerData = {
        id: Date.now().toString(),
        name: newTimerName,
        elapsed: 0,
        isRunning: false,
        history: [],
      };
      setTimers([...timers, newTimer]);
      setNewTimerName('');
    }
  };

  const startTimer = (id: string) => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) => ({
        ...timer,
        isRunning:
          timer.id === id
            ? true
            : allowMultipleTimers
            ? timer.isRunning
            : false,
      }))
    );
  };

  const pauseTimer = (id: string) => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) =>
        timer.id === id ? { ...timer, isRunning: false } : timer
      )
    );
  };

  const continueTimer = (id: string) => {
    startTimer(id);
  };

  const addToHistory = (timerId: string, note: string = '') => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) => {
        if (timer.id === timerId) {
          const historyEntry: HistoryEntry = {
            id: Date.now().toString(),
            timerId: timer.id,
            timerName: timer.name,
            duration: timer.elapsed,
            date: new Date().toLocaleString(),
            note: note,
          };
          return {
            ...timer,
            history: [...timer.history, historyEntry],
            isRunning: false,
            elapsed: 0,
          };
        }
        return timer;
      })
    );
    setNoteInput('');
    setSelectedTimer(null);
  };

  const stopTimer = (id: string) => {
    const timer = timers.find((t) => t.id === id);
    if (timer && timer.elapsed > 0) {
      setSelectedTimer(id);
    } else {
      setTimers((currentTimers) =>
        currentTimers.map((timer) =>
          timer.id === id ? { ...timer, isRunning: false, elapsed: 0 } : timer
        )
      );
    }
  };

  const clearHistory = (id: string) => {
    setTimers((currentTimers) =>
      currentTimers.map((timer) =>
        timer.id === id ? { ...timer, history: [] } : timer
      )
    );
  };

  const removeTimer = (id: string) => {
    setTimers((currentTimers) => currentTimers.filter(timer => timer.id !== id));
  };

  const removeAllTimers = () => {
    setTimers([]);
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer-manager">
      <div className="timer-controls">
        <div className="add-timer">
          <input
            type="text"
            value={newTimerName}
            onChange={(e) => setNewTimerName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                addTimer();
              }
            }}
            placeholder="Enter timer name"
          />
          <button onClick={addTimer}>Add Timer</button>
        </div>
        {timers.length > 0 && (
          <button className="remove-all-btn" onClick={removeAllTimers}>
            Remove All Timers
          </button>
        )}
      </div>

      <div className="timers-list">
        {timers.map((timer) => (
          <div key={timer.id} className="timer-container">
            <div className="timer-header">
              <button 
                className="remove-timer-btn" 
                onClick={() => removeTimer(timer.id)}
                title="Remove timer"
              >
                ×
              </button>
            </div>
            <Timer
              id={timer.id}
              name={timer.name}
              isRunning={timer.isRunning}
              elapsed={timer.elapsed}
              onStart={() => startTimer(timer.id)}
              onPause={() => pauseTimer(timer.id)}
              onContinue={() => continueTimer(timer.id)}
              onStop={() => stopTimer(timer.id)}
            />
            {timer.history.length > 0 && (
              <div className="timer-history">
                <div className="history-header">
                  <div className="history-title">
                    <h4>History</h4>
                    <div className="total-time">
                      Total: {formatTime(timer.history.reduce((sum, entry) => sum + entry.duration, 0))}
                    </div>
                  </div>
                  <button 
                    className="clear-history-btn"
                    onClick={() => clearHistory(timer.id)}
                    title="Clear history"
                  >
                    Clear History
                  </button>
                </div>
                <div className="history-entries">
                  {timer.history.map((entry) => (
                    <div key={entry.id} className="history-entry">
                      <div className="history-entry-header">
                        <span className="history-time">{formatTime(entry.duration)}</span>
                        <span className="history-date">{entry.date}</span>
                      </div>
                      {entry.note && <p className="history-note">{entry.note}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedTimer && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add Note</h3>
            <p>Would you like to add a note before stopping the timer?</p>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder="Add your note here (optional)"
              rows={4}
            />
            <div className="modal-buttons">
              <button onClick={() => addToHistory(selectedTimer, noteInput)}>
                Save and Stop
              </button>
              <button onClick={() => addToHistory(selectedTimer)}>
                Stop without Note
              </button>
              <button onClick={() => setSelectedTimer(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimerManager;