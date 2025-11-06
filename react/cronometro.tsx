import React, { useEffect, useState } from 'react'

const ShelfTimer: React.FC = () => {
  // 🕒 Data e hora de início (04/11/2025 às 09:45)
  const startTime = new Date('2025-11-04T09:48:00')

  // Duração em milissegundos (10 segundos)
  const duration = 10 * 1000

  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const start = startTime.getTime()
      const end = start + duration

      if (now < start) {
        // Ainda não começou
        setIsActive(false)
        setTimeLeft(start - now)
      } else if (now >= start && now <= end) {
        // Está no tempo ativo
        setIsActive(true)
        setTimeLeft(end - now)
      } else {
        // Passou o tempo
        setIsActive(false)
        setTimeLeft(0)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Formatar HH:MM:SS
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000)
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0')
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0')
    const seconds = String(totalSeconds % 60).padStart(2, '0')
    return `${hours}:${minutes}:${seconds}`
  }

  useEffect(() => {
    // Seleciona a prateleira
    const shelf = document.querySelector(
      '.vtex-flex-layout-0-x-flexRow--linha-shelf-timer'
    ) as HTMLElement | null

    if (shelf) {
      if (isActive) {
        shelf.style.display = 'flex'
      } else {
        shelf.style.display = 'none'
      }
    }
  }, [isActive])

  return (
    <div style={{ textAlign: 'center', margin: '5px 0', color: 'red' }}>
      {timeLeft !== null && (
        <div>
          <h3>
            {isActive ? 'Oferta ativa! Termina em:' : 'Aguardando início...'}
          </h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'red' }}>
            {formatTime(timeLeft)}
          </p>
        </div>
      )}
    </div>
  )
}

export default ShelfTimer
