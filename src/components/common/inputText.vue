<template>
  <div class="input-group">
    <span class="input-group-addon" id="sizing-addon1">@</span>
    <input type="text" class="form-control inputTest" placeholder="Username" aria-describedby="sizing-addon1">
  </div>
</template>

<script>
export default {
  name: 'input-text'
}
</script>

<style scoped>
  .inputTest{
    width: 250px;
  }
</style>
