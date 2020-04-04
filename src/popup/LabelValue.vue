<template>
  <div class="wrapper">
    <p class="title is-6">{{ label }}</p>
    <p class="subtitle is-6">{{ value }}</p>
  </div>
</template>

<script>
export default {
  name: 'LabelValue',
  props: {
    label: { type: String },
    value: { type: [String, Number, Array] }
  }
};
</script>

<style scoped>
.wrapper {
  margin-bottom: 10px;
}
</style>
