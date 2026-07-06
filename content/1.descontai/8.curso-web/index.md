---
title: "Curso: front-end web com Vue e Nuxt"
description: Um curso completo de front-end web usando o Portal de Empresas do Descontai (Nuxt 4 + Vue 3) como projeto real — de "o que é um front-end" até publicar na nuvem, consumindo a API que você já estudou.
icon: lucide:monitor
navTitle: Curso Web (Vue/Nuxt)
type: curso
---

Você já estudou o **back-end** ([Curso da API](../6.curso)) e o **app mobile**
([Curso do App](../7.curso-app)). Falta a terceira frente do Descontai: os **portais web**. Neste
curso, a gente pega o **Portal de Empresas** — feito em **Nuxt 4 + Vue 3**, rodando de verdade — e
destrincha ele inteiro: de "o que é um front-end" até publicar na nuvem.

É o mesmo produto, a mesma honestidade: nada é inventado para a aula. E o melhor — o que você
aprender aqui vale para os **três portais** do Descontai (Empresas, Admin e Web), porque todos usam a
mesma stack.

::callout{type="note" title="A terceira ponta do ecossistema"}
A API **serve** os dados; o app mobile os **consome** no celular; os **portais web** os consomem no
navegador. São clientes diferentes do mesmo cérebro. Neste curso, toda vez que o portal fizer um
`POST /auth/login` ou um `GET /produtos`, lembre: do outro lado está o código que você estudou no
curso da API. Ver as três pontas é enxergar um sistema inteiro — e isso é raro.
::

::callout{type="tip" title="Para quem é este curso"}
Para o **dev júnior** que quer aprender **front-end web moderno de verdade**. Você já viu lógica de
programação e, de preferência, passou pelos cursos da API e do app (ajuda, mas não é obrigatório).
Você **não precisa** saber Vue, Nuxt nem TypeScript — a gente começa do "o que é HTML" e vai até o
deploy na nuvem.
::

## O que você vai aprender

- **O que é um front-end web** e como ele conversa com a API (SPA, cliente da API, os portais).
- **A base**: HTML, CSS e JavaScript/TypeScript na medida certa para entender o Vue.
- **Vue e Nuxt**: o que é um framework, o que é um meta-framework, e os componentes Single-File.
- **Anatomia de um projeto Nuxt**: pastas, `package.json`, `nuxt.config`, e as convenções mágicas.
- **Componentes e props**: `<script setup>`, `defineProps`, montar peças reutilizáveis.
- **Reatividade**: `ref`, `computed` e as diretivas do template (`v-if`, `v-for`, `v-model`…).
- **Estilo**: CSS com escopo e um design system com variáveis.
- **Roteamento por arquivos** e **layouts** — como o Nuxt vira URLs a partir de pastas.
- **Middleware e proteção de rotas** — o guard que barra telas sem login.
- **Composables e estado compartilhado** com `useState` — o coração da reatividade do Nuxt.
- **Falar com a API**: `$fetch`, `runtimeConfig` e a camada `useApi`.
- **Autenticação**: JWT, sessão em `localStorage`, `useAuth`.
- **CRUD completo**: listar, criar, editar e remover, com comunicação entre componentes.
- **UX**: estados de carregamento, skeletons, toasts e tratamento de erro.
- **Mock mode**: desenvolver o front sem depender do back pronto.
- **Entrega**: build, SPA x SSR e deploy na nuvem (Cloudflare Pages).

## Como o curso está organizado

São **5 partes**, do conceito ao portal publicado. Cada aula usa o código **real** do Portal de
Empresas. Estude na ordem: cada uma apoia a próxima.

::doc-overview
::

::callout{type="tip" title="Como estudar"}
Leia a aula e depois **abra o arquivo real** citado nela (ex.: `app/composables/useApi.ts`). Melhor
ainda: rode o portal com `npm run dev` e mexa nas telas — o Nuxt recarrega na hora. Em front-end, ver
a mudança no navegador instantaneamente é o que faz o conceito grudar.
::

## O projeto que vamos estudar

O **Portal de Empresas** é a ferramenta das **empresas parceiras**: cada empresa faz login e
gerencia seus cupons, vê quem resgatou (resgates), acompanha o faturamento estimado e exporta
relatórios. É feito em **Nuxt 4 + Vue 3** (TypeScript), **sem bibliotecas de UI externas** (design
system próprio), e conversa com a **API REST** por HTTP.

Um detalhe esperto que vamos explorar: o portal roda em **modo demonstração** (dados de exemplo) sem
precisar da API no ar — o que o torna perfeito para estudar. Bora começar pelo **Módulo 1**.
