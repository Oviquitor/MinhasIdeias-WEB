<script setup lang="ts">
import type { DocProject } from '~/composables/useDocs'

const props = defineProps<{ projects: DocProject[]; current?: DocProject }>()
const open = ref(false)
const root = ref<HTMLElement | null>(null)
onClickOutside(root, () => (open.value = false))
const router = useRouter()

function pick(p: DocProject) {
  open.value = false
  // Vai para a 1ª página do projeto, ou para a raiz dele.
  const first = firstLeaf(p)
  router.push(first ?? p.path)
}

function firstLeaf(p: DocProject): string | undefined {
  const walk = (items: any[]): string | undefined => {
    for (const it of items) {
      if (it.children?.length) {
        const r = walk(it.children)
        if (r) return r
      } else if (it.path) {
        return it.path
      }
    }
  }
  return walk(p.children) ?? p.path
}
</script>

<template>
  <div ref="root" class="relative">
    <button
      type="button"
      class="focus-ring flex w-full items-center gap-3 rounded-xl border border-line bg-ink-850/60 p-2.5 text-left transition hover:border-line-strong"
      @click="open = !open"
    >
      <span
        class="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-brand-500/30 to-brand-700/30 ring-1 ring-brand-500/30"
      >
        <Icon :name="current?.icon ?? 'lucide:folder'" class="h-5 w-5 text-brand-300" />
      </span>
      <span class="min-w-0 flex-1">
        <span class="block truncate text-sm font-semibold text-fg">
          {{ current?.name ?? 'Selecione um projeto' }}
        </span>
        <span class="block truncate text-xs text-fg-subtle">
          {{ current?.tagline ?? 'Documentação técnica' }}
        </span>
      </span>
      <Icon name="lucide:chevrons-up-down" class="h-4 w-4 shrink-0 text-fg-subtle" />
    </button>

    <Transition name="menu">
      <div
        v-if="open"
        class="glass absolute left-0 right-0 top-[60px] z-30 max-h-[60vh] overflow-y-auto rounded-xl p-1.5 shadow-2xl"
      >
        <p class="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
          Projetos
        </p>
        <button
          v-for="p in projects"
          :key="p.slug"
          type="button"
          class="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition hover:bg-black/5"
          :class="p.slug === current?.slug ? 'bg-black/5' : ''"
          @click="pick(p)"
        >
          <span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-700">
            <Icon :name="p.icon" class="h-4 w-4 text-brand-300" />
          </span>
          <span class="min-w-0 flex-1">
            <span class="block truncate text-sm font-medium text-fg">{{ p.name }}</span>
            <span v-if="p.tagline" class="block truncate text-xs text-fg-subtle">
              {{ p.tagline }}
            </span>
          </span>
          <Icon
            v-if="p.slug === current?.slug"
            name="lucide:check"
            class="h-4 w-4 shrink-0 text-brand-400"
          />
        </button>

        <div class="my-1 h-px bg-line" />
        <NuxtLink
          to="/docs"
          class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted transition hover:bg-black/5 hover:text-fg"
          @click="open = false"
        >
          <Icon name="lucide:layout-grid" class="h-4 w-4" />
          Ver todos os projetos
        </NuxtLink>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
