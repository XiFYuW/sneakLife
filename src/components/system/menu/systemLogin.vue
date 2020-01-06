<template>
  <div v-on:keyup.enter="onLogin()">
    <form class="form-login" autocomplete="off">
      <h3 class="form-login-heading">Sneak Life 验证</h3>
      <label for="em" class="sr-only">User name</label>
      <div id="em">
        <div class="has-feedback">
          <input type="text" id="un" class="form-control form-input" placeholder="用户名" required="" autofocus="">
          <span class="form-control-feedback form-left-span glyphicon glyphicon-user"></span>
        </div>
      </div>
      <label for="pass" class="sr-only">Password</label>
      <div id="pass">
        <div class="has-feedback">
          <input :type="passType" id="pw" class="form-control form-input" placeholder="密码"  required="" >
          <span class="form-control-feedback form-left-span glyphicon glyphicon-lock" ></span>
          <span class="form-control-feedback form-right-span glyphicon" :class="classPass" v-on:click="isPassShow()"></span>
        </div>
      </div>
      <!--<div class="checkbox"> v-on:keyup.enter.native="onLogin()" -->
        <!--<label>-->
          <!--<input type="checkbox" value="remember-me"> Remember me-->
        <!--</label>-->
      <!--</div>-->
      <button class="btn btn-lg btn-primary btn-block" type="button" v-on:click="onLogin()">登录</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'system-login',
  data () {
    return {
      open: false,
      close: true,
      passType: 'password',
      classPass: {
        'glyphicon-eye-close': true,
        'glyphicon-eye-open': false
      }
    }
  },
  methods: {
    onLogin: async function () {
      let $ = this.$jquery
      let parameter = {
        un: $('#' + 'un').val(),
        pw: $('#' + 'pw').val()
      }
      await this.$central.serverInit(this.$utils.http, parameter)
      this.$emit('introduce', {
        isLogin: true
      })
    },
    isPassShow: function () {
      this.open = !this.open
      this.close = !this.close
      this.classPass = {
        'glyphicon-eye-close': this.close && !this.open,
        'glyphicon-eye-open': !this.close && this.open
      }
      if (!this.close && this.open) {
        this.passType = 'text'
      } else {
        this.passType = 'password'
      }
    }
  },
  props: {
    isLogin: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
  .form-login {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }
  .form-login .form-login-heading,
  .form-login .checkbox {
    margin-bottom: 10px;
  }
  .form-login .checkbox {
    font-weight: normal;
  }
  .form-login .form-control {
    position: relative;
    height: auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 10px;
    font-size: 16px;
  }
  .form-login .form-control:focus {
    z-index: 2;
  }

  input[type="text"],
  input[type="password"],
  .form-login .form-input{
    margin-bottom: 10px;
    padding-left: 34px;
  }
  .form-left-span{
    left: 5px;
    top: 5px;
  }
  .form-right-span{
    right: 5px;
    top: 5px;
    cursor: pointer;
    position: absolute;
    z-index: 300;
    pointer-events: auto;
  }
</style>
