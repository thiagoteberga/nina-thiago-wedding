# 📚 Índice da Documentação

Guia de navegação de todos os documentos do sistema RSVP.

---

## 🚀 Para Começar

### [QUICKSTART.md](QUICKSTART.md)
**⏱️ Tempo: 5 minutos**
- Configuração rápida do projeto
- Comandos essenciais
- Primeiros passos

**📌 Comece por aqui se:**
- Você quer começar rapidamente
- Já tem experiência com Next.js/Supabase
- Quer ver o sistema funcionando primeiro

---

### [README.md](README.md)
**⏱️ Tempo: 15-20 minutos**
- Documentação completa e detalhada
- Instalação passo a passo
- Configuração do Supabase
- Deploy no Vercel
- Como usar o sistema

**📌 Comece por aqui se:**
- É sua primeira vez com Next.js ou Supabase
- Quer entender tudo em detalhes
- Precisa de um guia completo

---

## 📋 Guias Práticos

### [TESTE-SISTEMA.md](TESTE-SISTEMA.md)
**⏱️ Tempo: 10-15 minutos**
- Passo a passo para testar cada funcionalidade
- Checklist de testes completo
- Resolução de problemas comuns

**📌 Use quando:**
- Terminou a instalação
- Quer validar se tudo funciona
- Está tendo problemas específicos

---

### [CHECKLIST.md](CHECKLIST.md)
**⏱️ Tempo: Conforme necessário**
- Lista de verificação completa
- Setup do Supabase
- Configuração local
- Deploy
- Testes

**📌 Use quando:**
- Quer garantir que não esqueceu nada
- Precisa organizar o processo
- Quer acompanhar o progresso

---

### [DEPLOY.md](DEPLOY.md)
**⏱️ Tempo: 15-30 minutos**
- Guia detalhado de deploy no Vercel
- Três métodos diferentes (GitHub, CLI, Manual)
- Configuração de domínio
- Troubleshooting de deploy
- Monitoramento

**📌 Use quando:**
- Terminou os testes locais
- Está pronto para publicar
- Precisa configurar domínio

---

## 💬 Comunicação

### [TEMPLATES-MENSAGENS.md](TEMPLATES-MENSAGENS.md)
**⏱️ Tempo: 5 minutos**
- Templates prontos para WhatsApp
- Mensagens de convite
- Lembretes
- Agradecimentos
- Dicas de envio

**📌 Use quando:**
- For enviar os convites
- Precisar enviar lembretes
- Quiser padronizar a comunicação

---

## ❓ Dúvidas e Problemas

### [FAQ.md](FAQ.md)
**⏱️ Tempo: Conforme necessidade**
- Perguntas frequentes
- Problemas comuns e soluções
- Dicas de personalização
- Questões de segurança
- Pós-casamento

**📌 Use quando:**
- Tiver dúvidas específicas
- Encontrar erros
- Quiser personalizar o sistema
- Precisar de troubleshooting

---

## 🛠️ Documentação Técnica

### [ESTRUTURA.md](ESTRUTURA.md)
**⏱️ Tempo: 15-20 minutos**
- Arquitetura completa do projeto
- Árvore de diretórios
- Fluxo de dados
- Estrutura do banco
- API endpoints
- Componentes

**📌 Use quando:**
- Quer entender a arquitetura
- Precisa modificar o código
- Quer adicionar funcionalidades
- É desenvolvedor buscando detalhes técnicos

---

## 📊 Dados e Exemplos

### [exemplo-convidados.csv](exemplo-convidados.csv)
**⏱️ Tempo: 2 minutos**
- Exemplo de arquivo CSV
- Formato correto de importação
- 10 famílias de exemplo

**📌 Use quando:**
- For importar convidados
- Quiser testar a importação
- Precisar do formato correto

---

### [supabase-setup.sql](supabase-setup.sql)
**⏱️ Tempo: 5 minutos (executar)**
- Script SQL completo
- Criação de tabelas
- Índices e constraints
- Políticas de segurança (RLS)
- Views e funções úteis

**📌 Use quando:**
- Estiver configurando o Supabase
- Precisar recriar as tabelas
- Quiser entender o schema

---

## 📁 Arquivos de Configuração

### Arquivos no Projeto

```
📄 .env.example              → Template de variáveis de ambiente
📄 package.json              → Dependências NPM
📄 tsconfig.json             → Configuração TypeScript
📄 tailwind.config.js        → Configuração Tailwind CSS
📄 next.config.js            → Configuração Next.js
📄 postcss.config.js         → Configuração PostCSS
📄 .gitignore                → Arquivos ignorados pelo Git
📄 .vscode/settings.json    → Configurações VS Code
```

---

## 🎯 Fluxo de Trabalho Recomendado

