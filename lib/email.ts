import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

interface SendConfirmationEmailProps {
  familyName: string
  guests: Array<{
    nome: string
    confirmado: boolean
  }>
  totalConfirmed: number
}

export async function sendConfirmationEmail({
  familyName,
  guests,
  totalConfirmed
}: SendConfirmationEmailProps) {
  const recipientEmail = process.env.NOTIFICATION_EMAIL

  if (!recipientEmail || !process.env.RESEND_API_KEY) {
    console.warn('Email de notificação não configurado')
    return
  }

  const confirmedGuests = guests.filter(g => g.confirmado)
  const notConfirmedGuests = guests.filter(g => !g.confirmado)

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #e91e63 0%, #f44336 100%);
            color: white;
            padding: 30px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .content {
            background: #fff;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 10px 10px;
          }
          .family-name {
            font-size: 24px;
            font-weight: bold;
            color: #e91e63;
            margin-bottom: 20px;
          }
          .summary {
            background: #fff5f7;
            padding: 15px;
            border-left: 4px solid #e91e63;
            margin: 20px 0;
          }
          .guest-list {
            margin: 15px 0;
          }
          .guest-item {
            padding: 8px 12px;
            margin: 5px 0;
            border-radius: 5px;
          }
          .confirmed {
            background: #d4edda;
            color: #155724;
          }
          .not-confirmed {
            background: #f8d7da;
            color: #721c24;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>💍 Nova Confirmação de Presença</h1>
          <p>Casamento Nina & Thiago</p>
        </div>
        <div class="content">
          <div class="family-name">Família ${familyName}</div>
          
          <div class="summary">
            <strong>📊 Resumo:</strong><br>
            Total de convidados: ${guests.length}<br>
            Confirmados: ${totalConfirmed}<br>
            Não confirmados: ${guests.length - totalConfirmed}
          </div>

          ${confirmedGuests.length > 0 ? `
            <h3 style="color: #155724;">✅ Confirmados (${confirmedGuests.length})</h3>
            <div class="guest-list">
              ${confirmedGuests.map(g => `
                <div class="guest-item confirmed">✓ ${g.nome}</div>
              `).join('')}
            </div>
          ` : ''}

          ${notConfirmedGuests.length > 0 ? `
            <h3 style="color: #721c24;">❌ Não Confirmados (${notConfirmedGuests.length})</h3>
            <div class="guest-list">
              ${notConfirmedGuests.map(g => `
                <div class="guest-item not-confirmed">✗ ${g.nome}</div>
              `).join('')}
            </div>
          ` : ''}

          <div style="margin-top: 30px; text-align: center;">
            <p style="color: #666;">
              Data da confirmação: ${new Date().toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
        </div>
        <div class="footer">
          Sistema de Confirmação de Presença - Nina & Thiago<br>
          07 de Março de 2026 às 11h - Chácara Amata
        </div>
      </body>
    </html>
  `

  try {
    await resend.emails.send({
      from: 'Casamento Nina & Thiago <onboarding@resend.dev>',
      to: recipientEmail,
      subject: `✅ Confirmação: Família ${familyName}`,
      html: emailHtml,
    })

    console.log(`Email enviado para ${recipientEmail} - Família ${familyName}`)
  } catch (error) {
    console.error('Erro ao enviar email:', error)
  }
}
