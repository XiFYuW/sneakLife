<template>
  <ul v-bind:class="cla">
    <li v-for="tab in tabs" v-bind:key="tab.tab" @click.stop="onTabs(tab)"
        v-bind:class="{ 'active': tab.type !== '' && tab.type === view,'dropdown': tab.son.length > 0 }">
      <a v-bind:id="tab.id" v-bind:class="{'dropdown-toggle': tab.son.length > 0}" v-bind:data-toggle="tab.son.length > 0 ? 'dropdown' : ''"
         href="javascript:void(0)">
        {{ tab.tab }} <span class="caret" v-if="tab.son.length > 0"></span>
      </a>
      <menu-child v-if="tab.son.length > 0" v-bind:tabs="tab.son" v-bind:cla="'dropdown-menu'" @introduce="getItem"></menu-child>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'menu-child',
  data () {
    return {
      view: ''
    }
  },
  props: {
    tabs: {
      type: Array,
      required: true
    },
    cla: {
      type: String,
      required: false
    }
  },
  methods: {
    onTabs: function (tab) {
      if (!tab.type) {
        this.addOpen(tab)
        return
      }
      this.view = tab.type
      this.$emit('introduce', {
        item: tab,
        view: this.view
      })
      this.$jquery('li.dropdown').removeClass('open')
      this.$jquery('li.dropdown').removeClass('open')
    },
    getItem: function (item) {
      this.$emit('introduce', {
        item: item.item,
        view: item.view
      })
    },
    removeOpen: function (tab) {
      if (tab.pid !== '') {
        let parent = this.$jquery('#' + tab.pid).parent()
        parent.removeClass('open')
      }
    },
    addOpen: function (tab) {
      let parent = this.$jquery('#' + tab.id).parent()
      if (!parent.hasClass('open')) {
        parent.addClass('open')
      }
    }
  }
}
</script>

<style scoped>

</style>
