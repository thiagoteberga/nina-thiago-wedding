# Configuração de Notificações por Email

Este sistema envia emails automáticos quando alguém confirmar presença no casamento.

## 📧 Como Funciona

Quando um convidado confirma presença, você receberá um email com:
- Nome da família
- Lista de quem confirmou presença
- Lista de quem não confirmou
- Data e hora da confirmação

## 🔧 Configuração

### 1. Obter API Key do Resend

1. Acesse: https://resend.com/api-keys
2. Faça login na sua conta
3. Clique em **"Create API Key"**
4. Dê um nome (ex: "Casamento Nina Thiago")
5. Copie a chave que começa com `re_...`

### 2. Configurar Variáveis de Ambiente

Abra o arquivo `.env.local` e adicione:

```env
# API Key do Resend (obtenha em: https://resend.com/api-keys)
RESEND_API_KEY=re_SuaAPIKeyAqui

# Email que receberá as notificações
# ⚠️ IMPORTANTE: No plano gratuito/teste, use o MESMO email cadastrado na conta do Resend
NOTIFICATION_EMAIL=seuemail@example.com
```

**Substitua:**
- `re_SuaAPIKeyAqui` pela sua API Key do Resend
- `seuemail@example.com` pelo **email cadastrado na sua conta do Resend**

**⚠️ Limitação do Plano Gratuito:**
No modo teste do Resend, você só pode enviar emails para o próprio email cadastrado na conta. Para enviar para outros endereços, é necessário verificar um domínio personalizado em https://resend.com/domains

### 3. Configurar no Vercel (Produção)

Para funcionar no site publicado:

1. Acesse: https://vercel.com/seu-projeto/settings/environment-variables
2. Adicione as variáveis:
   - `RESEND_API_KEY` = sua chave do Resend
   - `NOTIFICATION_EMAIL` = seu email
3. Clique em **"Save"**
4. Faça um novo deploy (ou aguarde o próximo push)

## 📨 Exemplo de Email

```
💍 Nova Confirmação de Presença
Casamento Nina & Thiago

Família Silva

📊 Resumo:
Total de convidados: 4
Confirmados: 3
Não confirmados: 1

✅ Confirmados (3)
✓ João Silva
✓ Maria Silva
✓ Pedro Silva

❌ Não Confirmados (1)
✗ Ana Silva

Data da confirmação: 01/03/2026 às 14:30
```

## 🎯 Plano Gratuito do Resend

- ✅ **3.000 emails grátis por mês**
- ✅ **100 emails por dia**
- ✅ Sem cartão de crédito necessário

Isso é mais que suficiente para um casamento!

## ⚠️ Importante

- O email será enviado do endereço: `onboarding@resend.dev`
- Para usar seu próprio domínio (ex: `contato@seusite.com`), você precisa verificar o domínio no Resend
- Se não configurar as variáveis, o sistema funcionará normalmente mas não enviará emails

## 🔍 Verificar se está Funcionando

1. Após configurar, reinicie o servidor local (se estiver testando)
2. Faça uma confirmação de teste
3. Verifique sua caixa de entrada (e spam!)
4. Verifique os logs do console para mensagens de erro

## 🐛 Problemas Comuns

**Email não chega:**
- Verifique se as variáveis estão corretas no `.env.local`
- Verifique a pasta de spam
- **⚠️ IMPORTANTE:** No plano gratuito, o email NOTIFICATION_EMAIL deve ser o mesmo cadastrado na conta do Resend
- Verifique se esgotou o limite de emails grátis (improvável)
- Veja os logs do console no Vercel

**Erro: "You can only send testing emails to your own email":**
- No plano gratuito do Resend, você só pode enviar para o email da conta
- Solução: Use o mesmo email cadastrado no Resend como NOTIFICATION_EMAIL
- OU verifique um domínio personalizado em https://resend.com/domains

**Erro de API Key:**
- Certifique-se que copiou a chave completamente
- A chave deve começar com `re_`
- Não pode ter espaços antes ou depois
- Veja os logs do console no Vercel

**Erro de API Key:**
- Certifique-se que copiou a chave completamente
- A chave deve começar com `re_`
- Não pode ter espaços antes ou depois

**Funciona local mas não no Vercel:**
- Certifique-se que adicionou as variáveis de ambiente no Vercel
- Faça um novo deploy após adicionar as variáveis
