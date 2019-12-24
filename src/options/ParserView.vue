<template>
  <div>
    <b-card title="{{parser.hostname}}">
      <b-card-text>
        <p>Book title parser</p>
        <code>{{parser.bookTitleParser}}</code>
      </b-card-text>
      <b-card-text>
        <p>Chapter number parser</p>
        <code>{{parser.chapterNumberParser}}</code>
      </b-card-text>
      <b-button v-on:click="deleteParser" variant="danger">Delete</b-button>
    </b-card>
  </div>
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
  padding: 0 3px;
}
</style>
