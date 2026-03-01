import { sendConfirmationEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

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

    // Verificar se o token existe e buscar nome da família
    const { data: family, error: familyError } = await supabase
      .from('familias')
      .select('id, nome_familia')
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
      const { error: updateError } = await supabase
        .from('convidados')
        .update({
          confirmado: Boolean(guest.confirmado),
          data_confirmacao: guest.confirmado ? new Date().toISOString() : null
        })
        .eq('id', guest.id)
        .eq('familia_id', family.id)

      if (updateError) {
        console.error('Erro ao atualizar convidado:', updateError)
        throw updateError
      }
    }

    // Enviar email de notificação (não bloqueia a resposta)
    const totalConfirmed = guests.filter(g => g.confirmado).length
    console.log('🔔 Iniciando envio de email de notificação...')
    console.log('Família:', family.nome_familia)
    console.log('Total confirmados:', totalConfirmed)
    console.log('Convidados:', guests.map(g => ({ nome: g.nome, confirmado: g.confirmado })))
    
    sendConfirmationEmail({
      familyName: family.nome_familia,
      guests: guests.map(g => ({ nome: g.nome || 'Convidado', confirmado: g.confirmado })),
      totalConfirmed
    }).catch(err => {
      console.error('❌ Erro ao enviar email (não crítico):', err)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Erro no RSVP:', error)
    return NextResponse.json(
      { error: 'Erro ao processar confirmação' },
      { status: 500 }
    )
  }
}
