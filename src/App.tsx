import { useState } from 'react'
import './App.css'
import TimerManager from './components/TimerManager'
import './components/TimerManager.css'

function App() {
  const [allowMultipleTimers, setAllowMultipleTimers] = useState(false)

  return (
    <div className="app">
      <h1>Time Tracker</h1>
      <div className="settings">
        <label>
          <input
            type="checkbox"
            checked={allowMultipleTimers}
            onChange={(e) => setAllowMultipleTimers(e.target.checked)}
          />
          Allow multiple timers to run simultaneously
        </label>
      </div>
      <TimerManager allowMultipleTimers={allowMultipleTimers} />
    </div>
  )
}

export default App
