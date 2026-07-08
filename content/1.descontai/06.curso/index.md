---
title: "Curso: Construindo uma API do zero aos 10 mil usuários"
description: Um curso completo de backend usando a API do Descontai como projeto real — de "o que é uma API?" até deploy em produção que aguenta 10 mil usuários.
icon: lucide:graduation-cap
type: curso
---

Bem-vindo ao curso mais honesto que você vai encontrar sobre **como se constrói uma
API de verdade** — não um "hello world" que morre no `localhost`, mas o backend real
de um produto que está **em produção**: o **Descontai**.

Chega de cursos que ensinam só o básico e escondem como o desenvolvimento acontece no
mundo real. Aqui a gente vai abrir o capô de uma API que já roda, já tem usuários pagando,
já passa por um pipeline de CI/CD e já foi preparada para escalar até **10 mil usuários**.
Cada peça que você vê aqui existe no código de verdade — nada é inventado para a aula.

::callout{type="tip" title="A promessa deste curso"}
Se você estudar até o fim, você sai daqui **sabendo construir a sua própria API do zero**,
com arquitetura profissional, autenticação, banco de dados, testes, deploy e escala — e
entendendo **por que** cada decisão foi tomada, não só *como* copiar código.
::

## Para quem é este curso

Foi escrito pensando no **dev júnior** que está entrando na área:

- Você tem **noção básica de programação** (sabe o que é uma variável, um `if`, uma função).
- Você **nunca construiu uma API** de verdade e não sabe como funciona programar no mercado.
- Você já ouviu falar de Git, Docker, Redis, CI/CD… mas nunca entendeu direito **para que servem**.

Não tem problema nenhum não saber Java a fundo, nem Spring, nem banco de dados. A gente
começa do começo, com linguagem simples, analogias do dia a dia e exemplos fáceis. Onde o
assunto for complexo, a gente destrincha até ficar óbvio.

::callout{type="info" title="Por que Java e Spring Boot?"}
Porque é o que o Descontai usa e é uma das stacks mais pedidas no mercado corporativo.
Mas fica tranquilo: **os conceitos deste curso valem para qualquer linguagem**. Uma vez
que você entende o que é uma rota, um token JWT, uma migration ou um pipeline de CI/CD,
você reconhece isso em Node, Python, C#, Go — muda a sintaxe, não a ideia.
::

## Como o curso está organizado

São **8 partes**, do conceito mais básico ao deploy em produção — e uma parte final,
avançada, sobre o que existe além do monolito. Cada aula usa o código real do Descontai como
exemplo. Estude na ordem — cada aula apoia a próxima.

### Parte 1 — Fundamentos: o que é uma API e como a web funciona
1. **O que é uma API e como a internet funciona** — cliente e servidor, HTTP, JSON, REST, e onde o Descontai se encaixa.
2. **As ferramentas do dev backend e o fluxo do mercado** — Java, Maven, IDE, Postman, e o dia a dia de um time (Git, GitHub, Pull Request, code review).
3. **Anatomia de um projeto Spring Boot** — a estrutura de pastas, o `pom.xml`, as configurações e como a aplicação "sobe".

### Parte 2 — Arquitetura e código profissional
4. **Arquitetura em camadas (Clean Architecture)** — por que separar o código em domínio, aplicação, infraestrutura e API.
5. **O domínio: entidades e banco de dados** — como as tabelas viram objetos (JPA), o PostgreSQL e o padrão Repository.
6. **A anatomia de uma rota, ponta a ponta** — Controller → UseCase → Service → Repository, DTOs, validação e o fluxo real de uma requisição.
7. **Autenticação e segurança** — senha com BCrypt, token JWT, o filtro que protege a API, papéis (roles) e refresh token.
8. **Regras de negócio, erros e integrações externas** — tratamento de erro profissional, pagamento (Asaas), push (Firebase) e trabalho assíncrono.

