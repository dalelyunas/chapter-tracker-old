<template>
  <div>
    <b-button class="bookGroupButton" v-b-toggle="hostname + 'Id'" variant="primary">{{hostname}}</b-button>
    <b-collapse v-bind:id="hostname + 'Id'" accordion="hostnamesAccordion">
      <div class="bookViewsContainer">
        <book-view
          v-for="book in books"
          v-bind:key="book.title"
          v-bind:book="book"
          @deleteBook="deleteBook"
        />
      </div>
    </b-collapse>
  </div>
</template>

<script>
export default {
  name: "BookViewGroup",
  props: {
    books: { type: Array },
    hostname: { type: String }
  },
  methods: {
    deleteBook(book) {
      this.$emit("deleteBook", book);
    }
  }
};
</script>

<style scoped>
.bookViewsContainer {
  overflow-y: scroll;
  max-height: 600px;
  margin-bottom: 20px;
}

.bookGroupButton {
  margin-bottom: 20px;
}
</style>
