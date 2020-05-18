const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    request.send('/busi/queryBusi',{},'GET',function(res){
      console.log(res);
      that.setData({
        business:res.data.data
      })
    })
  },
  createBusi:function(e){
    console.log('createBusi',e)
    var data = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../busiEdit/busiEdit?operationType='+data.type+'&busiId='+data.index,
    })
  },
  delete:function(e){
    console.log('删除业务',e);
    // request.send('/busi/delete',{busiId:e.detail})
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
    var that=this;
    request.send('/busi/queryBusi',{},'GET',function(res){
      console.log(res);
      that.setData({
        business:res.data.data
      })
    })
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