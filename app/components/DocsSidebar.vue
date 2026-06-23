<script setup lang="ts">
const route = useRoute()
const sidebarOpen = useState('sidebar-open', () => false)

const { data: nav } = useDocsNavigation()
const projects = computed(() => buildProjects(nav.value))
const current = computed(() => {
  const slug = activeProjectSlug(route.path)
  return projects.value.find((p) => p.slug === slug) ?? projects.value[0]
})

// Fecha o drawer ao navegar (mobile).
watch(() => route.path, () => (sidebarOpen.value = false))

// Botão "expandir / recolher tudo".
const openState = useSidebarSections()
const sectionPaths = computed(() =>
  current.value ? collectSectionPaths(current.value.children) : [],
)
const anyCollapsed = computed(() =>
  sectionPaths.value.some((p) => openState.value[p] === false),
)
function toggleAll() {
  const expand = anyCollapsed.value // se há alguma fechada → abre todas; senão → fecha todas
  for (const p of sectionPaths.value) openState.value[p] = expand
}
</script>

<template>
  <!-- Overlay mobile -->
  <Transition name="fade">
    <div
      v-if="sidebarOpen"
      class="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
      @click="sidebarOpen = false"
    />
  </Transition>

  <aside
    class="fixed left-0 top-16 z-50 flex h-[calc(100vh-4rem)] w-72 flex-col border-r border-line bg-ink-900/80 backdrop-blur-xl transition-transform lg:z-40 lg:translate-x-0"
    :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-3">
      <ProjectSwitcher :projects="projects" :current="current" />
    </div>

    <div
      v-if="sectionPaths.length"
      class="flex items-center justify-between px-4 pb-1"
    >
      <span class="text-[10px] font-semibold uppercase tracking-[0.14em] text-fg-subtle">
        Conteúdo
      </span>
      <button
        type="button"
        class="focus-ring flex items-center gap-1 rounded-md px-1.5 py-1 text-[11px] font-medium text-fg-subtle transition hover:bg-black/5 hover:text-fg-muted"
        @click="toggleAll"
      >
        <Icon
          :name="anyCollapsed ? 'lucide:unfold-vertical' : 'lucide:fold-vertical'"
          class="h-3.5 w-3.5"
        />
        {{ anyCollapsed ? 'Expandir tudo' : 'Recolher tudo' }}
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto px-2 pb-8">
      <DocsNavTree v-if="current" :items="current.children" />
      <p v-else class="px-3 py-6 text-sm text-fg-subtle">Nenhum projeto encontrado.</p>
    </nav>

    <div class="border-t border-line p-3">
      <NuxtLink
        to="/docs"
        class="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted transition hover:bg-black/5 hover:text-fg"
      >
        <Icon name="lucide:layout-grid" class="h-4 w-4" />
        Todos os projetos
      </NuxtLink>
    </div>
  </aside>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
