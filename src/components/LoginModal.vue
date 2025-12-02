<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const emit = defineEmits(['close'])

const mockAccounts = Object.freeze([
  {
    username: 'corgiBiz',
    password: 'GrowCorgi1!',
    role: '企業決策者',
    redirect: '/business'
  },
  {
    username: 'bankLee',
    password: 'ReviewCorgi2@',
    role: '銀行行員',
    redirect: '/staff'
  },
  {
    username: 'creditChen',
    password: 'ScoreCorgi3#',
    role: '授信審核',
    redirect: '/credit-review'
  }
])

const username = ref('')
const password = ref('')
const feedback = ref('')
const isError = ref(false)
const isSubmitting = ref(false)
const showRegister = ref(false)

const matchedAccount = computed(() =>
  mockAccounts.find(
    (account) =>
      account.username === username.value.trim() && account.password === password.value
  )
)

const handleLogin = async () => {
  feedback.value = ''
  isError.value = false
  isSubmitting.value = true

  await new Promise((resolve) => setTimeout(resolve, 400))

  if (!matchedAccount.value) {
    isError.value = true
    feedback.value = '帳號或密碼錯誤，請確認後再試。'
    isSubmitting.value = false
    return
  }

  feedback.value = `歡迎 ${matchedAccount.value.role}，即將導向專屬頁面。`
  setTimeout(() => {
    router.push(matchedAccount.value.redirect)
    emit('close')
  }, 300)
  isSubmitting.value = false
}

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <div
      class="relative bg-gradient-to-br from-corgi-darker to-corgi-dark border border-corgi-primary/30 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <button
        @click="closeModal"
        class="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <section class="p-8 space-y-6">
        <div class="flex items-center gap-3">
          <img src="@/assets/images/logo.png" alt="CorgiRisk Logo" class="w-12 h-12 object-contain" />
          <div>
            <p class="text-xs uppercase tracking-[0.3em] text-corgi-text-light">CorgiRisk</p>
            <h1 class="text-3xl font-bold text-corgi-primary">
              {{ showRegister ? '註冊帳號' : '登入系統' }}
            </h1>
          </div>
        </div>
        <p class="text-corgi-text-light/70 text-m leading-relaxed">
          請在此輸入帳號密碼完成登入<br>若需註冊，請切換模式並依步驟建立帳戶。
        </p>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <label class="block text-sm text-corgi-text-light/90">
            帳號
            <input
              v-model.trim="username"
              type="text"
              required
              autocomplete="off"
              class="mt-2 w-full rounded-xl bg-corgi-darker border border-corgi-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-corgi-primary text-white"
              placeholder="輸入帳號"
            />
          </label>

          <label class="block text-sm text-corgi-text-light/90">
            密碼
            <input
              v-model="password"
              type="password"
              required
              class="mt-2 w-full rounded-xl bg-corgi-darker border border-corgi-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-corgi-primary text-white"
              placeholder="輸入密碼"
            />
          </label>

          <label v-if="showRegister" class="block text-sm text-corgi-text-light/90">
            確認密碼
            <input
              type="password"
              required
              class="mt-2 w-full rounded-xl bg-corgi-darker border border-corgi-primary/20 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-corgi-primary text-white"
              placeholder="再次輸入密碼"
            />
          </label>

          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-corgi-primary/30 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {{ isSubmitting ? '處理中...' : (showRegister ? '註冊' : '登入') }}
          </button>
        </form>

        <p
          v-if="feedback"
          :class="[
            'text-sm px-3 py-2 rounded-xl border',
            isError ? 'border-red-400 text-red-300 bg-red-400/10' : 'border-emerald-400 text-emerald-200 bg-emerald-400/10'
          ]"
        >
          {{ feedback }}
        </p>

        <div class="text-center">
          <button
            @click="showRegister = !showRegister"
            class="text-sm text-corgi-text-light hover:text-corgi-primary transition-colors"
          >
            {{ showRegister ? '已有帳號？立即登入' : '還沒有帳號？立即註冊' }}
          </button>
        </div>

        <div v-if="showRegister" class="text-corgi-text-light/70 text-xs">
          <p class="mb-2">註冊後您可以:</p>
          <ul class="space-y-2">
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-corgi-primary rounded-full"></span>
              建立企業科技信用資產
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-corgi-primary rounded-full"></span>
              享受更優惠的授信利率
            </li>
            <li class="flex items-center gap-2">
              <span class="w-1.5 h-1.5 bg-corgi-primary rounded-full"></span>
              即時監控科技風險狀態
            </li>
          </ul>
        </div>

        <div class="text-m text-corgi-text-light/60 text-center">
          <p>成功登入後會依權限自動導向對應頁面。</p>
        </div>
      </section>
    </div>
  </div>
</template>
