<template>
  <Radar :data="chartData" :options="chartOptions" />
</template>

<script setup>
import { computed } from 'vue'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js'
import { Radar } from 'vue-chartjs'
import { useRiskStore } from '@/stores/riskStore'

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const riskStore = useRiskStore()

const chartData = computed(() => {
  const d = riskStore.dimensions
  return {
    labels: [
      '系統穩定性',
      '資安成熟度',
      '科技治理',
      '供應商依賴',
      'AI 使用風險',
      '趨勢適應力'
    ],
    datasets: [
      {
        label: '科技風險評分',
        backgroundColor: 'rgba(230, 145, 56, 0.2)', // corgi-primary with opacity
        borderColor: '#E69138', // corgi-primary
        pointBackgroundColor: '#E69138',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#E69138',
        data: [
          d.stability,
          d.security,
          d.governance,
          d.supplier,
          d.aiRisk,
          d.trend
        ]
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    r: {
      angleLines: {
        color: 'rgba(230, 145, 56, 0.3)' // 柯基橘色半透明
      },
      grid: {
        color: 'rgba(230, 145, 56, 0.2)' // 柯基橘色更淡
      },
      pointLabels: {
        font: {
          size: 14,
          weight: '600',
          family: "'Inter', 'Noto Sans TC', sans-serif"
        },
        color: '#FFFFFF', // 白色文字
        padding: 10,
        backdropColor: 'rgba(28, 28, 28, 0.8)', // 深色背景
        backdropPadding: 4,
        borderRadius: 4
      },
      ticks: {
        font: {
          size: 12
        },
        color: '#D2B48C', // corgi-text-light
        backdropColor: 'rgba(28, 28, 28, 0.8)',
        backdropPadding: 2,
        showLabelBackdrop: true,
        stepSize: 20
      },
      suggestedMin: 0,
      suggestedMax: 100
    }
  },
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: 'rgba(28, 28, 28, 0.95)',
      titleColor: '#E69138',
      bodyColor: '#FFFFFF',
      borderColor: '#E69138',
      borderWidth: 1,
      padding: 12,
      displayColors: true,
      callbacks: {
        label: function(context) {
          return context.parsed.r + ' 分'
        }
      }
    }
  }
}
</script>
