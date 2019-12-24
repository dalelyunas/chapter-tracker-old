<template>
  <div class="container">
    <div v-for="parser in parsers">
      <parser-view v-bind:parser="parser" @deleteParser="deleteParser" />
    </div>
    <add-parser @addParser="saveParser" />
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
      this.isSaving = true;
      upsertPageParser({
        hostname: parser.hostname,
        bookTitleParser: parser.bookTitleParser,
        chapterNumberParser: parser.chapterNumberParser
      }).then(() => this.refreshParsers());
    },
    deleteParser(parser) {
      this.isSaving = true;
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
p {
  font-size: 20px;
}
</style>
