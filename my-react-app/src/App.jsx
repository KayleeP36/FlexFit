import { useEffect, useMemo, useState } from 'react'
import HydrationTracker from './components/HydrationTracker'
import './App.css'

function App() {
  const todayIso = () => new Date().toISOString().slice(0, 10)

  const [currentHash, setCurrentHash] = useState(() => window.location.hash)

  useEffect(() => {
    const onHashChange = () => setCurrentHash(window.location.hash)
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const isHydrationPage = currentHash === '#hydration-tracker'

  const workoutPresets = [
    {
      name: 'Push',
      focus: 'Chest, Shoulders, Triceps',
      duration: '45-55 min',
      rest: '60-90 sec',
      routine: [
        'Warm-up - Band shoulder openers + light push-ups x 5 min',
        'Bench Press - 4 sets x 8 reps',
        'Incline Dumbbell Press - 3 sets x 10 reps',
        'Overhead Press - 3 sets x 8 reps',
        'Tricep Dips - 3 sets x 12 reps',
        'Cool-down - Chest, front delt, and tricep stretch flow x 5 min',
      ],
    },
    {
      name: 'Pull',
      focus: 'Back, Biceps, Rear Delts',
      duration: '45-60 min',
      rest: '60-90 sec',
      routine: [
        'Warm-up - Scap pull-aparts + lat activation x 5 min',
        'Deadlift - 4 sets x 5 reps',
        'Lat Pulldown - 3 sets x 10 reps',
        'Barbell Row - 3 sets x 8 reps',
        'Hammer Curl - 3 sets x 12 reps',
        'Cool-down - Lat, rear delt, and bicep stretch flow x 5 min',
      ],
    },
    {
      name: 'Upper',
      focus: 'Full Upper Body',
      duration: '50-65 min',
      rest: '75-90 sec',
      routine: [
        'Warm-up - Arm circles + band rows + incline push-ups x 6 min',
        'Flat Bench Press - 4 sets x 6 reps',
        'Seated Cable Row - 3 sets x 10 reps',
        'Dumbbell Shoulder Press - 3 sets x 10 reps',
        'Cable Tricep Pushdown - 3 sets x 12 reps',
        'Cool-down - Full upper-body stretch circuit x 6 min',
      ],
    },
    {
      name: 'Lower',
      focus: 'Glutes, Hamstrings, Quads',
      duration: '50-60 min',
      rest: '75-90 sec',
      routine: [
        'Warm-up - Glute bridges + bodyweight squats + hip openers x 6 min',
        'Back Squat - 4 sets x 6 reps',
        'Romanian Deadlift - 3 sets x 8 reps',
        'Walking Lunges - 3 sets x 12 reps each leg',
        'Calf Raises - 4 sets x 15 reps',
        'Cool-down - Quad, hamstring, calf, and hip flexor stretches x 6 min',
      ],
    },
    {
      name: 'Legs',
      focus: 'Quad and Power Focus',
      duration: '45-55 min',
      rest: '60-75 sec',
      routine: [
        'Warm-up - Dynamic lunges + ankle mobility + squat holds x 6 min',
        'Front Squat - 4 sets x 5 reps',
        'Leg Press - 4 sets x 10 reps',
        'Bulgarian Split Squat - 3 sets x 8 reps each leg',
        'Hamstring Curl - 3 sets x 12 reps',
        'Cool-down - Lower-body mobility and long-hold stretches x 6 min',
      ],
    },
    {
      name: 'Cardio',
      focus: 'Conditioning and Endurance',
      duration: '20-35 min',
      rest: 'Intervals',
      routine: [
        'Warm-up - Brisk walk + dynamic leg swings x 5 min',
        'Sprint Intervals - 30 sec on / 60 sec off x 10 rounds',
        'Steady Pace Jog - 10 min',
        'Cool-down - Slow walk + calf and hip stretches x 5 min',
      ],
    },
    {
      name: 'Flexibility',
      focus: 'Mobility and Range of Motion',
      duration: '15-25 min',
      rest: 'Slow breathing',
      routine: [
        'Warm-up - Joint circles + gentle mobility prep x 4 min',
        'Hip Openers - 2 rounds x 60 sec',
        'Thoracic Rotations - 2 rounds x 45 sec',
        'Hamstring Stretch - 2 rounds x 45 sec each side',
        'Shoulder Mobility Flow - 2 rounds x 60 sec',
        'Cool-down - Parasympathetic breathing + relaxed full-body stretch x 4 min',
      ],
    },
    {
      name: 'Core',
      focus: 'Abs, Obliques, Lower Back',
      duration: '20-30 min',
      rest: '30-45 sec',
      routine: [
        'Warm-up - Dead bug activation + cat-cow + plank prep x 4 min',
        'Plank — 3 rounds × 60 sec',
        'Hanging Leg Raise — 3 sets × 12 reps',
        'Russian Twist — 3 sets × 20 reps',
        'Ab Wheel Rollout — 3 sets × 10 reps',
        'Cool-down - Child pose + spinal twist + deep breathing x 4 min',
      ],
    },
  ]

  const homeRoutineByPreset = {
    Push: [
      'Warm-up - Arm circles + incline wall push-ups x 4 min',
      'Push-ups - 4 sets x 15 reps',
      'Pike Push-ups - 3 sets x 10 reps',
      'Diamond Push-ups - 3 sets x 10 reps',
      'Chair Dips - 3 sets x 12 reps',
      'Cool-down - Chest and tricep doorway stretches x 4 min',
    ],
    Pull: [
      'Warm-up - Scap squeezes + band/towel rows x 4 min',
      'Doorway Rows (Towel) - 4 sets x 10 reps',
      'Prone Snow Angels - 3 sets x 15 reps',
      'Superman Hold - 3 rounds x 30 sec',
      'Reverse Plank - 3 rounds x 30 sec',
      'Cool-down - Lat and rear shoulder stretches x 4 min',
    ],
    Upper: [
      'Warm-up - Arm swings + shoulder circles + light push-ups x 5 min',
      'Push-ups - 4 sets x 12 reps',
      'Doorway Rows (Towel) - 4 sets x 10 reps',
      'Pike Push-ups - 3 sets x 8 reps',
      'Tricep Bench Dips (Chair) - 3 sets x 12 reps',
      'Cool-down - Full upper-body stretch flow x 5 min',
    ],
    Lower: [
      'Warm-up - Bodyweight squats + glute bridges + hip openers x 5 min',
      'Bodyweight Squats - 4 sets x 20 reps',
      'Reverse Lunges - 3 sets x 12 reps each leg',
      'Single-Leg Glute Bridge - 3 sets x 12 reps each leg',
      'Calf Raises - 4 sets x 20 reps',
      'Cool-down - Quad, hamstring, and calf stretches x 5 min',
    ],
    Legs: [
      'Warm-up - Dynamic lunges + ankle mobility + squat hold x 5 min',
      'Jump Squats - 4 sets x 12 reps',
      'Bulgarian Split Squat (Chair) - 3 sets x 10 reps each leg',
      'Wall Sit - 3 rounds x 45 sec',
      'Hamstring Walkouts - 3 sets x 10 reps',
      'Cool-down - Lower-body recovery stretch flow x 5 min',
    ],
    Cardio: [
      'Warm-up - March in place + dynamic leg swings x 4 min',
      'High Knees - 4 rounds x 45 sec',
      'Burpees - 4 sets x 10 reps',
      'Mountain Climbers - 4 rounds x 40 sec',
      'Jump Rope (Imaginary) - 5 min',
      'Cool-down - Slow march + breathing reset + calf stretch x 4 min',
    ],
    Flexibility: [
      'Warm-up - Gentle joint prep and controlled mobility x 3 min',
      'Hip Openers - 2 rounds x 60 sec',
      'Thoracic Rotations - 2 rounds x 45 sec',
      'Hamstring Stretch - 2 rounds x 45 sec each side',
      'Shoulder Mobility Flow - 2 rounds x 60 sec',
      'Cool-down - Long-hold stretches with nasal breathing x 3 min',
    ],
    Core: [
      'Warm-up - Cat-cow + dead bug activation + hollow hold prep x 4 min',
      'Plank - 3 rounds x 60 sec',
      'Hollow Hold - 3 rounds x 30 sec',
      'Russian Twist - 3 sets x 20 reps',
      'Dead Bug - 3 sets x 12 reps each side',
      'Cool-down - Child pose + spinal rotations x 4 min',
    ],
  }

  const hydrationPercent = useMemo(() => {
    try {
      const rawTracker = localStorage.getItem('hydration-tracker')

      if (rawTracker) {
        const parsed = JSON.parse(rawTracker)
        const consumed = Number(parsed.consumed ?? 0)
        const goal = Math.max(1, Number(parsed.goal ?? 2000))

        return Math.min(100, Math.round((consumed / goal) * 100))
      }
    } catch {
      // fall back to legacy cup counter below
    }

    const recommendedCups = 8
    const storedCups = Number(localStorage.getItem('hydrationCups') ?? 0)
    const hydrationCups = Number.isFinite(storedCups)
      ? Math.min(recommendedCups, Math.max(0, storedCups))
      : 0

    return Math.round((hydrationCups / recommendedCups) * 100)
  }, [currentHash])

  const totalMins = useMemo(() => {
    const secs = Number(localStorage.getItem('workoutSecsTotal') ?? 0)
    return Math.floor(secs / 60)
  }, [])

  const todayKey = new Date().toISOString().slice(0, 10)
  const todayMins = useMemo(() => {
    const raw = JSON.parse(localStorage.getItem('workoutSecsDay') ?? '{}')
    return Math.floor((raw[todayKey] ?? 0) / 60)
  }, [todayKey])

  const [isGymMode, setIsGymMode] = useState(true)

  const visiblePresets = useMemo(() => {
    if (isGymMode) {
      return workoutPresets
    }

    return workoutPresets
      .filter((preset) => homeRoutineByPreset[preset.name])
      .map((preset) => ({
        ...preset,
        routine: homeRoutineByPreset[preset.name],
      }))
  }, [isGymMode])

  const openWorkoutTracker = () => {
    const gymParam = isGymMode ? '1' : '0'
    window.location.assign(`/workout-tracker.html?gym=${gymParam}`)
  }

  const openWorkoutPreset = (presetName) => {
    const encodedName = encodeURIComponent(presetName)
    const gymParam = isGymMode ? '1' : '0'
    window.location.assign(`/workout-tracker.html?preset=${encodedName}&gym=${gymParam}`)
  }

  const openHydrationTracker = () => {
    const baseUrl = `${window.location.pathname}${window.location.search}`
    window.history.pushState(null, '', `${baseUrl}#hydration-tracker`)
    setCurrentHash('#hydration-tracker')
  }

  const openMainWebsite = () => {
    const baseUrl = `${window.location.pathname}${window.location.search}`
    window.history.pushState(null, '', baseUrl)
    setCurrentHash('')
  }

  // ── Personal Records ──────────────────────────────
  const [prs, setPrs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('flexfitPRs') ?? '[]') } catch { return [] }
  })
  const [prExercise, setPrExercise] = useState('')
  const [prValue, setPrValue] = useState('')
  const [prDate, setPrDate] = useState(() => todayIso())
  const [editingId, setEditingId] = useState(null)
  const [editValue, setEditValue] = useState('')
  const [editDate, setEditDate] = useState(() => todayIso())

  function savePrs(next) {
    setPrs(next)
    localStorage.setItem('flexfitPRs', JSON.stringify(next))
  }

  function addPr() {
    const ex = prExercise.trim()
    const val = prValue.trim()
    const date = prDate || todayIso()
    if (!ex || !val) return
    savePrs([...prs, { id: Date.now(), exercise: ex, value: val, date }])
    setPrExercise('')
    setPrValue('')
    setPrDate(todayIso())
  }

  function deletePr(id) {
    savePrs(prs.filter(p => p.id !== id))
  }

  function startEdit(pr) {
    setEditingId(pr.id)
    setEditValue(pr.value)
    setEditDate(pr.date || todayIso())
  }

  function confirmEdit(id) {
    savePrs(
      prs.map((p) =>
        p.id === id
          ? {
              ...p,
              value: editValue.trim() || p.value,
              date: editDate || p.date || todayIso(),
            }
          : p
      )
    )
    setEditingId(null)
  }

  if (isHydrationPage) {
    return (
      <main className="app hydration-page-shell">
        <section className="hero hydration-page">
          <div className="hydration-page-topbar">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openMainWebsite}
            >
              Back To Main Website
            </button>
          </div>
          <HydrationTracker />
        </section>
      </main>
    )
  }

  return (
    <main className="app">
      <div className="grain" aria-hidden="true"></div>
      <section className="hero">
        <div className="stats top-stats" aria-label="Workout highlights">
          <div className="card stat-card">
            <span>Today's Mins Trained</span>
            <strong>{todayMins} min</strong>
          </div>
          <div className={`card stat-card ${hydrationPercent >= 100 ? 'stat-card-hydrated' : ''}`}>
            <span>Hydration Goal</span>
            <strong>{hydrationPercent}% Complete</strong>
          </div>
        </div>

        <h1>Flex<span className="hero-fit">Fit</span> - Track Workouts, Track Progress!</h1>
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
          <div className="preset-toggle" role="group" aria-label="Workout location">
            <button
              type="button"
              className={`preset-toggle-btn ${isGymMode ? 'active' : ''}`}
              onClick={() => setIsGymMode(true)}
            >
              At The Gym
            </button>
            <button
              type="button"
              className={`preset-toggle-btn ${!isGymMode ? 'active' : ''}`}
              onClick={() => setIsGymMode(false)}
            >
              No Equipment
            </button>
          </div>
          {!isGymMode && (
            <p className="preset-mode-note">
              Showing bodyweight-friendly presets only.
            </p>
          )}
          <div className="preset-grid">
            {visiblePresets.map((preset) => (
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

        <section className="pr-section" aria-label="Personal Records">
          <h3>Personal Records</h3>
          <p className="preset-subtitle">Log your best lifts and milestones.</p>

          {prs.length > 0 && (
            <div className="pr-grid">
              {prs.map((pr) => (
                <div className="pr-card" key={pr.id}>
                  <span className="pr-exercise">{pr.exercise}</span>
                  {editingId === pr.id ? (
                    <input
                      className="pr-input pr-input-small pr-date-edit-inline"
                      type="date"
                      value={editDate}
                      onChange={e => setEditDate(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') confirmEdit(pr.id) }}
                    />
                  ) : (
                    <span className="pr-date">{pr.date || 'Date not set'}</span>
                  )}
                  {editingId === pr.id ? (
                    <div className="pr-edit-row">
                      <input
                        className="pr-input pr-input-small pr-value-edit-inline"
                        value={editValue}
                        onChange={e => setEditValue(e.target.value)}
                        onKeyDown={e => { if (e.key === 'Enter') confirmEdit(pr.id) }}
                        autoFocus
                      />
                      <button className="pr-btn pr-save" type="button" onClick={() => confirmEdit(pr.id)}>✓</button>
                    </div>
                  ) : (
                    <div className="pr-edit-row">
                      <strong className="pr-value">{pr.value}</strong>
                      <button className="pr-btn pr-edit" type="button" onClick={() => startEdit(pr)} title="Edit">✎</button>
                      <button className="pr-btn pr-del" type="button" onClick={() => deletePr(pr.id)} title="Delete">×</button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="pr-add-row">
            <input
              className="pr-input"
              placeholder="Exercise (e.g. Bench Press)"
              value={prExercise}
              onChange={e => setPrExercise(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addPr() }}
              maxLength={40}
            />
            <input
              className="pr-input"
              placeholder="PR (e.g. 225 lbs × 5)"
              value={prValue}
              onChange={e => setPrValue(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addPr() }}
              maxLength={40}
            />
            <input
              className="pr-input pr-date-input"
              type="date"
              value={prDate}
              onChange={e => setPrDate(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') addPr() }}
            />
            <button className="btn btn-primary pr-add-btn" type="button" onClick={addPr}>
              Add PR
            </button>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
