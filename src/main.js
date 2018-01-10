import Vue from 'vue'
import VueResource from 'vue-resource'

import 'bootstrap/dist/css/bootstrap.css'


//AdminLTE
import 'admin-lte/dist/css/skins/_all-skins.min.css'
import 'admin-lte/dist/css/AdminLTE.min.css'

//font-awesome
import 'font-awesome/css/font-awesome.min.css'

import 'ionicons/dist/css/ionicons.min.css'

import 'admin-lte/dist/css/skins/skin-blue.min.css'

import 'bootstrap/dist/js/bootstrap'
import 'admin-lte/dist/js/adminlte'

//start
import router from './router/router'

import App from './App.vue'


/**
 *  加载插件
 *  @VueRouter：路由
 */

/**
 *  定义常量信息
 *  @DOMAINNAME：客户端地址
 *  @SERVERNAME：服务端地址
 *  @API_SERVER：服务端接口
 */

let DOMAINNAME = ''
let SERVERNAME = ''
let API_SERVER = ''
let GodData = {}
    /**
     *  全局方法
     */

//获取当前页面路由信息
router.afterEach(function(transition) {
    console.log("当前路由参数")
    console.log(transition)
})

/**
 *  创建实例
 */
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')