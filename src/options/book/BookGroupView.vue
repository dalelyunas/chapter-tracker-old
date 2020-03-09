<template>
  <div>
    <input
      class="input searchInput"
      type="text"
      v-model="search"
      placeholder="Search book titles..."
    />
    <book-view
      v-for="book in filteredBooks"
      :key="book.title"
      :book="book"
      @deleteBook="onDeleteBook"
    />
  </div>
</template>

<script>
export default {
  name: 'BookViewGroup',
  props: {
    books: { type: Array },
    hostname: { type: String }
  },
  data() {
    return {
      search: ''
    };
  },
  computed: {
    filteredBooks() {
      console.log('filtering');
      return this.books.filter((book) =>
        book.title.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  },
  methods: {
    onDeleteBook(book) {
      this.$emit('deleteBook', book);
    }
  }
};
</script>
<style scoped>
.searchInput {
  margin-bottom: 1.5rem;
}
</style>
