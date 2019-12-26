<template>
  <b-card class="wrapperCard" title="Last Viewed Book" v-bind:sub-title="hostname">
    <data-pair-view header="Book title" v-bind:data="bookTitle" />
    <data-pair-view header="Current chapter" v-bind:data="currentChapter" />
    <data-pair-view header="Last 5 chapters" v-bind:data="chapters" />
  </b-card>
</template>

<script>
import {
  getLastViewedBook,
  getCurrentChapter,
  getChapters
} from "../storage/book";

export default {
  data() {
    return {
      currentChapter: undefined,
      chapters: [],
      bookTitle: undefined,
      hostname: undefined
    };
  },
  created() {
    this.getLastViewedBookData();
  },
  methods: {
    getLastViewedBookData() {
      getLastViewedBook().then(data => {
        this.bookTitle = data.bookTitle;
        this.hostname = data.hostname;
        getChapters(data.hostname, data.bookTitle).then(chapters => {
          this.chapters = chapters.slice(-5);
        });
        getCurrentChapter(data.hostname, data.bookTitle).then(chapter => {
          this.currentChapter = chapter;
        });
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrapperCard {
  margin: 5px;
  min-width: 200px;
}
</style>
