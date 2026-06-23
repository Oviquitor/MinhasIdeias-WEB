interface AuthUser {
  email: string
  name: string
  role: string
}

/**
 * Estado de autenticação compartilhado. O token é persistido em cookie
 * (compatível com SSR) e o usuário fica em estado reativo global.
 */
export function useAuth() {
  const tokenCookie = useCookie<string | null>('saa_token', {
    maxAge: 60 * 60 * 8, // 8h
    sameSite: 'lax',
    secure: !import.meta.dev,
  })
  const userCookie = useCookie<AuthUser | null>('saa_user', {
    maxAge: 60 * 60 * 8,
    sameSite: 'lax',
    secure: !import.meta.dev,
  })

  const user = useState<AuthUser | null>('auth_user', () => userCookie.value ?? null)
  // A presença do token é a fonte de verdade da sessão (o objeto user é só p/ exibição).
  const isAuthenticated = computed(() => !!tokenCookie.value)

  async function login(email: string, password: string) {
    const res = await $fetch<{ token: string; user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    tokenCookie.value = res.token
    userCookie.value = res.user
    user.value = res.user
    return res.user
  }

  function logout() {
    tokenCookie.value = null
    userCookie.value = null
    user.value = null
  }

  return { user, isAuthenticated, token: tokenCookie, login, logout }
}
