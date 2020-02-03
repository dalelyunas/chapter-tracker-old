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
    <b-button variant="primary" v-bind:disabled="syncingBooks" v-on:click="syncBooks"
      >Sync books</b-button
    >
    <p v-if="errorMsg !== null">Error while syncing</p>
    <p v-if="syncSuccess">Sync successful</p>
  </b-card>
</template>

<script>
import { getLastViewedBook } from '../api/last-viewed-book-api';
import { getActiveBook } from '../api/book-api';
import { makeBookSyncRequestedMessage, messageTypes } from '../model/Message';

export default {
  data() {
    return {
      book: null,
      syncingBooks: false,
      errorMsg: null,
      syncSuccess: false
    };
  },
  created() {
    this.refreshLastViewedBook();
  },
  methods: {
    refreshLastViewedBook() {
      getLastViewedBook().then((lastViewedBook) => {
        if (lastViewedBook !== null) {
          getActiveBook(lastViewedBook.hostname, lastViewedBook.title).then((book) => {
            if (book !== null) {
              this.book = {
                ...book,
                chapters: book.chapters.map((ch) => ch.number).slice(-5)
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
      this.syncingBooks = true;
      this.errorMsg = null;
      this.syncSuccess = false;
      chrome.runtime.sendMessage(makeBookSyncRequestedMessage(), (message) => {
        this.syncingBooks = false;
        switch (message.type) {
          case messageTypes.ERROR:
            this.errorMsg = message.data.error;
            break;
          case messageTypes.BOOK_SYNC_COMPLETED:
            this.syncSuccess = true;
            break;

          default:
        }
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
