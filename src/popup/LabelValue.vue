<template>
  <div class="wrapper">
    <p class="title">{{ label }}</h5>
    <p class="body-1">{{ value }}</p>
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
