import { sendConfirmationEmail } from '@/lib/email'
import { createClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('🎯 API /api/rsvp CHAMADA')
  console.log('Timestamp:', new Date().toISOString())
  
  try {
    const body = await request.json()
    console.log('📥 Body recebido:', JSON.stringify(body, null, 2))
    
    const { token, guests } = body

    if (!token || !guests || !Array.isArray(guests)) {
      console.error('❌ Dados inválidos recebidos')
      console.error('Token:', token)
      console.error('Guests:', guests)
      return NextResponse.json(
        { error: 'Dados inválidos' },
        { status: 400 }
      )
    }

    console.log('✅ Validação inicial OK')
    console.log('Token:', token)
    console.log('Número de convidados:', guests.length)

    const supabase = createClient()

    console.log('🔍 Buscando família pelo token...')
    
    // Verificar se o token existe e buscar nome da família
    const { data: family, error: familyError } = await supabase
      .from('familias')
      .select('id, nome_familia')
      .eq('token_unico', token)
      .single()

    if (familyError || !family) {
      console.error('❌ Família não encontrada ou erro:', familyError)
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 404 }
      )
    }

    console.log('✅ Família encontrada:', family.nome_familia)
    console.log('ID da família:', family.id)

    // Atualizar cada convidado
    console.log('📝 Atualizando convidados...')
    for (const guest of guests) {
      console.log(`Atualizando ${guest.nome || guest.id}: confirmado=${guest.confirmado}`)
      
      const { error: updateError } = await supabase
        .from('convidados')
        .update({
          confirmado: Boolean(guest.confirmado),
          data_confirmacao: guest.confirmado ? new Date().toISOString() : null
        })
        .eq('id', guest.id)
        .eq('familia_id', family.id)

      if (updateError) {
        console.error('❌ Erro ao atualizar convidado:', updateError)
        throw updateError
      }
    }

    console.log('✅ Todos os convidados atualizados com sucesso!')

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

    console.log('📤 Retornando resposta de sucesso')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('❌❌❌ ERRO CRÍTICO NO RSVP ❌❌❌')
    console.error('Tipo:', typeof error)
    console.error('Erro:', error)
    if (error instanceof Error) {
      console.error('Mensagem:', error.message)
      console.error('Stack:', error.stack)
    }
    return NextResponse.json(
      { error: 'Erro ao processar confirmação' },
      { status: 500 }
    )
  }
}
