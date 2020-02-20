<template>
  <div>
    <div class="section">
      <h3 class="">Instructions</h3>
      <p>
        Each component of a page parser is the body of a function that takes the pathname and
        document of a page as arguments. Each component will be evaluated as the body of the
        following function once on relevant pages. The resulting data will be validated and stored.
      </p>
      <pre
        v-highlightjs
      ><code class="javascript">function executePageParserComponent(pathname, document) { 
      // Page parser component goes here 
  }</code></pre>
      <p>
        Your components should return the appropriate piece of data. For example, a string for the
        book title and a number for the chapter number.
      </p>
      <p>
        You can also return the value
        <code class="javascript">'ignore_parse_result'</code> if an appropriate value does not exist
        on the current page. All components will be ignored if at least one component returns this
        value.
      </p>
    </div>
    <div class="section">
      <h3 class="">Add Page Parser</h3>
      <add-parser-form @addParser="onAddParser" />
    </div>
    <div class="section">
      <h3 class="">Page Parsers</h3>
      <parser-view
        v-for="parser in parsers"
        v-bind:key="parser.hostname"
        v-bind:parser="parser"
        @deleteParser="onDeleteParser"
      />
    </div>
  </div>
</template>

<script>
import { makePageParser } from '../../model/PageParser';
import { getPageParsers, savePageParser, deletePageParser } from '../../api/page-parser-api';

export default {
  name: 'PageParserTab',
  data() {
    return {
      parsers: [],
      newParser: {}
    };
  },
  created() {
    this.fetchParsers();
  },
  methods: {
    onAddParser(parser) {
      savePageParser(
        makePageParser(parser.hostname, parser.bookTitleParser, parser.chapterNumberParser)
      ).then(() => this.fetchParsers());
    },
    onDeleteParser(parser) {
      deletePageParser(parser.hostname).then(() => this.fetchParsers());
    },
    fetchParsers() {
      getPageParsers().then((parsers) => {
        this.parsers = parsers;
        this.newParser = {};
      });
    }
  }
};
</script>

<style scoped>
.parsersContainer {
  overflow-y: scroll;
  max-height: 800px;
  margin-bottom: 20px;
}
</style>
