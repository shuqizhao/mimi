/**
 *  路由文件
 *  引入[Vue, VueRouter]模块
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import '../components/register'
import Home from "../components/home.vue"
import XcfgList from "../biz/xcfg/xcfgList.vue"
/**
 *  加载模块
 */
Vue.use(VueRouter)

/**
 *  配置路由
 */

const router = new VueRouter({
    routes: [{
        path: '/home',
        component: Home
    },{
        path: '/xcfg',
        component: XcfgList
    }]
})

export default router