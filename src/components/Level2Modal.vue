<script setup>
import { ref } from 'vue'
import LoadingBone from '@/components/LoadingBone.vue'

const emit = defineEmits(['close', 'connect'])

const isConnecting = ref(false)
const connectionStatus = ref('idle') // idle, connecting, success, error

// 擴展的 API 分類
const apis = ref([
  // 1. 系統穩定性監控
  {
    id: 'uptime',
    name: '系統可用性監控',
    category: '系統穩定性',
    description: '串接 Uptime Robot / Pingdom / StatusCake',
    icon: '📊',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      monitoredEndpoints: 0,
      alerting: false
    }
  },
  {
    id: 'performance',
    name: '效能監控 APM',
    category: '系統穩定性',
    description: '串接 New Relic / Datadog / Dynatrace',
    icon: '⚡',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      trackedServices: 0,
      customMetrics: false
    }
  },
  {
    id: 'infrastructure',
    name: '基礎設施監控',
    category: '系統穩定性',
    description: '串接 Prometheus / Grafana / Zabbix',
    icon: '🖥️',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      monitoredServers: 0,
      alertRules: 0
    }
  },

  // 2. 錯誤與日誌管理
  {
    id: 'errorTracking',
    name: '錯誤追蹤系統',
    category: '錯誤與日誌',
    description: '串接 Sentry / Rollbar / Bugsnag',
    icon: '🐛',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      trackedProjects: 0,
      issueAlerts: false
    }
  },
  {
    id: 'logManagement',
    name: '日誌集中管理',
    category: '錯誤與日誌',
    description: '串接 ELK Stack / Splunk / LogDNA',
    icon: '📝',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      dailyLogVolume: '',
      retention: ''
    }
  },
  {
    id: 'userBehavior',
    name: '使用者行為分析',
    category: '錯誤與日誌',
    description: '串接 LogRocket / FullStory / Hotjar',
    icon: '👤',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      recordedSessions: 0,
      privacyMode: false
    }
  },

  // 3. 資安防護
  {
    id: 'vulnerability',
    name: '弱點掃描系統',
    category: '資安防護',
    description: '串接 Qualys / Tenable / Rapid7',
    icon: '🔒',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      scanFrequency: '',
      lastScan: null
    }
  },
  {
    id: 'waf',
    name: 'Web 應用防火牆',
    category: '資安防護',
    description: '串接 Cloudflare / AWS WAF / Imperva',
    icon: '🛡️',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      protectedDomains: 0,
      rulesets: []
    }
  },
  {
    id: 'siem',
    name: '安全資訊事件管理',
    category: '資安防護',
    description: '串接 Splunk SIEM / QRadar / ArcSight',
    icon: '🔐',
    status: 'pending',
    metrics: null,
    details: {
      provider: '',
      eventSources: 0,
      alertsEnabled: false
    }
  },

  // 4. 雲端與基礎設施
  {
    id: 'cloudAws',
    name: 'AWS 雲端服務',
    category: '雲端平台',
    description: '串接 AWS CloudWatch / Health Dashboard',
    icon: '☁️',
    status: 'pending',
    metrics: null,
    details: {
      region: '',
      services: [],
      costMonitoring: false
    }
  },
  {
    id: 'cloudAzure',
    name: 'Azure 雲端服務',
    category: '雲端平台',
    description: '串接 Azure Monitor / Service Health',
    icon: '💠',
    status: 'pending',
    metrics: null,
    details: {
      subscriptions: 0,
      resourceGroups: 0,
      insights: false
    }
  },
  {
    id: 'cloudGcp',
    name: 'GCP 雲端服務',
    category: '雲端平台',
    description: '串接 Google Cloud Monitoring / Logging',
    icon: '🌐',
    status: 'pending',
    metrics: null,
    details: {
      projects: 0,
      services: [],
      billing: false
    }
  },

  // 5. 資料庫監控
  {
    id: 'databasePerformance',
    name: '資料庫效能監控',
    category: '資料庫',
    description: '串接 DataDog DB / SolarWinds DPA',
    icon: '💾',
    status: 'pending',
    metrics: null,
    details: {
      databases: [],
      slowQueryAlert: false,
      connectionPool: false
    }
  },
  {
    id: 'databaseBackup',
    name: '資料庫備份驗證',
    category: '資料庫',
    description: '驗證備份狀態與還原測試記錄',
    icon: '💿',
    status: 'pending',
    metrics: null,
    details: {
      backupTool: '',
      frequency: '',
      lastTest: null
    }
  },

  // 6. CI/CD 與版本控制
  {
    id: 'cicd',
    name: 'CI/CD 流水線',
    category: 'DevOps',
    description: '串接 Jenkins / GitLab CI / GitHub Actions',
    icon: '🔄',
    status: 'pending',
    metrics: null,
    details: {
      platform: '',
      pipelines: 0,
      successRate: ''
    }
  },
  {
    id: 'sourceControl',
    name: '版本控制系統',
    category: 'DevOps',
    description: '串接 GitHub / GitLab / Bitbucket',
    icon: '🌳',
    status: 'pending',
    metrics: null,
    details: {
      platform: '',
      repositories: 0,
      codeReview: false
    }
  }
])

