<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'submit'])

const formData = ref({
  // IT 人力配置
  hasITStaff: false,
  itStaffCount: '',
  hasITManager: false,
  hasOutsourcedIT: false,
  outsourceProvider: '',

  // 資料備份
  hasBackup: false,
  backupFrequency: '',
  backupLocation: '',
  hasOffSiteBackup: false,
  backupTested: false,

  // 資安防護
  hasFirewall: false,
  hasAntivirus: false,
  hasPasswordPolicy: false,
  hasDataEncryption: false,
  hasMFA: false,
  hasVPN: false,
  hasIDS: false,
  hasEmailFiltering: false,

  // 系統與基礎設施
  hasServerRoom: false,
  serverRoomSecurity: [],
  hasCloudServices: false,
  cloudProviders: [],
  hasLoadBalancer: false,
  hasRedundancy: false,

  // 營運持續性
  hasBCP: false,
  hasDRP: false,
  lastBCPTest: '',
  hasIncidentResponse: false,

  // 合規與認證
  hasISO27001: false,
  hasGDPRCompliance: false,
  hasDataProtection: false,
  hasPenTest: false,
  lastPenTestDate: '',

  // IT 投資與管理
  hasITBudget: false,
  annualITBudget: '',
  hasITRoadmap: false,
  hasAssetManagement: false,
  hasChangeManagement: false
})

const closeModal = () => {
  emit('close')
}

