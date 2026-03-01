'use client'

import AdminDashboard from '@/components/AdminDashboard'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const response = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        setError('Senha incorreta')
      }
    } catch (err) {
      setError('Erro ao autenticar')
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-beige-50 to-beige-100 px-4">
        <div className="card max-w-md w-full">
          <h1 className="heading-2 text-center mb-6">Área Administrativa</h1>
          <p className="text-center text-gray-600 mb-8">
            Casamento Nina & Thiago
          </p>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Senha de Acesso
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                placeholder="Digite a senha"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                {error}
              </div>
            )}

            <button type="submit" className="w-full btn-primary">
              Entrar
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-gold-500 hover:text-gold-600 text-sm">
              ← Voltar para a página inicial
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard />
}
