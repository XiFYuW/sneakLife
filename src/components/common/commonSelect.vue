<template>
  <div class="form-group mba">
    <span class="input-group-addon" v-if="isSpan">{{selectCol.textName}}</span>
    <label class="control-label" v-else>{{selectCol.textName}}</label>
    <select v-bind:id="selectCol.id" class="selectpicker" multiple data-max-options="1" data-width="fit">
      <option v-for="item in templateData" :key="item.value" v-bind:data-content="item.dataContent" v-bind:value="item.value">
        {{item.name}}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'common-select',
  data () {
    return {
      templateData: []
    }
  },
  created () {
    // 页面渲染下拉列表
    if (!this.isMnh) {
      this.templateData = this.selectCol.data
      this.$utils.selects.init(this.$jquery, this.selectCol.id)
    }
  },
  mounted () {
    // 第一次
    this.initSelects()
  },
  updated () {
    // 第二次
    this.initSelects()
  },
  methods: {
    initSelects: function () {
      if (this.isMnh) {
        let obj = this.$jquery('#' + this.selectCol.id)
        this.templateData = this.selectCol[this.selectCol.field + 'SelectData']
        this.$utils.selects.init(this.$jquery, this.selectCol.id)
        let parent = obj.parent()
        parent.css({'display': 'inherit'})
      }
    }
  },
  props: {
    selectCol: {
      type: Object,
      required: true
    },
    isSpan: {
      type: Boolean,
      required: false
    },
    isMnh: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    selectCol: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.selectCol = newVal
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
