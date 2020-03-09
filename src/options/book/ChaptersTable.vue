<template>
  <div class="tableContainer">
    <table class="table is-bordered is-striped">
      <thead>
        <tr>
          <th>Number</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="(chapter, i) in chapters">
          <tr :key="i">
            <td>{{ chapter.number }}</td>
            <td>{{ new Date(chapter.updatedAt).toLocaleString() }}</td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ChaptersTable',
  props: {
    chapters: { type: [] }
  }
};
</script>

<style lang="scss" scoped>
.tableContainer {
  max-height: 300px;
  overflow-y: auto;
  margin-bottom: 20px;

  th {
    position: sticky;
    top: 0;
    background-color: #fff;
  }

  th:after,
  th:before {
    content: '';
    position: absolute;
    left: 0;
    width: 100%;
  }

  th:before {
    top: -1px;
    border-top: 1px solid #dbdbdb;
  }

  th:after {
    bottom: -1px;
    border-bottom: 2px solid #dbdbdb;
  }
}
</style>
