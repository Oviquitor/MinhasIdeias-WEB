<script setup lang="ts">
const route = useRoute()

// A sidebar só aparece quando há um projeto selecionado (rota dentro de um
// projeto). Na central "Todos os projetos" (/docs) ela some, para não confundir.
// Aguardamos a navegação no SSR para que header e sidebar leiam o mesmo dado
// já resolvido no servidor e no cliente (evita mismatch de hidratação).
const { data: nav } = await useDocsNavigation()
const projects = computed(() => buildProjects(nav.value))
const hasProject = computed(() =>
  projects.value.some((p) => p.slug === activeProjectSlug(route.path)),
)
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />
    <DocsSidebar v-if="hasProject" />
    <!-- pb extra no mobile p/ não ficar atrás da barra inferior -->
    <main class="pb-24 lg:pb-0" :class="hasProject ? 'lg:pl-72' : ''">
      <slot />
    </main>
    <MobileTabBar />
    <SearchDialog />
  </div>
</template>
