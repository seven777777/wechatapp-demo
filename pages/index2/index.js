//index.js
let okayapi = require('../../utils/okayapi.js')
//获取应用实例
const app = getApp()

Page({
    data: {
        motto: '正在调用小白接口……',
        userInfo: {},
        hasUserInfo: false,
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        writemsg:'',
        pullmsg:''
    },
    //事件处理函数
    bindViewTap: function() {
        wx.navigateTo({
            url: '../test/test'
        })
    },
    toEntry(){
      wx.navigateTo({
        url: '../entry/entry'
      })
    },
    onLoad: function () {
      var _this=this;
        // this.okayApiHelloWorld()
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse){
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res => {
                this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                }
            })
        }
      

        wx.connectSocket({
          url: 'ws://localhost:8080',
        })
        wx.onSocketOpen(res=>{
          console.log("WebSocket连接已打开！")
          console.log("res：",res)
          wx.sendSocketMessage({
            data: "hello world:"+Math.round(Math.random()*0xFFFFFF).toString(),
          })
        })
        wx.onSocketMessage(function(msg){
          console.log(msg)
          _this.setData({
            pullmsg:msg.data
          })
        })
        wx.onSocketClose(res=>{
          console.log("WebSocket连接已关闭！")
        })
    },
    onShow(){
      console.log('aa', app.globalData.userInfo)
    },
    getUserInfo: function(e) {
        console.log(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
            userInfo: e.detail.userInfo,
            hasUserInfo: true
        })
    },
    writemsg(e){
      this.setData({
        writemsg:e.detail.value
      })
    },
    sendmsg(){
      wx.sendSocketMessage({
        data: this.data.writemsg,
      })
    },
    okayApiHelloWorld(e){
        //准备接口参数
        let params = {
            s:"Hello.World",// 必须，待请求的接口服务名称
            name: "dogstar"// 可选，根据接口文档，补充更多接口参数
        };
        let self = this;
        //对接口发起请求
        wx.request({
            url:app.globalData.okayapiHost,    // 使用小白接口的域名，或者PHP代理域名
            data: okayapi.enryptData(params),   // 如果直接调用小白接口，需要在小程序里生成签名
            method: "POST",                     // 通常情况下都可使用POST方式请求小白接口
            header: { "Content-Type": "application/x-www-form-urlencoded" }, // 大坑：如果使用的是POST请求，一定要设置这个header，不然参数无法POST
            success:wxRes=>{
                // console.log(wxRes);
                let res = wxRes.data;
                if (res.data && res.data.err_code == 0) {
                    // TODO：请求成功
                    // console.log('ok: ', res.data)
          
                    this.setData({
                      motto: res.data.title
                    })
                  } else {
                    // TODO：当前操作失败
                    console.log('fail: ', res)
          
                    this.setData({
                      motto: res.data.err_msg
                    })
                }
            }
        })
    }
})
