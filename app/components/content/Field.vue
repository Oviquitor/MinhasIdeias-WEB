<script setup lang="ts">
// MDC: ::field{name="CNPJ" type="texto" required} Descrição do campo ::
const props = withDefaults(
  defineProps<{ name: string; type?: string; required?: boolean }>(),
  { type: '', required: false },
)
</script>

<template>
  <div class="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-start sm:gap-4">
    <div class="flex w-full shrink-0 items-center gap-2 sm:w-56">
      <code class="font-mono text-sm font-medium text-wheat-300">{{ name }}</code>
      <span
        v-if="required"
        class="rounded bg-red-500/15 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-red-300"
      >
        obrigatório
      </span>
    </div>
    <div class="min-w-0 flex-1">
      <span
        v-if="type"
        class="mb-1 inline-block rounded-md bg-ink-700 px-1.5 py-0.5 text-[11px] font-medium text-fg-muted ring-1 ring-line"
      >
        {{ type }}
      </span>
      <div class="field-desc text-sm leading-relaxed text-fg-muted">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.field-desc :deep(p) {
  margin: 0;
}
.field-desc :deep(code) {
  font-family: var(--font-mono);
  font-size: 0.85em;
  background: var(--color-ink-700);
  padding: 0.1em 0.4em;
  border-radius: 0.35rem;
}
</style>
