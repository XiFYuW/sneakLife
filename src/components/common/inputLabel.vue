<template>
  <div class="form-group">
    <label class="control-label">{{inputLable.textName}}</label>
    <input type="text" class="form-control" :id="inputLable.id" :value="inputLable.value !== '' ? inputLable.value : ''">
  </div>
</template>

<script>
export default {
  name: 'input-label',
  props: {
    inputLable: {
      type: Object,
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
