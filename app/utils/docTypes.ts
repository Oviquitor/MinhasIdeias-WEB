// -----------------------------------------------------------------------------
// Tipos de documento
//
// Cada documento pode declarar `type:` no frontmatter. O tipo define um selo
// colorido (ícone + rótulo) exibido no título da página, na sidebar e nos cards
// das páginas-hub — para que quem lê saiba na hora o que é cada coisa.
//
// Cores em hex (não classes Tailwind) para não dependerem do purge do CSS.
// -----------------------------------------------------------------------------

export interface DocTypeInfo {
  label: string
  icon: string
  color: string
}

export const DOC_TYPES: Record<string, DocTypeInfo> = {
  modulo: { label: 'Módulo', icon: 'lucide:box', color: '#16c172' },
  tela: { label: 'Tela', icon: 'lucide:app-window', color: '#38bdf8' },
  manual: { label: 'Manual', icon: 'lucide:book-open-text', color: '#e9c26a' },
  api: { label: 'API', icon: 'lucide:webhook', color: '#a78bfa' },
  integracao: { label: 'Integração', icon: 'lucide:plug', color: '#f472b6' },
  conceito: { label: 'Conceito', icon: 'lucide:lightbulb', color: '#22d3ee' },
  processo: { label: 'Processo', icon: 'lucide:git-branch', color: '#fb923c' },
  guia: { label: 'Guia', icon: 'lucide:compass', color: '#2dd4bf' },
  referencia: { label: 'Referência', icon: 'lucide:list-tree', color: '#94a3b8' },
  relatorio: { label: 'Relatório', icon: 'lucide:bar-chart-3', color: '#c084fc' },
}

export function getDocType(type?: string | null): DocTypeInfo | undefined {
  if (!type) return undefined
  return DOC_TYPES[type.toLowerCase()]
}

/** Converte um hex (#rrggbb) em rgba com a opacidade dada. */
export function hexAlpha(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
