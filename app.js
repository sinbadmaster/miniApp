//app.js
const CONFIG = require('config.js')
const WXAPI = require('./miniprogram_npm/apifm-wxapi/index')
console.log(CONFIG)

App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    WXAPI.init(CONFIG.subDomain)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    // 监听网络变化情况
    wx.onNetworkStatusChange((result) => {
      if (!result.isConnected) {
        this.globalData.isConnected = false
        wx.showToast({
          title: '网络连接失败，请检查你的网络连接',
          icon: 'loading',
          duration: 3000
        })
      }
    })
  },
  globalData: {
    userInfo: null,
    SUCCESS_CODE: CONFIG.SUCCESS_CODE,
    NONE_DATA: CONFIG.NONE_DATA
  }
})