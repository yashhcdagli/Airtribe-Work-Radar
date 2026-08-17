import React from 'react'
import { AlertTriangle, SearchX } from 'lucide-react'

export function ErrorState({ title, description, onRetry }) {
  return (
    <div className="state-block state-block--error">
      <span className="state-block__icon">
        <AlertTriangle size={20} />
      </span>
      <div className="state-block__title">{title}</div>
      <p className="state-block__desc">{description}</p>
      {onRetry && (
        <button type="button" className="btn btn--primary" onClick={onRetry}>
          Retry sync
        </button>
      )}
    </div>
  )
}

export function EmptyState({ title, description }) {
  return (
    <div className="state-block">
      <span className="state-block__icon">
        <SearchX size={20} />
      </span>
      <div className="state-block__title">{title}</div>
      <p className="state-block__desc">{description}</p>
    </div>
  )
}
