/**
 *  路由文件
 *  引入[Vue, VueRouter]模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


const XcfgList = r => require.ensure([], () => r(require('../biz/xcfg/xcfgList.vue')), 'xcfg')

const XcfgView = r => require.ensure([], () => r(require('../biz/xcfg/xcfgView.vue')), 'xcfg')


const UserList = r => require.ensure([], () => r(require('../biz/auth/user.vue')), 'auth')
const UserView = r => require.ensure([], () => r(require('../biz/auth/userView.vue')), 'auth')
/**
 *  加载模块
 */
Vue.use(VueRouter)

/**
 *  配置路由
 */

const router = new VueRouter({
  routes: [{
    path: '/xcfg/xcfg',
    component: XcfgList
  }, {
    path: '/xcfgview',
    component: XcfgView
  }, {
    path: '/auth/user',
    component: UserList
  } ,{
    path: '/auth/userview',
    component: UserView
  }]
})

export default router
