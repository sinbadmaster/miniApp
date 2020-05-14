const app = getApp()
const api = require("../../miniprogram_npm/apifm-wxapi/index")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    SUCCESS_CODE: app.globalData.SUCCESS_CODE,
    NONE_DATA: app.globalData.NONE_DATA,
    selectedCategory: {},
    categoryList: [],
    goodList: [],
    scrollTop: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCategoryList()
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
  pushGoodCar(e) {
    const good = e.target.dataset.good
    wx.setTabBarBadge({
      index: 1,
      text: '1',
    })
  },
  selectCategory(e) {
    const category = e.target.dataset.category
    if (category && category.id !== this.data.selectedCategory.id) {
      this.setData({
        scrollTop: 0,
        selectedCategory: category
      })
      this.getGoodList()
    }
  },
  getCategoryList() {
    wx.showLoading({
      title: '加载中…',
    })
    api.goodsCategory()
      .then(res => {
        wx.hideLoading()
        const {code, data} = res
        if (code === this.data.SUCCESS_CODE) {
          const categoryList = data.filter(item => item.level === 1)
          this.setData({
            selectedCategory: categoryList[0],
            categoryList: categoryList
          })
          this.getGoodList()
        }
      })
  },
  getGoodList() {
    const { selectedCategory, SUCCESS_CODE, NONE_DATA } = this.data
    wx.showLoading({
      title: '加载中…',
    })
    api.goods({
      categoryId: selectedCategory.id,
      pageNo: 1,
      pageSize: 10000
    }).then(res => {
      wx.hideLoading()
      const {code, data} = res
      if (code === NONE_DATA) {
        this.setData({
          goodList: []
        })
        return
      }
      if (code === SUCCESS_CODE) {
        this.setData({
          goodList: data
        })
      }
      console.log(data)
    })
  }
})