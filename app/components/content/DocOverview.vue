<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

// Componente MDC: use `::doc-overview` em qualquer index.md para listar
// automaticamente as páginas/áreas-filhas como cards. Mantém-se sozinho:
// criou um arquivo abaixo, ele aparece aqui.
const props = withDefaults(defineProps<{ title?: string }>(), { title: '' })

const route = useRoute()
const { data: nav } = useDocsNavigation()

function findNode(
  items: ContentNavigationItem[],
  path: string,
): ContentNavigationItem | undefined {
  for (const it of items) {
    if (it.path === path) return it
    if (it.children?.length) {
      const found = findNode(it.children, path)
      if (found) return found
    }
  }
}

const node = computed(() =>
  findNode(nav.value ?? [], decodeURIComponent(route.path)),
)

interface CardItem {
  path: string
  title: string
  description?: string
  icon?: string
  type?: string
  isArea: boolean
  count: number
}

function firstLeaf(item: ContentNavigationItem): string {
  if (!item.children?.length) return item.path
  for (const c of item.children) {
    const r = firstLeaf(c)
    if (r) return r
  }
  return item.path
}

function countPages(item: ContentNavigationItem): number {
  if (!item.children?.length) return 1
  return item.children
    .filter((c) => c.path !== item.path) // ignora a auto-referência da index.md
    .reduce((n, c) => n + countPages(c), 0)
}

const items = computed<CardItem[]>(() =>
  (node.value?.children ?? [])
    // Remove a auto-referência da própria index.md (mesmo path da página atual).
    .filter((c) => c.path !== node.value?.path)
    .map((c) => {
    const isArea = !!c.children?.length
    return {
      path: isArea ? firstLeaf(c) : c.path,
      title: c.title,
      description: (c as any).description,
      icon: (c as any).icon,
      type: (c as any).type,
      isArea,
      count: isArea ? countPages(c) : 0,
    }
  }),
)
</script>

<template>
  <div class="not-prose my-6">
    <h2
      v-if="title"
      class="mb-4 font-display text-lg font-bold text-fg"
    >
      {{ title }}
    </h2>

    <div v-if="items.length" class="grid gap-3 sm:grid-cols-2">
      <NuxtLink
        v-for="item in items"
        :key="item.path"
        :to="item.path"
        class="card group flex items-start gap-3 p-4"
      >
        <span
          class="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink-700 ring-1 ring-line"
        >
          <Icon
            :name="item.icon || (item.isArea ? 'lucide:folder' : getDocType(item.type)?.icon || 'lucide:file-text')"
            class="h-5 w-5"
            :style="{ color: getDocType(item.type)?.color || 'var(--color-brand-300)' }"
          />
        </span>

        <span class="min-w-0 flex-1">
          <span class="flex flex-wrap items-center gap-2">
            <span class="font-medium text-fg group-hover:text-brand-300">{{ item.title }}</span>
            <DocTypeBadge v-if="!item.isArea" :type="item.type" size="sm" />
          </span>
          <span
            v-if="item.description"
            class="mt-1 block text-sm leading-relaxed text-fg-muted"
          >
            {{ item.description }}
          </span>
          <span
            v-if="item.isArea"
            class="mt-2 flex items-center gap-1.5 text-xs text-fg-subtle"
          >
            <Icon name="lucide:layers" class="h-3.5 w-3.5" />
            {{ item.count }} {{ item.count === 1 ? 'documento' : 'documentos' }}
          </span>
        </span>

        <Icon
          name="lucide:arrow-up-right"
          class="h-4 w-4 shrink-0 text-fg-subtle transition group-hover:translate-x-0.5 group-hover:text-brand-300"
        />
      </NuxtLink>
    </div>

    <p v-else class="text-sm text-fg-subtle">
      Nenhum documento nesta seção ainda.
    </p>
  </div>
</template>
