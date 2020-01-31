<template>
  <iframe :src="xxlJobPath" :id="id" scrolling="auto" class="word"></iframe>
</template>

<script>
export default {
  name: 'system-job',
  data () {
    return {
      id: 'system-job',
      xxlJobPath: ''
    }
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  created () {
    this.$central.send(this.$utils.http, {me: this.item.pageUrl, data: {menuId: this.item.id}}).then(resp => {
      this.xxlJobPath = resp.respData.xxlJobPath
    })
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
