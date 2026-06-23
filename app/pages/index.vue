<script setup lang="ts">
definePageMeta({ public: true, layout: 'default' })

const { isAuthenticated } = useAuth()

const features = [
  {
    icon: 'lucide:lightbulb',
    emoji: '💡',
    title: 'Toda ideia tem um lugar',
    desc: 'Aquele estalo de gênio às 3 da manhã não some mais. Cada ideia ganha sua própria página.',
  },
  {
    icon: 'lucide:rocket',
    emoji: '🚀',
    title: 'Do papel pra prática',
    desc: 'Transforme rabiscos soltos em projetos de verdade, organizados e prontos pra executar.',
  },
  {
    icon: 'lucide:layers',
    emoji: '🗂️',
    title: 'Seus produtos, no capricho',
    desc: 'Cada produto vira um espaço próprio, com seções e páginas. Bagunça mental, nunca mais.',
  },
  {
    icon: 'lucide:search',
    emoji: '🔎',
    title: 'Acha tudo num piscar',
    desc: 'Ctrl + K e pronto: qualquer ideia, projeto ou anotação na palma da mão.',
  },
]
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <!-- Enfeites flutuantes de sonho -->
    <span class="pointer-events-none absolute left-[6%] top-32 animate-float text-5xl opacity-80 [animation-delay:0.5s]">⭐</span>
    <span class="pointer-events-none absolute right-[8%] top-44 animate-float text-4xl opacity-80 [animation-delay:1.4s]">🚀</span>
    <span class="pointer-events-none absolute left-[14%] bottom-40 animate-float text-4xl opacity-70 [animation-delay:2.1s]">💭</span>
    <span class="pointer-events-none absolute right-[16%] bottom-56 animate-float text-5xl opacity-70 [animation-delay:0.9s]">✨</span>

    <!-- Nav -->
    <header class="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
      <AppLogo />
      <div class="flex items-center gap-3">
        <span class="pill hidden px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-fg-muted sm:block">
          ✨ chega de deixar pra depois
        </span>
        <NuxtLink
          :to="isAuthenticated ? '/docs' : '/login'"
          class="focus-ring flex h-10 items-center gap-2 rounded-full border-2 border-line-strong bg-ink-850/60 px-4 text-sm font-bold text-fg transition hover:border-brand-400"
        >
          <Icon name="lucide:log-in" class="h-4 w-4" />
          {{ isAuthenticated ? 'Entrar no meu mundo' : 'Entrar' }}
        </NuxtLink>
      </div>
    </header>

    <!-- Hero -->
    <section class="relative z-10 mx-auto max-w-4xl px-6 pt-16 pb-12 text-center sm:pt-24">
      <div
        class="pill animate-fade-up mx-auto mb-7 inline-flex items-center gap-2 px-4 py-1.5 text-xs font-bold text-fg-muted"
      >
        <span class="relative flex h-2 w-2">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-candy-pink opacity-75" />
          <span class="relative inline-flex h-2 w-2 rounded-full bg-candy-pink" />
        </span>
        Seu cantinho pessoal de ideias
      </div>

      <h1
        class="animate-fade-up font-display text-5xl font-bold leading-[1.02] tracking-tight text-fg sm:text-7xl"
        style="animation-delay: 60ms"
      >
        Tira essa ideia
        <span class="bg-gradient-to-r from-candy-pink via-brand-400 to-wheat-400 bg-clip-text text-transparent">
          do papel!
        </span>
      </h1>

      <p
        class="animate-fade-up mx-auto mt-6 max-w-2xl text-lg text-fg-muted"
        style="animation-delay: 120ms"
      >
        Este é o seu lugar pra <strong class="text-fg">organizar suas ideias</strong>, dar forma
        aos seus projetos e cuidar dos produtos que você quer criar. Chega de ideia genial morrendo
        na gaveta — <strong class="text-fg">cria vergonha na cara e bora executar.</strong> 🚀
      </p>

      <div
        class="animate-fade-up mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        style="animation-delay: 180ms"
      >
        <NuxtLink
          to="/docs"
          class="btn-brand focus-ring flex h-12 w-full items-center justify-center gap-2 px-7 text-sm sm:w-auto"
        >
          Bora pras minhas ideias
          <Icon name="lucide:arrow-right" class="h-4 w-4" />
        </NuxtLink>
        <NuxtLink
          to="/login"
          class="focus-ring flex h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-line-strong bg-ink-850/40 px-7 text-sm font-bold text-fg transition hover:border-brand-400 sm:w-auto"
        >
          <Icon name="lucide:key-round" class="h-4 w-4" />
          Fazer login
        </NuxtLink>
      </div>
    </section>

    <!-- Features -->
    <section class="relative z-10 mx-auto max-w-6xl px-6 pb-24">
      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="(f, i) in features"
          :key="f.title"
          class="card animate-fade-up p-5"
          :style="{ animationDelay: `${240 + i * 60}ms` }"
        >
          <span
            class="mb-4 grid h-12 w-12 place-items-center rounded-2xl border-2 border-line-strong bg-brand-500/15 text-2xl"
          >
            {{ f.emoji }}
          </span>
          <h3 class="font-display text-lg font-bold text-fg">{{ f.title }}</h3>
          <p class="mt-1.5 text-sm leading-relaxed text-fg-muted">{{ f.desc }}</p>
        </div>
      </div>

      <!-- Chamado final -->
      <div class="card mt-12 flex flex-col items-center gap-3 px-6 py-10 text-center">
        <span class="text-4xl">🔥</span>
        <h2 class="font-display text-2xl font-bold text-fg sm:text-3xl">
          A melhor hora de começar era ontem. A segunda melhor é agora.
        </h2>
        <p class="max-w-xl text-fg-muted">
          Suas ideias merecem sair da cabeça. Anota, organiza e executa — uma página de cada vez.
        </p>
        <NuxtLink
          to="/docs"
          class="btn-brand focus-ring mt-3 flex h-12 items-center justify-center gap-2 px-7 text-sm"
        >
          Começar agora
          <Icon name="lucide:rocket" class="h-4 w-4" />
        </NuxtLink>
      </div>
    </section>

    <!-- Footer -->
    <footer class="relative z-10 border-t-2 border-dashed border-line py-8">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-center text-xs text-fg-subtle sm:flex-row sm:text-left"
      >
        <p>© {{ new Date().getFullYear() }} Minhas Ideias · feito pra tirar projeto do papel 💜</p>
        <p class="font-mono uppercase tracking-wider">Minhas Ideias · v1.0</p>
      </div>
    </footer>
  </div>
</template>
