import { createApp } from 'vue'
import router from './router'
import '@/mock/index.js'
import App from './App.vue'
import { createPinia } from 'pinia'
import '@/styles/icon.scss';
const app = createApp(App)
const pinia = createPinia()
app.use(router)
app.use(pinia)
app.mount('#app')