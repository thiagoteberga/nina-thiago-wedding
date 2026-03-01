# 🚀 Quick Start - Casamento Nina & Thiago

## ⚡ Configuração Rápida (5 minutos)

### 1️⃣ Configure o Supabase
```
1. Acesse: https://supabase.com
2. Crie um novo projeto
3. Vá em "SQL Editor"
4. Execute o arquivo: supabase-setup.sql
5. Copie as credenciais em Settings > API
```

### 2️⃣ Configure o Projeto
```bash
# Instalar dependências
npm install

# Copiar variáveis de ambiente
copy .env.example .env.local

# Editar .env.local com suas credenciais do Supabase
```

### 3️⃣ Execute Local
```bash
npm run dev
```

Acesse: http://localhost:3000

---

## 🎯 Primeiros Passos

### Adicionar Convidados
1. Acesse: http://localhost:3000/admin
2. Senha: (definida no .env.local)
3. Clique em "+ Adicionar Família"
4. Preencha os dados
5. Copie o link RSVP

### Ou Importar CSV
1. Use o arquivo: exemplo-convidados.csv
2. Clique em "📥 Importar CSV"
3. Cole os dados
4. Clique em "Importar"

---

## 🚀 Deploy no Vercel

```bash
# Instalar CLI
npm i -g vercel

# Deploy
vercel

# Adicionar variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add ADMIN_PASSWORD

# Deploy em produção
vercel --prod
```

---

## 📱 Enviar Convites

Após gerar os links no /admin, envie via WhatsApp:

```
Olá! 💍

Você está convidado para o casamento de Nina e Thiago!

📅 07/03/2026
📍 Chácara Amata - Pindamonhangaba/SP

Confirme sua presença:
[LINK DO RSVP]

Aguardamos você! ❤️
```

---

## 📊 Acompanhar Confirmações

Acesse `/admin` para ver:
- Total de convidados
- Quantos confirmaram
- Status por família
- Exportar lista completa (CSV)

---

## 🎨 Personalizar

### Cores
Edite: `tailwind.config.js`

### Textos
Edite: `app/page.tsx` e `components/Hero.tsx`

### Fotos
Substitua as URLs do Unsplash por suas fotos

---

## ❓ Problemas Comuns

**Erro ao conectar Supabase?**
- Verifique as credenciais em .env.local
- Rode o SQL novamente no Supabase

**Página admin não funciona?**
- Verifique a senha em .env.local
- Limpe o cache do navegador

**Deploy no Vercel dá erro?**
- Adicione as variáveis de ambiente no painel
- Verifique os logs de build

---

## ✅ Checklist Final

Antes do casamento, verifique:

- [ ] Todos os convidados cadastrados
- [ ] Links enviados por WhatsApp
- [ ] Senha de admin alterada
- [ ] Deploy feito no Vercel
- [ ] Teste o fluxo completo de confirmação
- [ ] Exporte backup dos dados (CSV)

---

**Feito com 💛 para Nina & Thiago**

07 de Março de 2026 | Chácara Amata
