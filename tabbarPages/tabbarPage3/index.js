// tabbarPages/activity/index.js
const app = getApp()
Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 是否有未付款活动
      isUnpaidActivity:false
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
       // 设置自定义tabbar选中
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
         this.getTabBar().setData({
            selected: 2
         })
      }
   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {
      console.log('swswsw======')
   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   },
   // 查看活动详情
   seeHdDetails:function(){
      wx.navigateTo({
         url: '../../pages/activity-details/index',
      })
   },
   // 查看用户详情
   seeDetails:function(){
      wx.navigateTo({
         url: '../../pages/user-details/index',
      })
   },
})