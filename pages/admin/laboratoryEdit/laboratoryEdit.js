const request = require('../../../utils/request.js');

Page({
  data: {
    laboratory: {
      id: 0,
      name:"",
      relatedPerson: "",
      contactInfo:"",
      description: "",
      organization: "",
    },
    optionType: 'modify',
    classIndex: 0,
    classList: [{
        classId: 0,
        className: '计数院'
      },
      {
        classId: 1,
        className: '校学生会'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('社团编辑初始化', options);
    var that = this;
    if (options.laboratoryId != "undefined") {
      var params = {
        id: options.laboratoryId,
      }
      request.send('/laboratory/queryOne', params, 'GET', function (res) {
        that.setData({
          laboratory: res.data.data
        })
      })
    } else {
      that.setData({
        optionType: 'add'
      })
    }
  },
  save: function (e) {
    console.log('保存实验室信息', e);
    console.log('DB实验室信息', this.data.laboratory);
    var params = {
      laboratory: {
        id: this.data.laboratory.id,
        name: e.detail.value.name,
        relatedPerson: e.detail.value.relatedPerson,
        contactInfo: e.detail.value.contactInfo,
        description: e.detail.value.description,
        organization: e.detail.value.organization,
        address: e.detail.value.address,
      },

      optionType: this.data.optionType
    };
    request.send('/laboratory/save', params, 'POST', function (res) {

    })
  },
})