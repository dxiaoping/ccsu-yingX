const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    association:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request.send('/association/queryAll',{},'GET',function(res){
      that.setData({
        association:res.data.data
      })
      console.log('协会列表',that.data.association)
    })
  },
  navigatorTo: function (e) {
    console.log("进入页面跳转函数");
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../associationDetail/associationDetail?id=' + e.currentTarget.id,
    })
  },
})