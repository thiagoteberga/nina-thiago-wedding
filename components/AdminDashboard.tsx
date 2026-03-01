'use client'

import { useEffect, useState } from 'react'

interface Guest {
  id: string
  nome: string
  confirmado: boolean
  data_confirmacao: string | null
}

interface Family {
  id: string
  nome_familia: string
  telefone: string | null
  token_unico: string
  guests: Guest[]
}

export default function AdminDashboard() {
  const [families, setFamilies] = useState<Family[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [showImportForm, setShowImportForm] = useState(false)
  const [newFamily, setNewFamily] = useState({ nome_familia: '', telefone: '', guests: [''] })
  const [importData, setImportData] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFamilies()
  }, [])

  const loadFamilies = async () => {
    try {
      const response = await fetch('/api/admin/families')
      if (!response.ok) throw new Error('Erro ao carregar dados')
      const data = await response.json()
      setFamilies(data)
    } catch (err) {
      setError('Erro ao carregar famílias')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const totalGuests = families.reduce((sum, family) => sum + family.guests.length, 0)
  const confirmedGuests = families.reduce(
    (sum, family) => sum + family.guests.filter(g => g.confirmado).length,
    0
  )

  const handleAddGuest = () => {
    setNewFamily({ ...newFamily, guests: [...newFamily.guests, ''] })
  }

  const updateGuestName = (index: number, name: string) => {
    const updatedGuests = [...newFamily.guests]
    updatedGuests[index] = name
    setNewFamily({ ...newFamily, guests: updatedGuests })
  }

  const removeGuest = (index: number) => {
    setNewFamily({ ...newFamily, guests: newFamily.guests.filter((_, i) => i !== index) })
  }

  const handleAddFamily = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/admin/families', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFamily)
      })

      if (!response.ok) throw new Error('Erro ao adicionar família')

      await loadFamilies()
      setShowAddForm(false)
      setNewFamily({ nome_familia: '', telefone: '', guests: [''] })
    } catch (err) {
      setError('Erro ao adicionar família')
      console.error(err)
    }
  }

  const handleImportCSV = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csvData: importData })
      })

      if (!response.ok) throw new Error('Erro ao importar dados')

      await loadFamilies()
      setShowImportForm(false)
      setImportData('')
    } catch (err) {
      setError('Erro ao importar CSV')
      console.error(err)
    }
  }

  const exportCSV = () => {
    const headers = ['Família', 'Telefone', 'Convidado', 'Confirmado', 'Data Confirmação', 'Link RSVP']
    const rows = families.flatMap(family =>
      family.guests.map((guest, index) => [
        index === 0 ? family.nome_familia : '',
        index === 0 ? family.telefone || '' : '',
        guest.nome,
        guest.confirmado ? 'Sim' : 'Não',
        guest.data_confirmacao ? new Date(guest.data_confirmacao).toLocaleString('pt-BR') : '',
        index === 0 ? `${window.location.origin}/rsvp/${family.token_unico}` : ''
      ])
    )

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `convidados-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-beige-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="heading-1 text-center mb-2">Painel Administrativo</h1>
          <p className="text-center text-gray-600">Casamento Nina & Thiago</p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card text-center">
            <p className="text-gray-600 mb-2">Total de Famílias</p>
            <p className="text-4xl font-bold text-gold-500">{families.length}</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-600 mb-2">Confirmados</p>
            <p className="text-4xl font-bold text-green-600">{confirmedGuests}</p>
          </div>
          <div className="card text-center">
            <p className="text-gray-600 mb-2">Não Confirmados</p>
            <p className="text-4xl font-bold text-gray-400">{totalGuests - confirmedGuests}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button onClick={() => setShowAddForm(!showAddForm)} className="btn-primary">
            + Adicionar Família
          </button>
          <button onClick={() => setShowImportForm(!showImportForm)} className="btn-secondary">
            📥 Importar CSV
          </button>
          <button onClick={exportCSV} className="btn-secondary">
            📤 Exportar CSV
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
            {error}
          </div>
        )}

        {/* Add Family Form */}
        {showAddForm && (
          <div className="card mb-8">
            <h3 className="heading-3 mb-6">Adicionar Nova Família</h3>
            <form onSubmit={handleAddFamily}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome da Família *
                </label>
                <input
                  type="text"
                  required
                  value={newFamily.nome_familia}
                  onChange={(e) => setNewFamily({ ...newFamily, nome_familia: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefone
                </label>
                <input
                  type="tel"
                  value={newFamily.telefone}
                  onChange={(e) => setNewFamily({ ...newFamily, telefone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Convidados *
                </label>
                {newFamily.guests.map((guest, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      required
                      value={guest}
                      onChange={(e) => updateGuestName(index, e.target.value)}
                      placeholder="Nome do convidado"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                    />
                    {newFamily.guests.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGuest(index)}
                        className="px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddGuest}
                  className="text-beige-600 hover:text-beige-700 text-sm mt-2"
                >
                  + Adicionar mais um convidado
                </button>
              </div>
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  Salvar Família
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Import CSV Form */}
        {showImportForm && (
          <div className="card mb-8">
            <h3 className="heading-3 mb-4">Importar CSV</h3>
            <p className="text-sm text-gray-600 mb-4">
              Formato: nome_familia,telefone,convidado1,convidado2,convidado3,...
              <br />
              Exemplo: Família Silva,11999999999,João Silva,Maria Silva
            </p>
            <form onSubmit={handleImportCSV}>
              <textarea
                value={importData}
                onChange={(e) => setImportData(e.target.value)}
                rows={10}
                placeholder="Cole os dados CSV aqui..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent mb-4 font-mono text-sm"
              />
              <div className="flex gap-4">
                <button type="submit" className="btn-primary">
                  Importar
                </button>
                <button
                  type="button"
                  onClick={() => setShowImportForm(false)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Families List */}
        <div className="space-y-6">
          {families.map((family) => {
            const confirmedCount = family.guests.filter(g => g.confirmado).length
            const totalCount = family.guests.length

            return (
              <div key={family.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{family.nome_familia}</h3>
                    {family.telefone && (
                      <p className="text-sm text-gray-600">📱 {family.telefone}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${confirmedCount === totalCount
                        ? 'bg-green-100 text-green-800'
                        : confirmedCount > 0
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                      {confirmedCount}/{totalCount} confirmados
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="space-y-2">
                    {family.guests.map((guest) => (
                      <div
                        key={guest.id}
                        className="flex items-center justify-between p-3 bg-beige-200 rounded-lg"
                      >
                        <span className="text-gray-800">{guest.nome}</span>
                        <div className="flex items-center gap-4">
                          {guest.confirmado ? (
                            <>
                              <span className="text-green-600 text-sm font-medium">✓ Confirmado</span>
                              {guest.data_confirmacao && (
                                <span className="text-xs text-gray-500">
                                  {new Date(guest.data_confirmacao).toLocaleDateString('pt-BR')}
                                </span>
                              )}
                            </>
                          ) : (
                            <span className="text-gray-400 text-sm">Pendente</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-beige-200">
                  <p className="text-sm text-gray-600 mb-2">Link RSVP:</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={`${window.location.origin}/rsvp/${family.token_unico}`}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded text-sm font-mono"
                    />
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/rsvp/${family.token_unico}`
                        )
                        alert('Link copiado!')
                      }}
                      className="px-4 py-2 bg-gold-600 text-white rounded hover:bg-gold-700 text-sm"
                    >
                      Copiar
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
