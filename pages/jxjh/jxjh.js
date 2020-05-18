const request = require('../../utils/request.js')
var cache = require('../../utils/cache.js')
Page({
  userInfo: {},
  data: {
    title: ['开设年度', '专业名称', '开课方向', '开课学期', '课程编号', '课程名称', '课程性质', '课程属性',
      '考核方式', '学分', '总学时', '周学时', '理论学时', '实践学时', '讲座学时', '开课单位', '课程类别'
    ],
    jxjh: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    cache.get('user', function (res) {
      var user = res.data;
      if (user != null) {
        that.setData({
          userInfo: res.data,
        })
      }
      console.log("用户信息", that.data.userInfo)
      var params = {
        speciality: that.data.userInfo.speciality
      };
      request.send('/base/queryJxjh', params, 'GET', function (res) {
        that.setData({
          jxjh: res.data.data
        })
      })
    })


  },

})