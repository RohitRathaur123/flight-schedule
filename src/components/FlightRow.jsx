import { useState, useCallback } from 'react'
import { Pencil, Trash2, Check, X, Loader2 } from 'lucide-react'
import './FlightRow.css'

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

export default function FlightRow({ index, style, data }) {
  const { flights, selectedIds, onSelectRow, onToggleStatus, onSave, onDelete } = data
  const flight = flights[index]

  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(false)

  const startEdit = () => {
    setDraft({
      startDate: flight.startDate,
      endDate: flight.endDate,
      std: flight.std,
      sta: flight.sta,
      status: flight.status,
    })
    setEditing(true)
    setError(false)
  }

  const cancelEdit = () => {
    setEditing(false)
    setDraft(null)
    setError(false)
  }

  const saveEdit = async () => {
    setSaving(true)
    setError(false)
    try {
      await onSave(flight.id, draft)
      setEditing(false)
      setDraft(null)
    } catch {
      setError(true)
    } finally {
      setSaving(false)
    }
  }

  const isSelected = selectedIds.has(flight.id)

  return (
    <div
      style={{ ...style, display: 'flex', alignItems: 'center' }}
      className={`flight-row ${isSelected ? 'selected' : ''} ${error ? 'row-error' : ''} ${editing ? 'row-editing' : ''}`}
    >
      {/* Checkbox */}
      <div className="cell cell-check">
        <input
          type="checkbox"
          className="row-checkbox"
          checked={isSelected}
          onChange={e => onSelectRow(flight.id, e.target.checked)}
        />
      </div>

      {/* ID */}
      <div className="cell cell-id">
        <span className="id-badge">{flight.id}</span>
      </div>

      {/* AOC */}
      <div className="cell cell-aoc">
        <span className={`aoc-tag aoc-${flight.aoc}`}>{flight.aoc}</span>
      </div>

      {/* Flight number */}
      <div className="cell cell-flight">
        <span className="flight-num">{flight.flightNumber}</span>
      </div>

      {/* Route */}
      <div className="cell cell-route">
        <span className="iata">{flight.origin}</span>
        <span className="route-arrow">→</span>
        <span className="iata">{flight.destination}</span>
      </div>

      {/* STD */}
      <div className="cell cell-time">
        {editing ? (
          <input
            type="time"
            value={draft.std}
            onChange={e => setDraft(d => ({ ...d, std: e.target.value }))}
            className="edit-time"
          />
        ) : (
          <span className="time-val">{flight.std}</span>
        )}
      </div>

      {/* STA */}
      <div className="cell cell-time">
        {editing ? (
          <input
            type="time"
            value={draft.sta}
            onChange={e => setDraft(d => ({ ...d, sta: e.target.value }))}
            className="edit-time"
          />
        ) : (
          <span className="time-val">{flight.sta}</span>
        )}
      </div>

      {/* Days */}
      <div className="cell cell-days">
        <div className="days-row">
          {DAY_LABELS.map((lbl, i) => {
            const day = i + 1
            const active = flight.daysOfOperation.includes(day)
            return (
              <span key={day} className={`day-dot ${active ? 'active' : ''}`}>
                {lbl}
              </span>
            )
          })}
        </div>
      </div>

      {/* Body type */}
      <div className="cell cell-body">
        <span className={`body-tag ${flight.bodyType === 'wide_body' ? 'wide' : 'narrow'}`}>
          {flight.bodyType === 'wide_body' ? 'Wide' : 'Narrow'}
        </span>
      </div>

      {/* Date range */}
      <div className="cell cell-dates">
        {editing ? (
          <div className="edit-dates">
            <input
              type="date"
              value={draft.startDate}
              onChange={e => setDraft(d => ({ ...d, startDate: e.target.value }))}
              className="edit-date"
            />
            <span className="date-arrow">→</span>
            <input
              type="date"
              value={draft.endDate}
              onChange={e => setDraft(d => ({ ...d, endDate: e.target.value }))}
              className="edit-date"
            />
          </div>
        ) : (
          <span className="dates-val">
            {flight.startDate.slice(5)} <span className="date-dim">→</span> {flight.endDate.slice(5)}
          </span>
        )}
      </div>

      {/* Status toggle */}
      <div className="cell cell-status">
        {editing ? (
          <select
            value={draft.status}
            onChange={e => setDraft(d => ({ ...d, status: e.target.value }))}
            className="edit-status"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        ) : (
          <button
            className={`status-toggle ${flight.status === 'Active' ? 'active' : 'inactive'}`}
            onClick={() => onToggleStatus(flight.id)}
            title={`Toggle to ${flight.status === 'Active' ? 'Inactive' : 'Active'}`}
          >
            <span className="toggle-track">
              <span className="toggle-thumb" />
            </span>
            <span className="status-text">{flight.status}</span>
          </button>
        )}
      </div>

      {/* Actions */}
      <div className="cell cell-actions">
        {saving ? (
          <div className="saving-indicator">
            <Loader2 size={14} className="spin" />
            <span>Saving…</span>
          </div>
        ) : editing ? (
          <div className="edit-actions">
            <button className="btn-save" onClick={saveEdit} title="Save">
              <Check size={14} />
              Save
            </button>
            <button className="btn-cancel" onClick={cancelEdit} title="Cancel">
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="row-actions">
            {error && <span className="error-badge" title="Save failed">!</span>}
            <button className="btn-edit" onClick={startEdit} title="Edit">
              <Pencil size={13} />
            </button>
            <button className="btn-del" onClick={() => onDelete(flight.id)} title="Delete">
              <Trash2 size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
