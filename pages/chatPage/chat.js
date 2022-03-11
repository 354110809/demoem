// pages/chatPage/chat.js
// 录音实例
const recorderManager = wx.getRecorderManager()
// 音频实例
const innerAudioContext = wx.createInnerAudioContext()

function sendSocketMessage(msg) {
   wx.sendSocketMessage({
      data: msg,
   })
}

Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 手指移动数据
      startPoint: '',
      // 是否显示录音模块
      isShowSoundRecordingBox: false,
      // 是否正在录音
      isSoundRecording: false,
      // 录音文件地址
      recordingFilePath: '',
      // 是否播放音频动画
      isAuditionAnimation:false,
      // 是否正在播放音频
      isplayAudition:false,
      // 输入方式 key 键盘 phone 语音
      inputMode: 'phone',
      // 输入框内容
      textareaStr: '',

      chatList: []
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
      this.webSocket()
   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {
      wx.closeSocket(function (res) {
         console.log('WebSocket 已关闭！')
      })
   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {
      // 销毁音频实例
      innerAudioContext.destroy();

      wx.closeSocket(function (res) {
         console.log('WebSocket 已关闭！')
      })
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
   // 输入框事件 搜索小区
   inputFun: function (e) {
      console.log(e)
      this.setData({
         textareaStr: e.detail.value
      })
   },

   fasong: function () {
      console.log(this)
      if(this.data.textareaStr.length>0){
         sendSocketMessage(this.data.textareaStr);
         this.setData({
            textareaStr: ''
         })
      }
      
   },

   webSocket: function () {
      //这里需要用that记录一下对象，否则下面用this操作的对象就不对了
      var that = this;
      //建立连接
      wx.connectSocket({
         url: 'ws://10.19.14.99:8888',
         header: {
            "content-type": "application/json"
         }
      })
      //监听打开
      wx.onSocketOpen((result) => {
         console.log("webSocket已打开");
         wx.showToast({
            title: '可以开始聊天了',
         })
      })
      //监控失败操作
      wx.onSocketError((result) => {
         console.log("webSocket打开失败");
         wx.showToast({
            title: '打开聊天失败，请检查网络',
         })
      })
      //监听服务器返回的数据
      wx.onSocketMessage((result) => {
         console.log("收到服务器内容：" + result.data);
         let resultData = JSON.parse(result.data)
         console.log(resultData);

         let chatList = [...this.data.chatList, ...resultData];
         console.log(chatList);
         this.setData({
            chatList: chatList
         });
      })
   },
   // 输入方式切换
   switchMode: function () {
      this.setData({
         inputMode: this.data.inputMode === 'key' ? 'phone' : 'key'
      })
   },

   // 按住开始录音
   handleRecordStart: function (e) {
      // 震动
      wx.vibrateShort({})
      this.setData({
         isAuditionAnimation:true, // 试听动画开始
         isShowSoundRecordingBox: true, // 显示录音模块
         isSoundRecording: true, // 正在录音

         is_clock: true, //长按时应设置为true，为可发送状态
         startPoint: e.touches[0], //记录触摸点的坐标信息
      })
      //设置录音参数
      const options = {
         duration: 120000,
         sampleRate: 16000,
         numberOfChannels: 1,
         encodeBitRate: 48000,
         format: 'mp3',
         frameSize: 60
      }
      //开始录音
      recorderManager.start(options);
   },
   // 松开结束录音
   handleRecordStop: function (e) {
      // 震动
      wx.vibrateShort({})

      recorderManager.stop() //结束录音

      this.setData({
         isAuditionAnimation:false, // 试听动画结束
         isSoundRecording: false
      })

      //对停止录音进行监控
      recorderManager.onStop((res) => {
         //对录音时长进行判断，少于2s的不进行发送，并做出提示
         if (res.duration < 2000) {
            wx.showToast({
               title: '录音时间太短，请长按录音',
               icon: 'none',
               duration: 1000
            })
            this.setData({
               isShowSoundRecordingBox: false, // 关闭录音模块
               recordingFilePath:'' // 清空临时录音文件地址
            })
         } else {
            //进行语音发送
            const {
               tempFilePath
            } = res;
            // 记录录音文件地址
            this.setData({
               recordingFilePath: tempFilePath
            })
            // 设置音频地址
            innerAudioContext.src = tempFilePath
            console.log(res)
         }
      })
   },
   // 按住播放录音
   playRecordingFun:function(e){
      let than = this;
      innerAudioContext.play()
      // 监听音频播放事件
      innerAudioContext.onPlay((res)=>{
         than.setData({
            isplayAudition:true, // 音频正在播放
            isAuditionAnimation:true // 开始音频播放动画
         })
      })
      // 监听音频自然播放至结束的事件
      innerAudioContext.onEnded((res)=>{
         this.setData({
            isplayAudition:false, // 音频停止播放
            isAuditionAnimation:false // 关闭音频播放动画
         })
      })
   },
   // 松开停止播放录音
   stopRecordingFun:function(e){
      innerAudioContext.stop();
      // 监听音频停止事件
      innerAudioContext.onStop((res)=>{
         this.setData({
            isplayAudition:false, // 音频停止播放
            isAuditionAnimation:false // 关闭音频播放动画
         })
      })
   },
   // 取消发送录音
   cancelSendingRecording: function () {
      // 停止播放音频
      innerAudioContext.stop()

      this.setData({
         isAuditionAnimation:false, // 关闭音频播放动画
         isShowSoundRecordingBox: false, // 关闭录音模块
         recordingFilePath:'' // 清空临时录音文件地址
      })
   },
   // 确认发送录音
   confirmSendingRecording: function () {
      // 停止播放音频
      innerAudioContext.stop()

      this.setData({
         isAuditionAnimation:false // 关闭音频播放动画
      })

      var that = this
      //上传录制的音频
      //  wx.uploadFile({
      //    url: requestUrl + 'Rubbish/uploadVoices',
      //    filePath: this.data.recordingFilePath,
      //    name: 'voice',
      //    success: function (event) {

      //    }
      // })
      wx.showToast({
         title: '已发送',
         icon: 'none',
         duration: 1000
      })
      this.setData({
         isShowSoundRecordingBox: false, // 关闭录音模块
         recordingFilePath:'' // 清空临时录音文件地址
      })
   },

   handleTouchMove: function (e) {
      //计算距离，当滑动的垂直距离大于25时，则取消发送语音
      if (Math.abs(e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY) > 25) {
         this.setData({
            is_clock: false //设置为不发送语音
         })
      }
   }

})