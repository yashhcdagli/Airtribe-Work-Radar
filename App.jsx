import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { WorkRadarProvider, useWorkRadar } from './context/WorkRadarContext.jsx'
import Header from './components/Header.jsx'
import Dashboard from './pages/Dashboard.jsx'
import ItemDetail from './pages/ItemDetail.jsx'
import NotFound from './pages/NotFound.jsx'
import { CheckCircle2 } from 'lucide-react'

function Toast() {
  const { toast } = useWorkRadar()
  if (!toast) return null
  return (
    <div className="toast" role="status">
      <CheckCircle2 size={16} />
      {toast}
    </div>
  )
}

function Shell() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/item/:id" element={<ItemDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toast />
    </div>
  )
}

export default function App() {
  return (
    <WorkRadarProvider>
      <Shell />
    </WorkRadarProvider>
  )
}
