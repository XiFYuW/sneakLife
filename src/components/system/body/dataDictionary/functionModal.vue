<template>
  <div id="modal" class="modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
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
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'function-modal',
  props: {
    funIn: {
      type: Array,
      redirect: true
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
    deep: true
  }
}
</script>

<style scoped>
</style>
