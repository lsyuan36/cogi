<template>
  <div class="min-h-screen bg-corgi-dark text-white p-6 flex flex-col">
    <!-- Desktop Header -->
    <header class="flex justify-between items-center mb-6 border-b border-gray-800 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center font-bold text-white">
          C
        </div>
        <h1 class="text-xl font-bold text-gray-100">授信審核專區 <span class="text-xs text-gray-500 ml-2">Credit Review</span></h1>
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

    <div class="grid grid-cols-12 gap-6 flex-1">
      
      <!-- Left Column: Basic Info -->
      <div class="col-span-3 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm h-fit">
        <div class="mb-6">
          <div class="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl mb-4 border border-gray-600">
            🏢
          </div>
          <h2 class="text-xl font-bold text-white">{{ riskStore.companyName }}</h2>
          <p class="text-sm text-gray-400">統一編號: 12345678</p>
        </div>

        <div class="space-y-4">
          <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">綜合風險評級</div>
            <div class="text-3xl font-bold text-corgi-primary">{{ riskStore.riskLevel }}</div>
          </div>
          <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div class="text-sm text-gray-400 mb-1">科技信用分</div>
            <div class="text-2xl font-bold text-white">{{ riskStore.finalScore }}</div>
          </div>
        </div>
      </div>

      <!-- Middle Column: Simulator -->
      <div class="col-span-6 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col">
        <div class="flex justify-between items-center mb-6">
          <h3 class="font-bold text-lg text-white">動態授信模擬器</h3>
          <div class="flex items-center gap-2">
            <span class="text-sm font-medium text-gray-300">導入 CorgiRisk</span>
            <button 
              @click="toggleCorgiRisk"
              class="w-12 h-6 rounded-full transition-colors relative"
              :class="useCorgiRisk ? 'bg-corgi-primary' : 'bg-gray-600'"
            >
              <div 
                class="w-4 h-4 bg-white rounded-full absolute top-1 transition-all"
                :class="useCorgiRisk ? 'left-7' : 'left-1'"
              ></div>
            </button>
          </div>
        </div>

        <!-- Chart Area -->
        <div class="flex-1 bg-gray-900 rounded-lg p-4 mb-6 border border-gray-700 relative min-h-[300px]">
          <CorgiLineChart :use-ai="useCorgiRisk" />
        </div>

        <!-- Simulation Controls -->
        <div class="grid grid-cols-3 gap-4">
          <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div class="text-xs text-gray-400 mb-1">預估違約率 (PD)</div>
            <div class="text-xl font-bold" :class="useCorgiRisk ? 'text-green-400' : 'text-red-400'">
              {{ useCorgiRisk ? '1.2%' : '4.8%' }}
            </div>
            <div class="text-xs text-gray-500 mt-1" v-if="useCorgiRisk">↓ 75%</div>
          </div>
          <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div class="text-xs text-gray-400 mb-1">建議授信額度</div>
            <div class="text-xl font-bold text-white">
              {{ useCorgiRisk ? '1,500' : '800' }} 萬
            </div>
          </div>
          <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div class="text-xs text-gray-400 mb-1">利率減碼</div>
            <div class="text-xl font-bold text-corgi-primary">
              {{ useCorgiRisk ? '0.15%' : '0%' }}
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Decision -->
      <div class="col-span-3 bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col">
        <h3 class="font-bold text-lg text-white mb-6">審核決策</h3>
        
        <div class="space-y-4 flex-1">
          <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
            <div class="flex items-center gap-2 mb-2">
              <span class="text-xl">🤖</span>
              <span class="font-bold text-white">AI 建議</span>
            </div>
            <p class="text-sm text-gray-400 leading-relaxed">
              根據該公司導入之資安防護機制，建議可提升授信額度至 1,500 萬，並給予利率優惠。
            </p>
          </div>

          <div class="space-y-2">
            <div class="text-sm text-gray-400">人工覆核意見</div>
            <textarea 
              class="w-full h-32 bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-corgi-primary resize-none"
              placeholder="請輸入覆核意見..."
            ></textarea>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 mt-6">
          <button class="py-2 bg-red-900/50 text-red-400 border border-red-900 rounded-lg hover:bg-red-900/80 transition-colors">
            退回補件
          </button>
          <button class="py-2 bg-corgi-primary text-white rounded-lg hover:bg-corgi-secondary transition-colors shadow-lg shadow-corgi-primary/20">
            核准放行
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRiskStore } from '@/stores/riskStore'
import CorgiLineChart from '@/components/CorgiLineChart.vue'

const riskStore = useRiskStore()
const useCorgiRisk = ref(false)

const toggleCorgiRisk = () => {
  useCorgiRisk.value = !useCorgiRisk.value
}
</script>
