import React from 'react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'

export default function WhosBlocked() {
  const { blocked } = useWorkRadar()
  return (
    <section className="panel">
      <div className="panel__header">
        <div className="panel__title">Who&rsquo;s Blocked</div>
      </div>
      <div className="blocked-list">
        {blocked.map((b) => (
          <div className="blocked-card" key={b.id}>
            <div className="blocked-card__top">
              <span className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>
                {b.initials}
              </span>
              <span className="blocked-card__name">{b.name}</span>
              <span className="blocked-card__duration">{b.duration}</span>
            </div>
            <span className="blocked-card__tag">{b.tag}</span>
            <div className="blocked-card__desc">{b.description}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
