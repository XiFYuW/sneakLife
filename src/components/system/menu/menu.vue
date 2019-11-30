<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top">
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
    'menu-child': () => AsyncView.lazyLoadViews(import('./menuChild')),
    'data-dictionary': () => AsyncView.lazyLoadViews(import('../body/dataDictionary/dataDictionary')),
    'system-monitoring': () => AsyncView.lazyLoadViews(import('../body/systemMonitoring/systemMonitoring')),
    'function-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionConfig/functionConfig')),
    'role-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/roleConfig/roleConfig')),
    'user-role-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/userRoleConfig/userRoleConfig')),
    'role-function-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/roleFunctionConfig/roleFunctionConfig')),
    'function-button-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionButton/functionButtonConfig')),
    'function-columns-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionColumns/functionColumnsConfig')),
    'function-input-config': () => AsyncView.lazyLoadViews(import('../body/authorityControl/functionInput/functionInputConfig')),
    'system-function': () => AsyncView.lazyLoadViews(import('../body/systemFunction/systemFunction.vue'))
  },
  mounted: async function () {
    await this.$central.serverInit(this.$utils.http)
    this.$utils.central.send(this.$utils.http, {me: 'getMenu', data: {}}).then(resp => {
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
