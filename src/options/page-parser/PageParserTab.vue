<template>
  <div>
    <h3>Instructions</h3>
    <parser-instructions />
    <h3>Page Parsers</h3>
    <div class="parsersContainer">
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
  PageParser,
  listPageParsers,
  savePageParser,
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
      savePageParser(
        new PageParser(
          parser.hostname,
          parser.bookTitleParser,
          parser.chapterNumberParser
        )
      ).then(() => this.refreshParsers());
    },
    deleteParser(parser) {
      deletePageParser(parser.hostname).then(() => this.refreshParsers());
    },
    refreshParsers() {
      listPageParsers().then(parsers => {
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
