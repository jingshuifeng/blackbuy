import Vue from 'vue'
import App from './App.vue'
//导入公共样式
import '../src/assets/statics/site/css/style.css'
Vue.config.productionTip = false


import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import detail from "./components/detail.vue"

import VueRouter from 'vue-router'
Vue.use(VueRouter)

// 1. 定义 (路由) 组件。
// 可以从其他文件 import 进来
import index from './components/index.vue'

import vip from "./components/huiyuanzhongxin.vue"
import vip1 from "./components/vip/vip1.vue"
import vip2 from "./components/vip/vip2.vue"
import vip3 from "./components/vip/vip3.vue"
// 2. 定义路由

const routes = [
  { path: '/index', component: index },
  { path: '/detail/:id', component: detail },
  {path:'/vip',component:vip,
children:[{
  path:'vip1',component:vip1
},{path:'vip2',component:vip2},{path:'vip3',component:vip3}]}
]

// 3. 创建 router 实例，然后传 `routes` 配置

const router = new VueRouter({
  routes 
})


// 现在，应用已经启动了！
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
