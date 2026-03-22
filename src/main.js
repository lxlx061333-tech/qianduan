import { createApp } from 'vue'
import './style.css'
import App from './components/sou.vue'
import router from './router/yilu.js'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
