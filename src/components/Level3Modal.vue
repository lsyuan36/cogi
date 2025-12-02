<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close'])

const providers = [
  {
    id: 'dtrust',
    name: 'D-Trust Assurance',
    badge: '四大會計師聯盟',
    eta: '3-5 個工作天',
    coverage: ['科技治理稽核', 'ISO / SOC 證明', '營運韌性評估'],
    description: '由 Big4 合作顧問統整企業科技治理證據，包含內控、科技流程與授信關聯指標。'
  },
  {
    id: 'secguard',
    name: 'SecGuard Consulting',
    badge: '雲端科技風控',
    eta: '5-7 個工作天',
    coverage: ['多雲合規審查', '供應鏈科技風險', 'AI 治理流程'],
    description: '強調雲端轉型與供應鏈科技風險，提供結構化證明文件以支援授信決策。'
  },
  {
    id: 'cyberwave',
    name: 'CyberWave Advisory',
    badge: '高風險產業專案',
    eta: '10-12 個工作天',
    coverage: ['金融等級控管', '產業特製測試', '策略諮詢'],
    description: '結合科技與財務顧問，針對高監管產業提供訪談、稽核與建議書。'
  }
]

const selectedProvider = ref(null)
const step = ref('providers') // providers | upload
const uploadedFile = ref(null)
const notes = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')

const selectProvider = (provider) => {
  selectedProvider.value = provider
  submitMessage.value = ''
}

const goToUpload = () => {
  step.value = 'upload'
  submitMessage.value = ''
}

const onlyManualUpload = () => {
  selectedProvider.value = null
  goToUpload()
}

const handleFileChange = (event) => {
  const [file] = event.target.files || []
  uploadedFile.value = file || null
  submitMessage.value = ''
}

const submitUpload = async () => {
  if (isSubmitting.value) return
  isSubmitting.value = true
  submitMessage.value = ''
  await new Promise((resolve) => setTimeout(resolve, 600))
  submitMessage.value = '已收到資料，我們會在 1 個工作天內回覆審查狀態。'
  isSubmitting.value = false
}