### 1️⃣ Instalação e Setup (1-2 horas)
```
1. Leia: QUICKSTART.md ou README.md
2. Configure: Supabase (execute supabase-setup.sql)
3. Configure: .env.local
4. Instale: npm install
5. Rode: npm run dev
6. Siga: TESTE-SISTEMA.md
```

### 2️⃣ Personalização (30 minutos - 2 horas)
```
1. Altere: Cores, textos, fotos
2. Configure: ADMIN_PASSWORD forte
3. Teste: Novamente
```

### 3️⃣ Cadastro de Convidados (1-3 horas)
```
1. Prepare: Lista em CSV ou manual
2. Importe/Cadastre: Via /admin
3. Copie: Links RSVP
4. Use: TEMPLATES-MENSAGENS.md
```

### 4️⃣ Deploy (30 minutos - 1 hora)
```
1. Siga: DEPLOY.md
2. Configure: Variáveis no Vercel
3. Teste: Site em produção
4. Use: CHECKLIST.md
```

### 5️⃣ Envio e Acompanhamento (Contínuo)
```
1. Envie: Convites via WhatsApp
2. Monitore: Dashboard /admin
3. Exporte: Backups regulares
4. Lembre: Não confirmados
```

---

## 🔍 Busca Rápida

### Procurando por...

**"Como instalar?"**
→ [README.md](README.md) ou [QUICKSTART.md](QUICKSTART.md)

**"Como fazer deploy?"**
→ [DEPLOY.md](DEPLOY.md)

**"Está dando erro X"**
→ [FAQ.md](FAQ.md) ou [TESTE-SISTEMA.md](TESTE-SISTEMA.md)

**"Como enviar convites?"**
→ [TEMPLATES-MENSAGENS.md](TEMPLATES-MENSAGENS.md)

**"Como funciona o código?"**
→ [ESTRUTURA.md](ESTRUTURA.md)

**"Não esqueci nada?"**
→ [CHECKLIST.md](CHECKLIST.md)

**"Como importar CSV?"**
→ [exemplo-convidados.csv](exemplo-convidados.csv)

**"Como criar banco?"**
→ [supabase-setup.sql](supabase-setup.sql)

---

## 📖 Ordem de Leitura Recomendada

### Para Iniciantes
```
1. QUICKSTART.md          (visão geral)
2. README.md              (guia completo)
3. TESTE-SISTEMA.md       (validação)
4. TEMPLATES-MENSAGENS.md (uso prático)
5. DEPLOY.md              (publicação)
6. FAQ.md                 (dúvidas)
```

### Para Experientes
```
1. QUICKSTART.md          (setup rápido)
2. ESTRUTURA.md           (arquitetura)
3. TESTE-SISTEMA.md       (validação)
4. DEPLOY.md              (publicação)
```

### Para Desenvolvedores
```
1. ESTRUTURA.md           (arquitetura)
2. supabase-setup.sql     (schema)
3. README.md              (contexto)
4. FAQ.md                 (edge cases)
```

---

## 💡 Dicas de Navegação

### Atalhos Úteis

- Ctrl+F no arquivo para buscar
- Use os links clicáveis entre documentos
- Marque checkboxes conforme avança
- Favoritas páginas importantes

### Impressão Recomendada

Se preferir papel:
- ✅ CHECKLIST.md (para ir marcando)
- ✅ QUICKSTART.md (referência rápida)
- ✅ TEMPLATES-MENSAGENS.md (para copiar)

---

## 📊 Estatísticas da Documentação

```
Total de Arquivos:     25+
Total de Páginas:      ~150 páginas (se impresso)
Tempo de Leitura:      ~3-4 horas (tudo)
Tempo de Setup:        1-2 horas
Tempo Total:           4-6 horas até estar no ar
```

---

## 🎓 Níveis de Conhecimento

### Nivel 1: Básico (Usar o sistema)
📖 Leia: QUICKSTART, README, TEMPLATES-MENSAGENS
⏱️ Tempo: 1-2 horas

### Nível 2: Intermediário (Deploy e manutenção)
📖 Leia: + DEPLOY, CHECKLIST, FAQ
⏱️ Tempo: +2-3 horas

### Nível 3: Avançado (Desenvolvimento)
📖 Leia: + ESTRUTURA, código-fonte
⏱️ Tempo: +4-6 horas

---

## 🔄 Atualizações

Este índice cobre a versão inicial do sistema.

**Última atualização:** Março 2026  
**Versão:** 1.0.0

---

## 🎉 Começar Agora!

Pronto para começar? Escolha seu caminho:

### 🚀 Rápido (Experiente)
→ [QUICKSTART.md](QUICKSTART.md)

### 📚 Completo (Iniciante)
→ [README.md](README.md)

### 🧪 Já Instalou (Testar)
→ [TESTE-SISTEMA.md](TESTE-SISTEMA.md)

---

**Boa sorte com seu casamento! 💍**

Nina & Thiago - 07/03/2026  
Chácara Amata - Pindamonhangaba/SP
