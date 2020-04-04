<template>
  <div class="wrapper">
    <div v-if="syncStatus === 'complete'" class="notification is-success syncMessage">
      Sync successful
    </div>
    <div v-if="syncStatus === 'error'" class="notification is-danger syncMessage">Sync failed</div>

    <div class="lastSync">
      <span class="subtitle">Books last synced: </span>
      {{ lastBookSync === null ? 'Never' : new Date(lastBooksSync).toLocaleString() }}
    </div>

    <div>
      <button class="button" v-bind:disabled="syncStatus === 'pending'" v-on:click="syncBooks">
        Sync Books
      </button>
    </div>
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
      lastBooksSync: undefined
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
        this.$emit('booksSyncComplete');
        this.fetchLastBooksSync();
      });
    },
    fetchLastBooksSync() {
      getLastBooksSync().then((lastBooksSync) => (this.lastBooksSync = lastBooksSync));
    }
  }
};
</script>

<style scoped>
.wrapper {
  margin-bottom: 1.5rem;
}
.syncMessage {
  max-width: 200px;
}
.lastSync {
  margin-bottom: 0.5rem;
}
</style>
