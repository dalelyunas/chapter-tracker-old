<template>
  <b-card class="bookCard" v-bind:title="book.title">
    <div class="dataGroup">
      <h6>Current chapter</h6>
      <p>{{book.currentChapter}}</p>
    </div>
    <div class="dataGroup">
      <h6>All Chapters</h6>
      <p>{{book.chapters}}</p>
    </div>
    <b-button v-on:click="deleteBook" variant="danger">Delete</b-button>
  </b-card>
</template>

<script>
export default {
  name: "BookView",
  props: {
    book: { type: Object }
  },
  methods: {
    deleteBook() {
      this.$emit("deleteBook", this.book);
    }
  }
};
</script>

<style scoped>
.dataGroup {
  margin-bottom: 10px;
}

.bookCard {
  margin-bottom: 20px;
}
</style>
