<template>
  <b-card class="bookCard" v-bind:title="book.title">
    <div class="dataGroup">
      <p>Current chapter</p>
      <p>{{book.currentChapter}}</p>
    </div>
    <div class="codeGroup">
      <p>All Chapters</p>
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
