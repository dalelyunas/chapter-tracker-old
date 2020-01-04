<template>
  <b-card class="wrapperCard" title="Last Viewed Book" v-bind:sub-title="hostname">
    <data-pair-view header="Book title" v-bind:data="bookTitle" />
    <data-pair-view header="Current chapter" v-bind:data="currentChapter" />
    <data-pair-view header="Last 5 chapters" v-bind:data="chapters" />
    <b-link v-on:click="goToOptionsPage">Options</b-link>
  </b-card>
</template>

<script>
import { getLastViewedBook } from "../storage/last-viewed-book";
import { getBookByKey } from "../storage/book";

export default {
  data() {
    return {
      currentChapter: undefined,
      chapters: [],
      bookTitle: undefined,
      hostname: undefined
    };
  },
  created() {
    this.getLastViewedBookData();
  },
  methods: {
    getLastViewedBookData() {
      getLastViewedBook().then(lastViewedBook => {
        getBookByKey(lastViewedBook.hostname, lastViewedBook.title).then(
          book => {
            this.chapters = book.chapters.slice(-5);
            this.currentChapter = book.currentChapter;
            this.bookTitle = book.title;
            this.hostname = book.hostname;
          }
        );
      });
    },
    goToOptionsPage() {
      chrome.runtime.openOptionsPage();
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapperCard {
  margin: 5px;
  min-width: 200px;
}
</style>
