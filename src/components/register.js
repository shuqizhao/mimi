import Vue from 'vue'

const Home = r => require.ensure([], () => r(require('../components/home.vue')), 'home')
Vue.component('home', Home);

const Login = r => require.ensure([], () => r(require('../components/login.vue')), 'login')
Vue.component('login', Login);


const List = r => require.ensure([], () => r(require('../components/list.vue')), 'list')
Vue.component('list', List);