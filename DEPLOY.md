# 🚀 Guia de Deploy - Vercel

Instruções passo a passo para fazer o deploy da aplicação no Vercel.

---

## 📋 Pré-requisitos

Antes de fazer deploy, certifique-se:

- [x] Projeto funcionando localmente (`npm run dev`)
- [x] Supabase configurado e testado
- [x] Convidados cadastrados (ou pelo menos dados de teste)
- [x] Senha de admin definida
- [x] Build local sem erros (`npm run build`)

---

## 🌐 Opção 1: Deploy via GitHub (Recomendado)

### Passo 1: Criar Repositório no GitHub

1. **Acesse**: https://github.com/new
2. **Crie um repositório**:
   - Nome: `casamento-nina-thiago`
   - Visibilidade: Private (recomendado)
   - Não inicialize com README
3. Clique em **"Create repository"**

### Passo 2: Enviar Código para o GitHub

No terminal do projeto:

```bash
# Inicializar Git (se ainda não fez)
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Aplicação RSVP - Nina & Thiago"

# Adicionar repositório remoto (substitua SEU-USUARIO)
git remote add origin https://github.com/SEU-USUARIO/casamento-nina-thiago.git

# Renomear branch para main
git branch -M main

# Enviar para GitHub
git push -u origin main
```

⚠️ **Importante**: O arquivo `.env.local` NÃO será enviado (está no .gitignore)

### Passo 3: Conectar Vercel ao GitHub

1. **Acesse**: https://vercel.com/login
2. **Faça login** com GitHub
3. Permita acesso ao Vercel
4. No dashboard, clique em **"Add New..."** > **"Project"**
5. Clique em **"Import"** no repositório `casamento-nina-thiago`

### Passo 4: Configurar Projeto no Vercel

1. **Framework Preset**: Next.js (detectado automaticamente)
2. **Root Directory**: ./ (padrão)
3. **Build Command**: `npm run build` (padrão)
4. **Output Directory**: .next (padrão)

### Passo 5: Adicionar Variáveis de Ambiente

⚠️ **CRÍTICO**: Sem essas variáveis, o deploy não funcionará!

Clique em **"Environment Variables"** e adicione:

#### Variable 1:
```
Name: NEXT_PUBLIC_SUPABASE_URL
Value: https://seu-projeto.supabase.co
```

#### Variable 2:
```
Name: NEXT_PUBLIC_SUPABASE_ANON_KEY
Value: sua-chave-publica-aqui
```

#### Variable 3:
```
Name: ADMIN_PASSWORD
Value: SuaSenhaSeguraAqui
```

**Environments**: Marque todos (Production, Preview, Development)

### Passo 6: Deploy!

1. Clique em **"Deploy"**
2. Aguarde 2-5 minutos
3. Quando aparecer "🎉 Congratulations!", clique em **"Visit"**

### Passo 7: Testar Deploy

1. Acesse a URL fornecida (ex: `casamento-nina-thiago.vercel.app`)
2. Verifique:
   - [ ] Landing page carrega
   - [ ] /admin funciona
   - [ ] Um link RSVP funciona
   - [ ] Confirmação é salva

---

## 💻 Opção 2: Deploy via CLI do Vercel

### Passo 1: Instalar Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Login

```bash
vercel login
```

Escolha o método de login (GitHub, Email, etc.)

### Passo 3: Deploy

```bash
# No diretório do projeto
vercel
```

**Perguntas que aparecerão:**

1. **Set up and deploy?** → Yes
2. **Which scope?** → Sua conta
3. **Link to existing project?** → No
4. **Project name?** → casamento-nina-thiago
5. **Directory?** → ./
6. **Override settings?** → No

### Passo 4: Adicionar Variáveis de Ambiente

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Cole o valor quando solicitado
# Escolha: Production, Preview, Development (todas)

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Cole o valor

vercel env add ADMIN_PASSWORD
# Cole o valor
```

### Passo 5: Deploy em Produção

```bash
vercel --prod
```

Aguarde o deploy e copie a URL fornecida.

---

## 🌐 Opção 3: Deploy Direto (sem Git)

### Via Dashboard Vercel

1. Acesse: https://vercel.com/new
2. Clique em **"Browse"** ou arraste a pasta do projeto
3. Configure as variáveis de ambiente
4. Clique em **"Deploy"**

⚠️ **Desvantagem**: Sem versionamento, mais difícil atualizar

---

## 🔧 Configurações Pós-Deploy

### Adicionar Domínio Customizado (Opcional)

1. No dashboard do Vercel, vá em **Settings** > **Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `casamento-nina-thiago.com.br`)
4. Siga as instruções para configurar DNS

**Providers de domínio populares:**
- Registro.br (Brasil)
- Namecheap
- GoDaddy
- Cloudflare

### Configurar Redirects (Opcional)

Crie `vercel.json` na raiz:

```json
{
  "redirects": [
    {
      "source": "/confirmar",
      "destination": "/",
      "permanent": false
    }
  ]
}
```

### Analytics (Opcional)

1. No Vercel dashboard, vá em **Analytics**
2. Ative o Vercel Analytics (gratuito)
3. Veja estatísticas de acesso em tempo real

---

## 📊 Monitoramento

### Vercel Dashboard

**Acessar**: https://vercel.com/dashboard

**O que você vê:**
- Status do deploy
- Logs de build
- Logs de runtime
- Uso de bandwidth
- Performance metrics

### Verificar Logs

```bash
# Via CLI
vercel logs seu-projeto.vercel.app
```

Ou no dashboard: **Deployments** > Clique no deploy > **View Function Logs**

---

## 🔄 Atualizar Deploy

### Via Git (Automático)

```bash
# Faça alterações no código
git add .
git commit -m "Atualização: descrição"
git push
```

O Vercel detecta automaticamente e redeploy!

### Via CLI

```bash
vercel --prod
```

---

## 🐛 Resolução de Problemas

### Deploy Falha

**Erro: Build failed**
```bash
# Teste local primeiro:
npm run build

