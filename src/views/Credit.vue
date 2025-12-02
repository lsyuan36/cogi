<template>
  <div class="min-h-screen bg-corgi-dark text-white">
    <!-- Desktop Header -->
    <header class="sticky top-0 z-20 bg-corgi-dark/95 backdrop-blur-sm border-b border-gray-800">
      <div class="max-w-[1800px] mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-3">
            <img src="@/assets/images/logo.png" alt="CorgiRisk Logo" class="w-8 h-8 object-contain" />
            <h1 class="text-xl font-bold text-gray-100">授信審核專區 <span class="text-xs text-gray-500 ml-2">Credit Review</span></h1>
          </div>
          <div class="flex items-center gap-4">
            <div class="text-sm text-gray-400">
              <span class="w-2 h-2 bg-green-500 rounded-full inline-block mr-2 animate-pulse"></span>
              System Online
            </div>
            <router-link to="/" class="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition-colors">
              回首頁
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-[1800px] mx-auto px-6 py-6">
      <!-- 第一排: 三欄佈局 -->
      <div class="grid grid-cols-12 gap-5 items-start mb-6">

        <!-- Left Column: Basic Info -->
        <div class="col-span-3 space-y-4">
        <!-- 企業基本資訊 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <div class="mb-6">
            <div class="w-16 h-16 bg-gradient-to-br from-corgi-primary/20 to-corgi-secondary/20 rounded-full flex items-center justify-center text-2xl mb-4 border-2 border-corgi-primary/50">
              🏢
            </div>
            <h2 class="text-xl font-bold text-white mb-1">{{ riskStore.companyName }}</h2>
            <p class="text-xs text-gray-400 mb-3">{{ getIndustryName(riskStore.industry) }}</p>

            <!-- 基本資料 -->
            <div class="space-y-2 text-sm">
              <div class="flex justify-between py-1 border-b border-gray-700/50">
                <span class="text-gray-400">統一編號</span>
                <span class="text-white font-mono">12345678</span>
              </div>
              <div class="flex justify-between py-1 border-b border-gray-700/50">
                <span class="text-gray-400">資本額</span>
                <span class="text-white">5,000 萬</span>
              </div>
              <div class="flex justify-between py-1 border-b border-gray-700/50">
                <span class="text-gray-400">成立年數</span>
                <span class="text-white">8 年</span>
              </div>
              <div class="flex justify-between py-1 border-b border-gray-700/50">
                <span class="text-gray-400">員工數</span>
                <span class="text-white">120 人</span>
              </div>
              <div class="flex justify-between py-1">
                <span class="text-gray-400">年營收</span>
                <span class="text-white">2.3 億</span>
              </div>
            </div>
          </div>

          <!-- 風險評級 -->
          <div class="space-y-3">
            <div class="p-4 bg-gradient-to-br from-corgi-primary/10 to-corgi-secondary/10 rounded-lg border border-corgi-primary/30">
              <div class="text-xs text-gray-400 mb-2">綜合風險評級</div>
              <div class="flex items-end gap-2">
                <div class="text-4xl font-black text-corgi-primary">{{ riskStore.riskLevel }}</div>
                <div class="text-xs text-corgi-primary mb-1">低風險</div>
              </div>
            </div>
            <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
              <div class="text-xs text-gray-400 mb-2">科技信用分</div>
              <div class="flex items-baseline gap-2">
                <div class="text-3xl font-bold text-white">{{ riskStore.finalScore }}</div>
                <div class="text-sm text-gray-400">/ 100</div>
              </div>
              <div class="mt-2 w-full bg-gray-700 rounded-full h-2">
                <div class="bg-gradient-to-r from-corgi-secondary to-corgi-primary rounded-full h-2 transition-all duration-500" :style="{ width: riskStore.finalScore + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 申貸資訊 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span>📋</span>
            <span>申貸資訊</span>
          </h3>
          <div class="space-y-3 text-sm">
            <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div class="text-xs text-gray-400 mb-1">申請額度</div>
              <div class="text-lg font-bold text-white">1,200 萬</div>
            </div>
            <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div class="text-xs text-gray-400 mb-1">貸款用途</div>
              <div class="text-sm text-white">營運週轉金</div>
            </div>
            <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div class="text-xs text-gray-400 mb-1">申請日期</div>
              <div class="text-sm text-white">2024-11-28</div>
            </div>
            <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div class="text-xs text-gray-400 mb-1">審核狀態</div>
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                <span class="text-sm text-yellow-400 font-semibold">審核中</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 信用歷史 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span>📊</span>
            <span>信用歷史</span>
          </h3>
          <div class="space-y-3 text-sm">
            <div class="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span class="text-gray-400">過往貸款次數</span>
              <span class="text-white font-bold">3 次</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span class="text-gray-400">還款紀錄</span>
              <span class="text-green-400 font-bold">正常 ✓</span>
            </div>
            <div class="flex justify-between items-center py-2 border-b border-gray-700/50">
              <span class="text-gray-400">逾期紀錄</span>
              <span class="text-green-400 font-bold">0 次</span>
            </div>
            <div class="flex justify-between items-center py-2">
              <span class="text-gray-400">聯徵評分</span>
              <span class="text-white font-bold">AAA</span>
            </div>
          </div>
        </div>

        <!-- 科技風險指標 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 class="text-sm font-bold text-white mb-4 flex items-center gap-2">
            <span>🔬</span>
            <span>科技風險指標</span>
          </h3>
          <div class="space-y-3">
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">系統穩定性</span>
                <span class="text-corgi-primary font-bold">{{ riskStore.dimensions.stability }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-corgi-primary rounded-full h-1.5" :style="{ width: riskStore.dimensions.stability + '%' }"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">資安成熟度</span>
                <span class="text-corgi-secondary font-bold">{{ riskStore.dimensions.security }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-corgi-secondary rounded-full h-1.5" :style="{ width: riskStore.dimensions.security + '%' }"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">科技治理</span>
                <span class="text-blue-400 font-bold">{{ riskStore.dimensions.governance }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-blue-400 rounded-full h-1.5" :style="{ width: riskStore.dimensions.governance + '%' }"></div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex justify-between text-xs">
                <span class="text-gray-400">供應商依賴</span>
                <span class="text-purple-400 font-bold">{{ riskStore.dimensions.supplier }}</span>
              </div>
              <div class="w-full bg-gray-700 rounded-full h-1.5">
                <div class="bg-purple-400 rounded-full h-1.5" :style="{ width: riskStore.dimensions.supplier + '%' }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <!-- Middle Column: Simulator -->
        <div class="col-span-5 bg-gray-800 border border-gray-700 rounded-xl p-5 shadow-sm">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h3 class="font-bold text-lg text-white">動態授信評估系統</h3>
            <p class="text-xs text-gray-400 mt-1">比較傳統模型與 CorgiRisk 動態風險評估</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="text-sm font-medium" :class="useCorgiRisk ? 'text-corgi-primary' : 'text-gray-400'">
              導入 CorgiRisk
            </span>
            <button
              @click="toggleCorgiRisk"
              class="relative w-14 h-7 rounded-full transition-all duration-300 shadow-inner"
              :class="useCorgiRisk ? 'bg-corgi-primary shadow-corgi-primary/50' : 'bg-gray-600'"
            >
              <div
                class="w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg"
                :class="useCorgiRisk ? 'left-8' : 'left-1'"
              >
                <div v-if="useCorgiRisk" class="absolute inset-0 flex items-center justify-center text-xs">
                  ✓
                </div>
              </div>
            </button>
          </div>
        </div>

        <!-- Chart Area -->
        <div
          class="rounded-lg p-4 mb-6 relative h-[280px] transition-all duration-500"
          :class="useCorgiRisk ? 'bg-gradient-to-br from-gray-900 to-corgi-darker/20 border-2 border-corgi-primary/30' : 'bg-gray-900 border border-gray-700'"
        >
          <CorgiLineChart :use-corgi-risk="useCorgiRisk" />

          <!-- 比較指標浮動顯示 -->
          <transition name="slide-down">
            <div v-if="useCorgiRisk" class="absolute bottom-4 left-4 right-4 bg-corgi-darker/90 backdrop-blur-sm border border-corgi-primary/50 rounded-lg p-3">
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">改善幅度:</span>
                  <span class="text-green-400 font-bold">↓ 75%</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">預測準確度:</span>
                  <span class="text-corgi-primary font-bold">+42%</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="text-gray-400">風險可見度:</span>
                  <span class="text-blue-400 font-bold">即時</span>
                </div>
              </div>
            </div>
          </transition>
        </div>

        <!-- Simulation Controls -->
        <div class="grid grid-cols-3 gap-4">
          <div
            class="p-4 rounded-lg border transition-all duration-500"
            :class="useCorgiRisk
              ? 'bg-green-900/20 border-green-500/50'
              : 'bg-red-900/20 border-red-500/50'"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-xs text-gray-400">預估違約率 (PD)</div>
              <transition name="bounce" mode="out-in">
                <span :key="useCorgiRisk" class="text-xs px-2 py-0.5 rounded-full" :class="useCorgiRisk ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'">
                  {{ useCorgiRisk ? '低風險' : '高風險' }}
                </span>
              </transition>
            </div>
            <transition name="number-change" mode="out-in">
              <div :key="useCorgiRisk" class="text-2xl font-bold" :class="useCorgiRisk ? 'text-green-400' : 'text-red-400'">
                {{ useCorgiRisk ? '1.2%' : '4.8%' }}
              </div>
            </transition>
            <transition name="slide-up">
              <div v-if="useCorgiRisk" class="text-xs text-green-400 mt-1 flex items-center gap-1">
                <span>↓</span>
                <span class="font-semibold">改善 75%</span>
              </div>
            </transition>
          </div>

          <div
            class="p-4 rounded-lg border transition-all duration-500"
            :class="useCorgiRisk
              ? 'bg-corgi-primary/10 border-corgi-primary/50'
              : 'bg-gray-900/50 border-gray-700'"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-xs text-gray-400">建議授信額度</div>
              <transition name="bounce" mode="out-in">
                <span v-if="useCorgiRisk" class="text-xs bg-corgi-primary/20 text-corgi-primary px-2 py-0.5 rounded-full">
                  +87.5%
                </span>
              </transition>
            </div>
            <transition name="number-change" mode="out-in">
              <div :key="useCorgiRisk" class="text-2xl font-bold text-white">
                {{ useCorgiRisk ? '1,500' : '800' }} <span class="text-sm text-gray-400">萬</span>
              </div>
            </transition>
            <div class="text-xs text-gray-500 mt-1">新台幣</div>
          </div>

          <div
            class="p-4 rounded-lg border transition-all duration-500"
            :class="useCorgiRisk
              ? 'bg-corgi-primary/10 border-corgi-primary/50'
              : 'bg-gray-900/50 border-gray-700'"
          >
            <div class="flex items-center justify-between mb-2">
              <div class="text-xs text-gray-400">利率減碼</div>
              <transition name="bounce" mode="out-in">
                <span v-if="useCorgiRisk" class="text-xs bg-corgi-primary/20 text-corgi-primary px-2 py-0.5 rounded-full">
                  優惠
                </span>
              </transition>
            </div>
            <transition name="number-change" mode="out-in">
              <div :key="useCorgiRisk" class="text-2xl font-bold text-corgi-primary">
                {{ useCorgiRisk ? '0.15%' : '0%' }}
              </div>
            </transition>
            <div class="text-xs text-gray-500 mt-1">年利率折扣</div>
          </div>
        </div>

        <!-- 效益說明 -->
        <transition name="slide-up">
          <div v-if="useCorgiRisk" class="mt-4 p-3 bg-corgi-primary/5 border border-corgi-primary/30 rounded-lg">
            <div class="flex items-start gap-2">
              <span class="text-corgi-primary">💡</span>
              <div class="flex-1">
                <div class="text-xs font-semibold text-corgi-primary mb-1">CorgiRisk 優勢</div>
                <p class="text-xs text-gray-400 leading-relaxed">
                  透過即時科技風險監控,動態調整違約機率預測,協助銀行提供更精準的授信條件,同時降低潛在風險。
                </p>
              </div>
            </div>
          </div>
        </transition>
      </div>

        <!-- Right Column: Decision -->
        <div class="col-span-4 space-y-4">
        <!-- AI 建議卡片 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 class="font-bold text-lg text-white mb-4">AI 智能分析</h3>

          <div class="space-y-4">
            <!-- AI 建議 -->
            <div class="p-4 bg-gradient-to-br from-corgi-primary/10 to-corgi-secondary/10 rounded-lg border border-corgi-primary/30">
              <div class="flex items-center gap-2 mb-3">
                <span class="text-xl">🤖</span>
                <span class="font-bold text-white">綜合建議</span>
                <span class="ml-auto text-xs bg-corgi-primary/20 text-corgi-primary px-2 py-1 rounded-full">高信心度 92%</span>
              </div>
              <p class="text-sm text-gray-300 leading-relaxed mb-3">
                根據該公司導入之資安防護機制、系統穩定性表現及信用歷史,建議可提升授信額度至 <span class="text-corgi-primary font-bold">1,500 萬</span>,並給予利率優惠 <span class="text-corgi-primary font-bold">0.15%</span>。
              </p>
              <div class="flex items-center gap-2 text-xs text-gray-400">
                <span>📊</span>
                <span>基於 16 項即時監控指標分析</span>
              </div>
            </div>

            <!-- 關鍵優勢 -->
            <div class="space-y-2">
              <div class="text-xs font-semibold text-gray-300 mb-2">關鍵優勢</div>
              <div class="flex items-start gap-2 text-sm">
                <span class="text-green-400 mt-0.5">✓</span>
                <span class="text-gray-400">系統可用率達 99.95%,遠超業界標準</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="text-green-400 mt-0.5">✓</span>
                <span class="text-gray-400">完整備份機制,異地備援已建置</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="text-green-400 mt-0.5">✓</span>
                <span class="text-gray-400">ISO 27001 認證,資安成熟度高</span>
              </div>
              <div class="flex items-start gap-2 text-sm">
                <span class="text-green-400 mt-0.5">✓</span>
                <span class="text-gray-400">過往 3 次貸款無逾期紀錄</span>
              </div>
            </div>

            <!-- 需注意事項 -->
            <div class="space-y-2">
              <div class="text-xs font-semibold text-yellow-400 mb-2">需注意事項</div>
              <div class="flex items-start gap-2 text-sm bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3">
                <span class="text-yellow-400 mt-0.5">⚠</span>
                <span class="text-gray-400">弱點掃描發現 2 個高風險漏洞,建議要求 30 日內提供修補證明</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 審核人員操作 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 class="font-bold text-sm text-white mb-4">審核人員操作</h3>

          <div class="space-y-4">
            <!-- 審核人員資訊 -->
            <div class="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-700/50">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-lg border border-blue-500/50">
                👤
              </div>
              <div>
                <div class="text-sm font-semibold text-white">李審核</div>
                <div class="text-xs text-gray-400">資深授信專員</div>
              </div>
            </div>

            <!-- 建議授信方案 -->
            <div class="space-y-3">
              <div class="text-xs font-semibold text-gray-300">建議授信方案</div>
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 text-center">
                  <div class="text-xs text-gray-400 mb-1">額度</div>
                  <div class="text-lg font-bold text-white">1,500 萬</div>
                </div>
                <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 text-center">
                  <div class="text-xs text-gray-400 mb-1">利率</div>
                  <div class="text-lg font-bold text-corgi-primary">3.35%</div>
                </div>
                <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 text-center">
                  <div class="text-xs text-gray-400 mb-1">期限</div>
                  <div class="text-sm font-bold text-white">5 年</div>
                </div>
                <div class="p-3 bg-gray-900/50 rounded-lg border border-gray-700/50 text-center">
                  <div class="text-xs text-gray-400 mb-1">擔保</div>
                  <div class="text-sm font-bold text-white">不動產</div>
                </div>
              </div>
            </div>

            <!-- 覆核意見 -->
            <div class="space-y-2">
              <div class="text-xs font-semibold text-gray-300">人工覆核意見</div>
              <textarea
                class="w-full h-24 bg-gray-900 border border-gray-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-corgi-primary resize-none"
                placeholder="請輸入覆核意見或附加條件..."
              ></textarea>
            </div>

            <!-- 附加條件 -->
            <div class="space-y-2">
              <div class="text-xs font-semibold text-gray-300">附加條件 (選填)</div>
              <div class="space-y-2">
                <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-600 text-corgi-primary focus:ring-corgi-primary" />
                  <span>要求 30 日內修補高風險漏洞</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-600 text-corgi-primary focus:ring-corgi-primary" />
                  <span>季度提供系統健康報告</span>
                </label>
                <label class="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
                  <input type="checkbox" class="w-4 h-4 rounded border-gray-600 text-corgi-primary focus:ring-corgi-primary" />
                  <span>維持 CorgiRisk 即時監控</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- 決策按鈕 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <div class="grid grid-cols-2 gap-3">
            <button class="py-3 bg-red-900/50 text-red-400 border border-red-900 rounded-lg hover:bg-red-900/80 transition-all hover:scale-105 font-semibold flex items-center justify-center gap-2">
              <span>✕</span>
              <span>退回補件</span>
            </button>
            <button class="py-3 bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white rounded-lg hover:shadow-xl hover:shadow-corgi-primary/30 transition-all hover:scale-105 font-semibold flex items-center justify-center gap-2">
              <span>✓</span>
              <span>核准放行</span>
            </button>
          </div>
          <div class="mt-3 text-center">
            <button class="text-xs text-gray-500 hover:text-gray-400 transition-colors">
              保存草稿
            </button>
          </div>
        </div>

        <!-- 審核歷程 -->
        <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
          <h3 class="font-bold text-sm text-white mb-4">審核歷程</h3>
          <div class="space-y-3">
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="w-px h-full bg-gray-700"></div>
              </div>
              <div class="flex-1 pb-4">
                <div class="text-xs text-gray-300 font-semibold">申請提交</div>
                <div class="text-xs text-gray-500 mt-0.5">2024-11-28 14:23</div>
                <div class="text-xs text-gray-400 mt-1">申請人提交授信申請</div>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="w-px h-full bg-gray-700"></div>
              </div>
              <div class="flex-1 pb-4">
                <div class="text-xs text-gray-300 font-semibold">Level 1 完成</div>
                <div class="text-xs text-gray-500 mt-0.5">2024-11-28 15:10</div>
                <div class="text-xs text-gray-400 mt-1">企業自證資料填寫完成</div>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
                <div class="w-px h-full bg-gray-700"></div>
              </div>
              <div class="flex-1 pb-4">
                <div class="text-xs text-gray-300 font-semibold">Level 2 完成</div>
                <div class="text-xs text-gray-500 mt-0.5">2024-11-28 15:45</div>
                <div class="text-xs text-gray-400 mt-1">API 系統串接完成 (16/16)</div>
              </div>
            </div>
            <div class="flex gap-3">
              <div class="flex flex-col items-center">
                <div class="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <div class="flex-1">
                <div class="text-xs text-yellow-400 font-semibold">待審核</div>
                <div class="text-xs text-gray-500 mt-0.5">2024-12-02 10:30</div>
                <div class="text-xs text-gray-400 mt-1">等待審核人員決策</div>
              </div>
            </div>
          </div>
        </div>
        </div>

      </div>

      <!-- 審核確認清單 - Full Width Below -->
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
      <div class="flex items-center justify-between mb-6">
        <h3 class="font-bold text-lg text-white">審核確認清單</h3>
        <button
          @click="showChecklistDetails = !showChecklistDetails"
          class="text-sm text-corgi-primary hover:text-corgi-secondary transition-colors"
        >
          {{ showChecklistDetails ? '收起詳情' : '展開詳情' }}
        </button>
      </div>

      <!-- 快速總覽 -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <div class="text-xs text-gray-400 mb-1">Level 1 完成度</div>
          <div class="text-2xl font-bold text-green-400">100%</div>
          <div class="text-xs text-gray-500 mt-1">企業自證資料</div>
        </div>
        <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <div class="text-xs text-gray-400 mb-1">Level 2 串接數</div>
          <div class="text-2xl font-bold text-corgi-primary">16/16</div>
          <div class="text-xs text-gray-500 mt-1">API 自動擷取</div>
        </div>
        <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <div class="text-xs text-gray-400 mb-1">Level 3 認證</div>
          <div class="text-2xl font-bold text-yellow-400">待上傳</div>
          <div class="text-xs text-gray-500 mt-1">第三方證書</div>
        </div>
        <div class="p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <div class="text-xs text-gray-400 mb-1">整體完成度</div>
          <div class="text-2xl font-bold text-white">67%</div>
          <div class="text-xs text-gray-500 mt-1">2/3 關卡完成</div>
        </div>
      </div>

      <!-- 詳細確認項目 (可展開) -->
      <div v-if="showChecklistDetails" class="space-y-6">
        <!-- Level 1: 企業自證確認 -->
        <div class="border border-gray-700 rounded-lg p-5 bg-gray-900/30">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl">🐶</span>
            <h4 class="font-bold text-corgi-primary">Level 1: 企業自證資料</h4>
            <span class="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">✓ 已完成</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- IT 人力配置 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">IT 人力配置</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>專職 IT 人員: 5 人</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>IT 主管: 已配置</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>外包廠商: TechSupport Inc.</span>
              </div>
            </div>

            <!-- 資料備份策略 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">資料備份策略</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>備份頻率: 每日</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>備份位置: 混合雲端+本地</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>異地備援: 已建置</span>
              </div>
            </div>

            <!-- 資安防護措施 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">資安防護措施</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>防火牆、防毒軟體</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>多因素驗證 (MFA)</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>入侵偵測系統 (IDS)</span>
              </div>
            </div>

            <!-- 系統與基礎設施 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">系統與基礎設施</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>機房安全: 門禁+監視器+UPS</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>雲端服務: AWS, Azure</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>負載平衡器: 已配置</span>
              </div>
            </div>

            <!-- 營運持續性管理 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">營運持續性管理</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>BCP 計畫: 已制定</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>演練測試: 6個月前</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>事件回應流程: 已建立</span>
              </div>
            </div>

            <!-- 合規與認證 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">合規與認證</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>ISO 27001: 已取得</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>GDPR 合規: 符合</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>滲透測試: 3個月前</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Level 2: 系統串接確認 -->
        <div class="border border-gray-700 rounded-lg p-5 bg-gray-900/30">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl">🔗</span>
            <h4 class="font-bold text-corgi-secondary">Level 2: API 系統串接</h4>
            <span class="ml-auto text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">✓ 已完成</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <!-- 系統穩定性 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">系統穩定性</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>可用性監控: 99.95%</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>APM 效能: Apdex 0.94</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>基礎設施: 15 台伺服器</span>
              </div>
            </div>

            <!-- 錯誤與日誌 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">錯誤與日誌</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>錯誤追蹤: 3 嚴重錯誤</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>日誌管理: 2.3 GB/日</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>使用者行為: 8.4K 工作階段</span>
              </div>
            </div>

            <!-- 資安防護 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">資安防護</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-yellow-400">⚠</span>
                <span>弱點掃描: 2 高風險</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>WAF 防火牆: 8 網域</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>SIEM: 24 事件來源</span>
              </div>
            </div>

            <!-- 雲端平台 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">雲端平台</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>AWS: 12 服務正常</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>Azure: 2 訂閱正常</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>GCP: 3 專案正常</span>
              </div>
            </div>

            <!-- 資料庫 -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">資料庫</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>效能監控: 12ms 回應</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>備份驗證: 3小時前</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>還原測試: 2週前</span>
              </div>
            </div>

            <!-- DevOps -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-gray-300 mb-2">DevOps</div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>CI/CD: 94% 成功率</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>版本控制: 28 儲存庫</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-gray-400">
                <span class="text-green-400">✓</span>
                <span>程式碼審查: 已啟用</span>
              </div>
            </div>
          </div>

          <!-- 警示項目 -->
          <div class="mt-4 p-3 bg-yellow-900/20 border border-yellow-700/50 rounded-lg">
            <div class="flex items-start gap-2">
              <span class="text-yellow-400">⚠️</span>
              <div class="flex-1">
                <div class="text-sm font-semibold text-yellow-400 mb-1">需注意事項</div>
                <p class="text-xs text-gray-400">弱點掃描發現 2 個高風險漏洞,建議要求企業提供修補計畫或時程。</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Level 3: 第三方認證 -->
        <div class="border border-gray-700 rounded-lg p-5 bg-gray-900/30">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-xl">📄</span>
            <h4 class="font-bold text-gray-400">Level 3: 第三方認證</h4>
            <span class="ml-auto text-xs bg-gray-500/20 text-gray-400 px-2 py-1 rounded-full">待上傳</span>
          </div>

          <div class="text-center py-8 border-2 border-dashed border-gray-700 rounded-lg">
            <div class="text-4xl mb-2">📤</div>
            <p class="text-sm text-gray-500">企業尚未上傳 ISO 27001 證書或弱掃報告</p>
            <p class="text-xs text-gray-600 mt-2">可考慮要求補件或依現有資料進行審核</p>
          </div>
        </div>
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
const showChecklistDetails = ref(false)

const toggleCorgiRisk = () => {
  useCorgiRisk.value = !useCorgiRisk.value
}

const getIndustryName = (industry) => {
  const names = {
    'retail': '零售業',
    'medical': '醫療業',
    'manufacturing': '製造業',
    'tech': '科技業',
    'finance': '金融業'
  }
  return names[industry] || industry
}
</script>

<style scoped>
/* Slide Down Animation */
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}
.slide-down-enter-from {
  transform: translateY(-20px);
  opacity: 0;
}
.slide-down-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

/* Slide Up Animation */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.4s ease;
}
.slide-up-enter-from {
  transform: translateY(10px);
  opacity: 0;
}
.slide-up-leave-to {
  transform: translateY(10px);
  opacity: 0;
}

/* Number Change Animation */
.number-change-enter-active,
.number-change-leave-active {
  transition: all 0.3s ease;
}
.number-change-enter-from {
  transform: scale(0.8);
  opacity: 0;
}
.number-change-leave-to {
  transform: scale(1.2);
  opacity: 0;
}

/* Bounce Animation */
.bounce-enter-active {
  animation: bounce-in 0.5s ease;
}
.bounce-leave-active {
  animation: bounce-out 0.3s ease;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes bounce-out {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
