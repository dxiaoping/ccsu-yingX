const request = require('../../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    association: [{
      name: '计数院新媒体',
      id: 1,
      organization: '计数院新媒体',
      relatedPerson: '计数院新媒体',
      contactInfo: '计数院新媒体',
      description: '计数院新媒体'
    }],
    isTimeDesc: true, //是否按时间排序
    dayRange: 0, //未来多少天的数据
    talkSchool: 0, //哪个学校
    recruitType: 1, //线上或线下
    //  导航数据  时间顺序
    organization: "组织机构",
    organizationDown: {
      organizationDown: [],
      organization: 1
    },
    isDisplayOrderChoice: false, //控制综合下拉框是否显示
    //  导航数据  查询范围
    timeRange: "部门",
    timeRangeDown: {
      timeRangeDown: ["组织部", "新媒体", "体育部", "主席团", "学习部", "外联部"],
      index: 0
    },
    isDisplayRangeChoice: false, //控制综合下拉框是否显示
    timeRangeColor: false,
    // 学校筛选
    school: "学校",
    schoolDown: {
      schoolDown: ["全部", "中南大学", "湖南大学"],
      index: 0
    },
    isDisplaySchoolChoice: false, //控制综合下拉框是否显示
    schoolColor: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    request.send('/base/queryConfig',{class1:'asso_organization'},'GET',function(res){
      console.log('获取组织列表',res);
      that.setData({
        "organizationDown.organizationDown":res.data.data,
      })
    })

    request.send('/association/queryByOrganization',{},'GET',function(res){
      console.log('获取协会列表',res);
      that.setData({
        association:res.data.data,
      })
    })
  },
  createAsso: function (e) {
    console.log('修改或者创建社团',e)
    wx.navigateTo({
      url: '../../admin/associationEdit/associationEdit?associationId='+e.currentTarget.dataset.id
    })
  },
  delete: function (e) {
    console.log('删除地址',e);
    var index=e.currentTarget.dataset.index;
    var id=e.currentTarget.dataset.id;
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除该条记录',
      cancelColor: 'cancelColor',
      cancelText: '取消',
      success: function (res) {
        if (res.confirm) {
          var association = that.data.association;
          association.splice(index,1);
          request.send('/association/delete',{assoId:id},'GET',function(res){
            console.log('获取删除结果：',res);
            // if db删除成功 执行
            that.setData({
              association:association
            })
          })
        }
      }
    })
  },
  // 导航条
  navigatorShow: function(e) { //导航下拉
    console.log("按下综合键");
    console.log(e);
    // if (this.data.isDisplayOrderChoice || this.data.isDisplayRangeChoice){
    if (e.currentTarget.id == "timeOrder") {
      this.setData({
        isDisplayOrderChoice: !this.data.isDisplayOrderChoice,
        isDisplayRangeChoice: false,
        isDisplaySchoolChoice: false
      })
    } else if (e.currentTarget.id == "timeRange") {
      this.setData({
        isDisplaySchoolChoice: false,
        isDisplayOrderChoice: false,
        isDisplayRangeChoice: !this.data.isDisplayRangeChoice
      })
    } else if (e.currentTarget.id == "school") {
      this.setData({
        isDisplaySchoolChoice: !this.data.isDisplaySchoolChoice,
        isDisplayOrderChoice: false,
        isDisplayRangeChoice: false
      })
    }
  },
  
  navigatorChoice: function(e) { //下拉选择子项
    console.log("通过组织筛选",e);
   
    if (this.data.isDisplayOrderChoice) {
      this.setData({
        organization: e.currentTarget.dataset.item.value,
        // "navigatorDown.navigator": e.currentTarget.dataset.index,
        isDisplayOrderChoice: false,
      });
      if (e.currentTarget.dataset.index == 0) {
        this.setData({
          isTimeDesc: false
        })
      } else {
        this.setData({
          isTimeDesc: true
        })
      }
    } else if (this.data.isDisplayRangeChoice) {
      this.setData({
        timeRange: e.currentTarget.dataset.item,
        "timerangeDown.index": e.currentTarget.dataset.index,
        isDisplayRangeChoice: false,
      });
    } else if (this.data.isDisplaySchoolChoice) {
      this.setData({
        school: e.currentTarget.dataset.item,
        "schoolDown.index": e.currentTarget.dataset.index,
        isDisplaySchoolChoice: false,
        talkSchool: this.data.school.index
      })
    }

    var that = this;
    request.send('/association/queryByOrganization',{organization:that.data.organization},'GET',function(res){
      that.setData({
        association:res.data.data,
      })
    })
  },
  handletouchtart: function(event) { //点击透明背景隐藏下拉
    console.log(event);
    console.log("点击空白退出筛选");
    this.setData({
      isDisplayOrderChoice: false
    })
  },
})