import { useState, useEffect, useRef } from 'react'

export default function AutoSizer({ children }) {
  const ref = useRef(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    if (!ref.current) return
    const ro = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        setSize({ width, height })
      }
    })
    ro.observe(ref.current)
    const { width, height } = ref.current.getBoundingClientRect()
    setSize({ width, height })
    return () => ro.disconnect()
  }, [])

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {size.width > 0 && size.height > 0 && children(size)}
    </div>
  )
}
