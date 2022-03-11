// pages/activity-details/index.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 活动状态
      hdStatus:true,
      // 是否展示全部活动成员
      isShowhdCy:false,
      // 活动成员
      hd_memberList:[
         {signinStatus:true,cySrc:'https://img2.baidu.com/it/u=1853564306,3331497236&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=700',cyName:'杨幂',cyUserId:1},
         {signinStatus:true,cySrc:'https://img1.baidu.com/it/u=3469009969,1203958673&fm=26&fmt=auto',cyName:'佟丽娅',cyUserId:2},
         {signinStatus:false,cySrc:'https://img0.baidu.com/it/u=728124399,3391295274&fm=26&fmt=auto',cyName:'张天爱',cyUserId:3},
         {signinStatus:true,cySrc:'https://img1.baidu.com/it/u=3574403349,1944996101&fm=26&fmt=auto',cyName:'刘恺威',cyUserId:4},
         {signinStatus:true,cySrc:'https://img2.baidu.com/it/u=1391461488,531581190&fm=26&fmt=auto',cyName:'王宝强',cyUserId:6},
         {signinStatus:true,cySrc:'https://img2.baidu.com/it/u=532112699,1252862673&fm=26&fmt=auto',cyName:'王刚',cyUserId:7},
         {signinStatus:true,cySrc:'https://img1.baidu.com/it/u=4240730182,2829150675&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=888',cyName:'古力娜扎',cyUserId:8},
         {signinStatus:true,cySrc:'https://img0.baidu.com/it/u=3264978482,1124431868&fm=26&fmt=auto',cyName:'迪丽热巴',cyUserId:9},
         {signinStatus:true,cySrc:'https://img0.baidu.com/it/u=3264978482,1124431868&fm=26&fmt=auto',cyName:'迪丽热巴',cyUserId:10},
         {signinStatus:false,cySrc:'https://img0.baidu.com/it/u=3264978482,1124431868&fm=26&fmt=auto',cyName:'迪丽热巴',cyUserId:11},
         {signinStatus:true,cySrc:'https://img0.baidu.com/it/u=3264978482,1124431868&fm=26&fmt=auto',cyName:'迪丽热巴',cyUserId:12},
         {signinStatus:false,cySrc:'https://img0.baidu.com/it/u=3264978482,1124431868&fm=26&fmt=auto',cyName:'迪丽热巴',cyUserId:13},
         {signinStatus:true,cySrc:'https://img0.baidu.com/it/u=3264978482,1124431868&fm=26&fmt=auto',cyName:'迪丽热巴',cyUserId:14},
         {signinStatus:false,cySrc:'https://img0.baidu.com/it/u=3264978482,1124431868&fm=26&fmt=auto',cyName:'何jiu',cyUserId:15},
         {signinStatus:true,cySrc:'https://img1.baidu.com/it/u=1970390240,2297831004&fm=26&fmt=auto',cyName:'柳岩',cyUserId:16},
      ],
      // 活动简介
      htmlSnip:'<p wx:nodeid="6">这个周末的时光</p><p wx:nodeid="8"><br wx:nodeid="9"></p><p wx:nodeid="10">相遇一场轻松简单的聚会</p><p wx:nodeid="12"><br wx:nodeid="13"></p><p wx:nodeid="14">轻松地、聊聊天</p><p wx:nodeid="16"><br wx:nodeid="17"></p><p wx:nodeid="18">在冬日北京丽思卡尔顿酒店温暖的场所里</p><p wx:nodeid="20"><br wx:nodeid="21"></p><p wx:nodeid="22">在一个美妙而愉快的夜晚里</p><p wx:nodeid="24"><br wx:nodeid="25"></p><p wx:nodeid="26">与同样怀揣对美好爱情向往的小伙伴</p><p wx:nodeid="28"><br wx:nodeid="29"></p><p wx:nodeid="30">聊一点你感兴趣的话题吧</p><p wx:nodeid="32"><br wx:nodeid="33"></p><p wx:nodeid="34">让我们相遇在这个美好的时刻</p><p wx:nodeid="36"><br wx:nodeid="37"></p><p wx:nodeid="38">来吧</p><p wx:nodeid="40"><br wx:nodeid="41"></p><p wx:nodeid="42">欢迎来到此丽思卡尔顿之夜</p><p wx:nodeid="75"><img src="https://img0.baidu.com/it/u=2133937396,3436019980&fm=26&fmt=auto" width="100%" class="editor_image" data-custom="id=abcd&amp;role=god" wx:nodeid="79"></p><p wx:nodeid="65"><img src="https://img0.baidu.com/it/u=2133937396,3436019980&fm=26&fmt=auto" width="80%" class="editor_image" data-custom="id=abcd&amp;role=god" wx:nodeid="66"></p><p wx:nodeid="65"><img src="https://img0.baidu.com/it/u=2133937396,3436019980&fm=26&fmt=auto" width="80%" class="editor_image" wx:nodeid="67"></p><p wx:nodeid="71"><br wx:nodeid="72"></p><p wx:nodeid="59"><br wx:nodeid="60"></p>',
      // 是否同意协议
      isXyStatus:false
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
   // 点击切换协议 同意状态
   clickXyFun:function(e){
      let isXyStatus = !this.data.isXyStatus
      this.setData({
         isXyStatus:isXyStatus
      })
   },
   // 查看推荐活动
   seeTjHdDetails:function(){
      // 关闭当前页面，打开新页面
      wx.redirectTo({
         url: '../../pages/activity-details/index',
      })
   },
   // 展开活动全部成员
   openHdCyList:function(){
      this.setData({
         isShowhdCy:true
      })
   },
   // 查看用户详情
   seeDetails:function(){
      wx.navigateTo({
         url: '../../pages/user-details/index',
      })
   },
})