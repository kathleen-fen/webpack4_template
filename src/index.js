import React from 'react'
import {render} from 'react-dom'
import './js/common'
import './assets/scss/main.scss'
import './assets/css/main.css'
import App from './app'



window.Vue = require('vue')
Vue.component('example-component',require('./components/Example.vue').default)

import store from './store'
const app = new Vue({
    store,
    el: '#app'
})

render(<App />, document.getElementById('app'))