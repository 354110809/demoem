// pages/indexModel/index/index.js
const util = require('../../utils/util.js')
const app = getApp()
const city_choice = requirePlugin('city-choice');

Page({
    /**
     * 页面的初始数据
     */
    data: {
        hotCitys: '北京'
    },
    selectCity() {
        wx.navigateTo({
            url: `plugin://city-choice/city-choice?onHistory=${true}&hotCitys=${this.data.hotCitys}`
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log("==============全局设置分享的参数===================");
        //全局设置分享的参数
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline'],
            success: function(res) {
                console.log("=================================");
                console.log(res);
            },
            fail: function() {
                console.log('fail')
            }
        });
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // 请求-登录
        return;
        app.postRequest(app.API.login, {
            loginname: 'ollin_test',
            password: 'test123'
        }).then((res) => {
            console.log(res)
        }).catch((err) => {

        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        //返回选择的城市信息，未选择则返回null
        let getcity = city_choice.getcity() 
        this.setData({
            city: getcity
        })

        // 设置自定义tabbar选中
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
        return {
            title: '',
            path: '/tabbarPages/tabbarPage1/index',
            imageUrl: 'https://i2.img16888.com/picLib/2021/03/2021030206043586987.jpg_282.jpg'
        }
    },
    /**
     * 分享到朋友圈，并自定义分享内容。
     */
    onShareTimeline() {

    },
    // 查看详情
    seeDetails:function(){
        wx.navigateTo({
            url: '../../pages/user-details/index',
        })
    },
    // 点赞事件
    spotPraiseFun:function(){
        wx.showToast({
        title: '点赞成功',
        })
    },
    // 查看活动详情
    seeHdDetails:function(){
        wx.navigateTo({
        url: '../../pages/activity-details/index',
        })
    },



})