# 🎯 Primeiros Passos - Teste o Sistema

Este guia mostra como testar o sistema passo a passo após a instalação.

---

## 🚀 Passo 1: Iniciar o Servidor

```bash
# No terminal, dentro da pasta do projeto
npm run dev
```

Aguarde aparecer:
```
✓ Ready in 2.5s
○ Local: http://localhost:3000
```

---

## 🏠 Passo 2: Acessar a Landing Page

1. Abra o navegador em: http://localhost:3000
2. **Verifique:**
   - ✅ Hero com foto de fundo aparece
   - ✅ Nomes "Nina & Thiago" visíveis
   - ✅ Data e local corretos
   - ✅ Botão "Confirmar Presença"
   - ✅ Galeria de 3 fotos
   - ✅ Rodapé com informações

**❌ Se algo não aparecer:**
- Verifique o console (F12)
- Veja se há erros no terminal
- Verifique se as imagens do Unsplash estão carregando

---

## 🔐 Passo 3: Acessar o Admin

1. Acesse: http://localhost:3000/admin
2. **Digite a senha** que você configurou no `.env.local`
3. Clique em **"Entrar"**

**Você deve ver:**
- ✅ "Painel Administrativo"
- ✅ 3 cards de estatísticas (todos zerados)
- ✅ Botões: Adicionar Família, Importar CSV, Exportar CSV

**❌ Se der erro "Senha incorreta":**
- Verifique o `.env.local`
- A senha padrão é o que você definiu em `ADMIN_PASSWORD`

---

## 👥 Passo 4: Cadastrar Primeira Família (Teste)

1. Clique em **"+ Adicionar Família"**
2. Preencha:
   - **Nome da Família:** Família Teste
   - **Telefone:** 11999999999
   - **Convidado 1:** João Teste
   - Clique em **"+ Adicionar mais um convidado"**
   - **Convidado 2:** Maria Teste
3. Clique em **"Salvar Família"**

**Você deve ver:**
- ✅ Família aparece na lista abaixo
- ✅ Status: 0/2 confirmados
- ✅Link RSVP gerado
- ✅ Estatísticas atualizadas (1 família, 2 convidados)

**❌ Se der erro:**
- Verifique se executou o SQL no Supabase
- Verifique as credenciais no `.env.local`
- Veja o console do navegador (F12)

---

## 🔗 Passo 5: Testar Link de RSVP

1. Na família "Família Teste", clique em **"Copiar"** no link RSVP
2. **Abra uma aba anônima** (Ctrl+Shift+N no Chrome)
3. Cole o link na barra de endereços
4. Pressione Enter

**Você deve ver:**
- ✅ Cabeçalho "Nina & Thiago"
- ✅ "Confirme sua Presença"
- ✅ "Família Teste"
- ✅ 2 checkboxes: João Teste, Maria Teste

---

## ✅ Passo 6: Fazer uma Confirmação

1. **Marque os checkboxes** de João e Maria
2. Clique em **"Confirmar Presença"**
3. Aguarde o processamento

**Você deve ver:**
- ✅ Ícone de check verde
- ✅ "Presença Confirmada!"
- ✅ Mensagem de agradecimento

---

## 📊 Passo 7: Verificar Estatísticas

1. Volte para a aba do admin: http://localhost:3000/admin
2. **Atualize a página** (F5)

**Você deve ver:**
- ✅ Total de Famílias: 1
- ✅ Confirmados: 2
- ✅ Não Confirmados: 0
- ✅ Na família teste: 2/2 confirmados (badge verde)
- ✅ João e Maria com "✓ Confirmado"

---

## 📥 Passo 8: Testar Importação CSV

1. No admin, clique em **"📥 Importar CSV"**
2. Copie e cole estas linhas:
```
Família Silva,11988888888,Pedro Silva,Ana Silva
Família Costa,11977777777,Carlos Costa,Julia Costa,Lucas Costa
```
3. Clique em **"Importar"**

**Você deve ver:**
- ✅ 2 novas famílias na lista
- ✅ Total de Famílias: 3
- ✅ Total de Convidados: 7 (2 + 2 + 3)

---

## 📤 Passo 9: Testar Exportação CSV

1. Clique em **"📤 Exportar CSV"**
2. Um arquivo CSV deve ser baixado

**Abra o arquivo e verifique:**
- ✅ Todas as famílias listadas
- ✅ Todos os convidados
- ✅ Status de confirmação
- ✅ Links RSVP

---

## 🗑️ Passo 10: Limpar Dados de Teste

**Opção 1: Limpar via Supabase**
1. Acesse seu projeto no Supabase
2. Vá em **Table Editor**
3. Selecione a tabela `familias`
4. Delete as famílias de teste
5. (Os convidados serão deletados automaticamente por CASCADE)

**Opção 2: Manter para Testes**
- Você pode manter as famílias de teste
- Útil para demonstração aos noivos

---

## 🧪 Checklist de Teste Completo

Marque o que funcionou:

- [ ] Servidor iniciou sem erros
- [ ] Landing page carregou
- [ ] Imagens aparecem
- [ ] Botões funcionam
- [ ] Admin abre com senha
- [ ] Cadastro manual funciona
- [ ] Estatísticas atualizam
- [ ] Link RSVP funciona
- [ ] Confirmação é salva
- [ ] Importação CSV funciona
- [ ] Exportação CSV funciona
- [ ] Site responsivo no mobile

---

## 📱 Teste no Mobile

1. No terminal, procure o IP local:
   - Algo como: `Network: http://192.168.1.X:3000`
2. Abra esse endereço no seu celular
3. Teste toda a navegação

**Verifique:**
- ✅ Layout adapta ao mobile
- ✅ Botões são clicáveis
- ✅ Checkboxes funcionam
- ✅ Texto é legível

---

## ⚠️ Problemas Comuns e Soluções

### "Cannot read property of undefined"
**Solução:**
```bash
# Reinstale as dependências
rm -rf node_modules
npm install
npm run dev
```

### "Error connecting to Supabase"
**Solução:**
1. Verifique `.env.local`
2. Confirme que executou o SQL no Supabase
3. Teste as credenciais:
```bash
# No console do navegador (F12):
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

### Imagens não carregam
**Solução:**
- Verifique sua conexão com internet
- O Unsplash pode estar lento
- Substitua por imagens locais se preferir

### Build falha
**Solução:**
```bash
# Tente o build:
npm run build

# Se der erro, veja a mensagem detalhada
# Geralmente é erro de TypeScript
```

---

## ✅ Tudo Funcionou?

**PARABÉNS! 🎉**

Seu sistema está 100% operacional!

### Próximos Passos:

1. ✅ Personalize cores e textos
2. ✅ Adicione suas próprias fotos
3. ✅ Cadastre os convidados reais
4. ✅ Faça o deploy no Vercel
5. ✅ Envie os convites!

---

## 🆘 Ainda com Problemas?

1. Consulte o **FAQ.md**
2. Leia o **README.md** completo
3. Verifique o console (F12)
4. Veja os logs do Supabase
5. Delete `.next` e tente de novo:
```bash
rm -rf .next
npm run dev
```

---

**Boa sorte com seu casamento! 💍**

Nina & Thiago - 07/03/2026
