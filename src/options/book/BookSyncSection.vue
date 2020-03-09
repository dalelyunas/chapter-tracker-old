<template>
  <div class="wrapper">
    <p class="title is-6">{{ label }}</p>
    <p class="subtitle is-6">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'BookSyncSection',
  props: {
    label: { type: String },
    value: { type: [String, Number, Array] }
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  margin-bottom: 10px;
}
</style>
