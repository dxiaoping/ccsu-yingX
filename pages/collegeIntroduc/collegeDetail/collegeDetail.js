// pages/collegeIntroduc/collegeDetail/collegeDetail.js
const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    college: {},
    speciality: [{
        specialityName: "软件工程",
        developTarget: "培养目标",
        majorClass: "C语言基础案例教程、"
      },
      {
        specialityName: "计算机科学与技术",
        developTarget: "培养目标",
        majorClass: "C语言基础案例教程、python基础教程"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("进入学院详情页");
    let param = {
      collegeId: options.collegeId
    };
    var url = '/college/detail';
    // request.send(url,param,'GET',function(res){

    // })
    console.log(options);
    var that = this;
    request.send(url, param, 'GET', function (res) {
      // console.log(res);
      that.setData({
        college: res.data.data.college,
        speciality: res.data.data.specialityList
      })
    })
  },
  navigatorTo: function (e) {
    console.log("进入页面跳转函数");
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../speciality/speciality?specialityId=' + e.currentTarget.id,
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