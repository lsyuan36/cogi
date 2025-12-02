/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        corgi: {
          dark: '#1C1C1C',       // 極深灰黑
          darker: '#2B2B2B',     // 深灰黑色 (用於深色卡片背景)
          primary: '#E69138',    // 亮橘色
          secondary: '#D2691E',  // 橘棕色
          surface: '#F5DEB3',    // 米黃色
          accent: '#F4A460',     // 淺橘色
          warning: '#8B4513',    // 馬鞍棕
          text: {
            DEFAULT: '#2B2B2B',  // 深灰黑色
            light: '#D2B48C',    // 淡棕色
            muted: '#5C4A3A',    // 深棕色
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
      }
    }
  },
  plugins: [],
}
