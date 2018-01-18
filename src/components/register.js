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

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// const Home = r => require.ensure([], () => r(require('../components/home.vue')), 'home')
// Vue.component('home', Home);

// const Login = r => require.ensure([], () => r(require('../components/login.vue')), 'login')
// Vue.component('login', Login);


const List = r => require.ensure([], () => r(require('../components/list.vue')), 'list')
Vue.component('list', List);

const Form = r => require.ensure([], () => r(require('../components/form.vue')), 'form')
Vue.component('mform', Form);

const LoginOrHome = r => require.ensure([], () => r(require('../components/loginOrHome.vue')), 'loginOrHome')
Vue.component('mimiApp', LoginOrHome);

Vue.prototype.validateXML = function(xmlContent) {
    //errorCode 0是xml正确，1是xml错误，2是无法验证 
    var xmlDoc, errorMessage, errorCode = 0;
    // code for IE 
    if (window.ActiveXObject) {
        xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async = "false";
        xmlDoc.loadXML(xmlContent);

        if (xmlDoc.parseError.errorCode != 0) {
            errorMessage = "错误code: " + xmlDoc.parseError.errorCode + "\n";
            errorMessage = errorMessage + "错误原因: " + xmlDoc.parseError.reason;
            errorMessage = errorMessage + "错误位置: " + xmlDoc.parseError.line;
            errorCode = 1;
        } else {
            errorMessage = "格式正确";
        }
    }
    // code for Mozilla, Firefox, Opera, chrome, safari,etc. 
    else if (document.implementation.createDocument) {
        var parser = new DOMParser();
        xmlDoc = parser.parseFromString(xmlContent, "text/xml");
        var error = xmlDoc.getElementsByTagName("parsererror");
        if (error.length > 0) {
            if (xmlDoc.documentElement.nodeName == "parsererror") {
                errorCode = 1;
                errorMessage = xmlDoc.documentElement.childNodes[0].nodeValue;
            } else {
                errorCode = 1;
                errorMessage = xmlDoc.getElementsByTagName("parsererror")[0].innerHTML;
            }
        } else {
            errorMessage = "格式正确";
        }
    } else {
        errorCode = 2;
        errorMessage = "浏览器不支持验证，无法验证xml正确性";
    }
    return {
        "msg": errorMessage,
        "error_code": errorCode
    };
};
var jsonData = {};
$.ajax({
    url: '/config.json',
    async: false,
    success: function(result) {
        jsonData = result;
    },
    dataType: 'json'
});
Vue.prototype.getGlobalData = function() {
    return jsonData;
}
Vue.prototype.setCookie = function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        var domain = "path=/;domain=" + document.domain;
        console.info(cname + "=" + cvalue + "; " + expires);
        document.cookie = cname + "=" + cvalue + "; " + expires + ";" + domain;
        console.info(document.cookie);
    }
    //获取cookie
Vue.prototype.getCookie = function(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1);
            if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
        }
        return "";
    }
    //清除cookie
Vue.prototype.clearCookie = function(cname) {
    this.setCookie(cname, "", -1);
}