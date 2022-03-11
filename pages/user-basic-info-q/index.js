const {
   simpleRegion
} = require("../../utils/simpleRegion1.js");

// pages/userBasicInfo/index.js
Page({

   /**
    * 页面的初始数据
    */
   data: {
      // 页面是否滚动
      isPageScroll:true,
      // 生日最大可选日期
      birthdayEndDate: '',
      // 用户头像地址
      portraitSrc: '',
      // 昵称
      nickname: '',
      // 毕业院校
      school: '',
      // 真实姓名
      name: '',
      // 生日
      birthday: '',
      // 公司名
      company: '',

      // 下拉-性别
      pickerArrGender: ['男', '女'],
      pickerCurGender: -1,

      // 居住地
      placeResidenceCur: ['', '', ''],

      // 下拉-学历
      pickerArrEducation: ['小学', '初中', '高中', '高职', '大专', '本科', '硕士', '博士'],
      pickerCurEducation: -1,

      // 下拉-婚姻
      pickerArrMarriage: ['单身', '热恋', '已婚', '离异'],
      pickerCurMarriage: -1,

      // 下拉-职业
      pickerArrOccupation: [
         '党的机关', '国家机关', '群众团体和社会组织', '企事业单位负责人', '专业技术人员', '办事人员和有关人员', '社会生产服务和生活服务人员', '农、林、牧、渔业生产及辅助人员', '生产制造及有关人员', '军人', '不便分类的其他从业人员', '失业、无业或离退休'
      ],
      pickerCurOccupation: -1,

      // 家乡
      hometownMultiArray: [[],[]],
      hometownMultiIndex: [-1, -1],
      // 户口所在地
      householdMultiArray: [[],[]],
      householdMultiIndex: [-1, -1],
      // 祖籍
      multiArray: [[],[]],
      multiIndex: [-1, -1],
      
      pickerArrHouseVehicle:['无','所在地','非所在地'],
      // 房
      pickerCurHouse:-1,
      // 车
      pickerCurVehicle:-1


   },

   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {

      this.setMultiArrayFun()
      this.setData({
         birthdayEndDate: new Date()
      })
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
   // 选择头像-图库或拍照
   selectPicFun: function () {
      let than = this;
      wx.chooseImage({
         count: 1, // 默认9
         sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
         sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
         success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths
            than.setData({
               isPageScroll:false
            })
            // 获取截图组件ID
            than.cropper = than.selectComponent("#cutting_model");
            than.cropper.init({
               imgPath: tempFilePaths[0], //imgPath是需要裁剪图片的图片路径，只支持本地或临时路径
               success(res) {
                  console.log(res) //res即裁剪成功后的图片临时路径
                  than.setData({
                     portraitSrc: res,
                     isPageScroll:true
                  })
               },
               fail(error) {
                  console.log(error) //有两种:cancel代表点击了叉，fail代表wx.canvasToTempFilePath生成图片失败
                  than.setData({
                     isPageScroll:true
                  })
               }
            });
         }
      })
   },
   // 查看头像
   seePortrait: function () {
      wx.previewMedia({
         sources: [{
            url: this.data.portraitSrc,
            type: 'image'
         }]
      })
   },
   // 省市区三级选择框 
   bindRegionChange: function () {
      console.log('picker发送选择改变，携带值为', e.detail.value)
      this.setData({
         region: e.detail.value
      })
   },
   // 选择框发生变化
   bindPickerChange: function (e) {
      let key = e.currentTarget.dataset.key;
      this.setData({
         [key]: e.detail.value
      })
   },
   // 输入框发生变化
   bindinputChange: function (e) {
      console.log(e)
      let key = e.currentTarget.dataset.key;
      this.setData({
         [key]: e.detail.value
      })
   },
   // 多列下拉选择后
   bindMultiPickerChange: function (e) {
      let key = e.currentTarget.dataset.key;
      this.setData({
         [key]: e.detail.value
      })
   },
   // 多列下拉列发生变化
   bindMultiPickerColumnChange: function (e) {
      // 选择索引名称
      let indexName = e.currentTarget.dataset.key;
      // 选择的索引数组名称
      let arrNmae = e.currentTarget.dataset.arr;

      let data = {
         [arrNmae]: this.data[arrNmae],
         [indexName]: this.data[indexName]
      }
      data[indexName][e.detail.column] = e.detail.value;
      switch (e.detail.column) {
         case 0:
            data[arrNmae][1] = simpleRegion[e.detail.value].city.map((item, index) => {
               return item.name;
            })
            data[indexName][1] = 0;
            break;
      }
      this.setData(data);
   },
   // 设置默认省市选择数据
   setMultiArrayFun: function () {
      let provinceArr = simpleRegion.map((item, index) => {
         return item.name;
      })

      let cityArr = simpleRegion[0].city.map((item, index) => {
         return item.name;
      })
      
      this.setData({
         hometownMultiArray: [provinceArr, cityArr],
         householdMultiArray: [provinceArr, cityArr],
         multiArray: [provinceArr, cityArr],
      })

   }
})