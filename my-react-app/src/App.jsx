import { useEffect, useMemo, useState } from 'react'
import './App.css'

const athleteProfiles = [
  {
    name: 'Ava Cole',
    sport: 'Track & Field',
    focus: 'Explosive power',
    metrics: { squat: 255, bench: 165, cardio: 91 },
  },
  {
    name: 'Leo Banks',
    sport: 'Olympic lifting',
    focus: 'Strength surge',
    metrics: { squat: 315, bench: 215, cardio: 74 },
  },
  {
    name: 'Maya Kim',
    sport: 'CrossFit',
    focus: 'Endurance',
    metrics: { squat: 235, bench: 155, cardio: 88 },
  },
]

const activeThemes = ['Leg day', 'Arm day', 'Core day']
const equipmentChoices = ['Chair', 'Dumbbells', 'Barbell', 'Pull-up bar']
const weeklyHydration = [2.0, 1.9, 2.4, 2.2, 1.8, 2.1, 2.5]

const themeAthleteProfiles = {
  'Leg day': [
    {
      name: 'Ava Cole',
      sport: 'Track & Field',
      focus: 'Explosive lower-body power',
      metrics: { squat: 275, jump: 44, cardio: 88 },
    },
    {
      name: 'Maya Kim',
      sport: 'CrossFit',
      focus: 'Dynamic leg endurance',
      metrics: { squat: 245, jump: 39, cardio: 91 },
    },
  ],
  'Arm day': [
    {
      name: 'Leo Banks',
      sport: 'Olympic lifting',
      focus: 'Heavy upper-body strength',
      metrics: { bench: 225, press: 155, pull: 42 },
    },
    {
      name: 'Noah Reed',
      sport: 'Rock climbing',
      focus: 'Grip and pulling power',
      metrics: { bench: 185, press: 110, pull: 47 },
    },
  ],
  'Core day': [
    {
      name: 'Maya Kim',
      sport: 'CrossFit',
      focus: 'Midline stability',
      metrics: { plank: 210, hollow: 120, cardio: 88 },
    },
    {
      name: 'Iris Vale',
      sport: 'Gymnastics',
      focus: 'Core control and balance',
      metrics: { plank: 240, hollow: 132, cardio: 82 },
    },
  ],
}

const starterSessions = [
  { day: 'Mon', theme: 'Leg day', outcome: 'Crushed', blocks: 5, sets: 4, reps: 12 },
  { day: 'Tue', theme: 'Core day', outcome: 'Steady', blocks: 4, sets: 3, reps: 15 },
  { day: 'Wed', theme: 'Rest', outcome: 'Recovery', blocks: 2, sets: 0, reps: 0 },
  { day: 'Thu', theme: 'Arm day', outcome: 'Strong', blocks: 4, sets: 4, reps: 10 },
  { day: 'Fri', theme: 'Full body', outcome: 'Energized', blocks: 5, sets: 3, reps: 12 },
]

const exerciseLibrary = {
  Chair: ['Incline push-ups', 'Box step-ups', 'Seated tricep dips'],
  Dumbbells: ['Dumbbell lunges', 'Bent-over rows', 'Hammer curls'],
  Barbell: ['Back squat', 'Deadlift', 'Overhead press'],
  'Pull-up bar': ['Pull-up holds', 'Negative pull-ups', 'Hanging knee raises'],
}

const exerciseGifs = {
  'Incline push-ups': 'https://media.giphy.com/media/WxazE2jm92I5S/giphy.gif',
  'Box step-ups': 'https://media.giphy.com/media/3oKIPxa1iuFTQFqn4Y/giphy.gif',
  'Seated tricep dips': 'https://media.giphy.com/media/l0MYGd9y0jZxv4nCM/giphy.gif',
  'Dumbbell lunges': 'https://media.giphy.com/media/IFp7TjHd1hG2o/giphy.gif',
  'Bent-over rows': 'https://media.giphy.com/media/ZC1TQLfD1AyyzKJQZU/giphy.gif',
  'Hammer curls': 'https://media.giphy.com/media/3o6Zt6ML6BklcajjsA/giphy.gif',
  'Back squat': 'https://media.giphy.com/media/jVqN9E19N8cK/giphy.gif',
  Deadlift: 'https://media.giphy.com/media/S3pQ5eW03e6b7vV6N6/giphy.gif',
  'Overhead press': 'https://media.giphy.com/media/5xtDarzQ7dChXeM4I4w/giphy.gif',
  'Bodyweight squats': 'https://media.giphy.com/media/12HZukMBlutpoQ/giphy.gif',
  'Plank holds': 'https://media.giphy.com/media/3o6Yg1hOx1WLDhYQ52/giphy.gif',
  'Dynamic lunges': 'https://media.giphy.com/media/26n6WywJ9h7dWEakc/giphy.gif',
}

