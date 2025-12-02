<template>
  <div class="min-h-screen bg-corgi-dark text-corgi-text-light flex flex-col items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Effect (Static Gradient) -->
    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-10 left-10 w-64 h-64 bg-corgi-primary rounded-full blur-[100px]"></div>
      <div class="absolute bottom-10 right-10 w-96 h-96 bg-corgi-secondary rounded-full blur-[120px]"></div>
    </div>
    <router-link
      to="/login"
      class="absolute top-8 right-8 bg-corgi-primary/90 text-black font-semibold px-4 py-2 rounded-full shadow-lg hover:bg-white transition-colors z-20"
    >
      身份登入
    </router-link>

    <div class="flex flex-col items-center mb-2 z-10">
      <img src="@/assets/images/logo.png" alt="CorgiRisk Logo" class="w-24 h-24 md:w-32 md:h-32 object-contain mb-4" />
      <h1 class="text-4xl md:text-6xl font-bold text-corgi-primary mb-4 text-center">
        CorgiRisk 柯基風控
      </h1>
    </div>
    <p class="text-xl md:text-2xl text-corgi-text-light mb-12 text-center max-w-2xl z-10">
      解決中小企科技體質黑箱，協助銀行降低 Type I & II 授信錯誤
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl z-10">
      <!-- Business Card -->
      <router-link to="/business" class="group">
        <div class="bg-corgi-surface/10 backdrop-blur-md border border-corgi-surface/20 p-8 rounded-xl hover:bg-corgi-surface/20 hover:border-corgi-primary/50 hover:shadow-[0_0_30px_rgba(230,145,56,0.3)] transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🏢</div>
          <h2 class="text-2xl font-bold text-corgi-primary mb-2">我是企業</h2>
          <p class="text-corgi-text-light/80">建立科技信用資產，爭取更佳利率</p>
        </div>
      </router-link>

      <!-- Staff Card -->
      <router-link to="/staff" class="group">
        <div class="bg-corgi-surface/10 backdrop-blur-md border border-corgi-surface/20 p-8 rounded-xl hover:bg-corgi-surface/20 hover:border-corgi-primary/50 hover:shadow-[0_0_30px_rgba(230,145,56,0.3)] transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">💼</div>
          <h2 class="text-2xl font-bold text-corgi-primary mb-2">我是行員</h2>
          <p class="text-corgi-text-light/80">智慧訪查輔助，快速生成報告</p>
        </div>
      </router-link>

      <!-- Credit Review Card -->
      <router-link to="/credit-review" class="group">
        <div class="bg-corgi-surface/10 backdrop-blur-md border border-corgi-surface/20 p-8 rounded-xl hover:bg-corgi-surface/20 hover:border-corgi-primary/50 hover:shadow-[0_0_30px_rgba(230,145,56,0.3)] transition-all duration-300 h-full flex flex-col items-center text-center relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div class="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">🔍</div>
          <h2 class="text-2xl font-bold text-corgi-primary mb-2">我是授信審核</h2>
          <p class="text-corgi-text-light/80">動態風險量化，精準決策</p>
        </div>
      </router-link>
    </div>
    
    <div class="mt-12 flex flex-col items-center gap-4 z-10">
      <div class="text-corgi-text-muted text-sm">Trusted by</div>
      <div class="flex items-center gap-6 opacity-70 grayscale hover:grayscale-0 transition-all">
        <div class="font-bold text-xl text-white">臺灣中小企業銀行</div>
        <div class="h-4 w-px bg-gray-600"></div>
        <div class="font-bold text-lg text-white">Google Cloud</div>
      </div>
      
      <router-link to="/admin" class="text-corgi-text-muted hover:text-corgi-primary text-sm mt-8">
        管理後台
      </router-link>
    </div>
  </div>
</template>
