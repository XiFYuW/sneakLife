<template>
  <div class="input-group">
    <span class="input-group-addon" id="sizing-addon2">日期</span>
    <input type="text" value="2018-12-12 12:12:12" class="form-control form_datetime" placeholder="请输入日期" aria-describedby="sizing-addon2">
  </div>
</template>

<script>
import {datetimepicker} from '../../common/datetimepicker'

export default {
  name: 'date-time-picker',
  mounted () {
    datetimepicker.init(this.$jquery)
  }
}
</script>

<style scoped>

</style>
