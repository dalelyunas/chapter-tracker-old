import Vue from 'vue';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';

import 'highlight.js/styles/github.css';
import './styles.scss';

import App from './App.vue';
import TabCard from './TabCard.vue';

import ParserView from './page-parser/ParserView.vue';
import AddParserForm from './page-parser/AddParserForm.vue';
import PageParserTab from './page-parser/PageParserTab.vue';

import BookTab from './book/BookTab.vue';
import BookViewGroup from './book/BookViewGroup.vue';
import BookView from './book/BookView.vue';

Vue.component('tab-card', TabCard);

Vue.component('parser-view', ParserView);
Vue.component('add-parser-form', AddParserForm);
Vue.component('page-parser-tab', PageParserTab);

Vue.component('book-tab', BookTab);
Vue.component('book-view-group', BookViewGroup);
Vue.component('book-view', BookView);

hljs.registerLanguage('javascript', javascript);

Vue.directive('highlightjs', {
  deep: true,
  bind(el, binding) {
    const targets = el.querySelectorAll('code');
    targets.forEach((target) => {
      if (binding.value) {
        // eslint-disable-next-line no-param-reassign
        target.textContent = binding.value;
      }
      hljs.highlightBlock(target);
    });
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: (h) => h(App)
});
