# ✅ Checklist - Setup Completo

Use este checklist para garantir que tudo está configurado corretamente.

---

## 📋 Antes de Começar

- [ ] Node.js 18+ instalado
- [ ] Git instalado
- [ ] Conta Supabase criada
- [ ] Conta Vercel criada (para deploy)

---

## 🗄️ Configuração do Supabase

- [ ] Projeto criado no Supabase
- [ ] Script SQL (`supabase-setup.sql`) executado
- [ ] Tabelas criadas verificadas:
  - [ ] `familias`
  - [ ] `convidados`
- [ ] RLS (Row Level Security) habilitado
- [ ] Credenciais copiadas:
  - [ ] Project URL
  - [ ] anon/public key

---

## 💻 Configuração Local

- [ ] Dependências instaladas (`npm install`)
- [ ] Arquivo `.env.local` criado
- [ ] Variáveis de ambiente configuradas:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `ADMIN_PASSWORD`
- [ ] Projeto rodando localmente (`npm run dev`)
- [ ] Landing page acessível em http://localhost:3000
- [ ] Página admin acessível em http://localhost:3000/admin

---

## 🎨 Personalização

- [ ] Informações do casamento atualizadas:
  - [ ] Nomes do casal
  - [ ] Data do evento
  - [ ] Local
  - [ ] Endereço
- [ ] Cores personalizadas (opcional)
- [ ] Fotos substituídas (opcional)
- [ ] Fontes alteradas (opcional)
- [ ] Senha de admin forte definida

---

## 👥 Cadastro de Convidados

- [ ] Lista de convidados preparada
- [ ] Convidados cadastrados via:
  - [ ] Formulário manual no /admin
  - [ ] Importação CSV
- [ ] Links RSVP gerados
- [ ] Links testados (abrir pelo menos 1 para validar)

---

## 🚀 Deploy no Vercel

- [ ] Código commitado no Git (opcional)
- [ ] Deploy realizado no Vercel
- [ ] Variáveis de ambiente configuradas no Vercel:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `ADMIN_PASSWORD`
- [ ] Site acessível via URL do Vercel
- [ ] Domínio customizado configurado (opcional)

---

## ✅ Testes Finais

- [ ] Landing page carrega corretamente
- [ ] Página /admin funciona com autenticação
- [ ] Dashboard mostra estatísticas corretas
- [ ] Cadastro manual de família funciona
- [ ] Importação CSV funciona
- [ ] Exportação CSV funciona
- [ ] Link RSVP de teste funciona
- [ ] Confirmação de presença é salva no banco
- [ ] Estatísticas atualizam após confirmação
- [ ] Site responsivo no mobile
- [ ] Todas as imagens carregam

---

## 📱 Envio de Convites

- [ ] Templates de mensagem personalizados
- [ ] Links RSVP copiados para cada família
- [ ] Mensagens enviadas via:
  - [ ] WhatsApp
  - [ ] SMS
  - [ ] Email
- [ ] Planilha de controle criada (opcional)

---

## 🔒 Segurança

- [ ] Senha de admin forte e única
- [ ] Variáveis de ambiente não expostas
- [ ] .env.local no .gitignore
- [ ] RLS ativo no Supabase
- [ ] HTTPS ativo (automático no Vercel)

---

## 📊 Monitoramento

- [ ] Acesso ao /admin funcionando
- [ ] Estatísticas sendo atualizadas
- [ ] Backup inicial exportado (CSV)
- [ ] Sistema de lembretes planejado

---

## 🎉 Pré-Evento

**2 Semanas Antes:**
- [ ] Verificar total de confirmados
- [ ] Enviar lembrete para não confirmados
- [ ] Exportar lista atualizada

**1 Semana Antes:**
- [ ] Último lembrete enviado
- [ ] Lista final exportada
- [ ] Números confirmados para fornecedores

**1 Dia Antes:**
- [ ] Backup final dos dados
- [ ] Lista impressa (opcional)
- [ ] Screenshots das estatísticas

---

## 📝 Documentação de Referência

Arquivos importantes criados:
- [ ] `README.md` - Documentação completa
- [ ] `QUICKSTART.md` - Guia rápido
- [ ] `FAQ.md` - Perguntas frequentes
- [ ] `TEMPLATES-MENSAGENS.md` - Templates de WhatsApp
- [ ] `exemplo-convidados.csv` - Exemplo de importação
- [ ] `supabase-setup.sql` - Script do banco de dados

---

## 🆘 Resolução de Problemas

Caso algo não funcione:
- [ ] Verifique o FAQ.md
- [ ] Consulte o README.md
- [ ] Verifique o console do navegador (F12)
- [ ] Verifique logs do Vercel
- [ ] Verifique logs do Supabase

---

## 💡 Dicas Finais

✅ **Faça backups regulares** dos dados  
✅ **Teste tudo** antes de enviar os convites  
✅ **Configure alertas** para novas confirmações (opcional)  
✅ **Mantenha contato** com convidados que não confirmaram  
✅ **Celebre!** O sistema foi feito para facilitar sua vida 🎉

---

## 📞 Checklist de Emergência

Se algo não funcionar no dia do evento:
- [ ] Tenho backup CSV dos convidados
- [ ] Tenho lista impressa
- [ ] Sei acessar o Supabase diretamente
- [ ] Tenho contato de suporte técnico (amigo/familiar)

---

**Última revisão:** ___/___/______  
**Responsável:** _________________  
**Status:** 🟢 Tudo OK | 🟡 Pendências | 🔴 Problemas

---

## 🎊 Quando Tudo Estiver ✅

**PARABÉNS!** 🎉

Seu sistema RSVP está pronto! Agora é só:
1. Enviar os convites
2. Acompanhar as confirmações
3. Aproveitar o processo de organização
4. **CASAR!** 💍

---

**Nina & Thiago - 07/03/2026** 💖