const closeModal = () => {
  emit('close')
  step.value = 'providers'
  selectedProvider.value = null
  uploadedFile.value = null
  notes.value = ''
  submitMessage.value = ''
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <div
      class="relative bg-gradient-to-br from-corgi-darker to-black border border-corgi-primary/30 rounded-3xl shadow-[0_25px_100px_rgba(0,0,0,0.6)] w-full max-w-5xl max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <button
        class="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors"
        @click="closeModal"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      <section class="p-8 space-y-8">
        <header class="space-y-2">
          <p class="text-xs uppercase tracking-[0.35em] text-corgi-text-light">Level 3</p>
          <div class="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 class="text-3xl font-bold text-white">第三方認證 / 證據匯入</h2>
              <p class="text-sm text-corgi-text-light/80 mt-2">
                選擇合作服務商或改為自行上傳證明文件，我們會協助整理成授信可用的風險報告。
              </p>
            </div>
            <span class="px-4 py-1 rounded-full text-xs border border-corgi-primary/60 text-corgi-primary/90">
              全程加密處理
            </span>
          </div>
        </header>

        <div v-if="step === 'providers'" class="space-y-6">
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <article
              v-for="provider in providers"
              :key="provider.id"
              class="rounded-2xl border transition-all duration-200 p-5 bg-corgi-dark/60"
              :class="selectedProvider?.id === provider.id ? 'border-corgi-primary shadow-lg shadow-corgi-primary/20' : 'border-white/10 hover:border-corgi-primary/40'"
            >
              <div class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-semibold text-white">{{ provider.name }}</h3>
                <span class="text-xs px-3 py-1 rounded-full bg-corgi-primary/10 text-corgi-primary whitespace-nowrap">
                  {{ provider.badge }}
                </span>
              </div>
              <p class="text-sm text-corgi-text-light mb-3 leading-relaxed">{{ provider.description }}</p>
              <ul class="text-xs text-corgi-text-light/70 space-y-1 mb-4">
                <li><span class="text-corgi-primary">處理時程：</span>{{ provider.eta }}</li>
                <li><span class="text-corgi-primary">覆蓋範圍：</span>{{ provider.coverage.join('、') }}</li>
              </ul>
              <button
                type="button"
                class="w-full py-2 rounded-xl border text-sm font-semibold transition-colors"
                :class="selectedProvider?.id === provider.id ? 'border-corgi-primary bg-corgi-primary text-black' : 'border-white/20 text-white hover:border-corgi-primary/60'"
                @click="selectProvider(provider)"
              >
                {{ selectedProvider?.id === provider.id ? '已選擇' : '選擇此服務商' }}
              </button>
            </article>
          </div>

          <div class="flex flex-col sm:flex-row justify-between gap-3">
            <button
              class="flex-1 min-w-[200px] py-3 rounded-xl text-sm font-semibold transition-colors"
              :class="selectedProvider ? 'bg-corgi-primary text-black hover:bg-white' : 'bg-gray-700 text-gray-400 cursor-not-allowed'"
              :disabled="!selectedProvider"
              @click="goToUpload"
            >
              下一步：確認資料 & 上傳
            </button>
            <button
              type="button"
              class="flex-1 min-w-[200px] py-3 rounded-xl text-sm font-semibold border border-white/20 text-white hover:border-corgi-primary hover:text-corgi-primary transition-colors"
              @click="onlyManualUpload"
            >
              我想自行上傳
            </button>
          </div>
        </div>

        <div v-else class="space-y-6">
          <div class="bg-corgi-dark/70 border border-corgi-primary/20 rounded-2xl p-6 space-y-4">
            <div class="flex items-center justify-between flex-wrap gap-3">
              <div>
                <p class="text-xs uppercase tracking-[0.25em] text-corgi-text-light">STEP 2</p>
                <h3 class="text-xl font-semibold text-white mt-1">資料匯入與上傳</h3>
              </div>
              <button
                class="text-xs px-3 py-1 rounded-full border border-white/10 text-corgi-text-light hover:text-corgi-primary transition-colors"
                @click="step = 'providers'"
              >
                ← 返回服務商列表
              </button>
            </div>

            <div
              v-if="selectedProvider"
              class="border border-corgi-primary/30 rounded-xl p-4 bg-black/30 space-y-2"
            >
              <div class="flex items-center justify-between">
                <p class="font-semibold text-white">{{ selectedProvider.name }}</p>
                <span class="text-xs text-corgi-primary">{{ selectedProvider.eta }}</span>
              </div>
              <p class="text-sm text-corgi-text-light/80">{{ selectedProvider.description }}</p>
              <p class="text-xs text-corgi-text-light/60">
                會依序收集：{{ selectedProvider.coverage.join('、') }}，完成後自動同步到授信檔案。
              </p>
            </div>
            <div v-else class="border border-dashed border-white/20 rounded-xl p-4 text-sm text-corgi-text-light/70">
              您選擇自行上傳資料，我們會於收到檔案後啟動人工審看。
            </div>
          </div>

          <div class="bg-black/40 border border-white/10 rounded-2xl p-6 space-y-4">
            <div>
              <h4 class="text-lg font-semibold text-white">上傳佐證資料</h4>
              <p class="text-sm text-corgi-text-light/70">
                支援 PDF、DOCX、ZIP（科技治理稽核、四大顧問報告、ISO 證書、AI 治理流程等）。單檔 20MB 以內。
              </p>
            </div>

            <label
              class="border-2 border-dashed border-white/20 rounded-2xl p-6 text-center cursor-pointer hover:border-corgi-primary/60 transition-colors flex flex-col items-center gap-3"
            >
              <span class="text-4xl">📤</span>
              <p class="text-sm text-white">
                拖拉或點擊上傳
                <span class="text-corgi-primary block">{{ uploadedFile ? uploadedFile.name : '尚未選擇檔案' }}</span>
              </p>
              <input type="file" class="hidden" @change="handleFileChange" />
            </label>

            <label class="block text-sm text-corgi-text-light/80">
              備註
              <textarea
                v-model="notes"
                rows="3"
                class="mt-2 w-full rounded-2xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-corgi-primary/60"
                placeholder="說明資料範圍、最近檢測日期、需注意事項..."
              ></textarea>
            </label>

            <div class="flex flex-col sm:flex-row gap-3">
              <button
                class="flex-1 py-3 rounded-xl bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white font-semibold hover:shadow-lg hover:shadow-corgi-primary/30 transition-all disabled:opacity-60"
                :disabled="isSubmitting"
                @click="submitUpload"
              >
                {{ isSubmitting ? '傳送中…' : '送出資料' }}
              </button>
              <button
                class="flex-1 py-3 rounded-xl border border-white/15 text-sm text-corgi-text-light hover:border-corgi-primary hover:text-corgi-primary transition-colors"
                @click="closeModal"
              >
                取消
              </button>
            </div>

            <p v-if="submitMessage" class="text-sm text-emerald-300">
              {{ submitMessage }}
            </p>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
