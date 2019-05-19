<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li v-for="tab in tabs" v-bind:key="tab.tab" v-on:click="onTabs(tab.type, tab.dataUrl)" v-bind:class="{ 'active': tab.type === view }">
              <a v-bind:href="tab.href" v-bind:name="tab.name">{{ tab.tab }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div>
      <transition name="component-fade" mode="out-in">
        <component v-bind:is="getView" v-bind:dataUrl="dataUrl"></component>
      </transition>
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
      dataUrl: ''
    }
  },
  components: {
    'data-dictionary': () => import('../body/dataDictionary/dataDictionary'),
    'system-monitoring': () => import('../body/systemMonitoring/systemMonitoring')
  },
  created: function () {
    this.apply()
  },
  methods: {
    onTabs: function (tab, dataUrl) {
      this.view = tab
      this.dataUrl = dataUrl
    },
    apply: function () {
      this.$http.get('/static/json/system/system-static-tab.json').then(response => {
        this.tabs = this.$common.parse(response)
      })
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
