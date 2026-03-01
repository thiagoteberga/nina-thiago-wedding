import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type Familia = Database['public']['Tables']['familias']['Row']
type FamiliaInsert = Database['public']['Tables']['familias']['Insert']
type ConvidadoInsert = Database['public']['Tables']['convidados']['Insert']

export async function POST(request: Request) {
  try {
    const { csvData } = await request.json()

    if (!csvData) {
      return NextResponse.json(
        { error: 'Dados CSV não fornecidos' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    const lines = csvData.split('\n').filter((line: string) => line.trim())

    for (const line of lines) {
      const parts = line.split(',').map((s: string) => s.trim())
      
      if (parts.length < 2) continue

      const [nome_familia, telefone, ...guestNames] = parts
      
      if (!nome_familia || guestNames.length === 0) continue

      // Criar família
      const familiaData: FamiliaInsert = {
        nome_familia,
        telefone: telefone || null,
      }

      const { data: family, error: familyError } = await supabase
        .from('familias')
        .insert(familiaData as any)
        .select()
        .single()

      if (familyError || !family) {
        console.error('Erro ao criar família:', familyError)
        continue
      }

      // Criar convidados
      const guestsData: ConvidadoInsert[] = guestNames
        .filter((name: string) => name.trim())
        .map((name: string) => ({
          familia_id: (family as Familia).id,
          nome: name.trim(),
          confirmado: false
        }))

      const { error: guestsError } = await supabase
        .from('convidados')
        .insert(guestsData as any)

      if (guestsError) {
        console.error('Erro ao criar convidados:', guestsError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro ao importar CSV:', error)
    return NextResponse.json(
      { error: 'Erro ao importar CSV' },
      { status: 500 }
    )
  }
}
