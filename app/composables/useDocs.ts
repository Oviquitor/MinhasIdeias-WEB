import type { ContentNavigationItem } from '@nuxt/content'

export interface DocProject {
  /** slug do projeto = nome da pasta de 1º nível (ex.: "tech4log") */
  slug: string
  /** caminho base (ex.: "/tech4log") */
  path: string
  name: string
  tagline?: string
  icon: string
  /** nós de navegação internos do projeto (seções/páginas) */
  children: ContentNavigationItem[]
}

/**
 * Carrega a navegação completa de /content e a organiza por projeto.
 * Cada pasta de 1º nível dentro de content/ é tratada como um projeto.
 */
export function useDocsNavigation() {
  return useAsyncData('docs-navigation', () =>
    queryCollectionNavigation('docs', ['icon', 'badge', 'project', 'type', 'description']),
  )
}

/** Constrói a lista de projetos a partir da navegação bruta. */
export function buildProjects(
  nav: ContentNavigationItem[] | null | undefined,
): DocProject[] {
  if (!nav) return []
  return nav
    .filter((node) => Array.isArray(node.children) && node.children.length > 0)
    .map((node) => {
      const project = (node as any).project as DocProject['project'] | undefined
      const slug = node.path.split('/').filter(Boolean)[0] ?? ''
      return {
        slug,
        path: `/${slug}`,
        name: project?.name ?? node.title,
        tagline: project?.tagline,
        icon: project?.icon ?? (node as any).icon ?? 'lucide:folder',
        children: node.children ?? [],
      }
    })
}

/** Descobre o projeto ativo a partir do caminho da rota atual. */
export function activeProjectSlug(path: string): string {
  return decodeURIComponent(path).split('/').filter(Boolean)[0] ?? ''
}

/**
 * Estado aberto/fechado das seções da sidebar, compartilhado entre todos os
 * níveis da árvore (e com o botão "expandir/recolher tudo"). Chave = caminho da
 * seção; ausência da chave = aberta (padrão).
 */
export function useSidebarSections() {
  return useState<Record<string, boolean>>('sidebar-sections', () => ({}))
}

/** Coleta os caminhos de todas as seções (nós com filhos) de uma subárvore. */
export function collectSectionPaths(
  items: ContentNavigationItem[],
  out: string[] = [],
): string[] {
  for (const it of items) {
    if (it.children?.length) {
      out.push(it.path)
      collectSectionPaths(it.children, out)
    }
  }
  return out
}
