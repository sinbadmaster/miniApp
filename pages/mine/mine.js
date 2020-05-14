// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    memberInfos: [
      { count: 0, text: '余额' },
      { count: 0, text: '冻结' },
      { count: 0, text: '积分' },
      { count: 0, text: '成长值' },
    ],
    orderOperates: [
      { url: '/', text: '待付款', icon: '/img/order/topay.png' },
      { url: '/', text: '待发货', icon: '/img/order/fahuo.png' },
      { url: '/', text: '待收货', icon: '/img/order/shouhuo.png' },
      { url: '/', text: '待评价', icon: '/img/order/pj.png' },
      { url: '/', text: '售后', icon: '/img/order/shouhou.png' },
    ],
    mineOrder: { text: '我的订单', url: '' },
    navList: [
      { text: '优惠买单', url: '' },
      { text: '资金明细', url: '',  hasStrongBorder: true},
      { text: '成为分销商', url: '', hasStrongBorder: true},
      { text: '申请发票', url: '' },
      { text: '发票记录', url: '', hasStrongBorder: true },
      { text: '收货地址', url: '' },
      { text: '领券中心', url: '' },
      { text: '我的收藏', url: '' },
    ],
    userInfo: {
      avatarUrl: '/img/nologin.png'
    },
    login: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.checkLogin()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tapCell(e) {
    console.log(e.detail)
  },
  userInfo(e) {
    console.log(e)
    this.setUserInfo(e.detail.userInfo)
  },
  setUserInfo(info) {
    console.log(info)
    this.setData({
      userInfo: info,
      login: true
    })
  },
  checkLogin() {
    const _this = this
    wx.checkSession({
      success (e) {
        wx.getUserInfo({
          success(e) {
            _this.setUserInfo(e.userInfo)
          }
        })
      },
      fail () {
        // session_key 已经失效，需要重新执行登录流程
        wx.login({
          success(res) {
            console.log(res)
            _this.checkLogin()
          }
        }) //重新登录
      }
    })
  }
})