const closeModal = () => {
  emit('close')
}

const connectAPI = async (api) => {
  api.status = 'connecting'

  // 連接延遲 1.5-2.5 秒
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000))

  api.status = 'success'

  // 根據不同 API 類型返回對應的數據
  switch(api.id) {
    case 'uptime':
      api.metrics = {
        '系統可用率': '99.95%',
        '平均回應時間': '245ms',
        '監控端點數': '12',
        '本月故障次數': '1'
      }
      break
    case 'performance':
      api.metrics = {
        'Apdex 分數': '0.94',
        '平均回應時間': '1.2s',
        '最慢交易': 'POST /api/orders',
        '追蹤服務數': '8'
      }
      break
    case 'infrastructure':
      api.metrics = {
        '監控伺服器數': '15',
        'CPU 平均使用率': '45%',
        '記憶體使用率': '62%',
        '告警規則數': '28'
      }
      break
    case 'errorTracking':
      api.metrics = {
        '每日錯誤數': '127',
        '嚴重錯誤數': '3',
        '最後錯誤': '2小時前',
        '追蹤專案數': '5'
      }
      break
    case 'logManagement':
      api.metrics = {
        '每日日誌量': '2.3 GB',
        '日誌保留期': '90天',
        '搜尋索引數': '4',
        '告警數量': '12'
      }
      break
    case 'userBehavior':
      api.metrics = {
        '記錄工作階段': '8,432',
        '錯誤工作階段': '127',
        '平均頁面停留': '3m 42s',
        '跳出率': '32%'
      }
      break
    case 'vulnerability':
      api.metrics = {
        '發現弱點數': '12',
        '高風險弱點': '2',
        '中風險弱點': '5',
        '最後掃描': '昨天'
      }
      break
    case 'waf':
      api.metrics = {
        '防護網域數': '8',
        '本月攔截': '1,247',
        'DDoS 防護': '啟用',
        '規則集版本': 'v2.3.1'
      }
      break
    case 'siem':
      api.metrics = {
        '事件來源數': '24',
        '每日事件數': '45,231',
        '安全告警數': '8',
        '整合狀態': '正常'
      }
      break
    case 'cloudAws':
      api.metrics = {
        '使用區域': 'ap-northeast-1',
        '服務數量': '12',
        '本月費用': '$2,341',
        '健康狀態': '正常'
      }
      break
    case 'cloudAzure':
      api.metrics = {
        '訂閱數': '2',
        '資源群組': '8',
        '本月費用': '$1,823',
        '服務健康': '正常'
      }
      break
    case 'cloudGcp':
      api.metrics = {
        '專案數': '3',
        '服務數量': '9',
        '本月費用': '$1,456',
        '配額使用': '42%'
      }
      break
    case 'databasePerformance':
      api.metrics = {
        '監控資料庫': 'PostgreSQL, MySQL',
        '慢查詢數': '23',
        '連線池使用': '67%',
        '回應時間': '12ms'
      }
      break
    case 'databaseBackup':
      api.metrics = {
        '備份頻率': '每日',
        '最後備份': '3小時前',
        '備份大小': '48 GB',
        '最後還原測試': '2週前'
      }
      break
    case 'cicd':
      api.metrics = {
        '流水線數': '14',
        '成功率': '94%',
        '平均建置時間': '8m 32s',
        '本月部署': '127'
      }
      break
    case 'sourceControl':
      api.metrics = {
        '儲存庫數': '28',
        '每週提交': '156',
        '程式碼審查': '啟用',
        '分支保護': '啟用'
      }
      break
  }
}

const connectAll = async () => {
  isConnecting.value = true
  connectionStatus.value = 'connecting'

  for (const api of apis.value) {
    await connectAPI(api)
  }

  isConnecting.value = false
  connectionStatus.value = 'success'

  // 3秒後自動關閉並提交
  setTimeout(() => {
    emit('connect', apis.value)
    emit('close')
  }, 3000)
}

// 依分類分組 API
const apisByCategory = ref({})
const updateApisByCategory = () => {
  apisByCategory.value = apis.value.reduce((acc, api) => {
    if (!acc[api.category]) {
      acc[api.category] = []
    }
    acc[api.category].push(api)
    return acc
  }, {})
}
updateApisByCategory()
</script>

