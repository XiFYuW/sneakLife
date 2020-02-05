<template>
  <iframe-sn :src="xxlJobPath" :id="id"></iframe-sn>
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
  components: {
    'iframe-sn': () => import('../../../common/iframeSn')
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
  }
}
</script>

<style scoped>
</style>