# Se funcionar local mas falhar no Vercel:
# - Verifique Node.js version no Vercel
# - Verifique environment variables
```

**Erro: Missing environment variables**
```bash
# Adicione todas as variáveis no Vercel
# Dashboard > Settings > Environment Variables
```

### Site Carrega, Mas Não Funciona

**Problema: "Failed to fetch"**
- Verifique se as variáveis de ambiente estão corretas
- Confirme que o Supabase está acessível
- Veja os logs do navegador (F12)

**Problema: "Error 500"**
- Veja os Vercel Function Logs
- Verifique se o SQL foi executado no Supabase
- Teste as credenciais do Supabase

### Imagens Não Carregam

**Problema: Imagens do Unsplash bloqueadas**
```js
// next.config.js
module.exports = {
  images: {
    domains: ['images.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}
```

---

## 🔐 Segurança Pós-Deploy

### Checklist de Segurança

- [ ] `.env.local` NÃO está no Git
- [ ] Senha de admin é forte
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] RLS ativo no Supabase
- [ ] HTTPS ativo (automático no Vercel)
- [ ] Repositório GitHub é private (recomendado)

### Atualizar Senha de Admin

1. No Vercel dashboard:
   - **Settings** > **Environment Variables**
   - Edite `ADMIN_PASSWORD`
   - Salve
2. Force redeploy:
   - **Deployments** > **...** > **Redeploy**

---

## 📱 Compartilhar o Site

### Link Principal
```
https://casamento-nina-thiago.vercel.app
```

### Links RSVP
```
https://casamento-nina-thiago.vercel.app/rsvp/[token-familia]
```

**Importante:**
- Cada família tem seu próprio token único
- Copie do painel /admin
- Não compartilhe o link do admin publicamente

---

## 📈 Performance

### Vercel Automaticamente Otimiza:
- ✅ Compressão Gzip/Brotli
- ✅ Cache de assets
- ✅ CDN global
- ✅ Image optimization
- ✅ Edge functions

### Métricas Esperadas:
- Lighthouse Score: 90+
- First Load: < 2s
- Time to Interactive: < 3s

---

## 💰 Custos

### Plano Free Vercel Inclui:
- 100GB bandwidth/mês
- Builds ilimitados
- Domínio .vercel.app
- SSL automático
- Analytics básico
- Preview deployments

**Suficiente para:**
- 10.000+ visitantes/mês
- Evento com 500+ convidados

### Se Exceder Limites:
- Upgrade para Vercel Pro ($20/mês)
- Ou migre para outro host

---

## 🎯 Checklist Final de Deploy

Antes de enviar convites:

- [ ] Deploy feito com sucesso
- [ ] Landing page funciona
- [ ] /admin acessível
- [ ] Estatísticas carregam
- [ ] RSVP testado (pelo menos 1 confirmação)
- [ ] Mobile responsivo
- [ ] Imagens carregam
- [ ] Performance OK
- [ ] Domínio configurado (se aplicável)
- [ ] Todos os convidados cadastrados
- [ ] Links RSVP gerados
- [ ] Backup exportado

---

## 🆘 Suporte

### Recursos Oficiais:
- [Vercel Docs](https://vercel.com/docs)
- [Vercel Discord](https://vercel.com/discord)
- [Next.js Docs](https://nextjs.org/docs)

### Comandos Úteis:
```bash
vercel --help          # Ajuda geral
vercel login           # Login
vercel logout          # Logout
vercel ls              # Listar projetos
vercel env ls          # Listar env vars
vercel logs            # Ver logs
vercel domains         # Gerenciar domínios
vercel --prod          # Deploy produção
```

---

## 🎉 Deploy Completo!

**PARABÉNS!** 🎊

Seu sistema RSVP está no ar!

### Próximos Passos:

1. ✅ Teste tudo uma última vez
2. ✅ Envie os convites
3. ✅ Acompanhe as confirmações no /admin
4. ✅ Aproveite o processo!

---

**Nina & Thiago - 07/03/2026** 💍

*Que este sistema facilite a organização do seu grande dia!*
