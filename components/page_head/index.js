// components/page_head/index.js
const app = getApp()
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      pageTitle: String // 页面标题
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

   },
   ready(){
      this.setData({
         barHeight:app.globalData.wxPageInfo.barHeight,
         barPaddingTop:app.globalData.wxPageInfo.barHeight - 48
      })
   }
})
