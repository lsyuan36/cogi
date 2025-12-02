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
        color: 'rgba(0, 0, 0, 0.1)'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.1)'
      },
      pointLabels: {
        font: {
          size: 12,
          family: "'Inter', 'Noto Sans TC', sans-serif"
        },
        color: '#5C4A3A' // corgi-text-muted
      },
      suggestedMin: 0,
      suggestedMax: 100
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}
</script>
