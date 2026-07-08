---
title: Descontai
description: Clube de descontos por assinatura — cupons em estabelecimentos parceiros, app Flutter e API em produção.
icon: lucide:ticket-percent
project:
  name: Descontai
  tagline: Clube de descontos · em produção
  icon: lucide:ticket-percent
---

**Descontai** é um clube de descontos por assinatura: o usuário assina um plano e
desbloqueia cupons de estabelecimentos parceiros, resgatados presencialmente por
código ou QR. É o produto **mais maduro** do portfólio — já tem app (Flutter) e
API (Spring Boot) rodando.

Aqui fica reunido tudo: a **visão do produto**, a documentação do **aplicativo** e da **API**,
e — o mais especial — uma **Academia** completa que ensina a construir um sistema de verdade,
do zero, usando cada projeto real do Descontai como material de estudo.

::doc-overview
::

## 🎓 Academia Descontai — a trilha de aprendizado

Além da documentação, o Descontai virou um **curso de desenvolvimento full-stack** pensado para o
**dev júnior** que quer aprender como o software é feito no mercado — não com projetinhos de mentira,
mas com os **cinco projetos reais** que formam o produto. Cada peça (o cérebro, os clientes, os
portais) tem seu material, e todos se amarram: você vê o mesmo token nascer no back-end e ser usado
no app e no site; a mesma regra viver na API e refletir em três telas diferentes.

::callout{type="tip" title="Estude nesta ordem"}
A trilha foi desenhada para ser percorrida de cima para baixo: o back-end primeiro (o cérebro), depois
os clientes que o consomem. Cada etapa reaproveita conceitos da anterior. Você **não** precisa saber
nada de antemão além de lógica básica de programação.
::

::steps
### 1. Curso da API — o cérebro (back-end)
Java + Spring Boot, de "o que é uma API?" (HTTP, REST, JSON) até deploy, CI/CD, Redis e escala para
10 mil usuários. **22 aulas.** É a base de tudo — comece aqui.
👉 [Abrir o Curso da API](curso)

### 2. Curso do App — o cliente mobile (Flutter)
Constrói o app que o assinante usa: widgets, estado, navegação, consumo da API, segurança no
aparelho, push e publicação nas lojas. **18 aulas.**
👉 [Abrir o Curso do App](curso-app)

### 3. Curso Web — o front-end (Vue + Nuxt)
A base do desenvolvimento web moderno, usando o Portal de Empresas: componentes, reatividade, rotas,
estado, API, autenticação, CRUD e deploy. **16 aulas.** Serve para os três portais.
👉 [Abrir o Curso Web](curso-web)

### 4. Guia do Admin — a operação
Guia curto (assume o Curso Web) do painel administrativo: store central, catálogo de rotas e os
padrões de operações sensíveis (auditoria, moderação, manutenção). **3 páginas.**
👉 [Abrir o Guia do Admin](guia-admin)

### 5. Guia Web — o site institucional
Guia curto do site de marketing: SSR/SEO em vez de SPA, e a anatomia de uma landing de conversão com
diretiva de animação. **2 páginas.**
👉 [Abrir o Guia Web](guia-web)
::

| Etapa | Projeto real | Stack | Formato |
|-------|--------------|-------|---------|
| 1. API | Descontai-API | Java · Spring Boot · PostgreSQL | Curso (22 aulas) |
| 2. App | Descontai-APP | Flutter · Dart | Curso (18 aulas) |
| 3. Web | Descontai-Empresas | Nuxt 4 · Vue 3 | Curso (16 aulas) |
| 4. Admin | Descontai-Admin | Nuxt 4 · Vue 3 | Guia curto (3) |
| 5. Site | Descontai-WEB | Nuxt 4 · Vue 3 | Guia curto (2) |

::callout{type="note" title="Ao final da trilha"}
Quem percorre tudo sai enxergando o **sistema inteiro** — do banco de dados ao botão "baixar o app" —
e sabendo **construir o seu próprio** do zero à produção. Cada curso termina com um roteiro prático
para você aplicar o que aprendeu num projeto seu. É o repertório de um dev que entende o todo, não só
o próprio pedaço.
::

::callout{type="note" title="Status do produto"}
Produto **em produção / evolução**. A visão completa virou três páginas; o app e a API
têm suas próprias áreas com a documentação técnica real do código.
::
