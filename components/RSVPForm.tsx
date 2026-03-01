'use client'

import { useState } from 'react'

interface Guest {
  id: string
  nome: string
  confirmado: boolean
}

interface RSVPFormProps {
  familyName: string
  guests: Guest[]
  token: string
}

export default function RSVPForm({ familyName, guests: initialGuests, token }: RSVPFormProps) {
  const [guests, setGuests] = useState<Guest[]>(initialGuests)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleToggle = (guestId: string) => {
    setGuests(guests.map(guest =>
      guest.id === guestId ? { ...guest, confirmado: !guest.confirmado } : guest
    ))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          guests: guests.map(g => ({
            id: g.id,
            confirmado: g.confirmado
          }))
        }),
      })

      if (!response.ok) {
        throw new Error('Erro ao confirmar presença')
      }

      setIsSuccess(true)
    } catch (err) {
      setError('Erro ao confirmar presença. Por favor, tente novamente.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="card max-w-2xl mx-auto text-center py-12">
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-green-500 mx-auto"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="heading-2 mb-4">Presença Confirmada!</h2>
        <p className="text-gray-600 text-lg mb-8">
          Obrigado por confirmar, {familyName}! Estamos ansiosos para celebrar com vocês.
        </p>
        <p className="text-sm text-gray-500">
          Nos vemos no dia 07/03/2026 na Chácara Amata! 💍
        </p>
      </div>
    )
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="heading-2 mb-2 text-center">Confirme sua Presença</h2>
      <p className="text-center text-gray-600 mb-8">Família {familyName}</p>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-8">
          <p className="text-sm text-gray-600 mb-4">
            Selecione quem estará presente:
          </p>
          {guests.map((guest) => (
            <label
              key={guest.id}
              className="flex items-center p-4 bg-beige-50 rounded-lg hover:bg-beige-100 transition-colors cursor-pointer border-2 border-transparent hover:border-beige-400"
            >
              <input
                type="checkbox"
                checked={guest.confirmado}
                onChange={() => handleToggle(guest.id)}
                className="w-5 h-5 text-gold-600 border-gray-300 rounded focus:ring-gold-500 focus:ring-2"
              />
              <span className="ml-3 text-lg text-gray-800">{guest.nome}</span>
            </label>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
            {error}
          </div>
        )}

        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Confirmando...' : 'Confirmar Presença'}
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-6">
          Total de pessoas confirmadas: {guests.filter(g => g.confirmado).length} de {guests.length}
        </p>
      </form>
    </div>
  )
}
