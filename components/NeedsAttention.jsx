import React from 'react'
import { ShieldAlert } from 'lucide-react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'

export default function NeedsAttention() {
  const { alerts } = useWorkRadar()

  return (
    <section className="panel panel--orange">
      <div className="panel__header">
        <div className="panel__title">
          <ShieldAlert size={17} />
          Needs Attention
        </div>
        <span className="badge-count">{alerts.length} CRITICAL</span>
      </div>
      {alerts.map((a) => (
        <div className="alert-item" key={a.id}>
          <div className="alert-item__meta">
            <span className="alert-item__tag">{a.tag}</span>
            <span className="alert-item__ref">{a.ref}</span>
          </div>
          <div className="alert-item__title">{a.title}</div>
          <div className="alert-item__desc">{a.description}</div>
        </div>
      ))}
    </section>
  )
}
