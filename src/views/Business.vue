<template>
  <div class="min-h-screen bg-corgi-dark text-white p-6">
    <!-- Desktop Header -->
    <header class="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg flex items-center justify-center font-bold text-white">
          B
        </div>
        <h1 class="text-xl font-bold text-gray-100">企業科技體檢專區 <span class="text-xs text-gray-500 ml-2">Corporate Assessment</span></h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-sm text-gray-400">
          <span class="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span>
          System Online
        </div>
        <router-link to="/" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
          回首頁
        </router-link>
      </div>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Dashboard Area -->
      <div class="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
        <div class="flex flex-col md:flex-row items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-bold text-white mb-1">{{ riskStore.companyName }}</h2>
            <p class="text-sm text-gray-400">產業類別: {{ riskStore.industry }}</p>
          </div>
          <div class="flex items-center gap-4 mt-4 md:mt-0">
            <div class="text-center">
              <div class="text-sm text-gray-400">風險評級</div>
              <div class="text-4xl font-bold text-corgi-primary">{{ riskStore.riskLevel }}</div>
            </div>
            <div class="text-center border-l border-gray-600 pl-4">
              <div class="text-sm text-gray-400">基礎分數</div>
              <div class="text-2xl font-bold text-white">{{ riskStore.baseScore }}</div>
            </div>
          </div>
        </div>

        <!-- Radar Chart Placeholder -->
        <div class="aspect-video bg-gray-900 rounded-lg flex items-center justify-center relative border border-gray-700">
           <CorgiRadar />
        </div>
      </div>

      <!-- Wizard Area -->
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm h-fit">
        <h3 class="text-lg font-bold text-white mb-4">體檢進度</h3>
        
        <div class="space-y-6">
          <!-- Level 1 -->
          <div class="border-l-2 border-corgi-primary pl-4 pb-2">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-lg border border-corgi-primary">
                🐶
              </div>
              <h4 class="font-bold text-corgi-primary">Level 1: 企業自證</h4>
            </div>
            <div class="space-y-2 pl-10">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked class="accent-corgi-primary w-4 h-4">
                <span class="text-sm text-gray-300">是否有專職 IT 人員</span>
              </label>
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked class="accent-corgi-primary w-4 h-4">
                <span class="text-sm text-gray-300">每週定期備份資料</span>
              </label>
            </div>
          </div>

          <!-- Level 2 -->
          <div class="border-l-2 border-corgi-secondary pl-4 pb-2">
            <h4 class="font-bold text-corgi-secondary mb-2">Level 2: 系統串接</h4>
            <div v-if="!riskStore.isApiConnected">
              <button 
                @click="handleConnect" 
                class="w-full py-2 px-4 bg-corgi-secondary text-white rounded-lg hover:bg-corgi-primary transition-colors flex items-center justify-center gap-2"
                :disabled="isLoading"
              >
                <LoadingBone v-if="isLoading" class="w-6 h-6" />
                <span v-else>連結 API 進行檢測</span>
              </button>
            </div>
            <div v-else class="bg-green-900/30 text-green-400 p-3 rounded-lg text-sm flex items-center gap-2 border border-green-900">
              <span>✅ 已完成系統對接</span>
            </div>
          </div>

          <!-- Level 3 -->
          <div class="border-l-2 border-gray-600 pl-4 pb-2">
            <h4 class="font-bold text-gray-500 mb-2">Level 3: 第三方認證</h4>
            <div class="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center hover:border-corgi-primary transition-colors cursor-pointer group">
              <div class="text-2xl mb-2 group-hover:scale-110 transition-transform">📄</div>
              <p class="text-xs text-gray-500 group-hover:text-corgi-primary">拖拉上傳 ISO 27001 證書或弱掃報告</p>
            </div>
          </div>
        </div>
        
        <button @click="oneClickFill" class="w-full mt-8 text-xs text-gray-500 hover:text-corgi-primary underline">
          [Demo] 一鍵完成填寫
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRiskStore } from '@/stores/riskStore'
import CorgiRadar from '@/components/CorgiRadar.vue'
import LoadingBone from '@/components/LoadingBone.vue'

const riskStore = useRiskStore()
const isLoading = ref(false)

const handleConnect = () => {
  isLoading.value = true
  setTimeout(() => {
    riskStore.connectApi()
    isLoading.value = false
  }, 1500)
}

const oneClickFill = () => {
  handleConnect()
}
</script>
