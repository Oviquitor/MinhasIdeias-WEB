# Minhas Ideias 💡🚀

Meu cantinho pessoal pra **organizar ideias, projetos e os produtos que quero criar** — e,
principalmente, **tirar tudo do papel**. Construído com **Nuxt 4** + **Nuxt Content**, com a
mesma mecânica do Docusaurus: você joga arquivos `.md` em pastas e o portal publica
automaticamente, organizado por projeto, com busca full-text e acesso protegido por login.

Visual cartoon/dream: noite roxa de sonho, cores de bala, bordas grossas arredondadas e
sombras "sticker" — feito pra dar vontade de executar. ✨

## Stack

- **Nuxt 4** + **Vue 3**
- **@nuxt/content v3** — conteúdo a partir de arquivos Markdown
- **Tailwind CSS v4** — design system (tema cartoon/dream, fontes Fredoka + Nunito)
- **@nuxt/icon** (Iconify) e **@nuxt/fonts**
- **better-sqlite3** — índice de conteúdo do Nuxt Content

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:3000
```

Build de produção:

```bash
npm run build
npm run preview
```

## Acesso (demonstração)

O login usa um endpoint de demonstração em `server/api/auth/login.post.ts`.

- **admin@saasoftware.com.br** · `saa@2026`
- **dev@saasoftware.com.br** · `dev@2026`

> **Integração real:** substitua o bloco marcado em `server/api/auth/login.post.ts`
> por uma chamada ao seu backend de autenticação JWT da SAA, retornando `{ token, user }`.
> O token é guardado em cookie e validado pelo middleware `app/middleware/auth.global.ts`.

## Como adicionar documentação

Toda a documentação vive na pasta `content/`. **Cada pasta de 1º nível é um projeto.**

```text
content/
├─ changelog.md                 ← página avulsa (/changelog)
├─ 1.tech4log/                  ← projeto "Tech4Log"  → /tech4log
│  ├─ index.md                  ← metadados do projeto
│  ├─ 1.introducao/             ← seção
│  │  ├─ 1.visao-geral.md       ← página  → /tech4log/introducao/visao-geral
│  │  └─ 2.termos-tecnicos.md
│  └─ 2.autenticacao/
│     ├─ 1.login.md
│     └─ 2.logout.md
└─ 2.saa-agro/                  ← outro projeto  → /saa-agro
```

- Os **prefixos numéricos** (`1.`, `2.`) definem a ordem e são removidos da URL.
- O `index.md` de cada projeto define nome/ícone via frontmatter `project:`.

### Frontmatter

```md
---
title: Login                    # título (obrigatório)
description: Obtenção do token   # subtítulo + indexado na busca
icon: lucide:log-in             # ícone Iconify (opcional)
badge: v2                       # etiqueta na sidebar (opcional)
navigation: false               # oculta a página do menu (opcional)
---

Conteúdo em Markdown… (não repita o título como `# H1`, ele já é exibido)
```

O guia completo está publicado no próprio portal em **Guia do Portal**
(`content/3.guia-do-portal/`).

## Organizando projetos grandes

Para sistemas grandes (ex.: SAA ERP), organize em camadas **Projeto → Área → Módulo →
Tela**, dando a cada pasta um `index.md`. Recursos disponíveis:

- **Selos de tipo** — `type:` no frontmatter (`tela`, `modulo`, `manual`, `api`, …) exibe
  um selo colorido no título, na sidebar e nos cards. Mapa em `app/utils/docTypes.ts`.
- **Páginas-hub automáticas** — o bloco `::doc-overview` num `index.md` lista os
  filhos como cards (sem manter links na mão).
- **Componentes de leitura** — `::callout`, `::steps`, `:::fields`/`::field` para manuais
  escaneáveis. Ficam em `app/components/content/` (registrados como globais no
  `nuxt.config.ts`).

Veja tudo funcionando no projeto de exemplo `content/4.saa-erp/` e documentado em
**Guia do Portal → Recursos**.

## Estrutura do projeto

```text
app/
├─ assets/css/main.css          # design system (tema cartoon/dream)
├─ components/                   # Header, Sidebar, Busca, TOC, ProjectSwitcher…
├─ composables/                  # useAuth, useDocs (navegação multi-projeto)
├─ layouts/                      # default (landing/login) e docs (sidebar+conteúdo)
├─ middleware/auth.global.ts     # proteção de rotas
└─ pages/                        # index (landing), login, docs, [...slug]
content/                         # >>> sua documentação em Markdown <<<
content.config.ts                # schema do frontmatter
server/api/auth/                 # endpoint de login (trocar pelo backend real)
```
