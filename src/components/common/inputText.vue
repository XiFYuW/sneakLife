<template>
  <div class="input-group">
    <span class="input-group-addon">{{inputText.textName}}</span>
    <input type="text" :id="inputText.id" :value="inputText.value !== '' ? inputText.value : ''"
           class="form-control inputTest" :placeholder="inputText.textName" aria-describedby="sizing-addon1">
  </div>
</template>

<script>
export default {
  name: 'input-text',
  props: {
    inputText: {
      type: Object,
      required: false
    }
  },
  watch: {
    inputText: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.inputText = newVal
        }
      }
    },
    immediate: true,
    deep: true
  }
}
</script>

<style scoped>
  .inputTest{
    width: 214px;
  }
</style>
