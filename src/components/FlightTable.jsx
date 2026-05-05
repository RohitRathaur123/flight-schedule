import { useState, useCallback, useRef, useEffect } from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from './AutoSizer'
import FlightRow from './FlightRow'
import './FlightTable.css'

const COLS = [
  { key: 'check', width: 44, label: '' },
  { key: 'id', width: 96, label: 'ID' },
  { key: 'aoc', width: 60, label: 'AOC' },
  { key: 'flight', width: 80, label: 'FLIGHT' },
  { key: 'route', width: 110, label: 'ROUTE' },
  { key: 'std', width: 68, label: 'STD' },
  { key: 'sta', width: 68, label: 'STA' },
  { key: 'days', width: 160, label: 'DAYS' },
  { key: 'body', width: 80, label: 'BODY' },
  { key: 'dateRange', width: 180, label: 'PERIOD' },
  { key: 'status', width: 110, label: 'STATUS' },
  { key: 'actions', width: 140, label: '' },
]

const ROW_HEIGHT = 52

export default function FlightTable({
  flights,
  selectedIds,
  onSelectAll,
  onSelectRow,
  onToggleStatus,
  onSave,
  onDelete,
}) {
  const allSelected = flights.length > 0 && flights.every(f => selectedIds.has(f.id))
  const someSelected = flights.some(f => selectedIds.has(f.id))

  const itemData = {
    flights,
    selectedIds,
    onSelectRow,
    onToggleStatus,
    onSave,
    onDelete,
  }

  return (
    <div className="table-wrap">
      {/* Header */}
      <div className="table-header-row">
        {COLS.map(col => (
          <div
            key={col.key}
            className={`th th-${col.key}`}
            style={{ width: col.width, minWidth: col.width }}
          >
            {col.key === 'check' ? (
              <input
                type="checkbox"
                className="row-checkbox"
                checked={allSelected}
                ref={el => { if (el) el.indeterminate = someSelected && !allSelected }}
                onChange={e => onSelectAll(e.target.checked)}
              />
            ) : col.label}
          </div>
        ))}
      </div>

      {/* Virtualized rows */}
      <div className="table-body">
        {flights.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">✈</span>
            <span>No flights match your filters</span>
          </div>
        ) : (
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                itemCount={flights.length}
                itemSize={ROW_HEIGHT}
                width={width}
                itemData={itemData}
                overscanCount={5}
              >
                {FlightRow}
              </List>
            )}
          </AutoSizer>
        )}
      </div>
    </div>
  )
}
