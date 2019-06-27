<template>
  <div id="modal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="gridSystemModalLabel">Modal title</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="row" v-for="(item, index) in funIn" v-bind:key="index">
              <div class="col-lg-6" v-for="(items, cindex) in item" v-bind:key="cindex">
                <div class="input-group inputBottom">
                  <div class="form-group">
                    <label v-bind:for="items.field" class="control-label">{{items.textName}}</label>
                    <input type="text" class="form-control" v-bind:id="items.field" v-bind:value="items.value !== '' ? items.value : ''">
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" v-on:click="send()">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal-frame',
  props: {
    funIn: {
      type: Array,
      redirect: true
    },
    btnUrl: {
      type: String,
      redirect: true
    }
  },
  methods: {
    send: function () {
      let data = this.dispColumnsNull()
      if (this.$utils.getObjLength(data) > 0) {
        this.$central.send(this.$http, {me: this.btnUrl, data: data}).then(resp => {
          this.$utils.modalFrame.hide(this.$jquery)
          this.$central.toastr.success(resp.respMsg)
        })
      }
    },
    dispColumnsNull: function () {
      let $ = this.$jquery
      let data = {}
      for (let i = 0; i < this.funIn.length; i++) {
        let arr = this.funIn[i]
        for (let j = 0; j < arr.length; j++) {
          let v = $('#' + arr[j].field).val()
          if (v === '' || v === undefined) {
            this.$myToastr.warning(arr[j].textName + '不能为空')
            return {}
          }
          // 构造请求参数
          data = this.$utils.toObj(data, arr[j].field, v)
        }
      }
      return data
    }
  },
  watch: {
    funIn: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.funIn = newVal
        }
      }
    },
    btnUrl: {
      handler (newVal, oldVal) {
        if (newVal !== oldVal) {
          this.btnUrl = newVal
        }
      }
    },
    deep: true
  }
}
</script>

<style scoped>
</style>
