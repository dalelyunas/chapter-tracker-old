<template>
  <div class="popupContainer">
    <div v-if="book !== null">
      <p class="title is-4">Last Viewed Book</p>
      <label-value label="Hostname" v-bind:value="book.hostname" />
      <label-value label="Title" v-bind:value="book.title" />
      <label-value label="Current chapter" v-bind:value="book.currentChapter.number" />
      <label-value label="Last 5 chapters" v-bind:value="book.chapters" />
      <label-value label="Updated At" v-bind:value="new Date(book.updatedAt).toLocaleString()" />
    </div>

    <div v-else>
      <p class="title is-4">No book found</p>
    </div>

    <a class="button is-link is-light" v-on:click="goToOptionsPage">Options</a>
  </div>
</template>

<script>
import { getLastViewedBook } from '../api/last-viewed-book-api';
import { getActiveBook } from '../api/book-api';

const getBook = async () => {
  const lastViewedBook = await getLastViewedBook();
  if (lastViewedBook !== null) {
    return getActiveBook(lastViewedBook.hostname, lastViewedBook.title);
  }
  return null;
};

export default {
  data() {
    return {
      book: null
    };
  },
  created() {
    getBook().then((book) => {
      if (book !== null) {
        this.book = {
          ...book,
          chapters: book.chapters.map((ch) => ch.number).slice(-5)
        };
      }
    });
  },
  methods: {
    goToOptionsPage() {
      chrome.runtime.openOptionsPage();
    }
  }
};
</script>
<style lang="scss">
.popupContainer {
  padding: 16px;
}
</style>
