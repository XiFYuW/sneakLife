<template>
  <div class="input-group">
    <span class="input-group-addon" style="left: -11px;">{{picker.textName}}</span>
    <input v-if="!isRange" type="text" v-bind:id="picker.id" v-bind:class="picker.id" v-bind:value="picker.value"
           class="form-control form_datetime dateTimePicker" placeholder="请输入日期" aria-describedby="sizing-addon2">
    <div style="display: flex" v-if="isRange">
      <input type="text" v-bind:id="picker.id + start" v-bind:class="[picker.id + start, picker.id]" v-bind:value="picker.value"
             class="form-control form_datetime dateTimePicker startTimePicker" placeholder="请输入开始日期" aria-describedby="sizing-addon2">
      <span class="spanLeft">-</span>
      <span class="spanCenter">-</span>
      <span class="spanRight">-</span>
      <input type="text" v-bind:id="picker.id + end" v-bind:class="[picker.id + end, picker.id]" v-bind:value="picker.value"
             class="form-control form_datetime dateTimePicker endTimePicker" placeholder="请输入结束日期" aria-describedby="sizing-addon2">
    </div>
  </div>
</template>

<script>
import {datetimepicker} from '../../common/datetimepicker'

export default {
  name: 'date-time-picker',
  data () {
    return {
      start: 'start',
      end: 'end'
    }
  },
  mounted () {
    if (this.isRange) {
      datetimepicker.init(this.$jquery, this.picker.id + this.start)
      datetimepicker.init(this.$jquery, this.picker.id + this.end)
    } else {
      datetimepicker.init(this.$jquery, this.picker.id)
    }
  },
  props: {
    picker: {
      type: Object,
      required: true
    },
    isRange: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
  .dateTimePicker{
    width: 206px;
  }
  .startTimePicker{
    border-right: none;
    width: 156px;
    left: -6px;
  }
  .endTimePicker{
    left: -20px;
    border-left: none;
    width: 158px;
    text-align: right;
  }
  .spanLeft{
    margin-top: 5px;
    left: -15px;
    position: relative;
    z-index: 3;
  }
  .spanRight{
    margin-top: 5px;
    right: 11px;
    position: relative;
    z-index: 4;
  }
  .spanCenter{
    margin-top: 5px;
    left: -13px;
    position: relative;
    z-index: 5;
  }
</style>
