'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Countdown from './Countdown'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const weddingDate = new Date('2026-03-07T11:00:00')

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Casamento Nina e Thiago"
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="mb-8">
          <p className="text-beige-100 text-lg md:text-xl mb-4 font-light tracking-widest uppercase">
            Celebre conosco
          </p>
          <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-8xl font-light mb-2 tracking-wide">
            Nina <span className="text-beige-300">&</span> Thiago
          </h1>
          <div className="w-24 h-px bg-beige-400 mx-auto my-8" />
        </div>

        <div className="text-beige-50 space-y-3 mb-12">
          <p className="text-xl md:text-2xl font-light">
            07 de Março de 2026
          </p>
          <p className="text-lg md:text-xl font-light">
            Chácara Amata
          </p>
          <p className="text-sm md:text-base text-beige-100 max-w-md mx-auto">
            Estrada Sebastião Vieira Machado, 1056<br />
            Lago Azul - Pindamonhangaba - SP
          </p>
        </div>

        {/* Countdown */}
        <div className="mb-12">
          <p className="text-beige-100 text-sm md:text-base mb-6 font-light tracking-wide uppercase">
            Faltam
          </p>
          <Countdown targetDate={weddingDate} />
        </div>

        <a
          href="#rsvp"
          className="inline-block btn-primary text-lg animate-pulse hover:animate-none"
        >
          Confirmar Presença
        </a>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          className="w-6 h-6 text-beige-100"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
