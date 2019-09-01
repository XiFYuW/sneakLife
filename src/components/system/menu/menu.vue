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
    'menu-child': () => import('./menuChild'),
    'data-dictionary': () => import('../body/dataDictionary/dataDictionary'),
    'system-monitoring': () => import('../body/systemMonitoring/systemMonitoring'),
    'function-config': () => import('../body/authorityControl/functionConfig/functionConfig'),
    'role-config': () => import('../body/authorityControl/roleConfig/roleConfig'),
    'user-role-config': () => import('../body/authorityControl/userRoleConfig/userRoleConfig'),
    'role-function-config': () => import('../body/authorityControl/roleFunctionConfig/roleFunctionConfig'),
    'function-button-config': () => import('../body/business/businessFunction/functionButton/functionButtonConfig'),
    'function-columns-config': () => import('../body/business/businessFunction/functionColumns/functionColumnsConfig'),
    'function-input-config': () => import('../body/business/businessFunction/functionInput/functionInputConfig')
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
  .div-button{
    background-color: #0000;
  }
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for below version 2.1.8 */ {
    opacity: 0;
  }
</style>
