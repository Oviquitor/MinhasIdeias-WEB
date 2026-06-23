<script setup lang="ts">
const props = withDefaults(
  defineProps<{ type?: string | null; iconOnly?: boolean; size?: 'sm' | 'md' }>(),
  { iconOnly: false, size: 'md' },
)

const info = computed(() => getDocType(props.type))
</script>

<template>
  <span
    v-if="info"
    class="inline-flex shrink-0 items-center gap-1.5 rounded-md font-medium leading-none"
    :class="[
      iconOnly ? 'p-1' : size === 'sm' ? 'px-1.5 py-1 text-[10px]' : 'px-2 py-1 text-xs',
    ]"
    :style="{
      color: info.color,
      backgroundColor: hexAlpha(info.color, 0.12),
      boxShadow: `inset 0 0 0 1px ${hexAlpha(info.color, 0.3)}`,
    }"
    :title="info.label"
  >
    <Icon :name="info.icon" :class="size === 'sm' ? 'h-3 w-3' : 'h-3.5 w-3.5'" />
    <span v-if="!iconOnly" class="uppercase tracking-wide">{{ info.label }}</span>
  </span>
</template>
