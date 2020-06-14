const request = require('../../../utils/request.js');

Page({
  data: {
    laboratory: {
      id: 0,
      name:"",
      relatedPerson: "",
      contactInfo:"",
      description: "",
      organization: "erger",
    },
    optionType: 'modify',
    classIndex: 0,
    classList: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('社团编辑初始化', options);
    var that = this;
    request.send('/base/queryConfig',{class1:'laboratory_organization'},'GET',function(res){
      that.setData({
          classList:res.data.data,
      })
      that.setData({
        'laboratory.organization': that.data.classList[0].value,
      })
    })
    if (options.laboratoryId != "undefined") {
      var params = {
        id: options.laboratoryId,
      }
      request.send('/laboratory/queryOne', params, 'GET', function (res) {
        that.setData({
          laboratory: res.data.data
        })
        that.setData({
          'laboratory.relatedPerson': that.data.laboratory.relatedPerson.split('&hc').join('\n'),
          'laboratory.contactInfo': that.data.laboratory.contactInfo.split('&hc').join('\n'),
          'laboratory.description':that.data.laboratory.description.split('&hc').join('\n'),
          'laboratory.address': that.data.laboratory.address.split('&hc').join('\n'),
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
    console.log('DB实验室信息', this.data.laboratory.organization);
    var params = {
      laboratory:{
        id: this.data.laboratory.id,
        name: e.detail.value.name,
        organization:this.data.laboratory.organization,
        relatedPerson: e.detail.value.relatedPerson.split('\n').join('&hc'),
        contactInfo: e.detail.value.contactInfo.split('\n').join('&hc'),
        description: e.detail.value.description.split('\n').join('&hc'),
        address: e.detail.value.address.split('\n').join('&hc'),
      },
      optionType: this.data.optionType
    };
    request.send('/laboratory/save', params, 'POST', function (res) {
      setTimeout(function(){
        wx.navigateBack({
          complete: (res) => {},
        })
      },800)
        
    })
  },
  modifyClass(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var classIndex = e.detail.value;
    this.setData({
      classIndex:classIndex,
      'laboratory.organization': this.data.classList[classIndex].value
    })
  },
})