//js
const request = require('../../../utils/request.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //当前定位位置
    addrId: 0,
    latitude: '',
    longitude: '',
    addrName: '',
    description: '',

    hiddenmodalput: true,
    //可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框 
    showModalStatus: false
  },
  addAddress() {
    wx.request({
      url: 'url',
      data: {},
      dataType: 'json',
      success: (res) => {
        console.log(res);
      }
    })
  },

  onLoad(e) {
    //获取当前位置
    console.log("添加或修改地址", e)
    var that = this;
    if (e.id == "undefined") {
      this.updateLocation();
    } else {
      request.send("/addr/queryOne", {
        addrId: e.id
      }, 'GET', function (res) {
        console.log('获取专业对象', res);
        that.setData({
          addrId: res.data.data.addrId,
          latitude: res.data.data.latitude,
          longitude: res.data.data.longitude,
          addrName: res.data.data.addrName,
          description: res.data.data.description
        })
      })
    }
  },
  updateLocation: function () {
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
  addAddress: function (e) {
    if (e.currentTarget.type == "add") {
      this.updateLocation();
    }
    var currentStatu = e.currentTarget.dataset.statu;
    console.log(e);
    this.util(currentStatu)
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例   
    var animation = wx.createAnimation({
      duration: 200, //动画时长  
      timingFunction: "linear", //线性  
      delay: 0 //0则不延迟  
    });

    // 第2步：这个动画实例赋给当前的动画实例  
    this.animation = animation;

    // 第3步：执行第一组动画  
    animation.opacity(0).rotateX(-100).step();

    // 第4步：导出动画对象赋给数据对象储存  
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画  
    setTimeout(function () {
      // 执行第二组动画  
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象  
      this.setData({
        animationData: animation
      })

      //关闭  
      if (currentStatu == "close") {
        this.setData({
          showModalStatus: false
        });
      }
    }.bind(this), 200)

    // 显示  
    if (currentStatu == "open") {
      this.setData({
        showModalStatus: true
      });
    }
  },
  submitform: function (e) {
    this.setData({
      showModalStatus: false,
      addrName: e.detail.value.name,
      description: e.detail.value.description
    });
    console.log(this.data);
    // var b = parseFloat(this.data.latitude).toFixed(7);
    // var latitude = b.substring(0,b.toString().length - 1);
    // var b = parseFloat(this.data.longitude).toFixed(7);
    // var longitude = b.substring(0,b.toString().length - 1);
    let param = {
      addrId: this.data.addrId,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      addrName: this.data.addrName,
      description: this.data.description
    }
    request.send('/addr/save', param, 'POST',function(res){
      
    });
  }
})