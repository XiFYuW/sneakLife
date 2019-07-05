<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li v-for="tab in tabs" v-bind:key="tab.tab" v-on:click="onTabs(tab)"
                v-bind:class="{ 'active': tab.type === view && tab.type !== '','dropdown': tab.son.length > 0  }">
              <a v-bind:class="{'dropdown-toggle': tab.son.length > 0}" v-bind:data-toggle="tab.son.length > 0 ? 'dropdown' : ''"
                 href="javascript:void(0)">
                {{ tab.tab }} <span class="caret" v-if="tab.son.length > 0"></span>
              </a>
              <ul class="dropdown-menu" v-if="tab.son.length > 0">
                <li v-for="s in tab.son" v-bind:key="s.tab" v-on:click="onTabs(s)"
                    v-bind:class="{ 'active': s.type === view && s.type !== '' }">
                  <a href="javascript:void(0)">{{ s.tab }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      <!--<transition name="component-fade" mode="out-in">-->
      <component v-bind:is="getView" v-bind:item="item"></component>
      <!--</transition>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'system-menu',
  data () {
    return {
      view: '',
      tabs: [],
      item: {}
    }
  },
  components: {
    'data-dictionary': () => import('../body/dataDictionary/dataDictionary'),
    'system-monitoring': () => import('../body/systemMonitoring/systemMonitoring'),
    'function-config': () => import('../body/authorityControl/functionConfig/functionConfig'),
    'role-config': () => import('../body/authorityControl/roleConfig/roleConfig'),
    'user-role-config': () => import('../body/authorityControl/userRoleConfig/userRoleConfig'),
    'role-function-config': () => import('../body/authorityControl/roleFunctionConfig/roleFunctionConfig')
  },
  mounted: function () {
    this.$utils.central.send(this.$utils.http, {me: 'getMenu', data: {}}).then(resp => {
      this.tabs = resp.respData
    })
  },
  methods: {
    onTabs: function (tab) {
      if (!tab.type) {
        return
      }
      this.view = tab.type
      this.item = tab
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
