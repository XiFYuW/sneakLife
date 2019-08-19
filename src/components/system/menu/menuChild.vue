<template>
  <ul v-bind:class="cla">
    <li v-for="tab in tabs" v-bind:key="tab.tab" v-on:click="onTabs(tab)"
        v-bind:class="{ 'active': tab.type === view && tab.type !== '','dropdown': tab.son.length > 0  }">
      <a v-bind:class="{'dropdown-toggle': tab.son.length > 0}" v-bind:data-toggle="tab.son.length > 0 ? 'dropdown' : ''"
         href="javascript:void(0)">
        {{ tab.tab }} <span class="caret" v-if="tab.son.length > 0"></span>
      </a>
      <menu-child v-if="tab.son.length > 0" v-bind:tabs="tab.son" v-bind:view="view" v-bind:cla="'dropdown-menu'"></menu-child>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menu-child',
  props: {
    tabs: {
      type: Array,
      required: true
    },
    view: {
      type: String,
      required: false
    },
    cla: {
      type: String,
      required: false
    }
  },
  methods: {
    onTabs: function (tab) {
      if (!tab.type) {
        return
      }
      this.view = tab.type
      this.$emit('introduce', {
        item: tab
      })
    }
  },
  watch: {
    view: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.view = newVal
        }
      }
    },
    immediate: true,
    deep: true
  }
}
</script>

<style scoped>

</style>
