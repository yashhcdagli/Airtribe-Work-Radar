import React from 'react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'

export default function OperationalRoster() {
  const { roster } = useWorkRadar()
  const activeCount = roster.filter((m) => m.status === 'active').length

  return (
    <section className="panel">
      <div className="panel__header">
        <div className="panel__title">Operational Roster</div>
        <span className="panel__timestamp" style={{ color: 'var(--green)' }}>
          {activeCount} ACTIVE NOW
        </span>
      </div>
      <div className="roster-list">
        {roster.map((m) => (
          <span
            key={m.id}
            className={`roster-chip${m.status === 'blocked' ? ' roster-chip--blocked' : ''}`}
          >
            <span className="status-dot" />
            {m.name.split(' ')[0]}
          </span>
        ))}
      </div>
    </section>
  )
}
