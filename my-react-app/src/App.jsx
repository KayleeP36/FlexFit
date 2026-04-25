import { useMemo } from 'react'
import './App.css'

function App() {
  const workoutPresets = [
    {
      name: 'Push',
      focus: 'Chest, Shoulders, Triceps',
      duration: '45-55 min',
      rest: '60-90 sec',
      routine: [
        'Bench Press - 4 sets x 8 reps',
        'Incline Dumbbell Press - 3 sets x 10 reps',
        'Overhead Press - 3 sets x 8 reps',
        'Tricep Dips - 3 sets x 12 reps',
      ],
    },
    {
      name: 'Pull',
      focus: 'Back, Biceps, Rear Delts',
      duration: '45-60 min',
      rest: '60-90 sec',
      routine: [
        'Deadlift - 4 sets x 5 reps',
        'Lat Pulldown - 3 sets x 10 reps',
        'Barbell Row - 3 sets x 8 reps',
        'Hammer Curl - 3 sets x 12 reps',
      ],
    },
    {
      name: 'Upper',
      focus: 'Full Upper Body',
      duration: '50-65 min',
      rest: '75-90 sec',
      routine: [
        'Flat Bench Press - 4 sets x 6 reps',
        'Seated Cable Row - 3 sets x 10 reps',
        'Dumbbell Shoulder Press - 3 sets x 10 reps',
        'Cable Tricep Pushdown - 3 sets x 12 reps',
      ],
    },
    {
      name: 'Lower',
      focus: 'Glutes, Hamstrings, Quads',
      duration: '50-60 min',
      rest: '75-90 sec',
      routine: [
        'Back Squat - 4 sets x 6 reps',
        'Romanian Deadlift - 3 sets x 8 reps',
        'Walking Lunges - 3 sets x 12 reps each leg',
        'Calf Raises - 4 sets x 15 reps',
      ],
    },
    {
      name: 'Legs',
      focus: 'Quad and Power Focus',
      duration: '45-55 min',
      rest: '60-75 sec',
      routine: [
        'Front Squat - 4 sets x 5 reps',
        'Leg Press - 4 sets x 10 reps',
        'Bulgarian Split Squat - 3 sets x 8 reps each leg',
        'Hamstring Curl - 3 sets x 12 reps',
      ],
    },
    {
      name: 'Cardio',
      focus: 'Conditioning and Endurance',
      duration: '20-35 min',
      rest: 'Intervals',
      routine: [
        'Warm-up Walk - 5 min',
        'Sprint Intervals - 30 sec on / 60 sec off x 10 rounds',
        'Steady Pace Jog - 10 min',
        'Cool-down Walk - 5 min',
      ],
    },
    {
      name: 'Flexibility',
      focus: 'Mobility and Range of Motion',
      duration: '15-25 min',
      rest: 'Slow breathing',
      routine: [
        'Hip Openers - 2 rounds x 60 sec',
        'Thoracic Rotations - 2 rounds x 45 sec',
        'Hamstring Stretch - 2 rounds x 45 sec each side',
        'Shoulder Mobility Flow - 2 rounds x 60 sec',
      ],
    },
    {
      name: 'Cool Down',
      focus: 'Recovery and Heart Rate Reset',
      duration: '10-15 min',
      rest: 'Controlled',
      routine: [
        'Light Walk - 4 min',
        'Box Breathing - 2 min',
        'Full Body Stretch - 6 min',
        'Hydration + Notes - 2 min',
      ],
    },
  ]

  const recommendedCups = 8
  const storedCups = Number(localStorage.getItem('hydrationCups') ?? 0)
  const hydrationCups = Number.isFinite(storedCups)
    ? Math.min(recommendedCups, Math.max(0, storedCups))
    : 0

  const hydrationPercent = useMemo(() => {
    return Math.round((hydrationCups / recommendedCups) * 100)
  }, [hydrationCups])

  const totalMins = useMemo(() => {
    const secs = Number(localStorage.getItem('workoutSecsTotal') ?? 0)
    return Math.floor(secs / 60)
  }, [])

  const todayKey = new Date().toISOString().slice(0, 10)
  const todayMins = useMemo(() => {
    const raw = JSON.parse(localStorage.getItem('workoutSecsDay') ?? '{}')
    return Math.floor((raw[todayKey] ?? 0) / 60)
  }, [todayKey])

  const openWorkoutTracker = () => {
    window.location.assign('/workout-tracker.html')
  }

  const openWorkoutPreset = (presetName) => {
    const encodedName = encodeURIComponent(presetName)
    window.location.assign(`/workout-tracker.html?preset=${encodedName}`)
  }

  const openHydrationTracker = () => {
    window.location.assign('/hydration-tracker.html')
  }

  return (
    <main className="app">
      <div className="grain" aria-hidden="true"></div>
      <section className="hero">
        <div className="stats top-stats" aria-label="Workout highlights">
          <div className="card stat-card">
            <span>Total Mins Trained</span>
            <strong>{totalMins} min</strong>
          </div>
          <div className="card stat-card">
            <span>Today's Mins Trained</span>
            <strong>{todayMins} min</strong>
          </div>
          <div className="card stat-card">
            <span>Hydration Goal</span>
            <strong>{hydrationPercent}% Complete</strong>
          </div>
        </div>

        <p className="eyebrow">FLEXFIT</p>
        <h1>Train Hard. Track Everything.</h1>
        <p className="subtitle">
          Build momentum with workout sessions that feel intense, focused, and
          impossible to skip.
        </p>

        <div className="split" aria-label="Tracking options">
          <article className="card feature-card workout-card">
            <span className="feature-kicker">Performance</span>
            <h2>Workout Tracking</h2>
            <p>
              Log sets, reps, weights, and session intensity in one focused
              place.
            </p>
            <button
              type="button"
              className="btn btn-primary"
              onClick={openWorkoutTracker}
            >
              Open Workout Tracker
            </button>
          </article>

          <article className="card feature-card hydration-card">
            <span className="feature-kicker">Recovery</span>
            <h2>Hydration Tracking</h2>
            <p>
              Track water intake daily and stay fueled so every workout hits
              harder.
            </p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openHydrationTracker}
            >
              Open Hydration Tracker
            </button>
          </article>
        </div>

        <section className="preset-section" aria-label="Prebuilt workout settings">
          <h3>Prebuilt Workout Settings</h3>
          <p className="preset-subtitle">
            Hover over any preset to view the full regimen details.
          </p>
          <div className="preset-grid">
            {workoutPresets.map((preset) => (
              <button
                type="button"
                className="preset-card"
                key={preset.name}
                onClick={() => openWorkoutPreset(preset.name)}
              >
                <div className="preset-front">
                  <span className="preset-name">{preset.name}</span>
                  <p>{preset.focus}</p>
                  <span className="preset-cta">Click to Start</span>
                </div>
                <div className="preset-hover">
                  <strong>{preset.name} Regimen</strong>
                  <p>Duration: {preset.duration}</p>
                  <p>Rest: {preset.rest}</p>
                  <ul>
                    {preset.routine.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ul>
                </div>
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
