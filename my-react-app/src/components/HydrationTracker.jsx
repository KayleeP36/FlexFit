import { useEffect, useRef, useState } from 'react'
import './HydrationTracker.css'
import AthleteCompare from './AthleteCompare'

const STORAGE_KEY = 'hydration-tracker'
const ML_PER_CUP = 240

function fmt(ml) {
  return `${ml.toLocaleString()} mL`
}

export default function HydrationTracker() {
  const [goal, setGoal] = useState(2000)
  const [consumed, setConsumed] = useState(0)
  const [input, setInput] = useState(250)
  const [confetti, setConfetti] = useState([])
  const [isHydrationLoaded, setIsHydrationLoaded] = useState(false)
  const prevPercent = useRef(0)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw)
        if (parsed.goal || parsed.goal === 0) {
          setGoal(Math.max(1, Number(parsed.goal) || 0))
        }
        if (parsed.consumed || parsed.consumed === 0) {
          setConsumed(Math.max(0, Number(parsed.consumed) || 0))
        }
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsHydrationLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrationLoaded) return

    localStorage.setItem(STORAGE_KEY, JSON.stringify({ goal, consumed, unit: 'ml' }))
    localStorage.setItem('hydrationCups', String(Math.round(consumed / ML_PER_CUP)))
  }, [goal, consumed, isHydrationLoaded])

  const add = (amountInMl) => {
    const safeAmount = Math.max(0, Math.round(amountInMl || 0))
    setConsumed((current) => Math.min(current + safeAmount, goal))
  }

  const reset = () => setConsumed(0)

  const percent = Math.min(100, Math.round((consumed / goal) * 100))

  useEffect(() => {
    if (prevPercent.current < 100 && percent === 100) {
      const palette = ['#22d3ee', '#0ea5ff', '#67e8f9', '#facc15', '#f472b6', '#34d399']
      const shapes = ['rect', 'circle', 'diamond', 'streamer']
      const pieces = Array.from({ length: 64 }).map(() => ({
        id: Math.random().toString(36).slice(2),
        left: Math.random() * 100,
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: shapes[Math.floor(Math.random() * shapes.length)],
        delay: Math.random() * 0.55,
        duration: 2.4 + Math.random() * 1.8,
        drift: -160 + Math.random() * 320,
        size: 7 + Math.random() * 9,
        tilt: -45 + Math.random() * 90,
        burst: -90 + Math.random() * 95,
      }))
      setConfetti(pieces)

      const clearTimer = setTimeout(() => setConfetti([]), 4800)
      return () => clearTimeout(clearTimer)
    }
    prevPercent.current = percent
  }, [percent])

  const duckSurfacePercent = Math.min(percent, 92)

  return (
    <section className="tracker-root" id="hydration-tracker" aria-label="Water tracker">
      <div className="tracker-controls">
        <div className="info">
          <span className="counter">{percent}% complete</span>
          <h1>Hydration Tracker</h1>
          <p className="tracker-subtitle">
            One simple unit, one live tank, and benchmark stats from elite athletes in the dataset.
          </p>
          <div className="stats">
            <div>
              <strong>{fmt(consumed)}</strong>
              <div className="muted">consumed</div>
            </div>
            <div>
              <strong>{fmt(goal)}</strong>
              <div className="muted">daily goal</div>
            </div>
            <div>
              <strong>{Math.max(goal - consumed, 0).toLocaleString()} mL</strong>
              <div className="muted">remaining</div>
            </div>
          </div>
        </div>

        <div className="controls controls-compact" aria-label="Hydration controls">
          <label>
            Add amount (mL)
            <input
              type="number"
              value={input}
              min={0}
              step={50}
              onChange={(e) => setInput(Number(e.target.value))}
            />
          </label>

          <label className="goal">
            Daily goal (mL)
            <input
              type="number"
              value={goal}
              min={1}
              step={50}
              onChange={(e) => setGoal(Math.max(1, Number(e.target.value) || 0))}
            />
          </label>

          <div className="buttons control-buttons">
            <button onClick={() => add(input)}>Add Amount</button>
            <button onClick={() => add(250)}>+250</button>
            <button onClick={() => add(500)}>+500</button>
            <button onClick={reset} className="ghost">Reset</button>
          </div>
        </div>
      </div>

      <div id="center">
        <div className="hero">
          <div className="framework" aria-hidden="true" />
          <div className="vite" aria-hidden="true" />
          <div className="base">
            <div className="ticks">
              <div className="pool-wrap">
                <div className="pool">
                  <div className="water" style={{ height: `${percent}%` }} aria-hidden />
                  <div
                    className={`duck ${percent === 100 ? 'celebrate' : ''}`}
                    style={{ bottom: `calc(${duckSurfacePercent}% + 8px)` }}
                  >
                    <div className="duck-body" />
                    <div className="duck-beak" />
                    <div className="duck-eye" />
                  </div>

                  {confetti.length > 0 && (
                    <div className="confetti-root" aria-hidden>
                      {confetti.map((piece) => (
                        <span
                          className={`confetti ${piece.shape}`}
                          key={piece.id}
                          style={{
                            left: `${piece.left}%`,
                            background: piece.color,
                            '--delay': `${piece.delay}s`,
                            '--fall': `${piece.duration}s`,
                            '--drift': `${piece.drift}px`,
                            '--size': `${piece.size}px`,
                            '--tilt': `${piece.tilt}deg`,
                            '--burst': `${piece.burst}px`,
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <section id="next-steps">
        <div className="challenge-column olympic-bottom">
          <h2>Olympian Benchmarks</h2>
          <p className="panel-subtitle">
            These benchmark cards stay visible now so you can always compare your intake to the athlete dataset.
          </p>
          <div className="compare-grid">
            <div className="compare-grid-left">
              <AthleteCompare consumedMl={consumed} goalMl={goal} unit="ml" />
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}