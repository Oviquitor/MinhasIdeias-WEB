<script setup lang="ts">
const open = useState('search-open', () => false)
const query = ref('')
const activeIndex = ref(0)
const inputEl = ref<HTMLInputElement | null>(null)
const router = useRouter()

// Seções de busca (carregadas sob demanda na 1ª abertura).
const { data: sections, refresh } = await useAsyncData(
  'search-sections',
  () => queryCollectionSearchSections('docs'),
  { lazy: true, immediate: false, default: () => [] },
)

function titleCase(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

const results = computed(() => {
  const q = query.value.trim().toLowerCase()
  const all = sections.value ?? []
  const list = !q
    ? all.slice(0, 12)
    : all
        .filter(
          (s: any) =>
            s.title?.toLowerCase().includes(q) ||
            s.content?.toLowerCase().includes(q) ||
            s.id?.toLowerCase().includes(q),
        )
        .slice(0, 20)

  return list.map((s: any) => {
    const segs = String(s.id).split('#')[0].split('/').filter(Boolean)
    return {
      id: s.id,
      title: s.title,
      content: (s.content ?? '').slice(0, 120),
      project: titleCase(segs[0] ?? ''),
      path: s.id,
    }
  })
})

watch(query, () => (activeIndex.value = 0))

watch(open, async (v) => {
  if (v) {
    await refresh()
    await nextTick()
    inputEl.value?.focus()
  } else {
    query.value = ''
  }
})

function go(path: string) {
  open.value = false
  router.push(path)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = Math.min(activeIndex.value + 1, results.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (e.key === 'Enter') {
    const r = results.value[activeIndex.value]
    if (r) go(r.path)
  } else if (e.key === 'Escape') {
    open.value = false
  }
}

// Atalho global Ctrl/Cmd+K e fechar com ESC (funciona mesmo sem foco no campo).
function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    open.value = !open.value
  } else if (e.key === 'Escape' && open.value) {
    e.preventDefault()
    open.value = false
  }
}
onMounted(() => window.addEventListener('keydown', onGlobalKey))
onUnmounted(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      >
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="open = false" />
        <div
          class="glass relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-2xl"
          @keydown="onKeydown"
        >
          <div class="flex items-center gap-3 border-b border-line px-4">
            <Icon name="lucide:search" class="h-5 w-5 text-fg-subtle" />
            <input
              ref="inputEl"
              v-model="query"
              placeholder="Buscar na documentação…"
              class="h-14 w-full bg-transparent text-base text-fg placeholder:text-fg-subtle focus:outline-none"
            />
            <kbd class="hidden rounded-md border border-line px-1.5 py-0.5 text-[11px] text-fg-subtle sm:block">
              ESC
            </kbd>
          </div>

          <div class="max-h-[55vh] overflow-y-auto p-2">
            <p v-if="!results.length" class="px-3 py-10 text-center text-sm text-fg-subtle">
              Nenhum resultado encontrado.
            </p>
            <ul v-else class="space-y-0.5">
              <li v-for="(r, i) in results" :key="r.id">
                <button
                  type="button"
                  class="flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition"
                  :class="i === activeIndex ? 'bg-brand-500/15' : 'hover:bg-black/5'"
                  @mouseenter="activeIndex = i"
                  @click="go(r.path)"
                >
                  <Icon name="lucide:file-text" class="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                  <span class="min-w-0 flex-1">
                    <span class="flex items-center gap-2">
                      <span class="truncate text-sm font-medium text-fg">{{ r.title }}</span>
                      <span class="shrink-0 text-[11px] uppercase tracking-wide text-fg-subtle">
                        {{ r.project }}
                      </span>
                    </span>
                    <span v-if="r.content" class="mt-0.5 block truncate text-xs text-fg-muted">
                      {{ r.content }}
                    </span>
                  </span>
                  <Icon
                    v-if="i === activeIndex"
                    name="lucide:corner-down-left"
                    class="mt-0.5 h-4 w-4 shrink-0 text-fg-subtle"
                  />
                </button>
              </li>
            </ul>
          </div>

          <div
            class="flex items-center justify-between border-t border-line px-4 py-2 text-[11px] text-fg-subtle"
          >
            <span class="flex items-center gap-1.5">
              <Icon name="lucide:corner-down-left" class="h-3.5 w-3.5" /> abrir
              <Icon name="lucide:arrow-up" class="ml-2 h-3.5 w-3.5" />
              <Icon name="lucide:arrow-down" class="h-3.5 w-3.5" /> navegar
            </span>
            <span>{{ results.length }} resultado(s)</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.18s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
