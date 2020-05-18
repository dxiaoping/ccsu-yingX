const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    speciality:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("修改专业页面初始值",options)
    var that = this;
    request.send('/speciality/queryOne',{specialityId:options.specialityId},'GET',function(res){
      that.setData({
        speciality:res.data.data
      })
    })
  },
  save:function(e){
    console.log('保存专业修改',e)
    this.setData({
      'speciality.description':e.detail.value.description,
    })
    var speciality = this.data.speciality;
    var params = {
      specialityId:speciality.specialityId,
      description:speciality.description
    }
    request.send('/speciality/save',params,'POST',function(res){
      // 弹出修改成功
    })
  }
})