const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    association: {
      // id: '',
      // name: '院学生会-组织部',
      // relatedPerson: '段晓平、王小莉',
      // contactInfo: '手机号：15574902291；QQ:1693547683;邮箱:15574902291@163.com',
      // description: '',
      // operationType: ''
    },
    optionType:'modify',
    classIndex: 0,
    classList: [
      {
        classId:0,
        className:'计数院'
      },
      {
        classId:1,
        className:'校学生会'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('社团编辑初始化', options);
    var that = this;
    if (options.associationId != "undefined") {
      var params = {
        associationId: options.associationId,
      }
      request.send('/association/queryOne', params, 'GET', function (res) {
        that.setData({
          association: res.data.data
        })
      })
    }else{
      that.setData({
        optionType:'add'
      })
    }
  },
  save: function (e) {
    console.log('保存社团信息', e);

    var params = {
      association:{
        id: this.data.association.id,
        name: e.detail.value.name,
        relatedPerson: e.detail.value.relatedPerson,
        contactInfo: e.detail.value.contactInfo,
        description: e.detail.value.description,
      },
      
      optionType:this.data.optionType
    };
    request.send('/association/save', params, 'POST', function (res) {

    })
  },
  modifyClass(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var classIndex = e.detail.value;
    this.setData({
      classIndex: classIndex
    })
    this.setData({
      'business.busiClassId': this.data.classList[classIndex].classId
    })
  },
})