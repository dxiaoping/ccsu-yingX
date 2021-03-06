const request = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    laboratory:[],
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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init();
  },
  init:function(){
    var that = this;
    request.send('/base/queryConfig',{class1:'laboratory_organization'},'GET',function(res){
      console.log('获取组织列表',res);
      that.setData({
        "organizationDown.organizationDown":res.data.data,
      })
    })
    request.send('/laboratory/queryByOrganization',{},'GET',function(res){
      that.setData({
        laboratory:res.data.data
      })
      console.log('实验室列表',that.data.laboratory)
    })
  },
  navigatorTo: function (e) {
    console.log("进入页面跳转函数");
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: '../laboratoryDetail/laboratoryDetail?id=' + e.currentTarget.id,
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
    request.send('/laboratory/queryByOrganization',{organization:that.data.organization},'GET',function(res){
      that.setData({
        laboratory:res.data.data,
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