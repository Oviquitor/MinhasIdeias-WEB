---
title: "Guia: Portal Admin"
description: Um guia curto do Portal Admin do Descontai — mesma stack Nuxt/Vue do curso web, focando só no que ele tem de diferente: store central, catálogo de rotas, auditoria e o poder da operação.
icon: lucide:shield-half
navTitle: Guia Admin
type: guia
---

Este **não** é um curso completo — é um **guia curto**. O Portal Admin usa **exatamente a mesma
stack** do Portal de Empresas (Nuxt 4 + Vue 3), então tudo que você aprendeu no
[Curso de front-end web](../8.curso-web) vale aqui: componentes, reatividade, rotas por arquivo,
middleware, composables, `useApi`, `useAuth`, mock mode. Se você ainda não fez aquele curso,
**comece por ele** — este guia assume que você já o conhece.

::callout{type="note" title="Pré-requisito"}
Faça primeiro o [Curso de front-end web (Vue/Nuxt)](../8.curso-web). Este guia cobre **só as
diferenças** do Admin em relação ao Empresas, para você não reaprender a stack do zero.
::

## O que muda no Admin

O Portal de Empresas é a ferramenta de **um** parceiro cuidando dos **próprios** cupons. O Portal
Admin é o **painel de controle da operação inteira** — a equipe do Descontai governando tudo:

| Área | O que o admin faz |
|---|---|
| **Dashboard** | KPIs, receita, pagamentos pendentes, ranking de parceiros |
| **Empresas / Usuários** | Listar, filtrar e **mudar status** (ativar/pausar/**bloquear**) |
| **Cupons** | Ativar/pausar, **exibir/ocultar no app**, marcar destaque |
| **Pagamentos** | **Aprovar/recusar** assinaturas manualmente |
| **Notificações** | Compor push, enviar por **segmento**, ver histórico |
| **Suporte** | Chamados com thread de conversa + reclamações |
| **Status do App** | **Liga/desliga o app (manutenção)**, saúde, **feature flags** |
| **Auditoria** | Histórico de **todas** as ações administrativas |
| **Catálogo & Config** | Planos, categorias, cidades, versão mínima, banner |

Repare no peso: bloquear um usuário, aprovar um pagamento, **colocar o app inteiro em manutenção**.
Com esse poder vêm padrões que o Empresas não precisava — e são exatamente esses que este guia cobre.

## As três diferenças que importam

Como a stack é a mesma, só três coisas realmente distinguem o Admin — e cada uma é uma página deste
guia:

::doc-overview
::

::callout{type="tip" title="O resto você já sabe"}
Login, guard de rotas (`auth.global.ts`), `useApi`, `useToast`, layouts, componentes, mock mode — é
**tudo igual** ao Empresas (o Admin usa `NUXT_PUBLIC_USE_MOCK` no lugar de `NUXT_PUBLIC_MOCK_MODE`, e
`useMock` no `useApi`, mas a ideia é idêntica). Se algo aqui parecer familiar, é porque é. Foque nas
três diferenças; o resto está no curso web.
::

Comece pela maior diferença: **o store central** (`useStore`).
