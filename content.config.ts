import { defineContentConfig, defineCollection, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      // Tudo que estiver em content/ vira documentação automaticamente.
      // Cada pasta de 1º nível = um projeto. Subpastas = seções.
      source: '**/*.md',
      schema: z.object({
        // Título exibido no conteúdo e na navegação.
        title: z.string(),
        description: z.string().optional(),
        // Ícone (qualquer nome do Iconify, ex.: "lucide:book-open").
        icon: z.string().optional(),
        // Tipo do documento (ex.: "modulo", "tela", "manual", "api"…).
        // Define o selo colorido exibido no título, na sidebar e nos cards.
        type: z.string().optional(),
        // Etiqueta opcional ao lado do item na sidebar (ex.: "v2", "novo").
        badge: z.string().optional(),
        // Título alternativo só para a navegação lateral.
        navTitle: z.string().optional(),
        // Permite ocultar uma página da navegação.
        navigation: z
          .union([
            z.boolean(),
            z.object({ title: z.string().optional(), icon: z.string().optional() }),
          ])
          .optional(),
        // Metadados do projeto (preenchidos no index.md de cada projeto).
        project: z
          .object({
            name: z.string(),
            tagline: z.string().optional(),
            icon: z.string().optional(),
            accent: z.string().optional(),
          })
          .optional(),
      }),
    }),
  },
})
