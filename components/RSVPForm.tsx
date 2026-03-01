'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
  // Remover duplicatas por ID (proteção contra dados duplicados)
  const uniqueGuests = Array.from(
    new Map(initialGuests.map(guest => [guest.id, guest])).values()
  )

  const [guests, setGuests] = useState<Guest[]>(uniqueGuests)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(5)
  const router = useRouter()

  // Log para debug (remover depois se necessário)
  useEffect(() => {
    console.log('Convidados recebidos:', initialGuests.length)
    console.log('Convidados únicos:', uniqueGuests.length)
    console.log('Dados:', uniqueGuests)
  }, [])

  // Sincronizar estado com dados do servidor quando mudar
  useEffect(() => {
    const unique = Array.from(
      new Map(initialGuests.map(guest => [guest.id, guest])).values()
    )
    setGuests(unique)
  }, [initialGuests])

  // Verificar se está dentro do prazo (até 04/03/2026 23:59:59)
  const deadline = new Date('2026-03-04T23:59:59')
  const now = new Date()
  const isExpired = now > deadline

  const handleToggle = (guestId: string) => {
    setGuests(guests.map(guest =>
      guest.id === guestId ? { ...guest, confirmado: !guest.confirmado } : guest
    ))
  }

  useEffect(() => {
    if (isSuccess && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (isSuccess && countdown === 0) {
      router.push('/')
    }
  }, [isSuccess, countdown, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    console.log('🚀 INICIANDO CONFIRMAÇÃO')
    console.log('Token:', token)
    console.log('Convidados:', guests)

    try {
      console.log('📡 Fazendo requisição POST para /api/rsvp...')

      const payload = {
        token,
        guests: guests.map(g => ({
          id: g.id,
          confirmado: g.confirmado,
          nome: g.nome
        }))
      }

      console.log('📦 Payload:', JSON.stringify(payload, null, 2))

      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      console.log('📬 Resposta recebida:', response.status, response.statusText)

      const responseData = await response.json()
      console.log('📄 Dados da resposta:', responseData)

      if (!response.ok) {
        console.error('❌ Erro na resposta:', responseData)
        throw new Error('Erro ao confirmar presença')
      }

      console.log('✅ Confirmação bem-sucedida!')
      setIsSuccess(true)
    } catch (err) {
      console.error('❌ ERRO CAPTURADO:', err)
      setError('Erro ao confirmar presença. Por favor, tente novamente.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    const radius = 50
    const circumference = 2 * Math.PI * radius
    const progress = ((5 - countdown) / 5) * circumference

    return (
      <div className="card max-w-2xl mx-auto text-center py-12">
        <div className="mb-6 flex justify-center">
          <div className="relative w-32 h-32">
            <svg className="transform -rotate-90 w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                stroke="#10b981"
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={circumference - progress}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-green-600">{countdown}</span>
            </div>
          </div>
        </div>
        <h2 className="heading-2 mb-4">Presença Confirmada!</h2>
        <p className="text-gray-600 text-lg mb-8">
          Obrigado por confirmar, {familyName}! Estamos ansiosos para celebrar com vocês.
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Nos vemos no dia 07/03/2026 às 11h na Chácara Amata! 💍
        </p>
      </div>
    )
  }

  // Se o prazo expirou, mostrar mensagem
  if (isExpired) {
    return (
      <div className="card max-w-2xl mx-auto text-center py-12">
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-amber-500 mx-auto"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="heading-2 mb-4">Prazo Expirado</h2>
        <p className="text-gray-600 text-lg mb-6">
          O prazo para confirmação de presença encerrou em 04/03/2026.
        </p>
        <p className="text-gray-700 mb-8">
          Para confirmar sua presença ou fazer alterações, por favor entre em contato diretamente com os noivos.
        </p>
        <div className="space-y-2 text-sm text-gray-600">
          <p>💍 Nina & Thiago</p>
          <p>📱 WhatsApp ou telefone dos noivos</p>
        </div>
        <button
          onClick={() => router.push('/')}
          className="btn-secondary mt-8"
        >
          Voltar para o site
        </button>
      </div>
    )
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <h2 className="heading-2 mb-2 text-center">Confirme sua Presença</h2>
      <p className="text-center text-gray-600 mb-4">Família {familyName}</p>

      {/* Aviso de prazo */}
      <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
        <p className="text-sm text-amber-800">
          ⏰ <strong>Prazo para confirmação:</strong> até 04/03/2026
        </p>
        <p className="text-xs text-amber-600 mt-1">
          Você pode alterar sua confirmação até essa data
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-8">
          <p className="text-sm text-gray-600 mb-4">
            Selecione quem estará presente:
          </p>
          {guests.map((guest) => (
            <label
              key={guest.id}
              className="flex items-center p-4 bg-beige-100 rounded-lg hover:bg-beige-200 transition-colors cursor-pointer border-2 border-transparent hover:border-beige-400"
            >
              <input
                type="checkbox"
                checked={guest.confirmado}
                onChange={() => handleToggle(guest.id)}
                className="w-5 h-5 text-gold-500 border-gray-300 rounded focus:ring-gold-500 focus:ring-2"
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
