// components/top_model/index.js
/* 
   * 展示tabbar页面顶部搜索框、扫码、消息入口等功能组件
*/
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      // 是否显示阴影
      showShadow: {
         type: Boolean,
         value: true
      },
   },

   /**
    * 组件的初始数据
    */
   data: {
      barHeight:0,
   },

   /**
    * 组件的方法列表
    */
   methods: {
      // 扫码
      saoyisao() {
         wx.scanCode({
            success(res) {
               console.log(res)
            }
         })
      },
      // 去聊天
      goChat(){
         wx.navigateTo({
            url: '../../pages/news/index',
         })
      },
   },
   ready(){
      // console.log(app.globalData.wxPageInfo)
      // this.setData({
      //    barHeight:app.globalData.wxPageInfo.barHeight
      // })
   }
})
