<script setup>
import { ref } from 'vue'
import LoginModal from '@/components/LoginModal.vue'

const showLoginModal = ref(false)

const openLoginModal = () => {
  showLoginModal.value = true
}

const closeLoginModal = () => {
  showLoginModal.value = false
}

// Carousel
const currentSlide = ref(0)
const features = [
  {
    icon: '📊',
    title: '六大構面評估',
    description: '系統穩定性、資安成熟度、科技治理、供應商依賴、AI 風險、趨勢適應力全方位分析'
  },
  {
    icon: '🔗',
    title: '三級體檢系統',
    description: 'Level 1 自證、Level 2 API 串接、Level 3 第三方認證，建立可信賴的科技信用'
  },
  {
    icon: '📱',
    title: '行動訪查工具',
    description: '手機端現場拍照留證、語音轉文字、動態檢核表，讓訪查工作更輕鬆'
  },
  {
    icon: '🤖',
    title: 'AI 動態評分',
    description: 'LSTM 預測模型，根據產業特性動態調整權重，提升授信決策準確度 37%'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % features.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + features.length) % features.length
}

const goToSlide = (index) => {
  currentSlide.value = index
}
</script>

<template>
  <div class="min-h-screen bg-corgi-dark text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Effect -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-10 left-10 w-64 h-64 bg-corgi-primary rounded-full blur-[100px]"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-corgi-secondary rounded-full blur-[120px]"></div>
    </div>

    <!-- Top Right Action Buttons -->
    <div class="absolute top-8 right-8 flex items-center gap-4 z-20">
      <button
        @click="openLoginModal"
        class="px-6 py-2.5 bg-corgi-darker/80 hover:bg-corgi-darker text-white border border-corgi-primary/30 rounded-full transition-all hover:shadow-lg hover:shadow-corgi-primary/20"
      >
        登入
      </button>
      <button
        @click="openLoginModal"
        class="px-6 py-2.5 bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:shadow-corgi-primary/40 transition-all"
      >
        註冊
      </button>
    </div>

    <!-- Hero Section -->
    <div class="flex flex-col items-center mb-8 mt-16 md:mt-20 z-10 text-center">
      <img src="@/assets/images/logo.png" alt="CorgiRisk Logo" class="w-80 h-80 md:w-80 md:h-80 object-contain" />
      <h2 class="text-5xl md:text-6xl font-bold text-white mb-4">
        柯基風控
      </h2>
      <p class="text-xl md:text-2xl text-corgi-text-light max-w-3xl leading-relaxed">
        一站式科技風險治理平台
      </p>
    </div>

    <!-- Value Propositions -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full z-10 mb-12">
      <div class="group bg-corgi-surface/10 backdrop-blur-md border border-corgi-surface/20 p-8 rounded-2xl hover:bg-corgi-surface/20 hover:border-corgi-primary/50 hover:shadow-[0_0_40px_rgba(230,145,56,0.3)] transition-all duration-300 text-center">
        <div class="text-6xl mb-4">🏢</div>
        <h3 class="text-2xl font-bold text-corgi-primary mb-3">企業價值</h3>
        <p class="text-corgi-text-light/80 leading-relaxed">
          建立科技信用資產，透明化 IT 體質，爭取更佳授信利率與條件
        </p>
      </div>

      <div class="group bg-corgi-surface/10 backdrop-blur-md border border-corgi-surface/20 p-8 rounded-2xl hover:bg-corgi-surface/20 hover:border-corgi-primary/50 hover:shadow-[0_0_40px_rgba(230,145,56,0.3)] transition-all duration-300 text-center">
        <div class="text-6xl mb-4">💼</div>
        <h3 class="text-2xl font-bold text-corgi-primary mb-3">行員助力</h3>
        <p class="text-corgi-text-light/80 leading-relaxed">
          智慧訪查輔助系統，快速生成專業報告，提升徵信效率
        </p>
      </div>

      <div class="group bg-corgi-surface/10 backdrop-blur-md border border-corgi-surface/20 p-8 rounded-2xl hover:bg-corgi-surface/20 hover:border-corgi-primary/50 hover:shadow-[0_0_40px_rgba(230,145,56,0.3)] transition-all duration-300 text-center">
        <div class="text-6xl mb-4">🔍</div>
        <h3 class="text-2xl font-bold text-corgi-primary mb-3">審核精準</h3>
        <p class="text-corgi-text-light/80 leading-relaxed">
          動態風險量化模型，降低誤判率，優化授信決策流程
        </p>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="flex flex-col sm:flex-row items-center gap-4 z-10">
      <button
        @click="openLoginModal"
        class="px-8 py-4 bg-gradient-to-r from-corgi-secondary to-corgi-primary text-white text-lg font-bold rounded-xl shadow-2xl hover:shadow-corgi-primary/50 transition-all transform hover:scale-105"
      >
        開始使用 CorgiRisk
      </button>
      <a
        href="#features"
        class="px-8 py-4 bg-corgi-darker/80 text-white text-lg font-semibold rounded-xl border border-corgi-primary/30 hover:bg-corgi-darker hover:border-corgi-primary/50 transition-all"
      >
        了解更多
      </a>
    </div>

    <!-- Features Carousel Section -->
    <div id="features" class="mt-24 max-w-4xl w-full z-10">
      <h2 class="text-4xl font-bold text-center text-white mb-12">核心功能</h2>

      <!-- Carousel Container -->
      <div class="relative">
        <!-- Carousel Slides -->
        <div class="overflow-hidden rounded-2xl">
          <div class="relative h-64 md:h-72">
            <TransitionGroup name="slide">
              <div
                v-for="(feature, index) in features"
                v-show="currentSlide === index"
                :key="index"
                class="absolute inset-0 bg-corgi-darker/70 border border-corgi-primary/30 rounded-2xl p-8 md:p-12"
              >
                <div class="flex flex-col items-center text-center h-full justify-center">
                  <div class="w-20 h-20 bg-corgi-primary/20 rounded-2xl flex items-center justify-center text-5xl mb-6">
                    {{ feature.icon }}
                  </div>
                  <h3 class="text-2xl md:text-3xl font-bold text-white mb-4">{{ feature.title }}</h3>
                  <p class="text-corgi-text-light/80 text-lg leading-relaxed max-w-2xl">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </TransitionGroup>
          </div>
        </div>

        <!-- Previous Button -->
        <button
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-corgi-darker/80 hover:bg-corgi-primary/30 border border-corgi-primary/30 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <!-- Next Button -->
        <button
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-corgi-darker/80 hover:bg-corgi-primary/30 border border-corgi-primary/30 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <!-- Dots Indicators -->
        <div class="flex justify-center gap-3 mt-8">
          <button
            v-for="(feature, index) in features"
            :key="index"
            @click="goToSlide(index)"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-corgi-primary w-8' : 'bg-corgi-text-light/30 hover:bg-corgi-text-light/50'"
          ></button>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-24 pb-8 text-center text-corgi-text-light/60 text-sm z-10">
      <p>&copy; 2024 CorgiRisk. All rights reserved.</p>
    </footer>

    <!-- Login Modal -->
    <LoginModal v-if="showLoginModal" @close="closeLoginModal" />
  </div>
</template>

<style scoped>
/* Slide Transition */
.slide-enter-active {
  transition: all 0.5s ease;
}

.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
