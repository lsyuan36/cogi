<template>
  <div class="min-h-screen bg-corgi-dark text-white p-6">
    <header class="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
      <div class="flex items-center gap-3">
        <img src="@/assets/images/logo.png" alt="CorgiRisk Logo" class="w-10 h-10 object-contain" />
        <h1 class="text-2xl font-bold text-corgi-primary">CorgiRisk 管理後台</h1>
      </div>
      <router-link to="/" class="text-gray-400 hover:text-white">回首頁</router-link>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <!-- Stat Cards -->
      <div class="bg-corgi-darker p-6 rounded-xl border border-gray-800">
        <div class="text-gray-400 text-sm mb-2">API 延遲 (FastAPI)</div>
        <div class="text-3xl font-bold text-green-400">45ms</div>
        <div class="text-xs text-gray-500 mt-2">↓ 12% vs last hour</div>
      </div>
      
      <div class="bg-corgi-darker p-6 rounded-xl border border-gray-800">
        <div class="text-gray-400 text-sm mb-2">Gemini Token Usage</div>
        <div class="text-3xl font-bold text-blue-400">1.2M</div>
        <div class="text-xs text-gray-500 mt-2">Daily Quota: 85%</div>
      </div>

      <div class="bg-corgi-darker p-6 rounded-xl border border-gray-800">
        <div class="text-gray-400 text-sm mb-2">爬蟲狀態</div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-xl font-bold">Running</span>
        </div>
        <div class="text-xs text-gray-500 mt-2">Target: EU AI Act</div>
      </div>

      <div class="bg-corgi-darker p-6 rounded-xl border border-gray-800">
        <div class="text-gray-400 text-sm mb-2">模型效益提升</div>
        <div class="text-3xl font-bold text-corgi-primary">+37%</div>
        <div class="text-xs text-gray-500 mt-2">vs Static Model</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Crawler Logs -->
      <div class="lg:col-span-2 bg-corgi-darker rounded-xl border border-gray-800 p-6">
        <h3 class="font-bold mb-4 flex items-center gap-2">
          <span>🕷️</span> 爬蟲日誌
        </h3>
        <div class="space-y-2 font-mono text-sm h-64 overflow-y-auto custom-scrollbar">
          <div v-for="(log, index) in logs" :key="index" class="flex gap-3 border-b border-gray-800/50 pb-1">
            <span class="text-gray-500">[{{ log.time }}]</span>
            <span :class="log.color">{{ log.message }}</span>
          </div>
        </div>
      </div>

      <!-- System Health -->
      <div class="bg-corgi-darker rounded-xl border border-gray-800 p-6">
        <h3 class="font-bold mb-4">系統健康度</h3>
        <div class="space-y-6">
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span>CPU Usage</span>
              <span>42%</span>
            </div>
            <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-green-500 w-[42%]"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span>Memory</span>
              <span>68%</span>
            </div>
            <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-yellow-500 w-[68%]"></div>
            </div>
          </div>
          <div>
            <div class="flex justify-between text-sm mb-1">
              <span>Storage</span>
              <span>24%</span>
            </div>
            <div class="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div class="h-full bg-blue-500 w-[24%]"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Notification (Simulated) -->
    <div v-if="showToast" class="fixed bottom-8 right-8 bg-gray-800 border border-gray-700 text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 animate-slide-up">
      <div class="text-2xl">🇪🇺</div>
      <div>
        <div class="font-bold">已更新法規資料庫</div>
        <div class="text-sm text-gray-400">來源：歐盟 AI 法案 (EU AI Act)</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const logs = ref([
  { time: '10:00:01', message: 'Starting Selenium WebDriver...', color: 'text-blue-400' },
  { time: '10:00:05', message: 'Connected to EU Law Database', color: 'text-green-400' },
  { time: '10:00:12', message: 'Parsing Article 15...', color: 'text-gray-300' },
  { time: '10:00:15', message: 'Found new compliance requirement: "High-risk AI systems"', color: 'text-yellow-400' },
])

const showToast = ref(false)

onMounted(() => {
  setTimeout(() => {
    logs.value.unshift({ 
      time: new Date().toLocaleTimeString(), 
      message: 'Successfully indexed EU AI Act 2024', 
      color: 'text-green-400' 
    })
    showToast.value = true
    setTimeout(() => showToast.value = false, 5000)
  }, 2000)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #1a1a1a; 
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #333; 
  border-radius: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #555; 
}
@keyframes slide-up {
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
.animate-slide-up {
  animation: slide-up 0.5s ease-out forwards;
}
</style>