<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    @click.self="closeModal"
  >
    <div
      class="bg-gradient-to-br from-corgi-darker to-corgi-dark border border-corgi-primary/30 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      @click.stop
    >
      <!-- Header -->
      <div class="sticky top-0 bg-corgi-darker/95 backdrop-blur-sm border-b border-corgi-primary/20 p-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-corgi-secondary rounded-lg flex items-center justify-center text-xl">
              🔗
            </div>
            <div>
              <h2 class="text-2xl font-bold text-corgi-secondary">Level 2: 系統串接</h2>
              <p class="text-sm text-corgi-text-light">API 數據自動擷取</p>
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
        <!-- 說明 -->
        <div class="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
          <div class="flex items-start gap-3">
            <div class="text-2xl">ℹ️</div>
            <div>
              <h4 class="font-semibold text-white mb-1">系統串接說明</h4>
              <p class="text-sm text-corgi-text-light leading-relaxed">
                透過 API 串接自動讀取您的系統運行數據,無需手動填寫。我們支援主流監控平台與雲端服務,數據僅用於風險評估,不會對外揭露。
              </p>
            </div>
          </div>
        </div>

        <!-- API 列表 (依分類顯示) -->
        <div class="space-y-8">
          <div v-for="(categoryApis, category) in apisByCategory" :key="category">
            <!-- 分類標題 -->
            <div class="mb-4">
              <h3 class="text-lg font-bold text-corgi-primary flex items-center gap-2">
                <span class="w-1 h-6 bg-corgi-primary rounded-full"></span>
                {{ category }}
              </h3>
            </div>

            <!-- 該分類下的 API 卡片 -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div
                v-for="api in categoryApis"
                :key="api.id"
                class="bg-corgi-dark/50 border rounded-xl p-5 transition-all"
                :class="api.status === 'success' ? 'border-green-500/50' : 'border-corgi-primary/20'"
              >
                <div class="flex items-start justify-between mb-3">
                  <div class="flex items-start gap-3 flex-1">
                    <div class="w-10 h-10 bg-corgi-primary/20 rounded-lg flex items-center justify-center text-xl flex-shrink-0">
                      {{ api.icon }}
                    </div>
                    <div class="flex-1 min-w-0">
                      <h4 class="text-base font-bold text-white mb-1">{{ api.name }}</h4>
                      <p class="text-xs text-corgi-text-light">{{ api.description }}</p>
                    </div>
                  </div>

                  <!-- Status Badge -->
                  <div
                    class="px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 flex-shrink-0 ml-2"
                    :class="{
                      'bg-gray-500/20 text-gray-400': api.status === 'pending',
                      'bg-blue-500/20 text-blue-400': api.status === 'connecting',
                      'bg-green-500/20 text-green-400': api.status === 'success'
                    }"
                  >
                    <LoadingBone v-if="api.status === 'connecting'" class="w-3 h-3" />
                    <span v-else-if="api.status === 'success'">✓</span>
                    <span v-else>待連接</span>
                  </div>
                </div>

                <!-- Metrics (顯示於連接成功後) -->
                <div v-if="api.metrics" class="mt-3 pt-3 border-t border-corgi-primary/20">
                  <div class="grid grid-cols-2 gap-2">
                    <div v-for="(value, key) in api.metrics" :key="key" class="bg-corgi-darker/50 rounded-lg p-2">
                      <div class="text-xs text-corgi-text-light mb-0.5 truncate">{{ key }}</div>
                      <div class="text-sm font-bold text-white truncate">{{ value }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Success Message -->
        <div v-if="connectionStatus === 'success'" class="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div class="flex items-center gap-3">
            <div class="text-2xl">✅</div>
            <div>
              <h4 class="font-semibold text-green-400 mb-1">連接成功!</h4>
              <p class="text-sm text-corgi-text-light">
                所有 API 已成功串接,系統正在分析數據...將自動更新風險評分
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="sticky bottom-0 bg-corgi-darker/95 backdrop-blur-sm border-t border-corgi-primary/20 p-6">
        <div class="flex justify-between items-center">
          <div class="text-sm text-corgi-text-light">
            已連接: <span class="text-corgi-primary font-bold">{{ apis.filter(a => a.status === 'success').length }}</span> / {{ apis.length }}
          </div>
          <div class="flex gap-4">
            <button
              @click="closeModal"
              class="px-6 py-3 bg-corgi-darker border border-corgi-primary/30 text-white rounded-lg hover:bg-corgi-darker/80 transition-colors"
              :disabled="isConnecting"
            >
              取消
            </button>
            <button
              @click="connectAll"
              class="px-6 py-3 bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-corgi-primary/30 transition-all flex items-center gap-2"
              :disabled="isConnecting || connectionStatus === 'success'"
            >
              <LoadingBone v-if="isConnecting" class="w-5 h-5" />
              <span>{{ isConnecting ? '連接中...' : '開始連接所有 API' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
