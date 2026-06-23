<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const { data: nav } = useDocsNavigation()
const projects = computed(() => buildProjects(nav.value))

function countPages(children: any[]): number {
  let n = 0
  for (const c of children) {
    if (c.children?.length) n += countPages(c.children)
    else n += 1
  }
  return n
}

function firstLeaf(children: any[]): string | undefined {
  for (const c of children) {
    if (c.children?.length) {
      const r = firstLeaf(c.children)
      if (r) return r
    } else if (c.path) return c.path
  }
}
</script>

<template>
  <div class="mx-auto max-w-5xl px-4 py-8 sm:px-10 sm:py-12">
    <div class="mb-10">
      <p class="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-candy-pink">
        ✨ Meu mural de ideias
      </p>
      <h1 class="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
        Minhas ideias e projetos
      </h1>
      <p class="mt-3 max-w-2xl text-fg-muted">
        Escolhe uma ideia pra mergulhar e tirar do papel. Cada projeto é uma pasta
        em <code class="rounded bg-ink-700 px-1.5 py-0.5 text-xs text-wheat-300">/content</code>,
        com suas seções e páginas em Markdown.
      </p>
    </div>

    <div v-if="projects.length" class="grid gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="p in projects"
        :key="p.slug"
        :to="firstLeaf(p.children) ?? p.path"
        class="card group flex flex-col p-6"
      >
        <div class="mb-4 flex items-center gap-3">
          <span
            class="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-brand-500/25 to-brand-700/25 ring-1 ring-brand-500/30"
          >
            <Icon :name="p.icon" class="h-6 w-6 text-brand-300" />
          </span>
          <Icon
            name="lucide:arrow-up-right"
            class="ml-auto h-5 w-5 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-brand-300"
          />
        </div>
        <h2 class="font-display text-xl font-bold text-fg">{{ p.name }}</h2>
        <p v-if="p.tagline" class="mt-1 text-sm text-fg-muted">{{ p.tagline }}</p>
        <p class="mt-4 flex items-center gap-1.5 text-xs text-fg-subtle">
          <Icon name="lucide:file-text" class="h-3.5 w-3.5" />
          {{ countPages(p.children) }} páginas
        </p>
      </NuxtLink>
    </div>

    <div v-else class="card p-10 text-center">
      <Icon name="lucide:folder-open" class="mx-auto mb-3 h-8 w-8 text-fg-subtle" />
      <p class="text-fg-muted">
        Nenhum projeto ainda. Crie uma pasta em
        <code class="rounded bg-ink-700 px-1.5 py-0.5 text-xs text-wheat-300">/content</code>
        e adicione seus arquivos <code class="text-wheat-300">.md</code>.
      </p>
    </div>
  </div>
</template>
