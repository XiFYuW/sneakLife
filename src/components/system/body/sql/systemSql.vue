<template>
  <iframe-sn :src="serverPath" :id="id"></iframe-sn>
</template>

<script>
export default {
  name: 'system-sql',
  components: {
    'iframe-sn': () => import('../../../common/iframeSn')
  },
  data () {
    return {
      id: 'system-sql',
      serverPath: ''
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
      this.serverPath = resp.respData.serverPath
    })
  }
}
</script>

<style scoped>
</style>
