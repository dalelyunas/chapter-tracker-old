<template>
  <div class="card parserCard">
    <header class="card-header">
      <p class="card-header-title">{{ parser.hostname }}</p>
    </header>
    <div class="card-content">
      <div class="content">
        <p class="title is-6">Book Title Parser</p>
        <pre v-highlightjs><code class="javascript">{{parser.bookTitleParser}}</code></pre>
        <p class="title is-6">Chapter Number Parser</p>
        <pre v-highlightjs><code class="javascript">{{parser.chapterNumberParser}}</code></pre>
      </div>
    </div>
    <footer class="card-footer">
      <a v-on:click="deleteParser" class="card-footer-item">Delete</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ParserView',
  props: {
    parser: { type: Object }
  },
  methods: {
    deleteParser() {
      this.$emit('deleteParser', this.parser);
    }
  }
};
</script>

<style scoped>
.parserCard {
  margin-bottom: 1.5rem;
}
</style>
