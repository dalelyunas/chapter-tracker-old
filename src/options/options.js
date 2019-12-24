import Vue from 'vue';
import App from './App';
import ParserView from './ParserView';
import { BButton, BContainer, BRow, BCol } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('b-button', BButton)
Vue.component('b-row', BRow)
Vue.component('b-container', BContainer)
Vue.component('b-col', BCol)

Vue.component('parser-view', ParserView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
