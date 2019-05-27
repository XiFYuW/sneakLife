<template>
  <div>
    <select class="selectpicker" multiple data-max-options="1" data-width="fit">
      <option v-for="item in dataSelect.data" :key="item.value" v-bind:data-content="item.dataContent" v-bind:value="item.value">
        {{item.name}}
      </option>
    </select>
  </div>
</template>

<script>
import {selects} from '../../common/selects'
export default {
  name: 'common-select',
  mounted () {
    selects.init(this.$jquery)
  },
  props: {
    dataSelect: {
      type: Object,
      required: true
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
