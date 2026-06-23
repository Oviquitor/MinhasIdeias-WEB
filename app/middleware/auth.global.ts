export default defineNuxtRouteMiddleware((to) => {
  // Páginas públicas: landing e login. As demais exigem autenticação.
  const publicRoutes = ['/login']
  const isPublic = to.meta.public === true || publicRoutes.includes(to.path)

  const { isAuthenticated } = useAuth()

  if (!isPublic && !isAuthenticated.value) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } })
  }

  // Já autenticado tentando ir ao login → manda para a central de docs.
  if (to.path === '/login' && isAuthenticated.value) {
    return navigateTo('/docs')
  }
})
