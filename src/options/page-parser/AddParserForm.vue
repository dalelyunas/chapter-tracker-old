<template>
  <div>
    <div class="field">
      <label class="label">Hostname</label>
      <div class="control">
        <input class="input" type="text" v-model="hostname" />
      </div>
    </div>

    <div class="field">
      <label class="label">Book Title Parser</label>
      <div class="control">
        <textarea class="textarea" type="text" v-model="bookTitleParser" rows="2" />
      </div>
    </div>

    <div class="field">
      <label class="label">Chapter Number Parser</label>
      <div class="control">
        <textarea class="textarea" type="text" v-model="chapterNumberParser" rows="2" />
      </div>
    </div>

    <div class="field">
      <div class="control">
        <button
          class="button is-primary"
          v-on:click="addParser"
          :disabled="!isEnabled(hostname, chapterNumberParser, bookTitleParser)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AddParserForm',
  data() {
    return {
      hostname: '',
      bookTitleParser: '',
      chapterNumberParser: ''
    };
  },
  methods: {
    addParser() {
      this.$emit('addParser', {
        hostname: this.hostname,
        bookTitleParser: this.bookTitleParser,
        chapterNumberParser: this.chapterNumberParser
      });
      this.hostname = '';
      this.chapterNumberParser = '';
      this.bookTitleParser = '';
    },
    isEnabled(hostname, chapterNumberParser, bookTitleParser) {
      return hostname.length > 0 && chapterNumberParser.length > 0 && bookTitleParser.length > 0;
    }
  }
};
</script>

<style scoped>
.addParserCard {
  margin-bottom: 20px;
}
</style>
