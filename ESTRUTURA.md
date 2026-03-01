# 📐 Estrutura do Projeto

Visão técnica completa da arquitetura e organização dos arquivos.

---

## 🗂️ Árvore de Diretórios

```
c:\Projetos\Casamento\
│
├── 📁 app/                          # Next.js App Router
│   ├── 📁 admin/                    # Rota /admin
│   │   └── page.tsx                 # Página administrativa
│   │
│   ├── 📁 api/                      # API Routes (Server-side)
│   │   ├── 📁 admin/
│   │   │   ├── 📁 auth/
│   │   │   │   └── route.ts         # POST - Autenticação admin
│   │   │   ├── 📁 families/
│   │   │   │   └── route.ts         # GET/POST - CRUD famílias
│   │   │   └── 📁 import/
│   │   │       └── route.ts         # POST - Importar CSV
│   │   └── 📁 rsvp/
│   │       └── route.ts             # POST - Confirmar presença
│   │
│   ├── 📁 rsvp/
│   │   └── 📁 [token]/              # Rota dinâmica com token
│   │       ├── page.tsx             # Página de confirmação
│   │       └── not-found.tsx        # 404 específico
│   │
│   ├── globals.css                  # Estilos globais + Tailwind
│   ├── layout.tsx                   # Layout raiz da aplicação
│   ├── not-found.tsx                # 404 geral
│   └── page.tsx                     # Landing page (Home)
│
├── 📁 components/                   # Componentes React reutilizáveis
│   ├── AdminDashboard.tsx           # Dashboard completo do admin
│   ├── Hero.tsx                     # Hero section da landing page
│   └── RSVPForm.tsx                 # Formulário de confirmação
│
├── 📁 lib/                          # Utilitários e configurações
│   ├── database.types.ts            # Tipos TypeScript do Supabase
│   └── supabase.ts                  # Cliente Supabase
│
├── 📁 .vscode/                      # Configurações do VS Code
│   └── settings.json                # Settings do editor
│
├── 📄 .env                          # Variáveis de ambiente (local)
├── 📄 .env.example                  # Exemplo de variáveis
├── 📄 .gitignore                    # Arquivos ignorados pelo Git
├── 📄 CHECKLIST.md                  # Checklist de configuração
├── 📄 exemplo-convidados.csv        # Exemplo de importação CSV
├── 📄 FAQ.md                        # Perguntas frequentes
├── 📄 next.config.js                # Configuração Next.js
├── 📄 package.json                  # Dependências NPM
├── 📄 postcss.config.js             # Configuração PostCSS
├── 📄 QUICKSTART.md                 # Guia rápido de início
├── 📄 README.md                     # Documentação principal
├── 📄 supabase-setup.sql            # Script SQL do banco
├── 📄 tailwind.config.js            # Configuração Tailwind
├── 📄 TEMPLATES-MENSAGENS.md        # Templates WhatsApp
├── 📄 TESTE-SISTEMA.md              # Guia de testes
└── 📄 tsconfig.json                 # Configuração TypeScript
```

---

## 🎯 Fluxo de Dados

### 1. Landing Page (`/`)
```
page.tsx
  └── Hero.tsx              # Hero section
  └── Image Gallery         # Galeria de fotos
  └── Event Details         # Detalhes do evento
  └── RSVP Section          # Call-to-action
```

### 2. Página RSVP (`/rsvp/[token]`)
```
page.tsx (Server Component)
  ├── Busca família no Supabase
  ├── Busca convidados
  └── RSVPForm.tsx (Client Component)
      └── POST /api/rsvp    # Salvar confirmação
```

### 3. Página Admin (`/admin`)
```
page.tsx (Client Component)
  ├── Auth via POST /api/admin/auth
  └── AdminDashboard.tsx
      ├── GET /api/admin/families     # Listar famílias
      ├── POST /api/admin/families    # Criar família
      └── POST /api/admin/import      # Importar CSV
```

---

## 🔄 Arquitetura da API

### Autenticação Admin
```
POST /api/admin/auth
Body: { password: string }
Response: { success: boolean }
```

### Listar Famílias
```
GET /api/admin/families
Response: Array<Family & { guests: Guest[] }>
```

### Criar Família
```
POST /api/admin/families
Body: {
  nome_familia: string
  telefone?: string
  guests: string[]
}
Response: { success: boolean, family: Family }
```

### Importar CSV
```
POST /api/admin/import
Body: { csvData: string }
Response: { success: boolean }
```

### Confirmar RSVP
```
POST /api/rsvp
Body: {
  token: string
  guests: Array<{ id: string, confirmado: boolean }>
}
Response: { success: boolean }
```

---

## 🗄️ Estrutura do Banco (Supabase)

### Tabela: `familias`
```sql
id              UUID PRIMARY KEY
nome_familia    VARCHAR(255) NOT NULL
token_unico     UUID UNIQUE NOT NULL
telefone        VARCHAR(20)
created_at      TIMESTAMP
```

### Tabela: `convidados`
```sql
id                  UUID PRIMARY KEY
familia_id          UUID FOREIGN KEY → familias(id)
nome                VARCHAR(255) NOT NULL
confirmado          BOOLEAN DEFAULT FALSE
data_confirmacao    TIMESTAMP
created_at          TIMESTAMP
```

### Relação
```
familias (1) ──────── (N) convidados
          ↑                    ↓
     token_unico          familia_id
```

---

