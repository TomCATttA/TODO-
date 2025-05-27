import { createApp } from 'vue'
import router from './router'
import '@/mock/index.js'
import App from './App.vue'
import { createPinia } from 'pinia'
import '@/styles/icon.scss';
import 'element-plus/theme-chalk/el-message.css'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
pinia.use(piniaPluginPersistedstate)
app.mount('#app')