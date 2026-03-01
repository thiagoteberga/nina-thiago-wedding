# 💍 Sistema RSVP - Casamento Nina & Thiago

Sistema completo de confirmação de presença (RSVP) para casamento, desenvolvido com Next.js 14, TypeScript, TailwindCSS e Supabase.

## 📋 Índice

- [Características](#características)
- [Tecnologias](#tecnologias)
- [Pré-requisitos](#pré-requisitos)
- [Configuração do Supabase](#configuração-do-supabase)
- [Instalação Local](#instalação-local)
- [Deploy no Vercel](#deploy-no-vercel)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Como Usar](#como-usar)

---

## ✨ Características

- ✅ Landing page elegante e responsiva
- ✅ Sistema de confirmação por link único (token)
- ✅ Painel administrativo protegido por senha
- ✅ Cadastro manual de famílias e convidados
- ✅ Importação/exportação de dados via CSV
- ✅ Estatísticas em tempo real
- ✅ 100% gratuito (usando planos free do Supabase e Vercel)

---

## 🛠 Tecnologias

- **Frontend**: Next.js 14+ (App Router)
- **Linguagem**: TypeScript
- **Estilização**: TailwindCSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Deploy**: Vercel

---

## 📦 Pré-requisitos

Antes de começar, você precisa ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Git](https://git-scm.com/)
- Uma conta no [Supabase](https://supabase.com) (gratuita)
- Uma conta no [Vercel](https://vercel.com) (gratuita)

---

## 🗄️ Configuração do Supabase

### Passo 1: Criar Projeto

1. Acesse [https://supabase.com](https://supabase.com)
2. Faça login ou crie uma conta
3. Clique em **"New Project"**
4. Preencha os dados:
   - **Name**: casamento-nina-thiago
   - **Database Password**: Escolha uma senha forte
   - **Region**: Escolha a região mais próxima
5. Clique em **"Create new project"**
6. Aguarde alguns minutos até o projeto ser criado

### Passo 2: Executar SQL

1. No painel lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**
3. Abra o arquivo `supabase-setup.sql` deste projeto
4. Copie todo o conteúdo
5. Cole no editor SQL do Supabase
6. Clique em **"Run"** (ou pressione Ctrl+Enter)
7. Verifique se apareceu "Success. No rows returned"

### Passo 3: Verificar Tabelas

1. No painel lateral, clique em **"Table Editor"**
2. Você deve ver duas tabelas criadas:
   - `familias`
   - `convidados`

### Passo 4: Obter Credenciais

1. No painel lateral, clique em **"Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Copie os seguintes valores:
   - **Project URL**: Algo como `https://xxxxx.supabase.co`
   - **anon/public key**: Uma chave longa começando com `eyJ...`

⚠️ **IMPORTANTE**: Guarde essas informações, você precisará delas!

---

## 💻 Instalação Local

### 1. Clone o Projeto

```bash
cd c:\Projetos\Casamento
```

### 2. Instale as Dependências

```bash
npm install
```

### 3. Configure as Variáveis de Ambiente

1. Copie o arquivo de exemplo:
```bash
copy .env.example .env.local
```

2. Abra o arquivo `.env.local` e preencha:

```env
# Cole a URL do seu projeto Supabase
NEXT_PUBLIC_SUPABASE_URL=https://seu-projeto.supabase.co

# Cole a chave pública do Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-aqui

# Defina uma senha para acessar /admin
ADMIN_PASSWORD=SuaSenhaSegura123
```

### 4. Execute o Projeto

```bash
npm run dev
```

O site estará disponível em: [http://localhost:3000](http://localhost:3000)

---

## 🚀 Deploy no Vercel

### Opção 1: Deploy via GitHub (Recomendado)

1. **Criar repositório no GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/casamento-nina-thiago.git
   git push -u origin main
   ```

2. **Deploy no Vercel**:
   - Acesse [https://vercel.com](https://vercel.com)
   - Clique em **"Add New Project"**
   - Importe seu repositório do GitHub
   - Configure as variáveis de ambiente:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `ADMIN_PASSWORD`
   - Clique em **"Deploy"**

### Opção 2: Deploy via CLI do Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Configurar variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add ADMIN_PASSWORD

# Deploy em produção
vercel --prod
```

---

## 📁 Estrutura do Projeto

```
c:\Projetos\Casamento\
├── app/
│   ├── admin/
│   │   └── page.tsx              # Página administrativa
│   ├── api/
│   │   ├── admin/
│   │   │   ├── auth/route.ts     # API de autenticação admin
│   │   │   ├── families/route.ts # API de famílias
│   │   │   └── import/route.ts   # API de importação CSV
│   │   └── rsvp/route.ts         # API de confirmação
│   ├── rsvp/
│   │   └── [token]/
│   │       ├── page.tsx          # Página de confirmação
│   │       └── not-found.tsx     # Página 404 do RSVP
│   ├── globals.css               # Estilos globais
│   ├── layout.tsx                # Layout raiz
│   ├── not-found.tsx             # Página 404 geral
│   └── page.tsx                  # Landing page
├── components/
│   ├── AdminDashboard.tsx        # Dashboard administrativo
│   ├── Hero.tsx                  # Seção hero da landing page
│   └── RSVPForm.tsx              # Formulário de confirmação
├── lib/
│   ├── database.types.ts         # Tipos do banco de dados
│   └── supabase.ts               # Cliente Supabase
├── .env.example                  # Exemplo de variáveis de ambiente
├── .env.local                    # Variáveis de ambiente (não commitar)
├── .gitignore                    # Arquivos ignorados pelo git
├── next.config.js                # Configuração do Next.js
├── package.json                  # Dependências do projeto
├── postcss.config.js             # Configuração do PostCSS
├── README.md                     # Este arquivo
├── supabase-setup.sql            # Script SQL para setup
├── tailwind.config.js            # Configuração do TailwindCSS
└── tsconfig.json                 # Configuração do TypeScript
```

---

## 🎯 Funcionalidades

### 1. Landing Page (`/`)

- Hero com informações do casamento
- Galeria de fotos
- Detalhes do evento (data, local, horário)
- Call-to-action para confirmação

### 2. Página de RSVP (`/rsvp/[token]`)

- Confirmação por família via link único
- Lista de convidados da família
- Checkboxes para marcar quem vai comparecer
- Mensagem de sucesso após confirmação

### 3. Painel Admin (`/admin`)

- **Autenticação**: Login com senha
- **Estatísticas**: Total de famílias, confirmados e pendentes
- **Listagem**: Todas as famílias com status de confirmação
- **Cadastro Manual**: Adicionar famílias e convidados
- **Importação CSV**: Importar lista de convidados em massa
- **Exportação CSV**: Baixar lista completa com status
- **Links RSVP**: Copiar link único de cada família

---

## 📖 Como Usar

### Adicionar Convidados Manualmente

1. Acesse `/admin`
2. Faça login com a senha configurada
3. Clique em **"+ Adicionar Família"**
4. Preencha:
   - Nome da família
   - Telefone (opcional)
   - Nome de cada convidado
5. Clique em **"Salvar Família"**
6. Copie o link RSVP gerado
7. Envie o link para a família via WhatsApp/SMS

### Importar Lista via CSV

**Formato do CSV:**
```csv
Família Silva,11999999999,João Silva,Maria Silva,Pedro Silva
Família Santos,11988888888,Ana Santos,Carlos Santos
```

**Instruções:**
1. Acesse `/admin`
2. Clique em **"📥 Importar CSV"**
3. Cole os dados no formato acima
4. Clique em **"Importar"**

### Exportar Lista

1. Acesse `/admin`
2. Clique em **"📤 Exportar CSV"**
3. O arquivo será baixado automaticamente

### Enviar Links de Confirmação

**Exemplo de mensagem para WhatsApp:**

```
Olá, Família Silva! 💍

É com grande alegria que convidamos vocês para o casamento de Nina e Thiago!

📅 Data: 07 de Março de 2026
📍 Local: Chácara Amata - Pindamonhangaba/SP

Por favor, confirme sua presença através deste link:
https://seu-site.vercel.app/rsvp/[token-da-familia]

Aguardamos vocês! ❤️
```

---

## 🎨 Personalização

### Alterar Cores

Edite o arquivo `tailwind.config.js`:

```js
colors: {
  beige: {
    // Suas cores aqui
  },
  gold: {
    // Suas cores aqui
  },
}
```

### Alterar Informações do Casamento

Edite o arquivo `app/page.tsx` e `components/Hero.tsx`:

- Nomes do casal
- Data do evento
- Local
- Endereço

### Alterar Fotos

Substitua as URLs do Unsplash nos componentes por suas próprias fotos:

```tsx
// De:
src="https://images.unsplash.com/photo-..."

// Para:
src="/images/sua-foto.jpg"
```

Coloque suas fotos em `public/images/`

---

## 🔒 Segurança

- ✅ Autenticação na área administrativa
- ✅ Row Level Security (RLS) no Supabase
- ✅ Tokens únicos por família
- ✅ Variáveis de ambiente protegidas
- ⚠️ **IMPORTANTE**: Altere a senha de admin antes do deploy!

---

## 📊 Relatórios e Estatísticas

A página administrativa mostra:

- Total de famílias cadastradas
- Total de convidados
- Quantidade de confirmados
- Quantidade de pendentes
- Status individual de cada família
- Data de confirmação

---

## 🆘 Solução de Problemas

### Erro: "Variáveis de ambiente não configuradas"

**Solução**: Verifique se o arquivo `.env.local` existe e contém as variáveis corretas.

### Erro: "Cannot read property of undefined"

**Solução**: Execute o script SQL no Supabase novamente e verifique se as tabelas foram criadas.

### Erro: "Failed to fetch"

**Solução**: Verifique se o Supabase está online e se as credenciais estão corretas.

### Deploy no Vercel não funciona

**Solução**: 
1. Verifique se as variáveis de ambiente foram adicionadas no Vercel
2. Faça um novo deploy: `vercel --prod`
3. Verifique os logs de erro no dashboard do Vercel

---

## 📝 Licença

Este projeto é de uso livre para fins pessoais.

---

## 💖 Agradecimentos

Feito com ❤️ para o casamento de **Nina & Thiago** 💍

**Data**: 07 de Março de 2026  
**Local**: Chácara Amata - Pindamonhangaba/SP

---

## 📞 Contato e Suporte

Se precisar de ajuda adicional:

1. Verifique a [documentação do Next.js](https://nextjs.org/docs)
2. Consulte a [documentação do Supabase](https://supabase.com/docs)
3. Revise os logs de erro no console do navegador

---

## 🎉 Bom Casamento!

Que este sistema facilite a organização do seu grande dia! 💑
