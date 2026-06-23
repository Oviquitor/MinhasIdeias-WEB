---
title: Manual de Uso — Minhas Ideias
description: Como usar o portal, adicionar projetos e escrever a documentação.
icon: lucide:book-marked
navigation: false
---

Este manual explica como **usar e manter** o Minhas Ideias: adicionar projetos, criar páginas e
organizar a documentação. Não é preciso saber programar.

::callout{type="tip" title="Resumo da ideia"}
Toda a documentação são **arquivos `.md`** dentro da pasta `content/`. Você cria pastas e
arquivos, e o portal monta a navegação, a busca e o visual sozinho.
::

## Como a documentação é organizada

A regra é simples:

- **Cada pasta de 1º nível = um projeto** (ex.: Descontai, Vitrine, FinanceOS).
- **Subpastas = seções / áreas / módulos**.
- **Arquivos `.md` = páginas**.
- O **número na frente** (`1.`, `2.`…) serve só para **ordenar** — ele não aparece no
  endereço.

```text
content/
├─ 1.descontai/
│  ├─ index.md                 → /descontai
│  ├─ 1.visao-e-estrategia.md  → /descontai/visao-e-estrategia
│  └─ 4.aplicativo/
│     └─ 1.fluxo-do-app.md     → /descontai/aplicativo/fluxo-do-app
└─ 2.vitrine/
   ├─ index.md                 → /vitrine
   └─ 1.visao-e-estrategia.md  → /vitrine/visao-e-estrategia
```

## Adicionar um novo projeto

::steps
1. Crie uma pasta em `content/`, por exemplo `content/5.meu-sistema/`.
2. Dentro dela, crie um arquivo `index.md` com os dados do projeto.
3. Pronto — o projeto já aparece no portal e na lista **Todos os projetos**.
::

O `index.md` do projeto define o nome e o ícone que aparecem no seletor de projetos:

```md
---
title: Meu Sistema
description: Descrição curta do sistema.
icon: lucide:box
project:
  name: Meu Sistema
  tagline: Subtítulo do projeto
  icon: lucide:box
---

Texto de abertura do projeto…
```

## Adicionar uma página

Crie um arquivo `.md` dentro da pasta do projeto (ou de uma seção). Todo arquivo começa
com um **frontmatter**: o bloco entre `---` que define como a página aparece.

```md
---
title: Contas a Pagar
description: Cadastro e baixa de títulos a pagar.
type: tela
---

Conteúdo da página em Markdown…
```

::callout{type="note" title="Sobre o título"}
O título vem do campo `title`. Você pode até escrever `# Título` no corpo — ele é ocultado
automaticamente para não aparecer duplicado.
::

## O frontmatter (cabeçalho do arquivo)

| Campo | Obrigatório | Para que serve |
| --- | --- | --- |
| `title` | Sim | Título da página. |
| `description` | Não | Subtítulo e texto que aparece na busca. |
| `type` | Não | Selo colorido do documento (veja abaixo). |
| `icon` | Não | Ícone do item, ex.: `lucide:book-open`. |
| `badge` | Não | Etiqueta curta na barra lateral, ex.: `v2`. |
| `navigation` | Não | Use `false` para esconder a página do menu. |

> Os ícones vêm do [Iconify](https://icones.js.org) — procure lá e use o nome, como
> `lucide:truck`.

## Tipos de documento

O campo `type` coloca um **selo colorido** no título, na barra lateral e nos cards — assim
quem lê sabe na hora o que é cada coisa.

| `type` | Quando usar |
| --- | --- |
| `modulo` | Um módulo / área do sistema. |
| `tela` | A documentação de uma tela. |
| `manual` | Um procedimento passo a passo. |
| `api` | Endpoints de API. |
| `integracao` | Conexão com um sistema externo. |
| `conceito` | Explicação de um conceito de negócio. |
| `processo` | Um fluxo de ponta a ponta. |
| `guia` | Orientações e boas práticas. |
| `referencia` | Tabelas e materiais de consulta. |
| `relatorio` | Documentação de um relatório. |

## Organizando projetos grandes

Em sistemas grandes (como o SAA ERP), organize em **camadas**: Projeto → Área → Módulo →
Tela. A chave é dar um `index.md` para **cada pasta**.

::callout{type="tip" title="Toda pasta com index.md"}
Quando uma pasta tem `index.md`, o título dela na barra lateral vira um **link** (com uma
página-hub própria) e pode ser expandido/retraído. Sem `index.md`, ela é só um rótulo.
Em projetos grandes, **sempre** crie o `index.md` de cada área e módulo.
::

No `index.md` de uma área, use o bloco `::doc-overview` (sem nada dentro). Ele lista
**sozinho** as páginas-filhas como cards — criou um arquivo abaixo, ele aparece aqui:

```md
---
title: Módulos
icon: lucide:boxes
---

Texto de abertura…

::doc-overview
::
```

## Componentes de leitura

Para deixar manuais fáceis de ler, use estes blocos dentro do Markdown.

### Avisos

```md
::callout{type="warning" title="Atenção"}
Confira a data antes de confirmar.
::
```

::callout{type="warning" title="Atenção"}
Confira a data antes de confirmar. Tipos disponíveis: `note`, `tip`, `info`, `warning`,
`danger`.
::

### Passo a passo

```md
::steps
1. Primeiro passo.
2. Segundo passo.
3. Terceiro passo.
::
```

::steps
1. Primeiro passo.
2. Segundo passo.
3. Terceiro passo.
::

### Campos de tela

Note os **três** dois-pontos no `:::fields` (o bloco "pai" precisa de mais dois-pontos que
os filhos `::field`).

```md
:::fields
  ::field{name="CNPJ" type="texto" required}
  Documento do cliente.
  ::
:::
```

## Buscar e navegar

- **Busca:** clique em *Buscar* no topo ou aperte **Ctrl + K** para achar qualquer assunto.
- **Barra lateral:** clique no título de uma seção para abrir o hub dela; use a **seta**
  para expandir ou retrair.
- **Trocar de projeto:** use o seletor no topo da barra lateral.

## Publicar as alterações

Os arquivos `.md` ficam no repositório do projeto. Depois de adicionar ou editar:

::steps
1. Salve os arquivos `.md`.
2. Faça o commit e envie para o repositório.
3. O portal é atualizado no próximo build/publicação.
::

::callout{type="info" title="Ver antes de publicar"}
Para visualizar localmente: rode `npm install` (uma vez) e depois `npm run dev` — o portal
abre em `http://localhost:3000`.
::
