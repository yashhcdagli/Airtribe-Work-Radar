import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { initialPriorities, roster, alerts, blocked, stats, briefing, meta, currentUser } from '../data/mockData.js'

const WorkRadarContext = createContext(null)

const SNOOZE_LABEL = 'Snoozed'

export function WorkRadarProvider({ children }) {
  const [priorities, setPriorities] = useState(initialPriorities)
  const [toast, setToast] = useState(null)
  const [syncError, setSyncError] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const showToast = useCallback((message) => {
    setToast(message)
    window.clearTimeout(showToast._t)
    showToast._t = window.setTimeout(() => setToast(null), 2600)
  }, [])

  const assignTask = useCallback(
    (taskId, memberId) => {
      setPriorities((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, assignee: memberId } : t))
      )
      const member = roster.find((m) => m.id === memberId)
      showToast(`Assigned to ${member ? member.name : memberId}`)
    },
    [showToast]
  )

  const markDone = useCallback(
    (taskId) => {
      setPriorities((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: 'Done' } : t))
      )
      showToast('Marked as done')
    },
    [showToast]
  )

  const snoozeTask = useCallback(
    (taskId) => {
      setPriorities((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: SNOOZE_LABEL } : t))
      )
      showToast('Snoozed until tomorrow\u2019s briefing')
    },
    [showToast]
  )

  const toggleSyncError = useCallback(() => setSyncError((v) => !v), [])

  const value = useMemo(
    () => ({
      priorities,
      roster,
      alerts,
      blocked,
      stats,
      briefing,
      meta,
      currentUser,
      assignTask,
      markDone,
      snoozeTask,
      toast,
      showToast,
      syncError,
      toggleSyncError,
      searchQuery,
      setSearchQuery,
    }),
    [
      priorities,
      assignTask,
      markDone,
      snoozeTask,
      toast,
      showToast,
      syncError,
      toggleSyncError,
      searchQuery,
    ]
  )

  return <WorkRadarContext.Provider value={value}>{children}</WorkRadarContext.Provider>
}

export function useWorkRadar() {
  const ctx = useContext(WorkRadarContext)
  if (!ctx) throw new Error('useWorkRadar must be used within a WorkRadarProvider')
  return ctx
}