### Parte 3 — Banco de dados a sério
9. **Migrations com Flyway** — versionar o banco como se versiona código, e o caso real de fazer a API "subir do zero".
10. **Performance de banco: índices, N+1 e streaming** — o caso real de um relatório que podia derrubar o servidor.

### Parte 4 — Qualidade e automação (DevOps)
11. **Testes automatizados** — testes unitários (Mockito) e de integração (Testcontainers): o que testar e por quê.
12. **CI/CD com GitHub Actions** — o pipeline que valida cada mudança, e a história real de um CI que estava quebrado o tempo todo.
13. **Docker e containers** — o que é um container, o `Dockerfile` e por que isso acabou com o "na minha máquina funciona".

### Parte 5 — Do 1 usuário aos 10 mil (escala)
14. **Como uma API aguenta carga** — pool de conexões, threads, o que satura primeiro e como dimensionar.
15. **Cache e Rate Limiting (e o que é Redis)** — deixar a API rápida e protegida, com Caffeine na memória ou Redis distribuído.

### Parte 6 — Produção
16. **Deploy na nuvem (DigitalOcean)** — colocar a API no ar, banco gerenciado, segredos, variáveis de ambiente e health checks.
17. **Observabilidade e teste de carga** — enxergar o que acontece em produção (métricas, logs) e provar os 10 mil com o k6.

### Parte 7 — Fechamento
18. **Padrões, boas práticas e o seu próximo passo** — as convenções do projeto e um roteiro para você construir a *sua* API do zero.

### Parte 8 — O horizonte: além do monolito (avançado)
Uma parte extra, mais conceitual, sobre as tecnologias que os sistemas encontram quando crescem —
e, principalmente, **quando você realmente precisa delas** (o Descontai deliberadamente não usa a
maioria, e isso é uma decisão certa). Ideal depois de dominar as 18 primeiras aulas.

19. **Filas de mensagens** — RabbitMQ/Kafka/SQS, e por que o `@Async` do Descontai ainda basta.
20. **Monolito x microsserviços** — o custo escondido dos microsserviços e por que o monolito está certo.
21. **Kubernetes e orquestração** — o que o k8s resolve, e por que um PaaS basta para o Descontai.
22. **Observabilidade profunda** — os três pilares (logs, métricas, traces), tracing distribuído e SLO/SLI.

::doc-overview
::

## Como estudar

::steps
### Leia na ordem
Cada aula assume o que foi visto antes. Pular etapas vai deixar buracos.

### Abra o código junto
Sempre que uma aula citar um arquivo (ex.: `SecurityConfig.java`), abra o arquivo real no
repositório do Descontai e leia o código com a explicação ao lado. É assim que se aprende
a ler código de verdade.

### Não decore — entenda o "porquê"
O objetivo não é copiar. É entender a decisão. Quando você entende *por que* a assinatura é
stateless, ou *por que* existe uma camada de use cases, você consegue recriar isso sozinho.

### Refaça com as suas mãos
No fim, tente construir uma API sua, mesmo que simples, aplicando o que aprendeu. A última
aula te dá um roteiro para isso.
::

::callout{type="note" title="Sobre o Descontai"}
O **Descontai** é um clube de descontos por assinatura: o usuário paga um plano e desbloqueia
cupons de estabelecimentos parceiros. Tem um **app** (Flutter), **portais web** (Empresas e
Admin) e a **API** (Java + Spring Boot) que conversa com todos eles. É essa API que vamos
dissecar, do primeiro `if` até os 10 mil usuários.
::

::callout{type="tip" title="Este é o passo 1 da Academia Descontai"}
Este curso é a **base** de uma trilha maior. Depois de dominar o back-end aqui, os clientes que o
consomem ganham cursos próprios: o [Curso do App (Flutter)](../curso-app), o
[Curso Web (Vue/Nuxt)](../curso-web) e os guias do [Admin](../guia-admin) e do
[Site](../guia-web). Comece pelo cérebro; os clientes fazem mais sentido depois.
::

Pronto? Então vamos começar entendendo **o que é uma API e como a internet funciona por baixo
dos panos**. Aula 1 te espera. 🚀
