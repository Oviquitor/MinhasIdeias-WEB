---
title: "Guia: Site institucional (Web)"
description: Um guia curto do site de marketing do Descontai — mesma stack Nuxt/Vue do curso web, focando no que ele tem de diferente: SSR/SEO em vez de SPA, sem login/API, e o foco em conversão.
icon: lucide:megaphone
navTitle: Guia Web
type: guia
---

Este é um **guia curto**, não um curso. O site institucional do Descontai usa a **mesma stack** do
curso web (Nuxt 4 + Vue 3), então tudo que você aprendeu no
[Curso de front-end web](../8.curso-web) — componentes, reatividade, rotas por arquivo, CSS/design
system — vale aqui. A diferença é o **tipo** de site: enquanto os portais (Empresas, Admin) são
**painéis atrás de login**, este é um **site público de marketing**. E isso muda algumas decisões
importantes.

::callout{type="note" title="Pré-requisito"}
Faça primeiro o [Curso de front-end web (Vue/Nuxt)](../8.curso-web). Este guia cobre **só as
diferenças** de um site institucional em relação a um portal.
::

## O que este site é

O site tem **objetivo comercial**: converter visitantes. Três páginas:

| Página | Rota | Objetivo |
|---|---|---|
| **Para você** | `/` | Converter visitantes em **assinantes** |
| **Para empresas** | `/empresas` | Converter empresas em **parceiras** |
| **Sobre** | `/sobre` | Institucional |

Repare no que **não** tem: login, sessão, `useApi`, `useAuth`, store, CRUD. Um site de marketing é
**conteúdo + conversão** — ele não gerencia dados do usuário, ele **convence** o usuário a agir
(baixar o app, virar parceiro). Isso simplifica muita coisa e muda o foco.

## As diferenças que importam

Como a stack é a mesma, só duas coisas realmente distinguem este site — e cada uma é uma página deste
guia:

::doc-overview
::

::callout{type="tip" title="O que você já sabe se aplica"}
Componentes (`SiteHeader`, `SiteFooter`), rotas por arquivo (`pages/`), layout (`default.vue`), CSS
com variáveis do design system, `<script setup>` — é **tudo igual** ao curso web. A stack não muda;
muda o **objetivo** (marketing, não gestão) e o **modo de renderização** (SSR/SEO, não SPA). Foque
nessas duas diferenças.
::

Comece pela mais estrutural: **por que um site de marketing usa SSR/SEO em vez de SPA**.
