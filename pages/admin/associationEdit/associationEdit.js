const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    association: {
    },
    optionType:'modify',
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
    request.send('/base/queryConfig',{class1:'asso_organization'},'GET',function(res){
      that.setData({
          classList:res.data.data,
         
      })
      that.setData({
        'association.organization': that.data.classList[0].value
      })
      console.log('社团所属组织',res);
    })

    if (options.associationId != "undefined") {
      var params = {
        id: options.associationId,
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
        organization:this.data.association.organization,
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
      classIndex:classIndex,
      'association.organization': this.data.classList[classIndex].value
    })
  },
})