function App() {
  const [selectedEquipment, setSelectedEquipment] = useState(['Dumbbells'])
  const [waterMl, setWaterMl] = useState(1400)
  const [hydrationGoal, setHydrationGoal] = useState(2400)
  const [timerSec, setTimerSec] = useState(0)
  const [timerActive, setTimerActive] = useState(false)
  const [activeTheme, setActiveTheme] = useState('Leg day')
  const [sessions, setSessions] = useState(starterSessions)
  const [sets, setSets] = useState(3)
  const [reps, setReps] = useState(12)
  const [chatLog, setChatLog] = useState([
    {
      sender: 'coach',
      text: 'Hi! I am your AI coach. Tell me what equipment you have and I’ll design a workout for you.',
    },
    {
      sender: 'coach',
      text: 'Pro tip: if you want a fast start, try Leg day, Arm day, or Core day.',
    },
  ])
  const [summary, setSummary] = useState(
    'Your momentum is strong. Keep your hydration steady and the training intensity will stay in the high-performance zone.'
  )

  useEffect(() => {
    if (!timerActive) {
      return undefined
    }
    const interval = setInterval(() => setTimerSec((value) => value + 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  const fillPct = Math.min(100, Math.round((waterMl / hydrationGoal) * 100))
  const cupCount = Math.min(8, Math.floor((waterMl / hydrationGoal) * 8))

  const formattedTimer = useMemo(() => {
    const hours = String(Math.floor(timerSec / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((timerSec % 3600) / 60)).padStart(2, '0')
    const seconds = String(timerSec % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }, [timerSec])

  const toggleHydrationGoal = () => {
    setHydrationGoal((current) => (current === 2400 ? 3000 : 2400))
  }

  const recommendations = useMemo(() => {
    const exercisePool = selectedEquipment.flatMap((item) => exerciseLibrary[item] || [])
    if (!exercisePool.length) {
      return ['Bodyweight squats', 'Plank holds', 'Dynamic lunges']
    }
    return exercisePool.slice(0, 4)
  }, [selectedEquipment])

  const comparisonProfiles = useMemo(
    () => themeAthleteProfiles[activeTheme] || themeAthleteProfiles['Leg day'],
    [activeTheme]
  )

  const addChat = (sender, text) => setChatLog((current) => [...current, { sender, text }])

  const handleEquipment = (equipment) => {
    setSelectedEquipment((current) => {
      const next = current.includes(equipment)
        ? current.filter((item) => item !== equipment)
        : [...current, equipment]
      return next
    })
    addChat('user', `I have ${equipment}${selectedEquipment.includes(equipment) ? ' toggled off' : ''}`)
    addChat(
      'coach',
      `Great choice. With ${equipment}, I suggest: ${exerciseLibrary[equipment].join(', ')}.`
    )
  }

  const handleTheme = (theme) => {
    setActiveTheme(theme)
    addChat('user', `Let’s do ${theme}`)
    addChat(
      'coach',
      `Awesome! ${theme} is a perfect theme today. I’m pairing it with ${selectedEquipment.join(
        ' + '
      ) || 'bodyweight'} training and recovery support.`
    )
  }

  const addWater = (amount) => {
    setWaterMl((current) => Math.max(0, Math.min(3000, current + amount)))
  }

  const logSession = () => {
    const next = {
      day: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      theme: activeTheme,
      outcome: 'Progress',
      blocks: 4,
      sets,
      reps,
    }
    setSessions((current) => [next, ...current].slice(0, 7))
    setSummary(
      `Today’s ${activeTheme.toLowerCase()} session completed with ${selectedEquipment.join(
        ', '
      ) || 'bodyweight'}. Hydration stayed in range and your recovery score improved.`
    )
    addChat('coach', `Session logged for ${activeTheme}. Great work staying consistent!`)
  }

  return (
    <div className="studio">
      <header className="topbar">
        <div>
          <span className="brand">FlexFit</span>
          <p className="subtitle">Smart workout tracking, hydration coaching, and athlete benchmarks for every session.</p>
        </div>
        <div className="top-actions">
          <div className="chip active">Daily focus: {activeTheme}</div>
          <button type="button" className="chip goal-toggle" onClick={toggleHydrationGoal}>
            Hydration goal: {hydrationGoal}ml
          </button>
        </div>
      </header>

      <section className="overview-grid">
        <article className="panel metric-card">
          <div className="panel-title">
            <h2>Daily performance</h2>
            <span>Fast insights</span>
          </div>
          <div className="metric-list">
            <div className="metric-item">
              <span>Sessions</span>
              <strong>{sessions.length}</strong>
            </div>
            <div className="metric-item">
              <span>Energy</span>
              <strong>High</strong>
            </div>
            <div className="metric-item">
              <span>Focus</span>
              <strong>{activeTheme}</strong>
            </div>
          </div>
          <div className="theme-pill-row">
            {activeThemes.map((theme) => (
              <button
                key={theme}
                className={`theme-pill ${theme === activeTheme ? 'selected' : ''}`}
                type="button"
                onClick={() => handleTheme(theme)}
              >
                {theme}
              </button>
            ))}
          </div>
        </article>

        <article className="panel hydration-panel">
          <div className="panel-title">
            <h2>Hydration schematic</h2>
            <span>Blue-wave visual</span>
          </div>
          <div className="hydration-top">
            <div className="water-tank">
              <div className="water-fill" style={{ height: `${fillPct}%` }} />
              <div className="water-label">
                <strong>{waterMl} ml</strong>
                <span>{fillPct}% of goal</span>
              </div>
            </div>
            <div className="water-controls">
              <button type="button" onClick={() => addWater(-250)}>
                −250ml
              </button>
              <button type="button" onClick={() => addWater(250)}>
                +250ml
              </button>
              <div className="water-status">{cupCount}/8 cups filled</div>
            </div>
          </div>
          <div className="hydration-graph">
            {weeklyHydration.map((value, index) => (
              <div key={index} className="graph-bar">
                <div className="bar-fill" style={{ height: `${(value / 2.6) * 100}%` }} />
                <span>{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}</span>
              </div>
            ))}
          </div>
        </article>

        <article className="panel timer-panel">
          <div className="panel-title">
            <h2>Workout timer</h2>
            <span>Track your cadence</span>
          </div>
          <div className="timer-display">{formattedTimer}</div>
          <div className="timer-actions">
            <button type="button" onClick={() => setTimerActive(!timerActive)}>
              {timerActive ? 'Pause' : 'Start'}
            </button>
            <button
              type="button"
              onClick={() => {
                setTimerActive(false)
                setTimerSec(0)
              }}
            >
              Reset
            </button>
          </div>
          <div className="timer-note">Use the timer during circuits or rest intervals.</div>
        </article>
      </section>

      <section className="dashboard-grid">
        <article className="panel bot-panel">
          <div className="panel-title">
            <h2>AI coach</h2>
            <span>Interactive guidance</span>
          </div>
          <div className="chat-window">
            {chatLog.map((message, index) => (
              <div
                key={index}
                className={`chat-bubble ${message.sender === 'coach' ? 'coach' : 'user'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="equip-row">
            {equipmentChoices.map((item) => (
              <button
                key={item}
                className={`equip-pill ${selectedEquipment.includes(item) ? 'active' : ''}`}
                type="button"
                onClick={() => handleEquipment(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="suggest-row">
            <span>Theme suggestions:</span>
            {activeThemes.map((theme) => (
              <button key={theme} type="button" onClick={() => handleTheme(theme)}>
                {theme}
              </button>
            ))}
          </div>
          <div className="recommendation-box">
            <strong>Workout plan:</strong>
            <ul>
              {recommendations.map((item) => (
                <li key={item}>
                  <a href={exerciseGifs[item] || '#'} target="_blank" rel="noreferrer">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="plan-inputs">
              <label>
                Sets
                <input
                  type="number"
                  min="1"
                  value={sets}
                  onChange={(event) => setSets(Number(event.target.value) || 1)}
                />
              </label>
              <label>
                Reps
                <input
                  type="number"
                  min="1"
                  value={reps}
                  onChange={(event) => setReps(Number(event.target.value) || 1)}
                />
              </label>
            </div>
          </div>
        </article>

        <article className="panel comparison-panel">
          <div className="panel-title">
            <h2>Athlete comparison</h2>
            <span>Performance benchmarks</span>
          </div>
          <div className="athlete-list">
            {comparisonProfiles.map((athlete) => (
              <div key={athlete.name} className="athlete-card">
                <div className="athlete-meta">
                  <strong>{athlete.name}</strong>
                  <span>{athlete.sport}</span>
                </div>
                <div className="athlete-focus">{athlete.focus}</div>
                <div className="metric-preview">
                  {Object.entries(athlete.metrics).map(([label, value]) => (
                    <div key={label}>
                      <small>{label.charAt(0).toUpperCase() + label.slice(1)}</small>
                      <strong>{value}{label === 'cardio' ? '%' : ' lb'}</strong>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel archive-panel">
          <div className="panel-title">
            <h2>Session archive</h2>
            <span>Session history</span>
          </div>
          <div className="archive-grid">
            {sessions.map((session, index) => (
              <div key={`${session.day}-${index}`} className="archive-card">
                <div className="archive-day">{session.day}</div>
                <div className="archive-theme">{session.theme}</div>
                <div className="archive-blocks">
                  {Array.from({ length: 5 }, (_, index) => (
                    <span
                      key={index}
                      className={index < session.blocks ? 'filled' : ''}
                    />
                  ))}
                </div>
                <div className="archive-sets">{session.sets} sets × {session.reps} reps</div>
                <div className="archive-outcome">{session.outcome}</div>
              </div>
            ))}
          </div>
          <button type="button" className="log-button" onClick={logSession}>
            Log new session
          </button>
        </article>

        <article className="panel summary-panel">
          <div className="panel-title">
            <h2>Workout summary</h2>
            <span>AI progress insights</span>
          </div>
          <p>{summary}</p>
          <div className="summary-grid">
            <div>
              <h3>Recovery</h3>
              <p>Balanced with a 92% recovery rating after yesterday’s training.</p>
            </div>
            <div>
              <h3>Focus</h3>
              <p>Shift toward strength-focused sets and controlled pacing.</p>
            </div>
            <div>
              <h3>Wins</h3>
              <p>Hydration, movement consistency, and equipment usage are aligned.</p>
            </div>
          </div>
        </article>
      </section>

      <div className="flexy-prompt">
        <div className="flexy-avatar">
          <svg className="flexy-icon" viewBox="0 0 64 64" aria-hidden="true">
            <path d="M12 24h8v-4H12v4zm32-4h8v4h-8v-4zM8 26h48v4H8v-4zm16 16v-8h4v8h-4zm8-4c0-4 2-6 5-6s5 2 5 6-2 6-5 6-5-2-5-6zm-6 14c0 4 2 6 5 6s5-2 5-6v-4H22v4zm22 0v-4h-8v4h8zm-14 0v-4h-8v4h8z" fill="#000"/>
            <circle cx="24" cy="20" r="3" fill="#000"/>
            <circle cx="38" cy="20" r="3" fill="#000"/>
          </svg>
        </div>
        <div className="flexy-copy">
          <strong>Flexy</strong>
          <p>Need a quick routine? Ask me about chairs, dumbbells, barbells, or a workout theme.</p>
        </div>
        <button
          type="button"
          onClick={() =>
            addChat('coach', 'Flexy is ready. Tell me what equipment you have or pick a theme to start.')
          }
        >
          Chat
        </button>
      </div>
    </div>
  )
}

export default App
