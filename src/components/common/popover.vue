<template>
  <div @mouseover="mouseOver" @mouseleave="mouseLeave">
    <!--<button id="popover" type="button" class="btn btn-default" >-->
      <!--Popover on 底部-->
    <!--</button>-->
  </div>
</template>

<script>
export default {
  name: 'popover',
  props: {
    content: {
      type: String,
      required: false
    }
  },
  methods: {
    mouseOver: function () {
      let o = this.$jquery('#popover')
      o.popover({
        placement: 'bottom',
        content: this.content,
        trigger: 'focus',
        delay: { 'show': 500, 'hide': 100 }
      })
      o.popover('show')
    },
    mouseLeave: function () {
      let o = this.$jquery('#popover')
      o.popover('destroy')
    }
  }
}
</script>

<style scoped>

</style>
