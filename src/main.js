import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import * as icons from '@element-plus/icons-vue'

// 导入公共样式
import './style/index.css'

const app = createApp(App)

Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})

app.use(router)
app.use(store)
app.mount('#app')
