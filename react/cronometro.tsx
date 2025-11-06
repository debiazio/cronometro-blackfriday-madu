import React, { useEffect, useState } from 'react'
import styles from './styles.css'

interface CountdownProps {
  /** Data final como string (ex: "2025-11-10T00:00:00") */
  endDate?: string
  /** Classe do VTEX para personalização */
  blockClass?: string
}

const Countdown: React.FC<CountdownProps> = ({
  endDate = "2025-11-10T00:00:00",
  blockClass
}) => {
  const [time, setTime] = useState({ hours: "00", minutes: "00" })

  useEffect(() => {
    const target = new Date(endDate).getTime()

    const tick = () => {
      const now = new Date().getTime()
      const diff = target - now

      if (diff <= 0) {
        setTime({ hours: "00", minutes: "00" })
        return
      }

      const totalHours = Math.floor(diff / (1000 * 60 * 60))
      const minutes = Math.floor((diff / (1000 * 60)) % 60)

      setTime({
        hours: String(totalHours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0")
      })
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [endDate])

  return (
    <div className={`${styles.countdownContainer} ${blockClass ?? ''}`}>
      <div className={styles.timeBlock}>
        <span className={styles.timeNumber}>{time.hours}</span>
        <span className={styles.timeLabel}>horas</span>
      </div>

      <span className={styles.separator}>:</span>

      <div className={styles.timeBlock}>
        <span className={styles.timeNumber}>{time.minutes}</span>
        <span className={styles.timeLabel}>minutos</span>
      </div>
    </div>
  )
}

export default Countdown
