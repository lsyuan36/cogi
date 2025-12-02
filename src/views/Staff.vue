<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Desktop Header -->
    <header class="bg-corgi-darker text-white px-8 py-4 flex justify-between items-center shadow-md">
      <div class="flex items-center gap-4">
        <router-link to="/" class="text-gray-400 hover:text-white transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        </router-link>
        <img src="@/assets/images/logo.png" alt="CorgiRisk Logo" class="w-8 h-8 object-contain" />
        <h1 class="font-bold text-xl">科技訪查助手</h1>
      </div>
      <div class="flex items-center gap-4">
        <div class="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-3">
          <span class="text-sm text-gray-400">當前訪查對象</span>
          <span class="font-bold text-corgi-primary">{{ riskStore.companyName }}</span>
        </div>
        <div class="w-8 h-8 bg-corgi-primary rounded-full flex items-center justify-center font-bold">
          S
        </div>
      </div>
    </header>

    <!-- Main Content Grid -->
    <div class="flex-1 p-8 grid grid-cols-12 gap-6 overflow-hidden">
      
      <!-- Column 1: Risk Profile (Retrieval) -->
      <div class="col-span-3 bg-white rounded-xl shadow-sm p-6 h-full overflow-y-auto">
        <h2 class="text-lg font-bold text-corgi-text-dark mb-4 flex items-center gap-2">
          <span>🔍</span> 科技輪廓摘要
        </h2>
        
        <div class="space-y-6">
          <div class="bg-orange-50 border border-orange-100 rounded-lg p-4">
            <div class="text-xs text-gray-500 mb-1">系統架構</div>
            <div class="font-bold text-corgi-text-dark">混合雲 (AWS + 地端)</div>
          </div>

          <div class="bg-orange-50 border border-orange-100 rounded-lg p-4">
            <div class="text-xs text-gray-500 mb-1">關鍵供應商</div>
            <div class="font-bold text-corgi-warning">高度依賴單一 POS 廠商</div>
            <div class="mt-2 text-xs bg-white/50 p-2 rounded text-corgi-warning">
              ⚠️ 風險提示：若廠商停擺，營運將中斷
            </div>
          </div>

          <div class="bg-orange-50 border border-orange-100 rounded-lg p-4">
            <div class="text-xs text-gray-500 mb-1">資安習慣</div>
            <div class="font-bold text-corgi-text-dark">無定期弱掃紀錄</div>
          </div>

          <div class="border-t border-gray-100 pt-4">
            <h3 class="font-bold text-sm mb-2 text-gray-500">RM 訪前備註</h3>
            <ul class="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>確認機房是否有獨立空調</li>
              <li>詢問上次災難演練時間</li>
              <li>檢查備份硬碟存放位置</li>
            </ul>
          </div>

          <div class="border-t border-gray-100 pt-4 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-xs text-gray-500 uppercase tracking-wide">標普科技風險評級</p>
                <p class="text-4xl font-black text-corgi-primary leading-tight">{{ riskStore.riskLevel }}</p>
                <p class="text-xs text-gray-400">科技信用分：{{ riskStore.finalScore }} / 100</p>
              </div>
              <div class="text-right text-xs space-y-1">
                <p class="text-gray-500">流程完成度</p>
                <p class="text-corgi-primary font-semibold">{{ progressPercent }}%</p>
              </div>
            </div>

            <ul class="space-y-2">
              <li
                v-for="status in levelStatuses"
                :key="status.level"
                class="flex items-center justify-between text-xs border border-gray-100 rounded-lg px-3 py-2"
              >
                <div>
                  <p class="font-semibold text-gray-700">{{ status.level }}｜{{ status.label }}</p>
                  <p class="text-gray-400">{{ status.hint }}</p>
                </div>
                <span
                  :class="status.done ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 'text-amber-600 bg-amber-50 border-amber-100'"
                  class="px-3 py-1 rounded-full border text-[11px] font-semibold"
                >
                  {{ status.done ? '已確認' : '待確認' }}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Column 2: Checklist (Judgment) -->
      <div class="col-span-5 bg-white rounded-xl shadow-sm p-6 h-full overflow-y-auto">
        <h2 class="text-lg font-bold text-corgi-text-dark mb-4 flex items-center gap-2">
          <span>✅</span> 現場檢核表
        </h2>

        <div class="space-y-4">
          <!-- Item 1 -->
          <div class="border border-gray-100 rounded-lg p-4 hover:border-corgi-primary/30 transition-colors">
            <div class="flex items-start gap-3">
              <input type="checkbox" class="mt-1 w-5 h-5 accent-corgi-primary cursor-pointer">
              <div class="flex-1">
                <div class="font-bold text-corgi-text-dark">機房是否有門禁管制？</div>
                <div class="text-sm text-gray-500 mt-1">企業自填：<span class="text-green-600 font-bold">有</span></div>
              </div>
            </div>
          </div>

          <!-- Item 2 -->
          <div class="border border-gray-100 rounded-lg p-4 hover:border-corgi-primary/30 transition-colors">
            <div class="flex items-start gap-3">
              <input type="checkbox" class="mt-1 w-5 h-5 accent-corgi-primary cursor-pointer" @change="showWarning = !showWarning">
              <div class="flex-1">
                <div class="font-bold text-corgi-text-dark">伺服器是否有不斷電系統 (UPS)？</div>
                <div class="text-sm text-gray-500 mt-1">企業自填：<span class="text-green-600 font-bold">有</span></div>
                
                <div v-if="showWarning" class="mt-3 bg-red-50 border border-red-100 p-3 rounded-lg flex items-start gap-3 animate-pulse">
                  <span class="text-xl">⚠️</span>
                  <div>
                    <div class="font-bold text-corgi-warning text-sm">警示：與自證資料不符</div>
                    <div class="text-xs text-red-600">請務必拍照存證，並在右側註記原因。</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Item 3 -->
          <div class="border border-gray-100 rounded-lg p-4 hover:border-corgi-primary/30 transition-colors">
            <div class="flex items-start gap-3">
              <input type="checkbox" class="mt-1 w-5 h-5 accent-corgi-primary cursor-pointer">
              <div class="flex-1">
                <div class="font-bold text-corgi-text-dark">備份磁帶/硬碟是否異地存放？</div>
                <div class="text-sm text-gray-500 mt-1">企業自填：<span class="text-gray-400">無</span></div>
              </div>
            </div>
          </div>

           <!-- Item 4 -->
           <div class="border border-gray-100 rounded-lg p-4 hover:border-corgi-primary/30 transition-colors">
            <div class="flex items-start gap-3">
              <input type="checkbox" class="mt-1 w-5 h-5 accent-corgi-primary cursor-pointer">
              <div class="flex-1">
                <div class="font-bold text-corgi-text-dark">作業系統是否皆為正版且更新？</div>
                <div class="text-sm text-gray-500 mt-1">企業自填：<span class="text-green-600 font-bold">是</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-8 border-t border-gray-100 pt-6">
          <h3 class="text-sm font-bold text-gray-500 mb-4">科技構面確認（同步 Business 評估）</h3>
          <div class="space-y-3">
            <div
              v-for="item in dimensionCheckpoints"
              :key="item.key"
              class="border border-gray-100 rounded-lg p-4 hover:border-corgi-primary/30 transition-colors"
            >
              <div class="flex items-center justify-between mb-2">
                <div>
                  <p class="font-semibold text-gray-800">{{ item.title }}</p>
                  <p class="text-xs text-gray-400">評分：{{ item.score }} / 100</p>
                </div>
                <span :class="item.badgeClass" class="px-3 py-1 rounded-full text-[11px] font-semibold border">
                  {{ item.statusLabel }}
                </span>
              </div>
              <p class="text-sm text-gray-600">{{ item.action }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Column 3: Evidence (Action) -->
      <div class="col-span-4 bg-white rounded-xl shadow-sm p-6 h-full flex flex-col">
        <h2 class="text-lg font-bold text-corgi-text-dark mb-4 flex items-center gap-2">
          <span>📷</span> 證據留存
        </h2>

        <div class="flex-1 bg-gray-100 rounded-xl overflow-hidden relative mb-4 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center group hover:border-corgi-primary transition-colors">
          
          <div v-if="!photoTaken && !isCameraLoading" class="text-center p-6 cursor-pointer" @click="takePhoto">
            <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <span class="text-3xl">📷</span>
            </div>
            <div class="font-bold text-gray-600">點擊拍攝或上傳照片</div>
            <div class="text-xs text-gray-400 mt-2">支援拖拉上傳</div>
          </div>

          <div v-if="isCameraLoading" class="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
             <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
          </div>

          <div v-if="photoTaken" class="relative w-full h-full group">
            <img :src="evidenceImage" class="w-full h-full object-cover" />
            <!-- Timestamp Overlay -->
            <div class="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-3 backdrop-blur-sm font-mono">
              <div class="flex justify-between">
                <span>DATE: 2025-12-02</span>
                <span>TIME: 14:30:25</span>
              </div>
              <div class="flex justify-between mt-1">
                <span>GPS: 25.0330° N, 121.5654° E</span>
                <span>USER: Staff_001</span>
              </div>
            </div>
            <!-- Retake Button -->
            <button @click="photoTaken = false" class="absolute top-2 right-2 bg-white/20 hover:bg-white/40 text-white p-2 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </button>
          </div>
        </div>

        <div class="space-y-3">
          <textarea 
            class="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-corgi-primary outline-none resize-none h-24"
            placeholder="在此輸入訪查備註..."
          ></textarea>
          
          <div class="grid grid-cols-2 gap-3">
            <button class="py-3 px-4 bg-gray-100 text-gray-600 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
              <span>🎤</span> 語音筆記
            </button>
            <button class="py-3 px-4 bg-corgi-primary text-white rounded-lg font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-200">
              完成訪查
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRiskStore } from '@/stores/riskStore'

