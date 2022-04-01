import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as icons from '@element-plus/icons-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import 'element-plus/dist/index.css'
import '@arco-design/web-vue/dist/arco.css'

// 导入公共样式
import './style/index.css'
// 导入自定义echart公共样式
import './style/echart.css'

const app = createApp(App)

Object.keys(icons).forEach(key => {
  app.component(key, icons[key])
})

app.use(ArcoVueIcon)
app.use(router)
app.use(store)
app.mount('#app')
