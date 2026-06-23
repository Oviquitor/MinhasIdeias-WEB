<script setup lang="ts">
// Barra de navegação inferior — só no mobile (lg:hidden). Dá cara de app:
// acesso rápido a Início, Busca, Novidades e Manual, com aba ativa destacada.
const route = useRoute()
const searchOpen = useState('search-open', () => false)

const isActive = (to: string) => {
  const p = decodeURIComponent(route.path)
  if (to === '/docs') return p === '/docs' || (!p.startsWith('/changelog') && !p.startsWith('/manual') && p !== '/login' && p !== '/')
  return p.startsWith(to)
}

const tabs = [
  { to: '/docs', icon: 'lucide:layout-grid', label: 'Ideias' },
  { to: '/changelog', icon: 'lucide:history', label: 'Novidades' },
  { to: '/manual', icon: 'lucide:book-marked', label: 'Manual' },
] as const
</script>

<template>
  <nav
    class="mobile-tabbar glass fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around lg:hidden"
    aria-label="Navegação principal"
  >
    <NuxtLink
      to="/docs"
      class="tab focus-ring"
      :class="isActive('/docs') ? 'tab-active' : ''"
    >
      <Icon name="lucide:layout-grid" class="h-[22px] w-[22px]" />
      <span>Ideias</span>
    </NuxtLink>

    <button type="button" class="tab focus-ring" @click="searchOpen = true">
      <Icon name="lucide:search" class="h-[22px] w-[22px]" />
      <span>Buscar</span>
    </button>

    <NuxtLink
      to="/changelog"
      class="tab focus-ring"
      :class="isActive('/changelog') ? 'tab-active' : ''"
    >
      <Icon name="lucide:history" class="h-[22px] w-[22px]" />
      <span>Novidades</span>
    </NuxtLink>

    <NuxtLink
      to="/manual"
      class="tab focus-ring"
      :class="isActive('/manual') ? 'tab-active' : ''"
    >
      <Icon name="lucide:book-marked" class="h-[22px] w-[22px]" />
      <span>Manual</span>
    </NuxtLink>
  </nav>
</template>

<style scoped>
.mobile-tabbar {
  /* Encosta no rodapé respeitando a barra de gestos / notch inferior. */
  padding-bottom: env(safe-area-inset-bottom, 0px);
  border-top: 1.5px solid var(--color-line);
  border-bottom: none;
}
.tab {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  padding: 10px 4px;
  min-height: 56px;
  font-size: 11px;
  font-weight: 700;
  color: var(--color-fg-subtle);
  background: transparent;
  transition: color 0.15s ease, transform 0.1s ease;
}
.tab:active {
  transform: scale(0.92);
}
.tab-active {
  color: var(--color-brand-600);
}
</style>
