<template>
  <div class="form-group" >
    <span class="input-group-addon" v-if="isSpan">{{inputLable.textName}}</span>
    <label class="control-label" v-else>{{inputLable.textName}}</label>
    <input :type="inputLable.type" class="form-control" :id="inputLable.id" :value="inputLable.value !== '' ? inputLable.value : ''">
  </div>
</template>

<script>
export default {
  name: 'input-label',
  props: {
    inputLable: {
      type: Object,
      required: false
    },
    isSpan: {
      type: Boolean,
      required: false
    }
  },
  watch: {
    inputLable: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.inputLable = newVal
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
