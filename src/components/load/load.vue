<template>
  <div class="container">
      <div class="loading">组件加载中。。。</div>
  </div>
</template>

<script>
export default {
  name: 'load'
}
</script>

<style scoped>
  .loading {
    width: 193px;
    height: 56px;
    position: absolute;
    top: 40%;
    left: 43%;
    line-height: 56px;
    color: #fff;
    padding-left: 60px;
    font-size: 15px;
    background: #32941a url(/src/assets/loading.gif) no-repeat 10px 50%;
    opacity: 0.7;
    z-index: 9999;
    -moz-border-radius: 20px;
    -webkit-border-radius: 20px;
    border-radius: 20px;
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
  }
</style>
