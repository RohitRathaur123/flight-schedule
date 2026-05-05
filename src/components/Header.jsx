import { Trash2, Plane } from 'lucide-react'
import './Header.css'

export default function Header({ total, filtered, selectedCount, onDeleteSelected }) {
  return (
    <header className="header">
      <div className="header-left">
        <div className="header-logo">
          <Plane size={18} strokeWidth={2} />
          <span className="header-brand">TELEPORT</span>
        </div>
        <div className="header-divider" />
        <div className="header-title">Flight Schedule</div>
      </div>
      <div className="header-right">
        {selectedCount > 0 && (
          <button className="btn-delete-sel" onClick={onDeleteSelected}>
            <Trash2 size={14} />
            Delete {selectedCount} selected
          </button>
        )}
        <div className="header-stats">
          <span className="stat-val">{filtered}</span>
          <span className="stat-label">/ {total} flights</span>
        </div>
      </div>
    </header>
  )
}
