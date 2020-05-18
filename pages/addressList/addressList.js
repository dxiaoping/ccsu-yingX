// pages/addressList/addressList.js
const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();

  },

  init:function(){
    var that = this;
    request.send('/addr/queryAllAddr',{},'GET',function(res){
      that.setData({
        address:res.data.data
      })
      console.log('获取地址列表',that.data.address)
    })
  },
  navigatorTo: function (e) {
    console.log("进入页面跳转函数");
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../addressDetail/addressDetail?addrId=' + e.currentTarget.id,
    })
  },
})