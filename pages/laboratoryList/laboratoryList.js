const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laboratory:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init:function(){
    var that = this;
    request.send('/laboratory/queryAll',{},'GET',function(res){
      that.setData({
        laboratory:res.data.data
      })
      console.log('实验室列表',that.data.laboratory)
    })
  },
  navigatorTo: function (e) {
    console.log("进入页面跳转函数");
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../laboratoryDetail/laboratoryDetail?id=' + e.currentTarget.id,
    })
  },
})