<template>
  <div>
    <book-view v-for="book in books" :key="book.title" :book="book" @deleteBook="onDeleteBook" />
  </div>
</template>

<script>
export default {
  name: 'BookViewGroup',
  props: {
    books: { type: Array },
    hostname: { type: String }
  },
  methods: {
    onDeleteBook(book) {
      this.$emit('deleteBook', book);
    }
  }
};
</script>
