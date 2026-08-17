import React from 'react'
import { Link } from 'react-router-dom'
import { Search } from 'lucide-react'
import { useWorkRadar } from '../context/WorkRadarContext.jsx'

export default function Header() {
  const { meta, currentUser, searchQuery, setSearchQuery, syncError, toggleSyncError } =
    useWorkRadar()

  return (
    <header className="header">
      <Link to="/" className="header__brand">
        <span className="header__mark" />
        <span className="header__title-block">
          <span className="header__title">WorkRadar</span>
          <span className="header__subtitle">AI.CO-PILOT</span>
        </span>
      </Link>

      <span className="header__meta">
        <span className="dot" />
        Date: {meta.date}
        <span style={{ opacity: 0.4 }}>&middot;</span>
        SYNCED: {meta.syncedAgo}
      </span>

      <div className="header__center">
        <label className="header__search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search team logs, commits, tickets\u2026"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <kbd>&#8984;K</kbd>
        </label>
      </div>

      <button
        type="button"
        className="dev-toggle"
        onClick={toggleSyncError}
        title="Demo affordance: simulates a failed sync to show the app's error state"
      >
        {syncError ? 'Restore sync' : 'Simulate sync error'}
      </button>

      <Link to="/" className="header__user">
        <span className="header__user-text">
          <div className="header__user-name">{currentUser.name}</div>
          <div className="header__user-role">{currentUser.role}</div>
        </span>
        <span className="avatar">{currentUser.initials}</span>
      </Link>
    </header>
  )
}
