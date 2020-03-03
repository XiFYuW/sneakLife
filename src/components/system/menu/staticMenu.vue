<template>
  <div class="btn-group z">
    <button type="button" class="btn btn-default dropdown-toggle x" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <img src="./../../../assets/logo.png" alt="..." class="y">
    </button>
    <ul class="dropdown-menu c">
      <li v-on:click="onLogOut"><a href="#">退出登陆</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'static-menu',
  methods: {
    onLogOut: function () {
      this.$central.send(this.$utils.http, {me: 'logOut', data: {}}).then(resp => {
        this.$central.vue.$emit('changeIsLogin')
      })
    }
  }
}
</script>

<style scoped>
  .x{
    border-radius: 50%;
    width: 53px;
    height: 50px;
    background-color: #f8f8f8;
    border: 0 #f8f8f8;
  }
  .y{
    width: 38px;
    position: absolute;
    top: 10px;
    left: 7px;
  }
  .z{
    position: absolute;
    right: 19px;
    top: 0;
  }
  .c{
    position: absolute;
    top: 100%;
    left: -106px;
  }
</style>
