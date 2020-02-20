<template>
  <div class="card">
    <div class="tabs">
      <ul class="tab-heads">
        <li
          class="tab-head"
          v-for="tab in tabs"
          :key="tab"
          v-bind:class="{
            'is-active': activeTab === tab
          }"
          v-on:click="switchTab(tab)"
        >
          <slot :name="tabHeadSlotName(tab)">{{ tab }} </slot>
        </li>
      </ul>
    </div>
    <div class="tab-panel"><slot :name="tabPanelSlotName"> </slot></div>
  </div>
</template>

<script>
export default {
  props: {
    initialTab: String,
    tabs: Array
  },
  data() {
    return {
      activeTab: this.initialTab
    };
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
