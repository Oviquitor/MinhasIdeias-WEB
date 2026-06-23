// -----------------------------------------------------------------------------
// Endpoint de autenticação (DEMONSTRAÇÃO)
//
// >>> PONTO DE INTEGRAÇÃO <<<
// Hoje este endpoint valida contra usuários fixos definidos em DEMO_USERS.
// Para usar o backend real da SAA, troque o bloco marcado abaixo por uma
// chamada ao seu serviço de autenticação (ex.: $fetch para a API JWT) e
// retorne { token, user } com o token real.
// -----------------------------------------------------------------------------

interface DemoUser {
  email: string
  password: string
  name: string
  role: string
}

const DEMO_USERS: DemoUser[] = [
  { email: 'admin@saasoftware.com.br', password: 'saa@2026', name: 'Administrador SAA', role: 'admin' },
  { email: 'dev@saasoftware.com.br', password: 'dev@2026', name: 'Equipe Dev', role: 'editor' },
]

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)
  const email = (body?.email ?? '').trim().toLowerCase()
  const password = body?.password ?? ''

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Informe e-mail e senha.' })
  }

  // ----------------------- início do bloco a substituir -----------------------
  const user = DEMO_USERS.find((u) => u.email === email && u.password === password)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Credenciais inválidas.' })
  }

  // Token "fake" só para a sessão de demonstração. Substitua pelo JWT real.
  const payload = {
    sub: user.email,
    name: user.name,
    role: user.role,
    iat: Date.now(),
    exp: Date.now() + 1000 * 60 * 60 * 8, // 8h
  }
  const token = Buffer.from(JSON.stringify(payload)).toString('base64url')
  // ------------------------ fim do bloco a substituir -------------------------

  return {
    token,
    user: { email: user.email, name: user.name, role: user.role },
  }
})
