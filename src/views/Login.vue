<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const mockAccounts = Object.freeze([
  {
    username: 'corgiBiz',
    password: 'GrowCorgi1!',
    role: '企業決策者',
    redirect: '/business',
    description: '查看科技信用資產與貸款利率建議'
  },
  {
    username: 'bankLee',
    password: 'ReviewCorgi2@',
    role: '銀行行員',
    redirect: '/staff',
    description: '進行智慧訪查並生成報告'
  },
  {
    username: 'creditChen',
    password: 'ScoreCorgi3#',
    role: '授信審核',
    redirect: '/credit-review',
    description: '檢視動態風險量化結果'
  }
])

const username = ref('')
const password = ref('')
const feedback = ref('')
const isError = ref(false)
const isSubmitting = ref(false)

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
  }, 300)
  isSubmitting.value = false
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-corgi-dark via-black to-corgi-darker text-white flex items-center justify-center p-4"
  >
    <section
      class="w-full max-w-lg bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)] space-y-6"
    >
      <div>
        <p class="text-sm uppercase tracking-[0.3em] text-corgi-text-light">CorgiRisk</p>
        <h1 class="text-3xl font-bold text-corgi-primary mt-3">登入中心</h1>
        <p class="text-corgi-text-light/80 text-sm mt-2 leading-relaxed">
          請輸入帳號密碼。若為示範流程，請參考 <span class="font-semibold">LOGIN_MOCK_ACCOUNTS.md</span> 取得模擬帳號。
        </p>
      </div>

      <form class="space-y-4" @submit.prevent="handleLogin">
        <label class="block text-sm text-corgi-text-light/90">
          帳號
          <input
            v-model.trim="username"
            type="text"
            required
            autocomplete="off"
            class="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-corgi-primary text-white"
            placeholder="輸入帳號"
          />
        </label>

        <label class="block text-sm text-corgi-text-light/90">
          密碼
          <input
            v-model="password"
            type="password"
            required
            class="mt-2 w-full rounded-xl bg-black/30 border border-white/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-corgi-primary text-white"
            placeholder="輸入密碼"
          />
        </label>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-corgi-primary text-black font-semibold py-3 rounded-xl hover:bg-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {{ isSubmitting ? '登入中...' : '登入' }}
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

      <div class="text-xs text-corgi-text-light/60">
        <p>成功登入後將依身份導向對應頁面：</p>
        <ul class="mt-2 space-y-1">
          <li v-for="account in mockAccounts" :key="account.redirect" class="flex items-center gap-2">
            <span class="inline-flex h-2 w-2 rounded-full bg-corgi-primary"></span>
            <span>{{ account.role }} → {{ account.redirect }}</span>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
