// pages/login/index.js
import {getPagesize, PhoneNum} from '../../utils/util.js'

const app = getApp()
var interval = null //倒计时函数
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 是否展示页面
        showloginPage:false,
        // 手机号 类
        phoneVal: '',
        // 验证码 类
        codeText: '获取验证码',
        codeVal: '',    
        // 是否同意协议
        isXieyi: false,
        // 来自于哪个页面
        sourcePage: '' // 1 是来自优惠券 2是来自提交订单
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {
        this.setData({
            showloginPage:true
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * input输入框实时输入事件
     */
    inputFun: function(e) {
        if (e.currentTarget.dataset.title == 'phone') { //手机号框
            this.setData({
                phoneVal: e.detail.value
            })
        } else if (e.currentTarget.dataset.title == 'code') { //验证码框
            this.setData({
                codeVal: e.detail.value
            })
        }
    },
    /**
     * input输入框获取焦点事件
     */
    inputfocusFun: function(event) {
        this.setData({
            tipText: ''
        })
    },
    /**
     * 点击获取验证码按钮事件
     */
    getCodeFun: function() {
        var than = this;
        if (than.data.codeText != '获取验证码') {
            return;
        } else if (!than.data.phoneVal) {
            than.setData({
                tipText: '手机号码不能为空'
            })
            return;
        } else if (!PhoneNum(than.data.phoneVal)) {
            than.setData({
                tipText: '手机号码不正确'
            })
            return;
        }
        than.setData({
            btnClick: true
        })
        than.getSignInCode(60); //启动验证码倒计时
    },
    /**
     * 倒计时方法
     */
    CodeTimeFun: function(num) {
        var than = this;
        var currentTime = num;
        than.setData({
            codeText: currentTime + 's'
        })
        clearInterval(interval)
        interval = setInterval(function() {
            if (currentTime > 0) {
                currentTime--;
                than.setData({
                    codeText: currentTime + 's'
                })
            } else {
                clearInterval(interval)
                than.setData({
                    codeText: '获取验证码'
                })
            }
            // console.log(currentTime)
        }, 1000)
    },
    /**
     * 获取验证码方法
     */
    getSignInCode: function() {
        var than = this;
        // 启动倒计时
        than.CodeTimeFun(60)
        // 获取登录验证码
        wx.request({
            url: app.API.login.getCodeCommon,
            method: "post",
            data: {
                'mobile': than.data.phoneVal,
                'type': 1,
                'appType': 4
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {
                if (res.data.code == 500) {
                    wx.showModal({
                        title: "登录提示",
                        content: res.data.msg,
                        showCancel: false,
                        confirmText: "确定",
                        success: function(res) {
                            // than.onLoad()
                        }
                    })
                }
            },
            fail: function(res) {}
        })
    },
    /**
     * 登录
     */
    SignInFun: function () {
        var than = this
        // 设置登录状态
        app.globalData.isLoginState = true;
        // 设置用户类型
        app.globalData.userType = parseInt( Math.random()*10 ) % 2;
        wx.showToast({
          title: '登录成功',
        })
        wx.switchTab({
          url: '/tabbarPages/tabbarPage1/index',
        })
        return;
        if (than.data.phoneVal.length < 11) {
            than.setData({
                tipText: '请输入正确的手机号码'
            })
            return;
        } else if (than.data.codeVal.length < 6) {
            than.setData({
                tipText: '请输入正确的验证码'
            })
            return;
        } else if (than.data.tipText.length > 0) {
            than.setData({
                tipText: '请检查输入的信息'
            })
            return;
        } else if (!than.data.btnClick) {
            than.setData({
                tipText: '请获取验证码'
            })
            return;
        } else if (!than.data.isXieyi){
            than.setData({
                tipText: '请先同意服务协议'
            })
            return;
        }
        // 开启loding提示
        wx.showLoading({
            title: "登录中",
            mask: true
        })
        console.log(getApp().globalData.openSessionId)
        // 登录
        wx.request({
            url: app.API.login.loginWx,
            method: "post",
            data: {
                'mobile': than.data.phoneVal,
                'smsCode': than.data.codeVal,
                'openSessionId': getApp().globalData.openSessionId
            },
            header: {
                'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function (obj) {
                wx.hideLoading();
                if (obj.data.code == 200) {
                    console.log('手机号登录成功')
                    // 设置登录状态
                    wx.setStorageSync('logState', true)
                    // 设置登录时间
                    wx.setStorageSync('timtstamp', new Date().getTime());
                    // 记录登录token
                    wx.setStorageSync('token', obj.data.data.token)
                    // 设置当前用户登录类型 1手机号 2微信授权
                    wx.setStorageSync('loginType', 1)

                    app.globalData.token = obj.data.data.token;

                    app.globalData.isLoginState = true;
                    app.getUserInfo(obj.data.data.token, function (res) {
                        // debugger
                        if (than.data.payIntention) {
                            wx.navigateTo({
                                url: '../wxPayIntention/payIntention?isLoginPage=true',
                            })
                        } else if (than.data.optionsFrom == 1) {
                            wx.navigateTo({
                                url: '../couponPage2/index',
                            })
                        } else if (than.data.optionsFrom == 2) {
                            wx.navigateTo({
                                url: '../select5sure/index',
                            })
                        } else if (than.data.optionsFrom == 3) {
                            wx.navigateTo({
                                url: '../mineInfo/index',
                            })
                        } else {
                            wx.switchTab({
                                url: '../../pages/mine/index',
                            })
                        }
                    })
                } else {
                    wx.showModal({
                        title: "登录提示",
                        content: obj.data.msg,
                        showCancel: false,
                        confirmText: "确定",
                        success: function (res) {
                            // than.onLoad()
                        }
                    })
                }
            },
            fail: function (res) {
                console.log(res)
                wx.showModal({
                    title: "登录提示",
                    content: '加载出错，请重试',
                    showCancel: false,
                    confirmText: "确定",
                    success: function (res) {
                        // than.onLoad()
                    }
                })
            },
        })
    },
    /**
     * 注册协议点击
     */
    operateFun: function () {
        this.setData({
            tipText: '',
            isXieyi: !this.data.isXieyi
        })
    },
    // 微信授权登录
    bindGetUserInfo: function (e) {
        var than = this;
        console.log(e)
        wx.showLoading({
            // title: '加载中',
        })
        if (e.detail.errMsg == 'getUserInfo:ok') {
            app.globalData.wxUserInfo = e.detail.userInfo;
            wx.setStorageSync('wxUserInfo', JSON.stringify(e.detail.userInfo))
            // return;
            wx.request({
                url: app.API.login.loginWxByAuth,
                method: "post",
                data: { 
                    gender: e.detail.userInfo.gender,
                    nickName: e.detail.userInfo.nickName,
                    openSessionId: app.globalData.openSessionId,
                    photo: e.detail.userInfo.avatarUrl
                },
                header: { 'content-type': 'application/x-www-form-urlencoded' },
                success: function (obj) {
                    console.log(obj)
                    if(obj.data.code==200){
                        // return;
                        console.log('授权成功')
                        // 设置登录状态
                        wx.setStorageSync('logState', true)
                        // 设置登录时间
                        wx.setStorageSync('timtstamp', new Date().getTime());
                        // 记录登录token
                        wx.setStorageSync('token', obj.data.data.token)
                        // 设置当前用户登录类型 1手机号 2微信授权
                        wx.setStorageSync('loginType', 2)

                        app.globalData.token = obj.data.data.token;

                        app.globalData.isLoginState = true;
                        app.getUserInfo(obj.data.data.token, function (res) {

                            if (than.data.payIntention) {
                                wx.navigateTo({
                                    url: '../wxPayIntention/payIntention?isLoginPage=true',
                                })
                            } else {
                                wx.switchTab({
                                    url: '../../pages/mine/index',
                                })
                            }

                        })
                    }else{
                        console.log('接口返回错误')
                    }
                },
                fail: function (obj) { }
            })
            
        } else {
            console.log('授权失败')
            wx.hideLoading()
        }
    },
    /**
     * 用户点击右上角分享
     */
	onShareAppMessage: function () {
		return {
			title: 'Hi home',
			path: '/pages/index/index',
			imageUrl: '../../images/sharePic.jpg'
		}
	}
})