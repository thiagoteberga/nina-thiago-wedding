import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

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
      const { data: family, error: familyError } = await supabase
        .from('familias')
        .insert({
          nome_familia,
          telefone: telefone || null,
        })
        .select()
        .single()

      if (familyError) {
        console.error('Erro ao criar família:', familyError)
        continue
      }

      // Criar convidados
      const guestsData = guestNames
        .filter((name: string) => name.trim())
        .map((name: string) => ({
          familia_id: family.id,
          nome: name.trim(),
          confirmado: false
        }))

      const { error: guestsError } = await supabase
        .from('convidados')
        .insert(guestsData)

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
