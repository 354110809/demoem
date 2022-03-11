// components/evaluate/indexl.js
/* 
   * 展示星级组件
   * level：星级评价级别，共6级(0，1，2，3，4，5),默认为0级
   * showType：显示星级类型 共3中(1显示选中与未选中、2 只显示选中、3 可操作点击),,默认为1
   * * <evaluate_model level="5" showType="3" id="evaluate_model"/>
   * * let evaluate_model = this.selectComponent("#evaluate_model");
*/
Component({
   /**
    * 组件的属性列表
    */
   properties: {
      // 评价级别 共6级 0，1，2，3，4，5
      level:  {
         type: Number,
         value: 0
      },
      // 显示评价类型 1 显示选中与未选中 2 只显示选中 3 可操作点击
      showType: {
         type: Number,
         value: 1
      },
   },

   /**
    * 组件的初始数据
    */
   data: {
      // 点击选中的级别
      curLevel:0
   },

   /**
    * 组件的方法列表
    */
   methods: {
      // 点击星级事件
      clickLevelFun(e){
         console.log(e.currentTarget.dataset.index)
         this.setData({
            curLevel:e.currentTarget.dataset.index+1
         })
      }
   }
})
