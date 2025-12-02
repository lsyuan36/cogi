<template>
  <div class="relative w-full h-full">
    <!-- 背景網格效果 -->
    <div class="absolute inset-0 opacity-5">
      <div class="grid grid-cols-12 h-full">
        <div v-for="i in 12" :key="i" class="border-r border-corgi-primary"></div>
      </div>
    </div>

    <!-- Chart -->
    <Line :data="chartData" :options="chartOptions" />

    <!-- CorgiRisk 啟用時的增強效果 -->
    <transition name="fade">
      <div v-if="useCorgiRisk" class="absolute top-4 right-4 flex items-center gap-2 bg-corgi-primary/20 border border-corgi-primary/50 rounded-lg px-3 py-2 backdrop-blur-sm">
        <div class="w-2 h-2 bg-corgi-primary rounded-full animate-pulse"></div>
        <span class="text-xs font-semibold text-corgi-primary">動態模型運算中</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const props = defineProps({
  useCorgiRisk: {
    type: Boolean,
    default: false
  }
})

const chartData = computed(() => {
  const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  // Traditional Model (Static/High Risk)
  const traditionalData = [4.5, 4.6, 4.8, 4.7, 4.9, 5.0, 4.8, 4.9, 5.1, 5.2, 5.0, 4.8]

  // CorgiRisk Model (Dynamic/Lower Risk/More Accurate)
  const corgiData = [4.5, 4.2, 3.8, 3.5, 3.2, 2.8, 2.5, 2.2, 1.8, 1.5, 1.3, 1.2]

  const datasets = [
    {
      label: '傳統模型違約率',
      backgroundColor: 'rgba(156, 163, 175, 0.1)',
      borderColor: '#9CA3AF',
      pointBackgroundColor: '#9CA3AF',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
      data: traditionalData,
      tension: 0.4,
      borderDash: [8, 4],
      borderWidth: 2,
      fill: true
    }
  ]

  if (props.useCorgiRisk) {
    datasets.push({
      label: 'CorgiRisk 動態模型',
      backgroundColor: 'rgba(230, 145, 56, 0.15)',
      borderColor: '#E69138',
      pointBackgroundColor: '#E69138',
      pointBorderColor: '#fff',
      pointBorderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#E69138',
      pointHoverBorderColor: '#fff',
      data: corgiData,
      tension: 0.4,
      borderWidth: 3,
      fill: true
    })
  }

  return {
    labels,
    datasets
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#D2B48C',
        padding: 15,
        font: {
          size: 13,
          weight: '600',
          family: "'Inter', 'Noto Sans TC', sans-serif"
        },
        usePointStyle: true,
        pointStyle: 'circle'
      }
    },
    tooltip: {
      backgroundColor: 'rgba(28, 28, 28, 0.95)',
      titleColor: '#E69138',
      bodyColor: '#ffffff',
      borderColor: '#E69138',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        label: function(context) {
          return context.dataset.label + ': ' + context.parsed.y + '%'
        }
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 6,
      title: {
        display: true,
        text: '違約率 (%)',
        color: '#D2B48C',
        font: {
          size: 13,
          weight: '600'
        }
      },
      ticks: {
        color: '#9CA3AF',
        font: {
          size: 12
        },
        callback: function(value) {
          return value + '%'
        }
      },
      grid: {
        color: 'rgba(230, 145, 56, 0.1)',
        drawBorder: false
      }
    },
    x: {
      ticks: {
        color: '#9CA3AF',
        font: {
          size: 12
        }
      },
      grid: {
        display: false,
        drawBorder: false
      }
    }
  },
  animation: {
    duration: 1000,
    easing: 'easeInOutQuart'
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
