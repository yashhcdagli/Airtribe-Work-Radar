import React from 'react'
import StatsBar from '../components/StatsBar.jsx'
import AISummary from '../components/AISummary.jsx'
import NeedsAttention from '../components/NeedsAttention.jsx'
import PriorityFeed from '../components/PriorityFeed.jsx'
import WhosBlocked from '../components/WhosBlocked.jsx'
import OperationalRoster from '../components/OperationalRoster.jsx'

export default function Dashboard() {
  return (
    <>
      <StatsBar />
      <main className="main">
        <div className="col">
          <AISummary />
          <PriorityFeed />
        </div>
        <div className="col">
          <NeedsAttention />
          <WhosBlocked />
          <OperationalRoster />
        </div>
      </main>
    </>
  )
}
