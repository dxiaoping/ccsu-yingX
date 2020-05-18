const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laboratory: [
      {
        name:'实验室名称1',
        organization:'',
        related_person:'',
        contact_info:'',
        description:'',
        address:''
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request.send('/laboratory/queryAll',{},'GET',function(res){
      console.log('获取实验室列表',res);
      that.setData({
        laboratory:res.data.data,
      })
    })
  },
  createLabora: function (e) {
    console.log('修改或者创建实验室',e)
    wx.navigateTo({
      url: '../../admin/laboratoryEdit/laboratoryEdit?laboratoryId='+e.currentTarget.dataset.id
    })
  },
})