<template>
  <iframe-sn :src="docSwaggerPath" :id="id"></iframe-sn>
</template>

<script>
export default {
  name: 'doc-swagger',
  data () {
    return {
      id: 'doc-swagger',
      docSwaggerPath: ''
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
      this.docSwaggerPath = resp.respData.docSwaggerPath
    })
  }
}
</script>

<style scoped>

</style>
