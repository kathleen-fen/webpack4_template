import './js/common'
import './scss/main.scss'
import './css/main.css'



window.Vue = require('vue')
Vue.component('example-component',require('./components/Example.vue').default)

import store from './store'
const app = new Vue({
    store,
    el: '#app'
})