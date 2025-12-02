import { defineStore } from 'pinia'

export const useRiskStore = defineStore('risk', {
  state: () => ({
    companyName: '汪汪餐飲集團',
    industry: 'retail', // retail, medical, manufacturing
    baseScore: 80,
    // 六大構面細項分數 (初始值)
    dimensions: {
      stability: 75,  // 系統穩定性
      security: 70,   // 資安成熟度
      governance: 60, // 科技治理
      supplier: 85,   // 供應商依賴度
      aiRisk: 90,     // AI 使用風險 (分數越高風險越低)
      trend: 65       // 趨勢適應力
    },
    evidencePhoto: null, // 存放行員拍的照片
    redFlags: [], // 存放被觸發的紅旗警示
    isApiConnected: false, // 是否已串接 Level 2 數據
  }),
  getters: {
    finalScore: (state) => {
      // 計算扣分:如果有紅旗,分數扣減
      let deduction = state.redFlags.length * 15;
      return Math.max(0, state.baseScore - deduction);
    },
    riskLevel: (state) => {
      const score = state.finalScore;
      if (score >= 90) return 'AAA';
      if (score >= 80) return 'AA';
      if (score >= 70) return 'A';
      if (score >= 60) return 'BBB';
      if (score >= 50) return 'BB';
      if (score >= 40) return 'B';
      return 'CCC';
    }
  },
  actions: {
    addEvidence(photoUrl) {
      this.evidencePhoto = photoUrl;
      this.redFlags.push('現場資安環境與描述不符');
    },
    connectApi() {
      this.isApiConnected = true;
      // API 串接後分數調整
      this.baseScore += 5; 
    },
    setIndustry(industry) {
      this.industry = industry;
    }
  }
})
