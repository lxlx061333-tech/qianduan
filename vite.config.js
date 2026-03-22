import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    
    // 解析配置
    resolve: {
      // 路径别名配置
      alias: {
        '@': path.resolve(__dirname, 'src'),
           }
    },
    
    server: {
      host: true,
      port: 5173,
      // 开发环境代理，解决跨域
      proxy: {
        '/api': {
          target: env.VITE_API_URL || '',
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