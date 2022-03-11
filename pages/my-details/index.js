// pages/user-details/index.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 默认展示
      switchIndex:0,
      userPic:['https://img0.baidu.com/it/u=637079888,504226789&fm=26&fmt=auto','https://img2.baidu.com/it/u=2267577601,3073898589&fm=26&fmt=auto','https://img0.baidu.com/it/u=4230317258,2357866730&fm=26&fmt=auto'],
      // 默认展示tag  1:资料 2:好友评价
      tagIndex:1
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
   // 轮播变化触发
   swiperChange:function(e){
      this.setData({
         switchIndex:e.detail.current
      })
   },
   // 点击编辑资料事件
   onEditFun:function(){

   },
})