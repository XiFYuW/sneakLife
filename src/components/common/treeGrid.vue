<template>
  <div>
    <div class="panel panel-default">
      <div class="panel-heading" v-if="head">{{head}}</div>
      <div class="panel-body"></div>
      <div class="btn-group" role="group" id="toolbars">
        <button class="btn btn-default" v-bind:class="item.text" v-bind:key="item.text" v-bind:type="item.type"
                v-for="item in opera.sb" v-on:click="selectMe(item.code, item.text, item.url)">
          <span class="glyphicon" v-bind:class="item.icon" aria-hidden="true"></span> {{item.text}}
        </button>
      </div>
      <table id="treeGrid"></table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tree-grid',
  data () {
    return {
      btnUrl: ''
    }
  },
  props: {
    /**
     * 功能按钮
     */
    opera: {
      type: Object,
      required: true
    },
    /**
     * 标题头
     */
    head: {
      type: String,
      required: false
    },
    /***
     * 数据表格操作列
     */
    handle: {
      type: Object,
      required: false
    },
    /**
     * 操作按钮的动作
     */
    operaClick: {
      type: Object,
      required: false
    }
  },
  methods: {
    selectMe: function (code, text, url) {
      this.btnUrl = url
      this.$utils.setUrl(url)
      this.operaClick.selectClickMe(code, 'table', this.$jquery, text, this.opera.in)
    }
  },
  watch: {
    opera: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.opera = newVal
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
