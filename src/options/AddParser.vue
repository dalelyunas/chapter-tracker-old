<template>
  <b-card title="Add parser">
    <b-card-text>
      <b-form-group label="Hostname" label-for="hostnameInput">
        <b-form-input id="hostnameInput" v-model="parser.hostname" />
      </b-form-group>
    </b-card-text>
    <b-card-text>
      <b-form-group label="Book title parser" label-for="bookTitleInput">
        <b-form-input id="bookTitleInput" v-model="parser.bookTitleParser" />
      </b-form-group>
    </b-card-text>
    <b-card-text>
      <b-form-group
        id="chapterNumberGroup"
        label="Chapter number parser"
        label-for="chapterNumberInput"
      >
        <b-form-input v-model="parser.chapterNumberParser" />
      </b-form-group>
    </b-card-text>
    <b-button v-on:click="addParser" variant="success">Add</b-button>
  </b-card>
</template>

<script>
export default {
  name: "AddParser",
  data() {
    return {
      parser: {}
    };
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
</style>
