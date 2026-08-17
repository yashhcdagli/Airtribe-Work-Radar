import React, { useMemo } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Clock3, UserPlus } from 'lucide-react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'
import { EmptyState } from '../components/StateBlocks.jsx'

const STATUS_CLASS = {
  'In Progress': 'progress',
  'Pending Review': 'review',
  Investigating: 'investigating',
  Backlog: 'backlog',
  Blocked: 'blocked',
  Done: 'done',
  Snoozed: 'backlog',
}

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime()
  const hours = Math.round(diffMs / 3600000)
  if (hours < 1) return 'just now'
  if (hours < 24) return `${hours}h ago`
  return `${Math.round(hours / 24)}d ago`
}

export default function ItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { priorities, roster, assignTask, markDone, snoozeTask } = useWorkRadar()

  const item = useMemo(() => priorities.find((p) => p.id === id), [priorities, id])
  const rosterById = useMemo(() => Object.fromEntries(roster.map((m) => [m.id, m])), [roster])

  if (!item) {
    return (
      <div className="detail-page">
        <Link to="/" className="detail-back">
          <ArrowLeft size={14} /> Back to dashboard
        </Link>
        <EmptyState
          title="Item not found"
          description={`There\u2019s no priority item with id \u201c${id}\u201d in today\u2019s feed. It may have rolled off after being marked done.`}
        />
      </div>
    )
  }

  const assignee = rosterById[item.assignee]
  const isDone = item.status === 'Done'

  return (
    <div className="detail-page">
      <button type="button" className="detail-back" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
        <ArrowLeft size={14} /> Back to dashboard
      </button>

      <div className="detail-header">
        <div>
          <div className="detail-header__source">
            {item.sourceLabel} &middot; Impact: {item.impact}
          </div>
          <h1 className="detail-header__title">{item.title}</h1>
        </div>
        <span className={`status-pill status-pill--${STATUS_CLASS[item.status] ?? 'backlog'}`}>
          {item.status}
        </span>
      </div>

      <div className="detail-grid">
        <div>
          <div className="detail-section">
            <div className="detail-section__label">Description</div>
            <p>{item.description}</p>
          </div>

          <div className="detail-section">
            <div className="detail-section__label">Why WorkRadar ranked this here</div>
            <div className="rationale-box">{item.aiRationale}</div>
          </div>

          <div className="detail-section">
            <div className="detail-section__label">Activity</div>
            <div className="timeline">
              {item.activity.map((a, i) => (
                <div className="timeline-item" key={i}>
                  <span className="timeline-item__time">{timeAgo(a.time)}</span>
                  <span className="timeline-item__text">{a.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="detail-meta-card">
          <div className="meta-row">
            <span className="meta-row__label">
              <UserPlus size={11} style={{ verticalAlign: -1, marginRight: 4 }} />
              Assignee
            </span>
            <select
              value={item.assignee}
              onChange={(e) => assignTask(item.id, e.target.value)}
            >
              {roster.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          <div className="meta-row">
            <span className="meta-row__label">Current owner</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>
                {assignee ? assignee.initials : '?'}
              </span>
              <span style={{ fontSize: 13.5 }}>{assignee ? assignee.name : 'Unassigned'}</span>
            </div>
          </div>

          <div className="detail-actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => markDone(item.id)}
              disabled={isDone}
            >
              <CheckCircle2 size={14} />
              {isDone ? 'Already done' : 'Mark done'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={() => snoozeTask(item.id)}
              disabled={isDone}
            >
              <Clock3 size={14} />
              Snooze to tomorrow
            </button>
          </div>
        </aside>
      </div>
    </div>
  )
}
