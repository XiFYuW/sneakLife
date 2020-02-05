<template>
  <iframe :src="src" :id="id" scrolling="auto" class="word"></iframe>
</template>

<script>
export default {
  name: 'iframe-sn',
  props: {
    src: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  mounted () {
    let ifm = document.getElementById(this.id)
    ifm.height = document.documentElement.clientHeight - 66
  }
}
</script>

<style scoped>
  .word{
    width: 100%;
    border: 1px solid black;
  }
</style>
