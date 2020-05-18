const util = require('../utils/util.js')
module.exports = {
  get: get,
  set: set,
  remove: remove,
}
function get(key, callBack) {
  util.print("获取缓存对象"+key)
  wx.getStorage({
    key: key,
    success: function (res) {
      callBack(res);
    },
    fail:function(res){
      callBack({errMsg:"getStorage:not found"+key,data:null});
    }
  })
}

function set(key, value) {
  wx.setStorage({
    key: key,
    data: value
  })
}

function remove(key){
  wx.removeStorage({
    key: key,
    success:function(res){

    }
  })
}