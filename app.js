//app.js
const API = require('./utils/api.js').API
import { getRequest, postRequest } from './utils/request.js'

App({
    getRequest: getRequest,
    postRequest: postRequest,
    API: API,
    onLaunch: function (options) {
        console.log("进入小程序")
        console.log(options)
    },
    onShow:function(options){
        // 从带 shareTicket 的小程序消息卡片
        if(options.scene === 1044){
            console.log('======1044=======');
            console.log(options)
            console.log('======1044=======');
            wx.getShareInfo({
                shareTicket:options.shareTicket,
                success:function(res){
                    console.log(res)
                }

            })

        }
        // 从群聊进入 小程序
        if(options.scene === 1008){
            console.log('======1008=======');
            wx.getGroupEnterInfo({
                success(res) {
                    console.log(res)
                },
                fail() {
              
                }
            })  
        }

        /* 
            改造自定义页面顶部需要
            获取页面胶囊信息，设置页面头部条高度
        */
        /* 
            let wxPageInfo = wx.getMenuButtonBoundingClientRect()
            this.globalData.wxPageInfo = wxPageInfo;
            this.globalData.wxPageInfo.barHeight = wxPageInfo.height + wxPageInfo.top + 8;
        */
    },
    globalData: {
        wxPageInfo:{}, // 小程序页面胶囊信息
        userType:0, // 用户类型 0 c端用户 1群主
        userInfo: null, // 系统用户信息
        wxUserInfo: null,
        isLoginState: true, // 登录状态
        mobileDevices: [], // 用户设备信息
        token: null, // token
        openSessionId: null,
    }
})