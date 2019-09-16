<template>
  <div class="container">
      <div class="loading">加载中。。。</div>
  </div>
</template>

<script>
export default {
  name: 'load'
}
</script>

<style scoped>
  .loading {
    width: 160px;
    height: 56px;
    position: absolute;
    top: 50%;
    left: 50%;
    line-height: 56px;
    color: #fff;
    padding-left: 60px;
    font-size: 15px;
    background: #342020 url(/static/images/loading.gif) no-repeat 10px 50%;
    opacity: 0.7;
    z-index: 9999;
    -moz-border-radius: 20px;
    -webkit-border-radius: 20px;
    border-radius: 20px;
    filter: progid:DXImageTransform.Microsoft.Alpha(opacity=70);
  }
</style>
