<script setup lang="ts">
// MDC: ::steps … contendo uma lista ordenada (1. 2. 3.) … ::
// Estiliza a lista como um passo-a-passo numerado com linha de ligação.
</script>

<template>
  <div class="doc-steps not-prose my-6">
    <slot />
  </div>
</template>

<style scoped>
.doc-steps :deep(ol) {
  list-style: none;
  margin: 0;
  padding: 0;
  counter-reset: step;
}
.doc-steps :deep(ol > li) {
  position: relative;
  counter-increment: step;
  padding: 0 0 1.25rem 2.75rem;
  border-left: 1px solid var(--color-line);
  margin-left: 0.9rem;
}
.doc-steps :deep(ol > li:last-child) {
  border-left-color: transparent;
  padding-bottom: 0;
}
.doc-steps :deep(ol > li::before) {
  content: counter(step);
  position: absolute;
  left: -0.9rem;
  top: -0.15rem;
  display: grid;
  place-items: center;
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 9999px;
  background: var(--color-ink-800);
  box-shadow: inset 0 0 0 1px var(--color-line-strong);
  color: var(--color-brand-300);
  font-family: var(--font-display);
  font-size: 0.8rem;
  font-weight: 700;
}
.doc-steps :deep(ol > li > :first-child) {
  margin-top: 0;
}
.doc-steps :deep(li::marker) {
  content: none;
}
</style>
