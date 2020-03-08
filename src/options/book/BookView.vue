<template>
  <div class="card bookCard">
    <header class="card-header">
      <p class="card-header-title">{{ book.title }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <p class="title is-6">Current Chapter</p>
        <p>{{ book.currentChapter }}</p>
        <p class="title is-6">All Chapters</p>
        <p>{{ book.chapters }}</p>
        <p class="title is-6">Updated At</p>
        <p>{{ book.updatedAt }}</p>
      </div>
    </div>
    <footer class="card-footer">
      <a v-on:click="onDeleteBook" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BookView',
  props: {
    book: { type: Object }
  },
  methods: {
    onDeleteBook() {
      this.$emit('deleteBook', this.book);
    }
  }
};
</script>

<style scoped>
.bookCard {
  margin-bottom: 20px;
}
</style>
