<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top" v-if="tabs !== undefined && tabs.length > 0">
      <div class="container">
        <div class="navbar-collapse collapse">
          <menu-child v-bind:tabs="tabs" v-bind:cla="'nav navbar-nav'" @introduce="getItem"></menu-child>
        </div>
      </div>
    </nav>
    <div>
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="getView" v-bind:item="item"></component>
      </transition>
    </div>
  </div>
</template>

<script>
const AsyncView = require('../../../common/common').AsyncView
export default {
  name: 'system-menu',
  data () {
    return {
      tabs: [],
      item: {},
      view: ''
    }
  },
  components: {
    'system-sql': () => AsyncView.lazyLoadViews(import('../body/sql/systemSql')),
    'system-job': () => AsyncView.lazyLoadViews(import('../body/job/systemJob')),
    'menu-child': () => AsyncView.lazyLoadViews(import('./menuChild')),
    'data-dictionary': () => AsyncView.lazyLoadViews(import('../body/dataDictionary/dataDictionary')),
    'type-dictionary': () => AsyncView.lazyLoadViews(import('../body/dataDictionary/typeDictionary')),
    'logical-log': () => AsyncView.lazyLoadViews(import('../body/log/logicalLog')),
    'access-log': () => AsyncView.lazyLoadViews(import('../body/log/accessLog')),
    'system-monitoring': () => AsyncView.lazyLoadViews(import('../body/systemMonitoring/systemMonitoring')),
    'role-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/roleConfig/roleConfig')),
    'user-role-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/userRoleConfig/userRoleConfig')),
    'role-function-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/roleFunctionConfig/roleFunctionConfig')),
    'function-button-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionButton/functionButtonConfig')),
    'function-columns-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionColumns/functionColumnsConfig')),
    'function-input-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionInput/functionInputConfig')),
    'function-bo-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionBo/functionBoConfig')),
    'system-function': () => AsyncView.lazyLoadViews(import('../body/systemFunction/systemFunction.vue'))
  },
  mounted: function () {
    // await this.$central.serverInit(this.$utils.http)
    this.$central.send(this.$utils.http, {me: 'getMenu', data: {}}).then(resp => {
      this.tabs = resp.respData
    })
  },
  methods: {
    getItem: function (item) {
      this.item = item.item
      this.view = item.view
    }
  },
  computed: {
    getView: function () {
      return this.view
    }
  }
}
</script>
<style scoped>
  body {
    min-height: 100%;
  }
  .navbar-static-top {
    margin-bottom: 10px;
  }
</style>
