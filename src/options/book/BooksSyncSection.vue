<template>
  <div class="wrapper">
    Books last synced
    <button v-bind:disabled="syncStatus === 'pending'" v-on:click="syncBooks">Sync Books</button>
  </div>
</template>

<script>
import { getLastBooksSync } from '../../api/last-books-sync-api';
import { makeBookSyncRequestedMessage, messageTypes } from '../../model/Message';

export default {
  name: 'BooksSyncSection',
  data() {
    return {
      syncStatus: '',
      lastBooksSync: null
    };
  },
  created() {
    this.fetchLastBooksSync();
  },
  methods: {
    syncBooks() {
      this.syncStatus = 'pending';
      chrome.runtime.sendMessage(makeBookSyncRequestedMessage(), (message) => {
        switch (message.type) {
          case messageTypes.ERROR:
            this.syncStatus = 'error';
            break;
          case messageTypes.BOOK_SYNC_COMPLETED:
            this.syncStatus = 'complete';
            break;
          default:
            this.syncStatus = 'error';
        }
        this.fetchLastBooksSync();
      });
    },
    fetchLastBooksSync() {
      getLastBooksSync().then((lastBooksSync) => (this.lastBooksSync = lastBooksSync));
    }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 10px;
}
</style>
