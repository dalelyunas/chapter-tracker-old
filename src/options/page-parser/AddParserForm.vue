<template>
  <b-card class="addParserCard" title="Add parser">
    <b-form-group label="Hostname" label-for="hostnameInput">
      <b-form-input id="hostnameInput" v-model="hostname" />
    </b-form-group>

    <b-form-group label="Book title parser" label-for="bookTitleInput">
      <b-form-textarea id="bookTitleInput" v-model="bookTitleParser" rows="2" max-rows="2" />
    </b-form-group>

    <b-form-group
      id="chapterNumberGroup"
      label="Chapter number parser"
      label-for="chapterNumberInput"
    >
      <b-form-textarea v-model="chapterNumberParser" rows="2" max-rows="2" />
    </b-form-group>

    <b-button
      v-on:click="addParser"
      v-bind:disabled="!isEnabled(hostname, chapterNumberParser, bookTitleParser)"
      variant="success"
    >Add</b-button>
  </b-card>
</template>

<script>
export default {
  name: "AddParserForm",
  data() {
    return {
      hostname: "",
      bookTitleParser: "",
      chapterNumberParser: ""
    };
  },
  methods: {
    addParser() {
      this.$emit("addParser", {
        hostname: this.hostname,
        bookTitleParser: this.bookTitleParser,
        chapterNumberParser: this.chapterNumberParser
      });
      this.hostname = "";
      this.chapterNumberParser = "";
      this.bookTitleParser = "";
    },
    isEnabled(hostname, chapterNumberParser, bookTitleParser) {
      return (
        hostname.length > 0 &&
        chapterNumberParser.length > 0 &&
        bookTitleParser.length > 0
      );
    }
  }
};
</script>

<style scoped>
.addParserCard {
  margin-bottom: 20px;
}
</style>
