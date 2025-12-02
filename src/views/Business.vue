<template>
  <div class="min-h-screen bg-corgi-dark text-white">
    <!-- Header with improved styling -->
    <header class="sticky top-0 z-10 bg-corgi-dark/95 backdrop-blur-sm border-b border-corgi-primary/20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <img src="@/assets/images/logo.png" alt="CorgiRisk Logo" class="w-10 h-10 object-contain" />
            <div>
              <h1 class="text-xl font-bold text-white">企業科技體檢專區</h1>
              <p class="text-xs text-corgi-text-light">Corporate Technology Assessment</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="hidden sm:flex items-center gap-2 text-sm text-corgi-text-light bg-corgi-darker px-3 py-1.5 rounded-full">
              <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>系統運作中</span>
            </div>
            <router-link
              to="/"
              class="px-4 py-2 bg-corgi-darker hover:bg-corgi-primary rounded-lg text-sm transition-all duration-200 hover:shadow-lg hover:shadow-corgi-primary/20"
            >
              回首頁
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <!-- Dashboard Area - Left Side (2/3 width) -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Company Info Card -->
          <div class="bg-gradient-to-br from-corgi-darker to-corgi-dark border border-corgi-primary/30 rounded-2xl p-6 shadow-xl">
            <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <!-- Company Name -->
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-2">
                  <h2 class="text-2xl font-bold text-white">{{ riskStore.companyName }}</h2>
                  <span class="px-3 py-1 bg-corgi-primary/20 text-corgi-primary text-xs font-semibold rounded-full border border-corgi-primary/50">
                    {{ getIndustryName(riskStore.industry) }}
                  </span>
                </div>
                <p class="text-sm text-corgi-text-light">企業識別碼: {{ riskStore.companyName.slice(0, 4).toUpperCase() }}-{{ Date.now().toString().slice(-4) }}</p>
              </div>

              <!-- Score Display -->
              <div class="flex items-center gap-6">
                <!-- Risk Level -->
                <div class="text-center">
                  <div class="text-xs text-corgi-text-light mb-1 uppercase tracking-wider">風險評級</div>
                  <div class="relative">
                    <div class="absolute inset-0 bg-corgi-primary/20 blur-xl rounded-full"></div>
                    <div class="relative text-5xl font-black text-corgi-primary drop-shadow-lg">
                      {{ riskStore.riskLevel }}
                    </div>
                  </div>
                  <div class="text-xs text-corgi-text-light mt-1">{{ getRiskLevelText(riskStore.riskLevel) }}</div>
                </div>

                <!-- Divider -->
                <div class="h-16 w-px bg-gradient-to-b from-transparent via-corgi-primary/50 to-transparent"></div>

                <!-- Base Score -->
                <div class="text-center">
                  <div class="text-xs text-corgi-text-light mb-1 uppercase tracking-wider">綜合分數</div>
                  <div class="text-3xl font-bold text-white">{{ riskStore.finalScore }}</div>
                  <div class="text-xs text-corgi-text-light mt-1">/ 100</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Radar Chart Card -->
          <div class="bg-corgi-darker border border-corgi-primary/20 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-white">六大構面分析</h3>
              <span class="text-xs text-corgi-text-light bg-corgi-dark px-3 py-1 rounded-full">
                Technology Risk Dimensions
              </span>
            </div>
            <div class="bg-corgi-dark rounded-xl p-4 border border-corgi-primary/10">
              <CorgiRadar />
            </div>

            <!-- Dimension Legend -->
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-6">
              <div v-for="(value, key) in riskStore.dimensions" :key="key" class="flex items-center gap-2 bg-corgi-dark px-3 py-2 rounded-lg">
                <div class="w-2 h-2 rounded-full bg-corgi-accent"></div>
                <div class="flex-1">
                  <div class="text-xs text-corgi-text-light">{{ getDimensionName(key) }}</div>
                  <div class="text-sm font-bold text-white">{{ value }}<span class="text-xs text-gray-500">/100</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Wizard Area - Right Side (1/3 width) -->
        <div class="lg:sticky lg:top-24 h-fit">
          <div class="bg-corgi-darker border border-corgi-primary/30 rounded-2xl p-6 shadow-xl">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-lg font-bold text-white">體檢流程</h3>
              <div class="text-xs text-corgi-text-light bg-corgi-dark px-3 py-1 rounded-full">
                {{ getCompletionPercentage() }}% 完成
              </div>
            </div>

            <div class="space-y-6">
              <!-- Level 1 -->
              <div class="relative">
                <div class="bg-corgi-dark rounded-xl p-4 border-2 border-corgi-primary shadow-lg shadow-corgi-primary/10">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-8 h-8 bg-corgi-primary rounded-lg flex items-center justify-center text-lg shadow-lg relative z-10">
                      🐶
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-corgi-primary">Level 1</h4>
                      <p class="text-xs text-corgi-text-light">企業自證</p>
                    </div>
                    <span v-if="level1Completed" class="text-xs bg-corgi-primary/20 text-corgi-primary px-2 py-1 rounded-full">✓ 完成</span>
                  </div>
                  <button
                    @click="openLevel1Modal"
                    class="w-full py-2 px-4 bg-corgi-primary/10 hover:bg-corgi-primary/20 border border-corgi-primary/30 text-corgi-primary rounded-lg transition-all text-sm font-semibold"
                  >
                    {{ level1Completed ? '查看/編輯自證資料' : '開始填寫' }}
                  </button>
                </div>
              </div>

              <!-- Level 2 -->
              <div class="relative">
                <div class="bg-corgi-dark rounded-xl p-4 border-2 transition-all duration-300"
                     :class="riskStore.isApiConnected ? 'border-corgi-secondary shadow-lg shadow-corgi-secondary/10' : 'border-gray-700'">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-8 h-8 rounded-lg flex items-center justify-center text-lg shadow-lg relative z-10 transition-colors"
                         :class="riskStore.isApiConnected ? 'bg-corgi-secondary' : 'bg-gray-700'">
                      🔗
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold transition-colors"
                          :class="riskStore.isApiConnected ? 'text-corgi-secondary' : 'text-gray-500'">
                        Level 2
                      </h4>
                      <p class="text-xs text-corgi-text-light">系統串接</p>
                    </div>
                    <span v-if="riskStore.isApiConnected" class="text-xs bg-corgi-secondary/20 text-corgi-secondary px-2 py-1 rounded-full">✓ 完成</span>
                  </div>
                  <div v-if="!riskStore.isApiConnected">
                    <button
                      @click="handleConnect"
                      class="w-full py-3 px-4 bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white rounded-lg hover:shadow-lg hover:shadow-corgi-primary/30 transition-all duration-200 flex items-center justify-center gap-2 font-semibold"
                      :disabled="isLoading"
                    >
                      <LoadingBone v-if="isLoading" class="w-6 h-6" />
                      <span v-else>連結 API 進行檢測</span>
                    </button>
                  </div>
                  <div v-else class="bg-corgi-secondary/10 text-corgi-secondary p-3 rounded-lg text-sm flex items-center gap-2 border border-corgi-secondary/30">
                    <span>✅ 已完成系統對接</span>
                  </div>
                </div>
              </div>

              <!-- Level 3 -->
              <div class="relative">
                <div class="bg-corgi-dark rounded-xl p-4 border-2 border-gray-700">
                  <div class="flex items-center gap-3 mb-4">
                    <div class="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center text-lg shadow-lg relative z-10">
                      📄
                    </div>
                    <div class="flex-1">
                      <h4 class="font-bold text-gray-500">Level 3</h4>
                      <p class="text-xs text-corgi-text-light">第三方認證</p>
                    </div>
                    <span class="text-xs bg-gray-700 text-gray-400 px-2 py-1 rounded-full">待完成</span>
                  </div>
                  <button
                    class="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center hover:border-corgi-primary hover:bg-corgi-primary/5 transition-all duration-200 cursor-pointer group w-full"
                    @click="openLevel3Modal"
                  >
                    <div class="text-3xl mb-2 group-hover:scale-110 transition-transform">📤</div>
                    <p class="text-xs text-gray-500 group-hover:text-corgi-primary transition-colors">
                      點擊選擇合作服務商<br/>
                      或改為自行上傳證明文件
                    </p>
                  </button>
                </div>
              </div>
            </div>

            <!-- Quick Fill Button -->
            <button
              @click="oneClickFill"
              class="w-full mt-6 py-2 text-xs text-gray-500 hover:text-corgi-primary hover:bg-corgi-primary/5 rounded-lg transition-all duration-200 border border-dashed border-gray-700 hover:border-corgi-primary"
            >
              🎯 快速完成體檢流程
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Modals -->
    <Level1Modal v-if="showLevel1Modal" @close="showLevel1Modal = false" @submit="handleLevel1Submit" />
    <Level2Modal v-if="showLevel2Modal" @close="showLevel2Modal = false" @connect="handleLevel2Connect" />
    <Level3Modal v-if="showLevel3Modal" @close="showLevel3Modal = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRiskStore } from '@/stores/riskStore'
