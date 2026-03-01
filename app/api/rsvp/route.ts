import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

type ConvidadoUpdate = Database['public']['Tables']['convidados']['Update']

export async function POST(request: Request) {
  try {
    const { token, guests } = await request.json()

    if (!token || !guests || !Array.isArray(guests)) {
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Verificar se o token existe
    const { data: family, error: familyError } = await supabase
      .from('familias')
      .select('id')
      .eq('token_unico', token)
      .single()

    if (familyError || !family) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 404 }
      )
    }

    // Atualizar cada convidado
    for (const guest of guests) {
      const updateData: ConvidadoUpdate = {
        confirmado: guest.confirmado
      }

      // Se estiver confirmando, adicionar data
      if (guest.confirmado) {
        updateData.data_confirmacao = new Date().toISOString()
      } else {
        updateData.data_confirmacao = null
      }

      const { error: updateError } = await supabase
        .from('convidados')
        .update(updateData as any)
        .eq('id', guest.id)
        .eq('familia_id', family.id)

      if (updateError) {
        console.error('Erro ao atualizar convidado:', updateError)
        throw updateError
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no RSVP:', error)
    return NextResponse.json(
      { error: 'Erro ao processar confirmação' },
      { status: 500 }
    )
  }
}
