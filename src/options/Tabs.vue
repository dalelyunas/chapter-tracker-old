<template>
  <div>
    <div
      :class="{
        tabs: true,
        'is-toggle': tabStyle === 'toggle',
        'is-boxed': tabStyle === 'boxed'
      }"
    >
      <ul>
        <li
          v-for="tab in tabs"
          :key="tab"
          :class="{
            'is-active': activeTab === tab
          }"
          v-on:click="switchTab(tab)"
        >
          <a
            ><slot :name="tabHeadSlotName(tab)">
              {{ tab }}
            </slot></a
          >
        </li>
      </ul>
    </div>
    <div><slot :name="tabPanelSlotName"> </slot></div>
  </div>
</template>

<script>
export default {
  props: {
    initialTab: String,
    tabs: Array,
    tabStyle: String
  },
  data() {
    return {
      activeTab: this.initialTab
    };
  },
  watch: {
    initialTab(val) {
      this.activeTab = val;
    }
  },
  computed: {
    tabPanelSlotName() {
      return `tab-panel-${this.activeTab}`;
    }
  },
  methods: {
    tabHeadSlotName(tabName) {
      return `tab-head-${tabName}`;
    },

    switchTab(tabName) {
      this.activeTab = tabName;
    }
  }
};
</script>
