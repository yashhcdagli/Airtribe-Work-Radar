import React from 'react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'
import { ErrorState } from './StateBlocks.jsx'

export default function AISummary() {
  const { briefing, syncError, toggleSyncError } = useWorkRadar()

  return (
    <section className="panel">
      <div className="panel__header">
        <div className="panel__title">
          <span className="panel__eyebrow">AI Summary</span>
          Today&rsquo;s Briefing
        </div>
        <span className="panel__timestamp">GENERATED {briefing.generatedAt}</span>
      </div>

      {syncError ? (
        <div className="briefing__body">
          <ErrorState
            title="Couldn\u2019t refresh the briefing"
            description="WorkRadar lost its connection to Jira and GitHub during the last sync. Your last known state is still shown across the dashboard."
            onRetry={toggleSyncError}
          />
        </div>
      ) : (
        <div className="briefing__body">
          <p className="briefing__text">
            {briefing.segments.map((seg, i) => (
              <span
                key={i}
                className={seg.emphasis ? `em${seg.tone ? ` em--${seg.tone}` : ''}` : undefined}
              >
                {seg.text}
              </span>
            ))}
          </p>
          <div className="briefing__grid">
            {briefing.highlights.map((h) => (
              <div
                key={h.id}
                className={`highlight-card${h.id === 'comms' ? ' highlight-card--comms' : ''}`}
              >
                <div className="highlight-card__eyebrow">{h.eyebrow}</div>
                <div className="highlight-card__title">{h.title}</div>
                <div className="highlight-card__detail">{h.detail}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
