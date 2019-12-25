<template>
  <div>
    <p>Book title: {{bookTitle}}</p>
    <p>Current chapter: {{currentChapter}}</p>
    <p>Chapters: {{chapters}}</p>
  </div>
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
      bookTitle: undefined
    };
  },
  created() {
    this.getLastViewedBookData();
  },
  methods: {
    getLastViewedBookData() {
      getLastViewedBook().then(data => {
        this.bookTitle = data.bookTitle;
        getChapters(data.hostname, data.bookTitle).then(chapters => {
          this.chapters = chapters;
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
</style>
