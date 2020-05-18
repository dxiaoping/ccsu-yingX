const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    business: {},
    busiList: [],
    addressList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("进入业务详情页");
    console.log(options.busiId);
    var url = '/busi/queryBusi';
    var param = {};
    if (options.busiId == undefined) {
      param = {
        busiName: options.busiName
      };
    } else {
      param = {
        busiId: options.busiId
      };
    }
    var that = this;
    request.send(url, param, 'GET', function (res) {
      console.log("获取业务详情页面信息");
      console.log(res);
      that.setData({
        business: res.data.data.business,
        busiList: res.data.data.busiList,
        addressList: res.data.data.addressList
      });
      var addrCount = that.data.addressList.length;
      var index = 0;
      for (index; index < addrCount; index++) {
        that.setData({
          ['addressList[' + index + '].len']: (that.data.addressList[index].addrName.length + 1) * 18
        })
      }
      console.log('测试地址view的宽度');
      console.log(that.data.addressList);
    })

  },
  redirectTo: function (e) {
    console.log("关闭当前页面进入页面跳转函数");
    console.log(e.currentTarget.id);
    wx.redirectTo({
      url: '../busiDetail/busiDetail?busiId=' + e.currentTarget.id,
    })
  },
  gotoDestination: function (e) {
    var index = e.currentTarget.dataset.index;
    // var latitude = this.data.addressList[index].latitude; //要去的纬度-地址
    // var longitude = this.data.addressList[index].longitude; //要去的经度-地址
    // wx.navigateTo({
    //   url: '../map/mapView/mapView?latitude=' + latitude + '&longitude=' + longitude,
    // })
    wx.openLocation({
      latitude: this.data.addressList[index].latitude, //要去的纬度-地址
      longitude: this.data.addressList[index].longitude, //要去的经度-地址
    })
    // console.log(e.currentTarget.dataset.index);
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