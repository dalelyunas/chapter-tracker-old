<template>
  <div class="container">
    <h1>Settings</h1>
    <tab-card v-bind:tabs="tabs" v-bind:initialTab="initialTab" lazy>
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
    </tab-card>
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
