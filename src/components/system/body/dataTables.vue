<template>
  <div class="panel panel-default">
    <div class="panel-heading" v-if="head">{{head.title}}</div>
    <div class="panel-body">
      <div class="btn-group" role="group">
        <button class="btn btn-default" v-bind:class="item.text" v-bind:key="item.text" v-bind:type="item.type"
                v-for="item in operation" v-on:click="selectMe(item.code, item.text)">{{item.text}}</button>
      </div>
    </div>
    <table class="table" id="table"></table>
  </div>
</template>
<script>
export default {
  name: 'data-tables',
  data () {
    return {
      operation: [],
      head: {}
    }
  },
  props: {
    dataUrl: {
      type: String,
      required: true
    }
  },
  mounted () {
    this.$http.get(this.dataUrl).then(response => {
      const body = this.$common.parse(response)
      this.operation = body.operation
      this.head = body.head
      this.$common.bootstrapTable('table', this.$jquery, body)
    })
  },
  methods: {
    selectMe: function (code, text) {
      this.$common.selectClickMe(code, 'table', this.$jquery, text)
    }
  }
}
</script>
