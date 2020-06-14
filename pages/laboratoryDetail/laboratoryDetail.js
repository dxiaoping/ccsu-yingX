const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laboratory: {
      name: '',
      organization: '',
      relatedPerson: '',
      contactInfo: '',
      description: '',
      address: '',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request.send('/laboratory/queryOne',{id:options.id},'GET',function(res){
      that.setData({
        laboratory:res.data.data
      })
      that.setData({
        'laboratory.relatedPerson': that.data.laboratory.relatedPerson.split('&hc').join('\n'),
        'laboratory.contactInfo': that.data.laboratory.contactInfo.split('&hc').join('\n'),
        'laboratory.description':that.data.laboratory.description.split('&hc').join('\n'),
        'laboratory.address': that.data.laboratory.address.split('&hc').join('\n'),
      })
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