<template>
  <div>
    <nav class="navbar navbar-default navbar-static-top">
      <div class="container">
        <div class="navbar-collapse collapse">
          <ul class="nav navbar-nav">
            <li v-for="tab in tabs" v-bind:key="tab.tab" v-on:click="onTabs(tab.tab, tab.name)" v-bind:class="{ 'active': tab.tab === view }">
              <a v-bind:href="tab.href" v-bind:name="tab.name">{{ tab.tab }}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="container">
      <component v-bind:is="getView" v-bind:operation="operation" v-bind:head="head"></component>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import {common} from '@/common/common'
import $ from 'jquery'
Vue.prototype.$http = axios
export default {
  name: 'system-menu',
  data () {
    return {
      view: '',
      operation: [],
      tabs: null,
      head: {}
    }
  },
  created: function () {
    this.apply()
  },
  methods: {
    onTabs: function (tab, name) {
      this.view = tab
      this.init('table', '/static/json/system/system-static-tables.json')
    },
    apply: function () {
      this.$http({
        method: 'get',
        url: '/static/json/system/system-static-tab.json',
        dataType: 'json',
        crossDomain: true,
        cache: false }).then(response => {
        this.tabs = common.parse(response)
        this.tabs.forEach(v => {
          this.$http.get(v.name).then(response1 => {
            const html = common.parse(response1)
            Vue.component(v.tab, {
              props: ['operation', 'head'],
              template: html,
              methods: {
                selectMe: function (code, text) {
                  console.log('selectMe : ', code)
                  common.selectClickMe(code, 'table', $, text)
                }
              }
            })
          })
        })
      })
    },
    init: function (el, url) {
      this.$http.get(url).then(response1 => {
        const body = common.parse(response1)
        this.operation = body.operation
        this.head = body.head
        common.bootstrapTable(el, $, body)
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
</style>
