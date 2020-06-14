// pages/admin/admin.js
const request = require('../../../utils/request.js')
const cache = require('../../../utils/cache.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenmodalput: true,
    secretKey_input: ''
  },
  //点击按钮痰喘指定的hiddenmodalput弹出框 
  modalinput: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮 
  cancel: function () {
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, 400)
    // this.setData({
    //   hiddenmodalput: true
    // });
  },
  //确认 
  confirm: function (e) {
    var key = e.detail.value.secret
    var params = {
      account: key,
      password: "",
    }
    var that = this;
    request.send('/user/check', params, 'POST', function (res) {

      console.log('管理员验证', res);
      if (res.data.code == 10021) {
        // 验证失败
        wx.showToast({
          title: '失败，请核对秘钥',
          icon: 'none',
          duration: 1500
        })
      } else {
        var secretKey = res.data.data.value;
        if (secretKey != null || secretKey != '') {
          cache.set('adminUser', secretKey);
          that.setData({
            hiddenmodalput: true,
            secretKey_input: ""
          })
        }
      }
    })

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  quitAdmin: function () {
    cache.remove('adminUser');
    setTimeout(function () {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }, 400)
  },

  menuClick: function (e) {
    var menuId = e.currentTarget.id;
    // console.log(e);
    // console.log(menuId);
    var url = '';
    switch (menuId) {
      case 'addr':
        url = '/pages/admin/addrManage/addrManage';
        console.log('执行点击地标管理的操作');
        break;
      case 'busi':
        url = '/pages/admin/busiManage/busiManage';
        break;
      case 'speciality':
        url = '/pages/admin/specialityManage/specialityManage';
        break;
      case 'association':
        url = '/pages/admin/associationManage/associationManage';
        break;
      case 'laboratory':
        url = '/pages/admin/laboratoryManage/laboratoryManage';
        break;
    }
    wx.navigateTo({
      url: url
    })
  },
  onShow: function () {
    var that = this;
    cache.get('adminUser', function (res) {
      var adminUser = res.data;
      if (adminUser != null) {
        that.setData({
          hiddenmodalput: true
        })
      } else {
        that.setData({
          hiddenmodalput: false,
        })
      }
      console.log(adminUser);
    })
  }
})