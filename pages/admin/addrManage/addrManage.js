const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: [{
        addrId: 0,
        addrName: '致远楼',
        longitude: 113.2402,
        latitude: 26.6860,
        description: ''
      },
      {
        addrId: 0,
        addrName: '宁静楼',
        longitude: 113.2402,
        latitude: 26.6860,
        description: ''
      }
    ]
  },

  delete: function (e) {
    console.log('删除地址',e);
    var index=e.currentTarget.dataset.index;
    var id=e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该条记录',
      cancelColor: 'cancelColor',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          var address = that.data.address;
          address.splice(index,1);
          request.send('/addr/delete',{addrId:id},'GET',function(res){
            console.log('获取删除结果：',res);
            // if db删除成功 执行
            that.setData({
              address:address
            })
          })
        }
      }
    })
  },
  modify: function (e) {

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  createAddr: function (e) {
    console.log('修改或者创建地标',e)
    wx.navigateTo({
      url: '../../map/addMap/addMap?id='+e.currentTarget.dataset.id
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
    var that = this;
    request.send('/addr/queryAllAddr', {}, 'GET', function (res) {
      console.log(res);
      that.setData({
        address: res.data.data
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