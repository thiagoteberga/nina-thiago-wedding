# ❓ FAQ - Perguntas Frequentes

## 📋 Geral

### Como funciona o sistema?
O sistema gera um link único para cada família. Quando a família acessa o link, vê a lista de seus convidados e pode marcar quem irá comparecer. Todas as confirmações são salvas no banco de dados Supabase.

### É realmente gratuito?
Sim! O sistema usa:
- **Vercel** (hospedagem): Plano gratuito para projetos pessoais
- **Supabase** (banco de dados): Plano gratuito com até 500MB
- **Next.js**: Framework open-source gratuito

### Quantos convidados posso cadastrar?
O plano gratuito do Supabase suporta facilmente até 1000+ convidados. Para eventos maiores, você pode fazer upgrade se necessário.

---

## 🔧 Configuração

### Onde encontro as credenciais do Supabase?
1. Acesse seu projeto no Supabase
2. Clique em Settings (⚙️)
3. Vá em API
4. Copie a "Project URL" e "anon public key"

### Posso usar outro banco de dados?
O sistema foi projetado especificamente para Supabase. Para usar outro banco, você precisaria modificar o código significativamente.

### Como altero a senha de admin?
Edite o arquivo `.env.local` e altere o valor de `ADMIN_PASSWORD`. Se já fez deploy no Vercel, altere também lá nas variáveis de ambiente.

---

## 🐛 Problemas Comuns

### "Erro ao conectar com Supabase"
**Causas possíveis:**
1. Credenciais incorretas no .env.local
2. Tabelas não criadas no Supabase
3. RLS (Row Level Security) mal configurado

**Solução:**
1. Verifique se copiou corretamente a URL e a chave
2. Execute novamente o script SQL no Supabase
3. Verifique se as políticas RLS estão ativas

### "Token inválido" ao acessar link de RSVP
**Causas possíveis:**
1. Link foi copiado incorretamente
2. Família foi deletada do banco
3. Token foi alterado manualmente

**Solução:**
1. No /admin, copie novamente o link correto
2. Verifique se a família existe no banco
3. Nunca edite tokens manualmente

### Build falha no Vercel
**Causas possíveis:**
1. Variáveis de ambiente não configuradas
2. Erro de TypeScript
3. Dependências faltando

**Solução:**
1. Adicione todas as variáveis no Vercel
2. Execute `npm run build` localmente para verificar erros
3. Execute `npm install` novamente

### "Cannot read property 'map' of undefined"
**Causas possíveis:**
1. Convidados não foram carregados do banco
2. Conexão com Supabase falhou

**Solução:**
1. Verifique o console do navegador (F12)
2. Verifique se as tabelas têm dados
3. Teste a conexão com Supabase

---

## 🎨 Personalização

### Como altero as cores do site?
Edite o arquivo `tailwind.config.js` na seção `colors`. Você pode usar geradores de paleta como [Coolors](https://coolors.co) ou [Adobe Color](https://color.adobe.com).

### Como adiciono minhas próprias fotos?
1. Crie uma pasta `public/images`
2. Adicione suas fotos lá
3. Substitua as URLs nos componentes:
```tsx
// De:
src="https://images.unsplash.com/..."
// Para:
src="/images/minha-foto.jpg"
```

### Como altero a fonte?
Edite o arquivo `tailwind.config.js` na seção `fontFamily`. Você pode usar Google Fonts ou fontes locais.

### Posso adicionar mais campos (ex: tipo de refeição)?
Sim, mas requer modificações:
1. Adicionar coluna na tabela SQL
2. Atualizar tipos TypeScript
3. Modificar o formulário RSVP
4. Atualizar a API

---

## 📊 Uso

### Como envio os links para os convidados?
1. Acesse `/admin`
2. Para cada família, clique em "Copiar" no link RSVP
3. Envie via WhatsApp, SMS ou email
4. Use os templates em `TEMPLATES-MENSAGENS.md`

### Posso enviar todos os links de uma vez?
Não automaticamente. Você precisa copiar e enviar individualmente. Recomendamos criar um script ou usar uma ferramenta de disparo de WhatsApp (com cuidado para não violar termos de serviço).

### Como faço backup dos dados?
1. Acesse `/admin`
2. Clique em "📤 Exportar CSV"
3. Salve o arquivo em um local seguro
4. Ou acesse o Supabase e exporte as tabelas

### Posso deletar uma família?
Sim, mas não há interface para isso. Você precisa deletar diretamente no Supabase:
1. Acesse Table Editor
2. Selecione a família
3. Clique em Delete

---

## 🔒 Segurança

### O sistema é seguro?
Sim, o sistema implementa:
- Autenticação na área administrativa
- Row Level Security (RLS) no Supabase
- Tokens únicos e aleatórios (UUID)
- HTTPS obrigatório no Vercel

### Alguém pode acessar dados de outras famílias?
Não. Cada família só tem acesso aos seus próprios dados através do token único.

### Posso usar autenticação mais forte para o admin?
Sim! Você pode integrar:
- Supabase Auth (email/senha)
- NextAuth.js (OAuth)
- Auth0

Mas isso requer modificações no código.

---

## 📱 Mobile

### O site funciona no celular?
Sim! O design é totalmente responsivo e funciona em:
- Smartphones (iOS/Android)
- Tablets
- Desktops

### Posso criar um app nativo?
O site já funciona muito bem no mobile. Para criar um app nativo, você precisaria usar React Native e adaptar o código.

---

## 🚀 Performance

### O site é rápido?
Sim! O Next.js e Vercel otimizam automaticamente:
- Imagens (usando Next/Image)
- Código JavaScript
- CSS (Tailwind purge)
- Caching

### Quantos acessos simultâneos suporta?
O Vercel suporta milhares de acessos simultâneos no plano gratuito. Mais que suficiente para um casamento.

---

## 🌐 Domínio

### Como uso meu próprio domínio?
1. Compre um domínio (ex: em [Registro.br](https://registro.br))
2. No Vercel, vá em Settings > Domains
3. Adicione seu domínio
4. Configure os DNS conforme instruções

### Preciso de um domínio?
Não! O Vercel fornece um domínio gratuito: `seu-projeto.vercel.app`

---

## 📞 Suporte

### Onde tiro dúvidas?
1. Leia este FAQ
2. Consulte o README.md
3. Veja a documentação do [Next.js](https://nextjs.org/docs)
4. Veja a documentação do [Supabase](https://supabase.com/docs)

### Encontrei um bug, o que faço?
1. Verifique este FAQ primeiro
2. Limpe o cache do navegador
3. Tente em modo anônimo
4. Verifique os logs (F12 > Console)

---

## 🎉 Depois do Casamento

### Como encerro o sistema?
Se quiser manter as memórias:
1. Exporte um backup (CSV)
2. Faça screenshots das estatísticas
3. Delete o projeto no Vercel (se desejar)
4. Mantenha o projeto Supabase (é gratuito)

### Posso reutilizar para outro evento?
Sim! Basta:
1. Limpar as tabelas no Supabase
2. Atualizar textos e datas
3. Fazer novo deploy

---

**Não encontrou sua resposta? Verifique a documentação completa no README.md**
