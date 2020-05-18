// pages/admin/admin.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
  }
})