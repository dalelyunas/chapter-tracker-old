<template>
  <div>
    <h2 class="title">Books</h2>
    <parser-instructions />
    <div class="bookContainer">
      <book-view
        v-for="book in books"
        v-bind:key="book.title"
        v-bind:parser="book"
        @deleteBook="deleteBook"
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
} from "../storage/page-parser";

export default {
  name: "BookTab",
  data() {
    return {
      books: []
    };
  },
  created() {
    this.refreshBooks();
  },
  methods: {
    deleteBook(book) {
      deleteBook(book.hostname, book.title).then(() => this.refreshBooks());
    },
    refreshBooks() {
      getAllBooks().then(books => {
        this.books = books;
      });
    }
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 20px;
}

.bookContainer {
  overflow-y: scroll;
  max-height: 800px;
  margin-bottom: 20px;
}
</style>
