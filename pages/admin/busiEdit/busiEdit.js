const request = require('../../../utils/request.js')

Page({
  data: {
    operationType: 'modify',
    business: {
      busiId: 0,
      busiClassId: 0,
      busiName: '',
      solution: '',
    },

    addrRefBean: [],
    busiRefBean: [],
    addrRefIdList: [],
    busiRefIdList: [],

    classIndex: 0,
    classList: [],
    addressList: [],
    businessList: [],
  },

  save: function (res) {
    console.log('获取业务表单', res);
    this.setData({
      'business.busiName': res.detail.value.name,
      'business.solution': res.detail.value.solution,
    })
    var classIndex = this.data.classIndex;
    var param = {
      business: this.data.business,
      relationBusi: this.data.busiRefIdList,
      relationAddr: this.data.addrRefIdList,
      optionType: this.data.operationType
    }
    request.send('/busi/save', param, 'POST', function (res) {
      console.log('保存业务信息', res);
      setTimeout(function () {
        wx.redirectTo({
          url: '../busiManage/busiManage',
        })
      }, 1000)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("busiOperation", options)
    this.initData(options);
  },
  createAddrRef: function (e) {
    console.log('createAddrRef', e);
    var addrRefIdList = this.data.addrRefIdList;
    let len = addrRefIdList.length
    var addrId = e.detail.id;
    this.setData({
      ['addrRefIdList[' + len + ']']: addrId,
    })
    var index = 0
    for (index; index < this.data.addressList.length; index++) {
      if (addrId == this.data.addressList[index].addrId) {
        break;
      }
    }
    this.setData({
      ['addrRefBean[' + len + ']']: this.data.addressList[index],
    })
    console.log('addrRefIdList', this.data.addrRefIdList);
  },
  createBusiRef: function (e) {
    console.log('createBusiRef', e);
    var busiRefIdList = this.data.busiRefIdList;
    let len = busiRefIdList.length
    var busiId = e.detail.id;
    this.setData({
      ['busiRefIdList[' + len + ']']: busiId
    })
    var index = 0
    for (index; index < this.data.businessList.length; index++) {
      if (busiId == this.data.businessList[index].busiId) {
        break;
      }
    }
    this.setData({
      ['busiRefBean[' + len + ']']: this.data.businessList[index]
    })

    console.log('busiRefIdList', this.data.busiRefIdList);
  },
  deleteBusiRef(e) {
    console.log('删除关系引用', e)
    var index = e.currentTarget.dataset.index;
    var busiRefBean = this.data.busiRefBean;
    var busiRefIdList = this.data.busiRefIdList;
    busiRefBean.splice(index, 1);
    busiRefIdList.splice(index, 1);
    this.setData({
      busiRefBean: busiRefBean,
      busiRefIdList: busiRefIdList,
    })
  },
  modifyClass(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var classIndex = e.detail.value;
    this.setData({
      classIndex: classIndex
    })
    this.setData({
      'business.busiClassId': this.data.classList[classIndex].busiClassId
    })
  },
  initData(options) {
    this.setData({
      operationType: options.operationType,
    })
    var that = this;
    var params = {};
    if (options.operationType == 'modify') {
      params = {
        busiId: options.busiId,
      }
    }
    request.send('/busi/operationPage', params, 'GET', function (res) {
      console.log("获取到修改页面初始化数据", res.data.data);
      let data = res.data.data;
      that.setData({
        classList: data.classList,
        addressList: data.addressList,
        businessList: data.businessList,
      })
      if (that.data.operationType == 'modify') {
        that.setData({
          business: data.business,
          addrRefBean: data.addrRefBean,
          busiRefBean: data.busiRefBean,
          busiRefIdList: data.busiRefIdList,
          addrRefIdList: data.addrRefIdList,
          classIndex: data.business.busiClassId - 1
        })
      }
     
      that.saveStrLen(that);
    })
  },
  saveStrLen: function (that) {
    var addrCount = that.data.addrRefBean.length;
    var index = 0;
    for (index; index < addrCount; index++) {
      that.setData({
        ['addrRefBean[' + index + '].len']: (that.data.addrRefBean[index].addrName.length + 1) * 18
      })
    }

    var addrAllCount = that.data.addressList.length;
    var index = 0;
    for (index; index < addrAllCount; index++) {
      that.setData({
        ['addressList[' + index + '].len']: (that.data.addressList[index].addrName.length + 1) * 18
      })
    }

    var busiCount = that.data.busiRefBean.length;
    var index = 0;
    for (index; index < busiCount; index++) {
      that.setData({
        ['busiRefBean[' + index + '].len']: (that.data.busiRefBean[index].busiName.length) * 18
      })
    }

    var busiAllCount = that.data.businessList.length;
    var index = 0;
    for (index; index < busiAllCount; index++) {
      that.setData({
        ['businessList[' + index + '].len']: (that.data.businessList[index].busiName.length) * 18
      })
    }
    console.log('addrRefBean长度测试', that.data.addrRefBean);
    console.log('busiRefBean长度测试', that.data.busiRefBean);
    console.log('businessList长度测试', that.data.businessList);
    console.log('addressList长度测试', that.data.addressList);
  }

})