import CorgiRadar from '@/components/CorgiRadar.vue'
import LoadingBone from '@/components/LoadingBone.vue'
import Level1Modal from '@/components/Level1Modal.vue'
import Level2Modal from '@/components/Level2Modal.vue'
import Level3Modal from '@/components/Level3Modal.vue'

const riskStore = useRiskStore()
const isLoading = ref(false)
const showLevel1Modal = ref(false)
const showLevel2Modal = ref(false)
const showLevel3Modal = ref(false)
const level1Completed = ref(true) // 預設已完成

const openLevel1Modal = () => {
  showLevel1Modal.value = true
}

const handleLevel1Submit = (data) => {
  console.log('Level 1 數據:', data)
  level1Completed.value = true
}

const openLevel2Modal = () => {
  showLevel2Modal.value = true
}

const handleLevel2Connect = (apis) => {
  console.log('API 連接數據:', apis)
  riskStore.connectApi()
}

const handleConnect = () => {
  openLevel2Modal()
}

const openLevel3Modal = () => {
  showLevel3Modal.value = true
}

const oneClickFill = () => {
  handleConnect()
}

// Helper functions for display
const getIndustryName = (industry) => {
  const names = {
    'retail': '零售業',
    'medical': '醫療業',
    'manufacturing': '製造業'
  }
  return names[industry] || industry
}

const getRiskLevelText = (level) => {
  const texts = {
    'AAA': '頂級信用｜極低風險',
    'AA': '高信用｜非常低風險',
    'A': '穩健信用｜低風險',
    'BBB': '投資等級｜需持續觀察',
    'BB': '次投資等級｜偏高風險',
    'B': '高風險｜建議控管',
    'CCC': '極高風險｜立即介入'
  }
  return texts[level] || '評估中'
}

const getDimensionName = (key) => {
  const names = {
    'stability': '系統穩定性',
    'security': '資安成熟度',
    'governance': '科技治理',
    'supplier': '供應商依賴',
    'aiRisk': 'AI 風險',
    'trend': '趨勢適應力'
  }
  return names[key] || key
}

const getCompletionPercentage = () => {
  let completed = 1 // Level 1 always completed
  if (riskStore.isApiConnected) completed++
  return Math.round((completed / 3) * 100)
}
</script>
