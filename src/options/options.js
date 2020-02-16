import Vue from 'vue';

import VueHighlightJS from 'vue-highlightjs';

import App from './App.vue';

import ParserView from './page-parser/ParserView.vue';
import AddParserForm from './page-parser/AddParserForm.vue';
import PageParserTab from './page-parser/PageParserTab.vue';
import ParserInstructions from './page-parser/ParserInstructions.vue';

import BookTab from './book/BookTab.vue';
import BookViewGroup from './book/BookViewGroup.vue';
import BookView from './book/BookView.vue';

import 'highlight.js/styles/github.css';

Vue.component('parser-view', ParserView);
Vue.component('add-parser-form', AddParserForm);
Vue.component('parser-instructions', ParserInstructions);
Vue.component('page-parser-tab', PageParserTab);

Vue.component('book-tab', BookTab);
Vue.component('book-view-group', BookViewGroup);
Vue.component('book-view', BookView);

Vue.use(VueHighlightJS);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App)
});
