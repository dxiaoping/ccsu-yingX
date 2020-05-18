var request = require('../../utils/request.js')
var cache = require('../../utils/cache.js')

// var util = require('../../utils/util.js')
Page({
  data: {
    notShowUser: true,
    notShowLogin: false,
    message: '用户未登录',
    userInfo: {},
    jwcAccountfocus: 0,
    passwordfocus: 0,
    bindtype: 'jwcAccountt',
    accountHit: '请输入账号',
    passwordHit: '请输入密码',
  },
  onLoad: function (options) {
    console.log("我的信息")
    console.log(options)
    this.setData({
      // isToLogin:options.
    })
  },
  jxjh: function (e) {
    wx.navigateTo({
      url: '../jxjh/jxjh',
    })
  },
  //点击绑定返回数据e
  bind: function (e) {

  },
  help: function () {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  onShow: function (res) {
    var that = this;
    cache.get('user', function (res) {
      var user = res.data;
      if (user != null) {
        that.setData({
          userInfo: res.data,
          notShowLogin: true,
          notShowUser: false
        })
      } else {
        that.setData({
          notShowLogin: false,
          notShowUser: true
        })
      }
      console.log(user);
    })
  },
  exitLogin: function (e) {
    cache.remove('user');
    this.setData({
      notShowLogin: true,
      notShowUser: false
    })
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  navigate: function (e) {
    wx.navigateTo({
      url: '../login/login',
    })
  }
})