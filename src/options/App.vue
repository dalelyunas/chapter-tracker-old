<template>
  <div class="container">
    <h2 class="title">Hostname Parsers</h2>
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
</style>
