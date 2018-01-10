import Vue from 'vue'
const List = r => require.ensure([], () => r(require('../components/list.vue')), 'list')

Vue.component('list', List);