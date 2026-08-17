import React from 'react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'

export default function StatsBar() {
  const { stats } = useWorkRadar()
  return (
    <div className="stats-bar">
      {stats.map((s) => (
        <div key={s.id} className={`stat stat--${s.tone}`}>
          <div className="stat__label">{s.label}</div>
          <div className="stat__value">
            {s.tone !== 'neutral' && <span className="status-dot" />}
            {s.value}
          </div>
        </div>
      ))}
    </div>
  )
}