const submitForm = () => {
  emit('submit', formData.value)
  emit('close')
}
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <div
      class="bg-gradient-to-br from-corgi-darker to-corgi-dark border border-corgi-primary/30 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg-corgi-darker/95 backdrop-blur-sm border-b border-corgi-primary/20 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-corgi-primary rounded-lg flex items-center justify-center text-xl">
              🐶
            </div>
            <div>
              <h2 class="text-2xl font-bold text-corgi-primary">Level 1: 企業自證</h2>
              <p class="text-sm text-corgi-text-light">基礎科技體質問卷</p>
            </div>
          </div>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-6">
        <!-- IT 人力配置 -->
        <div class="bg-corgi-dark/50 border border-corgi-primary/20 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-corgi-primary">👥</span>
            IT 人力配置
          </h3>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasITStaff" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有專職 IT 人員</span>
            </label>
            <div v-if="formData.hasITStaff" class="ml-8 space-y-3">
              <div>
                <label class="block text-sm text-corgi-text-light mb-2">IT 人員數量</label>
                <input
                  v-model="formData.itStaffCount"
                  type="number"
                  min="1"
                  class="w-full bg-corgi-darker border border-corgi-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-corgi-primary"
                  placeholder="例: 3"
                />
              </div>
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasITManager" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有 IT 主管/經理</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasOutsourcedIT" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有委外 IT 支援</span>
            </label>
            <div v-if="formData.hasOutsourcedIT" class="ml-8">
              <label class="block text-sm text-corgi-text-light mb-2">委外廠商名稱</label>
              <input
                v-model="formData.outsourceProvider"
                type="text"
                class="w-full bg-corgi-darker border border-corgi-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-corgi-primary"
                placeholder="例: XX 資訊公司"
              />
            </div>
          </div>
        </div>

        <!-- 資料備份策略 -->
        <div class="bg-corgi-dark/50 border border-corgi-primary/20 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-corgi-primary">💾</span>
            資料備份策略
          </h3>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasBackup" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有定期備份資料</span>
            </label>
            <div v-if="formData.hasBackup" class="ml-8 space-y-3">
              <div>
                <label class="block text-sm text-corgi-text-light mb-2">備份頻率</label>
                <select
                  v-model="formData.backupFrequency"
                  class="w-full bg-corgi-darker border border-corgi-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-corgi-primary"
                >
                  <option value="">請選擇</option>
                  <option value="realtime">即時備份</option>
                  <option value="daily">每日備份</option>
                  <option value="weekly">每週備份</option>
                  <option value="monthly">每月備份</option>
                </select>
              </div>
              <div>
                <label class="block text-sm text-corgi-text-light mb-2">備份位置</label>
                <select
                  v-model="formData.backupLocation"
                  class="w-full bg-corgi-darker border border-corgi-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-corgi-primary"
                >
                  <option value="">請選擇</option>
                  <option value="local">本地伺服器</option>
                  <option value="nas">NAS 設備</option>
                  <option value="cloud">雲端儲存</option>
                  <option value="hybrid">混合式備份</option>
                </select>
              </div>
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasOffSiteBackup" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有異地備份</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.backupTested" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">定期測試備份還原</span>
            </label>
          </div>
        </div>

        <!-- 資安防護措施 -->
        <div class="bg-corgi-dark/50 border border-corgi-primary/20 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-corgi-primary">🛡️</span>
            資安防護措施
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasFirewall" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">防火牆</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasAntivirus" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">防毒軟體</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasPasswordPolicy" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">密碼政策</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasDataEncryption" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">資料加密</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasMFA" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">多因素認證 (MFA)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasVPN" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">VPN 遠端連線</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasIDS" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">入侵偵測系統 (IDS)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasEmailFiltering" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">郵件過濾防護</span>
            </label>
          </div>
        </div>

        <!-- 系統與基礎設施 -->
        <div class="bg-corgi-dark/50 border border-corgi-primary/20 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-corgi-primary">🖥️</span>
            系統與基礎設施
          </h3>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasServerRoom" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有專屬機房</span>
            </label>
            <div v-if="formData.hasServerRoom" class="ml-8">
              <label class="block text-sm text-corgi-text-light mb-2">機房安全措施 (可複選)</label>
              <div class="space-y-2">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.serverRoomSecurity" value="access-control" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">門禁管制</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.serverRoomSecurity" value="cctv" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">監視器</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.serverRoomSecurity" value="fire-suppression" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">消防系統</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.serverRoomSecurity" value="ups" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">UPS 不斷電系統</span>
                </label>
              </div>
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasCloudServices" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">使用雲端服務</span>
            </label>
            <div v-if="formData.hasCloudServices" class="ml-8">
              <label class="block text-sm text-corgi-text-light mb-2">雲端服務商 (可複選)</label>
              <div class="space-y-2">
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.cloudProviders" value="aws" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">AWS</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.cloudProviders" value="azure" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">Azure</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.cloudProviders" value="gcp" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">Google Cloud</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group">
                  <input v-model="formData.cloudProviders" value="other" type="checkbox" class="w-4 h-4 accent-corgi-primary" />
                  <span class="text-sm text-gray-300 group-hover:text-white transition-colors">其他</span>
                </label>
              </div>
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasLoadBalancer" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有負載平衡機制</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasRedundancy" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有系統備援機制</span>
            </label>
          </div>
        </div>

        <!-- 營運持續性 -->
        <div class="bg-corgi-dark/50 border border-corgi-primary/20 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-corgi-primary">📋</span>
            營運持續性管理
          </h3>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasBCP" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有營運持續計畫 (BCP)</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasDRP" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有災難復原計畫 (DRP)</span>
            </label>
            <div v-if="formData.hasBCP || formData.hasDRP" class="ml-8">
              <label class="block text-sm text-corgi-text-light mb-2">最近一次演練/測試時間</label>
              <input
                v-model="formData.lastBCPTest"
                type="date"
                class="w-full bg-corgi-darker border border-corgi-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-corgi-primary"
              />
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasIncidentResponse" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有資安事件應變流程</span>
            </label>
          </div>
        </div>

        <!-- 合規與認證 -->
        <div class="bg-corgi-dark/50 border border-corgi-primary/20 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-corgi-primary">✅</span>
            合規與認證
          </h3>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasISO27001" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有 ISO 27001 認證</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasGDPRCompliance" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">符合 GDPR 規範</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasDataProtection" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">符合個資法要求</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasPenTest" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">定期進行滲透測試</span>
            </label>
            <div v-if="formData.hasPenTest" class="ml-8">
              <label class="block text-sm text-corgi-text-light mb-2">最近一次滲透測試時間</label>
              <input
                v-model="formData.lastPenTestDate"
                type="date"
                class="w-full bg-corgi-darker border border-corgi-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-corgi-primary"
              />
            </div>
          </div>
        </div>

        <!-- IT 投資與管理 -->
        <div class="bg-corgi-dark/50 border border-corgi-primary/20 rounded-xl p-6">
          <h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span class="text-corgi-primary">💰</span>
            IT 投資與管理
          </h3>
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasITBudget" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有編列年度 IT 預算</span>
            </label>
            <div v-if="formData.hasITBudget" class="ml-8">
              <label class="block text-sm text-corgi-text-light mb-2">年度 IT 預算 (萬元)</label>
              <input
                v-model="formData.annualITBudget"
                type="number"
                min="0"
                class="w-full bg-corgi-darker border border-corgi-primary/20 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-corgi-primary"
                placeholder="例: 500"
              />
            </div>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasITRoadmap" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有 IT 發展藍圖/策略</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasAssetManagement" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有 IT 資產管理制度</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer group">
              <input v-model="formData.hasChangeManagement" type="checkbox" class="w-5 h-5 accent-corgi-primary" />
              <span class="text-white group-hover:text-corgi-primary transition-colors">有變更管理流程</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-corgi-darker/95 backdrop-blur-sm border-t border-corgi-primary/20 p-6">
        <div class="flex justify-end gap-4">
          <button
            @click="closeModal"
            class="px-6 py-3 bg-corgi-darker border border-corgi-primary/30 text-white rounded-lg hover:bg-corgi-darker/80 transition-colors"
          >
            取消
          </button>
          <button
            @click="submitForm"
            class="px-6 py-3 bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-corgi-primary/30 transition-all"
          >
            提交自證資料
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
