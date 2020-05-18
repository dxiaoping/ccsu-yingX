/* 公共showTotast  loading 方法 */
const util = require('util.js');
const app = getApp();
const host = app.getHostUrl();
module.exports = {
  send: send
}

function send(url,params,method,callBack){
  util.print("开始调用请求"+url);
  console.log("开始调用请求");
  wx.request({
    url:host + url,
    data: params,
    header: {},
    method: method,
    dataType: 'json',
    responseType: 'text',
    success: function(res) {
      util.print("success");
      console.log(host + url,res);
    },
    fail: function(res) {},
    complete: function(res) {
     callBack(res);
    },
  })
}


// const send = ({
//   url,params,success,method = "post"
// }) => {
//   wx.showLoading({
//     title: '加载中',
//   });
//   // let host = 'https://www.ttl317.top';//正式域名
//   let server = 'http://localhost';//测试域名
//   let sessionId = wx.getStorageSync("sid"),
//     that = this;
//   if (sessionId != "" && sessionId != null) {
//     var header = { 'content-type': 'application/x-www-form-urlencoded', 'Cookie': 'sid=' + sessionId }
//   } else {
//     var header = { 'content-type': 'application/x-www-form-urlencoded' }
//   }
//   return new Promise(function (resolve, reject) {
//     wx.request({
//       url: server + url,
//       method: method,
//       data: params,
//       header: header,
//       success: (res) => {
//         wx.hideLoading();
//         if (sessionId == "" || sessionId == null) {
//           wx.setStorageSync('sid', res.data.info.sessionId)//  如果本地没有就说明第一次请求 把返回的 sessionId 存入本地
//         }
//         if (res.data.result === 'error' || res['statusCode'] !== 200) {
//           wx.showToast({
//             title: res.data.msg || '请求出错',
//             icon: 'none',
//             duration: 2000,
//             mask: true
//           })
//         }
//         resolve(res.data)
//       },
//       fail: function (res) {
//         wx.hideLoading();
//         wx.showToast({
//           title: res.data.msg || '',
//           icon: 'none',
//           duration: 2000,
//           mask: true
//         })
//         reject(res.data)
//       },
//       complete: function () {
//         wx.hideLoading()
//       }
//     })
//   })
//     .catch((res) => { })
// }
