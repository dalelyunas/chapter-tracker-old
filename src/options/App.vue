<template>
  <div class="settingsContainer">
    <h1 class="title is-2">Settings</h1>
    <tabs :tabs="tabs" :initialTab="initialTab" tabStyle="boxed">
      <template slot="tab-head-pageparsers">
        Page Parsers
      </template>
      <template slot="tab-panel-pageparsers">
        <page-parser-tab />
      </template>

      <template slot="tab-head-books">
        Books
      </template>
      <template slot="tab-panel-books">
        <book-tab />
      </template>
    </tabs>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      tabs: ['pageparsers', 'books'],
      initialTab: 'pageparsers'
    };
  }
};
</script>
<style>
.settingsContainer {
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
}
</style>