const riskStore = useRiskStore()
const showWarning = ref(false)
const photoTaken = ref(false)
const isCameraLoading = ref(false)
const evidenceImage = ref(null)
const progressPercent = computed(() => {
  let completed = 1
  if (riskStore.isApiConnected) completed += 1
  return Math.round((completed / 3) * 100)
})

const levelStatuses = computed(() => [
  {
    level: 'Level 1',
    label: '企業自證',
    hint: '表單資料已交付，現場僅需確認佐證',
    done: true
  },
  {
    level: 'Level 2',
    label: '系統串接',
    hint: riskStore.isApiConnected ? 'API 數據已回傳，可對照儀表板' : '尚未串接，提醒客戶預留 API 權限',
    done: riskStore.isApiConnected
  },
  {
    level: 'Level 3',
    label: '第三方認證',
    hint: '待四大顧問或客戶自行上傳，需提醒交件時程',
    done: false
  }
])

const dimensionBlueprint = [
  {
    key: 'stability',
    title: '系統穩定性',
    action: '確認混合雲 HA / 監控畫面是否與 Business 儀表板一致'
  },
  {
    key: 'security',
    title: '資安成熟度',
    action: '索取最近弱掃/滲透報告或第三方稽核紀錄'
  },
  {
    key: 'governance',
    title: '科技治理',
    action: '確認災難演練紀錄與科技治理會議文件'
  },
  {
    key: 'supplier',
    title: '供應商依賴',
    action: '拍攝關鍵供應商設備與 SLA，確認備援方案'
  },
  {
    key: 'aiRisk',
    title: 'AI 風險',
    action: '確認 AI 模型審批流程與資料保留政策'
  },
  {
    key: 'trend',
    title: '趨勢適應力',
    action: '追問近期雲端 / AI 轉型時程並記錄差異'
  }
]

const classifyDimension = (score) => {
  if (score >= 80) {
    return { statusLabel: '穩健', badgeClass: 'bg-emerald-50 text-emerald-600 border-emerald-100' }
  }
  if (score >= 60) {
    return { statusLabel: '需追蹤', badgeClass: 'bg-amber-50 text-amber-600 border-amber-100' }
  }
  return { statusLabel: '緊急', badgeClass: 'bg-red-50 text-red-600 border-red-100' }
}

const dimensionCheckpoints = computed(() =>
  dimensionBlueprint.map((item) => {
    const score = riskStore.dimensions[item.key] ?? 0
    const statusMeta = classifyDimension(score)
    return {
      ...item,
      score,
      ...statusMeta
    }
  })
)

// Use a placeholder if the image doesn't exist yet
const placeholderImage = 'https://images.unsplash.com/photo-1558494949-ef526b0042a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'

const takePhoto = () => {
  isCameraLoading.value = true
  setTimeout(() => {
    isCameraLoading.value = false
    photoTaken.value = true
    evidenceImage.value = placeholderImage // In real app, use captured image
    riskStore.addEvidence(placeholderImage)
  }, 1000)
}
</script>
