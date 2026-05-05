import { useState, useMemo, useCallback, useRef } from 'react'
import { flightsData } from './data/flights'
import FilterBar from './components/FilterBar'
import FlightTable from './components/FlightTable'
import Header from './components/Header'
import './App.css'

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function App() {
  const [flights, setFlights] = useState(() => flightsData.map(f => ({ ...f })))
  const [selectedIds, setSelectedIds] = useState(new Set())
  const [filters, setFilters] = useState({
    search: '',
    dateFrom: '',
    dateTo: '',
    days: [],
    status: '',
    aoc: '',
    bodyType: '',
  })

  const aocOptions = useMemo(() => [...new Set(flightsData.map(f => f.aoc))].sort(), [])

  const filteredFlights = useMemo(() => {
    return flights.filter(f => {
      // Search
      if (filters.search) {
        const q = filters.search.toLowerCase()
        if (
          !f.flightNumber.toLowerCase().includes(q) &&
          !f.origin.toLowerCase().includes(q) &&
          !f.destination.toLowerCase().includes(q)
        ) return false
      }
      // Date range overlap
      if (filters.dateFrom || filters.dateTo) {
        const from = filters.dateFrom || '0000-01-01'
        const to = filters.dateTo || '9999-12-31'
        if (f.endDate < from || f.startDate > to) return false
      }
      // Days of operation
      if (filters.days.length > 0) {
        const hasDay = filters.days.some(d => f.daysOfOperation.includes(d))
        if (!hasDay) return false
      }
      // Status
      if (filters.status && f.status !== filters.status) return false
      // AOC
      if (filters.aoc && f.aoc !== filters.aoc) return false
      // Body type
      if (filters.bodyType && f.bodyType !== filters.bodyType) return false

      return true
    })
  }, [flights, filters])

  const handleToggleStatus = useCallback((id) => {
    setFlights(prev => prev.map(f =>
      f.id === id ? { ...f, status: f.status === 'Active' ? 'Inactive' : 'Active' } : f
    ))
  }, [])

  const handleSave = useCallback(async (id, updates) => {
    // Simulate async save with 30% failure rate
    await new Promise(r => setTimeout(r, 800))
    if (Math.random() < 0.15) throw new Error('Save failed')
    setFlights(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f))
  }, [])

  const handleDelete = useCallback((ids) => {
    const idSet = new Set(Array.isArray(ids) ? ids : [ids])
    setFlights(prev => prev.filter(f => !idSet.has(f.id)))
    setSelectedIds(prev => {
      const next = new Set(prev)
      idSet.forEach(id => next.delete(id))
      return next
    })
  }, [])

  const handleSelectAll = useCallback((checked) => {
    if (checked) {
      setSelectedIds(new Set(filteredFlights.map(f => f.id)))
    } else {
      setSelectedIds(new Set())
    }
  }, [filteredFlights])

  const handleSelectRow = useCallback((id, checked) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      checked ? next.add(id) : next.delete(id)
      return next
    })
  }, [])

  const handleClearFilters = useCallback(() => {
    setFilters({ search: '', dateFrom: '', dateTo: '', days: [], status: '', aoc: '', bodyType: '' })
  }, [])

  const activeFilterCount = useMemo(() => {
    let c = 0
    if (filters.search) c++
    if (filters.dateFrom || filters.dateTo) c++
    if (filters.days.length) c++
    if (filters.status) c++
    if (filters.aoc) c++
    if (filters.bodyType) c++
    return c
  }, [filters])

  return (
    <div className="app">
      <Header
        total={flights.length}
        filtered={filteredFlights.length}
        selectedCount={selectedIds.size}
        onDeleteSelected={() => handleDelete([...selectedIds])}
      />
      <FilterBar
        filters={filters}
        onChange={setFilters}
        aocOptions={aocOptions}
        onClear={handleClearFilters}
        activeCount={activeFilterCount}
      />
      <FlightTable
        flights={filteredFlights}
        selectedIds={selectedIds}
        onSelectAll={handleSelectAll}
        onSelectRow={handleSelectRow}
        onToggleStatus={handleToggleStatus}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
