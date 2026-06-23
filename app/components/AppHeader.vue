<script setup lang="ts">
const searchOpen = useState('search-open', () => false)
const sidebarOpen = useState('sidebar-open', () => false)

// Mesma lógica do layout: há sidebar quando a rota está dentro de um projeto.
// Calculado direto (não via useState) para SSR e cliente baterem na hidratação.
const route = useRoute()
const { data: nav } = useDocsNavigation()
const hasSidebar = computed(() =>
  buildProjects(nav.value).some((p) => p.slug === activeProjectSlug(route.path)),
)
const { user, logout } = useAuth()
const menuOpen = ref(false)
const menuRef = ref<HTMLElement | null>(null)

onClickOutside(menuRef, () => (menuOpen.value = false))

const initials = computed(() =>
  (user.value?.name ?? 'MI')
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase(),
)

async function onLogout() {
  logout()
  await navigateTo('/login')
}
</script>

<template>
  <header
    class="glass sticky top-0 z-40 flex h-16 items-center gap-3 px-4 sm:px-6"
  >
    <button
      v-if="hasSidebar"
      type="button"
      class="focus-ring -ml-1 grid h-9 w-9 place-items-center rounded-lg text-fg-muted hover:bg-black/5 lg:hidden"
      aria-label="Abrir menu"
      @click="sidebarOpen = !sidebarOpen"
    >
      <Icon name="lucide:menu" class="h-5 w-5" />
    </button>

    <AppLogo class="hidden sm:flex" />
    <AppLogo compact class="sm:hidden" />

    <div class="flex-1" />

    <button
      type="button"
      class="focus-ring group flex h-9 items-center gap-2 rounded-lg border border-line bg-ink-850/60 px-3 text-sm text-fg-muted transition hover:border-line-strong hover:text-fg"
      @click="searchOpen = true"
    >
      <Icon name="lucide:search" class="h-4 w-4" />
      <span class="hidden md:inline">Buscar…</span>
      <kbd
        class="ml-1 hidden rounded border border-line px-1.5 py-0.5 text-[10px] text-fg-subtle md:inline"
      >
        Ctrl K
      </kbd>
    </button>

    <NuxtLink
      to="/changelog"
      class="focus-ring hidden h-9 items-center gap-1.5 rounded-lg px-3 text-sm text-fg-muted transition hover:bg-black/5 hover:text-fg sm:flex"
    >
      <Icon name="lucide:history" class="h-4 w-4" />
      Changelog
    </NuxtLink>

    <div ref="menuRef" class="relative">
      <button
        type="button"
        class="focus-ring flex h-9 items-center gap-2 rounded-lg pl-1 pr-2 transition hover:bg-black/5"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="grid h-7 w-7 place-items-center rounded-full border-2 border-[#3a2710] bg-gradient-to-br from-wheat-400 to-brand-400 text-[11px] font-bold text-[#3a2710]"
        >
          {{ initials }}
        </span>
        <Icon name="lucide:chevron-down" class="h-4 w-4 text-fg-subtle" />
      </button>

      <Transition name="menu">
        <div
          v-if="menuOpen"
          class="glass absolute right-0 top-11 w-56 overflow-hidden rounded-xl p-1.5 shadow-2xl"
        >
          <div class="px-3 py-2">
            <p class="truncate text-sm font-semibold text-fg">{{ user?.name }}</p>
            <p class="truncate text-xs text-fg-subtle">{{ user?.email }}</p>
          </div>
          <div class="my-1 h-px bg-line" />
          <NuxtLink
            to="/manual"
            class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted transition hover:bg-black/5 hover:text-fg"
            @click="menuOpen = false"
          >
            <Icon name="lucide:book-marked" class="h-4 w-4" />
            Manual de uso
          </NuxtLink>
          <div class="my-1 h-px bg-line" />
          <button
            type="button"
            class="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-fg-muted transition hover:bg-black/5 hover:text-fg"
            @click="onLogout"
          >
            <Icon name="lucide:log-out" class="h-4 w-4" />
            Sair
          </button>
        </div>
      </Transition>
    </div>
  </header>
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
