<template>
  <div class="section leadSection">
    <h2 class="title">Books</h2>
    <div class="bookGroupContainer">
      <tabs :tabs="bookKeys" :initialTab="bookKeys[0]">
        <template v-for="group in bookGroups">
          <template :slot="`tab-head-${group.hostname}`">
            {{ group.hostname }}
          </template>
          <template :slot="`tab-panel-${group.hostname}`">
            <book-group-view
              :key="group.hostname"
              :hostname="group.hostname"
              :books="group.books"
              @deleteBook="onDeleteBook"
            />
          </template>
        </template>
      </tabs>
    </div>
  </div>
</template>

<script>
import { getActiveBooks, deleteBook } from '../../api/book-api';

export default {
  name: 'BookTab',
  data() {
    return {
      bookGroups: {}
    };
  },
  created() {
    this.fetchBookGroups();
  },
  computed: {
    bookKeys() {
      return Object.keys(this.bookGroups);
    }
  },
  methods: {
    onDeleteBook(book) {
      deleteBook(book.hostname, book.title).then(() => this.fetchBookGroups());
    },
    fetchBookGroups() {
      getActiveBooks().then((books) => {
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
.leadSection {
  padding-top: 0;
}
</style>
