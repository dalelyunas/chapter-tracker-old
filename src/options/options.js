import Vue from 'vue';
import App from './App';
import ParserView from './ParserView';
import AddParser from './AddParser';
import { BButton, BContainer, BRow, BCol, BCard, BCardText, BFormGroup, BFormInput } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.component('b-button', BButton);
Vue.component('b-row', BRow);
Vue.component('b-container', BContainer);
Vue.component('b-col', BCol);
Vue.component('b-card', BCard);
Vue.component('b-card-text', BCardText);
Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-input', BFormInput);


Vue.component('parser-view', ParserView);
Vue.component('add-parser', AddParser);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
