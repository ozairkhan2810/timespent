# Time Tracker Application

A modern React-based time tracking application that helps you monitor time spent on multiple activities with detailed history tracking.

## Features

### Timer Management
- Create multiple named timers
- Start, pause, continue, and stop functionality for each timer
- Option to run multiple timers simultaneously or restrict to one active timer
- Real-time tracking with HH:MM:SS format display

### History Tracking
- Automatic session history for each timer
- Record keeping of:
  - Duration of each session
  - Date and time of completion
  - Optional notes for context
- Persistent history display for each timer
- Scrollable history view for multiple entries

### User Interface
- Clean and intuitive design
- Responsive layout that works on all screen sizes
- Modal dialog for adding notes when stopping timers
- Visual feedback for active timers
- Easy-to-read time display

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Navigate to the project directory:
```bash
cd timespentweb
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173`

## Usage

1. **Creating a Timer**
   - Enter a name in the input field
   - Click "Add Timer" to create a new timer

2. **Controlling Timers**
   - Click "Start" to begin timing
   - Use "Pause" to temporarily stop
   - "Continue" resumes from where you left off
   - "Stop" ends the current session

3. **Adding Notes**
   - When stopping a timer, you can add notes about the session
   - Notes are saved with the session history

4. **Viewing History**
   - Each timer displays its history below the controls
   - History shows duration, date/time, and notes for each session

5. **Multiple Timer Mode**
   - Toggle "Allow multiple timers" to run several timers simultaneously
   - When disabled, starting one timer will pause others

## Technologies Used

- React 18
- TypeScript
- Vite
- CSS3 with modern features

## Project Structure

```
src/
  ├── components/
  │   ├── Timer.tsx          # Individual timer component
  │   └── TimerManager.tsx   # Main timer management component
  ├── App.tsx                # Main application component
  ├── main.tsx              # Application entry point
  └── styles/
      ├── App.css           # Application-wide styles
      └── TimerManager.css  # Timer-specific styles
```

## Features in Detail

### Timer Component
- Displays current time in HH:MM:SS format
- Context-aware controls that change based on timer state
- Clean and intuitive user interface

### Timer Manager
- Manages multiple timer instances
- Handles timer state and history
- Provides modal interface for adding notes
- Maintains history for each timer

### History System
- Tracks completed sessions
- Stores duration, date/time, and notes
- Provides scrollable interface for viewing past sessions

## Development

This project uses:
- Vite for fast development and building
- TypeScript for type safety
- React for UI components
- CSS Modules for styling

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```
