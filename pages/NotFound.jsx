import React from 'react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../components/StateBlocks.jsx'

export default function NotFound() {
  return (
    <div className="detail-page">
      <EmptyState
        title="Nothing here"
        description="That page doesn\u2019t exist in WorkRadar. Head back to the dashboard to see today\u2019s priorities."
      />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
        <Link to="/" className="btn btn--primary">
          Back to dashboard
        </Link>
      </div>
    </div>
  )
}
