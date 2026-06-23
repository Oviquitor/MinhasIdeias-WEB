<script setup lang="ts">
definePageMeta({ layout: 'docs' })

const route = useRoute()
const path = computed(() => {
  const p = decodeURIComponent(route.path)
  return p.length > 1 ? p.replace(/\/+$/, '') : p
})

const { data: page } = await useAsyncData(`doc-${path.value}`, () =>
  queryCollection('docs').path(path.value).first(),
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Página não encontrada', fatal: true })
}

const { data: surround } = await useAsyncData(`surround-${path.value}`, () =>
  queryCollectionItemSurroundings('docs', path.value, {
    fields: ['title', 'description', 'path'],
  }),
)

// Páginas avulsas (navigation: false, ex.: Manual, Changelog) não fazem parte de
// uma sequência — não mostramos "anterior/próximo" nelas.
const standalone = computed(() => (page.value as any)?.navigation === false)
const prev = computed(() => (standalone.value ? null : surround.value?.[0] ?? null))
const next = computed(() => (standalone.value ? null : surround.value?.[1] ?? null))

const tocLinks = computed(() => (page.value as any)?.body?.toc?.links ?? [])

const crumbs = computed(() =>
  path.value
    .split('/')
    .filter(Boolean)
    .map((seg) => seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())),
)

useHead(() => ({
  title: page.value?.title ? `${page.value.title} · Minhas Ideias` : 'Minhas Ideias',
  meta: page.value?.description ? [{ name: 'description', content: page.value.description }] : [],
}))
</script>

<template>
  <div v-if="page" class="mx-auto flex max-w-7xl gap-8 px-4 py-6 sm:px-10 sm:py-10 lg:gap-10">
    <!-- Conteúdo -->
    <article class="min-w-0 flex-1 pb-16">
      <!-- Breadcrumb -->
      <nav class="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-fg-subtle">
        <NuxtLink to="/docs" class="hover:text-fg-muted">Docs</NuxtLink>
        <template v-for="(c, i) in crumbs" :key="i">
          <Icon name="lucide:chevron-right" class="h-3.5 w-3.5" />
          <span :class="i === crumbs.length - 1 ? 'text-fg-muted' : ''">{{ c }}</span>
        </template>
      </nav>

      <header class="mb-8">
        <DocTypeBadge v-if="(page as any).type" :type="(page as any).type" class="mb-3" />
        <h1 class="font-display text-[1.75rem] font-extrabold leading-tight tracking-tight text-fg sm:text-4xl">
          {{ page.title }}
        </h1>
        <p v-if="page.description" class="mt-3 text-base text-fg-muted sm:text-lg">
          {{ page.description }}
        </p>
      </header>

      <div class="prose-doc">
        <ContentRenderer :value="page" />
      </div>

      <!-- Prev / Next -->
      <nav v-if="prev || next" class="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
        <NuxtLink
          v-if="prev"
          :to="prev.path"
          class="card group flex flex-col p-4"
        >
          <span class="flex items-center gap-1.5 text-xs text-fg-subtle">
            <Icon name="lucide:arrow-left" class="h-3.5 w-3.5" /> Anterior
          </span>
          <span class="mt-1 font-medium text-fg group-hover:text-brand-300">{{ prev.title }}</span>
        </NuxtLink>
        <span v-else />
        <NuxtLink
          v-if="next"
          :to="next.path"
          class="card group flex flex-col p-4 text-right sm:items-end"
        >
          <span class="flex items-center gap-1.5 text-xs text-fg-subtle">
            Próximo <Icon name="lucide:arrow-right" class="h-3.5 w-3.5" />
          </span>
          <span class="mt-1 font-medium text-fg group-hover:text-brand-300">{{ next.title }}</span>
        </NuxtLink>
      </nav>
    </article>

    <!-- TOC -->
    <aside class="hidden w-56 shrink-0 xl:block">
      <div class="sticky top-24">
        <DocToc :links="tocLinks" />
      </div>
    </aside>
  </div>
</template>