## 🎨 Sistema de Estilos

### Tailwind Config
```js
cores personalizadas:
  - beige.* (50-900)
  - gold.* (50-900)

fontes:
  - serif (Georgia, Cambria)
  - sans (System fonts)
```

### Classes Customizadas (globals.css)
```css
.btn-primary     # Botão dourado principal
.btn-secondary   # Botão secundário bege
.card           # Card com sombra
.heading-1      # Título serif grande
.heading-2      # Título serif médio
.heading-3      # Título serif pequeno
```

---

## 📦 Dependências Principais

### Produção
```json
{
  "@supabase/supabase-js": "^2.39.7",  // Cliente Supabase
  "next": "^14.1.0",                    // Framework
  "react": "^18.2.0",                   // UI Library
  "react-dom": "^18.2.0"                // DOM renderer
}
```

### Desenvolvimento
```json
{
  "typescript": "^5.3.3",               // Tipagem
  "tailwindcss": "^3.4.1",              // CSS
  "@types/react": "^18.2.52",           // Tipos React
  "@types/node": "^20.11.16"            // Tipos Node
}
```

---

## 🔐 Variáveis de Ambiente

### Necessárias (`.env.local`)
```env
NEXT_PUBLIC_SUPABASE_URL          # URL do projeto Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Chave pública Supabase
ADMIN_PASSWORD                     # Senha do painel admin
```

### Observações
- `NEXT_PUBLIC_*` são expostas ao cliente
- `ADMIN_PASSWORD` é server-side only
- Nunca commitar `.env.local`

---

## 🚀 Scripts NPM

```bash
npm run dev      # Desenvolvimento (http://localhost:3000)
npm run build    # Build de produção
npm run start    # Server de produção
npm run lint     # Verificar erros ESLint
```

---

## 📱 Componentes Client vs Server

### Server Components (padrão Next.js 14)
```tsx
// app/page.tsx
// app/rsvp/[token]/page.tsx
// Busca dados direto do Supabase
```

### Client Components
```tsx
'use client'
// components/RSVPForm.tsx
// components/AdminDashboard.tsx
// components/Hero.tsx
// Possuem interatividade (useState, useEffect)
```

---

## 🔒 Row Level Security (RLS)

### Políticas Ativas
```sql
-- Famílias e convidados são visíveis publicamente
-- Atualização de convidados permitida (RSVP)
-- Inserção de famílias/convidados permitida (Admin)
```

### Segurança
- Tokens UUID aleatórios (impossível adivinhar)
- Admin protegido por senha
- RLS impede acessos não autorizados

---

## 🎯 Rotas da Aplicação

```
/                          → Landing Page
/rsvp/[token]             → Página de confirmação
/admin                     → Painel administrativo
/api/rsvp                 → API de confirmação
/api/admin/auth           → API de autenticação
/api/admin/families       → API de famílias
/api/admin/import         → API de importação
```

---

## 🔄 Estado da Aplicação

### Landing Page
- Sem estado (estática)

### RSVP Form
```tsx
useState<Guest[]>          # Lista de convidados
useState<boolean>          # isSubmitting
useState<boolean>          # isSuccess
useState<string | null>    # error
```

### Admin Dashboard
```tsx
useState<Family[]>         # Lista de famílias
useState<boolean>          # isLoading
useState<boolean>          # showAddForm
useState<boolean>          # showImportForm
useState<object>           # newFamily
useState<string>           # importData
useState<string | null>    # error
```

---

## 📊 Fluxo de Confirmação

```
1. Admin cadastra família
   └── Gera token UUID único
   
2. Admin copia link RSVP
   └── https://site.com/rsvp/[token]
   
3. Família acessa link
   └── page.tsx busca dados no Supabase
   └── Renderiza RSVPForm.tsx
   
4. Família marca checkboxes
   └── onClick atualiza estado local
   
5. Família clica "Confirmar"
   └── POST /api/rsvp
   └── Supabase UPDATE convidados
   └── Sucesso: mostra mensagem
   
6. Admin vê atualização
   └── Dashboard atualiza estatísticas
```

---

## 🧪 Testes Recomendados

### Checklist de QA
- [ ] Landing page carrega
- [ ] Links funcionam
- [ ] Admin autentica
- [ ] Cadastro funciona
- [ ] RSVP funciona
- [ ] Estatísticas atualizam
- [ ] Responsivo mobile
- [ ] Build sem erros
- [ ] Deploy no Vercel

---

## 📈 Escalabilidade

### Limites (Plano Gratuito)
- **Supabase**: 500MB database, 2GB storage
- **Vercel**: 100GB bandwidth/mês
- **Capacidade**: ~1000 convidados facilmente

### Otimizações
- Next.js Image optimization
- Tailwind CSS purge (CSS mínimo)
- Static generation onde possível
- API routes eficientes

---

## 🛠️ Manutenção

### Logs
- **Vercel**: Dashboard > Logs
- **Supabase**: Dashboard > Logs
- **Browser**: F12 > Console

### Backups
- Exportar CSV regularmente
- Supabase faz backup automático
- Git para código

---

## 🚢 Deploy

### Vercel (Recomendado)
```
1. Push to GitHub
2. Import no Vercel
3. Add env vars
4. Deploy automático
```

### Alternativas
- Netlify
- Railway
- DigitalOcean App Platform

---

## 📚 Recursos Adicionais

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Estrutura criada para: Nina & Thiago - 07/03/2026** 💍
