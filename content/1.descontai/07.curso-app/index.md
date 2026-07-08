---
title: "Curso: construindo o app mobile com Flutter"
description: Um curso completo de desenvolvimento mobile usando o app do Descontai (Flutter) como projeto real — de "o que é um app" até publicar nas lojas, consumindo a API que você já estudou.
icon: lucide:smartphone
navTitle: Curso do App
type: curso
---

Você já estudou o **back-end** do Descontai no [Curso da API](../curso). Agora vamos para o
outro lado do balcão: o **aplicativo** que o usuário segura na mão. É o mesmo produto, a mesma
honestidade — pegamos o **app Flutter de verdade, que está nas lojas**, e destrinchamos ele
inteiro: da primeira tela até o dia da publicação.

Se no curso da API você aprendeu a **servir** os dados, aqui você aprende a **consumir e mostrar**
esses dados numa interface bonita, rápida e segura, rodando no celular de milhares de pessoas.

::callout{type="note" title="A dupla que forma o ecossistema"}
O app e a API são **parceiros**. A API guarda os dados e aplica as regras; o app pede esses dados e
os transforma em telas. Ao longo do curso, toda vez que o app fizer um `POST /auth/login` ou um
`GET /produtos`, lembre: **do outro lado está exatamente o código que você já estudou no curso da
API.** Ver as duas pontas é o que te faz enxergar um sistema inteiro — e isso é raro.
::

::callout{type="tip" title="Para quem é este curso"}
Para o **dev júnior** que quer aprender **desenvolvimento mobile de verdade**. Você já viu lógica de
programação (variável, `if`, função) e, de preferência, já passou pelo curso da API (ajuda, mas não
é obrigatório). Você **não precisa** saber Flutter, Dart nem nada de mobile — a gente começa do
"o que é um widget" e vai até publicar na Play Store.
::

## O que você vai aprender

- **O que é um app mobile** e como ele conversa com a API (nativo x cross-platform, e onde o Flutter entra).
- **Flutter e Dart do zero**: widgets, "tudo é widget", hot reload, a linguagem Dart na medida certa.
- **Anatomia de um projeto Flutter**: o `pubspec.yaml`, a pasta `lib/`, as dependências e o código gerado.
- **Construir interfaces**: widgets Stateless e Stateful, layout, tema Material 3, telas responsivas.
- **Navegação** com GoRouter — rotas, parâmetros e **guards de sessão** (quem pode abrir cada tela).
- **Gerenciamento de estado** com Provider e `ChangeNotifier` — o coração da reatividade do app.
- **Arquitetura em camadas** no mobile (Page → Controller → UseCase → Repository → Service → Dio).
- **Falar com a API**: o cliente HTTP Dio, interceptors, envio do token, tratamento de erro.
- **Modelos e JSON**: transformar a resposta da API em objetos Dart de forma segura.
- **Segurança no dispositivo**: token em *secure storage*, biometria, "lembrar login" e refresh token.
- **Notificações push** com Firebase Cloud Messaging.
- **Fluxos reais**: login, cidade, cupons, assinatura e pagamento (Pix e cartão).
- **Qualidade e resiliência**: erros amigáveis, estados de carregamento, offline e Crashlytics.
- **Entrega**: build de produção, assinatura do app e publicação na Play Store e App Store.

## Como o curso está organizado

São **5 partes**, do conceito ao app publicado. Cada aula usa o código **real** do Descontai-APP
como exemplo — nada é inventado para a aula. Estude na ordem: cada uma apoia a próxima.

::doc-overview
::

::callout{type="tip" title="Como estudar"}
Leia a aula e depois **abra o arquivo real do app** citado nela (ex.:
`lib/core/network/dio_client.dart`). Melhor ainda: rode o app na sua máquina com `flutter run` e
use o **hot reload** para mexer, quebrar e consertar. Em mobile, ver a tela mudar na hora é o que
faz o conceito grudar.
::

## O app que vamos estudar

O **Descontai-APP** é o aplicativo do assinante: ele faz login, mostra os cupons da cidade do
usuário, deixa usar o cupom no balcão (por código ou QR), gerencia a assinatura, o histórico de
economia, indicações, notificações e perfil. É feito em **Flutter** (uma base de código, roda em
Android e iOS), fala com a **API REST** por HTTP, e usa **Firebase** para push e monitoramento.

Ao final, cada uma dessas peças vai ter deixado de ser um mistério e virado conhecimento seu.
Bora começar pelo **Módulo 1 — o que é um app e como ele conversa com a API**.

::callout{type="note" title="Faz parte da Academia Descontai"}
Este é o **passo 2** da [trilha completa](../): o passo 1 é o [Curso da API](../curso) (o back-end
que este app consome). Depois vêm o [Curso Web](../curso-web) e os guias do
[Admin](../guia-admin) e do [Site](../guia-web). Não é obrigatório ter feito a API antes, mas
ajuda muito — várias aulas aqui citam "do outro lado está o código da API".
::
