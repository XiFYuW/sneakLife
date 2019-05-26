<template>
    <select class="selectpicker" title="请选择省份" multiple data-max-options="1" data-width="fit">
      <option data-content="<span class='label label-success'>广东省</span>">广东省</option>
      <option data-content="<span class='label label-info'>广西省</span>">广西省</option>
      <option data-content="<span class='label label-warning'>福建省</span>">福建省</option>
      <option data-content="<span class='label label-danger'>山东省</span>">山东省</option>
    </select>
</template>

<script>
import {selects} from '../../common/selects'
export default {
  name: 'common-select',
  mounted () {
    selects.init(this.$jquery)
  }
}
</script>

<style scoped>

</style>
