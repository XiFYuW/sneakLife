<template>
  <data-table v-bind:dataUrl="dataUrl" v-bind:operaClick="operaClick"></data-table>
</template>

<script>
import {operaClick} from '../../../../../common/common'

export default {
  name: 'role-config',
  data () {
    return {
      operaClick: operaClick
    }
  },
  components: {
    'data-table': () => import('../../../../common/dataTable')
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
