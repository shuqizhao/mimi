/**
 *  路由文件
 *  引入[Vue, VueRouter]模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import '../components/register'

const Home = r => require.ensure([], () => r(require('../components/home.vue')), 'home')

const Login = r => require.ensure([], () => r(require('../components/login.vue')), 'login')

const XcfgList = r => require.ensure([], () => r(require('../biz/xcfg/xcfgList.vue')), 'xcfg')
/**
 *  加载模块
 */
Vue.use(VueRouter)

/**
 *  配置路由
 */

const router = new VueRouter({
  routes: [{
    path: '/',
    component: Login
  },{
    path: '/login',
    component: Login
  }, {
    path: '/home',
    component: Home,
    children: [{
      path: '/xcfg',
      component: XcfgList
    }]
  }]
})

export default router
