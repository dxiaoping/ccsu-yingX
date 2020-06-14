//index.js
//获取应用实例
const app = getApp()
const request = require('../../utils/request.js')
var wayIndex = -1;
var school_area = '';
var grade = '';
// 当联想词数量较多，使列表高度超过340rpx，那设置style的height属性为340rpx，小于340rpx的不设置height，由联想词列表自身填充
// 结合上面wxml的<scroll-view>
// 语音组件
var arrayHeight = 0;
var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()
var realTimeClData = null;
Page({
  data: {
    voiceInput: '',
    voiceOutput: '',
    src: '',
    inputValue: '', //点击结果项之后替换到文本框的值 
    searchMap: null,
    adapterSource: ["weixin", "wechat", "android", "Android", "IOS", "java", "javascript", "微信小程序", "微信公众号", "微信开发者工具"], //本地匹配源
    bindSource: [], //绑定到页面的数据，根据用户输入动态变化
    hideScroll: true,
    secondConfirm:false
  },
  onLoad: function () {
    this.init()
  },

  menuClick: function (e) {
    var menuId = e.currentTarget.id;
    // console.log(e);
    // console.log(menuId);
    var url = '';
    switch (menuId) {
      case 'xxjj':
        url = '/pages/collegeIntroduc/college/college';
        console.log('执行点击学校简介的操作');
        break;
      case 'dbjj':
        console.log('执行点击地标简介的操作');
        url = '../addressList/addressList'
        break;
      case 'laboratory':
        console.log('执行点击实验室的操作');
        url = '../laboratoryList/laboratoryList'
        break;
      case 'association':
        url = '../associationList/associationList'
        break;
      case 'rxbd':
        url = '/pages/rxbd/rxbd?id=1';
        break;
      case 'schoolLife':
        url = '/pages/rxbd/rxbd?id=2';
        break;
    }
    wx.navigateTo({
      url: url
    })
  },
  //当键盘输入时，触发input事件
  bindinput: function (e) {
    //用户实时输入值
    var prefix = e.detail.value
    //匹配的结果
    var newSource = []
    if (prefix != "") {
      // 对于数组array进行遍历，功能函数中的参数 `e`就是遍历时的数组元素值。
      this.data.adapterSource.forEach(function (e) {
        // 用户输入的字符串如果在数组中某个元素中出现，将该元素存到newSource中
        if (e.indexOf(prefix) != -1) {
          console.log(e);
          newSource.push(e)
        }
      })
    };
    // 如果匹配结果存在，那么将其返回，相反则返回空数组
    if (newSource.length != 0) {
      this.setData({
        // 匹配结果存在，显示自动联想词下拉列表
        hideScroll: false,
        bindSource: newSource,
        arrayHeight: newSource.length * 71
      })
    } else {
      this.setData({
        // 匹配无结果，不现实下拉列表
        hideScroll: true,
        bindSource: []
      })
    }
  },

  // 用户点击选择某个联想字符串时，获取该联想词，并清空提醒联想词数组
  itemtap: function (e) {
    console.log('选中词汇', e)
    var keyWord = e.target.id;
    var class1 = this.data.searchMap.get(keyWord);
    var url = '';
    switch (class1) {
      case 'business':
        url = '../busiDetail/busiDetail?busiName=' + keyWord;
        break;
      case 'address':
        url = '../addressDetail/addressDetail?addrName=' + keyWord;
        break;
      case 'college':
        url = '../collegeDetail/collegeDetail?collegeName=' + keyWord;
        break;
      case 'laboratory':
        url = '../laboratoryDetail/laboratoryDetail?laboratoryName=' + keyWord;
        break;
      case 'speciality':
        url = '../specialityDetail/specialityDetail?addrName=' + keyWord;
        break;
    }
    wx.navigateTo({
      url: url,
    })
    this.setData({
      // .id在wxml中被赋值为{{item}}，即当前遍历的元素值
      inputValue: e.target.id,
      // 当用户选择某个联想词，隐藏下拉列表
      hideScroll: true,
      bindSource: []
    })
  },
  search: function (res) {
    console.log(res)
  },
  /**语音模块 */

  endStreamRecord: function () {
    console.log('结束录音', this.data.voiceTimer);
      // clearInterval(realTimeClData);
      wx.hideLoading()
      // wx.hideToast();
      manager.stop();
      var that = this;
      const data = {
        str:this.data.voiceInput,
        secondConfirm:this.data.secondConfirm
      }
      request.send('/base/voice', data ,'GET', function (res) {
        console.log("获取关键词列表",res);
        var keyList = res.data.data;
        if (!that.data.secondConfirm) {
          that.translateTextAction("为你检索到以下关键词，请进行二次确认");  
        }
        
        that.setData({
          voiceInput:keyList[0]+","+keyList[1]+","+keyList[2]+"",
          secondConfirm:!that.data.secondConfirm
        })
      });
  },
  streamRecord: function () {
    // realTimeClData = setInterval(this.endStreamRecord, 1000);
    console.log('开始录音');
    manager.start({
      // duration: 60000,
      lang: 'zh_CN'
    })
    wx.showLoading({
      title: '聆听中......',
      // icon: 'none',
      // duration: 60000
    })
  },
  init: function () {
    var that = this;
    request.send('/base/querySearchKey', {}, 'GET', function (res) {
      var map = new Map();
      var search = res.data.data;
      var arr = [];
      console.log("获取关键词列表", res.data.data)
      for (var index = 0; index < search.length; index++) {
        map.set(search[index].keyWord, search[index].class1)
        arr[index] = search[index].keyWord;
        console.log("search对象：", search[index])
      }
      that.setData({
        adapterSource: arr,
        searchMap: map
      })
      console.log("关键词对象", that.data.searchMap)
      console.log("关键词数组", that.data.adapterSource)
    })

    //有新的识别内容返回，则会调用此事件
    manager.onStart = function (res) {
      console.log('开始录音识别：', res);
    }
   
   
    manager.onRecognize = (res) => {
      console.log('onRecognize', res);
      let text = res.result;
      this.setData({
        voiceInput: text,
      })
     text = res.result;
    }
    // 识别结束事件
    manager.onStop = (res) => {
      // 输入音频
      let text = res.result
      console.log('text取值',text)
      if (text == '') {
        // text = '什么都没有听到，请大声一点';
        text = '如何去图书馆';
        // 用户没有说话，可以做一下提示处理...
        // return
      }

      // 请问您是否要找

      // request.send('/busi/queryOne', {
      //   busiName: '体检'
      // }, 'GET', function (res) {
      //   that.setData({
      //     busi: res.data.data
      //   })
      //   console.log('获取音频内容', res.data.data)
      //   // 获取到用户语音

      that.setData({
        voiceInput: text,
        // voiceOutput: that.data.busi.solution,
      })
      //   // console.log('获取音频内容', that.data.busi.solution)
      //   that.translateTextAction()
      // })

      // 得到完整识别内容就可以去翻译了

    }
  },
  // 文字转语音
  translateTextAction: function (text) {
    var that = this;
    var content = this.data.voiceOutput;
    console.log('请求外获取音频内容', this.data.voiceOutput)
    var content = "携带好自己的身份证原件";
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: text,
      success: function (res) {
        console.log(res);
        console.log("succ tts", res.filename);
        that.setData({
          src: res.filename
        })
        that.yuyinPlay();
      },
      fail: function (res) {
        console.log("fail tts", res)
      }
    })
  },

  yuyinPlay: function (e) {
    console.log('文字转语音', this.data.src)
    if (this.data.src == '') {
      console.log(暂无语音);
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址
    this.innerAudioContext.play(); //播放音频
  },
  // // // // // // // // // // // // // // // // // // // // // // 
  onReady(e) {
    //创建内部 audio 上下文 InnerAudioContext 对象。
    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError(function (res) {
      console.log(res);
      wx.showToast({
        title: '语音播放失败',
        icon: 'none',
      })
    })
  },
})