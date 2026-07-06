// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Deploy na Cloudflare Workers (deploy via `npx wrangler deploy`): o preset
  // cloudflare_module gera o worker em .output/server/index.mjs e os assets em
  // .output/public (servidos pelo binding ASSETS do wrangler.jsonc).
  nitro: { preset: 'cloudflare_module' },

  modules: [
    '@nuxt/content',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  // Componentes usados dentro do Markdown (MDC) precisam ser globais e sem
  // prefixo de pasta, para que ::callout, ::doc-overview, ::steps etc. resolvam.
  components: [
    { path: '~/components/content', pathPrefix: false, global: true },
    '~/components',
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  fonts: {
    families: [
      { name: 'Fredoka', provider: 'google' },
      { name: 'Nunito', provider: 'google' },
      { name: 'JetBrains Mono', provider: 'google' },
    ],
  },

  content: {
    build: {
      markdown: {
        toc: { depth: 3, searchDepth: 3 },
        highlight: {
          theme: {
            default: 'github-dark',
            dark: 'github-dark',
          },
          langs: [
            'json', 'js', 'ts', 'bash', 'shell', 'http', 'yaml',
            'sql', 'xml', 'html', 'vue', 'csharp', 'python', 'php', 'java', 'diff',
          ],
        },
      },
    },
  },

  icon: {
    serverBundle: 'remote',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'pt-BR' },
      title: 'Minhas Ideias — do papel pra vida real',
      meta: [
        { charset: 'utf-8' },
        // viewport-fit=cover permite usar a área do notch (safe-area-inset-*).
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover',
        },
        {
          name: 'description',
          content:
            'Meu cantinho pessoal pra organizar ideias, projetos e os produtos que quero criar — e finalmente tirar tudo do papel.',
        },
        // Cor da barra do navegador no mobile (combina com o creme do app).
        { name: 'theme-color', content: '#f4eee2' },
        // Comportamento "app" quando adicionado à tela inicial (iOS/Android).
        { name: 'mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-capable', content: 'yes' },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
        { name: 'apple-mobile-web-app-title', content: 'Minhas Ideias' },
      ],
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'apple-touch-icon', href: '/icon.svg' },
      ],
    },
  },
})
