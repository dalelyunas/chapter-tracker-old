<template>
  <div>
    <p>Book title: {{bookTitle}}</p>
    <p>Current chapter: {{currentChapter}}</p>
    <p>Furthest chapter: {{furthestChapter}}</p>
  </div>
</template>

<script>
import {
  getLastViewedBook,
  getCurrentChapter,
  getFurthestChapter
} from "../storage/book";
export default {
  data() {
    return {
      currentChapter: undefined,
      furthestChapter: undefined,
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
        getFurthestChapter(data.hostname, data.bookTitle).then(chapter => {
          this.furthestChapter = chapter;
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
