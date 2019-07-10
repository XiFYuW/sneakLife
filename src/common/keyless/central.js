import JSEncrypt from 'jsencrypt/bin/jsencrypt'
const Base64 = require('js-base64').Base64
const CryptoJS = require('crypto-js')
export const initUrl = 'http://127.0.0.1:8080/sneakLife_admin/common'
export const central = {
  url: '',
  token: '',
  publicKey: '',
  rsa: null,
  toastr: null,
  setToastr: function (toastr) {
    this.toastr = toastr
  },
  ajaxSetup: function ($) {
    $.ajaxSetup({
      crossDomain: true,
      xhrFields: {
        withCredentials: true
      }
    })
  },
  serverInit: async function (http) {
    let resp = await this.post(http, initUrl, {})
    this.url = Base64.decode(resp.data.respData.link)
    this.rsa = new JSEncrypt()
    this.publicKey = resp.data.respData.puk
    this.rsa.setPublicKey(this.publicKey)
    this.token = Base64.decode(resp.data.respData.ptk).substring(0, 16)
  },
  send: async function (http, parameter) {
    let resp = await this.post(http, this.url, {data: this.enParameter(parameter)})
    return resp.data
  },
  sendTimeOut: function () {
    if (this.rsa !== null || this.rsa !== undefined) {
      return true
    }
    setTimeout(() => {
      this.sendTimeOut()
    }, 900)
  },
  enParameter: function (parameter) {
    let ps = {
      data: this.aesEncrypts(JSON.stringify(parameter)),
      token: this.rsa.encryptLong(this.token)
    }
    let str = JSON.stringify(ps)
    return this.rsa.encryptLong(str)
  },
  aesEncrypts: function (word) {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(word), CryptoJS.enc.Utf8.parse(this.token), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
  },
  post: function (http, url, data) {
    return new Promise((resolve, reject) => {
      http({
        method: 'post',
        timeout: 150000,
        url: url,
        data: data,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
      }).then((res) => {
        let respCode = res.data.respCode
        let ok = [2000, 5566, 7766, 4467, 4466]
        if (ok.indexOf(respCode) < 0) {
          this.toastr.error(res.data.respMsg)
        } else {
          resolve(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
