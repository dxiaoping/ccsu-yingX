// pages/voice/voice.js

var plugin = requirePlugin("WechatSI")

let manager = plugin.getRecordRecognitionManager()


Page({

  data: {
    currentText: '语音识别到',
    src: ''
  },

  onLoad: function (options) {
    this.initRecord()
  },
  /**语音模块 */
  streamRecord: function () {
    console.log('开始录音');
    manager.start({
      duration: 60000,
      lang: 'zh_CN'
    })
    wx.showToast({
      title: '正在聆听中......',
      icon: 'none',
      duration: 60000
    })
  },
  endStreamRecord: function () {
    console.log('结束录音');
    wx.hideToast();
    manager.stop()
  },
  initRecord: function () {
    //有新的识别内容返回，则会调用此事件
    manager.onStart = function (res) {
      console.log('开始录音识别：', res.result);
    }

    manager.onRecognize = (res) => {
      let text = res.result
      console.log(res)
      this.setData({
        currentText: text,
      })
    }

    // 识别结束事件
    manager.onStop = (res) => {
      let text = res.result
      if (text == '') {
        text = '什么都没有听到，请大声一点';
          // 用户没有说话，可以做一下提示处理...
          // return
      }
      this.setData({
        currentText: text,
        translateText: '',
      })
      // 得到完整识别内容就可以去翻译了
      this.translateTextAction()
    }
  },

  // 文字转语音
  translateTextAction: function () {
    
    var that = this;
    var content = this.data.currentText;
    plugin.textToSpeech({
      lang: "zh_CN",
      tts: true,
      content: content,
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
    if (this.data.src == '') {
      console.log(暂无语音);
      return;
    }
    this.innerAudioContext.src = this.data.src //设置音频地址
    this.innerAudioContext.play(); //播放音频
  },
  /**初次渲染页面 */
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