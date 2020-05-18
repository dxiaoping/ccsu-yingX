const request = require('../../utils/request.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    busi:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url='/busi/queryBusiByClass';
    var parma={
      classId:1
    };
    var that = this;
    request.send(url,parma,'GET',function(res){
      that.setData({
          busi:res.data.data
      }),
      console.log('获取到业务数据');
      console.log(res);
    })
  },
 navigatorTo: function (e) {
    console.log("进入页面跳转函数");
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../busiDetail/busiDetail?busiId=' + e.currentTarget.id,
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