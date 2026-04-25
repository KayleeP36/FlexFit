import { useEffect, useState, useRef } from 'react'
import '../App.css'
import AthleteCompare from './AthleteCompare'
import FriendChallenge from './FriendChallenge'

const STORAGE_KEY = 'hydration-tracker'

const ML_PER_CUP = 240
const ML_PER_L = 1000

function fmt(ml, unit) {
  if (unit === 'cups') return `${(ml / ML_PER_CUP).toFixed(2)} cups`
  if (unit === 'l') return `${(ml / ML_PER_L).toFixed(2)} L`
  return `${ml} ml`
}

export default function HydrationTracker() {
  const [goal, setGoal] = useState(2000) // stored in ml
  const [consumed, setConsumed] = useState(0) // ml
  const [input, setInput] = useState(250) // shown in currentUnit
  const [unit, setUnit] = useState('ml') // 'ml' | 'l' | 'cups'
  const [showCompare, setShowCompare] = useState(false)
  const [friendName, setFriendName] = useState('')
  const [friendInput, setFriendInput] = useState(0)
  const [friendConsumedMl, setFriendConsumedMl] = useState(0)
  
  const [confetti, setConfetti] = useState([])
  const prevPercent = useRef(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.goal) setGoal(parsed.goal)
        if (parsed.consumed) setConsumed(parsed.consumed)
        if (parsed.unit) setUnit(parsed.unit)
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ goal, consumed, unit }))
  }, [goal, consumed, unit])

  

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY + ':friend')
      if (raw) {
        const p = JSON.parse(raw)
        if (p.name) setFriendName(p.name)
        if (p.consumedMl) setFriendConsumedMl(p.consumedMl)
      }
    } catch (e) {}
  }, [])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY + ':friend', JSON.stringify({ name: friendName, consumedMl: friendConsumedMl }))
  }, [friendName, friendConsumedMl])

  const toMl = (value, u) => {
    if (u === 'cups') return Math.round(value * ML_PER_CUP)
    if (u === 'l') return Math.round(value * ML_PER_L)
    return Math.round(value)
  }

  const fromMl = (ml, u) => {
    if (u === 'cups') return +(ml / ML_PER_CUP).toFixed(2)
    if (u === 'l') return +(ml / ML_PER_L).toFixed(2)
    return ml
  }

  const add = (amountInCurrentUnit) => {
    const ml = toMl(amountInCurrentUnit, unit)
    setConsumed((c) => Math.min(c + ml, goal))
  }

  const reset = () => setConsumed(0)

  const updateFriend = (valInCurrentUnit) => {
    const ml = toMl(valInCurrentUnit, unit)
    setFriendConsumedMl(ml)
  }

  const createRoom = () => {
    // live rooms removed; this is now a no-op kept for compatibility
    return
  }

  const joinRoom = (id, secret) => {
    // live rooms removed; this is now a no-op kept for compatibility
    return
  }


  const percent = Math.min(100, Math.round((consumed / goal) * 100))

  // trigger confetti once when reaching 100%
  useEffect(() => {
    if (prevPercent.current < 100 && percent === 100) {
      // create confetti pieces
      const pieces = Array.from({ length: 32 }).map(() => ({
        id: Math.random().toString(36).slice(2),
        left: Math.random() * 100,
        color: ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93'][Math.floor(Math.random() * 5)],
        delay: Math.random() * 0.4,
      }))
      setConfetti(pieces)
      setTimeout(() => setConfetti([]), 3500)
    }
    prevPercent.current = percent
  }, [percent])

  // duck shouldn't go off-screen; cap its surface percent a bit below 100
  const duckSurfacePercent = Math.min(percent, 92)

  return (
    <div className="tracker-root">
      <div className="tracker-controls">
        <div className="info">
          <h1>Hydration Tracker</h1>
          <div className="stats">
            <div>
              <strong>{fmt(consumed, unit)}</strong>
              <div className="muted">consumed</div>
            </div>
            <div>
              <strong>{fmt(goal, unit)}</strong>
              <div className="muted">daily goal</div>
            </div>
            <div>
              <strong>{percent}%</strong>
              <div className="muted">progress</div>
            </div>
          </div>
        </div>

        <div className="controls">
          <label>
            Unit
            <select value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="ml">ml</option>
              <option value="l">liters</option>
              <option value="cups">cups</option>
            </select>
          </label>

          <label>
            Add amount
            <input
              type="number"
              value={input}
              min={0}
              onChange={(e) => setInput(Number(e.target.value))}
            />
          </label>
          <div className="buttons">
            <button onClick={() => add(input)}>Add</button>
            <button onClick={() => add(unit === 'cups' ? 1 : unit === 'l' ? 0.25 : 250)}>+250</button>
            <button onClick={() => add(unit === 'cups' ? 2 : unit === 'l' ? 0.5 : 500)}>+500</button>
            <button onClick={reset} className="ghost">
              Reset
            </button>
          </div>
          <label className="goal">
            Daily goal
            <input
              type="number"
              value={fromMl(goal, unit)}
              min={1}
              onChange={(e) => setGoal(Math.max(1, toMl(Number(e.target.value) || 0, unit)))}
            />
          </label>
        </div>
      </div>

      <div className="controls-extra">
        <button className="compare-toggle" onClick={() => setShowCompare((s) => !s)}>
          {showCompare ? 'Hide' : 'Compare to Pros'}
        </button>
      </div>

      <div className="pool-wrap">
        <div className="pool">
          <div
            className="water"
            style={{ height: `${percent}%` }}
            aria-hidden
          />
          <div className={`duck ${percent === 100 ? 'celebrate' : ''}`} style={{bottom: `calc(${duckSurfacePercent}% + 8px)`}}>
            <div className="duck-body" />
            <div className="duck-beak" />
            <div className="duck-eye" />
          </div>

          {confetti.length > 0 && (
            <div className="confetti-root" aria-hidden>
              {confetti.map((c) => (
                <span
                  className="confetti"
                  key={c.id}
                  style={{ left: `${c.left}%`, background: c.color, animationDelay: `${c.delay}s` }}
                />
              ))}
            </div>
          )}

          {showCompare && (
            <div className="compare-modal" role="dialog" aria-modal="true">
              <div className="compare-modal-inner">
                <button className="modal-close" onClick={() => setShowCompare(false)}>✕</button>
                <div className="compare-grid">
                  <div className="compare-grid-left">
                    <AthleteCompare consumedMl={consumed} goalMl={goal} unit={unit} />
                  </div>
                  <div className="compare-grid-right">
                    <FriendChallenge
                      friendName={friendName}
                      setFriendName={setFriendName}
                      friendInput={friendInput}
                      setFriendInput={setFriendInput}
                      friendConsumedMl={friendConsumedMl}
                      updateFriend={updateFriend}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
