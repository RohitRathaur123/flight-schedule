import { Search, X, SlidersHorizontal } from 'lucide-react'
import './FilterBar.css'

const DAYS = [
  { val: 1, label: 'M' },
  { val: 2, label: 'T' },
  { val: 3, label: 'W' },
  { val: 4, label: 'T' },
  { val: 5, label: 'F' },
  { val: 6, label: 'S' },
  { val: 7, label: 'S' },
]

export default function FilterBar({ filters, onChange, aocOptions, onClear, activeCount }) {
  const set = (key, val) => onChange(f => ({ ...f, [key]: val }))

  const toggleDay = (d) => {
    const days = filters.days.includes(d)
      ? filters.days.filter(x => x !== d)
      : [...filters.days, d]
    set('days', days)
  }

  return (
    <div className="filterbar">
      <div className="filterbar-inner">
        {/* Search */}
        <div className="filter-search">
          <Search size={14} className="search-icon" />
          <input
            type="text"
            placeholder="Flight no., origin, destination..."
            value={filters.search}
            onChange={e => set('search', e.target.value)}
            className="search-input"
          />
          {filters.search && (
            <button className="clear-input" onClick={() => set('search', '')}>
              <X size={12} />
            </button>
          )}
        </div>

        <div className="filter-sep" />

        {/* Date Range */}
        <div className="filter-group">
          <label className="filter-label">DATE RANGE</label>
          <div className="date-range">
            <input type="date" value={filters.dateFrom} onChange={e => set('dateFrom', e.target.value)} className="date-input" />
            <span className="date-sep">→</span>
            <input type="date" value={filters.dateTo} onChange={e => set('dateTo', e.target.value)} className="date-input" />
          </div>
        </div>

        <div className="filter-sep" />

        {/* Days of operation */}
        <div className="filter-group">
          <label className="filter-label">DAYS</label>
          <div className="day-pills">
            {DAYS.map((d, i) => (
              <button
                key={d.val}
                className={`day-pill ${filters.days.includes(d.val) ? 'active' : ''}`}
                onClick={() => toggleDay(d.val)}
                title={['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-sep" />

        {/* Status */}
        <div className="filter-group">
          <label className="filter-label">STATUS</label>
          <select value={filters.status} onChange={e => set('status', e.target.value)} className="filter-select">
            <option value="">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* AOC */}
        <div className="filter-group">
          <label className="filter-label">AOC</label>
          <select value={filters.aoc} onChange={e => set('aoc', e.target.value)} className="filter-select">
            <option value="">All</option>
            {aocOptions.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>

        {/* Body type */}
        <div className="filter-group">
          <label className="filter-label">BODY</label>
          <select value={filters.bodyType} onChange={e => set('bodyType', e.target.value)} className="filter-select">
            <option value="">All</option>
            <option value="narrow_body">Narrow</option>
            <option value="wide_body">Wide</option>
          </select>
        </div>

        {activeCount > 0 && (
          <button className="clear-all-btn" onClick={onClear}>
            <X size={12} />
            Clear {activeCount}
          </button>
        )}
      </div>
    </div>
  )
}
