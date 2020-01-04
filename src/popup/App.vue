<template>
  <b-card class="wrapperCard" title="Last Viewed Book" v-bind:sub-title="hostname">
    <template v-if="book !== null">
      <data-pair-view header="Book title" v-bind:data="book.title" />
      <data-pair-view header="Current chapter" v-bind:data="book.currentChapter" />
      <data-pair-view header="Last 5 chapters" v-bind:data="book.chapters" />
    </template>
    <h5 v-else>No book found</h5>
    <b-link v-on:click="goToOptionsPage">Options</b-link>
  </b-card>
</template>

<script>
import { getLastViewedBook } from "../storage/last-viewed-book";
import { getBookByKey } from "../storage/book";

export default {
  data() {
    return {
      book: null
    };
  },
  created() {
    this.getLastViewedBookData();
  },
  methods: {
    getLastViewedBookData() {
      getLastViewedBook().then(lastViewedBook => {
        if (lastViewedBook !== null) {
          getBookByKey(lastViewedBook.hostname, lastViewedBook.title).then(
            book => {
              if (book !== null) {
                this.book = {
                  ...book,
                  chapters: book.chapters.slice(-5)
                };
              }
            }
          );
        }
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
