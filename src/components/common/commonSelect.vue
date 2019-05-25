<template>
  <div>
    <select class="form-control selectpicker" title="请选择省份" multiple data-max-options="1">
      <option data-content="<span class='label label-success'>广东省</span>">广东省</option>
      <option data-content="<span class='label label-info'>广西省</span>">广西省</option>
      <option data-content="<span class='label label-warning'>福建省</span>">福建省</option>
      <option data-content="<span class='label label-danger'>山东省</span>">山东省</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'common-select',
  mounted () {
    this.$jquery('.selectpicker').selectpicker()
  }
}
</script>

<style scoped>

</style>
