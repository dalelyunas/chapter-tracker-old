<template>
  <div>
    <h2 class="title">Books</h2>
    <div class="bookGroupContainer">
      <book-view-group
        v-for="group in bookGroups"
        v-bind:key="group.hostname"
        v-bind:hostname="group.hostname"
        v-bind:books="group.books"
        @deleteBook="handleDeleteBook"
      />
    </div>
  </div>
</template>

<script>
import { listNotDeletedBooks, deleteBook } from "../../storage/book";

export default {
  name: "BookTab",
  data() {
    return {
      bookGroups: []
    };
  },
  created() {
    this.refreshBookGroups();
  },
  methods: {
    handleDeleteBook(book) {
      deleteBook(book.hostname, book.title).then(() =>
        this.refreshBookGroups()
      );
    },
    refreshBookGroups() {
      listNotDeletedBooks().then(books => {
        const reducer = (groups, book) => {
          if (book.hostname in groups) {
            groups[book.hostname].books.push(book);
          } else {
            groups[book.hostname] = {
              hostname: book.hostname,
              books: [book]
            };
          }
          return groups;
        };
        this.bookGroups = books.reduce(reducer, {});
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
