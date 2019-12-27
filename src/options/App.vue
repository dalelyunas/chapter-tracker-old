<template>
  <div class="container">
    <h1>Settings</h1>
    <h2 class="title">Page Parsers</h2>
    <b-card class="instructionCard" title="Instructions">
      <p>Each component of a page parser is the body of a function that takes the pathname and document of a page as arguments. Each component will be evaluated as the body of the following function once on relevant pages. The resulting data will be validated and stored.</p>
      <pre v-highlightjs><code class="javascript">function executeParserComponent(pathname, document) { 
      // Page parser component goes here 
  }</code></pre>
      <p>Your components should return the appropriate piece of data. For example, a string for the book title and a number for the chapter number.</p>
      <p>
        You can also return the value
        <code class="javascript">'ignore_parse_result'</code> if an appropriate value does not exist on the current page. All components will be ignored if at least one component returns this value.
      </p>
    </b-card>
    <div v-for="parser in parsers" v-bind:key="parser.hostname">
      <parser-view v-bind:parser="parser" @deleteParser="deleteParser" />
    </div>
    <add-parser-form @addParser="saveParser" />
  </div>
</template>

<script>
import {
  getAllPageParsers,
  upsertPageParser,
  deletePageParser
} from "../storage/page-parser";

export default {
  name: "App",
  data() {
    return {
      parsers: [],
      newParser: {}
    };
  },
  created() {
    this.refreshParsers();
  },
  methods: {
    saveParser(parser) {
      upsertPageParser({
        hostname: parser.hostname,
        bookTitleParser: parser.bookTitleParser,
        chapterNumberParser: parser.chapterNumberParser
      }).then(() => this.refreshParsers());
    },
    deleteParser(parser) {
      deletePageParser(parser.hostname).then(() => this.refreshParsers());
    },
    refreshParsers() {
      getAllPageParsers().then(parsers => {
        this.parsers = parsers;
        this.newParser = {};
      });
    }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
}

.instructionCard {
  margin-bottom: 20px;
}
</style>
