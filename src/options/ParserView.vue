<template>
  <b-card class="parserCard" v-bind:title="parser.hostname">
    <div class="codeGroup">
      <p>Book title parser</p>
      <code>{{parser.bookTitleParser}}</code>
    </div>
    <div class="codeGroup">
      <p>Chapter number parser</p>
      <code>{{parser.chapterNumberParser}}</code>
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
code {
  background-color: #eee;
  border-radius: 3px;
  font-family: courier, monospace;
  padding: 5px;
}

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
