<template>
  <div class="form-group">
    <span class="input-group-addon" v-if="isSpan">{{dataSelect.textName}}</span>
    <label class="control-label" v-else>{{dataSelect.textName}}</label>
    <select v-bind:id="dataSelect.id" class="selectpicker form-control" multiple data-max-options="1" data-width="fit">
      <option v-for="item in templateData" :key="item.value" v-bind:data-content="item.dataContent" v-bind:value="item.value">
        {{item.name}}
      </option>
    </select>
  </div>
</template>

<script>
import {selects} from '../../common/selects'
export default {
  name: 'common-select',
  data () {
    return {
      templateData: []
    }
  },
  updated () {
    let obj = this.$jquery('#' + this.dataSelect.id)
    obj.val('')
    this.templateData = this.dataSelect[this.dataSelect.field + 'SelectData']
    selects.init(this.$jquery, this.dataSelect.id)
    let parent = obj.parent()
    parent.css({'display': 'inherit'})
  },
  props: {
    dataSelect: {
      type: Object,
      required: true
    },
    isSpan: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    dataSelect: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.dataSelect = newVal
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
