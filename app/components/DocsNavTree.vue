<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const props = defineProps<{ items: ContentNavigationItem[]; depth?: number }>()

const route = useRoute()
const isActive = (path: string) => decodeURIComponent(route.path) === path

function containsActive(item: ContentNavigationItem): boolean {
  if (item.children?.length) return item.children.some(containsActive)
  return isActive(item.path)
}

// Estado aberto/fechado das seções, compartilhado entre todos os níveis e com o
// botão "expandir/recolher tudo". Ausência da chave = aberta (padrão).
const openState = useSidebarSections()

const isOpen = (item: ContentNavigationItem) => openState.value[item.path] !== false
const toggle = (item: ContentNavigationItem) => {
  openState.value[item.path] = !isOpen(item)
}

// Garante que a seção da página atual fique aberta ao navegar.
watch(
  () => route.path,
  () => {
    for (const it of props.items) {
      if (it.children?.length && containsActive(it)) openState.value[it.path] = true
    }
  },
)
</script>

<template>
  <ul class="space-y-0.5">
    <li v-for="item in items" :key="item.path">
      <!-- Seção (pasta com filhos) — cabeçalho expansível -->
      <template v-if="item.children && item.children.length">
        <div class="mb-1 mt-4 flex items-center gap-0.5">
          <!-- Pasta COM index.md → link para o hub da área. Sem → só rótulo. -->
          <NuxtLink
            v-if="(item as any).page !== false"
            :to="item.path"
            class="group flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] transition"
            :class="
              isActive(item.path)
                ? 'text-brand-300'
                : 'text-fg-subtle hover:text-fg-muted'
            "
          >
            <Icon
              v-if="(item as any).icon || getDocType((item as any).type)"
              :name="(item as any).icon || getDocType((item as any).type)!.icon"
              class="h-3.5 w-3.5 shrink-0"
              :style="getDocType((item as any).type) ? { color: getDocType((item as any).type)!.color } : { color: 'var(--color-brand-500)' }"
            />
            <span class="truncate">{{ item.title }}</span>
          </NuxtLink>
          <span
            v-else
            class="flex min-w-0 flex-1 items-center gap-2 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle"
          >
            <Icon
              v-if="(item as any).icon"
              :name="(item as any).icon"
              class="h-3.5 w-3.5 shrink-0 text-brand-500"
            />
            <span class="truncate">{{ item.title }}</span>
          </span>

          <button
            type="button"
            class="grid h-6 w-6 shrink-0 place-items-center rounded-md text-fg-subtle transition hover:bg-black/5 hover:text-fg-muted"
            :aria-label="isOpen(item) ? 'Retrair' : 'Expandir'"
            @click="toggle(item)"
          >
            <Icon
              name="lucide:chevron-down"
              class="h-3.5 w-3.5 transition-transform duration-200"
              :class="isOpen(item) ? '' : '-rotate-90'"
            />
          </button>
        </div>

        <div
          class="grid transition-all duration-200 ease-out"
          :style="{ gridTemplateRows: isOpen(item) ? '1fr' : '0fr' }"
        >
          <div class="overflow-hidden">
            <!-- Linha-guia em todos os níveis: mostra a quem cada item pertence
                 (Pasta → Subpasta → Arquivos). -->
            <div class="ml-3.5 border-l border-line pl-1">
              <DocsNavTree
                :items="item.children!.filter((c) => c.path !== item.path)"
                :depth="(depth ?? 0) + 1"
              />
            </div>
          </div>
        </div>
      </template>

      <!-- Página (link) -->
      <NuxtLink
        v-else
        :to="item.path"
        class="group relative flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm transition"
        :class="
          isActive(item.path)
            ? 'bg-brand-500/12 font-medium text-fg'
            : 'text-fg-muted hover:bg-black/5 hover:text-fg'
        "
      >
        <span
          v-if="isActive(item.path)"
          class="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-brand-400"
        />
        <Icon
          v-if="(item as any).icon || getDocType((item as any).type)"
          :name="(item as any).icon || getDocType((item as any).type)!.icon"
          class="h-4 w-4 shrink-0"
          :class="
            (item as any).icon && isActive(item.path)
              ? 'text-brand-400'
              : (item as any).icon
                ? 'text-fg-subtle group-hover:text-fg-muted'
                : ''
          "
          :style="
            !(item as any).icon && getDocType((item as any).type)
              ? { color: getDocType((item as any).type)!.color }
              : undefined
          "
        />
        <span class="truncate">{{ item.title }}</span>
        <span
          v-if="(item as any).badge"
          class="ml-auto rounded-md border border-brand-500/40 bg-brand-500/10 px-1.5 py-0.5 text-[10px] font-medium text-brand-300"
        >
          {{ (item as any).badge }}
        </span>
      </NuxtLink>
    </li>
  </ul>
</template>
