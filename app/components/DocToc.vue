<script setup lang="ts">
interface TocLink {
  id: string
  text: string
  depth: number
  children?: TocLink[]
}

const props = defineProps<{ links: TocLink[] }>()

const activeId = ref('')

const flat = computed(() => {
  const out: TocLink[] = []
  const walk = (items: TocLink[]) => {
    for (const it of items) {
      out.push(it)
      if (it.children?.length) walk(it.children)
    }
  }
  walk(props.links ?? [])
  return out
})

let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) activeId.value = e.target.id
      }
    },
    { rootMargin: '-80px 0px -70% 0px', threshold: 0 },
  )
  for (const l of flat.value) {
    const el = document.getElementById(l.id)
    if (el) observer.observe(el)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div v-if="flat.length" class="text-sm">
    <p class="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-fg-subtle">
      <Icon name="lucide:list" class="h-3.5 w-3.5" />
      Nesta página
    </p>
    <ul class="space-y-1 border-l border-line">
      <li v-for="l in flat" :key="l.id">
        <a
          :href="`#${l.id}`"
          class="block border-l-2 py-1 pr-2 transition"
          :style="{ paddingLeft: `${(l.depth - 1) * 0.75 + 0.75}rem` }"
          :class="
            activeId === l.id
              ? 'border-brand-400 text-fg'
              : 'border-transparent text-fg-subtle hover:text-fg-muted'
          "
        >
          {{ l.text }}
        </a>
      </li>
    </ul>
  </div>
</template>
