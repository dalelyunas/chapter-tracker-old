<template>
  <div>
    <b-container>
      <b-row>
        <p>Hostname</p>
        <code>{{parser.bookTitleParser}}</code>
      </b-row>
      <b-row>
        <p>Book title parser</p>
        <code>{{parser.bookTitleParser}}</code>
      </b-row>
      <b-row>
        <p>Chapter number parser</p>
        <code>{{parser.chapterNumberParser}}</code>
      </b-row>
      <b-row>
        <b-col>
          <b-button v-on:click="deleteParser" variant="danger">Delete</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: "AddParser",
  data: {
    parser: {}
  },
  methods: {
    addParser() {
      this.$emit("addParser", this.parser);
      this.parser = {};
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
