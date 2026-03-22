import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    server: {
      host: true,
      port: 5173,
      // 开发环境代理，解决跨域
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    },
    // 定义全局常量，在代码中可通过import.meta.env访问
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV || 'development')
    }
  }
})