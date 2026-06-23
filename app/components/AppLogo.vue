<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: false })
</script>

<template>
  <NuxtLink to="/" class="group inline-flex items-center gap-2.5 focus-ring rounded-2xl">
    <span
      class="hover-wiggle relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl border-[2.5px] border-[#3a2710] bg-gradient-to-br from-wheat-400 via-brand-300 to-brand-500 shadow-[3px_3px_0_#3a2710]"
    >
      <!-- Lâmpada de ideia cartoon -->
      <svg viewBox="0 0 24 24" class="h-6 w-6 text-[#3a2710]" fill="none">
        <path
          d="M9 18h6v1.2a1.8 1.8 0 0 1-1.8 1.8h-2.4A1.8 1.8 0 0 1 9 19.2V18Z"
          fill="currentColor"
        />
        <path
          d="M12 2.5a7 7 0 0 0-4.2 12.6c.5.4.8.9.9 1.5l.1.9h6.4l.1-.9c.1-.6.4-1.1.9-1.5A7 7 0 0 0 12 2.5Z"
          fill="currentColor"
        />
        <path d="M10 16.5h4" stroke="#fff" stroke-width="1.4" stroke-linecap="round" opacity="0.7" />
        <path
          d="M12 6v3m0 0 1.8 1.8M12 9l-1.8 1.8"
          stroke="#fff"
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"
          opacity="0.85"
        />
      </svg>
      <!-- Faísca -->
      <span class="absolute -right-1 -top-1 text-[11px] leading-none">✨</span>
    </span>
    <span v-if="!compact" class="flex flex-col leading-none">
      <span class="font-display text-[17px] font-bold tracking-tight text-fg">
        Minhas <span class="bg-gradient-to-r from-candy-pink to-wheat-400 bg-clip-text text-transparent">Ideias</span>
      </span>
      <span class="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-fg-subtle">
        do papel pra vida real
      </span>
    </span>
  </NuxtLink>
</template>
