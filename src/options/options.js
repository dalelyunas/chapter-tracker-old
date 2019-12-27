import Vue from 'vue';
import App from './App';
import ParserView from './ParserView';
import AddParserForm from './AddParserForm';
import { BButton, BCard, BFormGroup, BFormInput } from 'bootstrap-vue';
import VueHighlightJS from 'vue-highlightjs';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import "highlight.js/styles/github.css";

Vue.component('b-button', BButton);
Vue.component('b-card', BCard);
Vue.component('b-form-group', BFormGroup);
Vue.component('b-form-input', BFormInput);

Vue.component('parser-view', ParserView);
Vue.component('add-parser-form', AddParserForm);

Vue.use(VueHighlightJS)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
