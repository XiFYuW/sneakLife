<template>
  <div class="file-loading">
    <input :id="id" :name="id" type="file" multiple>
  </div>
</template>

<script>
export default {
  name: 'uploader',
  props: {
    option: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: false
    }
  },
  mounted () {
    this.$utils.fileInput.init(this.$jquery, this.id, this.option)
  }
}
</script>

<style >
  .krajee-default .file-thumb-progress .progress, .krajee-default .file-thumb-progress .progress-bar {
    height: 16px;
    font-family: Verdana, Helvetica, sans-serif;
    font-size: 9px;
  }
</style>
