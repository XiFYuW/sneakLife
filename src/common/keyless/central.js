import JSEncrypt from 'jsencrypt/bin/jsencrypt'
const Base64 = require('js-base64').Base64
const CryptoJS = require('crypto-js')
// 服务初始化地址消息
// export const initUrl = 'http://192.168.6.134:9090/sneakLife-admin/common'
export const initUrl = 'http://127.0.0.1:8080/sneakLife-admin/heartBeat'
/**
 * 加解密，服务连接
 * @type {{rsa: null, setToastr: central.setToastr, publicKey: string, url: string, token: string, checkCode: central.checkCode, ajaxSetup: central.ajaxSetup, aesEncrypts: (function(*=): string), post: (function(*, *=, *=): Promise<any>), serverInit: central.serverInit, toastr: null, enParameter: (function(*=): *), send: (function(*=, *=): *)}}
 */
export const central = {
  // 服务请求地址
  url: '',
  // AES秘钥
  token: '',
  // 公钥
  publicKey: '',
  // RSA加密算法对象
  rsa: null,
  // toastr对象
  toastr: null,
  /**
   * 消息提示
   * @param toastr toastr对象
   */
  setToastr: function (toastr) {
    this.toastr = toastr
  },
  /**
   * 初始化服务
   * @param http axios对象
   * @returns {Promise<void>}
   */
  serverInit: async function (http) {
    let resp = await this.post(http, initUrl, {})
    this.init(resp.data.respData)
  },
  init: function (data) {
    this.url = Base64.decode(data.link)
    this.rsa = new JSEncrypt()
    this.publicKey = data.puk
    this.rsa.setPublicKey(this.publicKey)
    this.token = Base64.decode(data.ptk).substring(0, 16)
  },
  /**
   * 发送服务请求
   * @param http axios对象
   * @param parameter 请求参数
   * @returns {Promise<*>}
   */
  send: async function (http, parameter) {
    let resp = await this.post(http, this.url, {data: this.enParameter(parameter)}, parameter)
    return resp.data
  },
  /**
   * 加密参数
   * @param parameter 请求参数
   * @returns {*}
   */
  enParameter: function (parameter) {
    let ps = {
      data: this.aesEncrypts(JSON.stringify(parameter)),
      token: this.rsa.encryptLong(this.token)
    }
    let str = JSON.stringify(ps)
    return this.rsa.encryptLong(str)
  },
  /**
   * AES加密
   * @param word 原文
   * @returns {string}
   */
  aesEncrypts: function (word) {
    return CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(word), CryptoJS.enc.Utf8.parse(this.token), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString()
  },
  /**
   * 检测返回码
   * @param resp 响应对象
   * @returns {boolean}
   */
  checkCode: function (resp) {
    let ok = [2000, 5566, 7766, 4467, 4466, 2038]
    if (ok.indexOf(resp.respCode) < 0) {
      this.toastr.error(resp.respMsg)
      return false
    }
    return true
  },
  /**
   * post请求
   * @param http axios对象
   * @param url 请求地址
   * @param data 加密之后的请求数据
   * @param parameter 加密之前的请求数据
   * @returns {Promise<any>}
   */
  post: function (http, url, data, parameter) {
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
        if (this.checkCode(res.data)) {
          if (res.data.respCode === 2038) {
            this.init(res.data.respData)
            res = this.post(http, url, {data: this.enParameter(parameter)})
          }
          resolve(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
