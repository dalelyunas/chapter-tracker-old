<template>
  <b-card class="parserCard" v-bind:title="parser.hostname">
    <div class="codeGroup">
      <p>Book title parser</p>
      <pre v-highlightjs="parser.bookTitleParser"><code class="javascript"></code></pre>
    </div>
    <div class="codeGroup">
      <p>Chapter number parser</p>
      <pre v-highlightjs="parser.chapterNumberParser"><code class="javascript"></code></pre>
    </div>
    <b-button v-on:click="deleteParser" variant="danger">Delete</b-button>
  </b-card>
</template>

<script>
export default {
  name: "ParserView",
  props: {
    parser: { type: Object }
  },
  methods: {
    deleteParser() {
      this.$emit("deleteParser", this.parser);
    }
  }
};
</script>

<style scoped>
p {
  margin-bottom: 5px;
}

.codeGroup {
  margin-bottom: 10px;
}

.parserCard {
  margin-bottom: 20px;
}
</style>
