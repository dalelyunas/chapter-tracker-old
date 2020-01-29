<template>
  <b-card
    class="wrapperCard"
    title="Last Viewed Book"
    v-bind:sub-title="book !== null ? book.hostname : null"
  >
    <template v-if="book !== null">
      <data-pair-view header="Book title" v-bind:data="book.title" />
      <data-pair-view header="Current chapter" v-bind:data="book.currentChapter.number" />
      <data-pair-view header="Last 5 chapters" v-bind:data="book.chapters" />
    </template>
    <h5 v-else>No book found</h5>

    <b-link v-on:click="goToOptionsPage">Options</b-link>
    <b-button v-on:click="syncBooks">Sync books</b-button>
  </b-card>
</template>

<script>
import { getLastViewedBook } from '../storage/last-viewed-book';
import { getBookNotDeleted } from '../storage/book';
import { SYNC_BOOKS, Message } from '../message';

export default {
  data() {
    return {
      book: null,
      syncingBooks: false
    };
  },
  created() {
    this.refreshLastViewedBook();
  },
  methods: {
    refreshLastViewedBook() {
      getLastViewedBook().then(lastViewedBook => {
        if (lastViewedBook !== null) {
          getBookNotDeleted(lastViewedBook.hostname, lastViewedBook.title).then(book => {
            if (book !== null) {
              this.book = {
                ...book,
                chapters: book.chapters.map(ch => ch.number).slice(-5)
              };
            }
          });
        }
      });
    },
    goToOptionsPage() {
      chrome.runtime.openOptionsPage();
    },
    syncBooks() {
      chrome.runtime.sendMessage(new Message(SYNC_BOOKS, {}), response => {
        // Nothing
      });
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
