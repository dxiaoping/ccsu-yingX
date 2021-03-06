const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addr: {
      addrName: '',
      description: '',
      latitude: '',
      longitude: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request.send('/addr/queryOne', {
      addrId: options.addrId
    }, 'GET', function (res) {
      that.setData({
        addr: res.data.data
      })
    })
  },

  _navigation:function(){
    wx.openLocation({
      latitude: this.data.addr.latitude,
      longitude: this.data.addr.longitude,
    })
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

  }
})