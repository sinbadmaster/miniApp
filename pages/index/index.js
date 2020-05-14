//index.js
//获取应用实例
const app = getApp()
const api = require('../../miniprogram_npm/apifm-wxapi/index')

Page({
  data: {
    SUCCESS_CODE: app.globalData.SUCCESS_CODE,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    banners: [
      { bgColor: '#45ec36d5' },
      { bgColor: '#36c1ecd5' },
      { bgColor: '#ec36ecd5'}
    ],
    searchGood: '',
    categoryList: [],
    goodList: [],
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    this.getBanners()
    this.getGoodList()
    this.getCategoryList()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  search(e) {
    console.log(this.data.searchGood)
    wx.showToast({
      title: '提示' + this.data.searchGood + '/' + e.detail.value
    })
  },
  getBanners() {
    api.banners({type: 'index'})
      .then(res => {
        const {code, data} = res
        if (code === this.data.SUCCESS_CODE) {
          this.setData({
            banners: data
          })
        }
      })
  },
  getCategoryList() {
    api.goodsCategory()
      .then(res => {
        const {code, data} = res
        if (code === this.data.SUCCESS_CODE) {
          this.setData({
            categoryList: data
          })
        }
      })
  },
  getGoodList() {
    api.goods({
      //recommendStatus: 1
    }).then(res => {
      const {code, data} = res
      if (code === this.data.SUCCESS_CODE) {
        this.setData({
          goodList: data
        })
      }
    })
  }
})
