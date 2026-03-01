import RSVPForm from '@/components/RSVPForm'
import { createClient } from '@/lib/supabase'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    token: string
  }
}

export default async function RSVPPage({ params }: PageProps) {
  const { token } = params
  const supabase = createClient()

  // Buscar família pelo token
  const { data: family, error: familyError } = await supabase
    .from('familias')
    .select('*')
    .eq('token_unico', token)
    .single()

  if (familyError || !family) {
    notFound()
  }

  // Buscar convidados da família
  const { data: guests, error: guestsError } = await supabase
    .from('convidados')
    .select('*')
    .eq('familia_id', family.id)
    .order('nome')

  if (guestsError || !guests) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-beige-100 to-beige-200">
      {/* Header */}
      <header className="bg-beige-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="font-lavonia text-4xl md:text-5xl text-center text-gray-900">
            Nina <span className="text-gold-500">&</span> Thiago
          </h1>
          <p className="text-center text-gray-600 text-sm mt-2">07 de Março de 2026</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12 px-4">
        <RSVPForm
          familyName={family.nome_familia}
          guests={guests}
          token={token}
        />
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-gray-600 text-sm">
        <p>Nos vemos na Chácara Amata! 💍</p>
      </footer>
    </div>
  )
}
