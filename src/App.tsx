import { useState } from 'react';
import './App.css';

interface Exercise {
  name: string;
  sets: number;
  reps: string;
  rest: string;
  completed: boolean;
}

interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

const weeklyWorkout: WorkoutDay[] = [
  {
    day: 'MONDAY',
    focus: 'CHEST & TRICEPS',
    exercises: [
      { name: 'Barbell Bench Press', sets: 4, reps: '8-10', rest: '90s', completed: false },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '60s', completed: false },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: '45s', completed: false },
      { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: '60s', completed: false },
      { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: '60s', completed: false },
    ],
  },
  {
    day: 'TUESDAY',
    focus: 'BACK & BICEPS',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: '6-8', rest: '120s', completed: false },
      { name: 'Pull-Ups', sets: 4, reps: '8-10', rest: '90s', completed: false },
      { name: 'Barbell Rows', sets: 3, reps: '10-12', rest: '60s', completed: false },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: '45s', completed: false },
      { name: 'Barbell Curls', sets: 3, reps: '10-12', rest: '60s', completed: false },
    ],
  },
  {
    day: 'WEDNESDAY',
    focus: 'REST / ACTIVE RECOVERY',
    exercises: [
      { name: 'Light Cardio (20 min)', sets: 1, reps: '—', rest: '—', completed: false },
      { name: 'Foam Rolling', sets: 1, reps: '10 min', rest: '—', completed: false },
      { name: 'Stretching Routine', sets: 1, reps: '15 min', rest: '—', completed: false },
    ],
  },
  {
    day: 'THURSDAY',
    focus: 'LEGS & CORE',
    exercises: [
      { name: 'Barbell Squats', sets: 4, reps: '8-10', rest: '120s', completed: false },
      { name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: '90s', completed: false },
      { name: 'Leg Press', sets: 3, reps: '12-15', rest: '60s', completed: false },
      { name: 'Walking Lunges', sets: 3, reps: '12 each', rest: '60s', completed: false },
      { name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: '45s', completed: false },
    ],
  },
  {
    day: 'FRIDAY',
    focus: 'SHOULDERS & ARMS',
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '90s', completed: false },
      { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: '45s', completed: false },
      { name: 'Rear Delt Flyes', sets: 3, reps: '15-20', rest: '45s', completed: false },
      { name: 'Hammer Curls', sets: 3, reps: '10-12', rest: '60s', completed: false },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: '45s', completed: false },
    ],
  },
  {
    day: 'SATURDAY',
    focus: 'FULL BODY POWER',
    exercises: [
      { name: 'Power Cleans', sets: 4, reps: '5', rest: '120s', completed: false },
      { name: 'Box Jumps', sets: 3, reps: '8', rest: '90s', completed: false },
      { name: 'Kettlebell Swings', sets: 3, reps: '15', rest: '60s', completed: false },
      { name: 'Battle Ropes', sets: 3, reps: '30s', rest: '60s', completed: false },
      { name: 'Farmer Walks', sets: 3, reps: '40m', rest: '60s', completed: false },
    ],
  },
  {
    day: 'SUNDAY',
    focus: 'COMPLETE REST',
    exercises: [
      { name: 'Sleep 8+ hours', sets: 1, reps: '—', rest: '—', completed: false },
      { name: 'Hydrate well', sets: 1, reps: '3L+', rest: '—', completed: false },
      { name: 'Meal Prep for Week', sets: 1, reps: '—', rest: '—', completed: false },
    ],
  },
];

function App() {
  const [selectedDay, setSelectedDay] = useState(0);
  const [workouts, setWorkouts] = useState(weeklyWorkout);

  const toggleExercise = (exerciseIndex: number) => {
    setWorkouts((prev) => {
      const newWorkouts = [...prev];
      const exercises = [...newWorkouts[selectedDay].exercises];
      exercises[exerciseIndex] = {
        ...exercises[exerciseIndex],
        completed: !exercises[exerciseIndex].completed,
      };
      newWorkouts[selectedDay] = { ...newWorkouts[selectedDay], exercises };
      return newWorkouts;
    });
  };

  const currentWorkout = workouts[selectedDay];
  const completedCount = currentWorkout.exercises.filter((e) => e.completed).length;
  const progress = (completedCount / currentWorkout.exercises.length) * 100;

  const getDayAbbrev = (day: string) => day.slice(0, 3);

  return (
    <div className="app">
      <div className="noise-overlay" />

      <header className="header">
        <div className="brand">
          <span className="brand-icon">&#9608;&#9608;</span>
          <h1 className="brand-title">IRON<span className="accent">PROTOCOL</span></h1>
        </div>
        <div className="week-indicator">WEEK 01</div>
      </header>

      <nav className="day-nav">
        {workouts.map((workout, index) => (
          <button
            key={workout.day}
            onClick={() => setSelectedDay(index)}
            className={`day-btn ${selectedDay === index ? 'active' : ''} ${
              workout.exercises.every((e) => e.completed) ? 'completed' : ''
            }`}
          >
            <span className="day-abbrev">{getDayAbbrev(workout.day)}</span>
            <span className="day-dot" />
          </button>
        ))}
      </nav>

      <main className="main-content">
        <section className="workout-header">
          <div className="workout-day-label">
            <span className="label-tag">DAY {String(selectedDay + 1).padStart(2, '0')}</span>
            <h2 className="workout-day">{currentWorkout.day}</h2>
          </div>
          <div className="workout-focus">
            <span className="focus-label">FOCUS</span>
            <span className="focus-value">{currentWorkout.focus}</span>
          </div>
        </section>

        <section className="progress-section">
          <div className="progress-info">
            <span className="progress-label">SESSION PROGRESS</span>
            <span className="progress-value">{completedCount}/{currentWorkout.exercises.length}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
            <div className="progress-glow" style={{ width: `${progress}%` }} />
          </div>
        </section>

        <section className="exercises-section">
          <div className="exercises-header">
            <span className="col-name">EXERCISE</span>
            <span className="col-sets">SETS</span>
            <span className="col-reps">REPS</span>
            <span className="col-rest">REST</span>
            <span className="col-status">STATUS</span>
          </div>

          <ul className="exercises-list">
            {currentWorkout.exercises.map((exercise, index) => (
              <li
                key={index}
                className={`exercise-item ${exercise.completed ? 'completed' : ''}`}
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <span className="exercise-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="exercise-name">{exercise.name}</span>
                <span className="exercise-sets">{exercise.sets}</span>
                <span className="exercise-reps">{exercise.reps}</span>
                <span className="exercise-rest">{exercise.rest}</span>
                <button
                  className={`exercise-toggle ${exercise.completed ? 'done' : ''}`}
                  onClick={() => toggleExercise(index)}
                  aria-label={exercise.completed ? 'Mark incomplete' : 'Mark complete'}
                >
                  {exercise.completed ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="toggle-empty" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </section>

        {progress === 100 && (
          <div className="completion-banner">
            <span className="completion-icon">&#9889;</span>
            <span className="completion-text">SESSION COMPLETE</span>
            <span className="completion-icon">&#9889;</span>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Requested by @mi35156 · Built by @clonkbot</p>
      </footer>
    </div>
  );
}

export default App;
