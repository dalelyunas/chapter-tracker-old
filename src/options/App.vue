<template>
  <div class="container">
    <h1>Settings</h1>
    <b-tabs lazy>
      <b-tab class="settingsTab" title="Page Parsers">
        <page-parser-tab />
      </b-tab>
      <b-tab class="settingsTab" title="Books">
        <book-tab />
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style scoped>
.settingsTab {
  margin-top: 20px;
}
</style>
