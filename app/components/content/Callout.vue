<script setup lang="ts">
// MDC: ::callout{type="warning" title="Atenção"} … ::
const props = withDefaults(
  defineProps<{ type?: 'note' | 'tip' | 'info' | 'warning' | 'danger'; title?: string }>(),
  { type: 'note' },
)

const styles = {
  note: { color: '#a78bfa', icon: 'lucide:sparkles', label: 'Nota' },
  tip: { color: '#a3e635', icon: 'lucide:lightbulb', label: 'Dica' },
  info: { color: '#38bdf8', icon: 'lucide:info', label: 'Informação' },
  warning: { color: '#fbbf24', icon: 'lucide:triangle-alert', label: 'Atenção' },
  danger: { color: '#fb7185', icon: 'lucide:octagon-alert', label: 'Cuidado' },
} as const

const s = computed(() => styles[props.type] ?? styles.note)
</script>

<template>
  <div
    class="not-prose my-5 flex gap-3 rounded-2xl p-4"
    :style="{
      backgroundColor: hexAlpha(s.color, 0.10),
      boxShadow: `inset 0 0 0 2.5px ${hexAlpha(s.color, 0.4)}`,
    }"
  >
    <Icon :name="s.icon" class="mt-0.5 h-5 w-5 shrink-0" :style="{ color: s.color }" />
    <div class="min-w-0 flex-1">
      <p class="mb-1 text-sm font-semibold" :style="{ color: s.color }">
        {{ title || s.label }}
      </p>
      <div class="callout-body text-sm leading-relaxed text-fg">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.callout-body :deep(p) {
  margin: 0;
}
.callout-body :deep(p + p) {
  margin-top: 0.5rem;
}
.callout-body :deep(a) {
  color: inherit;
  text-decoration: underline;
}
.callout-body :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-ink-700);
  padding: 0.1em 0.4em;
  border-radius: 0.35rem;
}
</style>
