/**
 *  路由文件
 *  引入[Vue, VueRouter]模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


const XcfgList = r => require.ensure([], () => r(require('../biz/xcfg/xcfgList.vue')), 'xcfg')

const XcfgView = r => require.ensure([], () => r(require('../biz/xcfg/xcfgView.vue')), 'xcfg')
/**
 *  加载模块
 */
Vue.use(VueRouter)

/**
 *  配置路由
 */

const router = new VueRouter({
  routes: [{
    path: '/xcfg',
    component: XcfgList
  }, {
    path: '/xcfgview',
    component: XcfgView
  }]
})

export default router
