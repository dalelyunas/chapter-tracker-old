<template>
  <div class="container">
    <h1>Settings</h1>
    <h2 class="title">Page Parsers</h2>
    <b-card title="Instructions">
      <p>A page parser is the body of a function that takes the path and document of a page as arguments</p>
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
</style>
