<script setup lang="ts">
definePageMeta({ public: true, layout: 'default' })

const { login } = useAuth()
const route = useRoute()

const email = ref('')
const password = ref('')
const showPass = ref(false)
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login(email.value, password.value)
    const redirect = (route.query.redirect as string) || '/docs'
    await navigateTo(redirect)
  } catch (e: any) {
    error.value = e?.data?.statusMessage || e?.statusMessage || 'Não foi possível entrar. Verifique suas credenciais.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="relative grid min-h-screen lg:grid-cols-2">
    <!-- Painel da marca -->
    <div class="relative hidden flex-col justify-between overflow-hidden border-r border-line p-12 lg:flex">
      <div
        class="pointer-events-none absolute inset-0 -z-10"
        style="background: radial-gradient(40rem 30rem at 30% 20%, rgba(255,206,46,0.5), transparent 60%), radial-gradient(30rem 30rem at 80% 90%, rgba(255,143,71,0.25), transparent 60%)"
      />
      <span class="pointer-events-none absolute right-12 top-24 animate-float text-5xl opacity-80">💡</span>
      <span class="pointer-events-none absolute left-16 bottom-32 animate-float text-4xl opacity-70 [animation-delay:1.2s]">✨</span>
      <AppLogo />

      <div>
        <p class="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-candy-pink">
          Minhas Ideias 💜
        </p>
        <h2 class="font-display text-4xl font-bold leading-tight text-fg">
          O lugar onde suas<br />ideias viram realidade.
        </h2>
        <p class="mt-4 max-w-md text-fg-muted">
          Entra aí e organiza tudo: as ideias na cabeça, os projetos rascunhados e os produtos
          que você ainda vai criar. 🚀
        </p>
      </div>

      <p class="text-xs text-fg-subtle">© {{ new Date().getFullYear() }} Minhas Ideias</p>
    </div>

    <!-- Formulário -->
    <div class="flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-sm">
        <div class="mb-8 lg:hidden">
          <AppLogo />
        </div>

        <h1 class="font-display text-2xl font-bold text-fg">Bem-vindo de volta! 👋</h1>
        <p class="mt-1.5 text-sm text-fg-muted">
          Entra e bora colocar mais uma ideia pra rodar.
        </p>

        <form class="mt-8 space-y-4" @submit.prevent="onSubmit">
          <div>
            <label class="mb-1.5 block text-sm font-medium text-fg-muted" for="email">E-mail</label>
            <div class="relative">
              <Icon name="lucide:mail" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
              <input
                id="email"
                v-model="email"
                type="email"
                autocomplete="email"
                required
                placeholder="voce@saasoftware.com.br"
                class="focus-ring h-11 w-full rounded-xl border border-line bg-ink-850/60 pl-10 pr-3 text-sm text-fg placeholder:text-fg-subtle"
              />
            </div>
          </div>

          <div>
            <label class="mb-1.5 block text-sm font-medium text-fg-muted" for="password">Senha</label>
            <div class="relative">
              <Icon name="lucide:lock" class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fg-subtle" />
              <input
                id="password"
                v-model="password"
                :type="showPass ? 'text' : 'password'"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="focus-ring h-11 w-full rounded-xl border border-line bg-ink-850/60 pl-10 pr-10 text-sm text-fg placeholder:text-fg-subtle"
              />
              <button
                type="button"
                class="absolute right-2 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-lg text-fg-subtle hover:text-fg"
                :aria-label="showPass ? 'Ocultar senha' : 'Mostrar senha'"
                @click="showPass = !showPass"
              >
                <Icon :name="showPass ? 'lucide:eye-off' : 'lucide:eye'" class="h-4 w-4" />
              </button>
            </div>
          </div>

          <Transition name="fade">
            <p
              v-if="error"
              class="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300"
            >
              <Icon name="lucide:alert-circle" class="h-4 w-4 shrink-0" />
              {{ error }}
            </p>
          </Transition>

          <button
            type="submit"
            :disabled="loading"
            class="btn-brand focus-ring flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Icon v-if="loading" name="lucide:loader-2" class="h-4 w-4 animate-spin" />
            {{ loading ? 'Entrando…' : 'Entrar' }}
            <Icon v-if="!loading" name="lucide:arrow-right" class="h-4 w-4" />
          </button>
        </form>

        <div class="mt-6 rounded-xl border border-line bg-ink-850/40 p-3 text-xs text-fg-subtle">
          <p class="mb-1 font-semibold text-fg-muted">Acesso de demonstração</p>
          <p>admin@saasoftware.com.br · <span class="font-mono">saa@2026</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
