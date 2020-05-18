//js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //设置标记点
    markers: [{
      iconPath: "../../../images/me.png",
      id: 4,
      latitude: 26.686895887586804,
      longitude: 113.24107883029514,
      width: 30,
      height: 30,
      title:"家"
    }],
    //当前定位位置
    latitude: '',
    longitude: '',
    endLatitude: '',
    endLongitude:''
  },
  navigate() {
    ////使用微信内置地图查看标记点位置，并进行导航
    wx.openLocation({
      latitude: this.data.markers[0].latitude, //要去的纬度-地址
      longitude: this.data.markers[0].longitude, //要去的经度-地址
    })
  },
  onLoad(e) {
    console.log("进入地图导航业")
    console.log(e);
    //获取当前位置
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        console.log(res)
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
 wx.openLocation({
      latitude: this.data.markers[0].latitude, //要去的纬度-地址
      longitude: this.data.markers[0].longitude, //要去的经度-地址
    })
  },
})