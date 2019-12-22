<template>
  <div>
    {{ parsers }}
  </div>
</template>

<script>
import { getAllPageParsers, upsertPageParser } from '../storage/page-parser';

export default {
  name: "App",
  data () {
    return {
      parsers: []
    };  
  },  
  created () {
    getAllPageParsers().then(parsers => {
      console.log(parsers);
      this.parsers = parsers;
    });
  },
  methods: {
    saveSettings () {
      _self.isSaving = true;
      chrome.storage.set({
        jiraUrl: _self.jiraUrl,
        jiraUsername: _self.jiraUsername,
        jiraMerge: _self.jiraMerge,
        togglApiToken: _self.togglApiToken
      }, function () {
        _self.isSaving = false;
        _self.showSnackbar = true;
      });
    }
  }
};
</script>

<style scoped>
p {
  font-size: 20px;
}
</style>
