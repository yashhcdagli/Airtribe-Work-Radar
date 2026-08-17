import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Settings2, Github, Mail, X } from 'lucide-react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'
import { EmptyState, ErrorState } from './StateBlocks.jsx'

const SOURCE_ICON = {
  task: Settings2,
  github: Github,
  email: Mail,
}

const STATUS_CLASS = {
  'In Progress': 'progress',
  'Pending Review': 'review',
  Investigating: 'investigating',
  Backlog: 'backlog',
  Blocked: 'blocked',
  Done: 'done',
  Snoozed: 'backlog',
}

export default function PriorityFeed() {
  const { priorities, roster, searchQuery, setSearchQuery, syncError, toggleSyncError } =
    useWorkRadar()

  const rosterById = useMemo(() => Object.fromEntries(roster.map((m) => [m.id, m])), [roster])

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return priorities
    return priorities.filter((p) => {
      const assigneeName = rosterById[p.assignee]?.name ?? ''
      return (
        p.title.toLowerCase().includes(q) ||
        p.sourceLabel.toLowerCase().includes(q) ||
        assigneeName.toLowerCase().includes(q) ||
        p.status.toLowerCase().includes(q)
      )
    })
  }, [priorities, searchQuery, rosterById])

  return (
    <section className="panel">
      <div className="panel__header">
        <div className="panel__title">Ranked Team Priorities</div>
        <span className="priority-feed__sort">Sorted by impact</span>
      </div>

      {searchQuery && (
        <div className="priority-feed__toolbar">
          <span className="status-pill">
            Filtering: &ldquo;{searchQuery}&rdquo; &middot; {filtered.length} match
            {filtered.length === 1 ? '' : 'es'}
          </span>
          <button
            type="button"
            className="btn btn--ghost"
            style={{ padding: '5px 9px' }}
            onClick={() => setSearchQuery('')}
          >
            <X size={13} />
            Clear
          </button>
        </div>
      )}

      {syncError ? (
        <ErrorState
          title="Priority feed is out of date"
          description="The AI ranking engine couldn\u2019t reach Jira or GitHub on the last sync cycle, so this list may not reflect the latest changes."
          onRetry={toggleSyncError}
        />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No matching work found"
          description={`Nothing in today\u2019s feed matches \u201c${searchQuery}\u201d. Try a ticket ID, a teammate\u2019s name, or a status like \u201cblocked\u201d.`}
        />
      ) : (
        <div className="priority-list">
          {filtered.map((p, idx) => {
            const Icon = SOURCE_ICON[p.source] ?? Settings2
            const assignee = rosterById[p.assignee]
            return (
              <Link to={`/item/${p.id}`} className="priority-row" key={p.id}>
                <span className="priority-row__rank">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <span className={`priority-row__icon priority-row__icon--${p.source}`}>
                  <Icon size={14} />
                </span>
                <span className="priority-row__main">
                  <div className="priority-row__source">{p.sourceLabel}</div>
                  <div className="priority-row__title">{p.title}</div>
                </span>
                <span className="priority-row__assignee">{assignee ? assignee.name : 'Unassigned'}</span>
                <span className={`status-pill status-pill--${STATUS_CLASS[p.status] ?? 'backlog'}`}>
                  {p.status}
                </span>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}
