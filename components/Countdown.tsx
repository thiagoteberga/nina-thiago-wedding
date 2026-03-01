'use client'

import { useEffect, useState } from 'react'

interface CountdownProps {
  targetDate: Date
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      <div className="text-center">
        <div className="bg-beige-50/95 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg min-w-[80px] md:min-w-[100px]">
          <div className="text-3xl md:text-5xl font-bold text-gold-500">{timeLeft.days}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1 uppercase">Dias</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-beige-50/95 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg min-w-[80px] md:min-w-[100px]">
          <div className="text-3xl md:text-5xl font-bold text-gold-500">{timeLeft.hours}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1 uppercase">Horas</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-beige-50/95 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg min-w-[80px] md:min-w-[100px]">
          <div className="text-3xl md:text-5xl font-bold text-gold-500">{timeLeft.minutes}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1 uppercase">Min</div>
        </div>
      </div>
      <div className="text-center">
        <div className="bg-beige-50/95 backdrop-blur-sm rounded-lg p-4 md:p-6 shadow-lg min-w-[80px] md:min-w-[100px]">
          <div className="text-3xl md:text-5xl font-bold text-gold-500">{timeLeft.seconds}</div>
          <div className="text-xs md:text-sm text-gray-700 mt-1 uppercase">Seg</div>
        </div>
      </div>
    </div>
  )
}
