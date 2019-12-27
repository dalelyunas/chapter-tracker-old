<template>
  <div>
    <parser-instructions />
    <h2 class="title">Page Parsers</h2>
    <div class="parserContainer">
      <parser-view
        v-for="parser in parsers"
        v-bind:key="parser.hostname"
        v-bind:parser="parser"
        @deleteParser="deleteParser"
      />
    </div>
    <add-parser-form @addParser="saveParser" />
  </div>
</template>

<script>
import {
  getAllPageParsers,
  upsertPageParser,
  deletePageParser
} from "../../storage/page-parser";

export default {
  name: "PageParserTab",
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

.parserContainer {
  overflow-y: scroll;
  max-height: 800px;
  margin-bottom: 20px;
}
</style>
