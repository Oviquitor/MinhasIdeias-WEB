<script setup lang="ts">
// MDC: ::fields … contendo vários ::field … :: — documenta campos de tela.
</script>

<template>
  <div class="not-prose my-5 overflow-hidden rounded-xl ring-1 ring-line">
    <div
      class="flex items-center gap-2 bg-ink-800 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle"
    >
      <Icon name="lucide:form-input" class="h-3.5 w-3.5" />
      Campos
    </div>
    <div class="divide-y divide-line">
      <slot />
    </div>
  </div>
</template>
