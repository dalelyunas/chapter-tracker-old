<template>
  <div class="dataPair">
    <h5>{{ header }}</h5>
    <p>{{ data }}</p>
  </div>
</template>

<script>
export default {
  name: 'DataPairView',
  props: {
    header: { type: String },
    data: { type: [String, Number, Array] }
  }
};
</script>

<style scoped>
p {
  margin-bottom: 0;
}
h5 {
  margin-bottom: 0;
}
.dataPair {
  margin-bottom: 10px;
}
</style>
