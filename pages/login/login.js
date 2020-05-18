var request = require('../../utils/request.js')
var cache = require('../../utils/cache.js')
// var util = require('../../utils/util.js')
Page({
  data: {
    userInfo: {},
    jwcAccountfocus: 0,
    passwordfocus: 0,
    bindtype: 'jwcAccountt',
    accountHit: '请输入账号',
    passwordHit: '请输入密码',
  },
  onLoad: function (options) {
    var title = ""
    var accountHit = ''
    var passwordHit = ''

    if (options.bindtype == 'netAccount') {
      title = "绑定校园网账号"
      accountHit = '请输入您的学号'
      passwordHit = '校园网上网密码'
    } else if (options.bindtype == 'libraryAccount') {
      title = "绑定图书馆账号"
      accountHit = '学号 或 11077+学号'
      passwordHit = '默认为0000或123456'
    } else {
      title = "绑定教务处账号"
      accountHit = '请输入您的学号'
      passwordHit = '请输入身份证后六位'
    }

    //设置页面标题
    wx.setNavigationBarTitle({
      title: title,
    })

    this.setData({
      bindtype: options.bindtype,
      accountHit: accountHit,
      passwordHit: passwordHit
    })
  },
  onShow: function () {

  },
  //点击绑定返回数据e
  bind: function (e) {
    console.log("点击登录，提交表单");
    console.log(e);
    var param = {
      account: e.detail.value.account.trim(),
      password: e.detail.value.password.trim(),
    }
    if (param.account == null || param.account == '' || param.password == null || param.password == '') {
      // util.hideLoading()
      return
    }
    request.send('/user/login', param, 'POST', function (res) {
      // console.log(res);
      if (res.data.code == 10012) {
        console.log("登录成功");
        cache.set('user', res.data.data);
        wx.showToast({
          title: '绑定成功',
          icon: 'success',
          duration: 1500
        })
        // 延迟1.5秒返回首页
        setTimeout(function () {
          wx.switchTab({
            url: '/pages/index/index',
          })
        }, 1500)
      }
    })
  },
  help: function () {
    wx.navigateTo({
      url: '/pages/help/help'
    })
  },
  onUnload: function () {
    cache.set('isToLogin',false);
  },
})