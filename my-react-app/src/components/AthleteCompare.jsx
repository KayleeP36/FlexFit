import React from 'react'

const ATHLETES = [
  { id: 'swimmer', name: 'Olympic Swimmer (training day)', intakeMl: 6000 },
  { id: 'marathon', name: 'Marathoner (training day)', intakeMl: 5000 },
  { id: 'cyclist', name: 'Pro Cyclist (stage race)', intakeMl: 4000 },
  { id: 'soccer', name: 'Soccer Pro (match day)', intakeMl: 3000 },
  { id: 'gymnast', name: 'Strength Athlete (heavy training)', intakeMl: 2500 },
]

function fmt(ml) {
  return `${ml} ml`
}

export default function AthleteCompare({ consumedMl, goalMl, unit }) {
  return (
    <div className="compare-panel">
      <h2>Olympian Benchmarks</h2>
      <p className="compare-sub">Permanent benchmark cards from the athlete dataset so you can gauge your intake at a glance.</p>
      <div className="athlete-list">
        {ATHLETES.map((a) => {
          const pctOfAthlete = Math.min(100, Math.round((consumedMl / a.intakeMl) * 100))
          const reached = consumedMl >= a.intakeMl
          return (
            <div className="athlete-row" key={a.id}>
              <div className="athlete-meta">
                <div className="athlete-name">{a.name}</div>
                <div className="athlete-intake">{fmt(a.intakeMl)}</div>
              </div>
              <div className="athlete-progress">
                <div className="bar">
                  <div className="fill" style={{ width: `${pctOfAthlete}%` }} />
                </div>
                <div className="progress-label">{pctOfAthlete}% of pro</div>
                <div className={`motivation ${reached ? 'done' : ''}`}>
                  {reached ? 'You matched this pro — awesome!' : 'Keep going — close the gap!'}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}