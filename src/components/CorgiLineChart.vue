<template>
  <Line :data="chartData" :options="chartOptions" />
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
  Legend
} from 'chart.js'
import { Line } from 'vue-chartjs'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const props = defineProps({
  useCorgiRisk: {
    type: Boolean,
    default: false
  }
})

const chartData = computed(() => {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  // Traditional Model (Static/High Risk)
  const traditionalData = [4.5, 4.6, 4.8, 4.7, 4.9, 5.0, 4.8, 4.9, 5.1, 5.2, 5.0, 4.8]
  
  // CorgiRisk Model (Dynamic/Lower Risk/More Accurate)
  // When enabled, it shows a lower, more stable predicted default rate
  const corgiData = [4.5, 4.2, 3.8, 3.5, 3.2, 2.8, 2.5, 2.2, 1.8, 1.5, 1.3, 1.2]

  const datasets = [
    {
      label: '傳統模型違約率預測',
      backgroundColor: '#9CA3AF', // gray-400
      borderColor: '#9CA3AF',
      data: traditionalData,
      tension: 0.4,
      borderDash: [5, 5]
    }
  ]

  if (props.useCorgiRisk) {
    datasets.push({
      label: 'CorgiRisk 動態模型',
      backgroundColor: '#E69138', // corgi-primary
      borderColor: '#E69138',
      data: corgiData,
      tension: 0.4,
      borderWidth: 3
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
      position: 'bottom'
    },
    tooltip: {
      backgroundColor: 'rgba(28, 28, 28, 0.9)',
      titleColor: '#E69138',
      bodyColor: '#fff',
      padding: 10,
      cornerRadius: 8
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      max: 6,
      title: {
        display: true,
        text: '違約率 (%)'
      },
      grid: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>
