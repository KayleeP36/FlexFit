import './App.css'

function App() {
  const openWorkoutTracker = () => {
    window.location.assign('/workout-tracker.html')
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
            <span>Weekly Streak</span>
            <strong>5 Days</strong>
          </div>
          <div className="card stat-card">
            <span>Calories Burned</span>
            <strong>3,240</strong>
          </div>
          <div className="card stat-card">
            <span>Hydration Goal</span>
            <strong>80% Complete</strong>
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
      </section>
    </main>
  )
}

export default App
