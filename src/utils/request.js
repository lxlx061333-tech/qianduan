// src/utils/request.js
import axios from '@/utils/request';

// 自动从环境变量读取API地址，如果没有则用本地地址
const baseURL = import.meta.env.VITE_API_URL || ''

// 创建axios实例
const request = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器 - 自动添加token
request.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') || 
                  localStorage.getItem('Authorization') ||
                  sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器 - 统一处理错误
request.interceptors.response.use(
  response => {
    // 如果是文件下载，直接返回
    if (response.config.responseType === 'blob') {
      return response
    }
    // 正常返回数据
    return response.data
  },
  error => {
    console.error('请求错误:', error)
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      // 跳转到登录页
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default request