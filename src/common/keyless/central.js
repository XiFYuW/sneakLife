import JSEncrypt from 'jsencrypt/bin/jsencrypt'
const Base64 = require('js-base64').Base64
const CryptoJS = require('crypto-js')
// 服务初始化地址消息
// export const initUrl = 'http://192.168.6.134:9090/sneakLife-admin/common'
export const initUrl = 'http://127.0.0.1:8080/sneakLife-admin/heartBeat'
/**
 * 加解密，服务连接
 */
export const central = {
  // 服务请求地址
  url: '',
  // AES秘钥
  token: '',
  // RSA加密算法对象
  rsa: null,
  time: null,
  // toastr对象
  toastr: null,
  vue: null,
  cookie: null,
  setVue: function (vue) {
    this.vue = vue
  },
  setCookie: function (cookie) {
    this.cookie = cookie
  },
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
   * @param parameter 请求参数
   * @returns {Promise<void>}
   */
  serverInit: async function (http, parameter) {
    let resp = await this.post(http, initUrl, {data: JSON.stringify(parameter)})
    this.init(resp.data.respData)
  },
  init: function (data) {
    this.setParameter(data)
    this.localStorageSave(data)
  },
  setParameter: function (data) {
    this.url = Base64.decode(data.link)
    this.rsa = new JSEncrypt()
    this.rsa.setPublicKey(data.puk)
    this.token = Base64.decode(data.ptk)
    this.time = data.time
  },
  localStorageSave: function (data) {
    let j = this.aesEncrypts(JSON.stringify(data))
    sessionStorage.setItem('sk', j)
    sessionStorage.setItem('to', data.ptk)
    this.cookie.set('sk', j)
    this.cookie.set('to', data.ptk)
  },
  /**
   * 保证每一次打开新的标签页都需要记录
   * @param callback 不为空的回调方法
   * @param callback1 为空的回调方法
   */
  getLocalStorageItem: function (callback, callback1) {
    let sk = sessionStorage.getItem('sk')
    let to = sessionStorage.getItem('to')
    if (sk !== null && to !== null) {
      callback()
    } else {
      callback1()
    }
  },
  /**
   * 保证每一次重新加载标签页不都需要记录
   * @param callback 不为空的回调方法
   * @param callback1 为空的回调方法
   */
  getCookieStorageItem: function (callback, callback1) {
    let sk = this.cookie.get('sk')
    let to = this.cookie.get('to')
    if (sk !== null && to !== null) {
      let skAes = this.aesDecrypt(sk, to)
      let skJson = JSON.parse(skAes)
      callback(skJson)
    } else {
      callback1()
    }
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
  sendGet: async function (http, parameter) {
    let resp = await this.get(http, this.url, {data: this.enParameter(parameter)}, parameter)
    return resp.data
  },
  /**
   * 加密参数
   * @param parameter 请求参数
   * @returns {*}
   */
  enParameter: function (parameter) {
    let now = new Date().getTime() / 1000
    // 适用多开标签页
    if (this.time !== null && this.time < now) {
      this.getCookieStorageItem((skJson) => {
        this.init(skJson)
      }, () => {})
    }
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
  aesDecrypt: function (word, token) {
    let decrypt = CryptoJS.AES.decrypt(word, CryptoJS.enc.Utf8.parse(Base64.decode(token)), {
      mode: CryptoJS.mode.ECB, // CBC
      padding: CryptoJS.pad.Pkcs7 })
    return decrypt.toString(CryptoJS.enc.Utf8)
  },
  /**
   * 检测返回码
   * @param resp 响应对象
   * @returns {boolean}
   */
  checkCode: function (resp) {
    let success = [2000, 5566, 7766, 4467, 4466, 2038, 3346, 3348]
    let waiting = [3879, 1893, 1894, 3347, 4367]
    let login = [3345]
    if (login.indexOf(resp.respCode) >= 0) {
      this.vue.$emit('changeIsLogin')
      this.toastr.warning(resp.respMsg)
      return false
    }
    if (waiting.indexOf(resp.respCode) >= 0) {
      this.toastr.warning(resp.respMsg)
      return false
    }
    if (success.indexOf(resp.respCode) < 0) {
      if (resp.respMsg) {
        this.toastr.error(resp.respMsg)
      }
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
        // 只适用于 POST,PUT,PATCH，允许在向服务器发送前，修改请求数据。后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }]
        // 在传递给 then/catch 前，允许修改响应数据
        // transformResponse: [function (data) {
        //   return data
        // }]
      }).then((res) => {
        if (this.checkCode(res.data)) {
          if (res.data.respCode === 2038) {
            this.init(res.data.respData)
            res = this.post(http, url, {data: this.enParameter(parameter)}, parameter)
          }
          resolve(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },
  get: function (http, url, data, parameter) {
    return new Promise((resolve, reject) => {
      http({
        method: 'get',
        timeout: 150000,
        url: url,
        params: {
          data: data
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        withCredentials: true,
        responseType: 'arraybuffer'
      }).then((res) => {
        try {
          let enc = new TextDecoder('utf-8')
          res = JSON.parse(enc.decode(new Uint8Array(res.data)))
        } catch (err) {
          const filename = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
          const link = document.createElement('a')
          const blob = new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' })
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
        if (this.checkCode(res)) {
          if (res.respCode === 2038) {
            this.init(res.respData)
            res = this.get(http, url, {data: this.enParameter(parameter)}, parameter)
          }
          resolve(res)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  }
}
