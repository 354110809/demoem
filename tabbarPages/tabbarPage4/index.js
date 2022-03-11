// pages/mine/index.js
const app = getApp()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 上部模块高度
        topModelHeight:0,
        // 页面滚动高度
        pageScrollTop:0,
        // 显示底部模块索引
       showBottomIndex:3
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 3
            })
        }
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },
    // 跳转
    JumpUrl: function () {

    },
    // 查看用户信息
    seeUserInfo: function () {

    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    // 点击切换
    clickHeadTap(e){
        // // 获取已点击的星界评价数
        // let evaluate_model = this.selectComponent("#evaluate_model");
        // console.log(evaluate_model.data.curLevel)

        let key = e.currentTarget.dataset.index;
        this.getHeight('.bottom-head',(BHRes)=>{
            
            // 设置页面垂直滚动距离
            this.setData({
                pageScrollTop:BHRes[1].scrollTop
            })

            // 如果上部模块高度为0
            if(this.data.topModelHeight == 0){
                // 设置上部模块高度
                this.getHeight('.top-box',(res)=>{
                    this.setData({
                        topModelHeight:res[0].height,
                    })
                })
            }else{
                if(this.data.topModelHeight >= BHRes[1].scrollTop  ){
    
                }else{
                    wx.pageScrollTo({
                        // scrollTop:0,
                        selector:'.LocateRow',
                        duration: 300
                    })
                }
            }

            this.setData({
                showBottomIndex:key
            })  
        })        
    },
    // 查看自己的详细信情
    seeMyDetails:function(){
        wx.navigateTo({
            url: '../../pages/my-details/index',
        })
    },
    // 查看用户详情
    seeDetails:function(){
        wx.navigateTo({
            url: '../../pages/user-details/index',
        })
    },
    // 查看活动详情
    seeHdDetails:function(){
        wx.navigateTo({
            url: '../../pages/activity-details/index',
        })
    },
    // 获取页面上不模块内容高度
    getHeight(className,callback){
        const query = wx.createSelectorQuery()
        query.select(className).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
            callback(res);
        })
    }
})