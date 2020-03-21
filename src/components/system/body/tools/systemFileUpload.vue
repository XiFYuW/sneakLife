<template>
  <div class="file-loading">
    <input :id="uploaderFile" type="file" multiple>
  </div>
</template>

<script>
const AsyncView = require('../../../../common/common').AsyncView
export default {
  name: 'system-file-upload',
  data () {
    return {
      uploaderFile: 'systemFileUpload',
      option: {}
    }
  },
  components: {
    'uploader': () => AsyncView.lazyLoadViews(import('./../../../common/uploader'))
  },
  mounted () {
    this.$utils.fileInput.option.uploadUrl = this.$central.tUrl + 'fileUpload'
    this.$utils.fileInput.option.uploadExtraData = (previewId, index) => {
      let parameter = {me: 'fileUpload', data: {id: 1}}
      return {data: this.$central.enParameter(parameter)}
    }
    this.$utils.fileInput.option.uploadAsync = true
    this.option = this.$utils.fileInput.option
    let obj = this.$jquery('#' + this.uploaderFile)
    this.$utils.fileInput.init(obj, this.option)
    obj.on('fileuploaded', (event, data, previewId, index) => {
      let resp = data.response
      console.log(resp)
      // if (!this.$central.checkCode(resp)) {
      //   return {}
      // }
      // if (resp.respCode === 2038) {
      //   this.$central.init(resp.respData)
      //   this.$jquery('div[id="' + previewId + '"] .kv-file-upload').click()
      // }
    })
    // obj.on('filebatchuploadsuccess', (event, data) => {
    //   debugger
    //   let resp = data.response
    //   if (!this.$central.checkCode(resp)) {
    //     return {}
    //   }
    //   if (resp.respCode === 2038) {
    //     this.$central.init(resp.respData)
    //     // let sp = this.$jquery('.file-input a.fileinput-upload span')
    //     obj.fileinput('upload')
    //     // sp.on('click', function () {
    //     //   obj.fileinput('upload')
    //     // })
    //     // sp.click()
    //   }
    // })
  }
}
</script>

<style>
  .krajee-default .file-thumb-progress .progress, .krajee-default .file-thumb-progress .progress-bar {
    height: 16px;
    font-family: Verdana, Helvetica, sans-serif;
    font-size: 9px;
  }
</style>
