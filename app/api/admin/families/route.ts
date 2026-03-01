import { Database } from '@/lib/database.types'
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

type Familia = Database['public']['Tables']['familias']['Row']
type FamiliaInsert = Database['public']['Tables']['familias']['Insert']
type Convidado = Database['public']['Tables']['convidados']['Row']
type ConvidadoInsert = Database['public']['Tables']['convidados']['Insert']

export async function GET() {
  try {
    const supabase = createClient()

    // Buscar todas as famílias
    const { data: families, error: familiesError } = await supabase
      .from('familias')
      .select('*')
      .order('nome_familia')

    if (familiesError) throw familiesError

    // Para cada família, buscar os convidados
    const familiesWithGuests = await Promise.all(
      ((families || []) as Familia[]).map(async (family) => {
        const { data: guests, error: guestsError } = await supabase
          .from('convidados')
          .select('*')
          .eq('familia_id', family.id)
          .order('nome')

        if (guestsError) throw guestsError

        return {
          ...family,
          guests: guests || []
        }
      })
    )

    return NextResponse.json(familiesWithGuests)
  } catch (error) {
    console.error('Erro ao buscar famílias:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar famílias' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const { nome_familia, telefone, guests } = await request.json()

    if (!nome_familia || !guests || guests.length === 0) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Criar família
    const familiaData: FamiliaInsert = {
      nome_familia,
      telefone: telefone || null,
    }

    const { data: family, error: familyError } = await supabase
      .from('familias')
      .insert(familiaData)
      .select()
      .single()

    if (familyError) throw familyError

    // Criar convidados
    const guestsData: ConvidadoInsert[] = guests
      .filter((name: string) => name.trim())
      .map((name: string) => ({
        familia_id: family.id,
        nome: name.trim(),
        confirmado: false
      }))

    const { error: guestsError } = await supabase
      .from('convidados')
      .insert(guestsData)

    if (guestsError) throw guestsError

    return NextResponse.json({ success: true, family })
  } catch (error) {
    console.error('Erro ao criar família:', error)
    return NextResponse.json(
      { error: 'Erro ao criar família' },
      { status: 500 }
    )
  }
}
