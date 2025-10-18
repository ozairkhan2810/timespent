import React from 'react';

interface TimerProps {
  id: string;
  name: string;
  isRunning: boolean;
  elapsed: number;
  onStart: () => void;
  onPause: () => void;
  onStop: () => void;
  onContinue: () => void;
}

const Timer: React.FC<TimerProps> = ({
  name,
  isRunning,
  elapsed,
  onStart,
  onPause,
  onStop,
  onContinue,
}) => {
  const formatTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="timer">
      <h3>{name}</h3>
      <div className="time-display">{formatTime(elapsed)}</div>
      <div className="controls">
        {!isRunning && elapsed === 0 && (
          <button onClick={onStart}>Start</button>
        )}
        {isRunning && <button onClick={onPause}>Pause</button>}
        {!isRunning && elapsed > 0 && (
          <button onClick={onContinue}>Continue</button>
        )}
        {elapsed > 0 && <button onClick={onStop}>Stop</button>}
      </div>
    </div>
  );
};

export default Timer;